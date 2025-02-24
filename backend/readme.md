// We need 3 routes for user authentication - signup, signin and update info(fName, lName and password)
# User Authentication and Account Management

## Step 2 - Mongoose Schema for User Table

1. Create a `db.js` in the root folder.
2. Import mongoose and connect to the database.
3. Create mongoose schema for Users table.
4. Export the Model from the file.

## Step 3 - Creating Route File Structure

1. In `index.js` file, route all the requests to `/api/v1` to an `apiRouter` defined in `backend/routes/index.js`.
2. Create a new file `backend/routes/index.js` that exports a new express router.
3. Import the router in `index.js` and route all the requests from `/api/v1` to it.

## Step 4 - Route User Requests

1. Create a new User Router in `backend/routes/user.js` and import it.
2. Route all requests that go to `/api/v1/user` to the User Router.
3. Create routes for the User Router to handle requests.

## Step 5 - Add CORS, Body Parser and JSON Web Token

1. **Add CORS**
   1. Run `npm i cors` in `/backend`.
   2. In `backend/index.js`, import it and use it with `app.use(cors())`.
   
2. **Add Body-Parser**
   1. In `backend/index.js`, import it and use it with `app.use(express.json())`.
   
3. **Add JSON Web Token**
   1. Run `npm i jsonwebtoken` in `/backend`.

4. **Export JWT_SECRET**
   1. Export a JWT_SECRET from a new file `backend/config.js`.

5. **Listen on Port 8080**

## Step 6 - Add Backend Auth Routes

1. In the user router, add 3 routes:
   - **SignUp**
     1. This route needs to get information, do input validation using Zod, and store the information in the DB.
     2. Inputs are validated through Zod.
     3. Database doesn't already contain another user.
     4. **API Details:**
        - Method: `POST`
        - Route: `/api/v1/user/signup`
        - Body: `{ username, firstName, lastName, password }`
        - Response: `{ message: "User created successfully", token: "jwt" }`
   
   - **SignIn**
     1. **API Details:**
        - Method: `POST`
        - Route: `/api/v1/user/signin`
        - Body: `{ username, password }`

   - **Get Users Based on `filterTerm`**
     1. **API Details:**
        - Method: `GET`
        - Route: `/api/v1/user/bulk`
        - Query params: `bulk?filter=sand`

   - **Update User Details**
     1. **API Details:**
        - Method: `PUT`
        - Route: `/api/v1/user/`
        - Body: `{ password, firstName, lastName }`

## Step 7 - Middleware

Now that we have a user account, we need to gate routes that only authenticated users can hit. For this, we need to introduce an authentication middleware.

1. Create a `middleware.js` file that exports an `authMiddleware` function:
   - **Checks the headers** for an authorization header (Bearer `<token>`).
   - **Verifies** that the token is valid.
   - **Puts the `userId`** in the request object if the token checks out.
   - **If not**, return a 403 status error back.

## Step 8 - Create the Last 2 Routes in User

Add the last two routes for handling user-specific functionality.

## Step 9 - Create Bank Related Schema

1. Update `db.js` to add one more Schema and export the models.
2. **Accounts Table** - Will contain the INR balances of a user.
3. **Schema:**
   ```js
   {
     userId: ObjectId/String,
     balance: Float/Number
   }
4. We should reference the Users table in the Schema.

## Step 10 - Transactions in Databases

A lot of times, we want multiple database transactions to be atomic. Either all of them should update, or none of them should. This is critical in case of a bank.

### Things to Worry About:
1. **What if the DB crashes** right after the first request? (Only balance is changed for sender and not for recipient)
2. **What if the Node.js server crashes** after the first update?

This would lead to a database inconsistency where the amount would get debited from the sender but not credited for the recipient. If a failure ever happens, the first transaction should rollback.

This is what is called a transaction in a database. We need to implement a transaction on the next set of endpoints that allow users to transfer INR.

## Step 11 - Initialize Balances on Signup

Update the signup endpoint to give the user a random balance between 1 and 10,000. This is so we don't have to integrate with actual banks and can give them random balances to start with.

1. In the signup route, after creating the user with `userId` and before signing the JWT token, create a new account:
   ```js
   await Account.create({
     userId,
     balance: 1 + Math.random() * 10000
   });

## Step 12 - Create a New Router for Accounts

1. **Create a new router**:
   - All balance-related actions should go to a different express router (that handles all requests to `/api/v1/account`).
   - Create an `accountRouter` in `routes/account.js`, export it, and add the following in `index.js`:
     ```js
     app.use('/account', accountRouter);
     ```

## Step 13 - Balance and Transfer Endpoints

Here we will be writing a bunch of APIs for core user balances. There are two endpoints we need to implement:

1. **An endpoint for the user to get their balance:**
   - **Method**: `GET`
   - **Route**: `/api/v1/account/balance`
   - **Response**: 
     - Status code: `200`
     - `{ balance: 200 }`

2. **An endpoint for the user to transfer money to another account:**
   - **Method**: `POST`
   - **Route**: `/api/v1/account/transfer`
   - **Body**: `{ to: String, amount: Number }`

### This second endpoint can be done in two ways:

1. **The Bad Solution**
   1. Get the `fromAccount` details and find if `fromAccount` has sufficient balance.
   2. Check if `toAccount` exists. If not, return `res.status(404).json({ msg: "Recipient does not exist" })`.
   3. If so, update both accounts:
      ```js
      await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
      await Account.updateOne({ userId: toAccount }, { $inc: { balance: amount } });
      res.status(200).json({ msg: "Transfer was successful" });
      ```

2. **The Right Solution - Using Transactions in MongoDB**
   1. Start a session: `await mongoose.startSession()`.
   2. Start a transaction: `session.startTransaction()`.
   3. Fetch accounts within the transaction.
   4. Perform existence checks.
   5. Perform sufficient balance checks.
   6. Perform the transfer.
   7. Commit the transaction: `await session.commitTransaction()`.

