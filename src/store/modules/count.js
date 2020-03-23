import {
    getIndustryCount,getIndustryCapitalCount,getYearCount}
    from '@/api/count';


const state = {
    roles: []
};

const actions = {
    getIndustryCount({commit, state},data) {
        return new Promise((resolve, reject) => {
            getIndustryCount(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    getIndustryCapitalCount({commit, state},data) {
        return new Promise((resolve, reject) => {
            getIndustryCapitalCount(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    //获取年度立项项目统计
    getYearCount({commit, state},data) {
        return new Promise((resolve, reject) => {
            getYearCount(data).then(response => {
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
