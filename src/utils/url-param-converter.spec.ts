import { TransformFnParams } from 'class-transformer'
import { stringToNumber } from './url-param-converter.util'

describe('url-param-converter', () => {
	describe('stringToNumber', () => {
		it.each([
			[null, null],
			[undefined, undefined],
			['', undefined],
			['a', NaN],
			['0', 0],
			['1', 1],
			['1.1', 1.1],
			['-1', -1],
			['-1.1', -1.1]
		])('should convert a string to an appropriate number representation', (input, expected) => {
			const result = stringToNumber({ value: input } as TransformFnParams)

			expect(result).toBe(expected)
		})
	})
})
