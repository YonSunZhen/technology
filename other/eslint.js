const haha = {
  "rules": {
    "semi": ["error", "always"], // 结尾必须出现分号
    "quotes": ["error", "double"], // 必须使用双引号
    "no-console": "warn", // 使用console将警告
    "space-infix-ops": ["warn", { "int32Hint": true }], // 中缀操作符(+ - * / = || &&)前后需要空格 排除a||0的情况
    "no-spaced-func": "warn", // 函数调用的括号前不能有空格
    "keyword-spacing": "warn", // if 等关键字后面加空格
  }
}