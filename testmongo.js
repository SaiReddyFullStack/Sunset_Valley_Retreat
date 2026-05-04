
import mongoose from "mongoose";

async function test() {
  try {
    await mongoose.connect(
      "mongodb+srv://saireddy:Sai12345@cluster0.pp3f2mw.mongodb.net/sunsetvalley?retryWrites=true&w=majority&appName=Cluster0",
      {
        serverSelectionTimeoutMS: 30000,
      }
    );

    console.log("✅ MongoDB connected successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:", error);
    process.exit(1);
  }
}

test();