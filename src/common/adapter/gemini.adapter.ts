import {
  GenerateTextRequest,
  GenerateTextResponse,
  modelIaAdapter,
} from '../interfaces/modelIa.adapter';

import { GoogleGenAI, type GenerateContentResponse } from '@google/genai';

/**
 * This class is an adapter for the Gemini API, which is a service that generates text based on a given prompt.
 * It implements the modelIaAdapter interface, which defines the methods that any AI model adapter should have.
 */
export class GeminiAdapter implements modelIaAdapter {
  private readonly ia = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  /**
   * This method generates text from a prompt using the Gemini Interactions API.
   * @param request The prompt and optional generation settings.
   * @returns The generated text response.
   */
  async generateText( request: GenerateTextRequest ): Promise<GenerateTextResponse> {
    const interaction = await this.ia.interactions.create({
      model: 'gemini-3.8-flash',
      input: request.prompt,
      system_instruction:
        'Responde únicamente en español y en formato markdown.',
    });

    return { output_text: interaction.output_text };
  }

  /**
   * This method generates a streamed response from a prompt using the Gemini API.
   * @param request The prompt and optional generation settings.
   * @returns An async generator that yields response chunks.
   */
  async generateContent(
    request: GenerateTextRequest,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    console.log("vemos el prompt aqui ", request.prompt);
    const interaction = await this.ia.models.generateContentStream({
      model: 'gemini-3.6-flash',
      contents: request.prompt,
      config : {
        systemInstruction: 'Responde únicamente en español y en formato markdown.'
      }
    });

    return interaction;
  }
}
