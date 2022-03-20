import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UserResponse {
	@ApiProperty({ description: 'The ID of the user', example: 1 })
	id: number

	@ApiProperty({ description: 'The name of the user', example: 'John' })
	name!: string

	@ApiPropertyOptional({ description: 'The middleName of the user', example: 'Tom' })
	middleName?: string

	@ApiProperty({ description: 'The surname of the user', example: 'Doe' })
	surname!: string

	@ApiProperty({ description: 'The birth place of the user', example: 'San Francisco, CA, USA' })
	birthPlace!: string

	@ApiProperty({ description: 'The birth date of the user, in ISO 8601 format', example: '2022-01-01' })
	birthDate!: Date
}
