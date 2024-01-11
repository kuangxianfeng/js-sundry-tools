/**
 * @description 身份证
 */
export const idCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
export const idCardValid = (v: string) => idCard.test(v)

/**
 * @description 香港身份证
 * @description 以下是详细介绍
 * ```md
 * 1. 以一个大小写字母开头
 * 2. 接着是 6 个连续的数字字符
 * 3. 然后是一个左括号 (
 * 4. 紧接着是一个数字字符或大写A
 * 5. 最后是一个右括号 )
 * ```
 */
export const hkIdCard = /^[a-zA-Z]\d{6}\([\dA]\)$/
export const hkIdCardValid = (v: string) => hkIdCard.test(v)

/**
 * @description 澳门身份证
 * @description 以下是详细介绍
 * ```md
 * 1. 字符串以数字 1、5 或 7 中的一个开头。
 * 2. 接着是 6 个连续的数字字符。
 * 3. 然后是一个左括号 (。
 * 4. 紧接着是一个数字字符。
 * 5. 最后是一个右括号 )。
 * ```
 */
export const macauIdCard = /^[157]\d{6}\(\d\)$/
export const macauIdCardValid = (v: string) => macauIdCard.test(v)

/**
 * @description 台湾身份证
 * @description 以下是详细介绍
 * ```md
 * 1. 第一个字符是一个字母
 * 2. 后面是 9 个连续的数字字符
 * ```
 */
export const taiwanIdCard = /^[a-zA-Z][0-9]{9}$/
export const taiwanIdCardValid = (v: string) => taiwanIdCard.test(v)

/**
 * @description 护照（包含香港、澳门）
 * @description 以下是详细介绍
 * ```md
 * 模式一
 * 1. 字符串以大写或小写的字母 E、K、G、D、S、P 或 H 开头
 * 2. 接着是 8 个连续的数字字符
 * 模式二
 * 1. 匹配字母 E 或 e，后跟 a-f 或 A-F 的字母
 *   1.1 匹配字母 D、d、S、s、P、p，后跟字母 E 或 e
 *   1.2 匹配字母 K 或 k，后跟字母 J 或 j
 *   1.3 匹配字母 M 或 m，后跟字母 A 或 a
 *   1.4 匹配14或者15
 * 2. 接着是 7 个连续的数字字符
 * ```
 */
export const passport = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
export const passportValid = (v: string) => passport.test(v)

/**
 * @description 手机号，宽松模式（开头为1，后面任意10个数字）
 */
export const phone = /^1\d{10}$/
export const phoneValid = (v: string) => phone.test(v)

/**
 * @description 邮箱（支持中文邮箱）
 * @description 以下是详细介绍
 * ```md
 * 1. 开头可以是一个或多个大小写字母、数字或中文字符
 * 2. 接一个"@"
 * 3. "@"后面的部分由一个或多个大小写字母、数字、下划线或短横线组成
 * 4. 地址的域名部分由一个或多个以点号"."开头，后跟一个或多个大小写字母、数字、下划线或短横线的字符串组成
 * ```
 */
export const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const emailValid = (v: string) => email.test(v)

/**
 * @description 纯正数字，不限制位数（不支持小数点和负数）
 */
export const numeric = /^\d+$/
export const numericValid = (v: string) => numeric.test(v)

/**
 * @description 正负整数，包含0
 */
export const integer = /^(?:0|(?:-?[1-9]\d*))$/
export const integerValid = (v: string) => integer.test(v)

/**
 * @description 大小写纯字母，不限位数
 */
export const letter = /^[a-zA-Z]+$/
export const letterValid = (v: string) => letter.test(v)

/**
 * @description 数字+字母，不限位数
 */
export const numericLetter = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/
export const numericLetterValid = (v: string) => numericLetter.test(v)

/**
 * @description 六位纯数字验证码
 */
export const captcha = /^\d{6}$/
export const captchaValid = (v: string) => captcha.test(v)

/**
 * @description 新能源车牌
 */
export const newEnergyLicensePlate =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/
export const newEnergyLicensePlateValid = (v: string) => newEnergyLicensePlate.test(v)

/**
 * @description 新能源+非新能源车牌
 */
export const licensePlate = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
export const licensePlateValid = (v: string) => licensePlate.test(v)

/**
 * @description 16进制颜色
 * @example #000 #000000 #fff
 */
export const SON16 = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
export const SON16valid = (v: string) => SON16.test(v)

/**
 * @description 18位统一社会信用代码
 * @example 91230184MA1BUFLT44 或 92371000MA3MXH0E3W
 */
export const socialCreditCode = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
export const socialCreditCodeValid = (v: string) => socialCreditCode.test(v)

/**
 * @description 银行卡号，10-30位。首位不为0
 * @example 6234567890 6222026006705354217
 */
export const bankCard = /^[1-9]\d{9,29}$/
export const bankCardValid = (v: string) => bankCard.test(v)

/**
 * @description 中文
 * @example 前端
 */
export const chinese =
    /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
export const chineseValid = (v: string) => chinese.test(v)

/**
 * @description 邮政编码
 * @example 734500 100101
 */
export const postalCode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
export const postalCodeValid = (v: string) => postalCode.test(v)

/**
 * @description 匹配连续字符，中文、或者中文字符也能匹配
 * @example 111 aabbcc aabc 11abc
 */
export const consecutive = /(.)\1+/
export const consecutiveValid = (v: string) => consecutive.test(v)
