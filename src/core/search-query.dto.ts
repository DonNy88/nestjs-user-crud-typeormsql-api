import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray } from 'class-validator'
import { ArrayParamTransform } from './array-param-transform.decorator'

export class SearchQuery {
	@ApiPropertyOptional({ description: 'A list queries to apply separated by a comma ', type: String, example: 'london,Daniel', default: '' })
	@ArrayParamTransform()
	@IsArray()
	q: string[] = []
}
