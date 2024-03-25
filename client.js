window.onload = function() {
  document.getElementById("get-nominations").onclick = getNominations;
  document.getElementById("get-nominees").onclick = getNominees;
  }

function printBob() {
   document.getElementById("output").innerHTML = "Bob";
}

function getNominations() {
  fetch("oscars.json")
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

function testNominees() {
   const nominees = ["Meryl Streep", "Up", "Tony Stark", "Up", "Meryl Streep", "Up"];
   let count = {};
   for (el of nominees) {
  if (count[el]) {
     count[el] += 1;
  } else {
     count[el] = 1;
  }
   };
   const entries = Object.entries(count);
   let output = "<table><tr><th>Nominee</th><th>Number of Times</th></tr>"
   for (entry of entries)
  output = output +"<tr> <td>" + entry[0] + "</td> <td>" + entry[1] + "</td> </tr>"
   console.log(count);
   document.getElementById("output").innerHTML = output + "</table>";  
}

function getNominees() {
   fetch("oscars.json")
   .then((response) => response.json())
   .then((data) => {
   let counter = {};
   for (nominee of data) {
  if (counter[nominee.Nominee]) {
     counter[nominee.Nominee] += 1;
  } else {
     counter[nominee.Nominee] = 1;
  }
   };
   const entries = Object.entries(counter);
   entries.sort(function(a, b){return b[1] - a[1]});
   let output = "<table><tr><th>Nominee</th><th>Number of Times</th></tr>"
   for (const entry of entries) {
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