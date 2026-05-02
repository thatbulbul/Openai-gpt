import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const getOpenAIAPIResponse = async (messages) => {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: messages
    });

    // safer extraction
    const reply =
      response?.output?.[0]?.content?.[0]?.text || "No response from model";

    return reply;

  } catch (error) {
    console.error("OpenAI Error:", error.message);
    throw error; // let route handle it
  }
};

export default getOpenAIAPIResponse;