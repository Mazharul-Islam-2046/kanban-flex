import mongoose from "mongoose";


type connectionObject = {
  isConnected?: number;
};


const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string || "", {})

    connection.isConnected = db.connections[0].readyState;

    console.log(`MongoDB connected: ${db.connection.host}:${db.connection.port}`);


  } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
  }

}

export default dbConnect;