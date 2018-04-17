module.exports = (isDev) => {
  return {
    // 帮助我们删除vue中template中不小心加上的多余的空格
    preserveWhitespace: true,
    // true: 对vue文件中的css内容使用extract-text-webpack-plugin，把它们输出到打包生成的css文件中。
    extractCSS: !isDev
  }
}