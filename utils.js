"use strict"

export function aggiungiLibro(catalogoLibri,titolo,autore,genere,isbn){
    if(!catalogoLibri.find(libro=>libro.isbn===isbn)){
        let libro={titolo: titolo, autore: autore, genere: genere, isbn: isbn, prestato: false};
        catalogoLibri.push(libro);
        console.log("Libro aggiunto con successo!");
    }else console.error("Errore! ISBN del libro non valido o riferito ad un altro titolo.")
}

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

export function aggiungiUtente(listaUtenti,nomeUtente,idUtente){
    if(!listaUtenti.find(utente=>utente.id===idUtente)){
        let nuovoUtente={nome: nomeUtente, id: idUtente, libriPrestati: []};
        listaUtenti.push(nuovoUtente);
        console.log("Utente aggiunto con successo!");
    }else{
        console.error("Errore! Questo ID già associato ad un altro utente.")
    }
}

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

export function restituisciLibro(catalogoLibri,listaUtenti,isbn,idUtente,prestiti){
    let libro=catalogoLibri.find(lib=>lib.isbn===isbn);
    let utente=listaUtenti.find(ut=>ut.id===idUtente);

    if(libro===undefined){
        console.error("Errore! Libro non trovato nel catalogo.");
    }else if(utente===undefined){
        console.error("Errore! Utente non trovato.");
    }else if(!libro.prestato || libro.prestato.utenteId!==idUtente){
        console.error("Errore! Il libro non è stato prestato a questo utente.");
    }else{
        libro.prestato=false;

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