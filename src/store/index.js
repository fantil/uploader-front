/**
 * Created by ftk on 2018/8/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import apis from "./api";

Vue.use(Vuex)
// 只有action的store，目前只用来管理api
let actions = {};
// DispatchName，分发路径的名称
const DispatchActions = {};
for (let actionName in apis) {
    DispatchActions[actionName] = actionName;
    actions[actionName] = apis[actionName];
}
const store = new Vuex.Store({
    state: {
        city: "杭州"
    },
    actions: actions,
    mutations: {
        changeCity(state, city) {
            state.city = city
        }
    },
    getters: {}
});
export {store};
export {DispatchActions};
