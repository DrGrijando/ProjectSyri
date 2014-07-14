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
    var title= document.getElementById("new-vaccine-title").value;
    var date = document.getElementById("new-vaccine-date").value;
    if(title=="" || date=="")
    {
        alert("Enter all the information before saving the data.");
    }
    else
    {
        var newItem = document.createElement("div");
        newItem.id = 'newdiv';
        newItem.className='vaccine-entry';    
        
        var info = document.createElement("div");
        info.innerHTML=title;
        info.className='vaccine-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML=date;
        info.className='vaccine-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List
        goBack();
    }    
}

function addNewPrescription(){
    var newItem = document.createElement("div");
    newItem.id = 'newdiv';
    newItem.className='prescription-entry';
        
    var info = document.createElement("div");
    info.innerHTML=document.getElementById("new-prescription-title").value;
    info.className='prescription-title';
    newItem.appendChild(info);	// Add the TextNode to the ListItem
    
    info = document.createElement("div");
    info.innerHTML=document.getElementById("new-prescription-text").value;
    info.className='prescription-text';
    newItem.appendChild(info);	// Add the TextNode to the ListItem
    
    document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List   
    goBack();
}

function goBack(){
    window.history.go(-1);
}

