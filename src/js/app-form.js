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
      badge:{},
      nameBadge: "round_language",
      firstHref:"",
      count:0
     }
   },
  methods: {
    getCorrectTag: function(href, nameChange){
      function broadestConcept(href, changeName){
        fetch(href, {
          method: "get"
        }).then(r => r.json())
        .then(result => {
          if(result){
            var res=result.title;
            console.log(res);
            if(res==="social interaction"){
              changeName("hexagon_social");
            }
            else if(res==="language"){
              changeName("hexagon_language");
            }
            else if(res==="thinking"){
              changeName("hexagon_thinking");
            }
            else if(res==="attitudes and values"){
              changeName("hexagon_attitudes");
            }
            else if(res=="application of knowledge"){
              changeName("hexagon_applications");
            }
            else if (result._links.broaderSkillGroup){
              broadestConcept(result._links.broaderSkillGroup[0].href, changeName);
            }
            else if (result._links.broaderSkill){
              broadestConcept(result._links.broaderSkill[0].href, changeName);
            }
            else if (result._links.broaderConcept){
              broadestConcept(result._links.broaderConcept[0].href, changeName);
            }
            else{
              console.log(result._links.self.href);
              changeName("round_language");
            }
          }
        })
      }
      broadestConcept(href, nameChange);
    },
    submit: function (events) {
      console.log("submitted");
      var href=this.firstHref;
      this.getCorrectTag(href, function (x){
        this.nameBadge=x;
        document.getElementById(this.nameBadge).style.visibility="visible";
      }.bind(this));
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
      //signingComplete.call(this);
      let href= "http://esp-api-dev-0.10.0.cogni.zone/resource/skill?uri=http://data.europa.eu/esco/skill/3233330f-bb93-47ea-93b4-ed903d05d9f1&language=fr";
      var assertionVar = "todo UUID";
      //might require the client to do so.
      var d = new Date();
      var date = d.toISOString();
      //var s = new XMLSerializer().serializeToString(document.getElementById("svgFile"))
      var encodedData="";
      //var encodedData = window.btoa(unescape(encodeURIComponent(s)));
      var imageURI = "data:image/svg+xml;base64,"+encodedData;
      console.log(imageURI);
      function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
      }

      function str2ab(str) {
        //https://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
      }
      var buf =str2ab(this.emailValue);
      crypto.subtle.digest("SHA-256", buf).then(function(resultHash){
      var resHash=ab2str(resultHash);
      console.log(resHash);
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
                  identity : resHash
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
              var filesave = require('./FilaSaver.js');
              var data = "data:json;charset=utf-8,";
              var blob = new Blob([JSON.stringify(this.badge)], {type: data});
              filesave.saveAs(blob, "badge.json");
        }
      });
}.bind(this))
    },

    onChangeSearch: function () {
      document.getElementById(this.nameBadge).style.visibility="hidden"
      let list = document.querySelector('.list');
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      if(this.searchValue.length > 3) {
        var resultStr= this.searchValue.split(" ");
        var offset = resultStr.length%3;
          var string1 = "";
          var string2 = "";
          var string3 = "";
          if (offset==1){
            for (var i=0; i<(resultStr.length-offset)/3; i++){
              string1+=resultStr[i]+" ";
            }
            for (var i=0; i<((resultStr.length-offset)/3)+1; i++){
              string2+=resultStr[i+((resultStr.length-offset)/3)]+" ";
            }
            for (var i=0; i<(resultStr.length-offset)/3; i++){
              if (resultStr.length>3){
                string3+=resultStr[i+1+(2*(resultStr.length-offset)/3)]+" ";
              }
            }
          }
          else if(offset==2){
            for (var i=0; i<(1+((resultStr.length-offset)/3)); i++){
              string1+=resultStr[i]+" ";
            }
            for (var i=0; i<(1+((resultStr.length-offset)/3)); i++){
              string2+=resultStr[i+1+((resultStr.length-offset)/3)]+" ";
            }
            for (var i=0; i<((resultStr.length-offset)/3); i++){
              if (resultStr.length>3){
                string3+=resultStr[i+2+(2*(resultStr.length-offset)/3)]+" ";
              }
            }
          }
          else {
            for (var i=0; i<(resultStr.length-offset)/3; i++){
              string1+=resultStr[i]+" ";
            }
            for (var i=0; i<((resultStr.length-offset)/3); i++){
              string2+=resultStr[i+((resultStr.length-offset)/3)]+" ";
            }
            for (var i=0; i<(resultStr.length-offset)/3; i++){
              string3+=resultStr[i+(2*(resultStr.length-offset)/3)]+" ";
            }
          }
          document.getElementById("text1").textContent = string1;
          document.getElementById("text2").textContent = string2;
          document.getElementById("text3").textContent = string3;
        let fetched = fetch(`http://esp-api-dev-0.10.0.cogni.zone/search?text=${this.searchValue}&language=en&type=skill&facet=type&facet=isInScheme`, {
  	       method: 'get'
        })

        let promis = fetched.then(r => r.json())

        let resultsObject = promis.then(result => {
          if(result){
            this.count=0;
            result._embedded.results.forEach(r => this.addNewElement(r));
          }
        });
      }
    },
    addNewElement: function (r) {
      if (this.count===0){
        this.firstHref=r._links.self.href
        this.count++;
      }
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
            console.log(document.getElementById("logo"));
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
