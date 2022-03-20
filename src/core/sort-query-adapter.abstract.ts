import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsOptional } from 'class-validator'
import { SortDirectionType, SortQuery } from './sort-query.interface'

const SortDirectionTypeDomain = ['asc', 'desc', 'ASC', 'DESC'] as SortDirectionType[]

export abstract class SortQueryAdapter<SortFieldType> implements SortQuery<SortFieldType> {
	@ApiPropertyOptional({ description: 'Sorting direction', default: 'asc', example: 'asc', enum: SortDirectionTypeDomain })
	@IsOptional()
	@IsIn(SortDirectionTypeDomain)
	sortDirection: SortDirectionType = 'asc'

	abstract sortField: SortFieldType
}
