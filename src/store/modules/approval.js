import {getApproval,getAllIndustry} from '@/api/approval';

const state = {
    roles: []
};

const actions = {
    //查看立项项目数据
    getApproval({commit, state},data) {
        return new Promise((resolve, reject) => {
            getApproval(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //查看所有领域
    getAllIndustry({commit, state},data) {
        return new Promise((resolve, reject) => {
            getAllIndustry(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //删除二级单位
    /*deleteTwoCompany({commit, state},data) {
        return new Promise((resolve, reject) => {
            deleteTwoCompany(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },*/

};

export default {
    namespaced: true,
    state,
    actions
}
