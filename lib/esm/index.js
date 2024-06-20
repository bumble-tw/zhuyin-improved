import { removeTone, getToneNumber, numberToMark } from "pinyin-utils"
import pinyinSplit from "pinyin-split"
import py2zy from "./py2zy"
export const toneMarks = ["", "ˊ", "ˇ", "ˋ", "˙"]

function convertToneMarks(text) {
  const toneMap = {
    ü: "v",
    ǖ: "v",
    ǘ: "v́",
    ǚ: "v̌",
    ǜ: "v̀",
  }
  return text
    .split("")
    .map((char) => toneMap[char] || char)
    .join("")
}

export const fromPinyinSyllable = (pinyin) => {
  pinyin = convertToneMarks(pinyin)
  let zy = py2zy[removeTone(pinyin).toLowerCase()]
  return zy + toneMarks[getToneNumber(pinyin) - 1]
}
export const fromPinyin = (input, everything = false) => {
  const translate = (pinyin) => {
    return pinyinSplit(pinyin, everything).map((item) => {
      if (everything) {
        if (typeof item === "string") return item
        else {
          return fromPinyinSyllable(item[0])
        }
      } else {
        return fromPinyinSyllable(item)
      }
    })
  }
  if (typeof input === "string") return translate(input)
  else return input.map(translate)
}
export const splitZhuyin = (zhuyin, everything = false) => {
  const list = []
  let index = 0
  while (index < zhuyin.length) {
    let count = zhuyin.length - index
    let wordFound = false
    while (count >= 1) {
      let word = zhuyin.substr(index, count)
      if (Object.values(py2zy).includes(word)) {
        // word found
        wordFound = true
        if (toneMarks.includes(zhuyin[index + count])) {
          // tone found after word
          word += zhuyin[index + count]
          count++
        }
        list.push(everything ? [word] : word)
        index += count - 1
        break
      }
      count--
    }
    if (!wordFound && everything) {
      if (index === 0 || typeof list[list.length - 1] === "object") {
        list.push(zhuyin[index])
      } else if (typeof list[list.length - 1] === "string") {
        list[list.length - 1] += zhuyin[index]
      }
    }
    index++
  }
  return list
}

export const toPinyinSyllable = (zhuyin) => {
  let tone = toneMarks.indexOf(zhuyin[zhuyin.length - 1]) + 1
  if (tone > 0) {
    zhuyin = zhuyin.substr(0, zhuyin.length - 1)
  } else {
    tone = 1
  }
  let pinyinIndex = Object.values(py2zy).indexOf(zhuyin)
  if (pinyinIndex > -1) {
    return Object.keys(py2zy)[pinyinIndex] + tone
  } else {
    return zhuyin
  }
}

const convertPinyin = (pinyin) => {
  const pinyinMap = {
    1: "ǖ",
    2: "ǘ",
    3: "ǚ",
    4: "ǜ",
  }

  return pinyin.replace(/v([1-4])/g, (match, p1) => pinyinMap[p1])
}

export const toPinyin = (zhuyin, opts = {}) => {
  let list = splitZhuyin(zhuyin, opts.everything)
  if (!opts.everything) list = list.filter((item) => typeof item === "string")

  list = list.map((item) => {
    if (opts.everything && typeof item === "string") return item
    else if (typeof item !== "string") item = item[0]

    let pinyin = exports.toPinyinSyllable(item)

    // 加入 convertPinyin 的例外處理
    pinyin = convertPinyin(pinyin)

    if (opts.numbered) return opts.everything ? [pinyin] : pinyin
    else if (opts.everything) return [pinyin_utils_1.numberToMark(pinyin)]
    else return pinyin_utils_1.numberToMark(pinyin)
  })

  return list
}
export default fromPinyin
