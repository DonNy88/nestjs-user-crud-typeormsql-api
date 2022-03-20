const ISO_8601_REGEX = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i

export function isIso8601Format(datetimeValue: string): boolean {
	return ISO_8601_REGEX.test(datetimeValue)
}
