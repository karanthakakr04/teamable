const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
// We created this function in validator.js file and we are importing it here. 
// Notice how we specified the path ("./validator.js"), it shows that the file is in current directory.
// It also works if we don't specify the file extension.
const { isInvalidEmail, isEmptyPayload } = require('./validator')

// Parse JSON bodies
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

// const DB_USER = process.env.DB_USER
// const DB_PASS = process.env.DB_PASS
// const DEV = process.env
const { DB_USER, DB_PASS, DEV } = process.env

// if (DEV) {
//     const url = 'mongodb://127.0.0.1:27017'
// } else {
//     const url = `mongodb://${DB_USER}:${DB_PASS}@127.0.0.1:27017?authSource=company_db`
// }
const dbAddress = '127.0.0.1:27017'
const url = DEV ? `mongodb://${dbAddress}` : `mongodb://${DB_USER}:${DB_PASS}@${dbAddress}?authSource=company_db`

// Connection URL
/* 
    1 - Create a new Mongo Client
        --> Creates a new client that can talk to the Mongo Server on the URL we provide
        --> We can use that client object and use its methods to connect and interact with the server.
*/
const client = new MongoClient(url)

// Database Name
const dbName = 'company_db'

// Collection Name
const collName = 'employees'

app.get('/get-profile', async function (req, res) {
    // Use connect method to connect to the MongoDB server 
    await client.connect()
    console.log('Connected successfully to server')

    // initiates or get the db & collection
    const db = client.db(dbName)
    const collection = db.collection(collName)

    // get data from database
    const result = await collection.findOne({ id: 1 })
    console.log(result)
    client.close()

    response = {}

    if (result !== null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }

    res.send(response)
})

app.post('/update-profile', async function (req, res) {
    const payload = req.body
    console.log(payload)

    if (isEmptyPayload(payload) || isInvalidEmail(payload)) {
        res.send({ error: "invalid payload. Couldn't update user profle" })
    } else { // updating user profile

        // Use connect method to connect to the MongoDB server 
        await client.connect()
        console.log('Connected successfully to server')

        // initiates or get the db & collection
        const db = client.db(dbName)
        const collection = db.collection(collName)

        // save payload data to the database
        payload['id'] = 1
        const updatedValues = { $set: payload }
        await collection.updateOne({ id: 1 }, updatedValues, { upsert: true })
        client.close()

        res.send({ info: "user profile data updated successfully" })
    }
})

const server = app.listen(3000, function () {
    console.log("app listening on port 3000")
})

module.exports = {
    app,
    server
}