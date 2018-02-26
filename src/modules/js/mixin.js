import Foot from 'components/Foot.vue'

let mixin = {
    filters: {
        currency(num){
            let str = '' + num
        	if (str.indexOf('.') > -1){
        		let a = str.split('.')
        		return a[0] + '.' + (a[1] + '0').substr(0, 2)
        	}
        	else {
        		return str + '.00'
        	}
        }
    },
    components: {
        Foot
    },
}

export default mixin
