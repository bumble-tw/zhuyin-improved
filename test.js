const { fromPinyin, toPinyin } = require("zhuyin-improved")

const data = "fú fú wù"
const data2 = "ㄈㄨˊ ㄨˋ"

const result = fromPinyin(data)
const result2 = toPinyin(data2)

console.log(result)
console.log(result2)
