module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "tsconfigRootDir": __dirname,
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "unused-imports"
    ],
    "rules": {
        // TS
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-inferrable-types": 0,
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-empty-function": "off",
        // JS 
        "react/prop-types": "off",
        "unused-imports/no-unused-imports": "error",
        "no-constant-condition": "off",
        "no-inferrable-types": 0,
        "no-empty-function": "off",
        "newline-per-chained-call": [
            "error",
            {
                "ignoreChainWithDepth": 1
            }
        ],
        "linebreak-style": "off",
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
