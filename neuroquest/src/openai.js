/*
  OpenAI GPT API client, securely loading config from environment variables.

  In Vite, all secrets belong in .env files (never hardcoded)! Use VITE_OPENAI_API_KEY.
  This module provides fetchAICompletion to get breakdowns for user-entered goals.

  Note: Consider proxying requests server-side in production so openai key isn't exposed.
*/

// PUBLIC_INTERFACE
export async function fetchAICompletion(goalText) {
  // Loads config from Vite environment variables
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl =
    import.meta.env.VITE_OPENAI_API_BASE_URL || "https://api.openai.com/v1/chat/completions";
  if (!apiKey) throw new Error("OpenAI API key not configured in .env file.");

  // We use OpenAI's Chat endpoint for smart breakdown (GPT-3.5/4)
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

  if (!resp.ok) throw new Error("AI completion failed");
  const data = await resp.json();

  // Returns breakdown text only
  return data?.choices?.[0]?.message?.content?.trim();
}
