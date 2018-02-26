import Vue from  'vue'
import Router from 'vue-router'
import axios from 'axios'
import url from 'js/api.js'
import utils, {log} from 'js/utils.js'
Vue.use(Router)

// route.vue
import Member from '../components/member.vue'
import Address from '../components/address.vue'
import All from '../components/all.vue'
import Form from '../components/form.vue'

let routes = [{
    path: '/',
    component: Member
},{
    path: '/address',
    component: Address,
    children: [{
        path: '',
        // component: All, // -> /address
        redirect: 'all', // -> /address/all
    },{
        path: 'all',
        name: 'aliasAll',
        component: All,
    },{
        path: 'form',
        name: 'aliasForm',
        component: Form,
    }]
}]

// 创建router实例
let router = new Router({
    routes
})

export default router
