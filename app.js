const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const async = require('async');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mailchimp.setConfig({
  apiKey: '0e32fbaef0380900e17e83acea805f8e-us14',
  server: 'us14'
});

app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const listId =  4025241e81;
  console.log(firstName , lastName , email);

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      })
      res.sendFile(__dirname + "/success.html");
    }
    catch (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();

});




  // const dataSend = {
  //   members: [
  //     {
  //       email_address: email,
  //       status: "subscribed",
  //       merge_fields: {
  //         FNAME: firstName,
  //         LNAME: lastName
  //       }
  //     }
  //   ]
  //
  // };
  // const jsonData = JSON.stringify(dataSend);
  //
  // const url = "https://us14.mailchimp.com/account/api/lists/4025241e81";
  //
  // const options = {
  //   method: "POST",
  //   auth: "nikita1:984167221f9cb0d7abfd244270cde20d-us14"
  // };
  //
  // const request = https.request(url,options,function(response){
  //   console.log(response.statusCode);
  //   response.on("data",function(data){
  //     console.log(JSON.parse(data));
  //   })
    // request.write(jsonData);



app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(3000,function(req , res){
  console.log("server running on port 3000");
});


// API Key
// 984167221f9cb0d7abfd244270cde20d-us14

// list id
// 4025241e81
