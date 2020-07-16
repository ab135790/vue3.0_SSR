import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
// import { fetchItem } from './api'
import { getData } from '@/api/data';
export function createStore () {
    return new Vuex.Store({
        state: {
            lists: []
        },
        actions: {
            getDataAction ({ commit }) {
                console.log('commit', commit);
                return getData().then(res => {
                    console.log('rse', res);
                    commit('setData', res);
                })
            }
        },
        mutations: {
            setData (state, data) {
                state.lists = data;
            }
        }
    })
}
