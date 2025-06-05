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
SESSION_NAME="rails-dev"

# Check if the session already exists
tmux has-session -t $SESSION_NAME 2>/dev/null

# If it doesn't exist, create a new tmux session
if [ $? != 0 ]; then
    # Create a new tmux session with the first window running the Rails server
    tmux new-session -d -s $SESSION_NAME -n "Rails Server"

    # Configure first window (Rails Server)
    tmux send-keys -t "${SESSION_NAME}:Rails Server" "bin/rails server -p 3000 -b 0.0.0.0" Enter

    # JavaScript build with watch
    tmux new-window -t $SESSION_NAME -n "JS Build"
    tmux send-keys -t "${SESSION_NAME}:JS Build" "$NVM_SETUP" Enter
    tmux send-keys -t "${SESSION_NAME}:JS Build" "yarn build --watch" Enter

    # CSS build with watch
    tmux new-window -t $SESSION_NAME -n "CSS Build"
    tmux send-keys -t "${SESSION_NAME}:CSS Build" "$NVM_SETUP" Enter
    tmux send-keys -t "${SESSION_NAME}:CSS Build" "yarn build:css --watch" Enter

    # PostCSS build with watch
    tmux new-window -t $SESSION_NAME -n "PostCSS Build"
    tmux send-keys -t "${SESSION_NAME}:PostCSS Build" "$NVM_SETUP" Enter
    tmux send-keys -t "${SESSION_NAME}:PostCSS Build" "yarn build:postcss --watch" Enter

    # Good Job worker with queue priorities (same as production)
    tmux new-window -t $SESSION_NAME -n "Background Worker"
    tmux send-keys -t "${SESSION_NAME}:Background Worker" "bundle exec good_job start --queues=bulk_scraping:10,individual_scraping:5,default:1 --max_threads=1" Enter

    # Select the first window
    tmux select-window -t "${SESSION_NAME}:Rails Server"
fi

tmux set-option -t $SESSION_NAME -g history-limit 10000
tmux set-option -t $SESSION_NAME -g mouse on

# Attach to the tmux session
tmux attach -t $SESSION_NAME