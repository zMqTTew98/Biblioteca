/**
 * @fileoverview Modulo che contiene funzioni di utilità per la gestione di una biblioteca, in particolare operazioni su catalogo, gestione utenti, prestiti e ricerche avanzate.
 * @author Matteo Giorgio
 */

"use strict"

/**
 * @description Funzione che gestisce e permette l'aggiunta di un libro al catalogo dei libri.
 * @param {Libro[]} catalogoLibri - Array che conterrà i libri del catalogo
 * @param {string} titolo         - Stringa che rappresenta il titolo del libro da inserire nel catalogo
 * @param {string} autore         - Stringa che rappresenta l'autore del libro da inserire nel catalogo
 * @param {string} genere         - Stringa che rappresenta il genere del libro da inserire nel catalogo
 * @param {Number} isbn           - Valore numerico che rappresenta l'isbn del libro da inserire nel catalogo
 * @returns {void}                  Non restituisce un valore, ma memorizza i singoli libri nell'array dei libri
 */
export function aggiungiLibro(catalogoLibri,titolo,autore,genere,isbn){
    if(!catalogoLibri.find(libro=>libro.isbn===isbn)){
        let libro={titolo: titolo, autore: autore, genere: genere, isbn: isbn, prestato: null};
        catalogoLibri.push(libro);
        console.log("Libro aggiunto con successo!");
    }else console.error("Errore! ISBN del libro non valido o riferito ad un altro titolo.")
}

/**
 * @description Funzione che permette di modificare una proprietà del libro dal titolo desiderato.
 * @param {Libro[]} catalogoLibri - Array che contiene i libri del catalogo
 * @param {string} titolo         - Stringa che rappresenta il titolo del libro da modificare
 * @param {string} chiave         - Stringa che rappresenta la proprietà da modificare del libro
 * @param {string} modifica       - Stringa che rappresenta il nuovo valore della proprietà desiderata
 * @returns {void}                  Non restituisce un valore, ma modifica i valori delle proprietà dei libri desiderati nell'array dei libri
 */
export function modificaLibro(catalogoLibri,titolo,chiave,modifica){
    let libro=catalogoLibri.find(libro=>libro.titolo===titolo);

    if(!libro){
        console.error("Errore! Libro non trovato.");
        return;
    }

    if(!(chiave in libro)){
        console.error("Errore! Chiave inserita non valida in quanto le proprietà modificabili sono titolo, autore, genere e ISBN");
        return;
    }

    if(chiave==="isbn"){
        let nuovoIsbn=Number(modifica);
        if(isNaN(nuovoIsbn)){
            console.error("Errore! L'ISBN deve essere necessariamente un valore numerico.");
            return;
        }

        if(catalogoLibri.find(libro=>libro.isbn===nuovoIsbn)){
            console.error("Errore! Il seguente ISBN è già associato ad un altro libro.");
            return;
        }
        libro[chiave]=nuovoIsbn;
    }else{
        libro[chiave]=modifica;
    }

    console.log(`Il libro "${titolo}" è stato aggiornato: ${chiave} modificato con successo.`);
}

/**
 * @description Funzione che permette di eliminare un libro dal catalogo dei libri.
 * @param {Libro[]} catalogoLibri - Array che contiene i libri del catalogo
 * @param {Number} isbn           - Valore numerico che rappresenta l'ISBN del libro da eliminare
 * @returns {void}                  Non restituisce un valore, ma aggiorna l'array dei libri eliminando il libro desiderato
 */
export function eliminaLibro(catalogoLibri,isbn){
    if(catalogoLibri.find(libro=>libro.isbn===isbn)){
        let index=catalogoLibri.findIndex(libro=>libro.isbn===isbn);
        catalogoLibri.splice(index,1);
        console.log("Libro eliminato con successo!");
    }else{
        console.error("Errore! Libro non trovato nel catalogo.");
    }
}

/**
 * @description Funzione che permette di stampare in modo formattato il catalogo dei libri.
 * @param {Libro[]} catalogoLibri - Array che contiene i libri del catalogo
 * @returns {void}                  Stampa il catalogo dei libri in modo formattato
 */
export function visualizzaCatalogo(catalogoLibri){
    if(catalogoLibri.length===0){
        console.log("Non sono presenti libri nel catalogo.");
        return;
    }

    let stato;

    console.log("Libri disponibili nel catalogo: ");
    for(let i=0;i<catalogoLibri.length;i++){
        if(!catalogoLibri[i].prestato) stato="✅ Disponibile";
        else stato="🚫 In prestito";
        
		console.log(`${i+1}. ${catalogoLibri[i].titolo} - ${catalogoLibri[i].autore} (${catalogoLibri[i].genere}) [ISBN: ${catalogoLibri[i].isbn}] - ${stato}`);
	}
}

/**
 * @description Funzione che permette la ricerca avanzata di un libro tramite il criterio e il valore da ricercare.
 * @param {Libro[]} catalogoLibri - Array che contiene i libri del catalogo
 * @param {string} criterio       - Stringa che rappresenta il criterio di ricerca avanzata
 * @param {string} valore         - Stringa che rappresenta il valore da ricercare in base al criterio
 * @returns {void}                  Stampa i libri del catalogo che rispettano il criterio e il valore di ricerca avanzata
 */
export function ricercaAvanzata(catalogoLibri,criterio,valore){
    let risultatiRicerca=catalogoLibri.filter(libro=>
        libro[criterio].toString().toLowerCase().includes(valore)
    );

    let stato;

    if(risultatiRicerca.length===0){
        console.log("Nessun risultato trovato.");
    }else{
        for(let i=0;i<risultatiRicerca.length;i++){
            if(!risultatiRicerca[i].prestato) stato="✅ Disponibile";
            else stato="🚫 In prestito";

            console.log(`${i+1}. ${risultatiRicerca[i].titolo} - ${risultatiRicerca[i].autore} (${risultatiRicerca[i].genere}) [ISBN: ${risultatiRicerca[i].isbn}] - ${stato}`);
        }
    }
}

/**
 * @description Funzione che gestisce e permette l'aggiunta di un utente alla lista.
 * @param {Utente[]} listaUtenti  - Array che conterrà gli utenti
 * @param {string} nomeUtente     - Stringa che rappresenta il nome utente dell'utente
 * @param {Number} idUtente       - Valore numerico che rappresenta l'ID dell'utente
 * @returns {void}                  Non restituisce un valore, ma memorizza i singoli utenti nell'array degli utenti
 */
export function aggiungiUtente(listaUtenti,nomeUtente,idUtente){
    if(!listaUtenti.find(utente=>utente.id===idUtente)){
        let nuovoUtente={nome: nomeUtente, id: idUtente, libriPrestati: []};
        listaUtenti.push(nuovoUtente);
        console.log("Utente aggiunto con successo!");
    }else{
        console.error("Errore! Questo ID già associato ad un altro utente.")
    }
}

/**
 * @description Funzione che gestisce e permette l'eliminazione di un utente attivo della lista.
 * @param {Utente[]} listaUtenti  - Array che contiene gli utenti attualmente attivi della lista
 * @param {Number} idUtente       - Valore numerico che rappresenta l'ID associato all'utente da rimuovere dalla lista
 * @returns {void}                  Non restituisce un valore, ma aggiorna l'array che contiene gli utenti eliminando quello desiderato
 */
export function eliminaUtente(prestiti,catalogoLibri,listaUtenti,idUtente){
    let utente=listaUtenti.find(utente=>utente.id===idUtente);
    
    if(!utente){
        console.error("Errore! Utente non trovato.");
        return;
    }
    
    //Modifica per evitare l'eliminazione dell'utente prima della restituzione dei libri effettuata per non bloccare i prestiti in modo permanente
    for(let isbn of utente.libriPrestati){
        let libro=catalogoLibri.find(libro=>libro.isbn===isbn);
        if(libro && libro.prestato && libro.prestato.utenteId===idUtente){
            libro.prestato=null;
           }
    
        const indexPrestito=prestiti.findIndex(prestito=>prestito.isbn===isbn && prestito.utenteId===idUtente);
        if(indexPrestito!==-1){
            prestiti.splice(indexPrestito,1);
        }
    }
    
    //Rimozione dell’utente dalla lista
    let indexUtente=listaUtenti.findIndex(utente=>utente.id===idUtente);
        if(indexUtente!==-1){
            listaUtenti.splice(indexUtente,1);
            console.log(`Utente ${utente.nome} eliminato.`);
        }
}

/**
 * @description Funzione che permette di stampare in modo formattato la lista degli utenti attualmente attivi.
 * @param {Utente[]} listaUtenti  - Array che contiene gli utenti attualmente attivi della lista
 * @returns {void}                  Stampa la lista degli utenti in modo formattato
 */
export function visualizzaUtenti(listaUtenti){
    if(listaUtenti.length===0){
        console.log("Non sono presenti utenti nella lista.");
        return;
    }

    console.log("Lista utenti: ")
    for(let i=0;i<listaUtenti.length;i++){
        console.log(`${i+1}. ${listaUtenti[i].nome} (ID: ${listaUtenti[i].id})`);
    }
}

/**
 * @description Funzione che gestisce e permette il prestito di un libro ad un utente attivo.
 * @param {Libro[]} catalogoLibri - Array che contiene i libri del catalogo
 * @param {Utente[]} listaUtenti  - Array che contiene gli utenti della lista
 * @param {Number} isbn           - Valore numerico che rappresenta l'ISBN del libro da prestare
 * @param {Number} idUtente       - Valore numerico che rappresenta l'ID associato all'utente al quale prestare il libro
 * @param {Prestito[]} prestiti   - Array che conterrà i prestiti dei libri
 * @returns {void}                  Non restituisce un valore, ma memorizza i singoli prestiti nell'array dei prestiti
 */
export function prestaLibro(catalogoLibri,listaUtenti,isbn,idUtente,prestiti){
    let libro=catalogoLibri.find(lib=>lib.isbn===isbn);

    if(libro===undefined){
        console.error("Errore! Libro non trovato nel catalogo.");
    }else{
        if(libro.prestato){
            console.log("Il libro è già in prestito.");
        }else{
            let utente=listaUtenti.find(utente=>utente.id===idUtente);

            if(utente!==undefined){
                libro.prestato={utenteId: idUtente};
                utente.libriPrestati.push(isbn);
                prestiti.push({titolo: libro.titolo, nomeUtente: utente.nome, isbn: isbn, utenteId: idUtente});
                console.log("Il libro "+libro.titolo+" è stato prestato all'utente "+utente.nome+".");
            }else{
                console.error("Errore! Utente non trovato.");
            }
        }
    }
}

/**
 * @description Funzione che permette di stampare in modo formattato la lista dei prestiti attualmente attivi.
 * @param {Prestito[]} prestiti   - Array che contiene i prestiti attualmente attivi
 * @returns {void}                  Stampa la lista dei prestiti in modo formattato
 */
export function visualizzaPrestiti(prestiti){
    console.log("Prestiti attualmente registrati: ");

    if(prestiti.length===0){
        console.log("Nessun prestito registrato.");
    }else{
        for(let i=0;i<prestiti.length;i++){
            console.log(`${i+1}. ${prestiti[i].titolo} [ISBN: ${prestiti[i].isbn}] prestato a ${prestiti[i].nomeUtente} (ID: ${prestiti[i].utenteId})`);
        }
    }
}

/**
 * @description Funzione che gestisce e permette la restituzione di un libro da parte di un utente attivo.
 * @param {Libro[]} catalogoLibri - Array che contiene i libri del catalogo
 * @param {Utente[]} listaUtenti  - Array che contiene gli utenti della lista
 * @param {Number} isbn           - Valore numerico che rappresenta l'ISBN del libro da restituire    
 * @param {Number} idUtente       - Valore numerico che rappresenta l'ID associato all'utente che restituisce il libro
 * @param {Prestito[]} prestiti   - Array che contiene i prestiti attualmente attivi
 * @returns {void}                  Non restituisce un valore, ma modifica lo stato dei dati passati come parametro
 */
export function restituisciLibro(catalogoLibri,listaUtenti,isbn,idUtente,prestiti){
    let libro=catalogoLibri.find(lib=>lib.isbn===isbn);
    let utente=listaUtenti.find(ut=>ut.id===idUtente);

    if(libro===undefined){
        console.error("Errore! Libro non trovato nel catalogo.");
    }else if(utente===undefined){
        console.error("Errore! Utente non trovato.");
    }else if(libro.prestato===null || libro.prestato.utenteId!==idUtente){
        console.error("Errore! Il libro non è stato prestato a questo utente.");
    }else{
        libro.prestato=null;

        let indexUtente=utente.libriPrestati.indexOf(isbn);
        if(indexUtente!==-1) {
            utente.libriPrestati.splice(indexUtente,1);
        }

        let indexPrestito=prestiti.findIndex(prestito=>prestito.isbn===isbn && prestito.utenteId===idUtente);
        if(indexPrestito!==-1){
            prestiti.splice(indexPrestito,1);
        }
        console.log(`Il libro "${libro.titolo}" è stato restituito da ${utente.nome}.`);
    }
}