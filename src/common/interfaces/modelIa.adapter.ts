/**
 * This file defines the modelIaAdapter interface and related request and response interfaces for generating text using a language model.
 * The modelIaAdapter interface specifies the contract that any AI model adapter should adhere to, ensuring consistency in how text generation requests are handled.
 * 
 * The GenerateTextRequest interface defines the structure of the request object that is sent to the AI model for text generation.
 * It includes properties such as the prompt, model, configuration options, temperature, and maximum output tokens.
 * 
 * @interface modelIaAdapter
 * @method generateText - Method to generate text based on a given request.
 */

export interface modelIaAdapter {
	generateText(
    request: GenerateTextRequest,
  ): Promise<GenerateTextResponse>;
}

export interface GenerateTextRequest {
  prompt: string;
  model?: string;
  system_instruction?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GenerateTextResponse {
  output_text?: string | undefined;
}