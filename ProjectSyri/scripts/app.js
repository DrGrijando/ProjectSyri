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
        
        if(localStorage.getItem("vaccineCount")==null)
        {
            localStorage.setItem("vaccineCount",0);
        }
        else if(localStorage.getItem("vaccineCount")!=0)
        {
            for(var i=0; i<localStorage.length; i++)
            {
                if((localStorage.key(i).indexOf("vaccine") > -1)&&(localStorage.key(i)!="vaccineCount"))
                {
                    var ebj=localStorage.getItem(localStorage.key(i));
                    var obj=JSON.parse(localStorage.getItem(localStorage.key(i)));
                    
                    var newItem = document.createElement("div");
                    newItem.id = 'newdiv';            
                    newItem.className='vaccine-entry';    
                    
                    var info = document.createElement("div");
                    info.innerHTML=obj.title;
                    info.className='vaccine-title';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem                      
                    
                    info = document.createElement("div");
                    info.innerHTML=obj.date;
                    info.className='vaccine-date';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedVaccine;
                    
                    document.getElementById("vaccine-list").appendChild(newItem);	// Add the div to the specified List                
                }
            }
        }
        
        if(localStorage.getItem("prescriptionCount")==null)
        {
            localStorage.setItem("prescriptionCount",0);
        }
        else if(localStorage.getItem("prescriptionCount")!=0)
        {
            for(var j=0; j<localStorage.length; j++)
            {
                if((localStorage.key(j).indexOf("prescription") > -1)&&(localStorage.key(j)!="prescriptionCount"))
                {
                    obj=JSON.parse(localStorage.getItem(localStorage.key(j)));
                    
                    newItem = document.createElement("div");
                    newItem.id = 'newdiv';
                    newItem.className='prescription-entry';
                    
                    info = document.createElement("div");
                    info.innerHTML=obj.title;
                    info.className='prescription-title';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    info.innerHTML=obj.date;
                    info.className='prescription-date';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    info = document.createElement("div");
                    info.innerHTML=obj.text;
                    info.className='prescription-text';
                    newItem.appendChild(info);	// Add the TextNode to the ListItem
                    
                    newItem.onclick=viewDetailedPrescription;
                    
                    document.getElementById("prescription-list").appendChild(newItem);	// Add the div to the specified List
                }
            }
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

        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
    }, false);
})(window);