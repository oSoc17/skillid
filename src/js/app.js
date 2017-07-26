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
        imageInputActive: true,
				companyNameInput: true,
				urlInput: true,
				colorInput: true,
				formHasErrors: false
      }
    }
  },
  components: {
    appNav,
    appForm,
    appBadge
  },

  methods: {
		nextStep: function (events) {
      if(this.formControlElements.searchActive == true){
        this.toggleSearchActive();
  			this.toggleIssuerDetailsActive();
      }else if(this.formControlElements.issuerDetailsActive == true) {
        this.toggleIssuerDetailsActive();
        this.toggleCustomizeActive();
      }else if(this.formControlElements.customizeActive == true) {
        this.toggleCustomizeActive();
        this.toggleReceiverDetailsActive();
      }else if (this.formControlElements.receiverDetailsActive == true) {
        this.toggleReceiverDetailsActive();
        this.toggleOverviewActive();
      }
		},
    toggleSearchActive: function(){
  		this.formControlElements.searchActive = !this.formControlElements.searchActive;
  	},
  	toggleIssuerDetailsActive: function () {
  		this.formControlElements.issuerDetailsActive = !this.formControlElements.issuerDetailsActive;
  	},
  	toggleCustomizeActive: function() {
  		this.formControlElements.customizeActive = !this.formControlElements.customizeActive;
  	},
  	toggleReceiverDetailsActive: function() {
  		this.formControlElements.receiverDetailsActive = !this.formControlElements.receiverDetailsActive;
  	},
  	toggleOverviewActive: function() {
  		this.formControlElements.overviewActive = !this.formControlElements.overviewActive;
  	}
  }
}
