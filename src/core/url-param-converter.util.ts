import { TransformFnParams } from 'class-transformer'

export function stringToNumber(params: TransformFnParams): number | null | undefined {
	const value = params?.value

	if ([undefined, null].includes(value)) {
		return value
	}

	if (value === '') {
		return undefined
	}

	return +value
}
