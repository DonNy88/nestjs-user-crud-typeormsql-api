import { Transform } from 'class-transformer'

export function ArrayParamTransform(): PropertyDecorator {
	return Transform(({ value }: { value: string }): string[] => {
		if (!value) {
			return []
		}

		return value
			.split(',')
			.map(str => str.trim())
			.filter(str => str.length)
	})
}
