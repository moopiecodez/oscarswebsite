const express = require('express');
const oscars = require('./oscars.json');
const app = express();
const port = 8080;

/*
const oscarNominees = {
  Nominee: oscars.Nominee,
  Won: oscars.Won
};
*/

app.get("/nominations", (req, res) => {
  console.log(req.query); 
  console.log(typeof req.query.year);
  let num = oscars.length;
  console.log(num)
  //console.log(oscars.toString());
  const output = oscars.filter(function(oscar) {
    //console.log(oscar.Year);
    //return oscar.Year == req.query.year;
    let include = true;
    if (req.query.year != "") {
      if (!oscar.Year.includes(req.query.year)) {
        return false;
      }
    }
    if (req.query.category != "") {
      if (!oscar.Category.includes(req.query.category)) {
        return false;
      }
    }
    if (req.query.won != "") {
      if (!oscar.Won.includes(req.query.won)) {
        return false;
      }
    }
    if (req.query.nomInfo != "") {
      if ((!oscar.Nominee.includes(req.query.nomInfo)) && 
          (!oscar.Info.includes(req.query.nomInfo))) {
            return false;
      }
    }
    if (req.query.nominee != "") {
      if(!oscar.Nominee.includes(req.query.nominee)) {
        return false;
      }
    }
    if (req.query.info != "") {
      if(!oscar.Info.includes(req.query.info)) {
        return false;
      }
    }
    return true;
/*
    if (req.query.nomInfo === "") {
      return (oscar.Year.includes(req.query.year) && 
              oscar.Category.includes(req.query.category) &&
              oscar.Nominee.includes(req.query.nominee) &&
              oscar.Info.includes(req.query.info)) &&
              oscar.Won.includes(req.query.won);
    } else {
      return (oscar.Year.includes(req.query.year) && 
              oscar.Category.includes(req.query.category) &&
              (oscar.Nominee.includes(req.query.nomInfo) ||
              oscar.Info.includes(req.query.nomInfo)) &&
              oscar.Won.includes(req.query.won));
    }
*/
    //need to account for [] in info  
  });
  
  for(ele of output) {
    console.log("Ele is" + ele);  
  };
  console.log("the output" + output);
  res.header('Access-Control-Allow-Origin', "*");
  //res.send("Hello World! How are you?");
  res.json(output);
});

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
  
   // question return in array format or objects format?
   let output = Object.entries(counter);
   console.log(output);
   if(req.query.times != "") {
    output = output.filter(function(element) {
      return element[1] >=req.query.times;
    })
    counter = output.map(element => ({
      Nominee: element[0],
      Times: element[1]
    }));
   };
   console.log(counter);
  
  res.header('Access-Control-Allow-Origin', "*");
  let message = "Hello the nominees are..."
  res.json(output);  
})

var server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


/*
app.get("/nominations", (req, res) => {
  console.log(req.query); 
  const results = oscars.filter(function(nominee) {
    return nominee.Category === req.query.Category.value;
  })
  res.header('Access-Control-Allow-Origin', "*");
  //res.send("Hello World! How are you?");
  res.json(results);
});
*/