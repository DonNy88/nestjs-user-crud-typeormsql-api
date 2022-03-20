import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsPositive, Min } from 'class-validator'

export class PagingQuery {
	@ApiPropertyOptional({ description: 'The page offset of results to return', default: 0, minimum: 0, maximum: Number.MAX_VALUE, type: Number })
	@IsOptional()
	@Min(0)
	@Type(() => Number)
	pageIndex = 0

	@ApiPropertyOptional({ description: 'The limit of number of results to return', default: 50, minimum: 1, maximum: 100, type: Number })
	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	pageSize = 50

	toDatabaseLimit(): number {
		return this.pageSize
	}

	toDatabaseOffset(): number {
		return this.pageSize * this.pageIndex
	}
}
