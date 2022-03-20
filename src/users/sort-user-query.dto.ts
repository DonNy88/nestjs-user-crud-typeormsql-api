import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsOptional, IsString } from 'class-validator'
import { SortQueryAdapter } from '../core'
import { User } from './user.entity'

const sortFieldDomain = ['id', 'name', 'middleName', 'surname', 'birthPlace', 'birthDate'] as SortUserFieldType[]

type SortUserFieldType = keyof Pick<User, 'id' | 'name' | 'middleName' | 'surname' | 'birthPlace' | 'birthDate'>
type TypeOrmDirectionType = 'ASC' | 'DESC'

export class SortUserQuery extends SortQueryAdapter<SortUserFieldType> {
	@ApiPropertyOptional({ description: 'User sorting field', default: 'id', example: 'id', enum: sortFieldDomain })
	@IsOptional()
	@IsString()
	@IsIn(sortFieldDomain)
	sortField: SortUserFieldType = 'id'

	// TODO: Write a spec file to test this method
	toDatabaseQuery(): Partial<Record<SortUserFieldType, TypeOrmDirectionType>> {
		const order: Partial<Record<SortUserFieldType, TypeOrmDirectionType>> = {}
		order[this.sortField] = this.sortDirection.toUpperCase() as TypeOrmDirectionType
		return order
	}
}
