import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import * as express from 'express';
import { GeminiService } from './gemini.service';

import { BasicPromptDto } from './dtos/basic-prompt';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  /**
   * this endpoint is used to generate stream text
   * @param basicPromptDto
   * @param res
   */
  @Post('/basic-prompt-stream')
  async getBasicPromptStream(
    @Body() basicPromptDto: BasicPromptDto,
    @Res() res: express.Response,
  ) {
    const stream = (await this.geminiService.basicPromptStream(
      basicPromptDto,
    )) as unknown as AsyncIterable<{ text: string }>;

    //res.setHeader('Content-type', 'application/json');
    res.setHeader('Content-type', 'text/plain');
    res.status(HttpStatus.OK);

    //* aqui recorremos el stream
    for await (const chuck of stream) {
      const pieace = chuck.text;
      console.log(
        '🚀 ~ GeminiController ~ getBasicPromptStream ~ pieace:',
        pieace,
      );

      res.write(pieace);
    }

    res.end();
  }

  @Post('/basic-prompt-stream-image')
  @UseInterceptors(FilesInterceptor('files'))
  async getBasicPromptStreamFile(
    @Body() basicPromptDto: BasicPromptDto,
    @Res() res: express.Response,
    //Todo: files
    @UploadedFiles() files: Array<any>
  ) {
    console.log('🚀 ~ GeminiController ~ getBasicPromptStream ~ files:', files);

    const stream = (await this.geminiService.basicPromptStreamImage(
      basicPromptDto,
    )) as unknown as AsyncIterable<{ text: string }>;

    //res.setHeader('Content-type', 'application/json');
    res.setHeader('Content-type', 'text/plain');
    res.status(HttpStatus.OK);

    //* aqui recorremos el stream
    for await (const chuck of stream) {
      const pieace = chuck.text;
      console.log(
        '🚀 ~ GeminiController ~ getBasicPromptStream ~ pieace:',
        pieace,
      );

      res.write(pieace);
    }

    res.end();
  }
}
