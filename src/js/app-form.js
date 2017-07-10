export default {
  name: 'app-form',
  data: function () {
    return {
      title : "Form",
      websiteValue: "www.example.com",
      emailValue: "example@gmail.com",
      searchValue: "",
      searchResults: []
     }
   },
  methods: {
    submit: function () {
      console.log("submitted");
    },

    onChangeSearch: function () {
      let list = document.querySelector('.list');
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      fetch(`http://esp-api-dev-0.10.0.cogni.zone/search?text=${this.searchValue}&language=en&type=skill&facet=type&facet=isInScheme`, {
	       method: 'get'
       }).then(r => r.json())
       .then(result => {
         if(result){
           result._embedded.results.forEach(r => this.addNewElement(r))
         }
       });
    },

    addNewElement: function (r) {
      this.searchResults.push(r.title);
    }
  }

}
