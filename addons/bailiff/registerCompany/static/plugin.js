'use strict';

// Id to be used when communicating with parent window
var ID = 'plugin.registerBailiffCompany';

function register(){
    let payload={};
    [...document.querySelectorAll('#registerCompanyDiv input')].map(function(input){
        payload[input.getAttribute('name')] = input.value;
    });

    window.parent.postMessage({sender:ID,payload:payload},window.location.origin);
}

/* ------------------------------------------------------------ */
window.onload = function(){
    document.querySelector('#registerCompanyDiv [name=registerCompany]').addEventListener('click',register);
}