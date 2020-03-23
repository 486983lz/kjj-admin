//状态200下错误讯息
export function err_code_msg(err_code) {
    return error_common_message[err_code] || '未知错误';
}

//网络错误讯息(response.status!==200)
export function err_status_msg(err_status) {
    return error_status_message[err_status] || '服务器错误';
}

const error_common_message = {
    20001: '用户名或密码错误',
    20002: '用户名不存在',
    20003: '用户未登录',
    20005: '已登出',

    50000: '新建成功',
    50010: '提交信息错误',
    50020: '删除成功',
    50030: '修改成功 ',

    80000: '分配成功 '
};

const error_status_message = {
    401: '授权失效，请重新登录',
    422: '提交失败'
};