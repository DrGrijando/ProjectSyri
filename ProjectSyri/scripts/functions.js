var isVaccineTabSelected = true;

/* FUNCTIONS FOR ADDING A NEW VACCINE OR PRESCRIPTION (UNIFIED) (NOT USED AT THIS MOMENT) */

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

function addNewVaccine(){
    var newItem = document.createElement("div");
    newItem.id = 'newdiv';
    newItem.className='divider';    
    
    var info = document.createElement("div");
    info.innerHTML=document.getElementById("new-vaccine-title").value;
    newItem.appendChild(info);	// Add the TextNode to the ListItem
    
    info = document.createElement("div");
    var date = new Date();
    date = document.getElementById("new-vaccine-date").value;
    info.innerHTML=date.toString();
    newItem.appendChild(info);	// Add the TextNode to the ListItem
    
    document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List   
    goBack();
}

function addNewPrescription(){
    var newItem = document.createElement("div");
    newItem.id = 'newdiv';
    newItem.className='divider';
        
    var info = document.createElement("div");
    info.innerHTML=document.getElementById("new-prescription-title").value;
    newItem.appendChild(info);	// Add the TextNode to the ListItem
    
    info = document.createElement("div");
    info.innerHTML=document.getElementById("new-prescription-text").value;
    newItem.appendChild(info);	// Add the TextNode to the ListItem
    
    document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List   
    goBack();
}

function goBack(){
    window.history.go(-1);
}

