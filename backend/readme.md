// We need 3 routes for user authentication - signup, signin and update info(fName, lName and password)

- Step 2 - Mongoose schema for User Table

  1. Create a db.js in the root folder
  2. Import mongoose and connect to the database
  3. Create mongoose schema for Users table
  4. Export the Model from the file

- Step 3 - Creating route file structure

  1. In index.js file, route all the requests to /api/v1 to an apiRouter defined in backend/routes/index.js
  2. Create a new file backend/routes/index.js that exports a new express router
  3. Import the router in index.js and route all the request from /api/v1 to it

- Step 4 - Route User Requests

  1. Create a new User Router in backend/routes/user.js and import it
  2. Route all requests that go to /api/v1/user to the User Router
  3. Create routes for the User Router to handle requests

- Step 5 - Add cors, Body Parser and jsonwebtoken

  1. Add cors
     1. npm i cors in /backend
     2. in backend/index.js, import it and app.use(cors())
  2. Add body-parser
     1. in backend/index.js, import it and app.use(express.json())
  3. Add jsonwebtoken
     1. npm i jsonwebtoken in /backend
  4. Export JWT_SECRET
     1. Export a JWT_SECRET from a new file backend/config.js
  5. Listen on port 8080

- Step 6 - Add backend auth routes

  1.
  2.
  3.
  4.
