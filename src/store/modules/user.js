import {login, logout, getInfo, signin, signout, getAdminInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    info:{},
    statusConf:{},
    permissions:[],
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
   /* SET_ROLES: (state, roles) => {
        state.roles = roles
    },*/
    SET_STATUSCONF: (state, statusConf) => {
        state.statusConf = statusConf
    },
    SET_INFO: (state, info) => {
        state.info = info
    },
    SET_PERMISSIONS:(state, permissions) => {
        state.permissions = permissions
    },
    CLEAR_PERMISSIONS:(stste)=>{
        state.permissions.splice(0)
    }
};

const actions = {
    /*// user login
    login({commit}, userInfo) {
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password}).then(response => {
                const {data} = response;
                commit('SET_TOKEN', data.token);
                setToken(data.token);
                resolve()
            }).catch(error => {
                reject(error)
            });
        })
    },*/

    //登录
    signin({commit}, userInfo) {
        const {account, password} = userInfo;
        return new Promise((resolve, reject) => {
            signin({account: account.trim(), password: password}).then(response => {
                const {data} = response;
                // console.log(data);
                sessionStorage.setItem('userId',data.id);
                sessionStorage.setItem('role',data.role);
                commit('SET_TOKEN', data.token);
                setToken(data.token);
                resolve(data);
            }).catch(error => {
                // console.log(error);
                reject(error);
            });
        })
    },


    /*// get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {data} = response;
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const {roles, name, avatar, introduction} = data;
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }
                // console.log(roles);
                // console.log('fa');
                commit('SET_ROLES', roles);
                commit('SET_NAME', name);
                commit('SET_AVATAR', avatar);
                commit('SET_INTRODUCTION', introduction);
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },*/

    getAdminInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getAdminInfo(state.token).then(response => {
                const {roles, permissions, info,statusConf} = response.data;
                commit('SET_PERMISSIONS', permissions);
                commit('SET_INFO', info);
                commit('SET_STATUSCONF', statusConf);
                //console.log(data);
                resolve(info);
            }).catch(error => {
                reject(error)
            })
        });
    },

    /*// user logout
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                removeToken();
                resetRouter();
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },*/

    // 登出
    signout({commit, state}) {
        return new Promise((resolve, reject) => {
            signout(state.token).then(response => {
                commit('SET_TOKEN', '');
                //TODO 暂无消除角色
                removeToken();
                resetRouter();
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve()
        })
    },

    // dynamically modify permissions
    changeRoles({commit, dispatch}, role) {
        return new Promise(async resolve => {
            const token = role + '-token';
            commit('SET_TOKEN', token);
            setToken(token);
            const {roles} = await dispatch('getInfo');
            resetRouter();
            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true});
            // dynamically add accessible routes
            router.addRoutes(accessRoutes);
            // reset visited views and cached views
            dispatch('tagsView/delAllViews', null, {root: true});
            resolve()
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
