"use strict"

import * as utils from "./utils.js";
import PromptSync from "prompt-sync";
const input=PromptSync();

let catalogoLibri=[];
let listaUtenti=[];
let prestiti=[];

function main(){
    let scelta;
    let continua=true;

    while(continua){
        console.log("\n📚 Gestione Bibliteca 📚\n1. Aggiungi libro al catalogo\n2. Visualizza catalogo\n3. Ricerca avanzata\n4. Aggiungi utente\n5. Elimina utente\n6. Visualizza lista utenti\n7. Presta libro\n8. Visualizza prestiti\n9. Restituisci libro\n0. Uscita dal programma\n");
        scelta=input("------> ")
        switch(scelta){
            case "0":
                continua=false;
                console.log("♥ Uscita dal programma ♥");
                break;
            
            case "1":
                let titoloLibro=input("Inserisci il titolo del libro: ");
                let autoreLibro=input("Inserisci l'autore del libro: ");
                let genereLibro=input("Inserisci il genere del libro: ");
                let isbnLibro=Number(input("Inserisci l'ISBN del libro: "));
                utils.aggiungiLibro(catalogoLibri,titoloLibro,autoreLibro,genereLibro,isbnLibro);
                break;

            case "2":
                utils.visualizzaCatalogo(catalogoLibri);
                break;
            
            case "3":
                let criterioRicerca=input("Inserisci il criterio di ricerca (titolo/autore/genere/ISBN): ").toLowerCase();
                let valoreRicerca=input("Inserisci il valore da ricercare per "+criterioRicerca+": ").toLowerCase();
                utils.ricercaAvanzata(catalogoLibri,criterioRicerca,valoreRicerca);
                break;

            case "4":
                let nomeUtente=input("Inserisci il nome dell'utente: ");
                let idUtente=Number(input("Inserisci l'ID dell'utente: "));
                utils.aggiungiUtente(listaUtenti,nomeUtente,idUtente);
                break;

            case "5":
                let idUtenteEliminazione=Number(input("Inserisci l'ID dell'utente da eliminare: "));
                utils.eliminaUtente(listaUtenti,idUtenteEliminazione);
                break;

            case "6":
                utils.visualizzaUtenti(listaUtenti);
                break;

            case "7":
                let isbnPrestito=Number(input("Inserisci l'ISBN del libro da prestare: "));
                let idUtentePrestito=Number(input("Inserisci l'ID dell'utente che richiede il prestito: "));
                utils.prestaLibro(catalogoLibri,listaUtenti,isbnPrestito,idUtentePrestito,prestiti);
                break;

            case "8":
                utils.visualizzaPrestiti(prestiti);
                break;
            
            case "9":
                let isbnRestituzione=Number(input("Inserisci l'ISBN del libro da restituire: "));
                let idUtenteRestituzione=Number(input("Inserisci l'ID dell'utente che restituisce il libro: "));
                utils.restituisciLibro(catalogoLibri,listaUtenti,isbnRestituzione,idUtenteRestituzione,prestiti);
                break;

            default:
                console.error("Errore! Scelta non valida.");
                break;
        }
    }
}

main();