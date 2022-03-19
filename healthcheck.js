/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const http = require('http')

const options = {
	host: 'localhost',
	path: '/api/v1/health/readiness',
	port: process.env.PORT || 3000,
	timeout: 2000
}

const request = http.request(options, res => {
	const { statusCode } = res
	console.log(options, statusCode)
	process.exitCode = statusCode === 200 ? 0 : 1
	process.exit()
})

request.on('error', error => {
	console.error(options, error)
	process.exit(1)
})

request.end()
