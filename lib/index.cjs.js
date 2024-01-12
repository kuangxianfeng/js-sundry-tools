'use strict';

var Storage = /** @class */ (function () {
    function Storage(params) {
        var _a = params || {}, _b = _a.type, type = _b === void 0 ? 'local' : _b, _c = _a.prefix, prefix = _c === void 0 ? '' : _c;
        this.prefix = prefix;
        if (type === 'local') {
            this.storage = window.localStorage;
        }
        else {
            this.storage = window.sessionStorage;
        }
    }
    Storage.prototype.get = function (key) {
        var _this = this;
        if (typeof key === 'string') {
            var value = this.storage.getItem(this.addPrefix(key));
            return value ? JSON.parse(value) : null;
        }
        var o = {};
        key.forEach(function (item) {
            var value = _this.storage.getItem(_this.addPrefix(item));
            o[item] = value ? JSON.parse(value) : null;
        });
        return o;
    };
    Storage.prototype.set = function (key, data) {
        this.storage.setItem(this.addPrefix(key), JSON.stringify(data));
    };
    Storage.prototype.remove = function (key) {
        var _this = this;
        if (typeof key === 'string') {
            this.get(key) && this.storage.removeItem(this.addPrefix(key));
        }
        else {
            key.forEach(function (item) { return _this.get(item) && _this.storage.removeItem(_this.addPrefix(item)); });
        }
    };
    Storage.prototype.clear = function () {
        this.storage.clear();
    };
    Storage.prototype.addPrefix = function (key) {
        return "".concat(this.prefix).concat(key.toString());
    };
    return Storage;
}());

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
    var o = {};
    Object.keys(obj).forEach(function (item) {
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
    var o = {};
    Object.keys(obj).forEach(function (item) {
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
    var o = {};
    Object.keys(obj).forEach(function (item) {
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

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @description 通过 `conditionFn` 判断条件返回符合条件的子节点
 * @description 通过 `fieldNames` 更改了字段之后会引入 `ts` 报错，需要使用 `@ts-ignore`
 * @param tree 树结构
 * @param conditionFn 判断条件
 * @param fieldNames 重写树结构字段
 * @returns
 */
function findNode(tree, conditionFn, fieldNames) {
    var children = formatFieldNames(fieldNames).children;
    for (var _i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
        var data = tree_1[_i];
        if (conditionFn(data))
            return data;
        if (data[children]) {
            var res = findNode(data[children], conditionFn);
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
function findNodePath(tree, conditionFn, fieldNames, path, keyword) {
    if (path === void 0) { path = []; }
    var _a = formatFieldNames(fieldNames), id = _a.id, children = _a.children;
    for (var _i = 0, tree_2 = tree; _i < tree_2.length; _i++) {
        var data = tree_2[_i];
        path.push(data[(keyword || id)]);
        if (conditionFn(data))
            return path;
        if (data[children]) {
            var findChildren = findNodePath(data[children], conditionFn, formatFieldNames(fieldNames), path, keyword);
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
    var _a = formatFieldNames(fieldNames), id = _a.id, parentId = _a.parentId, children = _a.children;
    var rootItems = [];
    var itemMap = {};
    list.forEach(function (item) {
        var _a;
        itemMap[item[id]] = __assign(__assign({}, item), (_a = {}, _a[children] = [], _a));
    });
    list.forEach(function (item) {
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
function tree2list(tree, result, fieldNames, level) {
    if (result === void 0) { result = []; }
    if (level === void 0) { level = 0; }
    var children = formatFieldNames(fieldNames).children;
    tree.forEach(function (node) {
        var obj = __assign({}, node);
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
    var _a = fieldNames || {}, _b = _a.id, id = _b === void 0 ? 'id' : _b, _c = _a.parentId, parentId = _c === void 0 ? 'parentId' : _c, _d = _a.children, children = _d === void 0 ? 'children' : _d;
    return {
        id: id,
        parentId: parentId,
        children: children
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
var idCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
var idCardValid = function (v) { return idCard.test(v); };
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
var hkIdCard = /^[a-zA-Z]\d{6}\([\dA]\)$/;
var hkIdCardValid = function (v) { return hkIdCard.test(v); };
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
var macauIdCard = /^[157]\d{6}\(\d\)$/;
var macauIdCardValid = function (v) { return macauIdCard.test(v); };
/**
 * @description 台湾身份证
 * @description 以下是详细介绍
 * ```md
 * 1. 第一个字符是一个字母
 * 2. 后面是 9 个连续的数字字符
 * ```
 */
var taiwanIdCard = /^[a-zA-Z][0-9]{9}$/;
var taiwanIdCardValid = function (v) { return taiwanIdCard.test(v); };
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
var passport = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
var passportValid = function (v) { return passport.test(v); };
/**
 * @description 手机号，宽松模式（开头为1，后面任意10个数字）
 */
var phone = /^1\d{10}$/;
var phoneValid = function (v) { return phone.test(v); };
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
var email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var emailValid = function (v) { return email.test(v); };
/**
 * @description 纯正数字，不限制位数（不支持小数点和负数）
 */
var numeric = /^\d+$/;
var numericValid = function (v) { return numeric.test(v); };
/**
 * @description 正负整数，包含0
 */
var integer = /^(?:0|(?:-?[1-9]\d*))$/;
var integerValid = function (v) { return integer.test(v); };
/**
 * @description 大小写纯字母，不限位数
 */
var letter = /^[a-zA-Z]+$/;
var letterValid = function (v) { return letter.test(v); };
/**
 * @description 数字+字母，不限位数
 */
var numericLetter = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
var numericLetterValid = function (v) { return numericLetter.test(v); };
/**
 * @description 六位纯数字验证码
 */
var captcha = /^\d{6}$/;
var captchaValid = function (v) { return captcha.test(v); };
/**
 * @description 新能源车牌
 */
var newEnergyLicensePlate = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/;
var newEnergyLicensePlateValid = function (v) { return newEnergyLicensePlate.test(v); };
/**
 * @description 新能源+非新能源车牌
 */
var licensePlate = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
var licensePlateValid = function (v) { return licensePlate.test(v); };
/**
 * @description 16进制颜色
 * @example #000 #000000 #fff
 */
var SON16 = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
var SON16valid = function (v) { return SON16.test(v); };
/**
 * @description 18位统一社会信用代码
 * @example 91230184MA1BUFLT44 或 92371000MA3MXH0E3W
 */
var socialCreditCode = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
var socialCreditCodeValid = function (v) { return socialCreditCode.test(v); };
/**
 * @description 银行卡号，10-30位。首位不为0
 * @example 6234567890 6222026006705354217
 */
var bankCard = /^[1-9]\d{9,29}$/;
var bankCardValid = function (v) { return bankCard.test(v); };
/**
 * @description 中文
 * @example 前端
 */
var chinese = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
var chineseValid = function (v) { return chinese.test(v); };
/**
 * @description 邮政编码
 * @example 734500 100101
 */
var postalCode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
var postalCodeValid = function (v) { return postalCode.test(v); };
/**
 * @description 匹配连续字符，中文、或者中文字符也能匹配
 * @example 111 aabbcc aabc 11abc
 */
var consecutive = /(.)\1+/;
var consecutiveValid = function (v) { return consecutive.test(v); };

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
