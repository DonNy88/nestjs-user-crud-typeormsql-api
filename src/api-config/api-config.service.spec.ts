import { ConfigService } from '@nestjs/config'
import { ApiConfigService } from './api-config.service'

describe('ApiConfigService', () => {
	function createTarget({ configService = {} } = {}) {
		return new ApiConfigService(configService as ConfigService)
	}

	describe('node environment', () => {
		describe('isLocal', () => {
			it('should return true if NODE_ENV is local', () => {
				const configService = {
					get: jest.fn().mockReturnValue('local')
				}

				const { isLocal } = createTarget({ configService })

				expect(isLocal).toBeTruthy()
			})

			it.each([['test'], ['development'], ['staging'], ['production']])('should return false if NODE_ENV is %s', (nodeEnvironment: string) => {
				const configService = {
					get: jest.fn().mockReturnValue(nodeEnvironment)
				}

				const { isLocal } = createTarget({ configService })

				expect(isLocal).toBeFalsy()
			})
		})

		describe('isDevelopment', () => {
			it('should return true if NODE_ENV is development', () => {
				const configService = {
					get: jest.fn().mockReturnValue('development')
				}

				const { isDevelopment } = createTarget({ configService })

				expect(isDevelopment).toBeTruthy()
			})

			it.each([['local'], ['test'], ['staging'], ['production']])('should return false if NODE_ENV is %s', (nodeEnvironment: string) => {
				const configService = {
					get: jest.fn().mockReturnValue(nodeEnvironment)
				}

				const { isDevelopment } = createTarget({ configService })

				expect(isDevelopment).toBeFalsy()
			})
		})

		describe('isTest', () => {
			it('should return true if NODE_ENV is test', () => {
				const configService = {
					get: jest.fn().mockReturnValue('test')
				}

				const { isTest } = createTarget({ configService })

				expect(isTest).toBeTruthy()
			})

			it.each([['local'], ['development'], ['staging'], ['production']])('should return false if NODE_ENV is %s', (nodeEnvironment: string) => {
				const configService = {
					get: jest.fn().mockReturnValue(nodeEnvironment)
				}

				const { isTest } = createTarget({ configService })

				expect(isTest).toBeFalsy()
			})
		})

		describe('isStaging', () => {
			it('should return true if NODE_ENV is local', () => {
				const configService = {
					get: jest.fn().mockReturnValue('staging')
				}

				const { isStaging } = createTarget({ configService })

				expect(isStaging).toBeTruthy()
			})

			it.each([['local'], ['test'], ['development'], ['production']])('should return false if NODE_ENV is %s', (nodeEnvironment: string) => {
				const configService = {
					get: jest.fn().mockReturnValue(nodeEnvironment)
				}

				const { isStaging } = createTarget({ configService })

				expect(isStaging).toBeFalsy()
			})
		})

		describe('isProduction', () => {
			it('should return true if NODE_ENV is production', () => {
				const configService = {
					get: jest.fn().mockReturnValue('production')
				}

				const { isProduction } = createTarget({ configService })

				expect(isProduction).toBeTruthy()
			})

			it.each([['local'], ['development'], ['test'], ['staging']])('should return false if NODE_ENV is %s', (nodeEnvironment: string) => {
				const configService = {
					get: jest.fn().mockReturnValue(nodeEnvironment)
				}

				const { isProduction } = createTarget({ configService })

				expect(isProduction).toBeFalsy()
			})
		})
	})
})
