import Route from "./Route.mjs";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/signin", "Connxion", "/pages/authent/signin.html"),
    new Route("/signup", "Inscription", "/pages/authent/signup.html"),
    new Route("/initPasseword", "Initialisation de mot de passe", "/pages/authent/initPasseword.html"),
    new Route("/contact", "Contact", "/pages/contact.html"),

];
    

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";