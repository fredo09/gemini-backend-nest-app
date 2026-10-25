import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService],
  imports: [CommonModule],
})
export class GeminiModule {}
