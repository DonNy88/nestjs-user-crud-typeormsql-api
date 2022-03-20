import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ILike } from 'typeorm'
import { SearchUserQuery } from './search-user-query.dto'

describe('SearchUserQuery', () => {
	describe('when object is empty', () => {
		it('should be valid', async () => {
			const event = {}

			const transformed = plainToClass(SearchUserQuery, event)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toEqual(0)
		})
	})

	describe('toDatabaseWhere', () => {
		it('should return empty list when the object is empty', async () => {
			const search = new SearchUserQuery()
			search.q = []

			const where = search.toDatabaseWhere()

			expect(where).toEqual([])
		})

		it.each([[['london'], ['london', 'manchester'], ['london', 'manchester', 'liverpool']]])(
			'should return a list typeORM FindConditions when q contains a list of string',
			async queries => {
				const search = new SearchUserQuery()
				search.q = queries

				const where = search.toDatabaseWhere()

				queries.forEach(q => {
					const queryLike = ILike(`%${q}%`)

					expect(where).toContainEqual({ name: queryLike })
					expect(where).toContainEqual({ middleName: queryLike })
					expect(where).toContainEqual({ surname: queryLike })
					expect(where).toContainEqual({ birthPlace: queryLike })
				})
			}
		)

		it.each([[['2020'], ['2020', '2013-05-04T05:20+01:00'], ['2020', '2013-05-04T05:20+01:00', '1354-11-09T02:39:54.45']]])(
			'should return a list typeORM FindConditions when q contains a list of string number in ISO 8601',
			async queries => {
				const search = new SearchUserQuery()
				search.q = queries

				const where = search.toDatabaseWhere()

				queries.forEach(q => {
					const queryLike = ILike(`%${q}%`)

					expect(where).toContainEqual({ name: queryLike })
					expect(where).toContainEqual({ middleName: queryLike })
					expect(where).toContainEqual({ surname: queryLike })
					expect(where).toContainEqual({ birthPlace: queryLike })
					expect(where).toContainEqual({ birthDate: new Date(q) })
				})
			}
		)

		it('should return a list typeORM FindConditions when q contains a list of string number in ISO 8601 and string', async () => {
			const search = new SearchUserQuery()
			search.q = ['2020', 'london']

			const where = search.toDatabaseWhere()

			const stringNumberQueryLike = ILike(`%${search.q[0]}%`)
			expect(where).toContainEqual({ name: stringNumberQueryLike })
			expect(where).toContainEqual({ middleName: stringNumberQueryLike })
			expect(where).toContainEqual({ surname: stringNumberQueryLike })
			expect(where).toContainEqual({ birthPlace: stringNumberQueryLike })
			expect(where).toContainEqual({ birthDate: new Date(search.q[0]) })

			const stringQueryLike = ILike(`%${search.q[1]}%`)
			expect(where).toContainEqual({ name: stringQueryLike })
			expect(where).toContainEqual({ middleName: stringQueryLike })
			expect(where).toContainEqual({ surname: stringQueryLike })
			expect(where).toContainEqual({ birthPlace: stringQueryLike })
		})
	})
})
