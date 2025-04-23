"use strict"

import * as utils from "./utils.js";
import PromptSync from "prompt-sync";
const input=PromptSync();

let catalogoLibri=[];
let utenti=[];
let prestiti=[];

function main(){
    let scelta;
    let continua=true;

    while(continua){
        console.log("\n--- Gestione Bibliteca ---\n1. Aggiungi libro al catalogo\n2. Visualizza catalogo\n3. Ricerca avanzata\n4. Aggiungi utente\n5. Presta libro\n6. Visualizza prestiti\n0. Uscita dal programma\n");
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
        }
    }
}

main();