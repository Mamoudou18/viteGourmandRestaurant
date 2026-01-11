/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const signoutBtn = document.getElementById("btn-signout");
const tokenCookieName = "accessToken";
const RolecookieName = "role";

//Récup du bouton signout
signoutBtn.addEventListener("click",signout);

function getRole(){
    return getCookie(RolecookieName);
}

function setToken(token){
    setCookie(tokenCookieName, token, 7)
}

function getToken(){
    return getCookie(tokenCookieName);
}
//Gestion de la déconnexion :  cela consiste à. supprimer le cookie et reactulisé la passe
 function signout(){
    eraseCookie(tokenCookieName);
    eraseCookie(RolecookieName);
    window.location.reload();
 }

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected(){
    if(getToken()==null || getToken == undefined){
        return false;
    }
    else{
        return true;
    }
}

function showAndHideElementsforRoles(){
    const userConnected = isConnected();
    const userRole = getRole();

    let allElementsEdit = document.querySelectorAll('[data-show]');

    allElementsEdit.forEach(element => {
        switch(element.dataset.show){
            case 'disconnected':
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if(!userConnected || role != "admin"){
                    element.classList.add("d-none");
                }
                break;
            case 'employé':
                if(!userConnected || role != "employé"){
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if(!userConnected || role != "client"){
                    element.classList.add("d-none");
                }
                break;

        }})
}


window.addEventListener('load', () => {
    const slider = document.getElementById('price-slider');
    console.log('slider:', slider);
    console.log('noUiSlider:', typeof noUiSlider);

    if (slider && typeof noUiSlider === 'function') {
        noUiSlider.create(slider, {
            start: [10, 80],
            connect: true,
            range: { min: 0, max: 100 }
        });
        console.log('SLIDER FORCÉ CRÉÉ');
    }
});
