import {
    uploadTinymceImg,postNoticeInfo,getNoticeList,getNoticeInfo,updateNoticeInfo}
    from '@/api/notice';


const state = {
    roles: []
};

const actions = {

    uploadTinymceImg({commit, state},data) {
        return new Promise((resolve, reject) => {
            uploadTinymceImg(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    postNoticeInfo({commit, state},data) {
        return new Promise((resolve, reject) => {
            postNoticeInfo(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getNoticeList({commit, state},data) {
        return new Promise((resolve, reject) => {
            getNoticeList(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getNoticeInfo({commit, state},data) {
        return new Promise((resolve, reject) => {
            getNoticeInfo(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    updateNoticeInfo({commit, state},data) {
        return new Promise((resolve, reject) => {
            updateNoticeInfo(data).then(response => {
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
