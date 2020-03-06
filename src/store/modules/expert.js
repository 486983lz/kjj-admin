import {
    createExpert,getExpertList}
    from '@/api/expert';


const state = {
    roles: []
};

const actions = {

    createExpert({commit, state},data) {
        return new Promise((resolve, reject) => {
            createExpert(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getExpertList({commit, state},data) {
        return new Promise((resolve, reject) => {
            getExpertList(data).then(response => {
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
