const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;

//middleware
app.use(cors()) // to send request from frontend to server
app.use(express.json());   //to help handle json data on server site

//simpleDBUser
//WyFdIoiI8ckV9wvE
//from mongoDB
const uri = "mongodb+srv://simpleDBUser:WyFdIoiI8ckV9wvE@cluster0.ztnzz8f.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('simple crud sever is running!')
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    const usersDB = client.db("usersDB");
    const usersCollection = usersDB.collection('users')
    
    app.get('/users',async(req,res)=>{
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);

    })

    //add database related apis here
    app.post('/users',async(req,res)=>{
      const newUser = req.body;
      console.log('User unfo:', newUser);
      const result = await usersCollection.insertOne(newUser)
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`simple crud server is running  on port ${port}`)
})




// async function run(){
//     // await
// }

// run().catch(console.dir)

// try{

// }

// finally{

// }

/**
 * 1. at least one user
 * 2. set uri with userId and password
 * 3. create a mongodb client 
 * 4. add a run function to connect to the database
 * 5. use try finally inside it to connect the client
 * 6. ping the database to see server is alive or not
*/