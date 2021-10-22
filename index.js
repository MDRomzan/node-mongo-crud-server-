const express =require("express");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const ObjectId =require("mongodb").ObjectId;

const app =express();
const port =5000;
// middlewere
app.use(cors());
app.use(express.json());
// user: mydbuser1
// password: GKe1fcM0XUxxzMAA
const uri = "mongodb+srv://mydbuser1:GKe1fcM0XUxxzMAA@cluster0.ej29o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run (){
    try{
        await client.connect();
        const database =client.db("foodMaster");
        const usersCollection=database.collection("users")
        // GET API
        app.get("/users",async(req,res)=>{
            const cursor =usersCollection.find({});
            const users= await cursor.toArray();
            res.send(users);
        });
        // Get id api
        app.get("/users/:id",async(req,res)=>{
            const id =req.params.id;
            const query ={_id: ObjectId(id)};
            const user =await usersCollection.findOne(query);
            console.log("load user id:",id);
            res.send(user);
        });
        // post api
    app.post('/users',async(req,res)=>{
        const newUser =req.body;
        const result = await usersCollection.insertOne(newUser);
        console.log("got new user",req.body);
        console.log("added user",result);
        res.json(result);
    });
    // Delete api
    app.delete("/users/:id",async(req,res)=>{
        const id =req.params.id;
        const query = {_id: ObjectId(id)};
        const result =await usersCollection.deleteOne(query);
        console.log("deleting with id",result);
        res.json(result);
    })

    
    } finally{
        // await client.close();
    }
    

}
run().catch(console.dir);



app.get("/",(req,res)=>{
    res.send("Another CRUD START.......");
});
app.listen(port, ()=>{
    console.log("runing server on port ROMZAN ",port)
})