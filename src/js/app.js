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
        stepOverview:"Overview & share"
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
    changeLanguage: function(){
      language={
        en:{
          searchNavLabel:"1. Search skill",
          metaDataNavLabel:"2. Meta data",
          personalizeNavLabel:"3. Personalize badge",
          searchFieldLabel:"What are you looking for?",
          searchButton:"Search",
          issuerInfoLabel:"Your info",
          issuerNameLabel: "Full name issuer",
          websiteIssuerLabel: "Website url issuer",
          receiverInfoLabel:"Receivers info",
          receiverNameLabel:"Full name receiver",
          receiverEmailLabel:"E-mail of the recipient",
          whyLabel: "Why",
          descriptionLabel: "Description why the recipient deserves the badge",
          companyLogoLabel:"Add company logo",
          companyNameLabel:"Add company name",
          companyUrlLabel:"Add url to company logo",
          changeColorLabel:"Change color",
          logoLabel:"Company logo",
          nameLabel:"Company name",
          urlLabel:"Url",
          colorLabel:"Color",
          backLabel:"&#x25C0 Back",
          buttonText: ["next", "next", "generate"]
        },
        fr:{
          searchNavLabel:"1. Recherche de la compétence",
          metaDataNavLabel:"2. Meta données",
          personalizeNavLabel:"3. Personalisation du badge",
          searchFieldLabel:"Que cherchez vous?",
          searchButton:"Recherche",
          issuerInfoLabel:"Vos informations",
          issuerNameLabel: "Nom complet de l'émetteur",
          websiteIssuerLabel: "Url du site web de l'émetteur",
          receiverInfoLabel:"Informations du destinataire",
          receiverNameLabel:"Nom complet du destinataire",
          receiverEmailLabel:"Courriel du destinataire",
          whyLabel: "Pourquoi",
          descriptionLabel: "Description pourquoi le destinataire mérite le badge",
          companyLogoLabel:"Ajouter le logo de l'entreprise",
          companyNameLabel:"Ajouter le nom de l'entreprise",
          companyUrlLabel:"Ajouter l'url du logo de l'entreprise",
          changeColorLabel:"Changer la couleur",
          logoLabel:"Logo de l'entreprise",
          nameLabel:"Nom de l'entreprise",
          urlLabel:"Url",
          colorLabel:"Couleur",
          backLabel:"&#x25C0 Précedent",
          buttonText: ["suivant", "suivant", "Générer"]
        },
        nl:{
          searchNavLabel:"1. Zoek skill",
          metaDataNavLabel:"2. Meta data",
          personalizeNavLabel:"3. Personalizeer badge",
          searchFieldLabel:"Wat zoek je?",
          searchButton:"Onderzoek",
          issuerInfoLabel:"Uw info",
          issuerNameLabel: "Naam issuer",
          websiteIssuerLabel: "Website issuer",
          receiverInfoLabel:"Ontvangers INFO",
          receiverNameLabel:"Naam ontvanger",
          receiverEmailLabel:"E-mail ontvanger",
          whyLabel: "Waarom",
          descriptionLabel: "Waarom verdient de ontvanger de badge?",
          companyLogoLabel:"Voeg logo toe",
          companyNameLabel:"Voeg bedrijfsnaam toe",
          companyUrlLabel:"Voeg url naar logo toe",
          changeColorLabel:"Pas kleur aan",
          logoLabel:"Company logo",
          nameLabel:"Bedrijfsnaam",
          urlLabel:"Url",
          colorLabel:"Kleurq",
          backLabel:"&#x25C0 Terug",
          buttonText: ["Volgende", "Volgende", "genereren"]
        }
      }
      this.formContentElements.searchNavLabel=language[this.locale].searchNavLabel
      this.formContentElements.metaDataNavLabel=language[this.locale].metaDataNavLabel
      this.formContentElements.personalizeNavLabel=language[this.locale].personalizeNavLabel
      this.formContentElements.searchFieldLabel=language[this.locale].searchFieldLabel
      this.formContentElements.searchButton=language[this.locale].searchButton
      this.formContentElements.issuerInfoLabel=language[this.locale].issuerInfoLabel
      this.formContentElements.issuerNameLabel=language[this.locale].issuerNameLabel
      this.formContentElements.websiteIssuerLabel=language[this.locale].websiteIssuerLabel
      this.formContentElements.receiverInfoLabel=language[this.locale].receiverInfoLabel
      this.formContentElements.receiverNameLabel=language[this.locale].receiverNameLabel
      this.formContentElements.receiverEmailLabel=language[this.locale].receiverEmailLabel
      this.formContentElements.whyLabel=language[this.locale].whyLabel
      this.formContentElements.descriptionLabel=language[this.locale].descriptionLabel
      this.formContentElements.companyLogoLabel=language[this.locale].companyLogoLabel
      this.formContentElements.companyNameLabel=language[this.locale].companyNameLabel
      this.formContentElements.companyUrlLabel=language[this.locale].companyUrlLabel
      this.formContentElements.changeColorLabel=language[this.locale].changeColorLabel
      this.formContentElements.logoLabel=language[this.locale].logoLabel
      this.formContentElements.nameLabel=language[this.locale].nameLabel
      this.formContentElements.urlLabel=language[this.locale].urlLabel
      this.formContentElements.colorLabel=language[this.locale].colorLabel
      this.formContentElements.backLabel=language[this.locale].backLabel
      this.formContentElements.buttonText=language[this.locale].buttonText
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
