import appForm from '../components/app-form.vue'
import appBadge from '../components/app-badge.vue'
import appNav from '../components/app-nav.vue'
export default {
  name: 'app',
  data () {
    return {
      formControlElements: {
        searchActive: true,
        issuerDetailsActive: false,
        customizeActive: false,
        receiverDetailsActive: false,
        overviewActive: false,
        imageInputActive: true
      }
    }
  },
  components: {
    appNav,
    appForm,
    appBadge
  },

  methods: {
		submitSearch: function (events) {
			this.toggleSearchActive();
			this.toggleIssuerDetailsActive();
		}
  }
}
