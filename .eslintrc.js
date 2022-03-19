module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off'
	}
}
