import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { IntegerId } from './integer-id.decorator'

describe('IntegerId', () => {
	describe('when validating required id', () => {
		class Stub {
			@IntegerId(true)
			requiredId!: number
		}

		it.each([['1'], ['2']])('should be valid for positive integers', async requiredId => {
			const query = { requiredId }

			const transformed = plainToClass(Stub, query)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toEqual(0)
		})

		it.each([[undefined], [null], [''], ['a'], ['0'], ['-1'], ['1.1']])('should be invalid when not a positive integer', async requiredId => {
			const query = { requiredId }

			const transformed = plainToClass(Stub, query)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toBeGreaterThanOrEqual(1)
		})
	})

	describe('when validating optional id', () => {
		class Stub {
			@IntegerId(false)
			optionalId?: number
		}

		it.each([[undefined], [null], [''], ['1'], ['2']])('should be valid when not set and for positive integers', async optionalId => {
			const query = { optionalId }

			const transformed = plainToClass(Stub, query)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toEqual(0)
		})

		it.each([['a'], ['0'], ['-1'], ['1.1']])('should be invalid when not a positive integer', async optionalId => {
			const query = { optionalId }

			const transformed = plainToClass(Stub, query)
			const validationErrors = await validate(transformed)

			expect(validationErrors.length).toBeGreaterThanOrEqual(1)
		})
	})
})
