import Route from "./Route.mjs";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/signin", "Connxion", "/pages/signin.html"),
    new Route("/signup", "Inscription", "/pages/signup.html"),
];
    

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";