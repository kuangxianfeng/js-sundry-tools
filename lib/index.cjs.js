'use strict';

class Storage {
    constructor(params) {
        const { type = 'local', prefix = '' } = params || {};
        this.prefix = prefix;
        if (type === 'local') {
            this.storage = window.localStorage;
        }
        else {
            this.storage = window.sessionStorage;
        }
    }
    get(key) {
        if (typeof key === 'string') {
            const value = this.storage.getItem(this.addPrefix(key));
            return value ? JSON.parse(value) : null;
        }
        const o = {};
        key.forEach(item => {
            const value = this.storage.getItem(this.addPrefix(item));
            o[item] = value ? JSON.parse(value) : null;
        });
        return o;
    }
    set(key, data) {
        this.storage.setItem(this.addPrefix(key), JSON.stringify(data));
    }
    remove(key) {
        if (typeof key === 'string') {
            this.get(key) && this.storage.removeItem(this.addPrefix(key));
        }
        else {
            key.forEach(item => this.get(item) && this.storage.removeItem(this.addPrefix(item)));
        }
    }
    clear() {
        this.storage.clear();
    }
    addPrefix(key) {
        return `${this.prefix}${key.toString()}`;
    }
}

var storage = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Storage: Storage
});

/**
 * @description  排除 `notRequiredKey` 中存在的 `key` 值对象
 * @param obj
 * @param notRequiredKey
 * @returns
 */
function filterNotRequired(obj, notRequiredKey) {
    const o = {};
    Object.keys(obj).forEach(item => {
        if (!notRequiredKey.includes(item)) {
            o[item] = obj[item];
        }
    });
    return o;
}
/**
 * @description 获取 `requiredKey` 中存在的 `key` 值对象
 * @param obj
 * @param requiredKey
 * @returns
 */
function filterRequiredKey(obj, requiredKey) {
    const o = {};
    Object.keys(obj).forEach(item => {
        if (requiredKey.includes(item)) {
            o[item] = obj[item];
        }
    });
    return o;
}
/**
 * @description 排除掉值为 `null` 或者 `undefined` 或者空值
 * @param obj
 */
function excludeEmpty(obj) {
    const o = {};
    Object.keys(obj).forEach(item => {
        if (![null, undefined, ''].includes(obj[item])) {
            o[item] = obj[item];
        }
    });
    return o;
}

var object = /*#__PURE__*/Object.freeze({
    __proto__: null,
    excludeEmpty: excludeEmpty,
    filterNotRequired: filterNotRequired,
    filterRequiredKey: filterRequiredKey
});

/**
 * @description 通过 `conditionFn` 判断条件返回符合条件的子节点
 * @description 通过 `fieldNames` 更改了字段之后会引入 `ts` 报错，需要使用 `@ts-ignore`
 * @param tree 树结构
 * @param conditionFn 判断条件
 * @param fieldNames 重写树结构字段
 * @returns
 */
function findNode(tree, conditionFn, fieldNames) {
    const { children } = formatFieldNames(fieldNames);
    for (const data of tree) {
        if (conditionFn(data))
            return data;
        if (data[children]) {
            const res = findNode(data[children], conditionFn);
            if (res)
                return res;
        }
    }
    return null;
}
/**
 * @description 查找符合条件的节点路径，`keyword` 可改变返回关键字，默认取 `id`
 * @param tree
 * @param conditionFn
 * @param fieldNames
 * @param path
 * @param keyword
 * @returns
 */
function findNodePath(tree, conditionFn, fieldNames, path = [], keyword) {
    const { id, children } = formatFieldNames(fieldNames);
    for (const data of tree) {
        path.push(data[(keyword || id)]);
        if (conditionFn(data))
            return path;
        if (data[children]) {
            const findChildren = findNodePath(data[children], conditionFn, formatFieldNames(fieldNames), path, keyword);
            if (findChildren.length > 0)
                return findChildren;
        }
        path.pop();
    }
    return [];
}
/**
 * @description `list` 转树结构
 * @param list
 * @param fieldNames
 * @returns
 */
function list2tree(list, fieldNames) {
    const { id, parentId, children } = formatFieldNames(fieldNames);
    const rootItems = [];
    const itemMap = {};
    list.forEach(item => {
        itemMap[item[id]] = Object.assign(Object.assign({}, item), { [children]: [] });
    });
    list.forEach(item => {
        if (item[parentId] !== null && itemMap[item[parentId]]) {
            itemMap[item[parentId]][children].push(itemMap[item[id]]);
        }
        else {
            rootItems.push(itemMap[item[id]]);
        }
    });
    return rootItems;
}
/**
 * @description 树结构转 `list`，并且返回值自带一个 `level` 属性来表明层级
 * @param tree
 * @param result
 * @param fieldNames
 * @param level
 * @returns
 */
function tree2list(tree, result = [], fieldNames, level = 0) {
    const { children } = formatFieldNames(fieldNames);
    tree.forEach(node => {
        const obj = Object.assign({}, node);
        if (typeof level === 'number') {
            obj.level = level + 1;
        }
        delete obj[children];
        result.push(obj);
        node[children] && tree2list(node[children], result, formatFieldNames(fieldNames), typeof level === 'number' ? level + 1 : level);
    });
    return result;
}
/**
 * @description 替换树结构的字段
 * @param fieldNames
 * @returns
 */
function formatFieldNames(fieldNames) {
    const { id = 'id', parentId = 'parentId', children = 'children' } = fieldNames || {};
    return {
        id,
        parentId,
        children
    };
}

var tree = /*#__PURE__*/Object.freeze({
    __proto__: null,
    findNode: findNode,
    findNodePath: findNodePath,
    list2tree: list2tree,
    tree2list: tree2list
});

/**
 * @description 身份证
 */
const idCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
const idCardValid = (v) => idCard.test(v);
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
const hkIdCard = /^[a-zA-Z]\d{6}\([\dA]\)$/;
const hkIdCardValid = (v) => hkIdCard.test(v);
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
const macauIdCard = /^[157]\d{6}\(\d\)$/;
const macauIdCardValid = (v) => macauIdCard.test(v);
/**
 * @description 台湾身份证
 * @description 以下是详细介绍
 * ```md
 * 1. 第一个字符是一个字母
 * 2. 后面是 9 个连续的数字字符
 * ```
 */
const taiwanIdCard = /^[a-zA-Z][0-9]{9}$/;
const taiwanIdCardValid = (v) => taiwanIdCard.test(v);
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
const passport = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
const passportValid = (v) => passport.test(v);
/**
 * @description 手机号，宽松模式（开头为1，后面任意10个数字）
 */
const phone = /^1\d{10}$/;
const phoneValid = (v) => phone.test(v);
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
const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailValid = (v) => email.test(v);
/**
 * @description 纯正数字，不限制位数（不支持小数点和负数）
 */
const numeric = /^\d+$/;
const numericValid = (v) => numeric.test(v);
/**
 * @description 正负整数，包含0
 */
const integer = /^(?:0|(?:-?[1-9]\d*))$/;
const integerValid = (v) => integer.test(v);
/**
 * @description 大小写纯字母，不限位数
 */
const letter = /^[a-zA-Z]+$/;
const letterValid = (v) => letter.test(v);
/**
 * @description 数字+字母，不限位数
 */
const numericLetter = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
const numericLetterValid = (v) => numericLetter.test(v);
/**
 * @description 六位纯数字验证码
 */
const captcha = /^\d{6}$/;
const captchaValid = (v) => captcha.test(v);
/**
 * @description 新能源车牌
 */
const newEnergyLicensePlate = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/;
const newEnergyLicensePlateValid = (v) => newEnergyLicensePlate.test(v);
/**
 * @description 新能源+非新能源车牌
 */
const licensePlate = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
const licensePlateValid = (v) => licensePlate.test(v);
/**
 * @description 16进制颜色
 * @example #000 #000000 #fff
 */
const SON16 = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
const SON16valid = (v) => SON16.test(v);
/**
 * @description 18位统一社会信用代码
 * @example 91230184MA1BUFLT44 或 92371000MA3MXH0E3W
 */
const socialCreditCode = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
const socialCreditCodeValid = (v) => socialCreditCode.test(v);
/**
 * @description 银行卡号，10-30位。首位不为0
 * @example 6234567890 6222026006705354217
 */
const bankCard = /^[1-9]\d{9,29}$/;
const bankCardValid = (v) => bankCard.test(v);
/**
 * @description 中文
 * @example 前端
 */
const chinese = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
const chineseValid = (v) => chinese.test(v);
/**
 * @description 邮政编码
 * @example 734500 100101
 */
const postalCode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
const postalCodeValid = (v) => postalCode.test(v);
/**
 * @description 匹配连续字符，中文、或者中文字符也能匹配
 * @example 111 aabbcc aabc 11abc
 */
const consecutive = /(.)\1+/;
const consecutiveValid = (v) => consecutive.test(v);

var reg = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SON16: SON16,
    SON16valid: SON16valid,
    bankCard: bankCard,
    bankCardValid: bankCardValid,
    captcha: captcha,
    captchaValid: captchaValid,
    chinese: chinese,
    chineseValid: chineseValid,
    consecutive: consecutive,
    consecutiveValid: consecutiveValid,
    email: email,
    emailValid: emailValid,
    hkIdCard: hkIdCard,
    hkIdCardValid: hkIdCardValid,
    idCard: idCard,
    idCardValid: idCardValid,
    integer: integer,
    integerValid: integerValid,
    letter: letter,
    letterValid: letterValid,
    licensePlate: licensePlate,
    licensePlateValid: licensePlateValid,
    macauIdCard: macauIdCard,
    macauIdCardValid: macauIdCardValid,
    newEnergyLicensePlate: newEnergyLicensePlate,
    newEnergyLicensePlateValid: newEnergyLicensePlateValid,
    numeric: numeric,
    numericLetter: numericLetter,
    numericLetterValid: numericLetterValid,
    numericValid: numericValid,
    passport: passport,
    passportValid: passportValid,
    phone: phone,
    phoneValid: phoneValid,
    postalCode: postalCode,
    postalCodeValid: postalCodeValid,
    socialCreditCode: socialCreditCode,
    socialCreditCodeValid: socialCreditCodeValid,
    taiwanIdCard: taiwanIdCard,
    taiwanIdCardValid: taiwanIdCardValid
});

exports.object = object;
exports.reg = reg;
exports.storage = storage;
exports.tree = tree;
