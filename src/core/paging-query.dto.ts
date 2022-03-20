import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

export class PagingQuery {
	@ApiPropertyOptional({ description: 'The page offset of results to return', default: 0, minimum: 0, maximum: Number.MAX_VALUE, type: Number })
	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(Number.MAX_VALUE)
	@Type(() => Number)
	pageIndex = 0

	@ApiPropertyOptional({ description: 'The limit of number of results to return', default: 50, minimum: 1, maximum: 100, type: Number })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(100)
	@Type(() => Number)
	pageSize = 50

	toDatabaseLimit(): number {
		return this.pageSize
	}

	toDatabaseOffset(): number {
		return this.pageSize * this.pageIndex
	}
}
