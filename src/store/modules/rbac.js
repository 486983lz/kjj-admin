import {
    getAllRoles, editRole, createRole, getAllPermissions,
    createPermission, getPermissionByRoleName, assignPermissionsToRole,
    editPermission, cancelPermissionsOfRole}
    from '@/api/rbac';

const state = {
    roles: []
};

const actions = {
    getAllRoles({commit, state}) {
        return new Promise((resolve, reject) => {
            getAllRoles().then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    editRole({commit, state}, data) {
        return new Promise((resolve, reject) => {
            //console.log(state);
            editRole(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    createRole({commit, state}, data) {
        return new Promise((resolve, reject) => {
            createRole(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    getAllPermissions({commit, state}) {
        return new Promise((resolve, reject) => {
            getAllPermissions().then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    getPermissionByRoleName({commit, state}, data) {
        return new Promise((resolve, reject) => {
            getPermissionByRoleName(data).then(response => {
                const {data} = response;
                resolve(data);
            }).catch(error => {
                reject(error);
            })
        });
    },

    createPermission({commit, state}, data) {
        return new Promise((resolve, reject) => {
            createPermission(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    editPermission({commit, state}, data) {
        return new Promise((resolve, reject) => {
            editPermission(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    assignPermissionsToRole({commit, state}, data) {
        return new Promise((resolve, reject) => {
            assignPermissionsToRole(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },

    cancelPermissionsOfRole({commit, state}, data) {
        return new Promise((resolve, reject) => {
            cancelPermissionsOfRole(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }
};

export default {
    namespaced: true,
    state,
    actions
}
