import {
  GenerateTextRequest,
  GenerateTextResponse,
  modelIaAdapter,
} from '../interfaces/modelIa.adapter';
import { GoogleGenAI } from '@google/genai';

/**
 * This class is an adapter for the Gemini API, which is a service that generates text based on a given prompt.
 * It implements the modelIaAdapter interface, which defines the methods that any AI model adapter should have.
 */
export class GeminiAdapter implements modelIaAdapter {
  private ia = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  async generateText( request: GenerateTextRequest ): Promise<GenerateTextResponse> {
    const interaction = await this.ia.interactions.create({
      model: 'gemini-3.8-flash',
      input: request.prompt,
      system_instruction:
        'Responde únicamente en español y en formato markdown.',
    });

    console.log(' vemos la info ', interaction.output_text);

    return { output_text: interaction.output_text };
  }
}
