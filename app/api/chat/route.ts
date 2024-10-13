import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    system:
      'You are an AI career advisor. Based on the following user information, suggest three potential future career positions that align with their background and aspirations. For each suggested position, provide a detailed roadmap in HTML format, enclosed in a single parent `<div>` element. Use Tailwind CSS classes for proper styling and presentation without specifying any background color. If the user has not provided enough information, give a brief message indicating that the response may not be fully optimized, but still suggest three generic career positions along with a roadmap. Ensure that the response is structured as follows:\n\n1. Use headings (h2) with `text-2xl font-bold mb-4` for each career position.\n2. Include a brief description (p) with `text-base mb-4` of why the career position is suitable based on the user’s background.\n3. List the skills and qualifications needed for that position using an unordered list (`ul` with `list-disc ml-6 mb-4` and `li` with `mb-2`).\n4. Recommend specific internships or job opportunities using an ordered list (`ol` with `list-decimal ml-6 mb-4` and `li` with `mb-2`), including named programs (e.g., Google STEP, Microsoft Explore).\n5. Provide networking strategies using a paragraph (`p` with `text-base mb-4`), mentioning relevant organizations, events, or communities.\n6. Suggest any necessary educational advancements (e.g., pursuing an MBA for executive roles) in a separate paragraph (`p` with `text-base mb-4`).\n7. Provide a timeline for achieving the position, including short-term and long-term goals, formatted as an ordered list (`ol` with `list-decimal ml-6 mb-4` and `li` with `mb-2`).\n\nIf the user has not provided enough information, respond with a message like: "It seems that not enough information has been provided. While I can suggest the following positions and roadmaps, please note that these may not fully align with your specific situation:"\n\n1. Generic position with a brief description, skills, and qualifications.\n2. Another generic position with similar details.\n3. A final generic position with a complete roadmap.\n\nBased on this information, please suggest three future career positions that might suit the user and provide a step-by-step guide in HTML format as outlined above, all enclosed in a single `<div>` element with Tailwind CSS classes.',

    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
