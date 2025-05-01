# MAIN TASK

The Task at hand is to convert a rails app into a rails api, and a react/vite frontend app

## Achieved

- moved the api into /api
- created a /frontend app
- moved old controllers into /api/app/controllers/old, and created new api controllers
- moved all react components from /app/javascript/components to /frontend/src/components
- added api routes
- added serializers

## TODO

- some .erb/.html.erb views need to be converted into react components in the frontend
- backoffice views need to be implemented
- login pages to access the backoffice views, otherwise cannot be accessed
- check if need to add any api controllers for models. This must fully be CRUD. Add this to the frontend through api.ts and routes.ts
