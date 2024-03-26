window.onload = function() {
  document.getElementById("get-nominations").onclick = getNominations;
  document.getElementById("get-nominees").onclick = getNominees;
  }

function formValid(form) {
   let nominfo = form.nomInfo.value;
   let nom = form.nominee.value;
   let info =  form.info.value;
   if(nominfo != "" && (nom != "" || info != "")) {
      alert("If you use the 'Nominee or Info' box please leave the 'Nominee' and 'Info' boxes empty");
      return false;
   } else {
      return true;
   }
}

function getNominationParams(form) {
   const params = new URLSearchParams({
      year: form.year.value,
      category: form.category.value,
      nominee: form.nominee.value,
      info: form.info.value,
      nomInfo: form.nomInfo.value,
      won: form.won.value
   });
   return params;
}

function getNomineeParams(form) {
   const params = new URLSearchParams({
      //no other params used?
      won: form.won.value,
      times: form.times.value
   });
   return params;
}

function testServer() {
   fetch("http://localhost:8080/nominations")
      .then((response) => response.json())
      .then((data) => {
         let outputs = "<ul>";
         for (const nomination of data) {
            outputs += "<li>" + nomination.Year + "</li>"; 
         }
         document.getElementById("output").innerHTML = outputs;
      });
}

function testServer2() {
   const params = getNominationParams(this.form);
   console.log(params);
   fetch("http://localhost:8080/nominations?" + params)
   .then((response) => response.json())
   .then((data) => {
      let outputs = "<ul>";
      for(const nomination of data) {
         outputs += "<li>" + nomination.Year + "</li>";
      }
      document.getElementById("output").innerHTML = outputs;
   });
}

function getNominations() {
   if(!formValid(this.form)) {
      return false;
   };
   const params = getNominationParams(this.form);
   //fetch("oscars.json")
   fetch("http://localhost:8080/nominations?" + params)
      .then((response) => response.json())
      .then((data) => {
      let output = "<table id=\"results\"><tr><th>Year</th><th>Category</th><th>Nominee</th><th>Info</th><th>Won?</th></tr>";
      let rows = 0;
      for (const nomination of data) {
         output = `${output}<tr> 
            <td>${nomination.Year}</td>
            <td>${nomination.Category}</td>
            <td>${nomination.Nominee}</td>
            <td>${nomination.Info}</td>
            <td>${nomination.Won}</td>
            </tr>`;
         rows ++};
      document.getElementById("output").innerHTML = `${output}</table> <br> <p>Number of results is: ${rows}</p> `;
      });
   }

   function getNominees() {
   //need error if nominees?
      if(!formValid(this.form)) {
      return false;
   };
   const params = getNomineeParams(this.form);
   fetch("http://localhost:8080/nominees?" + params)
   //fetch("oscars.json")
   .then((response) => response.json())
   .then((data) => {
   /*let counter = {};
   for (nominee of data) {
  if (counter[nominee.Nominee]) {
     counter[nominee.Nominee] += 1;
  } else {
     counter[nominee.Nominee] = 1;
  }
   };
   */
      //const entries = Object.entries(data);
      data.sort(function(a, b){return b[1] - a[1]});
      let output = "<table><tr><th>Nominee</th><th>Number of Times</th></tr>"
      for (const entry of data) {
      output = output + "<tr> <td>" + entry[0] +"</td> <td>" + entry[1] +"</td></tr>";
      document.getElementById("output").innerHTML = output + "</table>";
      }  
   });
}

/*

function newFunction() {
   fetch("oscars.json")
  .then((response) => response.json())
  .then((json) => (json.results)) {
     let nomineeArr = [];
     for (nominee of data)
    nomineeArr.push(nominee.Nominee);
     return nomineeArr;
  };
}
/*
 fetch("booker.json")
   .then((response) => response.json())
   .then((data) => {
   let output = "<table><tr><th>Author</th><th>Year</th><th>Title</th></tr>";
   for ( const winner of data )
  output = output + "<tr> <td>" + winner.author + "</td>" + "<td>" + winner.year + "</td>" + "<td>" + winner.title + "</td></tr>";
   document.getElementById("output").innerHTML = output + "</table>";
  });
}
*/