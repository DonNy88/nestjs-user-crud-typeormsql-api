import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { SortUserQuery } from './sort-user-query.dto'

describe('SortUserQuery', () => {
	describe('when object is empty', () => {
		it('should be valid', async () => {
			const event = {}

			const transformed = plainToClass(SortUserQuery, event)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toEqual(0)
		})
	})

	describe('when validating sortDirection', () => {
		it.each([[undefined], [null], ['asc'], ['desc'], ['ASC'], ['DESC']])(
			'should be valid when not set and for valid direction value',
			async sortDirection => {
				const param = { sortDirection }

				const transformed = plainToClass(SortUserQuery, param)
				const validationErrors = await validate(transformed)

				expect(validationErrors.length).toEqual(0)
			}
		)

		it.each([['a'], [-1], [1.1]])('should be invalid when the value is not SortDirectionType', async sortDirection => {
			const param = { sortDirection }

			const transformed = plainToClass(SortUserQuery, param)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toBeGreaterThanOrEqual(1)
		})
	})

	describe('when validating sortField', () => {
		it.each([[undefined], [null], ['id'], ['name'], ['middleName'], ['surname'], ['birthPlace'], ['birthDate']])(
			'should be valid when either not set or a valid SortUserFieldType',
			async sortField => {
				const param = { sortField }

				const transformed = plainToClass(SortUserQuery, param)
				const validationErrors = await validate(transformed)

				expect(validationErrors.length).toEqual(0)
			}
		)

		it.each([[''], ['a'], [0], [-1], [1.1], [101]])('should be invalid when is not a valid SortUserFieldType', async sortField => {
			const param = { sortField }

			const transformed = plainToClass(SortUserQuery, param)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toBeGreaterThanOrEqual(1)
		})
	})

	describe('toDatabaseOrder', () => {
		it.each([
			[{ sortField: 'id', sortDirection: 'asc' }, { id: 'ASC' }],
			[{ sortField: 'id', sortDirection: 'ASC' }, { id: 'ASC' }],
			[{ sortField: 'id', sortDirection: 'desc' }, { id: 'DESC' }],
			[{ sortField: 'id', sortDirection: 'DESC' }, { id: 'DESC' }],
			[{ sortField: 'name', sortDirection: 'asc' }, { name: 'ASC' }],
			[{ sortField: 'name', sortDirection: 'ASC' }, { name: 'ASC' }],
			[{ sortField: 'name', sortDirection: 'desc' }, { name: 'DESC' }],
			[{ sortField: 'name', sortDirection: 'DESC' }, { name: 'DESC' }],
			[{ sortField: 'middleName', sortDirection: 'asc' }, { middleName: 'ASC' }],
			[{ sortField: 'middleName', sortDirection: 'ASC' }, { middleName: 'ASC' }],
			[{ sortField: 'middleName', sortDirection: 'desc' }, { middleName: 'DESC' }],
			[{ sortField: 'middleName', sortDirection: 'DESC' }, { middleName: 'DESC' }],
			[{ sortField: 'surname', sortDirection: 'asc' }, { surname: 'ASC' }],
			[{ sortField: 'surname', sortDirection: 'ASC' }, { surname: 'ASC' }],
			[{ sortField: 'surname', sortDirection: 'desc' }, { surname: 'DESC' }],
			[{ sortField: 'surname', sortDirection: 'DESC' }, { surname: 'DESC' }],
			[{ sortField: 'birthPlace', sortDirection: 'asc' }, { birthPlace: 'ASC' }],
			[{ sortField: 'birthPlace', sortDirection: 'ASC' }, { birthPlace: 'ASC' }],
			[{ sortField: 'birthPlace', sortDirection: 'desc' }, { birthPlace: 'DESC' }],
			[{ sortField: 'birthPlace', sortDirection: 'DESC' }, { birthPlace: 'DESC' }],
			[{ sortField: 'birthDate', sortDirection: 'asc' }, { birthDate: 'ASC' }],
			[{ sortField: 'birthDate', sortDirection: 'ASC' }, { birthDate: 'ASC' }],
			[{ sortField: 'birthDate', sortDirection: 'desc' }, { birthDate: 'DESC' }],
			[{ sortField: 'birthDate', sortDirection: 'DESC' }, { birthDate: 'DESC' }]
		])('should return the valid typeORM object', (input, expected) => {
			const sortUserQuery = plainToClass(SortUserQuery, input)

			const result = sortUserQuery.toDatabaseOrder()

			console.log({ result })

			expect(result).toEqual(expected)
		})
	})
})
