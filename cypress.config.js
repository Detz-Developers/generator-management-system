const { defineConfig } = require('cypress');
const webpackConfig = require('./cypress/webpack.config');
const path = require("path");

module.exports = defineConfig({
  projectId: 'bhij99',
	e2e: {
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
		supportFile: 'cypress/support/e2e.js',
		
		setupNodeEvents(on, config) {
			return config;
		},
	},


component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },

});
