"use strict";

import { streamOpenAIResponse } from './streamOpenAIResponse.mjs';

export const handler = awslambda.streamifyResponse(
  async (event, responseStream, _context) => {
    // Get current process time
    const startTime = process.hrtime();

    // Start response stream
    const metadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      }
    };
    responseStream = awslambda.HttpResponseStream.from(responseStream, metadata);
    responseStream.write("\nRequest started.");
    responseStream.write(`\n---\n`);

    // Stream OpenAI response 1
    const res_1 = await streamOpenAIResponse(responseStream, {
      messages: [{ role: "user", content: event.queryStringParameters.message }], // The user's message
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 100
    });

    responseStream.write(`\n`);

    // Stream OpenAI response 2
    const res_2 = await streamOpenAIResponse(responseStream, {
      messages: [{ role: "user", content: "Answer in two sentences: " + res_1 + " Answer: " }],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 200
    });

    // ... add more responses as needed here.

    // Return execution time (optional)
    const hrTime = process.hrtime(startTime);
    const totalSeconds = hrTime[0] + hrTime[1] / 1e9;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(2);
    responseStream.write(`\n---\n`);
    responseStream.write(`Execution Time: ${minutes} minutes ${seconds} seconds\n`);

    // End response stream
    responseStream.end();
  }
);
