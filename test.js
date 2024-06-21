const { fromPinyin, toPinyin } = require("./lib/cjs/index")

console.log(fromPinyin("fú wù"))
console.log(toPinyin("ㄈㄨˊ ㄨˋ"))

console.log(fromPinyin("nǚ"))
console.log(toPinyin("ㄋㄩˇ ㄦˊ"))

console.log(fromPinyin("lù"))
console.log(toPinyin("ㄌㄨˋ"))

console.log(fromPinyin(toPinyin("ㄗㄣˇ ˙ㄇㄜ ㄧㄤˋ").join(" ")))
console.log(toPinyin("ㄗㄣˇ ˙ㄇㄜ ㄧㄤˋ"))
console.log(fromPinyin("zěn me yàng"))
