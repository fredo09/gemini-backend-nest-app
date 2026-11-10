import { Injectable } from '@nestjs/common';
import { BasicPromptDto } from './dtos';

import { GeminiAdapter } from '../common/adapter/gemini.adapter';

/**
 * Handles Gemini service operations: returns a test greeting, generates text
 * from a basic prompt, and provides a streaming prompt placeholder.
 * Uses the injected `geminiAdapter` property to generate text and
 * `BasicPromptDto` as the prompt input for both prompt methods.
 * @property geminiAdapter Gemini adapter used for text generation.
 * @method getHelloWord Returns a test greeting.
 * @method basicPrompt Generates text from the provided prompt.
 * @method basicPromptStream Placeholder for streaming prompt responses.
 */
@Injectable()
export class GeminiService {
  constructor(private readonly geminiAdapter: GeminiAdapter) {}

  /**
   * this method is used to test the basic functionality of the GeminiService.
   * @returns
   */
  getHelloWord() {
    return 'Hello Word from GeminiService';
  }

  /**
   * this method is used to test the basic prompt functionality of the GeminiService.
   * @param basicPromptDto
   * @returns
   */
  async basicPrompt(basicPromptDto: BasicPromptDto) {
    const { prompt } = basicPromptDto;
    return await this.geminiAdapter.generateText({ prompt });
  }

  /**
   * this method is used to generate stream text
   * @param basicPromptDto 
   * @returns 
   */
  async basicPromptStream(basicPromptDto: BasicPromptDto) {
    const { prompt } = basicPromptDto;
    return await this.geminiAdapter.generateContent({ prompt });
  }

  /**
   * This is a method that generates a stream of image content based on a given prompt.
   * @param basicPromptDto 
   * @returns 
   */
  async basicPromptStreamImage(basicPromptDto: BasicPromptDto) {
    const { prompt} = basicPromptDto;
    return await this.geminiAdapter.generateContent({ prompt, model: 'gemini-3.5-image-lite' });
  }
}
