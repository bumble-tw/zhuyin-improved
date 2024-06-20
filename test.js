const { fromPinyin, toPinyin } = require("./lib/cjs/index")

// const data = "fú fú wù"
// const data2 = "ㄈㄨˊ ㄨˋ"

// const result = fromPinyin(data)
// const result2 = toPinyin(data2)

// console.log(result)
// console.log(result2)

console.log("-----")

const data3 = "nǚ ér"
const data4 = "ㄋㄩˇ ㄦˊ"

const result3 = fromPinyin(data3)
const result4 = toPinyin(data4)

console.log(result3)
console.log(result4)
