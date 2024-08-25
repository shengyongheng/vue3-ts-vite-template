module.exports = {
  extends: ["@commitlint/config-conventional"],
  // @see: https://commitlint.js.org/#/reference-rules
  rules: {
    "subject-case": [0], // subject大小写不做校验
    "body-empty": [2, "always"],
    "footer-empty": [2, "always"],
    "type-empty": [2, "never"],
    "scope-empty": [2, "never"],

    // 类型枚举，git提交type必须是以下类型
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新增功能
        "fix", // 修复缺陷
        "docs", // 文档变更
        "style", // 代码格式（不影响功能，例如空格、分号等格式修正）
        "refactor", // 代码重构（不包括 bug 修复、功能新增）
        "perf", // 性能优化
        "test", // 添加疏漏测试或已有测试改动
        "build", // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        "ci", // 修改 CI 配置、脚本
        "revert", // 回滚 commit
        "chore" // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
      ]
    ]
  },
  prompt: {
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: "选择关联issue前缀（可选）:",
      customFooterPrefix: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      generatingByAI: "正在通过 AI 生成你的提交简短描述...",
      generatedSelectByAI: "选择一个 AI 生成的简短描述:",
      confirmCommit: "是否提交或修改commit ?"
    },
    // prettier-ignore
    types: [
      { value: "feat",     name: "feat:     ✨  新增功能", emoji: ":sparkles:" },
      { value: "fix",      name: "fix:        修复缺陷", emoji: ":bug:" },
      { value: "docs",     name: "docs:        文档变更", emoji: ":memo:" },
      { value: "style",    name: "style:        代码格式（不影响功能，例如空格、分号等格式修正）", emoji: ":lipstick:" },
      { value: "refactor", name: "refactor:     ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: ":recycle:" },
      { value: "perf",     name: "perf:     ⚡️  性能优化", emoji: ":zap:" },
      { value: "test",     name: "test:     ✅  添加疏漏测试或已有测试改动", emoji: ":white_check_mark:"},
      { value: "build",    name: "build:      ️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）", emoji: ":package:"},
      { value: "ci",       name: "ci:        修改 CI 配置、脚本",  emoji: ":ferris_wheel:"},
      { value: "revert",   name: "revert:     ⏪️  回滚 commit",emoji: ":rewind:"},
      { value: "chore",    name: "chore:        对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: ":hammer:"},
    ],
    useEmoji: true,
    emojiAlign: "center",
    useAI: false,
    aiNumber: 1,
    themeColorCode: "",
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ["feat", "fix"],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixes: [
      { value: "closed", name: "closed:   ISSUES has been processed" }
    ],
    customIssuePrefixAlign: "top",
    emptyIssuePrefixAlias: "skip",
    customIssuePrefixAlias: "custom",
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: ""
  }
};
