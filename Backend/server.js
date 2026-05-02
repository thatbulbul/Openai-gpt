import express from "express";
import "dotenv/config";
import cors from "cors";
import OpenAI from "openai";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"; 

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api",chatRoutes);

const client=new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with Db", err);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
}); 

// app.get("/test", async (req, res) => {
//   try {
//     const response = await client.responses.create({
//       model: "gpt-4.1-mini",
//       input: [
//         {
//           role: "user",
//           content: req.body.message
//         }
//       ]
//     });

//     const reply= response.output[0].content[0].text;
//     res.send(reply);
//      } catch (error) {
//     console.error(error);
//     res.status(500).send("Error");
//   }
// });
  


