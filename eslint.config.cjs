// 默认生成配置
// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";

// export default [
//   { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   ...pluginVue.configs["flat/essential"],
// ];

// 自定义配置
// eslint.config.js
const { FlatCompat } = require("@eslint/eslintrc");
const pluginVue = require("eslint-plugin-vue");
const vueParser = require("vue-eslint-parser");
const typescriptParser = require("@typescript-eslint/parser");

const compat = new FlatCompat({
  baseDirectory: __dirname
});

module.exports = [
  {
    ignores: [
      "**/node_modules/**/*",
      "**/dist/**/*",
      "**/lib/**/*",
      "**/types/**/*.d.ts"
    ],
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.vue",
      "**/*.js",
      "**/*.jsx",
      "**/*.cjs"
    ]
  },
  {
    plugins: { typescriptParser },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue", ".ts", ".tsx", "css"]
      }
    }
  },
  ...pluginVue.configs["flat/recommended"],
  ...compat.extends("plugin:prettier/recommended"),
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        sourceType: "module",
        jsx: true
      }
    }
  },
  {
    rules: {
      "linebreak-style": ["off", "lf"], // 换行符
      quotes: ["error", "double"], // 使用双引号
      eqeqeq: ["error", "smart"], // 比较的时候使用严格等于
      "no-unused-vars": "off", // 禁止出现未使用过的变量
      "no-var": ["error"], // 不能使用 var 定义变量
      "default-case": "error" // 要求 switch 语句中有 default 分支
      // "brace-style": ["error", "stroustrup", { allowSingleLine: true }], // 大括号风格 ["error", "stroustrup"]
      // "no-dupe-keys": "error", // 对象中不允许出现重复的键
      // "no-sparse-arrays": "error", // 禁止稀疏数组， [1,,2]
      // "no-empty": "error", // 不允许出现空的代码块
      // "@typescript-eslint/no-explicit-any": "off", // 允许any类型
      // "block-scoped-var": "error", // 将变量声明放在合适的代码块里
      // curly: ["error", "all"], // 强制使用花括号的风格
      // "no-self-compare": "error", // 不允许自身比较
      // "no-multiple-empty-lines": ["error", { max: 2 }], // 空行最多不能超过两行
      // "no-const-assign": "error", // 禁止修改const声明的变量
      // "no-redeclare": "error", // 禁止重复声明变量
      // "no-func-assign": "error", // 禁止重复的函数声明
      // "no-shadow": "error", // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
      // // 空格
      // "space-infix-ops": ["error", { int32Hint: true }], // 操作符周围的空格
      // "space-before-function-paren": [
      //   "error",
      //   { anonymous: "never", named: "never", asyncArrow: "always" },
      // ], // 函数定义时括号前的空格
      // "space-before-blocks": ["error", "always"], // 在块语句之前始终有一个空格
      // "template-curly-spacing": ["off", "never"], // 要求模板字符串中的嵌入表达式周围空格的使用
      // "key-spacing": ["error", { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
      // "array-bracket-spacing": ["off", "always"], // 数组内前后要求有空格
      // "object-curly-spacing": ["error", "always"], // 对象内前后要求有空格
      // "arrow-spacing": ["error", { before: true, after: true }], // 前头=> 前后都有空格
      // "comma-spacing": ["error", { before: false, after: true }], // 要求同一行内逗号后面有空格
      // "keyword-spacing": "error", // 关键字前后的空格
      // "no-trailing-spaces": "error", // 一行最后不允许有空格
      // "switch-colon-spacing": ["error", { before: false, after: true }], // switch 冒号后要有空格
      // "no-multi-spaces": "error", // 不允许出现多余的空格
    }
  }
];
