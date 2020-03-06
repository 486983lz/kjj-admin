import {
    getAll,getTabList,createTab,createShow,createSearch}
    from '@/api/projectTab';


const state = {
    roles: []
};

const actions = {
    getAll({commit, state},data) {
        return new Promise((resolve, reject) => {
            getAll(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getTabList({commit, state},data) {
        return new Promise((resolve, reject) => {
            getTabList(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    createTab({commit, state},data) {
        return new Promise((resolve, reject) => {
            createTab(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    createShow({commit, state},data) {
        return new Promise((resolve, reject) => {
            createShow(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    createSearch({commit, state},data) {
        return new Promise((resolve, reject) => {
            createSearch(data).then(response => {
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
