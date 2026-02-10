import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI;

  // agar yaha per global cache connection hai toh reopen ya rerender nahi hoga serverless connection mei 
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}
let cached = global.mongoose;
// vercel per check karne ke liye yh code 
if(!cached){
    cached = global.mongoose = {conn: null, promise:null};
}

async function dbConnect() {
    if (cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const object = {
            bufferCommands:false,  // timeout error nahi hai isliye we used this 
            serverSelectionTimeoutMS:5000
        }

        //create a  new connection and returrn promise and store in the cache
        cached.promise = mongoose.connect(MONGODB_URI, object).then((mongoose)=>{
            return mongoose;
        })
    }
    try{
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null
        throw error;

    }
    return cached.conn

    
}
export default dbConnect;