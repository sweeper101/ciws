import  Mongoose from "mongoose";


function DbConnect(){

        const uri = 'mongodb+srv://work:mode@cluster0.wkfxt.mongodb.net/Work?retryWrites=true&w=majority';

        try {
            // Connect to the MongoDB cluster
            Mongoose.connect(
                uri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log(" Mongoose is connected"),
            );
        } catch (e) {
            console.log("could not connect");
        }
        
        const dbConnection = Mongoose.connection;

        dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
        dbConnection.once("open", () => console.log("Connected to DB!"));

       // return dbConnection;

}


export default DbConnect;