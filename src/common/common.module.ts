import { Module } from '@nestjs/common';
import { GeminiAdapter } from './adapter/gemini.adapter';
@Module({
	providers: [ GeminiAdapter ],
	exports: [ GeminiAdapter ],
})
export class CommonModule {}