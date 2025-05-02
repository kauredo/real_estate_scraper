# Real Estate Scraper: Rails API + React Frontend Migration

## Project Overview

Converting a monolithic Rails application into a decoupled architecture with:

- Rails API backend (/api)
- React/Vite frontend (/frontend)

## Completed Tasks

- [x] Backend Migration

  - Moved Rails application to /api directory
  - Relocated old controllers to /api/app/controllers/old
  - Created new API controllers with JSON responses
  - Implemented API routes in config/routes.rb
  - Added serializers for model JSON responses

- [x] Frontend Setup
  - Created new Vite/React frontend in /frontend
  - Migrated React components from /app/javascript/components to /frontend/src/components

## Current Tasks

### Frontend Development

1. View Migration

   - Identify and list all .erb/.html.erb views that need conversion
   - Convert existing ERB views to React components
   - Ensure feature parity with original views

2. Authentication & Authorization

   - Implement login pages and authentication flow
   - Set up protected routes for backoffice access
   - Integrate with Rails API authentication endpoints

3. Backoffice Implementation
   - Design and implement backoffice dashboard
   - Create CRUD interfaces for all administrative functions
   - Add user management screens

### API Development

1. Controller Audit

   - Review all models to ensure complete API coverage
   - Implement missing CRUD controllers where needed
   - Add necessary endpoints for backoffice operations

2. Frontend Integration
   - Create/update api.ts with all API endpoints
   - Update routes.ts to match new API structure
   - Implement proper error handling and loading states

## Technical Requirements

- All API endpoints must follow RESTful conventions
- Frontend must use TypeScript
- Implement proper authentication/authorization
- Add comprehensive error handling
- Ensure responsive design for all views

## Testing Requirements

- API endpoints need proper request specs
- Frontend components should have unit tests
- Add integration tests for critical user flows

## Next Steps

1. List all remaining .erb views that need conversion
2. Map out required API endpoints for each feature
3. Design authentication flow between frontend and API
4. Create component hierarchy for backoffice views
