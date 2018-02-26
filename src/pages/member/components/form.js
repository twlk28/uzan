import addressData from 'js/address.json'
import Address from 'js/addressService.js'

export default {
    data() {
        return {
            name: '',
            tel: '',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            id: '',
            type: '',
            instance: '',
            provinces: addressData.list,
            citys: null,
            districts: null,
            editInited: false,
        }
    },
    computed: {
        addresses() {
            return this.$store.state.list
        }
    },
    created(){
        let q = this.$route.query
        this.type = q.type
        this.instance = q.instance

        let e = q.instance
        if (this.type == 'edit'){
            this.id = e.id
            this.name = e.name
            this.tel = e.tel
            this.address = e.address
            this.provinceValue = e.provinceValue
            this.cityValue = e.cityValue
            this.districtValue = e.districtValue
            this.editInited = true
        }
    },
    beforeUpdate(){
        this.editInited = false
    },
    methods: {
        add(){
            let {name, tel, provinceValue, cityValue, districtValue, address} = this
            let data = {name, tel, provinceValue, cityValue, districtValue, address}
            if (this.type == 'add'){
                this.$store.dispatch('requestAddressAdd', data)
            }
            if (this.type == 'edit'){
                data.id = this.id
                this.$store.dispatch('requestAddressUpdate', data)
            }
        },
        remove(){
            if(window.confirm("确认删除吗?")){
                this.$store.dispatch('requestAddressRemove', this.id)
            }
        },
        setDefault(){
            this.$store.dispatch('requestAddressSetDefault', this.id)
        },
    },
    watch: {
        addresses: {
            handler() {
                this.$router.go(-1)
            },
            deep: true
        },
        provinceValue(val, oldVal){
            if (val == -1) {
                return
            }
            let i = this.provinces.findIndex(item => {
                return item.value == val
            })
            this.citys = this.provinces[i].children
            this.cityValue = -1
            this.districtValue = -1
            if (this.type == 'edit' && this.editInited){
                this.cityValue = this.instance.cityValue
            }
        },
        cityValue(val, oldVal){
            if (val == -1) {
                return
            }

            let i = this.citys.findIndex(item => {
                return item.value == val
            })
            this.districts = this.citys[i].children
            this.districtValue = -1
            if (this.type == 'edit' && this.editInited){
                this.districtValue = this.instance.districtValue
            }
        }
    }
}
