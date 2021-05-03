module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['./schema/*.{js,jsx}'],
  coverageThreshold: {
    './schema/schema.js': {
      'functions': 10,
      'branch': 100
    }
  }
}
