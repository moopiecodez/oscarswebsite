window.onload = function() {
  document.getElementById("get-nominations").onclick = getNominations;
  document.getElementById("get-nominees").onclick = getNominees;
  document.getElementById("clear-output").onclick = clearOutput;
  }

/*
  Validates the input in the form for requests submitted by pressing the
  Nominations button.
*/
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


// Clears the output
function clearOutput() {
   document.getElementById("output").innerHTML = "";
}

// Generates a URL with query string parameters for nominations button
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

// Generates a URL with query string parameters for nominees button
function getNomineeParams(form) {
   const params = new URLSearchParams({
      won: form.won.value,
      times: form.times.value
   });
   return params;
}

/* 
   Validates the input in the form and submits a request to the server to fetch
   the nominations. Renders the response in a table, with the number of results
   below.
*/
function getNominations() {
   if(!formValid(this.form)) {
      return false;
   };
   const params = getNominationParams(this.form);
   fetch("http://localhost:8080/nominations?" + params)
      .then((response) => response.json())
      .then((data) => {
         let output = "";
         if (data.hasOwnProperty("error")) {
            output = data.error;
         } else {
            output = "<table id=\"results\"><tr><th>Year</th><th>Category</th><th>Nominee</th><th>Info</th><th>Won?</th></tr>";
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
               output += "</table> <br> <p> The number of results is: " + rows + "</p";
         }
         document.getElementById("output").innerHTML = output;
      });
   }

   /*
      Validates the input in the form and submits a request to the server to
      fetch the nominees. Renders the response in a table.
   */
   function getNominees() {
   const params = getNomineeParams(this.form);
   fetch("http://localhost:8080/nominees?" + params)
      .then((response) => response.json())
      .then((data) => {
         let output = "";
         if (data.hasOwnProperty("error")) {
            output = data.error;
         } else {
            data.sort(function(a, b){return b[1] - a[1]});
            output = "<table><tr><th>Nominee</th><th>Number of Times</th></tr>";
            for (const entry of data) {
               output = output + "<tr> <td>" + entry[0] +"</td> <td>" + entry[1] +"</td></tr>";
            }  
            output += "</table>";
         }
         document.getElementById("output").innerHTML = output;
      });   
   }
