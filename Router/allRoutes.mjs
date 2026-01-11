import Route from "./Route.mjs";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/signin", "Connxion", "/pages/authent/signin.html", ["disconnected"], "/js/authent/signin.js"),
    new Route("/signup", "Inscription", "/pages/authent/signup.html", ["disconnected"], "/js/authent/signup.js"),
    new Route("/initPasseword", "Initialisation de mot de passe", "/pages/authent/initPasseword.html", ["disconnected"]),
    new Route("/contact", "Contact", "/pages/contact.html", []),
    new Route("/menu", "MenuGlobal", "/pages/menu.html", [],"/js/menu/filtre.js"),

];
    

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";