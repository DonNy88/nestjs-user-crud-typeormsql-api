import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsOptional } from 'class-validator'
import { SortDirectionType, SortQuery } from './sort-query.interface'

const SORT_DIRECTION_TYPE_DOMAIN = ['asc', 'desc', 'ASC', 'DESC'] as SortDirectionType[]

export abstract class SortQueryAdapter<SortFieldType> implements SortQuery<SortFieldType> {
	@ApiPropertyOptional({ description: 'Sorting direction', default: 'asc', example: 'asc', enum: SORT_DIRECTION_TYPE_DOMAIN })
	@IsOptional()
	@IsIn(SORT_DIRECTION_TYPE_DOMAIN)
	sortDirection: SortDirectionType = 'asc'

	abstract sortField: SortFieldType
}
