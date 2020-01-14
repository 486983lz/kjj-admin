import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken, removeToken} from '@/utils/auth'
import {err_code_msg, err_status_msg} from '@/utils/errmsg'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = 'Bearer ' + getToken();
        }
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error)
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data;
        const commonCode = [2099, 50000, 50020, 50030];
        //
        if (response.status !== 200) {
            Message({
                message: err_status_msg(response.status),
                type: 'error',
                duration: 5 * 1000
            });
            //登录失效，清除授权token
            if (response.status === 401) {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            }
            return false;
        }

        if (res.code !== 20000) {
            if (commonCode.indexOf(res.code)) {
                return new Promise((resolve, reject) => {
                    Message({
                        message: err_code_msg(res.code) || 'Success',
                        type: 'success',
                        duration: 1000
                    });
                    resolve(res);
                });
                //return res;
            } else {
                Message({
                    message: err_code_msg(res.code) || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                });
            }

            if (res.code === 20005) {
                MessageBox.confirm('您已注销用户登录，请重新登录或停留在本页面', '已登出', {
                    confirmButtonText: '去登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }

            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res;
    },
    error => {
        Message({
            message: err_status_msg(error.response.status),
            type: 'error',
            duration: 3 * 1000
        });
        if (error.response.status === 401) {
            removeToken();
            location.reload();
        }

        if (422 === error.response.status) {
            return error.response.data;
        }
        return false;
    }
);

export default service
