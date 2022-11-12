'use strict';

// Id to be used when communicating with parent window
var ID = 'plugin.registerBailiffUser';

window.onload = function(){
    window.addEventListener('message',function(e){
        if(e.origin!=window.location.origin){
            console.log(`WARNING: got message from unknown origin: ${e.origin}`);
            return;
        }
        
        let sender = e.data.sender;
        let role = e.data.role;
        let payload = e.data.payload;

        if('muvule.main'==sender){
            if('preLoadData'==role){
                let option;
                let select = document.querySelector('#registerBailifUserDiv [name=company]');
                payload.companyList.map(function(entry){
                    let option = document.createElement('option');
                    option.setAttribute('value',entry.companyId);
                    option.innerText = entry.name;
                    select.appendChild(option);
                })

                select = document.querySelector('#registerBailifUserDiv [name=role]');
                payload.roles.map(function(role){
                    let option = document.createElement('option');
                    option.setAttribute('value',role);
                    option.innerText = role;
                    select.appendChild(option);
                });

            }
        }

    })

}