import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { IntegerId } from './integer-id.decorator'

describe('IntegerId', () => {
	class Stub {
		@IntegerId(true)
		requiredId!: number

		@IntegerId(false)
		optionalId?: number
	}

	describe('when validating required id', () => {
		it.each([['1'], ['2']])('should be valid for positive integers', async value => {
			const query = { requiredId: value }

			const transformed = plainToClass(Stub, query)
			const validationErrors = await validate(transformed)

			console.log(validationErrors)

			expect(validationErrors.length).toEqual(0)
		})

		it.each([[undefined], [null], [''], ['a'], ['0'], ['-1'], ['1.1']])('should be invalid when not a positive integer', async value => {
			const query = { requiredId: value }

			const transformed = plainToClass(Stub, query)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toBeGreaterThanOrEqual(1)
		})
	})

	describe('when validating optional id', () => {
		function createQuery(optionalId: unknown) {
			return { optionalId, requiredId: 1 }
		}

		it.each([[undefined], [null], [''], ['1'], ['2']])('should be valid when not set and for positive integers', async value => {
			const query = createQuery(value)

			const transformed = plainToClass(Stub, query)
			const validationErrors = await validate(transformed)

			console.log({ query, validationErrors })

			expect(validationErrors.length).toEqual(0)
		})

		it.each([['a'], ['0'], ['-1'], ['1.1']])('should be invalid when not a positive integer', async value => {
			const query = createQuery(value)

			const transformed = plainToClass(Stub, query)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toBeGreaterThanOrEqual(1)
		})
	})
})
