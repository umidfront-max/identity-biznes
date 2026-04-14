module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-recommended-vue', 'stylelint-config-recess-order'],
  rules: {
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'property-no-unknown': null,
    'function-no-unknown': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'scss/no-global-function-names': null,
    'selector-pseudo-class-no-unknown': null,
    'no-duplicate-selectors': null,
  },
  cache: true,
  cacheLocation: 'node_modules/.cache/stylelint',
  ignoreFiles: ['*', '!{src,mock,library}/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
}
