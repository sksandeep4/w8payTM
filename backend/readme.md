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
