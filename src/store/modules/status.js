import {
    createStatus,getStatusList,getLibraryAll,createStatusToLibrary,updateStatusToLibrary,deleteStatusToLibrary,getStatusOption}
    from '@/api/status';


const state = {
    roles: []
};

const actions = {

    createStatus({commit, state},data) {
        return new Promise((resolve, reject) => {
            createStatus(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    getStatusList({commit, state},data) {
        return new Promise((resolve, reject) => {
            getStatusList(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getLibraryAll({commit, state},data) {
        return new Promise((resolve, reject) => {
            getLibraryAll(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    createStatusToLibrary({commit, state},data) {
        return new Promise((resolve, reject) => {
            createStatusToLibrary(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    updateStatusToLibrary({commit, state},data) {
        return new Promise((resolve, reject) => {
            updateStatusToLibrary(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    deleteStatusToLibrary({commit, state},data) {
        return new Promise((resolve, reject) => {
            deleteStatusToLibrary(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getStatusOption({commit, state},data) {
        return new Promise((resolve, reject) => {
            getStatusOption(data).then(response => {
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
