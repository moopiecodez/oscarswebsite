const express = require('express');
const oscars = require('./oscars.json');
const req = require('express/lib/request');
const app = express();
const port = 8080;

//Checks the query string submitted by a nominations request for errors
function checkQuery(req) {
  if (req.query.year != "" && (isNaN(req.query.year) || req.query.year < 1960 || req.query.year > 2010))
    return {error: "Please enter a valid year between 1960 and 2010."};
  if(!oscars.find(oscar => oscar.Category.includes(req.query.category)))
    return {error: "That is not a valid category."};
  if(!oscars.find(oscar => oscar.Nominee.includes(req.query.nomInfo)) &&
     !oscars.find(oscar => oscar.Info.includes(req.query.nomInfo)))
    return {error: "That is not a valid nominee or info criteria."};
  if(!oscars.find(oscar => oscar.Nominee.includes(req.query.nominee)))
    return {error: "That is not a valid nominee."};
  if(!oscars.find(oscar => oscar.Info.includes(req.query.info)))
    return {error: "That is not a valid info criteria."};
  return "";
};

/*
  Handles a GET request submitted by clicking on the nominations button.
  Serves an error to the client if the parameters are not found in the 
  oscars.json file, for Year parameter an error is returned if the query is not 
  in the range 1960 to 2010.
*/
app.get("/nominations", (req, res) => {
  let output = checkQuery(req);
  if (output != "") {
    res.header('Access-Control-Allow-Origin', "*");
    res.json(output);
    return;
  }
  output = oscars.filter(function(oscar) {
    if (req.query.year != "" && (!oscar.Year.includes(req.query.year))) {
        return false;
      }
    if (req.query.category != "" &&
        (!oscar.Category.includes(req.query.category))) {
        return false;
      }
    if (req.query.won != "" && (!oscar.Won.includes(req.query.won))) {
        return false;
      }
    if (req.query.nomInfo != "" && 
        ((!oscar.Nominee.includes(req.query.nomInfo)) && 
          (!oscar.Info.includes(req.query.nomInfo)))) {
            return false;
      }
    if (req.query.nominee != "" && (!oscar.Nominee.includes(req.query.nominee))) {
        return false;
      }
    if (req.query.info != "" && (!oscar.Info.includes(req.query.info))) {
        return false;
      }
    return true;
  });
  res.header('Access-Control-Allow-Origin', "*");
  res.json(output);
});

/*
  Handles a GET request submitted by clicking on the nominees button. 
  Returns an error to the client if the number of times parameter submitted is 
  too high.
*/
app.get("/nominees", (req, res) => {
  console.log(req.query);
  let counter = {};
  for (oscar of oscars) {
    if(oscar.Category.includes("--") && oscar.Won.includes(req.query.won)) {
      if(counter[oscar.Nominee]) {
        counter[oscar.Nominee] += 1;
      } else {
        counter[oscar.Nominee] = 1;
      }
    }
   };
   let output = Object.entries(counter);
   let result = "either won or not won";
   if(req.query.won === "yes")
    result = "won";
   if(req.query.won ==="no")
    result = "not won";

     if (req.query.times != "") {
      if (!output.find(element => element[1] >= req.query.times)) {
      output = {error: "No nominee has " + result + " at least as many times as specified."};
    } else {
    output = output.filter(function(element) {
      return element[1] >=req.query.times;
    })}   
   };
  
  res.header('Access-Control-Allow-Origin', "*");
  res.json(output);  
})

var server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
