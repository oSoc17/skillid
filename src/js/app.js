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
        showBadge:false,
				colorInput: true,
				formHasErrors: false,
        //this is an horrible hack and I should feel bad for using it.
        placeholderSearch:"Search for keywords, categories ...",
        searchButton:"Search",
        issuerInfoLabel:"Details of the sender",
        issuerNameLabel: "Your company name",
        websiteIssuerLabel: "Your company URL",
        issuerNamePlaceholder: "eg. ESCO Badges",
        issuerWebsitePlaceholder:"eg. www.badgebuilder.eu",
        nextButton:"Next step",
        customizationLabel:"Customization",
        receiverInfoLabel:"Details of the receiver",
        receiverNameLabel:"Name of the receiver",
        receiverEmailLabel:"E-mail of the receiver",
        emailPlaceholder:"eg. badgebuilder@gmail.com",
        companyLogoLabel:"Add your logo",
        changeColorLabel:"Adjust the background colour",
        saveLibraryLabel:"Save badge & return to library",
        saveAwardLabel:"Save & Award",
        descriptionLabel:"Description",
        descriptionPlaceholder:"Reason why the receiver deserves this badge.",
        step1Label:"Step 1",
        step2Label:"Step 2",
        step3Label:"Step 3",
        step4Label:"Step 4",
        step5Label:"Step 5",
        stepEndorsement:"Choose an endorsement",
        stepDetails:"Add your details",
        stepCustomize:"Customize (optional)",
        stepAward:"Award the badge",
        stepOverview:"Overview & share",
        overviewLabel:"Overview",
        senderLabel:"Sender",
        receiverLabel:"Receiver",
        createBadgeLabel:"Create a Badge",
        returnLibraryLabel:"Return to library",
        locale:"en"
      }
    }
  },
  components: {
    appNav,
    appForm,
    appBadge
  },

  methods: {
		/**
		* Implement next button.
		* @Return void.
		* @Param event of clicked button.
		*/
		nextStep: function (events) {
      if(this.formControlElements.searchActive == true){
        this.formControlElements.showBadge=true;
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
	  /**
	  * Change the language to the chosen one.
	  * @Return void
	  */
    changeLanguage: function(){
      language={
        en:{
        placeholderSearch:"Search for keywords, categories ...",
        searchButton:"Search",
        issuerInfoLabel:"Details of the sender",
        issuerNameLabel: "Your company name",
        websiteIssuerLabel: "Your company URL",
        issuerNamePlaceholder: "eg. ESCO Badges",
        issuerWebsitePlaceholder:"eg. www.badgebuilder.eu",
        nextButton:"Next step",
        customizationLabel:"Customization",
        receiverInfoLabel:"Details of the receiver",
        receiverNameLabel:"Name of the receiver",
        receiverEmailLabel:"E-mail of the receiver",
        emailPlaceholder:"eg. badgebuilder@gmail.com",
        companyLogoLabel:"Add your logo",
        changeColorLabel:"Adjust the background colour",
        saveLibraryLabel:"Save badge & return to library",
        saveAwardLabel:"Save & Award",
        descriptionLabel:"Description",
        descriptionPlaceholder:"Reason why the receiver deserves this badge.",
        step1Label:"Step 1",
        step2Label:"Step 2",
        step3Label:"Step 3",
        step4Label:"Step 4",
        step5Label:"Step 5",
        stepEndorsement:"Choose an endorsement",
        stepDetails:"Add your details",
        stepCustomize:"Customize (optional)",
        stepAward:"Award the badge",
        stepOverview:"Overview & share",
        overviewLabel:"Overview",
        senderLabel:"Sender",
        receiverLabel:"Receiver",
        createBadgeLabel:"Create a Badge",
        returnLibraryLabel:"Return to library",
        },
        fr:{
        placeholderSearch:"Recherchez des mot-clés, des catégories, ...",
        searchButton:"Recherche",
        issuerInfoLabel:"Informations sur l'envoyeur",
        issuerNameLabel: "Le nom de votre entreprise",
        websiteIssuerLabel: "L'URL de votre entreprise",
        issuerNamePlaceholder: "ex. ESCO Badges",
        issuerWebsitePlaceholder:"ex. www.badgebuilder.eu",
        nextButton:"Etape suivante",
        customizationLabel:"Customisation",
        receiverInfoLabel:"Informations sur le receveur",
        receiverNameLabel:"Nom du receveur",
        receiverEmailLabel:"Courriel du receveur",
        emailPlaceholder:"ex. badgebuilder@gmail.com",
        companyLogoLabel:"Ajoutez votre logo",
        changeColorLabel:"Ajustez la couleur du fond",
        saveLibraryLabel:"Sauvegardez le badge & Ajoutez le à votre bibliothèque",
        saveAwardLabel:"Sauvegardez & Donnez",
        descriptionLabel:"Description",
        descriptionPlaceholder:"Pourquoi le receveur devrait recevoir ce badge.",
        step1Label:"Etape 1",
        step2Label:"Etape 2",
        step3Label:"Etape 3",
        step4Label:"Etape 4",
        step5Label:"Etape 5",
        stepEndorsement:"Choississez un endorsement",
        stepDetails:"Ajoute vos information",
        stepCustomize:"Customiser le badge",
        stepAward:"Donnez le badge",
        stepOverview:"Vue complete & Partagez",
        overviewLabel:"Vue complete",
        senderLabel:"Envoyeur",
        receiverLabel:"Receveur",
        createBadgeLabel:"Creez un Badge",
        returnLibraryLabel:"Retournez à la bibliothèque",
        },
        nl:{
        placeholderSearch:"Zoek op sleutelwoord...",
        searchButton:"Zoek",
        issuerInfoLabel:"Details van de verzender",
        issuerNameLabel: "Organisatienaam",
        websiteIssuerLabel: "Organisatiewebsite",
        issuerNamePlaceholder: "bvb. ESCO Badges",
        issuerWebsitePlaceholder:"bvb. www.badgebuilder.eu",
        nextButton:"Volgende",
        customizationLabel:"Aanpassen aan uw voorkeur",
        receiverInfoLabel:"Details van de ontvanger",
        receiverNameLabel:"Naam van de ontvanger",
        receiverEmailLabel:"E-mail van de ontvanger",
        emailPlaceholder:"bvb. badgebuilder@gmail.com",
        companyLogoLabel:"Voeg uw logo toe",
        changeColorLabel:"Pas achtergrondkleur toe",
        saveLibraryLabel:"Sla badge op en keer terug naar het overzicht",
        saveAwardLabel:"Sla op en ken toe",
        descriptionLabel:"Beschrijving",
        descriptionPlaceholder:"Waarom verdient de ontvanger de badge?",
        step1Label:"Stap 1",
        step2Label:"Stap 2",
        step3Label:"Stap 3",
        step4Label:"Stap 4",
        step5Label:"Stap 5",
        stepEndorsement:"Kies een endorsement",
        stepDetails:"Voeg uw details toe",
        stepCustomize:"Aanpassen (optioneel)",
        stepAward:"Ken de badge toe",
        stepOverview:"Overzicht & deel",
        overviewLabel:"Overzicht",
        senderLabel:"Verzender",
        receiverLabel:"Ontvanger",
        createBadgeLabel:"Maak een badge",
        returnLibraryLabel:"Keer terug naar het overzicht",
        }
      }
	    for(var obj in language[this.formControlElements.locale]){
        if (language[this.formControlElements.locale].hasOwnProperty(obj)){
          if(this.formControlElements.hasOwnProperty(obj)){
            this.formControlElements[obj]=language[this.formControlElements.locale][obj];
          }
        }
      }
    },
	  /**
	  * Toggle searchActive
	  * @Reutrn void
	  */
    toggleSearchActive: function(){
  		this.formControlElements.searchActive = !this.formControlElements.searchActive;
  	},
	  /**
	  * Toggle issuerDetailActive
	  * @Return void
	  */
  	toggleIssuerDetailsActive: function () {
  		this.formControlElements.issuerDetailsActive = !this.formControlElements.issuerDetailsActive;
  	},
	  /**
	  * Toggle customizeActive
	  * @Return void
	  */
  	toggleCustomizeActive: function() {
  		this.formControlElements.customizeActive = !this.formControlElements.customizeActive;
  	},
	  /**
	  * Toggle receiverDetailActive
	  * @Return void
	  */
  	toggleReceiverDetailsActive: function() {
  		this.formControlElements.receiverDetailsActive = !this.formControlElements.receiverDetailsActive;
  	},
	  /**
	  * Toggle overviewDetailActive
	  * @Return void
	  */
  	toggleOverviewActive: function() {
  		this.formControlElements.overviewActive = !this.formControlElements.overviewActive;
  	}
  }
}
