function addVaccine(){
    var auxString = document.getElementById("new-vaccine-title").value;
    var newItem = document.createElement("LI"); // The element type to create must be on capital letters
    var newTextNode = document.createTextNode(auxString);
    newItem.appendChild(newTextNode);	// Add the TextNode to the ListItem
    document.getElementById("vaccine-list").appendChild(newItem);	// Add the ListItem to the specified List
    goBack();
}

function goBack(){
    window.history.go(-1);
}
/*function getTitle(){
    auxString = document.getElementById('new-vaccine-title').value;
}*/