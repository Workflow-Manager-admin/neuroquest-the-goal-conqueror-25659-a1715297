/* eslint-disable no-undef */
// OpenAI API setup entry point (browser usage requires secret management server-side!)
// PUBLIC_INTERFACE

// Example: Use server endpoint to proxy OpenAI requests for safety, not direct API key in client.
// Fill out with a fetch-based call for prompt completion integration.

// If you need NodeJS compat, install node-fetch and polyfill here.
// For browser code, fetch will be available.

export async function fetchAICompletion(prompt) {
  // Use your backend endpoint or secure function here.
  // TODO: replace this fetch with a real endpoint or a polyfill for NodeJS if needed.
  const resp = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });
  if (!resp.ok) throw new Error("AI completion failed");
  return resp.json();
}
