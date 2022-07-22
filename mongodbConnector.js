const mongoclient = require("mongodb").MongoClient

let DBURL = "mongodb+srv://nexstacks:pass123@billionlives.rclwy.mongodb.net/imworks?retryWrites=true&w=majority"

let server = null

const connect = (callBack) => {
    mongoclient.connect(DBURL, { useUnifiedTopology: true }, (err, db) => {
        if(err){
            console.log("Error in Connecting to Database "+err);
        }else{
            console.log("Database connected");
            server = db
            callBack()
        }
    })
}


function collection(value){
    return server.db().collection(value);
}


module.exports={
    connect,
    collection
}