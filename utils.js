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