import {
    getProblemList,postProblemInfo,uploadTinymceImg,getProblemInfo,updateProblemInfo,deleteProblem,updateProblemStatus}
    from '@/api/problem';


const state = {
    roles: []
};

const actions = {
    getProblemList({commit, state},data) {
        return new Promise((resolve, reject) => {
            getProblemList(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    getProblemInfo({commit, state},data) {
        return new Promise((resolve, reject) => {
            getProblemInfo(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    updateProblemStatus({commit, state},data) {
        return new Promise((resolve, reject) => {
            updateProblemStatus(data).then(response => {
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
