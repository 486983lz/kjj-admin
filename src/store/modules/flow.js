import {
    getFlowList,updateFlow,createFlow,getFlowInfo,saveFlowInfo}
    from '@/api/flow';


const state = {
    roles: []
};

const actions = {

    getFlowList({commit, state},data) {
        return new Promise((resolve, reject) => {
            getFlowList(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    updateFlow({commit, state},data) {
        return new Promise((resolve, reject) => {
            updateFlow(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    createFlow({commit, state},data) {
        return new Promise((resolve, reject) => {
            createFlow(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    getFlowInfo({commit, state},data) {
        return new Promise((resolve, reject) => {
            getFlowInfo(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    saveFlowInfo({commit, state},data) {
        return new Promise((resolve, reject) => {
            saveFlowInfo(data).then(response => {
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
