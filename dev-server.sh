#!/usr/bin/env bash
echo "Starting development server via tmux..."

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Function to setup nvm in new windows
NVM_SETUP="export NVM_DIR=\"$HOME/.nvm\" && [ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\" && nvm use"

# Use the Node version specified in .nvmrc
nvm use || { echo "Failed to use nvm"; exit 1; }
echo "Current Node version: $(node --version)"

# Session name
SESSION_NAME="rails-api-dev"
GOOD_JOB_FLAGS="--max_threads=1"

# Check if the session already exists
tmux has-session -t $SESSION_NAME 2>/dev/null

# If it doesn't exist, create a new tmux session
if [ $? != 0 ]; then
    # Create a new tmux session with the first window running the Rails API server
    tmux new-session -d -s $SESSION_NAME -n "Rails API"

    # Configure first window (Rails API Server)
    tmux send-keys -t "${SESSION_NAME}:Rails API" "cd api && bundle exec rails s -b 0.0.0.0" Enter

    # Frontend development server
    tmux new-window -t $SESSION_NAME -n "Frontend"
    tmux send-keys -t "${SESSION_NAME}:Frontend" "$NVM_SETUP" Enter
    tmux send-keys -t "${SESSION_NAME}:Frontend" "cd frontend && npm run dev" Enter

    # Good Job worker for background jobs
    tmux new-window -t $SESSION_NAME -n "Background Jobs"
    tmux send-keys -t "${SESSION_NAME}:Background Jobs" "cd api && bundle exec good_job start $GOOD_JOB_FLAGS" Enter

    # Optional: Logs window for monitoring
    tmux new-window -t $SESSION_NAME -n "Logs"
    tmux send-keys -t "${SESSION_NAME}:Logs" "echo 'Logs window - use this to monitor app logs or run commands'" Enter
    tmux send-keys -t "${SESSION_NAME}:Logs" "echo 'API logs: tail -f api/log/development.log'" Enter
    tmux send-keys -t "${SESSION_NAME}:Logs" "echo 'To run all services at once: npm run dev'" Enter
    tmux send-keys -t "${SESSION_NAME}:Logs" "echo 'Individual commands:'" Enter
    tmux send-keys -t "${SESSION_NAME}:Logs" "echo '  API: npm run api'" Enter
    tmux send-keys -t "${SESSION_NAME}:Logs" "echo '  Frontend: npm run frontend'" Enter
    tmux send-keys -t "${SESSION_NAME}:Logs" "echo '  Jobs: npm run jobs'" Enter

    # Select the first window
    tmux select-window -t "${SESSION_NAME}:Rails API"
fi

tmux set-option -t $SESSION_NAME -g history-limit 10000
tmux set-option -t $SESSION_NAME -g mouse on

# Attach to the tmux session
exec tmux attach -t $SESSION_NAME