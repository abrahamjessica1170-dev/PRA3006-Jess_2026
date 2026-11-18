const endpoint =  https://query.wikidata.org/sparql

//SPARQL query
const sharedGenesQeury = `
SELECT DISTINCT ?gene ?geneLabel WHERE {
  VALUES ?bcName { "breast cancer"@en "breast carcinoma"@en }
  VALUES ?ovName { "ovarian cancer"@en "ovarian neoplasm"@en "ovarian carcinoma"@en }
  ?bc rdfs:label ?bcName .
  ?ov rdfs:label ?ovName .
  { ?bc wdt:P2293 ?gene } UNION { ?gene wdt:P2293 ?bc }
  { ?ov wdt:P2293 ?gene } UNION { ?gene wdt:P2293 ?ov }
  ?gene wdt:P703 wd:Q15978631 .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?geneLabel
`;


// function that sends any query and returns results rows 
async function runQuery(sparql) {
    //Building web address ( endpoint +  query + ask for JSON)
    const url = endpoint + "?query=" + encodeURIComponent(sparql) + "&format=json";
    const response = await fetch(url);
    const data = await response.json();   //turns reply into js object 
    return data.results .bindings ;    //list of result rows    
}

//Function that turns rows into table rows on page 
function showGeneTable(rows){
    const tableBody= document.createElementById ("gene-table-body");
    for (const row of rows){
        const tr= document.createElement("tr");
        //Column 1: Gene name 
        const nameCell = document.createElement("td");
        nameCell.textContent = row.geneLabel.value;
        //Column 2: clickable Wikidata ID
        const linkCell = document.createElement("td");
        const link = document.createElement("a");
        link.textContent= row.gene.value.split("/").pop();
        link.target= "_blank";           //open in new tab
        linkCell.appendChild(link);

        tr.appendChild(nameCell);
        tr.appendChild(linkCell);
        tableBody.appendChild(tr);
     }
     document.getElementById("status"),textContent=
        rows.length + "shared genes found.";
    

// Venn diagram : load data 
async function loadVenn(){
    const status = document.getElementById("venn-status");

    try {
        const breastRows = await runQuery(breastGenesQuery);
        const ovarianRows = await runQuery(ovarianGenesQuery);

        //print data in console for inspection 
        console.log ("Breast rows:", breastRows);
        console.log("Ovarian rows:", ovarianRows)

        status.textContent = breastRows.length + "breast cancer genes and" +
                             ovarianRows.length + "ovarian cancer genes found.";
    } catch (error){
        status.textContent="Error:" +error.message;
        console.error(error);
    }
}




}
//Running it 
runQuery(sharedGenesQeury)
    .then(showGeneTable)
    .catch(function(error){
        document.getElementById("status").textContent= "Error:" + error.message;

    });

// Venn diagram : queries 
// All human genes linked to the breast cancer group 
const breastGeneQuery=`
SELECT DISTINCT ?gene ?geneLabel WHERE{
    VALUES ?name {"breast cancer"@en "breast carcinoma"@en}
    ?disease rdfs:label ?name .
    { ?disease wdt:P2293 ?gene} UNION {?gene wdt:P2293 ?disease}
    ?gene wdt:P703 wd:Q15978631 .
    SERVICE wikibase:label {bd: serviceParam wikibase:language "en" .}
}
`;

//All human genes linked to ovarian cancer group 
const ovairianGenesQuery= `
SELECT DISTINCT ?gene ?geneLabel WHERE {
 VALUES ?name { "ovarian cancer" @en "ovarian neoplasm"@en "ovarian carcinoma"@en }
 ?disease rdfs:label ?name 
 { ?disease wdt:P2293 ?gene} UNION {?gene wdt:P2293 ?disease}
  ?gene wdt:P703 wd:Q15978631 .
  SERVICE wikibase:label {bd:serviceParam wikibase:language "en" .}
}
`;

loadVenn();
