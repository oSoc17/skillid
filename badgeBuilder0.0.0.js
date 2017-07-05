var href = "http://esp-api-dev-0.10.0.cogni.zone/resource/skill?uri=http://data.europa.eu/esco/skill/3233330f-bb93-47ea-93b4-ed903d05d9f1&language=fr";
var http = require("http");
var assertionVar = "todo assertion";
var date = "todo date"
var imageURI = "todo URI";
var fs = require("fs");
function success(stringResult){
    console.log(stringResult);
    var result = JSON.parse(stringResult);
    var descriptionSkill = result.description.en.literal;
    var title = result.title;
    var badge ={id : assertionVar,
                type : "Assertion",
                recipient : {
                    type : "email",
                    identity : email
                },
                issuedOn : date,
                verification : {
                    type : "hosted"
                },
                badge: {
                    id : websiteUser+" "+title,
                    type : "BadgeClass",
                    name : title,
                    description : descriptionSkill,
                    image : imageURI,
                    criteria : {
                        narrative : userNarrative
                    },
                    issuer : {
                        id : websiteUser,
                        type : "Issuer"
                    }
                }
            };
    var jsonFile = JSON.stringify(badge);
    fs.writeFile("badgeJson.json", jsonFile, function(err){
        if (err){
            console.log(err)
        }
        else{
            console.log("success");
        }
    })
}
function badgeBuilder(href, websiteUser, userNarrative, email){
    http.get(href, function(res){
        if(res.statusCode===200){
            res.setEncoding("utf8");
            var stringResult="";
            res.on("data", function(chunk){
                stringResult+=chunk;
            })
            res.on('end', function (){
                var result = JSON.parse(stringResult);
                var descriptionSkill = result.description.en.literal;
                var title = result.title;
                var badge ={id : assertionVar,
                    type : "Assertion",
                    recipient : {
                        type : "email",
                        identity : email
                    },
                    issuedOn : date,
                    verification : {
                        type : "hosted"
                    },
                    badge: {
                        id : websiteUser+" "+title,
                        type : "BadgeClass",
                        name : title,
                        description : descriptionSkill,
                        image : imageURI,
                        criteria : {
                            narrative : userNarrative
                        },
                        issuer : {
                            id : websiteUser,
                            type : "Issuer"
                        }
                    }
                };
                var jsonFile = JSON.stringify(badge);
                fs.writeFile("badgeJson.json", jsonFile, function(err){
                if (err){
                    console.log(err)
                }
                else{
                    console.log("success");
                    }
                })
            });
        }
    })
}

badgeBuilder(href, "website", "narrative", "email");