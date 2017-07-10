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
    submit: function (events) {
      console.log("submitted");
    },

    onChangeSearch: function () {
      let list = document.querySelector('.list');
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      if(this.searchValue.length > 3) {
        let fetched = fetch(`http://esp-api-dev-0.10.0.cogni.zone/search?text=${this.searchValue}&language=en&type=skill&facet=type&facet=isInScheme`, {
  	       method: 'get'
         })

         let promis = fetched.then(r => r.json())
         let resultsObject = promis.then(result => {
           if(result){
             result._embedded.results.forEach(r => this.addNewElement(r))
           }
         });
      }

    },

    addNewElement: function (r) {
      this.searchResults.push(r.title);
    },

    handleImage: function () {
      let selectedFile = document.getElementById('image-input').files[0];
      console.log(selectedFile);
      let image = document.getElementById('image');
      image.file = selectedFile;
      var reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
      reader.readAsDataURL(selectedFile);
    }
  }

}
