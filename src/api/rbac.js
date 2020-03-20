import request from '@/utils/request';

export function createRole(data) {
    return request({
        url: '/rbac/create-role',
        method: 'post',
        data
    })
}

export function getAllRoles() {
    return request({
        url: '/rbac/get-all-roles',
        method: 'post'
    })
}

export function getRole() {
    return request({
        url: '/rbac/get-role',
        method: 'post'
    })
}

export function editRole(data) {
    return request({
        url: '/rbac/edit-role',
        method: 'post',
        data
    })
}

export function deleteRole(data) {
    return request({
        url: '/rbac/delete-role',
        method: 'post',
        data
    })
}

export function getPermissionsByRoleID(data) {
    return request({
        url: '/rbac/get-permission-role-id',
        method: 'post',
        data
    })
}

export function getPermissionByRoleName(data) {
    return request({
        url: '/rbac/get-permission-role-name',
        method: 'post',
        data
    })
}

export function getPermission() {
    return request({
        url: '',
        method: 'post'
    })
}

export function getAllPermissions() {
    return request({
        url: '/rbac/get-all-permissions',
        method: 'post'
    });
}

export function createPermission(data) {
    return request({
        url: '/rbac/create-permission',
        method: 'post',
        data
    })
}

export function editPermission(data) {
    return request({
        url: '/rbac/edit-permission',
        method: 'post',
        data
    })
}

export function deletePermission() {
    return request({
        url: '',
        method: 'post'
    })
}

export function assignPermissionsToRole(data) {
    return request({
        url: '/rbac/assign-permissions-role',
        method: 'post',
        data
    })
}

export function cancelPermissionsOfRole(data) {
    return request({
        url: '/rbac/cancel-permissions-role',
        method: 'post',
        data
    })
}
