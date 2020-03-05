import {
    getAll,}
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

};

export default {
    namespaced: true,
    state,
    actions
}
