/**
 * @fileoverview Interfaccia principale per la gestione della biblioteca tramite menu CLI, che consente di amministare e gestire in modo semplice ed efficace il catalogo dei libri, gli utenti e i prestiti.
 * @author Matteo Giorgio 
 */

"use strict"

import * as utils from "./utils.js";
import PromptSync from "prompt-sync";
const input=PromptSync();

/**
 * @description Catalogo dei libri
 * @type {Libro[]}
 */
let catalogoLibri=[];

/**
 * @description Lista degli utenti registrati
 * @type {Utente[]}
 */
let listaUtenti=[];

/**
 * @description Lista dei prestiti attivi
 * @type {Prestito[]}
 */
let prestiti=[];

/**
 * @description Funzione principale che gestisce il ciclo interattivo del menu utente tramite l'utilizzo di un ciclo `while` che mantiene il programma attivo fino alla scelta di uscita.
 */
function main(){
    let scelta;
    let continua=true;

    while(continua){
        console.log("\n📚 Gestione Bibliteca 📚\n1. Aggiungi libro al catalogo\n2. Modifica libro\n3.Elimina libro\n4. Visualizza catalogo\n5. Ricerca avanzata\n6. Aggiungi utente\n7. Elimina utente\n8. Visualizza lista utenti\n9. Presta libro\n10. Visualizza prestiti\n11. Restituisci libro\n0. Uscita dal programma\n");
        scelta=input("------> ")
        switch(scelta){
            case "0":
                continua=false;
                console.log("♥ Uscita dal programma ♥");
                break;
            
            case "1":
                /**
                 * @type {string}
                 */
                let titoloLibro=input("Inserisci il titolo del libro: ");

                /**
                 * @type {string}
                 */
                let autoreLibro=input("Inserisci l'autore del libro: ");

                /**
                 * @type {string}
                 */
                let genereLibro=input("Inserisci il genere del libro: ");

                /**
                 * @type {Number}
                 */
                let isbnLibro=Number(input("Inserisci l'ISBN del libro: "));
                utils.aggiungiLibro(catalogoLibri,titoloLibro,autoreLibro,genereLibro,isbnLibro);
                break;

            case "2":
                /**
                 * @type {string}
                 */
                let titoloLibroModifica=input("Inserisci il titolo del libro da modificare: ");

                /**
                 * @type {string}
                 */
                let chiaveModifica=input("Inserisci la proprietà da modificare: ").toLowerCase();

                /**
                 * @type {string}
                 */
                let valoreModifica=input("Inserisci il nuovo valore da assegnare: ").toLowerCase();
                utils.modificaLibro(catalogoLibri,titoloLibroModifica,chiaveModifica,valoreModifica);
                break;

            case "3":
                /**
                 * @type {Number}
                 */
                let isbnEliminazione=Number(input("Inserisci l'ISBN del libro da eliminare: "));
                utils.eliminaLibro(catalogoLibri,isbnEliminazione);
                break;

            case "4":
                utils.visualizzaCatalogo(catalogoLibri);
                break;
            
            case "5":
                /**
                 * @type {string}
                 */
                let criterioRicerca=input("Inserisci il criterio di ricerca (titolo/autore/genere/ISBN): ").toLowerCase();

                /**
                 * @type {string}
                 */
                let valoreRicerca=input("Inserisci il valore da ricercare per "+criterioRicerca+": ").toLowerCase();
                utils.ricercaAvanzata(catalogoLibri,criterioRicerca,valoreRicerca);
                break;

            case "6":
                /**
                 * @type {string}
                 */
                let nomeUtente=input("Inserisci il nome dell'utente: ");

                /**
                 * @type {Number}
                 */
                let idUtente=Number(input("Inserisci l'ID dell'utente: "));
                utils.aggiungiUtente(listaUtenti,nomeUtente,idUtente);
                break;

            case "7":
                /**
                 * @type {Number}
                 */
                let idUtenteEliminazione=Number(input("Inserisci l'ID dell'utente da eliminare: "));
                utils.eliminaUtente(listaUtenti,idUtenteEliminazione);
                break;

            case "8":
                utils.visualizzaUtenti(listaUtenti);
                break;

            case "9":
                /**
                 * @type {Number}
                 */
                let isbnPrestito=Number(input("Inserisci l'ISBN del libro da prestare: "));

                /**
                 * @type {Number}
                 */
                let idUtentePrestito=Number(input("Inserisci l'ID dell'utente che richiede il prestito: "));
                utils.prestaLibro(catalogoLibri,listaUtenti,isbnPrestito,idUtentePrestito,prestiti);
                break;

            case "10":
                utils.visualizzaPrestiti(prestiti);
                break;
            
            case "11":
                /**
                 * @type {Number}
                 */
                let isbnRestituzione=Number(input("Inserisci l'ISBN del libro da restituire: "));

                /**
                 * @type {Number}
                 */
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