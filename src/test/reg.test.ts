import {
    idCardValid,
    hkIdCardValid,
    macauIdCardValid,
    taiwanIdCardValid,
    passportValid,
    phoneValid,
    emailValid,
    numericValid,
    integerValid,
    letterValid,
    numericLetterValid,
    captchaValid,
    newEnergyLicensePlateValid,
    licensePlateValid,
    SON16valid,
    socialCreditCodeValid,
    bankCardValid,
    chineseValid,
    postalCodeValid,
    consecutiveValid
} from '../reg'

describe('测试 reg 模块', () => {
    it('idCard', () => {
        const v1 = '500237199611190396'
        const v2 = '50023719961119039X'
        const v3 = '5002361996111903'
        expect(idCardValid(v1)).toBeTruthy()
        expect(idCardValid(v2)).toBeTruthy()
        expect(idCardValid(v3)).toBeFalsy()
    })
    it('hkIdCard', () => {
        expect(hkIdCardValid('K034169(1)')).toBeTruthy()
        expect(hkIdCardValid('k034169(1)')).toBeTruthy()
        expect(hkIdCardValid('K034169(A)')).toBeTruthy()
        expect(hkIdCardValid('K034169(B)')).toBeFalsy()
        expect(hkIdCardValid('1abcdef(G)')).toBeFalsy()
    })
    it('macauIdCard', () => {
        expect(macauIdCardValid('1123456(1)')).toBeTruthy()
        expect(macauIdCardValid('5123456(1)')).toBeTruthy()
        expect(macauIdCardValid('7123456(1)')).toBeTruthy()
        expect(macauIdCardValid('2123456(1)')).toBeFalsy()
    })
    it('taiwanIdCard', () => {
        expect(taiwanIdCardValid('a123456789')).toBeTruthy()
        expect(taiwanIdCardValid('A123456789')).toBeTruthy()
        expect(taiwanIdCardValid('A12345678')).toBeFalsy()
        expect(taiwanIdCardValid('1123456789')).toBeFalsy()
    })
    it('passport1', () => {
        expect(passportValid('E12345678')).toBeTruthy()
        expect(passportValid('K12345678')).toBeTruthy()
        expect(passportValid('G12345678')).toBeTruthy()
        expect(passportValid('D12345678')).toBeTruthy()
        expect(passportValid('s12345678')).toBeTruthy()
        expect(passportValid('p12345678')).toBeTruthy()
        expect(passportValid('h12345678')).toBeTruthy()
    })
    it('passport2', () => {
        expect(passportValid('Ea1234567')).toBeTruthy()
        expect(passportValid('EA1234567')).toBeTruthy()
        expect(passportValid('DE1234567')).toBeTruthy()
        expect(passportValid('De1234567')).toBeTruthy()
        expect(passportValid('KJ1234567')).toBeTruthy()
        expect(passportValid('MA1234567')).toBeTruthy()
        expect(passportValid('141234567')).toBeTruthy()
        expect(passportValid('151234567')).toBeTruthy()
        expect(passportValid('161234567')).toBeFalsy()
        expect(passportValid('aa1234567')).toBeFalsy()
    })
    it('phone', () => {
        expect(phoneValid('11111111111')).toBeTruthy()
        expect(phoneValid('1111111111a')).toBeFalsy()
        expect(phoneValid('01111111111')).toBeFalsy()
    })
    it('email', () => {
        expect(emailValid('example@example.com')).toBeTruthy()
        expect(emailValid('my_email123@example-domain.co.uk')).toBeTruthy()
        expect(emailValid('中国邮件@example.com')).toBeTruthy()
        expect(emailValid('130@qq.com')).toBeTruthy()
        expect(emailValid('130@qq.com222')).toBeFalsy()
    })
    it('numeric', () => {
        expect(numericValid('100')).toBeTruthy()
        expect(numericValid('0')).toBeTruthy()
        expect(numericValid('-0')).toBeFalsy()
        expect(numericValid('100.1')).toBeFalsy()
        expect(numericValid('-100.1')).toBeFalsy()
    })
    it('integer', () => {
        expect(integerValid('-1')).toBeTruthy()
        expect(integerValid('1')).toBeTruthy()
        expect(integerValid('0')).toBeTruthy()
        expect(integerValid('0.1')).toBeFalsy()
        expect(integerValid('-0.1')).toBeFalsy()
    })
    it('letter', () => {
        expect(letterValid('aA')).toBeTruthy()
        expect(letterValid('aaaaaaa')).toBeTruthy()
        expect(letterValid('AAAAAAA')).toBeTruthy()
        expect(letterValid('a123')).toBeFalsy()
        expect(letterValid('a123AA')).toBeFalsy()
        expect(letterValid('123123')).toBeFalsy()
    })
    it('numericLetter', () => {
        expect(numericLetterValid('1a')).toBeTruthy()
        expect(numericLetterValid('1aA')).toBeTruthy()
        expect(numericLetterValid('1A')).toBeTruthy()
        expect(numericLetterValid('1123')).toBeFalsy()
        expect(numericLetterValid('a')).toBeFalsy()
        expect(numericLetterValid('aA')).toBeFalsy()
    })
    it('captcha', () => {
        expect(captchaValid('123456')).toBeTruthy()
        expect(captchaValid('aabbcc')).toBeFalsy()
        expect(captchaValid('11aabb')).toBeFalsy()
    })
    it('newEnergyLicensePlate', () => {
        expect(newEnergyLicensePlateValid('渝ADA1234')).toBeTruthy()
        expect(newEnergyLicensePlateValid('渝A01234A')).toBeTruthy()
        expect(newEnergyLicensePlateValid('渝A99999')).toBeTruthy()
        expect(newEnergyLicensePlateValid('渝A9999挂')).toBeTruthy()
        expect(newEnergyLicensePlateValid('渝AO1234A')).toBeFalsy()
        expect(newEnergyLicensePlateValid('渝AI1234A')).toBeFalsy()
        expect(newEnergyLicensePlateValid('渝AI01234')).toBeFalsy()
        expect(newEnergyLicensePlateValid('渝AD1234A')).toBeFalsy()
    })
    it('licensePlate', () => {
        expect(licensePlateValid('渝ADA1234')).toBeTruthy()
        expect(licensePlateValid('渝AD1234')).toBeTruthy()
        expect(licensePlateValid('渝AD1234挂')).toBeTruthy()
        expect(licensePlateValid('渝AD123挂')).toBeTruthy()
        expect(licensePlateValid('渝AD123')).toBeFalsy()
    })
    it('SON16', () => {
        expect(SON16valid('#000')).toBeTruthy()
        expect(SON16valid('#000000')).toBeTruthy()
        expect(SON16valid('#fff')).toBeTruthy()
        expect(SON16valid('#FFF')).toBeTruthy()
    })
    it('socialCreditCode', () => {
        expect(socialCreditCodeValid('91230184MA1BUFLT44')).toBeTruthy()
        expect(socialCreditCodeValid('AH371000MA3MXH0E3W')).toBeTruthy()
        expect(socialCreditCodeValid('BH371000MA3MXH0E3W')).toBeTruthy()
        expect(socialCreditCodeValid('IH371000MA3MXH0E3W')).toBeFalsy()
        expect(socialCreditCodeValid('IH371000MA30E3W')).toBeFalsy()
    })
    it('bankCard', () => {
        expect(bankCardValid('1234567891')).toBeTruthy()
        expect(bankCardValid('123456789112345678911234567891')).toBeTruthy()
        expect(bankCardValid('12345678911234567891123456789')).toBeTruthy()
        expect(bankCardValid('1234567891123456789112345678911')).toBeFalsy()
        expect(bankCardValid('123456789')).toBeFalsy()
    })
    it('chinese', () => {
        expect(chineseValid('啊')).toBeTruthy()
        expect(chineseValid('嗄')).toBeTruthy()
        expect(chineseValid('龘')).toBeTruthy()
        expect(chineseValid('龘123')).toBeFalsy()
        expect(chineseValid('龘ADC')).toBeFalsy()
        expect(chineseValid('龘#')).toBeFalsy()
        expect(chineseValid('。。')).toBeFalsy()
    })
    it('postalCode', () => {
        expect(postalCodeValid('734500')).toBeTruthy()
        expect(postalCodeValid('100101')).toBeTruthy()
    })
    it('consecutive', () => {
        expect(consecutiveValid('11abc')).toBeTruthy()
        expect(consecutiveValid('--abc')).toBeTruthy()
        expect(consecutiveValid('，，abc')).toBeTruthy()
        expect(consecutiveValid('ab..cc')).toBeTruthy()
        expect(consecutiveValid('啊啊123')).toBeTruthy()
        expect(consecutiveValid('[[')).toBeTruthy()
    })
})
