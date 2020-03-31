import {asyncRoutes, constantRoutes, recommendRouter} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

function hasCommonPermission(Permissions, route) {
    if (route.meta && route.meta.permissions) {
        return Permissions.some(role => route.meta.permissions.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = [];

    routes.forEach(route => {
        const tmp = {...route};
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    });

    return res
}

export function filterCommonAsyncRoutes(routes, Permissions) {
    const res = [];
    routes.forEach(route => {
        const tmp = {...route};
        if (hasCommonPermission(Permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterCommonAsyncRoutes(tmp.children, Permissions)
            }
            res.push(tmp)
        }
    });

    return res
}

const state = {
    routes: [],
    addRoutes: []
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes)
    }
};

const actions = {
    generateRoutes({commit}, roles) {
        return new Promise(resolve => {
            let accessedRoutes;
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes)
        })
    },
    generateCommonRoutes({commit},permissions) {
        return new Promise(resolve => {
            let accessedRoutes;
            if (permissions.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterCommonAsyncRoutes(asyncRoutes,permissions)
            }

            commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes);
        });
    },

    generateCommonRoutesRole({commit},permissions) {
        return new Promise(resolve => {
            let accessedRoutes;
            if (permissions.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterCommonAsyncRoutes(recommendRouter,permissions)
            }

            commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes);
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
