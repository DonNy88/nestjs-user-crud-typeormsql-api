import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { PagingQuery } from './paging-query.dto'

describe('PagingQuery', () => {
	describe('when object is empty', () => {
		it('should be valid', async () => {
			const event = {}

			const transformed = plainToClass(PagingQuery, event)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toEqual(0)
		})
	})

	describe('when validating pageIndex', () => {
		it.each([[undefined], [null], [''], ['1'], [0], [1], [Number.MAX_VALUE]])(
			'should be valid when not set and for 0 or positive integers',
			async (pageIndex: number) => {
				const param = { pageIndex }

				const transformed = plainToClass(PagingQuery, param)
				const validationErrors = await validate(transformed)

				expect(validationErrors.length).toEqual(0)
			}
		)

		it.each([['a'], [-1], [1.1]])('should be invalid when not set and for negative integers', async (pageIndex: number) => {
			const param = { pageIndex }

			const transformed = plainToClass(PagingQuery, param)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toBeGreaterThanOrEqual(1)
		})
	})

	describe('when validating pageSize', () => {
		it.each([[undefined], [null], ['1'], [1], [99], [100]])(
			'should be valid when not set and for positive integers greater than 0 and less than or equal to 100',
			async (pageSize: number) => {
				const param = { pageSize }

				const transformed = plainToClass(PagingQuery, param)
				const validationErrors = await validate(transformed)

				expect(validationErrors.length).toEqual(0)
			}
		)

		it.each([[''], ['a'], [0], [-1], [1.1], [101]])(
			'should be invalid when not set, for non-integers and for integers less than 1 or greater than 100',
			async (pageSize: number) => {
				const param = { pageSize }

				const transformed = plainToClass(PagingQuery, param)
				const validationErrors = await validate(transformed)

				expect(validationErrors.length).toBeGreaterThanOrEqual(1)
			}
		)
	})

	describe('toDatabaseLimit', () => {
		const pageSizeRange = Array.from(Array(101).keys()).map(value => [value])
		it.each(pageSizeRange)('should return the same value of pageSize for %d', async (expectedLimitValue: number) => {
			const page = new PagingQuery()
			page.pageSize = expectedLimitValue

			const take = page.toDatabaseLimit()

			expect(take).toBe(expectedLimitValue)
		})
	})

	describe('toDatabaseOffset', () => {
		it.each([
			[0, 1],
			[1, 1],
			[0, Number.MAX_VALUE],
			[1, Number.MAX_VALUE]
		])('should return the value multiply pageIndex (%d) and pageSize (%d)', async (pageIndex: number, pageSize: number) => {
			const page = new PagingQuery()
			page.pageIndex = pageIndex
			page.pageSize = pageSize

			const skip = page.toDatabaseOffset()

			expect(skip).toBe(pageIndex * pageSize)
		})
	})
})
