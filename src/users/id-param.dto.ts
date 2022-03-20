import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IntegerId } from '../core'

export class IdParam {
	@ApiProperty({ description: 'The ID of the user', example: '1' })
	@Type(() => Number)
	@IntegerId()
	id: number
}
