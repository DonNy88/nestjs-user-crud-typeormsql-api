import { plainToClass } from 'class-transformer'
import { ArrayParamTransform } from './array-param-transform.decorator'

describe('ArrayParamTransform', () => {
	class StubDto {
		@ArrayParamTransform()
		params: string[]
	}

	describe('when value is not a string list', () => {
		it.each([[undefined], [null], [''], ['  '], [',,,'], [' ,  , ']])('should return a empty string list', params => {
			const transformed = plainToClass(StubDto, { params })

			expect(transformed).toEqual({ params: [] })
		})
	})

	describe('when value is string without commas', () => {
		it('should return a string list with an element', () => {
			const transformed = plainToClass(StubDto, { params: 'query' })

			expect(transformed).toEqual({ params: ['query'] })
		})
	})

	describe('when value is string with commas without space', () => {
		it.each([['query1,query2'], ['query1,query2,query3']])('should return a string list', params => {
			const transformed = plainToClass(StubDto, { params })

			expect(transformed).toEqual({ params: params.split(',') })
		})
	})

	describe('when value is string with commas with space', () => {
		it('should return a string list', async () => {
			const transformed = plainToClass(StubDto, { params: '  query1  ,query2 ,  query3' })

			expect(transformed).toEqual({ params: ['query1', 'query2', 'query3'] })
		})
	})
})
