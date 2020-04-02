import {saveAccounts,allRecommendAccounts,deleteRecommend,editRecommend,updateRecommend,
        editPassword,updatePassword,getUserToDepartments} from '@/api/recommend';

const state = {
    roles: []
};

const actions = {
    //添加管理员账号
    saveAccounts({commit, state},data) {
        return new Promise((resolve, reject) => {
            saveAccounts(data).then(response => {
                const {data} = response;
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //查看管理员账号
    allRecommendAccounts({commit, state},data) {
        return new Promise((resolve, reject) => {
            allRecommendAccounts(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //删除管理员账号
    deleteRecommend({commit, state},data) {
        return new Promise((resolve, reject) => {
            deleteRecommend(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //编辑二级单位帐号
    editRecommend({commit, state},data) {
        return new Promise((resolve, reject) => {
            editRecommend(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    updateRecommend({commit, state},data) {
        return new Promise((resolve, reject) => {
            updateRecommend(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //修改帐号密码
    editPassword({commit, state},data) {
        return new Promise((resolve, reject) => {
            editPassword(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    updatePassword({commit, state},data) {
        return new Promise((resolve, reject) => {
            updatePassword(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //查看归口科室账号
    getAccounts({commit, state},data) {
        return new Promise((resolve, reject) => {
            getAccounts(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    //根据科室id获取用户
    getUserToDepartments({commit, state},data) {
        return new Promise((resolve, reject) => {
            getUserToDepartments(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

};

export default {
    namespaced: true,
    state,
    actions
}
