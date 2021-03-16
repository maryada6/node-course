const mongodb= require('mongodb');
const {MongoClient,ObjectID}= mongodb

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName="task-manager"

MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
    if(error) return console.log(error);
    const db=client.db(databaseName);
}) 
//delete
// db.collection("tasks").deleteOne({"description":"React"})
// .then((result)=>console.log(result))
// .catch(error=>console.log(error))
// db.collection('users').deleteMany({"age":19})
// .then((result)=>console.log(result))
// .catch(error=>console.log(error))

//update
// db.collection('tasks').updateMany({"status":false},{
    //     $set:{
        //         "status":true
        //     }
        // }).then((result)=>console.log(result))
        // .catch((error)=>console.log(error))
        
        // db.collection('users').updateOne({
            //     _id: new ObjectID("60276ec978361027e4b9aa1b")
            // },{
                //     $inc:{
                    //        "age":+10
                    //     }
                    // }).then((result)=>{console.log(result);})
                    //   .catch((error)=>{console.log(error);})
                    
                    //read
                    // db.collection("tasks").findOne({_id: new ObjectID("60277096d279300174ea5d3b")},(error,task)=>{
                        //      if(error)return console.log(error);
                        //      console.log(task);
                        // })
                        
                        // db.collection('tasks').find({"status":false}).toArray((error,tasks)=>{
                            //      if(error)return console.log(error);
                            //      console.log(tasks);
                            // })
                            
                            // db.collection("users").find({"age":45}).toArray((error,users)=>
                            // {   if(error)return console.log(error);
                            //     console.log(users);
                            // })
                            
                            // db.collection("users").find({"age":45}).count((error,count)=>
                            // {   if(error)return console.log(error);
                            //     console.log(count);
                            // })
                            
                            // db.collection('users').findOne({ _id:new ObjectID( "60276ec978361027e4b9aa1b")},
                            //     (error,user)=>{
                                //         if(error)return console.log(error);
                                //         console.log(user);
                                
                                //     })
                                
                                //create
                                // db.collection("users").insertOne({"name":"Vikram","age":26},
                                // (error,result)=>{
                                    //     if(error)return console.log("unable to insert");
                                    //     console.log(result.ops);
                                    
                                    // });
                                    
                                    // db.collection('users').insertMany([{"name":"Ross","age":45},{"name":"Rachel","age":45}],(error,result)=>{
                                        //     if(error)return console.log("unable to insert documents");
                                        //     console.log(result.ops);
                                        // })
                                        
                                        
                                        // db.collection('tasks').insertMany([{"description":"Node","status":true},{"description":"Mongo","status":false},{"description":"React","status":true}],
                                        // (error,result)=>{
                                            //    if(error)return console.log("unable to insert documents");
                                            //    console.log(result.ops);
                                            // } );
                                            
                                            // const MongoClient= mongodb.MongoClient;
                                            // const OBbjectID= mangodb.OBbjectID;
                                            // const id= new ObjectID();
                                            
                                            // console.log(id.id.length);
                                            // console.log(id.toHexString().length);
                                            // console.log(id.getTimestamp());
                                            
                                            //  console.log("connected to database ");