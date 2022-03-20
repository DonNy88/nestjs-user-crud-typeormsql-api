const ISO_8601_REGEX = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i

// TODO: Write a spec to test this method
export function isUnixTime(unixTimeValue: string): boolean {
	return ISO_8601_REGEX.test(unixTimeValue)
}
