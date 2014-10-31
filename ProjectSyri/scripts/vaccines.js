function addNewVaccine()
{
    currentElementList = "vaccine-list";
    var title = document.getElementById("new-vaccine-title").value;
    var date = document.getElementById("new-vaccine-date").value;
    var time = document.getElementById("new-vaccine-time").value;
    
    if (title == "" || date == "" || time == "") {
        if(title == ""){ highlightInputError("new-vaccine-title"); }
        if(date == ""){ highlightInputError("new-vaccine-date"); }
        if(time == ""){ highlightInputError("new-vaccine-time"); }        
        if(time == ""){ highlightInputError("new-vaccine-time"); }
        if(document.getElementById("new-vaccine-notification-time").value == ""){ highlightInputError("new-vaccine-notification-time"); }        
        alert("Enter all the information before saving the data.");
    } else {
        var newItem = document.createElement("div");
        var vid = title.substring(0, 3).concat(date).replace(/-| /g, '');
        newItem.id = vid;        
        if (vaccines.length % 2 == 0) {
            newItem.className = "vaccine-entry-a"; 
        } else {
            newItem.className = "vaccine-entry-b"; 
        }                  
        
        var info = document.createElement("div");
        info.innerHTML = title;
        info.className = 'vaccine-title';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        info = document.createElement("div");
        info.innerHTML = date + " " + time;
        info.className = 'vaccine-date';
        newItem.appendChild(info);	// Add the TextNode to the ListItem
        
        newItem.onclick = viewDetailedVaccine;
                
        document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List        
        
        // Set the notification for this vaccine
        /*
        var msg = "Vaccine for "+title+" at "+time;
        var year=date.split("-")[0],
        month=(date.split("-")[1])-1,
        day=date.split("-")[2];
        var hours, minutes;
        if(document.getElementById("new-vaccine-notification-time-measure").value=="minute")
        {
        hours=time.split(":")[0];
        minutes=(time.split(":")[1])-(document.getElementById("new-vaccine-notification-time").value);
        }
        else
        {
        hours=time.split(":")[0]-(document.getElementById("new-vaccine-notification-time").value);
        minutes=time.split(":")[1];            
        }        
        
        d = new Date(year,month,day,hours,minutes);
        window.plugin.notification.local.add({
        id : vid,
        title : "Vaccination today",
        message : msg,
        date : d,
        sound : "TYPE_NOTIFICATION"
        });
        */
        // Store the new vaccine in the localStorage        
        var vaccineToStore = {"title":title,"date":date,"time":time,"vid":vid,"type":"vaccine"}
        vaccines.push(vaccineToStore);
        sortByDate(vaccines);
        saveToLocalStorage(vaccines);
        updateVaccineList();
        
        // Save the info for later POST request
        var req = {
            url : "http://localhost:3000/Vaccine",
            reqType : "post",
            entry : vaccineToStore
        };        
        requests.push(req);
        saveToLocalStorage(requests,"requests");
        document.getElementById("cloud-button-number").innerHTML = requests.length;
        //document.getElementById("cloud-button").setAttribute("data-icon","cloud");
        goBack();
        
        // Reset the inputs
        d = new Date();
        document.getElementById("new-vaccine-title").value = "";
        document.getElementById("new-vaccine-date").value = d.toISOString().split("T")[0];
        document.getElementById("new-vaccine-time").value = d.getHours() + ":" + d.getMinutes();
    }    
}

function viewDetailedVaccine()
{
    currentElementList = window.event.srcElement.parentElement.parentElement.id;    
    for (var i = 0;i < vaccines.length;i++) {
        //var v=JSON.parse(vaccines[i]);
        if (vaccines[i].vid == window.event.srcElement.parentElement.id) {
            document.getElementById("detailed-vaccine-title").value = vaccines[i].title;
            document.getElementById("detailed-vaccine-date").value = vaccines[i].date;
            document.getElementById("detailed-vaccine-time").value = vaccines[i].time;
            currentElementID = vaccines[i].vid;
            break;
        }
    }     
    document.location.href = "#detailed-vaccine-view";    
}

function updateVaccineList()
{    
    emptyList(document.getElementById("vaccine-list"));
    for (var i = 0;i < vaccines.length;i++) 
    {        
        var newItem = document.createElement("div");
        newItem.id = vaccines[i].vid;        
        if (i % 2 == 0) {
            newItem.className = "vaccine-entry-a"; 
        } else {
            newItem.className = "vaccine-entry-b"; 
        }                         
        var info = document.createElement("div");
        info.innerHTML = vaccines[i].title
        info.className = 'vaccine-title';
        newItem.appendChild(info);  // Add the TextNode to the ListItem                      
        
        info = document.createElement("div");
        info.innerHTML = vaccines[i].date + " " + vaccines[i].time;
        info.className = 'vaccine-date';
        newItem.appendChild(info);  // Add the TextNode to the ListItem
        
        newItem.onclick = viewDetailedVaccine
        
        document.getElementById("vaccine-list").appendChild(newItem);   // Add the div to the specified List
    }
}

function moveToVaccines()
{
    var i = 0;
    while (i < record.length) {
        if (currentElementID == record[i].vid) {
            vaccines.push(record[i]);                
            record.splice(i, 1);
            break;
        }
        i++;
    }
    sortByDate(vaccines);
    saveToLocalStorage(vaccines, "vaccine-list");
    saveToLocalStorage(record, "record-list");
    updateVaccineList();
    updateRecordList();
    goBack()
}