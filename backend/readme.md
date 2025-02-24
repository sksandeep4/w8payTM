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
         2. Database doesn't already contain another user
       2. API Details
         1. Method: POST
         2. Route: /api/v1/user/signup
         3. Body: {username, firstName, lastName, password }
         4. Response: {message:"User created successfully", token: "jwt"}
     2. SignIn
       1. API Details
         1. Method: POST
         2. Route: /api/v1/user/signin
         3. Body: {username, password }
     3. get Users based on filterTerm
       1. API Details
         1. Method: GET
         2. Route: /api/v1/user/bulk
         3. query params : bulk?filter=sand
     4. Update user details
       1. API Details
         1. Method: PUT
         2. Route: /api/v1/user/
         3. body:{password, firstName, lastName}
     
  
- Step 7 - Middleware

  Now we have a user account, we need to gate routes which only authenticated users can hit
  For this, we need to introduce a auth middleware

  Create a middleware.js file that exports an authMiddleware function
     1. Checks the headers for an authorization header (Bearer <token>)
     2. Verifies that the token is valid
     3. Puts the userId in the request object if the token checks out.
     4. If not, return a 403 status error back 

- Step 8 - Create the last 2 routes in User

- Step 9 - Create Bank related Schema

  1. Update the db.js to add one more Schema and export the models 
  2. Accounts Table - Will contain the INR balances of a user
  3. Schema - {
    userId: ObjectId/String,
    balance: float/number
  }
  4. We should reference the Users table in the Schema


- Step 10 - Transactions in databases

  A lot of times, we want the multiple database transactions to be atomic
  Either All of them should update, or none of them should

  This is super important in case of a bank
  
  Things to worry about 
  1. What if the DB crashes right after the first request (Only balance is changed for sender and not for recipient)
  2. What if the Node.js server crashes after the first update?

    It would lead to a database inconsistency. Amount would get debited from the sender and not credited for the recipient.
    If a failure ever happens, the first transaction should rollback
    This is what is called a transaction in a database, We need to implement a transaction on the next set of endpoints that allow users to transfer INR 

- Step 11 - Initialize balances on signup

  Update the signup endpoint to give the user a random balance between 1 and 10000.
  This is so we don't have to integrate with banks and give them random balances to start with.

  In signup route, after creating user with userId and before signing a JWT token, Create a new account 
  await Account.create({
    userId
    balance: 1 + Math.random() * 10000
  })

- Step 12 - Create a new router for accounts

1. Create a new router
  All balances should go to a different express router (that handles all requests to /api/v1/account)
  Create a account router in routes/account.js, export it and do the app.use('/account', accountRouter)
