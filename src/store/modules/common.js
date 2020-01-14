const actions = {
    resetObj({commit, state}, obj) {
        for(const [key,val] of Object.entries(obj)) {
            obj[key] = '';
        }
    }
};

export default {
    namespaced: true,
    actions
}