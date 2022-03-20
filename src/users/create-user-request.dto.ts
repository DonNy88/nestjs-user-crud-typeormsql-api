import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsOptional, IsString, Length } from 'class-validator'
import { IntegerId } from '../core'

export class CreateUserRequest {
	@ApiProperty({ description: 'The ID of the user', example: 1 })
	@IntegerId(false)
	id?: number

	@ApiProperty({ description: 'The name of the user', example: 'John' })
	@IsString()
	@Length(1, 64)
	name!: string

	@ApiPropertyOptional({ description: 'The middleName of the user', example: 'Tom' })
	@IsOptional()
	@IsString()
	@Length(1, 64)
	middleName?: string

	@ApiProperty({ description: 'The surname of the user', example: 'Doe' })
	@IsString()
	@Length(1, 64)
	surname!: string

	@ApiProperty({ description: 'The birth place of the user', example: 'San Francisco, CA, USA' })
	@IsString()
	@Length(1, 64)
	birthPlace!: string

	@ApiProperty({ description: 'The birth date of the user, in ISO 8601 format', example: '2022-01-31' })
	@IsDate()
	@Type(() => Date)
	birthDate!: Date
}
