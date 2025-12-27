// RAG Q&A Engine using Gemini
// Answers user questions using knowledge chunks as context

import { GoogleGenerativeAI } from '@google/generative-ai';
import { semanticSearch } from './search';
import { QuestionContext, Answer, Citation } from './types';
import { getCitations } from './data';

const QA_MODEL = 'gemini-2.0-flash-exp';
const TEMPERATURE = 0.3; // Lower temperature for more deterministic answers
const MAX_CONTEXT_CHUNKS = 5;

/**
 * Answer a user question using RAG (Retrieval Augmented Generation)
 * @param question - The user's question
 * @param context - Context about the user's location and situation
 * @returns Answer with citations and sources
 */
export async function answerQuestion(
  question: string,
  context: QuestionContext
): Promise<Answer> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY environment variable is not set');
  }

  try {
    // 1. Semantic search for relevant knowledge chunks
    const searchResults = await semanticSearch(question, {
      state: context.state,
      county: context.county,
      topic: context.topic,
      limit: MAX_CONTEXT_CHUNKS,
      similarityThreshold: 0.6, // Lower threshold for Q&A to get more context
    });

    if (searchResults.length === 0) {
      return {
        answer: `I don't have enough information about ${context.county}, ${context.state} to answer your question accurately. Please consult with a local DUI attorney for specific guidance.`,
        confidence: 0,
        citations: [],
        sources: [],
        relatedQuestions: [],
      };
    }

    // 2. Build context from top search results
    const knowledgeContext = searchResults
      .map((result, index) => `[Source ${index + 1}]\n${result.text}`)
      .join('\n\n---\n\n');

    // 3. Build the RAG prompt
    const prompt = buildRAGPrompt(question, context, knowledgeContext);

    // 4. Call Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: QA_MODEL,
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: TEMPERATURE,
        maxOutputTokens: 1024,
      },
    });

    const answer = result.response.text();

    // 5. Calculate confidence based on search result similarities
    const avgSimilarity =
      searchResults.reduce((sum, r) => sum + r.similarity, 0) / searchResults.length;
    const confidence = Math.min(avgSimilarity, 0.95); // Cap at 95%

    // 6. Get citations from the source documents
    const sourceIds = [...new Set(searchResults.map((r) => r.source.id))];
    const citations = await getCitations({
      sourceIds,
      state: context.state,
      county: context.county,
    });

    // 7. Extract sources
    const sources = searchResults.map((r) => ({
      id: r.source.id,
      fileName: r.source.fileName,
      fileType: r.source.fileType,
      filePath: r.source.filePath,
      createdAt: new Date().toISOString(), // Placeholder
      processingStatus: 'completed',
    }));

    // 8. Generate related questions
    const relatedQuestions = generateRelatedQuestions(question, context);

    return {
      answer,
      confidence,
      citations: citations.slice(0, 10), // Limit to top 10 citations
      sources,
      relatedQuestions,
    };
  } catch (error) {
    console.error('Error answering question:', error);
    throw new Error(`Failed to answer question: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Build the RAG prompt for Gemini
 */
function buildRAGPrompt(
  question: string,
  context: QuestionContext,
  knowledgeContext: string
): string {
  return `You are a helpful legal information assistant specializing in DUI law.

**Location Context:** ${context.county}, ${context.state}
${context.topic ? `**Topic:** ${context.topic}` : ''}

**Relevant Research Documents:**
${knowledgeContext}

**User Question:** ${question}

**Instructions:**
1. Answer the question based ONLY on the research documents provided above
2. Be specific to ${context.county}, ${context.state}
3. If the research doesn't contain enough information to answer fully, say so
4. Provide practical, actionable information
5. Use clear, simple language
6. Include specific details like fees, deadlines, and procedures when available
7. Always end with a disclaimer

**Important:**
- This is general information, NOT legal advice
- Laws and procedures can change
- Recommend consulting with a local DUI attorney for specific guidance

**Answer:**`;
}

/**
 * Generate related questions based on the original question and context
 */
function generateRelatedQuestions(
  question: string,
  context: QuestionContext
): string[] {
  const { county, state, topic } = context;

  const questionMap: Record<string, string[]> = {
    impound: [
      `How much does it cost to get my car out of impound in ${county}?`,
      `Where is the impound lot in ${county}?`,
      `What documents do I need to retrieve my car from impound?`,
      `How long do I have to pick up my car from impound in ${county}?`,
    ],
    bail: [
      `What is the typical bail amount for DUI in ${county}?`,
      `How do I post bail in ${county}?`,
      `Can I get released without bail in ${county}?`,
      `How long does it take to get out of jail after DUI arrest in ${county}?`,
    ],
    dmv: [
      `How do I request a DMV hearing in ${state}?`,
      `What is the deadline for requesting a DMV hearing in ${state}?`,
      `What happens if I miss the DMV hearing deadline in ${state}?`,
      `Can I get a restricted license in ${state}?`,
    ],
    court: [
      `Where is the court for DUI cases in ${county}?`,
      `What happens at a DUI arraignment in ${county}?`,
      `How long does a DUI case take in ${county}?`,
      `What are the penalties for first offense DUI in ${state}?`,
    ],
    scram: [
      `How much does SCRAM monitoring cost in ${county}?`,
      `How long do I have to wear a SCRAM bracelet in ${state}?`,
      `Who installs SCRAM devices in ${county}?`,
      `What happens if SCRAM detects alcohol in ${state}?`,
    ],
    license: [
      `How do I get my license back after DUI in ${state}?`,
      `Do I need an ignition interlock device in ${state}?`,
      `How much does license reinstatement cost in ${state}?`,
      `Can I drive with a suspended license in ${state}?`,
    ],
  };

  const relatedQuestions = topic && questionMap[topic]
    ? questionMap[topic]
    : [
        `What are the penalties for DUI in ${county}, ${state}?`,
        `How do I find a DUI attorney in ${county}?`,
        `What should I do immediately after a DUI arrest in ${state}?`,
        `What are the deadlines I need to know about after DUI arrest in ${state}?`,
      ];

  return relatedQuestions.slice(0, 4);
}

/**
 * Generate FAQs for a specific county and topic
 * @param county - County name
 * @param state - State name
 * @param topic - Topic (impound, bail, dmv, court, scram, license)
 * @returns Array of FAQ objects
 */
export async function generateFAQs(
  county: string,
  state: string,
  topic?: string
): Promise<Array<{ question: string; answer: string }>> {
  const commonQuestions = [
    `What should I do immediately after a DUI arrest in ${county}?`,
    `How much does a DUI cost in ${county}, ${state}?`,
    `What are the penalties for first offense DUI in ${state}?`,
    `How do I request a DMV hearing in ${state}?`,
    `Where do I find a DUI attorney in ${county}?`,
  ];

  const faqs: Array<{ question: string; answer: string }> = [];

  for (const question of commonQuestions) {
    try {
      const result = await answerQuestion(question, { county, state, topic });
      faqs.push({
        question,
        answer: result.answer,
      });
    } catch (error) {
      console.error(`Error generating FAQ for "${question}":`, error);
    }
  }

  return faqs;
}
