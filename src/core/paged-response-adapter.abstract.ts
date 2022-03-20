import { ApiProperty } from '@nestjs/swagger'
import { PagedResponse } from './paged-response.interface'

export abstract class PagedResponseAdapter<T> implements PagedResponse<T> {
	@ApiProperty({ description: 'The total number of results in the filtered, un-paged dataset', example: 1 })
	count: number

	abstract results: T[]
}
