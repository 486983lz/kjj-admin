

import store from '@/store'
export function getStatusName(k,c) {
    return store.getters.statusConf[k][c]
}
