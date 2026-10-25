import { IsNotEmpty, IsString } from "class-validator";

/**
 * BasicPromptDto is a Data Transfer Object (DTO) that represents the structure of the data for a basic prompt request.
 * It is used to validate and transfer data between the client and the server in a structured manner.
 * 
 * This DTO can be extended in the future to include additional properties as needed for the basic prompt functionality.
 */

export class BasicPromptDto {
	@IsString()
	@IsNotEmpty()
	prompt: string;
}
