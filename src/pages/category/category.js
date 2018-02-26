import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import utils, {log} from 'js/utils.js'

new Vue({
    el: '#app',
    data: {
        activeId: -1,
        categorys1: null,
        categorys2: null,
        rank: null,
    },
    created() {
        this.requestCategorys1()
        this.requestRank()
    },
    methods: {
        requestCategorys1(){
            axios.get(url.categorys1)
            .then(res => {
                this.categorys1 = res.data.lists
            })
        },
        requestCategorys2(id){
            if (this.activeId == +id){
                return
            }
            this.activeId = +id
            axios.get(url.categorys2, {id})
            .then(res => {
                this.categorys2 = res.data.data
            })
        },
        requestRank(){
            axios.get(url.rank)
            .then(res => {
                this.rank = res.data.data
            })
        },
        redirectToSearch(item){
            location.href = `search.html?keyword=${item.name}&id=${item.id}`
        }
    },
    mixins: [mixin],
})
