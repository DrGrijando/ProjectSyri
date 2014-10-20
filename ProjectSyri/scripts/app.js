(function (global) {
    var app = global.app = global.app || {};

    app.makeUrlAbsolute = function (url) {
            var anchorEl = document.createElement("a");
            anchorEl.href = url;
            return anchorEl.href;
        };

    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();
        
        // If there are no variables for counting the number of vaccines and prescriptions in the localStorage, they
        // are created. If they exist, they remain with their values (and won't be erased when exiting the app). This are used for giving sequential keys in order
        // to store them in the localStorage.
        
        // Set actual date in date inputs
        var d = new Date();
        document.getElementById("new-vaccine-date").value=d.toISOString().split("T")[0];
        document.getElementById("new-vaccine-time").value=d.getHours()+":"+d.getMinutes();
        document.getElementById("new-prescription-date").value=d.toISOString().split("T")[0];
        document.getElementById("new-phr-date").value=d.toISOString().split("T")[0];        
        
        if(localStorage.getItem("vaccines")==null)
        {
            //localStorage.setItem("vaccines","");
        }
        else
        {
            vaccines=localStorage.getItem("vaccines").split("+");
            
            for(var i=0;i<vaccines.length;i++)
            {
                vaccines[i]=JSON.parse(vaccines[i]);
                
                var newItem = document.createElement("div");
                newItem.id = vaccines[i].id;
                if(i % 2==0){
                    newItem.className="vaccine-entry-a"; 
                }
                else{
                    newItem.className="vaccine-entry-b"; 
                }                                  
                var info = document.createElement("div");
                info.innerHTML=vaccines[i].title;
                info.className='vaccine-title';
                newItem.appendChild(info);	// Add the TextNode to the ListItem                      
                
                info = document.createElement("div");
                info.innerHTML=vaccines[i].date+" "+vaccines[i].time;
                info.className='vaccine-date'
                newItem.appendChild(info);	// Add the TextNode to the ListItem
                
                newItem.onclick=viewDetailedVaccine
                
                document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List
            }
        }
        
        if(localStorage.getItem("prescriptions")==null)
        {
            //localStorage.setItem("prescriptions","");
        }
        else
        {
            prescriptions=localStorage.getItem("prescriptions").split("+");
            
            for(var j=0; j<prescriptions.length; j++)
            {
                prescriptions[j]=JSON.parse(prescriptions[j]);
                
                newItem = document.createElement("div");
                newItem.id = prescriptions[j].id;
                if(j % 2==0){
                    newItem.className="prescription-entry-a"; 
                }
                else{
                    newItem.className="prescription-entry-b"; 
                } 
                
                info = document.createElement("div");
                info.innerHTML=prescriptions[j].title;
                info.className='prescription-title';
                newItem.appendChild(info);	// Add the TextNode to the ListItem
                
                info = document.createElement("div");
                info.innerHTML=prescriptions[j].date;
                info.className='prescription-date';
                newItem.appendChild(info);	// Add the TextNode to the ListItem
                
                info = document.createElement("div");
                info.innerHTML=prescriptions[j].text;
                info.className='prescription-text';
                newItem.appendChild(info);	// Add the TextNode to the ListItem
                
                newItem.onclick=viewDetailedPrescription;
                
                document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List
            }
        }
        
        if(localStorage.getItem("record")==null)
        {
            //localStorage.setItem("record","");
        }
        else
        {
            record=localStorage.getItem("record").split("+");
            
            for(var k=0;k<record.length;k++)
            {
                record[k]=JSON.parse(record[k]);
                
                var newItem = document.createElement("div");
                var info;
                newItem.id = record[k].id;
                switch(record[k].type)
                {
                    case "vaccine":
                    if(k % 2==0){
                        newItem.className="vaccine-entry-a"; 
                    }
                    else{
                        newItem.className="vaccine-entry-b"; 
                    } 
                    info = document.createElement("div");
                    info.innerHTML=record[k].title;
                    info.className='vaccine-title';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem                      
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].date+" "+record[k].time;
                    info.className='vaccine-date'
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedRecordVaccine;
                    
                    document.getElementById("record-list").appendChild(newItem);	// Add the div to the specified List
                    break;
                    
                    case "prescription":
                    if(k % 2==0){
                        newItem.className="prescription-entry-a"; 
                    }
                    else{
                        newItem.className="prescription-entry-b"; 
                    }   
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].title;
                    info.className='prescription-title';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].date;
                    info.className='prescription-date';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].text;
                    info.className='prescription-text';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedRecordPrescription;
                    
                    document.getElementById("record-list").appendChild(newItem);	// Add the div to the specified List
                    break;
                    
                    case "phr":
                    newItem.className='phr-entry';   
                    info = document.createElement("div");
                    info.innerHTML=record[k].title;
                    info.className='phr-title';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem                      
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].date;
                    info.className='phr-date'
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    info.innerHTML=record[k].text;
                    info.className='phr-text'
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedPHR;
                    
                    document.getElementById("record-list").appendChild(newItem);	// Add the div to the specified List
                    
                    break;                   
                }
            }
        }
        if(localStorage.getItem("settings")==null)
        {
            localStorage.setItem("settings","true");
        }
        // window.plugin.notification.local is now available

        /*app.changeSkin = function (e) {
            var mobileSkin = "";

            if (e.sender.element.text() === "Flat") {
                e.sender.element.text("Native");
                mobileSkin = "flat";
            } else {
                e.sender.element.text("Flat");
                mobileSkin = "";
            }

            app.application.skin(mobileSkin);
        };*/

        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout", platform: "ios7" });
    }, false);
})(window);