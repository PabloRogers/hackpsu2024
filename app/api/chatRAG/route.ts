import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

interface InputType {
  context: string; // replace string with the actual type of context
  question: string; // replace string with the actual type of question
}

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const INDIVIDUAL_TEMPLATE = `Answer the user's questions based only on the following context. If the answer is not in the context, reply politely that you do not have that information available.:
==============================
Context: {context}
==============================

user: {question}
assistant:`;

const SUMMARY_TEMPLATE = `Summarize and synthesize the following responses to answer the user's question. Don't mention that there are responses in the background. If there's no relevant information in the responses, state that politely:
==============================
Individual responses:
{responses}
==============================
Current conversation: {chat_history}
User's question: {question}
Final summarized answer:`;

export async function POST(req: Request) {
  try {
    console.log("Starting POST request processing");

    const { messages } = await req.json();

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const textFiles = [
      "Connecting.txt",
      "HandlingData.txt",
      "ICDSPolicies.txt",
      "Overview.txt",
      "RoarRestrictedAp.txt",
      "SlurmRosettaStone.txt",
      "SubmittingJobs.txt",
    ];

    const txtContents = textFiles.map((file) => {
      const filePath = path.join(process.cwd(), "app/data/UserGuide", file);
      console.log(`Reading file: ${filePath}`);
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      const content = fs.readFileSync(filePath, "utf-8");

      return content;
    });
    console.log("All files read successfully");

    const IndividualModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    const SummaryModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-3.5-turbo",
      temperature: 0,
      streaming: true,
    });

    console.log("ChatOpenAI models created successfully");

    const IndividualTextPrompt =
      PromptTemplate.fromTemplate(INDIVIDUAL_TEMPLATE);

    const IndividualTextChain = RunnableSequence.from([
      {
        context: (input: InputType) => input.context,
        question: (input: InputType) => input.question,
      },
      IndividualTextPrompt,
      IndividualModel,
    ]);

    console.log("Starting individual text processing");
    const IndividualResponses = await Promise.all(
      txtContents.map(async (content, index) => {
        try {
          const response = await IndividualTextChain.invoke({
            context: content,
            question: currentMessageContent,
          });
          console.log(`Response from file ${textFiles[index]}:`, response);
          // Ensure the response is a string
          return typeof response === "string"
            ? response
            : JSON.stringify(response);
        } catch (error) {
          console.error(`Error processing file ${textFiles[index]}:`, error);
          return `Error processing file ${textFiles[index]}:`;
        }
      })
    );
    console.log("Individual text processing completed");

    // Filter out empty responses and join
    const validResponses = IndividualResponses.map((response) => {
      if (typeof response === "string") {
        try {
          const parsedResponse = JSON.parse(response);
          return parsedResponse.kwargs?.content || "";
        } catch (error) {
          console.error("Error parsing response:", error);
          return response.trim();
        }
      } else if (response && typeof response === "object") {
        const responseObject = response as { kwargs?: { content?: string } };
        return responseObject.kwargs?.content || JSON.stringify(response);
      } else {
        return "";
      }
    }).filter((response) => response !== "");
    const joinedResponses = validResponses.join("\n\n");

    console.log("Joined responses:", joinedResponses);

    const SummaryPrompt = PromptTemplate.fromTemplate(SUMMARY_TEMPLATE);
    const SummaryChain = RunnableSequence.from([
      {
        responses: () => joinedResponses,
        chat_history: () => formattedPreviousMessages.join("\n"),
        question: () => currentMessageContent,
      },
      SummaryPrompt,
      SummaryModel,
      new HttpResponseOutputParser(),
    ]);

    const stream = await SummaryChain.stream({});
    console.log("Summary generation completed");

    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer())
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error in POST request:", e);
      return Response.json(
        { error: e.message, stack: e.stack },
        { status: 500 }
      );
    } else {
      // Handle the case where e is not an instance of Error
    }
  }
}
