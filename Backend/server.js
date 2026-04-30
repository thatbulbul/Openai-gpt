import express from "express";
import "dotenv/config";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const client=new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

app.get("/test", async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: req.body.message
        }
      ]
    });

    const reply= response.output[0].content[0].text;
    res.send(reply);
     } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});
  

app.listen(PORT, () => {
  console.log(`server runnng on ${PORT}`);
});
