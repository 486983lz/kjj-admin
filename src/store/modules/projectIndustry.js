import {
    getAll,getIndustryList,createIndustry,createSearch,createShow}
    from '@/api/projectIndustry';


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
    getIndustryList({commit, state},data) {
        return new Promise((resolve, reject) => {
            getIndustryList(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    createIndustry({commit, state},data) {
        return new Promise((resolve, reject) => {
            createIndustry(data).then(response => {
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
