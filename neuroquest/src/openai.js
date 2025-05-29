/* global fetch */
/**
 * OpenAI GPT API client.
 * - Loads config exclusively from environment variables using Vite's import.meta.env
 * - Never exposes any secret in code or version control!
 * - Use VITE_OPENAI_API_KEY in your .env[.mode] file.
 *
 * SECURITY: Never commit your real OpenAI or Firebase secrets.
 *
 * API Key and endpoint are set via environment. In production, you should proxy requests
 * server-side to further protect the OpenAI key—and rate limit/validate.
 */

// PUBLIC_INTERFACE
/**
 * Fetches an AI breakdown of a major goal using OpenAI's ChatGPT API
 * @param {string} goalText The user's main goal or quest
 * @returns {Promise<string>} AI-generated breakdown, grouped under Main Questline, Weekly Side Quests, Daily Microtasks
 */
export async function fetchAICompletion(goalText) {
  // Load from .env file (via Vite).
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENAI_API_BASE_URL || "https://api.openai.com/v1/chat/completions";

  if (!apiKey || !apiKey.trim()) {
    throw new Error("OpenAI API key not configured in your .env file! Add VITE_OPENAI_API_KEY.");
  }

  // Compose chat message payload per OpenAI docs
  const completionParams = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are QuestMaster AI. When given a major goal by the user, break it down into a series of hierarchical quests and sub-tasks in a concise but creative, motivational format. Respond only with the structured breakdown (no preamble, no extra info). Group tasks as: 'Main Questline', 'Weekly Side Quests', 'Daily Microtasks'.",
      },
      {
        role: "user",
        content: goalText,
      },
    ],
    max_tokens: 600,
    temperature: 0.85,
  };

  const resp = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(completionParams),
  });

  if (!resp.ok) {
    let msg = "[AI completion failed]";
    try {
      const errdata = await resp.json();
      msg += ": " + (errdata?.error?.message || resp.statusText);
    } catch {
      // If error occurs parsing error JSON, just throw the default message.
    }
    throw new Error(msg);
  }
  const data = await resp.json();
  return data?.choices?.[0]?.message?.content?.trim();
}
