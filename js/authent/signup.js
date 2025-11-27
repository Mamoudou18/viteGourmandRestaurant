const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputNumeroTel = document.getElementById("PhoneNumber");
const inputRue= document.getElementById("RueInput");
const inputPostal= document.getElementById("PostalInput");
const inputVille= document.getElementById("VilleInput")
const inputEmail= document.getElementById("EmailInput");
const btnInscription = document.getElementById("btn-validate-inscription");
const inputPasseword = document.getElementById("PassewordInput");
const inputConfirmPasseword = document.getElementById("ConfirmPasseword");

inputNom.addEventListener("keyup",validateForm);
inputPrenom.addEventListener("keyup",validateForm);
inputNumeroTel.addEventListener("keyup",validateForm);
inputRue.addEventListener("keyup",validateForm);
inputPostal.addEventListener("keyup",validateForm);
inputVille.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup",validateForm);
inputPasseword.addEventListener("keyup",validateForm);
inputConfirmPasseword.addEventListener("keyup",validateForm);


function validateForm(){
    const nomOK = validateRequired(inputNom);
    const prenomOK= validateRequired(inputPrenom);
    const numOK= validateNumTel(inputNumeroTel);
    const rueOK= validateRequired(inputRue);
    const postalOK= validateCodePostal(inputPostal);
    const villeOK= validateRequired(inputVille);
    const emailOK= validateEmail(inputEmail);
    const passewordOK = validatePasseword(inputPasseword);
    const confirmpassewordOK = validateConfirmPasseword(inputPasseword,inputConfirmPasseword);

    if(nomOK && prenomOK && numOK && rueOK && postalOK && villeOK && emailOK && passewordOK && confirmpassewordOK){
        btnInscription.disabled=false;
    }
    else{
        btnInscription.disabled=true;
    }
}
// Validation saisie Email

function validateEmail(input){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const EmailUser= input.value;

    if(EmailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }

}
// validation format numéro de téléphone saisie

function validateNumTel(input){
    const numRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const numUser= input.value;

    if(numUser.match(numRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }

}
// validation code postal
function validateCodePostal(input){
    const postalRegex = /^\d+$/;
    const postalUser= input.value;

    if(postalUser.match(postalRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// validation de sais des autres champs du formulaire (Nom, Prenom, Rue, Ville)
function validateRequired(input){
    if(input.value != ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//validation saisie passeword

function validatePasseword(input){
    const passewordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;
    const passewordUser= input.value;

    if(passewordUser.match(passewordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

//confirmation passeword

function validateConfirmPasseword(inputPWD,inputConfirmPWD){
    if(inputPWD.value==inputConfirmPWD.value){
        inputConfirmPWD.classList.add("is-valid");
        inputConfirmPWD.classList.remove("is-invalid");
        return true;
    }
    else{
        inputConfirmPWD.classList.remove("is-valid");
        inputConfirmPWD.classList.add("is-invalid");
        return false;
    }
}
