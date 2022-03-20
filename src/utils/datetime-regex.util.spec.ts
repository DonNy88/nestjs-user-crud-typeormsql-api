import { isIso8601Format } from './datetime-regex.util'

describe('datetime-regex', () => {
	describe('isIso8601Format', () => {
		it.each([
			['2000'],
			['1997-07'],
			['1976-10-04'],
			['2027-03-16T19:20'],
			['2013-05-04T05:20+01:00'],
			['1854-04-24T17:22:47'],
			['2020-09-04T19:20:27+01:00'],
			['1354-11-09T02:39:54.45'],
			['2109-12-11T07:09:17.09+02:00']
		])('should return true if the input is a valid', datetimeValue => {
			const result = isIso8601Format(datetimeValue)

			expect(result).toBeTruthy()
		})

		it.each([
			[''],
			['1'],
			['a'],
			['  '],
			['1124235345'],
			['1854-04-24T4444444'],
			['1109-12-11T07:10:21.09+34:00aa'],
			['bb1109-12-11T07:10:21.09+34:00aa'],
			['bb1109-12-11T07:10:21.09+34:00']
		])('should return true if the input is a valid', datetimeValue => {
			const result = isIso8601Format(datetimeValue)

			expect(result).toBeFalsy()
		})
	})
})
