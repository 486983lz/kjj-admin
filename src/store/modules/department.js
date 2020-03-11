import {saveDepartment,getAllDepartment,editDepartment,updateDepartment,allDepartment,getAccounts} from '@/api/department';

const state = {
    roles: []
};

const actions = {
    //添加归口科室
    saveDepartment({commit, state},data) {
        return new Promise((resolve, reject) => {
            saveDepartment(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //查看归口科室
    getAllDepartment({commit, state},data) {
        return new Promise((resolve, reject) => {
            getAllDepartment(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //编辑归口科室
    editDepartment({commit, state},data) {
        return new Promise((resolve, reject) => {
            editDepartment(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    updateDepartment({commit, state},data) {
        return new Promise((resolve, reject) => {
            updateDepartment(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //查看所有归口科室
    allDepartment({commit, state},data) {
        return new Promise((resolve, reject) => {
            allDepartment(data).then(response => {
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

};

export default {
    namespaced: true,
    state,
    actions
}
