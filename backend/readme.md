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

  1. In the user router, add 3 routes
     1. SignUp
     1. This route needs to get information, do input validation using zod and store the information in the db provided
     1. Inputs are correct(validated through zod)
     1. Database doesn't already contain another user
     1. API Details
     1. Method: POST
     1. Route: /api/v1/user/signup
     1. Body: {username, firstName, lastName, password }
     1. Response: {message:"User created successfully", token: "jwt"}
     1. SignIn
     1. API Details
     1. Method: POST
     1. Route: /api/v1/user/signin
     1. Body: {username, password }

  - Step 6 - Add backend auth routes

    Now we have a user account, we need to gate routes which only authenticated users can hit
    For this, we need to introduce a auth middleware

    Create a middleware.js file that exports an authMiddleware function

    1.  Checks the headers for an authorization header (Bearer <token>)
    2.  Verifies that the token is valid
    3.  Puts the userId in the request object if the token checks out.
    4.  If not, return a 403 status error back to the user
