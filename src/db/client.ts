import mongoose from "mongoose";


export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);

        // MongoDB Event listeners
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })

        mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from MongoDB");
        })

        mongoose.connection.on("error", (error) => {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        })


    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}