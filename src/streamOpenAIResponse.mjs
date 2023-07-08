"use strict";

// Load .env variables
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

// Function to get an OpenAI response (derived from https://umaar.com/dev-tips/269-web-streams-openai/):
export async function streamOpenAIResponse(responseStream, config) { // Initialize responseFull inside the function
    let responseFull = '';

    // Vanilla JS OpenAI fetch
    config.stream = true;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(config)
    });

    // Process streaming response
    const decoder = new TextDecoder();
    for await(const chunk of response.body) {
        const decodedChunk = decoder.decode(chunk);
        const lines = decodedChunk.split("\n").map((line) => line.replace("data: ", "")).filter((line) => line.length > 0).filter((line) => line !== "[DONE]").map((line) => JSON.parse(line));
        for (const line of lines) {
            const {
                choices: [
                    {
                        delta: {
                            content
                        }
                    }
                ]
            } = line;
            if (content) { // Stream the response back.
                responseStream.write(content);
                responseFull += content;
            }
        }
    }

// Finally, also return the full response
return responseFull;
}
