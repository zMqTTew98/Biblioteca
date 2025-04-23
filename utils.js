"use strict"

export function aggiungiLibro(catalogoLibri,titolo,autore,genere,isbn){
    if(!catalogoLibri.find(libro=>libro.isbn===isbn)){
        let libro={titolo: titolo, autore: autore, genere: genere, isbn: isbn};
        catalogoLibri.push(libro);
        console.log("Libro aggiunto con successo!");
    }else console.error("Errore! ISBN del libro non valido o riferito ad un altro titolo.")
}

export function visualizzaCatalogo(catalogoLibri){
    if(catalogoLibri.length===0){
        console.log("Non sono presenti libri nel catalogo.");
        return;
    }

    console.log("Libri disponibili nel catalogo: ");
    for(let i=0;i<catalogoLibri.length;i++){
		console.log(`Libro ${i+1}: ${catalogoLibri[i].titolo} - ${catalogoLibri[i].autore} (${catalogoLibri[i].genere}) [ISBN: ${catalogoLibri[i].isbn}]`);
	}
}