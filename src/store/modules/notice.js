import {
    uploadTinymceImg,postNoticeInfo}
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



};

export default {
    namespaced: true,
    state,
    actions
}
