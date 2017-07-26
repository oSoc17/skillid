import appForm from '../components/app-form.vue'
import appBadge from '../components/app-badge.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    appForm,
    appBadge
  }

}
