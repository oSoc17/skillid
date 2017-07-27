import fetch from 'isomorphic-fetch';
export default {
	name: 'app-form',
	props: ['formControlElements'],
	data() {
		return {
			formContentValues: {
				websiteValue: "",
				issuerNameValue: "",
				receiverNameValue: "",
				emailValue: "",
				searchValue: "",
				pickedSkill: "",
				pickedSkillHref: "",
				descriptionValue: "",
				errors: ""
			},
			clicks: 0,
			searchResults: [],
			searchResultsHref: [],
			badge: {},
			nameBadge: "round_language",
			firstHref: "",
			count: 0,
		}
	},

	methods: {
		submitSearch: function () {
      this.$emit('next-step');
    },
		isValidEmail: function(email) {
			//https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
			let re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
			return re.test(email);
		},
		isValidWebsite: function(website){
			//https://stackoverflow.com/questions/34488170/regular-expression-in-javascript-for-valid-domain-name
			let re = new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$");
			console.log(website);
			return re.test(website);
		},
		validateEmail: function(el){
			if (!this.isValidEmail(this.formContentValues.emailValue)) {
				el.srcElement.focus();
				this.setError(true, "This is not a valid e-mailaddress");
			} else {
				this.setError(false, "");
			}
		},
		validateWebsite: function(el){
			if (!this.isValidWebsite(this.formContentValues.websiteValue)) {
				this.setError(true, "This is not a valid website url");
				el.srcElement.focus();
			} else {
				this.setError(false, "");
			}
		},
		hasContent: function(el){
			if (! el.srcElement.value.trim() ){
				el.srcElement.focus();
				this.setError(true, "This field is mandatory");
			} else {
				this.setError(false, "");
			}
		},
		setError: function(hasError, errortext){
			this.formControlElements.formHasErrors = hasError;
			this.formContentValues.errors = errortext;
		},
		/**
		* todo change isValidForm into a valid function
		* @returns {boolean}
		*/
		isValidForm: function(){
			return true;
		},
		getCorrectTag: function(href, nameChange){
			function broadestConcept(href, changeName){
				fetch(href, {
					method: "get"
				})
				.then(r => r.json())
				.then(result => {
					if(result){
						let res=result.title;
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
						else if(res==="application of knowledge"){
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
						else {
							console.log(result._links.self.href);
							changeName("round_language");
						}
					}
				})
			}
			broadestConcept(href, nameChange);
		},
		setPickedValue: function (event) {
			console.log("setting");
      		this.formContentValues.pickedSkill = event.currentTarget.innerHTML;
			console.log(this.formContentValues.pickedSkill)
      		let position;
      		for (var i=0; i<this.searchResults.length; i++){
        		if (this.searchResults[i]==this.formContentValues.pickedSkill){
          			position=i;
        		};
      		};
      		this.formContentValues.pickedSkillHref = this.searchResultsHref[position];
      		this.submit();
	  	},
		submit: function (events) {
			let href=this.formContentValues.pickedSkillHref;
			console.log(href);
			this.getCorrectTag(href, function (x){
				this.nameBadge=x;
				document.getElementById("svgFile").style.visibility="visible";
				document.getElementById(this.nameBadge).style.visibility="visible";
				let resultStr= this.formContentValues.pickedSkill.split(" ");
				console.log(this.formContentValues.pickedSkill)
				let offset = resultStr.length % 3;
				let string1 = "";
				let string2 = "";
				let string3 = "";
				if (offset===1){
					for (let i=0; i<(resultStr.length-offset)/3; i++){
						string1+=resultStr[i]+" ";
					}
					for (let i=0; i<((resultStr.length-offset)/3)+1; i++){
						string2+=resultStr[i+((resultStr.length-offset)/3)]+" ";
					}
					for (let i=0; i<(resultStr.length-offset)/3; i++){
						if (resultStr.length>3){
							string3+=resultStr[i+1+(2*(resultStr.length-offset)/3)]+" ";
						}
					}
				}else if(offset===2){
					for (let i=0; i<(1+((resultStr.length-offset)/3)); i++){
						string1+=resultStr[i]+" ";
					}
					for (let i=0; i<(1+((resultStr.length-offset)/3)); i++){
						string2+=resultStr[i+1+((resultStr.length-offset)/3)]+" ";
					}
					for (let i=0; i<((resultStr.length-offset)/3); i++){
						if (resultStr.length>3){
							string3+=resultStr[i+2+(2*(resultStr.length-offset)/3)]+" ";
						}
					}
				}else {
					for (let i=0; i<(resultStr.length-offset)/3; i++){
						string1+=resultStr[i]+" ";
					}
					for (let i=0; i<((resultStr.length-offset)/3); i++){
						string2+=resultStr[i+((resultStr.length-offset)/3)]+" ";
					}
					for (let i=0; i<(resultStr.length-offset)/3; i++){
						string3+=resultStr[i+(2*(resultStr.length-offset)/3)]+" ";
					}
				}
				document.getElementById("text1").textContent = string1;
				document.getElementById("text2").textContent = string2;
				document.getElementById("text3").textContent = string3;
				this.submitSearch();
			}.bind(this));
		},

		toggleImageInputActive: function () {
			this.formControlElements.imageInputActif = !this.formControlElements.imageInputActif
		},
	toggleCompanyNameInput: function () {
		this.formControlElements.companyNameInput = !this.formControlElements.companyNameInput
	},
	toggleUrlInput: function () {
		this.formControlElements.urlInput = !this.formControlElements.urlInput
	},
	toggleColorInput: function () {
		this.formControlElements.colorInput = !this.formControlElements.colorInput;
	},

	generation: function (event){
		console.log("generation");
		function signingComplete(){
			let encoder = new TextEncoder('utf-8');
			function keyGeneration(resolve, reject){
				let algorithmKeyGen = {
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
			let algorithmSign = {
				name: "RSASSA-PKCS1-v1_5"
			};
			function signing(dataToEncode){
				if(this.key== undefined){
					let promise = new Promise (keyGeneration);
					promise.then(
						function (key){
							let dataPart1 = encoder.encode(dataToEncode);
							this.key=key;
							return window.crypto.subtle.sign(algorithmSign, this.key.privateKey, dataPart1)
						}.bind(this),
						console.error.bind(console, "Unable to generate a key")
					);
				} else {
					let dataPart1 = encoder.encode(dataToEncode);
					return window.crypto.subtle.sign(algorithmSign, this.key.privateKey, dataPart1);
				}
			}
			console.log.bind(signing.call(this, "data"));
		}
		function uuidv4() {
			//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
			return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
				(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
			}

			//signingComplete.call(this);
			let href= "http://esp-api-dev-0.10.0.cogni.zone/resource/skill?uri=http://data.europa.eu/esco/skill/3233330f-bb93-47ea-93b4-ed903d05d9f1&language=fr";
			let assertionVar = uuidv4();
			let d = new Date();
			let date = d.toISOString();
			let s = new XMLSerializer().serializeToString(document.getElementById("svgFile"))
			let encodedData = window.btoa(unescape(encodeURIComponent(s)));
			let imageURI = "data:image/svg+xml;base64,"+encodedData;

			function ab2str(buf) {
				return String.fromCharCode.apply(null, new Uint16Array(buf));
			}

			function str2ab(str) {
				//https://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers
				let buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
				let bufView = new Uint16Array(buf);
				for (let i=0, strLen=str.length; i<strLen; i++) {
					bufView[i] = str.charCodeAt(i);
				}
				return buf;
			}

			let buf =str2ab(this.formContentValues.emailValue);
			crypto.subtle.digest("SHA-256", buf).then(function(resultHash){
				let resHash=ab2str(resultHash);
				fetch(href, {
					method: "get"
				})
				.then(r => r.json())
				.then(result => {
					if(result){
						let referenceURI = (''+href.match("uri=.*?&"));
						let descriptionSkill = result.description[this.formControlElements.locale].literal;
						let title = result.title;
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
								id : this.formContentValues.websiteValue + " " + title,
								type : "BadgeClass",
								name : title,
								description : descriptionSkill+" ESCO database URI : "+referenceURI.substring(4, referenceURI.length-1),
								image : imageURI,
								criteria : {
									narrative : this.formContentValues.descriptionValue
								},
								issuer : {
									id : this.formContentValues.websiteValue,
									type : "Issuer",
									name : this.formContentValues.websiteValue,
									url : this.formContentValues.websiteValue,
									email : this.formContentValues.websiteValue
								}
							}
						};
						let fileSave = require('./FilaSaver.js');
						let data = "data:json;charset=utf-8,";
						let blob = new Blob([JSON.stringify(this.badge)], {type: data});
						fileSave.saveAs(blob, "badge.json");
					}
				}
			);
		}.bind(this))
	},
	onChangeSearch: function () {
		document.getElementById("svgFile").style.visibility="hidden";
		document.getElementById(this.nameBadge).style.visibility="hidden";
		let list = document.querySelector('.list');
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}

		let fetched = fetch(`http://esp-api-dev-0.10.0.cogni.zone/search?text=${this.formContentValues.searchValue}&language=`+this.formControlElements.locale+`&type=skill&facet=type&facet=isInScheme`, {
			method: 'get'
		});

		let promis = fetched.then(r => r.json());

		let resultsObject = promis.then(result => {
			if(result){
				this.count=0;
				result._embedded.results.forEach(r => this.addNewElement(r));
			}
		});
	},
	addNewElement: function (r) {
		this.searchResultsHref.push(r._links.self.href);
		this.searchResults.push(r.title);
	},
	changeColor: function(){
		let input = document.getElementById('color-input').value;
		console.log(input);
	},
	handleImage: function () {
		function getAverageColourAsRGB (img) {
			//https://gist.github.com/olvado/1048628
			//some modification to be up to date and make the color less agressives.
			let canvas = document.createElement('canvas'),
			context = canvas.getContext("2d"),
			rgb = {r:102,g:102,b:102}, // Set a base colour as a fallback for non-compliant browsers
			pixelInterval = 5, // Rather than inspect every single pixel in the image inspect every 5th pixel
			count = 0,
			i = -4,
			data, length;
			// return the base colour for non-compliant browsers
			if (!context) { return rgb; }
			// set the height and width of the canvas element to that of the image
			let height = canvas.height = img.naturalHeight || img.offsetHeight || img.height,
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
			let res = (rgb.r+rgb.g+rgb.b - 127*3)/6;
			rgb.r=Math.floor(rgb.r-res);
			rgb.b=Math.floor(rgb.b-res);
			rgb.g=Math.floor(rgb.g-res);
			return rgb;
		}
		let input = document.getElementById('image-input');
		let file = input.files[0];
		let img = new Image();

		img.src =  URL.createObjectURL(file);

		img.onload = () => {
			let sizes = {
				width:img.width,
				height: img.height
			};
			if(sizes.width < 480 && sizes.height < 150){
				let confirmBox = confirm("Are you sure you want to continue?")
				if(confirmBox !== true) {
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
					let rgb=getAverageColourAsRGB(img);
					let rgbString="rgb("+rgb.r+", "+rgb.g+", "+rgb.b+")";
					let x= document.getElementsByClassName("st0");
					for(let i=0; i<x.length; i++){
						x[i].style.fill=rgbString;
					}
				}.bind(this);
			}.bind(this))(stuff);
			reader.readAsDataURL(file);
		};
	}
}
}
