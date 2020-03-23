import {getArea,saveTowCompany,getAllTwoCompany,deleteTwoCompany,editTwoCompany,updateTwoCompany,getAllTwoCompanyOption} from '@/api/twoLevelCompany';

const state = {
    roles: []
};

const actions = {
    //获取地区
    getArea({commit, state},data) {
        return new Promise((resolve, reject) => {
            getArea(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //添加二级单位
    saveTowCompany({commit, state},data) {
        return new Promise((resolve, reject) => {
            saveTowCompany(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //查看二级单位
    getAllTwoCompany({commit, state},data) {
        return new Promise((resolve, reject) => {
            getAllTwoCompany(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //删除二级单位
    deleteTwoCompany({commit, state},data) {
        return new Promise((resolve, reject) => {
            deleteTwoCompany(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //编辑二级单位
    editTwoCompany({commit, state},data) {
        return new Promise((resolve, reject) => {
            editTwoCompany(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    updateTwoCompany({commit, state},data) {
        return new Promise((resolve, reject) => {
            updateTwoCompany(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },


    //查看所有二级单位
    getAllTwoCompanyOption({commit, state},data) {
        return new Promise((resolve, reject) => {
            getAllTwoCompanyOption(data).then(response => {
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
