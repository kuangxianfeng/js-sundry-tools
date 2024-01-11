/**
 * @description 身份证
 */
export declare const idCard: RegExp;
export declare const idCardValid: (v: string) => boolean;
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
export declare const hkIdCard: RegExp;
export declare const hkIdCardValid: (v: string) => boolean;
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
export declare const macauIdCard: RegExp;
export declare const macauIdCardValid: (v: string) => boolean;
/**
 * @description 台湾身份证
 * @description 以下是详细介绍
 * ```md
 * 1. 第一个字符是一个字母
 * 2. 后面是 9 个连续的数字字符
 * ```
 */
export declare const taiwanIdCard: RegExp;
export declare const taiwanIdCardValid: (v: string) => boolean;
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
export declare const passport: RegExp;
export declare const passportValid: (v: string) => boolean;
/**
 * @description 手机号，宽松模式（开头为1，后面任意10个数字）
 */
export declare const phone: RegExp;
export declare const phoneValid: (v: string) => boolean;
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
export declare const email: RegExp;
export declare const emailValid: (v: string) => boolean;
/**
 * @description 纯正数字，不限制位数（不支持小数点和负数）
 */
export declare const numeric: RegExp;
export declare const numericValid: (v: string) => boolean;
/**
 * @description 正负整数，包含0
 */
export declare const integer: RegExp;
export declare const integerValid: (v: string) => boolean;
/**
 * @description 大小写纯字母，不限位数
 */
export declare const letter: RegExp;
export declare const letterValid: (v: string) => boolean;
/**
 * @description 数字+字母，不限位数
 */
export declare const numericLetter: RegExp;
export declare const numericLetterValid: (v: string) => boolean;
/**
 * @description 六位纯数字验证码
 */
export declare const captcha: RegExp;
export declare const captchaValid: (v: string) => boolean;
/**
 * @description 新能源车牌
 */
export declare const newEnergyLicensePlate: RegExp;
export declare const newEnergyLicensePlateValid: (v: string) => boolean;
/**
 * @description 新能源+非新能源车牌
 */
export declare const licensePlate: RegExp;
export declare const licensePlateValid: (v: string) => boolean;
/**
 * @description 16进制颜色
 * @example #000 #000000 #fff
 */
export declare const SON16: RegExp;
export declare const SON16valid: (v: string) => boolean;
/**
 * @description 18位统一社会信用代码
 * @example 91230184MA1BUFLT44 或 92371000MA3MXH0E3W
 */
export declare const socialCreditCode: RegExp;
export declare const socialCreditCodeValid: (v: string) => boolean;
/**
 * @description 银行卡号，10-30位。首位不为0
 * @example 6234567890 6222026006705354217
 */
export declare const bankCard: RegExp;
export declare const bankCardValid: (v: string) => boolean;
/**
 * @description 中文
 * @example 前端
 */
export declare const chinese: RegExp;
export declare const chineseValid: (v: string) => boolean;
/**
 * @description 邮政编码
 * @example 734500 100101
 */
export declare const postalCode: RegExp;
export declare const postalCodeValid: (v: string) => boolean;
/**
 * @description 匹配连续字符，中文、或者中文字符也能匹配
 * @example 111 aabbcc aabc 11abc
 */
export declare const consecutive: RegExp;
export declare const consecutiveValid: (v: string) => boolean;
