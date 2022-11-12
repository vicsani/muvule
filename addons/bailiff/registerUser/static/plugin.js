'use strict';

// Id to be used when communicating with parent window
var ID = 'plugin.registerBailiffUser';

function captureProfilePic(){
    window.parent.postMessage({sender:`${ID}.caputureImage`, command:'capturePic'}, window.location.origin);
}

function postData(){
    let payload = {};

    [...document.querySelectorAll('#registerBailifUserDiv input')].map(function(input){
        payload[input.getAttribute('name')] = input.value;
    });

    [...document.querySelectorAll('#registerBailifUserDiv select')].map(function(input){
        payload[input.getAttribute('name')] = input.value;
    });

    payload.picB64Data = document.querySelector('#registerBailifUserDiv [name=pic]').b64Data;

    window.parent.postMessage({sender:ID, payload:payload}, window.location.origin);

}

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

            }else if('imgData'==role){
                let img = document.querySelector('#registerBailifUserDiv [name=pic]');
                img.src = payload.b64Data;
                img.b64Data = payload.b64Data;
            }
        }

    })

    document.querySelector('#registerBailifUserDiv [name=postButton]').addEventListener('click',postData);
    document.querySelector('#registerBailifUserDiv [name=pic]').addEventListener('click',captureProfilePic);

}