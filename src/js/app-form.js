export default {
  name: 'app-form',
  data: function () {
    return {
      title : "Form",
      websiteValue: "www.example.com",
      emailValue: "example@gmail.com",
      searchValue: "",
      searchResults: [],
      descriptionValue : "Got it for feeding cats",
      badge:{}
     }
   },
  methods: {
    submit: function (events) {
      console.log("submitted");
    },
    generation: function (event){
    function signingComplete(){
      var encoder = new TextEncoder('utf-8');
      function keyGeneration(resolve, reject){
        var algorithmKeyGen = {
          name: "RSASSA-PKCS1-v1_5",
          // RsaHashedKeyGenParams
          modulusLength: 2048,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),  // Equivalent to 65537
          hash: {
            name: "SHA-256"
          }
        };
        window.crypto.subtle.generateKey(algorithmKeyGen, false, ["sign"]).then(function(newKey){
          console.log("created new key");
          resolve(newKey);
        })
      }
      var algorithmSign = {
        name: "RSASSA-PKCS1-v1_5"
      };
      function signing(dataToEncode){
        if(this.key== undefined){
          let promise = new Promise (keyGeneration);
          promise.then(
            function (key){
              var dataPart1 = encoder.encode(dataToEncode);
              this.key=key;
              return window.crypto.subtle.sign(algorithmSign, this.key.privateKey, dataPart1)
            }.bind(this),
            console.error.bind(console, "Unable to generate a key")
          );
        }
        else{
          var dataPart1 = encoder.encode(dataToEncode);
          return window.crypto.subtle.sign(algorithmSign, this.key.privateKey, dataPart1)
        }
      }
      console.log.bind(signing.call(this, "data"));
    }
      signingComplete.call(this);
      let href= "http://esp-api-dev-0.10.0.cogni.zone/resource/skill?uri=http://data.europa.eu/esco/skill/3233330f-bb93-47ea-93b4-ed903d05d9f1&language=fr";
      var assertionVar = "todo UUID";
      //might require the client to do so.
      var d = new Date();
      var date = d.toISOString();
      var imageURI = "TODO URI";
      fetch(href, {
        method: "get"
      }).then(r => r.json())
      .then(result => {
        if(result){
          var referenceURI = (''+href.match("uri=.*?&"));
          var descriptionSkill = result.description.en.literal;
          var title = result.title;
          this.badge = {id : assertionVar,
            type : "Assertion",
            recipient : {
              type : "email",
              identity : this.emailValue
            },
            issuedOn : date,
            verification : {
              type : "signed"
            },
            badge: {
              id : this.websiteValue+" "+title,
              type : "BadgeClass",
              name : title,
              description : descriptionSkill+" ESCO database URI : "+referenceURI.substring(4, referenceURI.length-1),
              image : imageURI,
              criteria : {
                narrative : this.descriptionValue
              },
              issuer : {
                id : this.websiteValue,
                type : "Issuer",
                name : this.websiteValue,
                url : this.websiteValue,
                email : this.websiteValue
              }
            }
          };
        }
      });
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
      let input = document.getElementById('image-input');
      let file  = input.files[0];
      var img = new Image();
      var objectURL = URL.createObjectURL(file);
      img.src = objectURL;
      img.onload = () => {
        let sizes = {
          width:img.width,
          height: img.height
        };
        if(sizes.width < 480 && sizes.height < 150){
          let confirmBox = confirm("Are you sure you want to continue?")
          if(confirmBox === true) {
            this.displayImage(file, img);
          }
        }else {
            this.displayImage(file, img);
        }
        img.height=150;
        let stuff=document.getElementById("logo");
        let reader = new FileReader();
        reader.onload = (function(aImg) {
          return function(e) {
            document.getElementById("logo").setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e.target.result);
          }.bind(this); 
        }.bind(this))(stuff);
        reader.readAsDataURL(file);
      };
    },

    displayImage: function (file, img) {
      let image = document.getElementById('image');
      image.file = file;
      let reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
      reader.readAsDataURL(file);
    }
  }

}
