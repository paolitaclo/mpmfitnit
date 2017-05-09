# EpicLand API
[EpicLand](http://paolitaclo-routinegenerator.herokuapp.com/api-docs/) is a routine generator API implementing a framework APi Swagger.

The API provides for the developers exercise's routines, exercise by type of muscle, a list of equipments, list of muscles targeted and the list of exercises that it has stored in the DataBase.

## Endpoints

- GET /exercises
- GET /exercises/:id
- POST /users
- GET users/:id
- DELETE /users/:id
- PATCH /users/:id
- POST /token
- GET /exercises/types
- GET /exercises/types/:id
- GET /equipment
- GET /equipment/:id
- GET /muscles
- GET muscles/:id
- GET /routines

### Running the server
To run the server, run:

```
npm start
```

To view the Swagger UI interface:

```
open http://localhost:10010/docs
```

This project leverages the mega-awesome [swagger-tools](https://github.com/apigee-127/swagger-tools) middleware which does most all the work.
