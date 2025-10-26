# Environment Configuration Setup

This API uses environment variables for configuration. Follow these steps to set up your environment:

## 1. Copy the default environment file

```bash
cp .env.default .env
```

## 2. Update the .env file with your values

Edit the `.env` file and update the following variables:

### Actually Used Variables (Minimal Required Set)

#### Authentication (Required)

- `JWT_SECRET`: Secret key for JWT token signing (required for admin API access)

#### Application

- `APP_DOMAIN`: Your application domain (localhost:3000 for development)
- `RAILS_MAX_THREADS`: Database connection pool size (default: 5)
- `PORT`: Server port (default: 3000)

#### Production Only

- `SOFIA_GALVAO_DATABASE_PASSWORD`: Production database password

## 3. Generate secure keys for production

For production environments, generate secure keys:

```bash
# Generate JWT_SECRET
rails secret
```

## 4. Environment-specific configurations

### Development

- Uses database.yml configuration by default (sofia_galvao_development)
- JWT uses development secret (should be changed for production)
- Runs on port 3000

### Production

- Set `RAILS_ENV=production`
- Set `SOFIA_GALVAO_DATABASE_PASSWORD` for database access
- Use secure, randomly generated `JWT_SECRET`

## 5. Database Configuration

The application uses the database names defined in `config/database.yml`:

- Development: `sofia_galvao_development`
- Test: `sofia_galvao_test`
- Production: `sofia_galvao_production`

You can override these with `DATABASE_URL` if needed.

## 6. Security Notes

- Never commit `.env` files to version control
- Use different secrets for each environment
- Keep production secrets secure and private
- The `JWT_SECRET` is critical for API security

## 7. Troubleshooting

If you encounter JWT authentication errors:

1. Ensure `JWT_SECRET` is set in your `.env` file
2. Restart the Rails server after changing environment variables
3. Generate a new token using the `/api/v1/auth/login` endpoint
