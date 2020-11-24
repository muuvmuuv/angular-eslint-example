const path = require('path')

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    webextensions: true,
    serviceworker: true,
  },
  ignorePatterns: [
    '.eslintrc.js', // ignore self
    'index.html' // ignore root HTML file
  ],
  overrides: [
    /**
     * -----------------------------------------------------
     * TYPESCRIPT FILES (COMPONENTS, SERVICES ETC) (.ts)
     * -----------------------------------------------------
     */
    {
      files: ['*.ts'],
      plugins: ['tsdoc', 'import'],
      extends: [
        'eslint:recommended',
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended', // always last
      ],
      parserOptions: {
        // BUG: somehow relative does not work here...
        tsconfigRootDir: path.resolve(__dirname, '..'),
        project: 'tsconfig.base.json',
        sourceType: 'module',
        ecmaVersion: 2020,
      },
      rules: {
        'no-console': 'off',
        'no-restricted-syntax': [
          'error',
          {
            selector:
              "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error|info|trace|table|group|groupCollapsed|groupEnd|dir)$/]",
            message: 'Unexpected property on console object was called',
          },
        ],
        'no-restricted-imports': [
          'warn',
          {
            paths: [
              {
                name: 'lodash',
                message: 'Please use lodash-es instead to not break treeshake ability.',
              },
            ],
          },
        ],
        'no-unused-vars': 'off', // connected to @typescript rule
        'import/no-unresolved': 'off',
        // -------> import/order
        'sort-imports': [
          // ignore everything that is handled by `import/order` plugin but enable member sort
          'error',
          {
            ignoreCase: true,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            allowSeparatedGroups: true,
          },
        ],
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            pathGroupsExcludedImportTypes: ['builtin'],
            pathGroups: [
              {
                pattern: 'src/**',
                group: 'internal',
                position: 'before',
              },
            ],
            groups: [
              'builtin',
              'external',
              ['internal', 'parent', 'sibling'],
              'index',
              'object',
            ],
          },
        ],
        // -------> tsdoc
        'tsdoc/syntax': 'warn',
        // -------> @typescript-eslint
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': [
          'warn',
          {
            allowedNames: [
              'ngOnInit',
              'ngDoCheck',
              'ngOnChanges',
              'ngAfterContentInit',
              'ngAfterViewInit',
              'ngAfterViewChecked',
              'ngAfterContentChecked',
              'ngOnDestroy',
            ],
          },
        ],
        // -------> @angular-eslint
        '@angular-eslint/no-input-rename': 'off',
      },
    },
    /**
     * -----------------------------------------------------
     * COMPONENT TEMPLATES
     * -----------------------------------------------------
     */
    {
      files: ['*.component.html', '*.page.html'],
      parser: '@angular-eslint/template-parser',
      plugins: ['@angular-eslint/template'],
      rules: {
        // '@angular-eslint/template/banana-in-a-box': 'error',
        '@angular-eslint/template/cyclomatic-complexity': [
          'error',
          {
            maxComplexity: 6,
          },
        ],
        '@angular-eslint/template/no-call-expression': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
        // BUG: https://github.com/angular-eslint/angular-eslint/issues/121
        // '@angular-eslint/template/i18n': [
        //   'error',
        //   {
        //     checkId: false,
        //     checkText: true,
        //     checkAttributes: true,
        //     ignoreAttributes: ['field', 'identifier'],
        //   },
        // ],
      },
    },
  ],
}
