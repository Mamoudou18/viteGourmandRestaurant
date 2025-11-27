/* eslint-disable no-undef */
const Emailinput = document.getElementById("EmailInput");
const passewordInput = document.getElementById("PassewordInput");
const connexionInput = document.getElementById("btnSignin");

connexionInput.addEventListener("click",checkConnexion);
function checkConnexion(){
    // ici sera appelé le vrai Api
    if(Emailinput.value=="moudmambt1992@gmail.com" && passewordInput.value=="123")
    {
        //ici sera généré le vrai token 

        const token = "zkkaknxnckbdMLKNÙFspil=IBFLMoilfOPmpilfpbvlpvpisdk";
        setToken(token);
        setCookie(RolecookieName,"admin",7);
        //palcer ce token cookie

        window.location.replace("/");
    }
    else{
        Emailinput.classList.add("is-invalid");
        passewordInput.classList.add("is-invalid");
    }
}