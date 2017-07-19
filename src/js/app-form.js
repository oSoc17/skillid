export default {
  name: 'app-form',
  data: function () {
    return {
      titles : ["Search", "Meta data", "Personalize"],
      currentTitle: "Search",
      clicks: 0,
      searchActif: true,
      metaDataActif: false,
      personalizeActif: false,
      buttonText: ["next", "next", "generate"],
      currentButtonText: "Next",
      websiteValue: "www.example.com",
      issuerNameValue: "",
      receiverNameValue: "",
      emailValue: "example@gmail.com",
      searchValue: "",
      searchResults: [],
      descriptionValue : "Got it for feeding cats",
      badge:{},
      imageInputActif: true,
      companyNameInput: true,
      urlInput: true,
      colorInput: true,
      nameBadge: "round_language",
      firstHref:"",
      count:0,
      language: "en"
     }
   },
  methods: {
    validation: function(){
      function validateEmail(email) {
        //https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
        var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        return re.test(email);
      }
      function validateWebsite(website){
        //https://stackoverflow.com/questions/34488170/regular-expression-in-javascript-for-valid-domain-name
        var re = new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$");
        console.log(website);
        return re.test(website);
      }
      function validateIssuerName(issuerName){
        return issuerName != "";
      }
      function validateReceiverName(receiverName){
        return receiverName != "";
      }
      function validateDescriptionValue(descriptionValue){
        return descriptionValue != "";
      }
      var returnbool = true;
      //todo, change color?
      if (!validateEmail(this.emailValue)){
        returnbool=false;
      }
      if (!validateWebsite(this.websiteValue)){
        returnbool=false;
      }
      if (!validateIssuerName(this.receiverNameValue)){
        returnbool=false;
      }
      if(!validateReceiverName(this.receiverNameValue)){
        returnbool=false;
      }
      if(!validateDescriptionValue(this.descriptionValue)){
        returnbool=false;
      }
      if(returnbool){
        document.getElementById("errorLabel").style.display="none";
        return true;
      }
      else{
        document.getElementById("errorLabel").style.display="block";
        return false;
      }
    },
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
              changeName("decagon_social");
            }
            else if(res==="language"){
              changeName("decagon_language");
            }
            else if(res==="thinking"){
              changeName("decagon_thinking");
            }
            else if(res==="attitudes and values"){
              changeName("decagon_attitudes");
            }
            else if(res=="application of knowledge"){
              changeName("decagon_applications");
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
      if(this.clicks < 3) {
        this.clicks += 1;
        this.currentTitle = this.titles[this.clicks];
        this.currentButtonText = this.buttonText[this.clicks];
        if(this.clicks == 1) {
          this.searchActif = !this.searchActif;
          this.metaDataActif = !this.metaDataActif;
          var href=this.firstHref;
          this.getCorrectTag(href, function (x){
            this.nameBadge=x;
            document.getElementById("svgFile").style.visibility="visible"
            document.getElementById(this.nameBadge).style.visibility="visible";
          }.bind(this));
        }else if (this.clicks == 2) {
          if(this.validation()){
            this.metaDataActif = !this.metaDataActif;
            this.personalizeActif = !this.personalizeActif;
          }
          else{
            this.clicks-=1;
          }
        }else{
          this.clicks-=1;
          console.log("generation call");
          this.generation().bind(this);
        }
      } else {
        console.log("error in next");
      }
    },

    back: function () {
      if(this.clicks < 3 && this.clicks > 0) {
        this.clicks -= 1;
        this.currentTitle = this.titles[this.clicks];
        this.currentButtonText = this.buttonText[this.clicks];
        if (this.clicks == 0) {
          this.searchActif = !this.searchActif;
          this.metaDataActif = !this.metaDataActif;
        }else if(this.clicks == 1) {
          this.metaDataActif = !this.metaDataActif;
          this.personalizeActif = !this.personalizeActif;
        }else if (this.clicks == 2) {
          this.metaDataActif = !this.metaDataActif;
          this.personalizeActif = !this.personalizeActif;
        }
      }
    },
    changeStateInputField: function (input) {
      console.log(input)
      if(input === "imageInputActif") {
        this.imageInputActif = !this.imageInputActif
      }else if(input === "companyNameInput") {
        this.companyNameInput = !this.companyNameInput
      }else if (input === "urlInput") {
        this.urlInput = !this.urlInput
      }else {
        this.colorInput = !this.colorInput
      }
    },
    generation: function (event){
      console.log("generation");
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
      var s = new XMLSerializer().serializeToString(document.getElementById("svgFile"))
      var encodedData="";
      var encodedData = window.btoa(unescape(encodeURIComponent(s)));
      var imageURI = "data:image/svg+xml;base64,"+encodedData;
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
      document.getElementById("svgFile").style.visibility="hidden"
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
        let fetched = fetch(`http://esp-api-dev-0.10.0.cogni.zone/search?text=${this.searchValue}&language=`+this.language+`&type=skill&facet=type&facet=isInScheme`, {
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
      function getAverageColourAsRGB (img) {
        //https://gist.github.com/olvado/1048628
        //some modification to be up to date and make the color less agressives.
        var canvas = document.createElement('canvas'),
        context = canvas.getContext("2d"),
        rgb = {r:102,g:102,b:102}, // Set a base colour as a fallback for non-compliant browsers
        pixelInterval = 5, // Rather than inspect every single pixel in the image inspect every 5th pixel
        count = 0,
        i = -4,
        data, length;
        // return the base colour for non-compliant browsers
        if (!context) { return rgb; }
        // set the height and width of the canvas element to that of the image
        var height = canvas.height = img.naturalHeight || img.offsetHeight || img.height,
        width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

        context.drawImage(img, 0, 0);

        try {
          data = context.getImageData(0, 0, width, height);
        } catch(e) {
        // catch errors - usually due to cross domain security issues
          alert(e);
          return rgb;
        }

        data = data.data;
        length = data.length;
        while ((i += pixelInterval * 4) < length) {
          count++;
          rgb.r += data[i];
          rgb.g += data[i+1];
          rgb.b += data[i+2];
        }
  
        // floor the average values to give correct rgb values (ie: round number values)
        rgb.r = rgb.r/count;
        rgb.g = rgb.g/count;
        rgb.b = rgb.b/count;
        var res = (rgb.r+rgb.g+rgb.b - 127*3)/6;
        rgb.r=Math.floor(rgb.r-res);
        rgb.b=Math.floor(rgb.b-res);
        rgb.g=Math.floor(rgb.g-res);
        return rgb;
      }
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
          if(confirmBox != true) {
            console.log("todo");
          }
        }
        img.height=150;
        let stuff=document.getElementById("logo");
        let reader = new FileReader();
        reader.onload = (function(aImg) {
          return function(e) {
            document.getElementById("logo").setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e.target.result);
            document.getElementById("logo").style.visibility="visible";
            var rgb=getAverageColourAsRGB(img);
            var rgbString="rgb("+rgb.r+", "+rgb.g+", "+rgb.b+")"
            var x= document.getElementsByClassName("st0");
            for(var i=0; i<x.length; i++){
              x[i].style.fill=rgbString;
            };
          }.bind(this); 
        }.bind(this))(stuff);
        reader.readAsDataURL(file);
      };
    }
  }
}
