import {
    getRecommendProjectList}
    from '@/api/projectSb';


const state = {
    roles: []
};

const actions = {
    getRecommendProjectList({commit, state},data) {
        return new Promise((resolve, reject) => {
            getRecommendProjectList(data).then(response => {
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
