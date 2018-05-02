## How to start server:

To start server please verify that you have installed mongoDB and mongoose then run the following code in your command line `npm run dbon` and `node main.js`

This will allow us to connect to our MongoDB. Mongoose acts as the middleware that connects us from our computer to the MongoDB.

## Request endpoints:

#### paintingRouter.post()

`paintingRouter.post()` is how we send new data to MongoDB.  If there is no database available to receive the new data we've attempted to send, the server will display a 400 error and error message will read 'Responding with a 400 error code.'   If the new data is posted successfully to MongoDB, the server will display a 200 message and the message will read 'POST - responding with a 200 status code'.

#### paintingRouter.get()

`paintingRouter.get()` is how we send retrieve data from MongoDB.  If there is no database available to receive the new data we've attempted to send, the server will display a 404 error and error message will read 'GET - responding with a 404 status code'.  If the new data is retrieved successfully from MongoDB the server will display a 200 message and the message will read 'GET - responding with a 200 status code'.

#### paintingRouter.delete() 

`paintingRouter.delete()` is how we delete data from MongoDB.  If there is no database available to delete the data we've attempted to delete, the server will display a 404 error and error message will read 'DELETE - responding with a 404 status code.'  If there is no specific id available in the database to delete, the server will display a 400 error and error message will read 'DELETE - no id in the query responding with a 400 status code.'  If the new data is posted successfully to MongoDB the server will display a 200 message and the message will read 'DELETE - responding with a 200 status code'.

#### paintingRouter.post() 

`paintingRouter.post()` is how we send new data to MongoDB.  If there is no database available to receive the new data we've attempted to send, the server will display a 400 error and error message will read 'Responding with a 400 error code.'   If the new data is posted successfully to MongoDB the server will display a 200 message and the message will read 'POST - responding with a 200 status code'.

Developed by Josiah G, Sarah G, and Zachary S. 
version 1.0.0 
