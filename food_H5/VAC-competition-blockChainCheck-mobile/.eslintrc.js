// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    env: {
      browser: true,
    },
    // https://github.com/vuejs/eslint-config-vue
    extends: 'vue',
    // required to lint *.vue files
    plugins: [
      'html'
    ],
    // add your custom rules here
    'rules': {
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow no space before function parentheses
      'space-before-function-paren': 0
    }
  }