var isVaccineTabSelected = true;

/* FUNCTIONS FOR ADDING A NEW VACCINE OR PRESCRIPTION (UNIFIED) */

function activateVaccines(){
    isVaccineTabSelected = true;
}

function activatePrescriptions(){
    isVaccineTabSelected = false;
}

function addElement(){
    var auxString;
    var newItem = document.createElement("LI"); // The element type to create must be on capital letters
    
    if(isVaccineTabSelected == true)
    {
        auxString = document.getElementById("new-vaccine-title").value;
    }
    else    
    {
        auxString = document.getElementById("new-prescription-title").value;
    }    
    
    var newTextNode = document.createTextNode(auxString);
    newItem.appendChild(newTextNode);	// Add the TextNode to the ListItem
    
    if(isVaccineTabSelected == true)
    {
        document.getElementById("vaccine-list").appendChild(newItem);	// Add the ListItem to the specified List
    }
    else    
    {
        document.getElementById("prescription-list").appendChild(newItem);	// Add the ListItem to the specified List   
    }
    goBack();
}

/* FUNCTIONS FOR ADDING A NEW VACCINE OR PRESCRIPTION (SEPARATED) */

function addVaccine(){
    var newItem = document.createElement("LI"); // The element type to create must be on capital letters      
    var newTextNode = document.createTextNode(document.getElementById("new-vaccine-title").value);
    newItem.appendChild(newTextNode);	// Add the TextNode to the ListItem
    document.getElementById("vaccine-list").appendChild(newItem);	// Add the ListItem to the specified List
    goBack();
}

function addPrescription(){
    var newItem = document.createElement("LI"); // The element type to create must be on capital letters    
    var newTextNode = document.createTextNode(document.getElementById("new-prescription-title").value);
    newItem.appendChild(newTextNode);	// Add the TextNode to the ListItem
    document.getElementById("prescription-list").appendChild(newItem);	// Add the ListItem to the specified List   
    goBack();
}

function goBack(){
    window.history.go(-1);
}

