/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor'];
    return valid_map.indexOf(str.trim()) >= 0
}

export function validSignInUsername(str) {
    const reg = /^[a-zA-Z0-9&.@]+$/;
    return reg.test(str);
}

export function validRolePermissionName(str) {
    const reg = /^[a-zA-Z0-9-]+$/;
    return reg.test(str);
}

export function validRolePermissionAttribute(str) {
    const reg = /^[a-zA-Z0-9-\u4e00-\u9fa5]+$/;
    return reg.test(str);
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
    return typeof str === 'string' || str instanceof String;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}

export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}


/* 合法真实姓名 */
export function validateRealName(rule, value, callback) {
    const realnameReg = /^[\u0391-\uFFE5A-Za-z]+$/
    if (!value) {
        return callback(new Error('真实姓名不能为空'))
    }
    setTimeout(() => {
        if (!realnameReg.test(value)) {
            return callback(new Error('您的真实姓名格式错误,请输入英文或汉字!'))
        } else {
            callback()
        }
    }, 100)
}

/* 年龄2~3位 */
export function validateRealAge(rule, value, callback) {
    const realnameReg = /^[1-9]{2}$/
    if (!value) {
        return callback(new Error('年龄不能空'))
    }
    setTimeout(() => {
        if (!realnameReg.test(value)) {
            return callback(new Error('年龄必须2~3位'))
        } else {
            callback()
        }
    }, 100)
}



/* 合法身份证 */
export function validateIdNumber(rule, value, callback) {
    const idNumberReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (!value) {
        return callback(new Error('身份证号码不能为空!!'))
    }
    setTimeout(() => {
        if (!idNumberReg.test(value)) {
            return callback(new Error('您的身份证号码格式错误!'))
        } else {
            callback()
        }
    }, 100)
}

/* 合法手机号 */
export function validatePhone(rule, value, callback) {
    const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (!value) {
        return callback(new Error('手机号码不能为空!!'))
    }
    setTimeout(() => {
        if (!phoneReg.test(value)) {
            return callback(new Error('手机号码格式错误'))
        } else {
            callback()
        }
    }, 100)
}


/* 合法邮箱 */
export function validateEmail(rule, value, callback) {
    const emailReg = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})$/
    if (!value) {
        return callback(new Error('邮箱不能为空!!'))
    }
    setTimeout(() => {
        if (!emailReg.test(value)) {
            return callback(new Error('邮箱格式错误'))
        } else {
            callback()
        }
    }, 100)
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}

