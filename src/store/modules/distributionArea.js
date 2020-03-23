import {distributionArea} from '@/api/distributionArea';

const state = {
    roles: []
};

const actions = {
    //分配地区
    distributionArea({commit, state},data) {
        return new Promise((resolve, reject) => {
            distributionArea(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

/*    //查看所有二级单位
    getAllTwoCompanyOption({commit, state},data) {
        return new Promise((resolve, reject) => {
            getAllTwoCompanyOption(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },*/

};

export default {
    namespaced: true,
    state,
    actions
}
