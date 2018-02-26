// 使用 vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Address from 'js/addressService.js'

// 创建Store实例
const store = new Vuex.Store({
    state: {
        list: null
    },
    mutations: {
        init(state, list){
            state.list = list
        },
        add(state, instance){
            state.list.push(instance)
        },
        remove(state, id){
            let i = state.list.findIndex(item => {
                return item.id == id
            })
            i > -1 && state.list.splice(i, 1)
        },
        update(state, instance){
            let list = JSON.parse(JSON.stringify(state.list))
            let i = list.findIndex(item => {
                return item.id == instance.id
            })
            if (i > -1){
                list[i] = instance
            }
            state.list = list
        },
        toggleDefault(state, id){
            state.list.forEach(e => {
                e.isDefault = (e.id == id ? true : false)
            })
        }
    },
    actions: {
        requestAddresses(context) {
            Address.list().then(res => {
                context.commit('init', res.data.list)
            })
        },
        requestAddressAdd(context, instance){
            Address.add(instance).then(res => {
                // 模拟后台返回id
                instance.id = parseInt( Math.random() * 10000)
                context.commit('add', instance)
            })
        },
        requestAddressRemove(context, id){
            Address.remove(id).then(res => {
                context.commit('remove', id)
            })
        },
        requestAddressUpdate(context, instance){
            Address.update(instance).then(res => {
                context.commit('update', instance)
            })
        },
        requestAddressSetDefault(context, id){
            Address.setDefault(id).then(res => {
                context.commit('toggleDefault', id)
            })
        },
    }

})

export default store
