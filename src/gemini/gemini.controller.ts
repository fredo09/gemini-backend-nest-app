import { Controller, Get, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';

import { BasicPromptDto } from './dtos/basic-prompt';
/**
 * Exposes the Gemini API endpoints for a test greeting, basic prompt
 * generation, and streaming prompt responses.
 * Uses the injected `geminiService` property to handle each request.
 * @property geminiService Service that processes Gemini operations.
 * @method getHelloWord Handles GET /gemini/hello-word.
 * @method basicPrompt Handles POST /gemini/basic-prompt with a BasicPromptDto.
 * @method getBasicPromptStream Handles POST /gemini/basic-prompt-stream with a BasicPromptDto.
 */
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  /**
   * this endpoint is used to test the basic functionality of the GeminiController.
   * @returns
   */
  @Get('/hello-word')
  getHelloWord() {
    return this.geminiService.getHelloWord();
  }

  /**
   * this endpoint is used to test the basic prompt functionality of the GeminiService.
   * @returns 
   */
  @Post('/basic-prompt')
  basicPrompt(@Body() basicPromptDto: BasicPromptDto) {
    return this.geminiService.basicPrompt(basicPromptDto);
  }

  @Post('/basic-prompt-stream')
  getBasicPromptStream(@Body() basicPromptDto: BasicPromptDto) {
    return this.geminiService.basicPromptStream(basicPromptDto);
  }
}
