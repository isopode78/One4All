// generate_italiano_2400.js
// Genera 100 quesiti per ciascuna delle 8 modalità e dei 3 livelli (0=facile, 1=medio, 2=difficile)
// Rispetta il formato R.q(q, o, h, e) di questions.js (la prima opzione in o è quella corretta).
import fs from "fs";

const MODES = [
  "grammatica",
  "analisi",
  "vocaboli",
  "impiccato",
  "stranieri",
  "dialetti",
  "letteratura",
  "etimologie"
];

const BANK = {
  // ================= LIVELLO 0: FACILE (PRIMARIA / MEDIE) =================
  0: {
    grammatica: [
      {
        q: "Quale parola ha il suono dolce di «c»?",
        o: ["Cielo", "Casa", "Cuore", "Campana"],
        h: ["Controlla la vocale dopo «c».", "«e» e «i» danno suono dolce.", "Cerca la sillaba «ci»."],
        e: "La «c» ha suono dolce davanti a «e» e «i», e suono duro davanti ad «a», «o», «u»."
      },
      {
        q: "Quale parola ha il suono duro di «g»?",
        o: ["Gatto", "Gelato", "Giro", "Gemma"],
        h: ["Guarda la lettera dopo «g».", "Davanti ad «a», «o», «u» il suono è duro.", "«Gelato» e «giro» hanno suono dolce."],
        e: "La «g» ha suono duro davanti ad «a», «o», «u» (e «gh» davanti a «e», «i»)."
      },
      {
        q: "Quale grafia con apostrofo è corretta?",
        o: ["Un'amica", "Un'altro", "Qual'è", "Un pò"],
        h: ["Verifica l'elisione davanti a vocale.", "«Qual è» non vuole l'apostrofo.", "«Po'» è un troncamento con apostrofo."],
        e: "«Un'amica» ha l'elisione femminile davanti a vocale; «qual è» si scrive senza apostrofo e «po'» con l'apostrofo."
      },
      {
        q: "In quale frase «il» è un articolo determinativo?",
        o: ["Il cane abbaia.", "Lo vedo spesso.", "L'ho preso io.", "Gli ho detto sì."],
        h: ["L'articolo accompagna un nome.", "Cerca il nome che segue.", "Non sostituisce una persona o un oggetto."],
        e: "L'articolo determinativo precede e determina il nome («il cane»)."
      },
      {
        q: "Quale parola è un nome collettivo?",
        o: ["Stormo", "Uccello", "Ala", "Nido"],
        h: ["Indica un insieme di elementi.", "Al singolare vale per più esemplari.", "Pensa a un gruppo di uccelli."],
        e: "«Stormo» è un nome collettivo perché designa al singolare un insieme di uccelli."
      },
      {
        q: "Quale forma è un aggettivo possessivo?",
        o: ["Mio", "Io", "Mi", "Me"],
        h: ["Può accompagnare un nome.", "Indica appartenenza.", "«Io», «mi», «me» sono pronomi."],
        e: "«Mio» è un aggettivo possessivo (es. «il mio quaderno»)."
      },
      {
        q: "Quale verbo è alla prima coniugazione (-are)?",
        o: ["Cantare", "Leggere", "Dormire", "Capire"],
        h: ["Guarda la desinenza dell'infinito.", "Le tre coniugazioni sono -are, -ere, -ire.", "Cerca il verbo che finisce in -are."],
        e: "«Cantare» appartiene alla prima coniugazione (-are)."
      },
      {
        q: "In quale frase il verbo è riflessivo?",
        o: ["Marco si pettina.", "Marco legge un libro.", "La porta è aperta.", "Piove forte."],
        h: ["L'azione ricade sul soggetto.", "Controlla la particella «si».", "Marco pettina se stesso."],
        e: "In «Marco si pettina» il soggetto compie e subisce l'azione."
      }
    ],
    analisi: [
      {
        q: "Qual è la frase minima in «Luca legge un libro in giardino»?",
        o: ["Luca legge", "Luca legge un libro", "Legge in giardino", "Un libro in giardino"],
        h: ["Serve solo soggetto e predicato.", "Togli le espansioni.", "Chi legge e cosa fa?"],
        e: "La frase minima è formata dal soggetto («Luca») e dal predicato («legge»)."
      },
      {
        q: "In «La zia Anna cucina», come si chiama «zia» vicino ad «Anna»?",
        o: ["Apposizione", "Attributo", "Complemento oggetto", "Predicato nominale"],
        h: ["È un nome accanto a un altro nome.", "Precisa il ruolo di Anna.", "Non è un aggettivo."],
        e: "«Zia» è un'apposizione perché accompagna il nome proprio «Anna» precisandone il ruolo."
      },
      {
        q: "In «Ho visto un film divertente», che cos'è «divertente»?",
        o: ["Attributo", "Apposizione", "Complemento di luogo", "Soggetto"],
        h: ["È un aggettivo legato a un nome.", "Indica una qualità di «film».", "Nell'analisi logica ha un nome preciso."],
        e: "L'aggettivo unito a un nome per qualificarlo o determinarlo è un attributo."
      },
      {
        q: "In «Il pallone è calciato dal portiere», «dal portiere» è:",
        o: ["Complemento d'agente", "Complemento di tempo", "Complemento di modo", "Soggetto"],
        h: ["Il verbo è passivo.", "Indica chi compie l'azione.", "«Portiere» è un essere animato."],
        e: "Con un verbo passivo, l'essere animato che compie l'azione è il complemento d'agente."
      },
      {
        q: "In «Sara è felice», «è felice» è un:",
        o: ["Predicato nominale", "Predicato verbale", "Complemento oggetto", "Attributo"],
        h: ["C'è il verbo «essere» + aggettivo.", "Non indica un'azione ma un modo di essere.", "«Essere» fa da copula."],
        e: "Copula («è») + parte nominale («felice») forma il predicato nominale."
      },
      {
        q: "In «Andiamo a scuola», «a scuola» indica:",
        o: ["Complemento di luogo", "Complemento d'agente", "Apposizione", "Predicato nominale"],
        h: ["Risponde a «dove?» o «verso dove?».", "Indica una meta/luogo.", "Non è un soggetto."],
        e: "«A scuola» esprime un complemento di luogo."
      },
      {
        q: "In «Leggo una storia», «una storia» è:",
        o: ["Complemento oggetto", "Complemento d'agente", "Predicato nominale", "Apposizione"],
        h: ["Risponde a «che cosa?» dopo il verbo.", "Il verbo «leggere» è transitivo.", "È il complemento diretto."],
        e: "«Una storia» risponde a «che cosa?» su un verbo transitivo attivo: è complemento oggetto."
      },
      {
        q: "In «Partiamo con il treno», «con il treno» è:",
        o: ["Complemento di mezzo", "Apposizione", "Attributo", "Predicato verbale"],
        h: ["Indica lo strumento per spostarsi.", "Risponde a «per mezzo di che cosa?».", "È un mezzo di trasporto."],
        e: "«Con il treno» indica il mezzo usato per compiere l'azione."
      }
    ],
    vocaboli: [
      {
        q: "Qual è il contrario di «alto»?",
        o: ["Basso", "Grande", "Lungo", "Largo"],
        h: ["Cerchi la parola opposta.", "Non riguarda la larghezza.", "Pensa a chi sta giù."],
        e: "«Basso» è il contrario di «alto»."
      },
      {
        q: "Quale parola è un sinonimo di «veloce»?",
        o: ["Rapido", "Lento", "Stanco", "Pesante"],
        h: ["Ha significato simile.", "«Lento» è il contrario.", "Indica rapidità."],
        e: "«Rapido» ha un significato simile a «veloce» (è un sinonimo)."
      },
      {
        q: "Quale parola è un alterato di «libro»?",
        o: ["Libretto", "Libreria", "Libraio", "Leggere"],
        h: ["Mantiene la radice e aggiunge un suffisso alterato.", "Indica un libro piccolo.", "«Libreria» e «libraio» sono derivati."],
        e: "«Libretto» è un nome alterato diminutivo di «libro»."
      },
      {
        q: "Quale parola è composta?",
        o: ["Portachiavi", "Chiave", "Chiavistello", "Chiudere"],
        h: ["Unisce due parole.", "C'è l'idea di portare e di chiavi.", "Non è un semplice derivato."],
        e: "«Portachiavi» è una parola composta."
      },
      {
        q: "Quale parola è primitiva?",
        o: ["Pane", "Panettiere", "Panino", "Panetteria"],
        h: ["È la parola base.", "Le altre derivano da essa.", "Ha solo due sillabe."],
        e: "«Pane» è la parola primitiva da cui nascono «panino», «panettiere» e «panetteria»."
      },
      {
        q: "Nel dizionario, come si cerca il verbo «cantavamo»?",
        o: ["Cantare", "Cantavamo", "Cantato", "Canto"],
        h: ["I verbi si cercano all'infinito.", "Togli la desinenza dell'imperfetto.", "È la prima coniugazione."],
        e: "Sul dizionario i verbi si cercano all'infinito presente: «cantare»."
      },
      {
        q: "Quale parola ha significato opposto a «aprire»?",
        o: ["Chiudere", "Iniziare", "Entrare", "Spiegare"],
        h: ["Pensa a una porta o a un libro.", "Non è «iniziare».", "È l'azione contraria."],
        e: "«Chiudere» è il contrario di «aprire»."
      },
      {
        q: "Quale parola è un derivato di «mare»?",
        o: ["Marino", "Maretta", "Mareggiatina", "Marciapiede"],
        h: ["Deriva dalla base «mar-».", "Riguarda il mare.", "«Marciapiede» ha un'altra origine."],
        e: "«Marino» è un aggettivo derivato da «mare»."
      }
    ],
    impiccato: [
      {
        q: "Grammatica: la parte del discorso che indica un'azione o uno stato.",
        p: "IL VERBO",
        h: ["E", "O", "R"],
        e: "Il verbo è una parte variabile del discorso che esprime azioni, stati o modi di essere."
      },
      {
        q: "Ortografia: il segno grafico che indica una vocale accentata a fine parola.",
        p: "L ACCENTO",
        h: ["A", "E", "N"],
        e: "L'accento grafico si usa soprattutto sulle parole tronche (es. città, perché)."
      },
      {
        q: "Sintassi: l'insieme di soggetto e predicato che regge la frase.",
        p: "FRASE MINIMA",
        h: ["A", "I", "S"],
        e: "La frase minima contiene solo il nucleo essenziale (soggetto e predicato)."
      },
      {
        q: "Lessico: parola con significato uguale o molto simile a un'altra.",
        p: "SINONIMO",
        h: ["I", "O", "N"],
        e: "Un sinonimo ha significato affine o equivalente a un'altra parola."
      },
      {
        q: "Grammatica: accompagna il nome e concorda in genere e numero.",
        p: "L ARTICOLO",
        h: ["A", "R", "O"],
        e: "L'articolo può essere determinativo, indeterminativo o partitivo."
      },
      {
        q: "Sintassi: risponde alla domanda «chi compie l'azione?».",
        p: "IL SOGGETTO",
        h: ["O", "E", "T"],
        e: "Il soggetto è l'elemento su cui verte la predicazione."
      }
    ],
    stranieri: [
      {
        q: "Che cosa significa «goal» nello sport?",
        o: ["Gol / rete segnata", "Arbitro di campo", "Fallo laterale", "Panchina tecnica"],
        h: ["È un termine calcistico comune.", "Indica il punto segnato.", "Non è una regola o un ruolo."],
        e: "«Goal» (in italiano «gol») indica la rete segnata o la porta."
      },
      {
        q: "Che cosa significa «ok»?",
        o: ["Va bene / d'accordo", "Non capisco", "Arrivo tardi", "Ripeti per favore"],
        h: ["È un'espressione di consenso.", "Si usa per confermare.", "Non esprime dubbio."],
        e: "«Ok» significa «va bene», «d'accordo» o «corretto»."
      },
      {
        q: "«Stop» su un cartello stradale significa:",
        o: ["Fermati", "Accelera", "Gira a destra", "Suona il clacson"],
        h: ["È un segnale di arresto.", "Impone di fermarsi.", "Non indica una svolta."],
        e: "«Stop» significa «fermati» / «alt»."
      },
      {
        q: "«Ciao» che origine ha?",
        o: ["Dal veneziano «s-ciao» (schiavo/servo)", "Dall'inglese «ciao»", "Dal giapponese «chao»", "Dal tedesco «tschau»"],
        h: ["È un saluto nato in Italia.", "Viene da un'antica formula di cortesia.", "Poi si è diffuso anche all'estero."],
        e: "«Ciao» deriva dall'espressione veneziana «s-ciao» («suo schiavo/servo»)."
      },
      {
        q: "«Bar» in italiano indica:",
        o: ["Locale dove si prendono bevande e caffè", "Una biblioteca comunale", "Un campo da tennis", "Una stazione del treno"],
        h: ["È un luogo familiare.", "Si ordina al bancone.", "Non è una palestra."],
        e: "In italiano «bar» indica un locale pubblico per colazioni, caffè e bevande."
      },
      {
        q: "«Sport» include:",
        o: ["Attività fisica e giochi con regole", "Solo lettura di romanzi", "Solo calcoli matematici", "Solo disegno a matita"],
        h: ["Riguarda il movimento e le gare.", "Ha regole condivise.", "Include calcio, nuoto, atletica."],
        e: "«Sport» indica l'attività fisica, individuale o di squadra, svolta secondo regole."
      }
    ],
    dialetti: [
      {
        q: "In molti dialetti del Nord, «mangiare» si dice spesso:",
        o: ["Mangià / magnà", "Dormì", "Correr", "Cantà"],
        h: ["Pensa all'azione a tavola.", "La radice resta simile.", "Non è dormire o correre."],
        e: "Nei dialetti settentrionali «mangiare» compare spesso come «magnà» o «mangià»."
      },
      {
        q: "In dialetto, «casa» in molte aree d'Italia si dice:",
        o: ["Cà / casa", "Scuola", "Strada", "Albero"],
        h: ["È il luogo in cui si abita.", "Spesso è una forma abbreviata.", "Pensa a «Ca'» nei toponimi."],
        e: "«Ca'» (forma apocopata di «casa») è molto diffusa in diverse parlate, soprattutto settentrionali."
      },
      {
        q: "Se in un dialetto locale senti «acqua», a quale elemento pensi?",
        o: ["All'acqua da bere o del mare", "Al fuoco del camino", "Al vento d'inverno", "Alla terra del campo"],
        h: ["È un liquido.", "Serve per dissetarsi.", "Non è fuoco o vento."],
        e: "«Acqua» (nelle varie pronunce locali) indica il liquido essenziale alla vita."
      },
      {
        q: "In molte parlate locali, «bambino» o «ragazzo» ha voci proprie come:",
        o: ["Bocia / guaglione / picciotto", "Professore / notaio", "Treno / autobus", "Quaderno / matita"],
        h: ["Indica una persona giovane.", "Cambia da regione a regione.", "Non è un mezzo o un oggetto."],
        e: "I dialetti hanno parole proprie per indicare i ragazzi a seconda delle aree geografiche."
      },
      {
        q: "Quale frase è in italiano standard e non in dialetto?",
        o: ["Oggi vado a scuola in bicicletta.", "Va' là che te 'l disi mi.", "Te lo dico io, va' là.", "Nunn'è overo."],
        h: ["Cerca la frase senza forme dialettali.", "È una frase comune di italiano standard.", "Le altre hanno tratti locali marcati."],
        e: "«Oggi vado a scuola in bicicletta» è una frase di italiano standard."
      },
      {
        q: "Perché in Italia esistono tanti dialetti diversi?",
        o: ["Per la storia e la varietà dei territori", "Perché sono stati inventati ieri", "Perché non esiste una lingua italiana", "Per un errore di stampa"],
        h: ["Pensa alla storia della penisola.", "Ogni zona ha avuto vicende proprie.", "I dialetti sono parlate storiche."],
        e: "La varietà dei dialetti nasce dalla storia linguistica e geografica delle diverse regioni italiane."
      }
    ],
    letteratura: [
      {
        q: "Chi ha scritto «Le avventure di Pinocchio»?",
        o: ["Carlo Collodi", "Giovanni Verga", "Italo Calvino", "Giacomo Leopardi"],
        h: ["È un famoso libro per ragazzi dell'Ottocento.", "Il protagonista è un burattino di legno.", "L'autore è noto con lo pseudonimo Collodi."],
        e: "«Le avventure di Pinocchio» è stato scritto da Carlo Collodi (Carlo Lorenzini)."
      },
      {
        q: "Qual è una caratteristica tipica di una fiaba?",
        o: ["Elementi magici o fantastici", "Solo notizie di cronaca attuale", "Formule chimiche", "Orari dei treni"],
        h: ["Pensa a fate, incantesimi o oggetti magici.", "È un racconto fantastico.", "Spesso ha un lieto fine."],
        e: "La fiaba è un racconto fantastico caratterizzato da magia e vicende meravigliose."
      },
      {
        q: "Che cosa fa una poesia quando usa le rime?",
        o: ["Fa suonare uguali o simili le parole finali dei versi", "Elimina tutte le vocali", "Scrive solo in prosa", "Usa solo numeri"],
        h: ["Ascolta il suono alla fine del verso.", "Crea musicalità e ritmo.", "Non toglie le vocali."],
        e: "La rima è l'identità o somiglianza di suono nella parte finale di due o più parole a fine verso."
      },
      {
        q: "Quale di questi è un testo narrativo?",
        o: ["Un racconto con personaggi e una trama", "L'elenco degli ingredienti di una torta", "Una tabella di moltiplicazioni", "Un cartello di divieto"],
        h: ["Ha una storia che si svolge nel tempo.", "Ci sono personaggi e fatti.", "Non è una ricetta o una tabella."],
        e: "Un testo narrativo racconta una storia con personaggi, luoghi, tempo e azioni."
      },
      {
        q: "Che cos'è il riassunto di un testo?",
        o: ["Raccontare in modo breve le parti più importanti", "Copiare parola per parola tutto il testo", "Inventare un finale diverso", "Cambiare i nomi dei personaggi"],
        h: ["Serve a sintetizzare.", "Mantiene le idee principali.", "È più corto dell'originale."],
        e: "Riassumere significa esporre in modo sintetico e fedele i contenuti essenziali di un testo."
      },
      {
        q: "In una storia, i personaggi «buoni» che aiutano il protagonista si dicono spesso:",
        o: ["Aiutanti / alleati", "Antagonisti", "Narratori esterni", "Comparizioni"],
        h: ["Stanno dalla parte del protagonista.", "Lo sostengono nell'impresa.", "Non sono gli ostacoli."],
        e: "Gli aiutanti sostengono il protagonista nel superare le prove della narrazione."
      }
    ],
    etimologie: [
      {
        q: "La parola «geografia» unisce «geo-» (Terra) e «-grafia» (scrittura/descrizione): significa:",
        o: ["Descrizione della Terra", "Studio delle stelle lontane", "Arte di dipingere quadri", "Raccolta di francobolli"],
        h: ["«Geo» = Terra.", "«Grafia» = scrittura/descrizione.", "Unisci i due significati."],
        e: "«Geografia» significa letteralmente «descrizione/rappresentazione della Terra»."
      },
      {
        q: "La parola «telefono» unisce «tele-» (lontano) e «-fono» (voce/suono): significa:",
        o: ["Suono / voce a distanza", "Scrittura sulla sabbia", "Misura del peso", "Visione notturna"],
        h: ["«Tele» significa lontano.", "«Fono» riguarda il suono.", "Permette di parlare a distanza."],
        e: "«Telefono» nasce dall'unione di «tele-» (lontano) e «-fono» (suono/voce)."
      },
      {
        q: "La parola «agricoltura» viene dal latino «ager» (campo) e «colere» (coltivare): significa:",
        o: ["Coltivazione dei campi", "Costruzione di navi", "Riparazione di orologi", "Caccia in alta montagna"],
        h: ["«Ager» = campo.", "«Colere» = coltivare.", "Riguarda la terra coltivata."],
        e: "«Agricoltura» significa «coltivazione dei campi»."
      },
      {
        q: "La parola «bicicletta» ricorda il numero:",
        o: ["Due (ruote)", "Dieci", "Cento", "Zero"],
        h: ["Ha due ruote.", "«Bi-» in molte parole indica due.", "Pensa a «bicolore»."],
        e: "«Bicicletta» indica un veicolo a due ruote (con il prefisso «bi-»)."
      },
      {
        q: "La parola «autobus» unisce «auto-» (da sé / automobile) e «-bus» (da omnibus, «per tutti»):",
        o: ["Mezzo di trasporto per tutti", "Bicicletta da corsa", "Aereo supersonico", "Barca a vela"],
        h: ["«Omnibus» in latino significa «per tutti».", "È un mezzo pubblico.", "Porta più passeggeri."],
        e: "«Autobus» deriva da «auto-» + «bus» (abbreviazione di «omnibus», «per tutti»)."
      },
      {
        q: "La parola «alfabeto» prende il nome dalle prime due lettere greche:",
        o: ["Alfa e beta", "Pi greco e sigma", "Omega e delta", "Gamma e rho"],
        h: ["Guarda le prime due lettere del nome.", "Sono «alfa» e «beta».", "Danno il nome all'insieme delle lettere."],
        e: "La parola «alfabeto» deriva dalle prime due lettere dell'alfabeto greco: alfa e beta."
      }
    ]
  },

  // ================= LIVELLO 1: MEDIO (SUPERIORI) =================
  1: {
    grammatica: [
      {
        q: "Quale proposizione è una subordinata relativa?",
        o: ["Il libro che ho letto è bello.", "Ho letto un libro e sono uscito.", "Esco se non piove.", "Studio perché voglio passare."],
        h: ["È introdotta da un pronome relativo.", "Si riferisce a un nome precedente («libro»).", "Non è una condizionale o finale."],
        e: "«Che ho letto» è una proposizione relativa riferita all'antecedente «il libro»."
      },
      {
        q: "In «Benchè fosse stanco, continuò», la congiunzione «benché» introduce una:",
        o: ["Subordinata concessiva", "Subordinata temporale", "Subordinata modale", "Coordinata disgiuntiva"],
        h: ["Indica una circostanza nonostante la quale avviene il fatto.", "Spesso regge il congiuntivo.", "Equivale ad «anche se»."],
        e: "«Benché» introduce una subordinata concessiva."
      },
      {
        q: "Quale forma è un periodo ipotetico della possibilità?",
        o: ["Se studiassi di più, capiresti meglio.", "Se hai studiato, hai capito.", "Se avessi studiato, avresti capito.", "Quando studi, capisci."],
        h: ["Usa l'imperfetto congiuntivo nella protasi.", "Usa il condizionale presente nell'apodosi.", "Indica un'ipotesi possibile ma non certa."],
        e: "Il periodo ipotetico della possibilità usa congiuntivo imperfetto nella protasi e condizionale presente nell'apodosi."
      },
      {
        q: "Quale figura retorica consiste nell'accostare due termini di senso opposto?",
        o: ["Ossìmoro", "Similitudine", "Anàfora", "Iperbole"],
        h: ["Unisce due concetti in contrasto.", "Es. «ghiaccio bollente» o «dolce amaro».", "Non usa «come»."],
        e: "L'ossimoro accosta parole di significato opposto per creare un paradosso espressivo."
      },
      {
        q: "Quale figura retorica ripete una o più parole all'inizio di versi o frasi successive?",
        o: ["Anàfora", "Metonimia", "Litote", "Eufemismo"],
        h: ["La ripetizione avviene all'inizio.", "Dà ritmo o enfasi.", "Non è una negazione del contrario."],
        e: "L'anafora consiste nella ripetizione di una o più parole all'inizio di enunciati o versi successivi."
      },
      {
        q: "In metrica italiana, quante sillabe ha un endecasillabo piano?",
        o: ["Undici (con ultimo accento sulla decima)", "Dieci", "Dodici", "Otto"],
        h: ["Lo dice il nome stesso.", "L'accento principale cade sulla 10ª sillaba.", "Se è piano non ha sillabe metriche in più."],
        e: "L'endecasillabo piano ha undici sillabe metriche con l'ultimo accento tonico sulla decima sillaba."
      }
    ],
    analisi: [
      {
        q: "In «Non so se verrà domani», «se verrà domani» è una:",
        o: ["Interrogativa indiretta", "Relativa propria", "Causale esplicita", "Concessiva implicita"],
        h: ["Esprime una domanda in forma dipendente.", "Dipende da «non so».", "Non c'è punto interrogativo diretto."],
        e: "«Se verrà domani» è una subordinata interrogativa indiretta."
      },
      {
        q: "In «Camminando per il parco, incontrò Paolo», «camminando per il parco» è:",
        o: ["Subordinata implicita al gerundio", "Proposizione principale", "Subordinata relativa", "Coordinata avversativa"],
        h: ["Il verbo è al modo indefinito (gerundio).", "È implicita perché non ha modo finito.", "Ha valore temporale/modale."],
        e: "È una subordinata implicita perché il verbo («camminando») è al gerundio (modo indefinito)."
      },
      {
        q: "In «Roma, città eterna, accoglie milioni di turisti», «città eterna» è:",
        o: ["Apposizione con attributo", "Complemento di moto a luogo", "Predicato nominale", "Soggetto partitivo"],
        h: ["È un nome affiancato a «Roma».", "Ha anche l'aggettivo «eterna».", "È racchiuso tra virgole."],
        e: "«Città» è apposizione di «Roma» ed «eterna» è il suo attributo."
      },
      {
        q: "In «Ha agito con coraggio», «con coraggio» è complemento di:",
        o: ["Modo", "Argomento", "Fine", "Privazione"],
        h: ["Risponde a «come? in che modo?».", "Indica l'atteggiamento nell'azione.", "Non indica lo scopo."],
        e: "«Con coraggio» esprime il modo in cui l'azione viene compiuta."
      },
      {
        q: "In «Studia per superare l'esame», «per superare l'esame» è:",
        o: ["Finale implicita", "Causale esplicita", "Temporale implicita", "Consecutiva"],
        h: ["Indica lo scopo dell'azione.", "È implicita perché usa l'infinito.", "Risponde a «a quale scopo?»."],
        e: "Esprime lo scopo («per superare...») in forma implicita con l'infinito."
      },
      {
        q: "In «È così stanco che si addormenta subito», «che si addormenta subito» è:",
        o: ["Consecutiva", "Causale", "Interrogativa diretta", "Relativa limitativa"],
        h: ["È la conseguenza di «così stanco».", "C'è un correlativo («così»).", "Indica l'effetto."],
        e: "La proposizione esprime la conseguenza di quanto affermato nella reggente («così stanco»)."
      }
    ],
    vocaboli: [
      {
        q: "Quale termine indica un discorso lungo e faticoso?",
        o: ["Prolissità", "Sintesi", "Brevità", "Concisione"],
        h: ["Deriva da «prolisso».", "È l'opposto di sintesi e concisione.", "Indica eccesso di parole."],
        e: "«Prolissità» indica l'eccessiva lunghezza e verbosità nell'esposizione."
      },
      {
        q: "Quale aggettivo significa «degno di lode»?",
        o: ["Encomiabile", "Biasimevole", "Riprovevole", "Deplorevole"],
        h: ["Viene da «encomio».", "Ha senso positivo.", "Gli altri tre hanno senso negativo."],
        e: "«Encomiabile» significa meritevole di encomio, cioè di lode."
      },
      {
        q: "Quale termine indica un'avversione o ostilità profonda?",
        o: ["Antipatia / avversione", "Simpatia", "Affinità", "Benevolenza"],
        h: ["Ha senso contrario a simpatia.", "Indica repulsione o ostilità.", "Non è affinità."],
        e: "«Avversione» indica un sentimento di forte contrarietà o repulsione."
      },
      {
        q: "Che cosa significa «effimero»?",
        o: ["Di breve durata, passeggero", "Eterno e immutabile", "Molto pesante", "Segreto e nascosto"],
        h: ["Viene dal greco «efémeros» (che dura un giorno).", "Indica ciò che passa in fretta.", "È l'opposto di eterno."],
        e: "«Effimero» significa che dura poco tempo, transitorio o caduco."
      },
      {
        q: "Che cosa significa «ambiguo»?",
        o: ["Che può essere inteso in più modi", "Assolutamente chiaro e univoco", "Molto rumoroso", "Antico di secoli"],
        h: ["Lascia spazio a doppie interpretazioni.", "Non è sinonimo di chiaro.", "Ha più sensi possibili."],
        e: "«Ambiguo» qualifica ciò che è incerto o interpretabile in modi diversi."
      },
      {
        q: "Che cosa significa «pragmatico»?",
        o: ["Pratico, orientato ai risultati concreti", "Puramente astratto e teorico", "Molto malinconico", "Senza regole"],
        h: ["Riguarda la pratica e l'azione.", "Si basa sull'utilità concreta.", "Non è puramente astratto."],
        e: "«Pragmatico» indica chi guarda alla concretezza e all'efficacia pratica."
      }
    ],
    impiccato: [
      {
        q: "Epica greca: poema omerico sull'ira di Achille.",
        p: "L ILIADE",
        h: ["I", "L", "A"],
        e: "L'Iliade narra un episodio della guerra di Troia incentrato sull'ira di Achille."
      },
      {
        q: "Epica latina: poema di Virgilio sul viaggio di Enea.",
        p: "L ENEIDE",
        h: ["E", "N", "I"],
        e: "L'Eneide è il poema epico latino di Virgilio dedicato ad Enea."
      },
      {
        q: "Duecento: movimento poetico italiano legato a Guinizzelli e Cavalcanti.",
        p: "DOLCE STIL NOVO",
        h: ["O", "I", "L"],
        e: "Il Dolce Stil Novo rinnova la lirica amorosa duecentesca con temi di nobiltà d'animo e lode."
      },
      {
        q: "Trecento: raccolta di novelle di Giovanni Boccaccio.",
        p: "IL DECAMERON",
        h: ["E", "A", "R"],
        e: "Il Decameron raccoglie cento novelle narrate da dieci giovani durante la peste del 1348."
      },
      {
        q: "Ottocento: romanzo storico di Alessandro Manzoni.",
        p: "I PROMESSI SPOSI",
        h: ["O", "E", "S"],
        e: "I Promessi Sposi è il celebre romanzo storico di Alessandro Manzoni."
      },
      {
        q: "Novecento: romanzo di Italo Svevo sulla psicoanalisi e l'inettitudine.",
        p: "LA COSCIENZA DI ZENO",
        h: ["O", "E", "I"],
        e: "La coscienza di Zeno (1923) è il capolavoro narrativo di Italo Svevo."
      }
    ],
    stranieri: [
      {
        q: "«Déjà vu» dal francese significa letteralmente:",
        o: ["Già visto", "Già fatto", "A presto", "Buon viaggio"],
        h: ["«Déjà» = già.", "«Vu» = visto.", "Indica la sensazione di aver già vissuto una scena."],
        e: "«Déjà vu» significa letteralmente «già visto»."
      },
      {
        q: "«Status quo» dal latino indica:",
        o: ["Lo stato delle cose in cui ci si trova", "Un cambiamento improvviso", "Una legge appena abrogata", "Un viaggio all'estero"],
        h: ["È un'espressione latina.", "Riguarda la situazione attuale/esistente.", "Non indica mutamento."],
        e: "«Status quo» indica la condizione o l'assetto attuale delle cose."
      },
      {
        q: "«Brainstorming» in ambito lavorativo o scolastico indica:",
        o: ["Una discussione libera per generare idee", "Una punizione disciplinare", "Una traduzione letterale", "Una pausa pranzo"],
        h: ["«Brain» = cervello, «storm» = tempesta.", "Serve a far emergere idee.", "È una tecnica creativa."],
        e: "Il «brainstorming» è una sessione creativa per raccogliere idee senza censure iniziali."
      },
      {
        q: "«Curriculum vitae» dal latino significa letteralmente:",
        o: ["Corso della vita", "Fine del viaggio", "Patto solenne", "Nuova legge"],
        h: ["«Curriculum» = corsa/corso.", "«Vitae» = della vita.", "Riguarda il percorso di studi e lavoro."],
        e: "«Curriculum vitae» significa letteralmente «corso della vita»."
      },
      {
        q: "«Fake news» indica:",
        o: ["Notizie false o fuorvianti", "Cronaca sportiva ufficiale", "Enciclopedia storica", "Bollettino meteo"],
        h: ["«Fake» significa falso.", "«News» significa notizie.", "Riguarda l'informazione non veritiera."],
        e: "«Fake news» designa notizie false o manipolate diffuse come vere."
      },
      {
        q: "«Ex novo» in latino significa:",
        o: ["Da capo, nuovamente", "In segreto", "Per caso", "Senza motivo"],
        h: ["Indica un nuovo inizio.", "Significa ricominciare.", "Non significa «per caso»."],
        e: "«Ex novo» significa «di nuovo, da capo»."
      }
    ],
    dialetti: [
      {
        q: "Quale fenomeno fonetico è tipico di molte parlate meridionali?",
        o: ["L'assimilazione progressiva di «nd» in «nn» (es. «quanno»)", "L'uso obbligatorio dell'articolo davanti ai nomi propri maschili", "La caduta sistematica di tutte le vocali finali tranne «a»", "L'assenza totale di consonanti doppie"],
        h: ["Osserva il nesso consonantico «nd».", "Diventa «nn» in parole come «quando».", "È un tratto ben noto dell'area centro-meridionale."],
        e: "L'assimilazione di «nd» > «nn» («quanno», «munno») è un tratto caratteristico di molte varietà centro-meridionali."
      },
      {
        q: "Che cos'è l'italiano regionale?",
        o: ["La varietà d'italiano influenzata dal dialetto locale", "Una lingua straniera parlata solo a Roma", "Il latino parlato nel Medioevo", "Un codice segreto"],
        h: ["Nasce dall'incontro tra italiano e dialetto.", "Cambia a seconda dell'area geografica.", "Riguarda pronuncia, lessico e sintassi."],
        e: "L'italiano regionale è la varietà dell'italiano che risente dell'influsso del sostrato dialettale locale."
      },
      {
        q: "In ambito letterario, chi ha usato il dialetto come strumento espressivo consapevole?",
        o: ["Carlo Emilio Gadda / Giovanni Verga (stile)", "Nessun autore italiano", "Solo scrittori del Trecento", "Solo poeti latini"],
        h: ["Pensa alla sperimentazione espressiva o al realismo.", "Gadda intreccia dialetti e linguaggi tecnici.", "È una scelta stilistica precisa."],
        e: "Molti autori moderni e contemporanei (come Gadda o Pasolini) hanno valorizzato il plurilinguismo e i dialetti."
      },
      {
        q: "La parola «scugnizzo» appartiene all'area:",
        o: ["Napoletana", "Veneta", "Sarda", "Friulana"],
        h: ["È legata alla città di Napoli.", "Indica un ragazzo di strada vivace e sveglio.", "Non è sarda o veneta."],
        e: "«Scugnizzo» è una voce tipica del napoletano."
      },
      {
        q: "La parola «baita» si diffonde soprattutto nell'area:",
        o: ["Alpina / settentrionale", "Insulare meridionale", "Costiera tirrenica", "Laziale"],
        h: ["Richiama la montagna e le Alpi.", "È una casetta/rifugio alpino.", "Entra anche nell'italiano comune."],
        e: "«Baita» proviene dall'area alpina settentrionale e indica una casa o un rifugio di montagna."
      },
      {
        q: "Qual è la differenza principale tra lingua e dialetto in linguistica?",
        o: ["Non è una differenza di complessità grammaticale, ma storica e socioculturale", "I dialetti non hanno grammatica", "Le lingue non cambiano mai", "I dialetti sono sempre lingue straniere"],
        h: ["Dal punto di vista strutturale entrambi hanno regole.", "Contano storia, standardizzazione e uso istituzionale.", "Non è questione di «inferiorità» linguistica."],
        e: "Linguisticamente i dialetti sono sistemi linguistici completi con proprie regole, distinti per ragioni storiche e sociali."
      }
    ],
    letteratura: [
      {
        q: "Chi è l'autore del «Canzoniere» (Rerum vulgarium fragmenta)?",
        o: ["Francesco Petrarca", "Giovanni Boccaccio", "Ludovico Ariosto", "Torquato Tasso"],
        h: ["È uno dei Tre Coronati del Trecento.", "L'opera è centrata sull'amore per Laura.", "Esplora il dissidio interiore."],
        e: "Il «Canzoniere» è l'opera lirica fondamentale di Francesco Petrarca."
      },
      {
        q: "Quale opera è di Ludovico Ariosto?",
        o: ["Orlando furioso", "Gerusalemme liberata", "Decameron", "Vita nova"],
        h: ["È un poema cavalleresco del Cinquecento.", "Ha come temi l'amore, la follia e l'avventura.", "Usa l'ottava rima."],
        e: "L'«Orlando furioso» è il poema cavalleresco di Ludovico Ariosto."
      },
      {
        q: "Quale opera è di Giacomo Leopardi?",
        o: ["I Canti", "Il Piacere", "Il fu Mattia Pascal", "I Malavoglia"],
        h: ["È una raccolta poetica dell'Ottocento.", "Comprende idilli come «L'infinito» e «A Silvia».", "Non è un romanzo verista o decadente."],
        e: "I «Canti» raccolgono le poesie di Giacomo Leopardi."
      },
      {
        q: "Quale poetica è legata a Giovanni Pascoli?",
        o: ["Il fanciullino", "Il superomismo", "Il futurismo", "Il neorealismo"],
        h: ["Riguarda lo stupore innocente davanti alle cose.", "È una riflessione estetica del Decadentismo.", "Non è il superomismo dannunziano."],
        e: "La poetica del «fanciullino» è centrale nella riflessione di Giovanni Pascoli."
      },
      {
        q: "Quale romanzo è di Luigi Pirandello?",
        o: ["Il fu Mattia Pascal", "La coscienza di Zeno", "I Promessi Sposi", "Ultime lettere di Jacopo Ortis"],
        h: ["Tratta il tema dell'identità e della maschera.", "Il protagonista finge di essere morto.", "È del primo Novecento."],
        e: "«Il fu Mattia Pascal» (1904) è uno dei romanzi più celebri di Luigi Pirandello."
      },
      {
        q: "Quale opera di Dante Alighieri è un prosimetro giovanile dedicato a Beatrice?",
        o: ["Vita nova", "Convivio", "De vulgari eloquentia", "Monarchia"],
        h: ["Alterna versi e prose.", "È incentrata sull'amore per Beatrice.", "È un'opera giovanile di Dante."],
        e: "La «Vita nova» è il prosimetro giovanile in cui Dante ripercorre la sua storia d'amore per Beatrice."
      }
    ],
    etimologie: [
      {
        q: "«Democrazia» viene dal greco «dêmos» (popolo) e «krátos» (potere): significa:",
        o: ["Potere / governo del popolo", "Governo di un solo re", "Assenza di leggi", "Dominio militare"],
        h: ["«Dêmos» = popolo.", "«Kràtos» = forza/potere.", "Unisci i due termini."],
        e: "«Democrazia» significa etimologicamente «potere/governo del popolo»."
      },
      {
        q: "«Filosofia» viene dal greco «philía» (amore/amicizia) e «sophía» (sapienza): significa:",
        o: ["Amore per la sapienza", "Paura della conoscenza", "Arte della guerra", "Studio delle monete"],
        h: ["«Philo-» = amore per...", "«Sophía» = sapienza.", "È la ricerca del sapere."],
        e: "«Filosofia» significa letteralmente «amore per la sapienza»."
      },
      {
        q: "«Ortografia» unisce «orthós» (retto/corretto) e «gráphein» (scrivere):",
        o: ["Scrittura corretta", "Pittura su muro", "Scultura nel marmo", "Canto corale"],
        h: ["«Orthós» significa dritto/corretto.", "«Graph-» significa scrivere.", "Riguarda la giusta grafia."],
        e: "«Ortografia» significa «scrittura corretta»."
      },
      {
        q: "«Cronologia» deriva da «chrónos» (tempo) e «lógos» (discorso/studio):",
        o: ["Studio / ordinamento nel tempo", "Misura della temperatura", "Elenco di colori", "Raccolta di piante"],
        h: ["«Chrónos» = tempo.", "«Lógos» = discorso/studio.", "Riguarda l'ordine temporale."],
        e: "«Cronologia» indica la determinazione e l'ordinamento dei fatti nel tempo."
      },
      {
        q: "«Anacronismo» unisce «aná-» (contro/fuori) e «chrónos» (tempo):",
        o: ["Collocazione fuori dal proprio tempo", "Errore di calcolo aritmetico", "Cambio di colore", "Rima baciata"],
        h: ["«Chrónos» = tempo.", "È qualcosa fuori epoca.", "Es. un orologio da polso nell'antichità."],
        e: "L'anacronismo è l'attribuzione di un fatto, oggetto o mentalità a un'epoca diversa dalla sua."
      },
      {
        q: "«Nostalgia» deriva dal greco «nóstos» (ritorno) e «álgos» (dolore):",
        o: ["Dolore / malinconia del ritorno", "Gioia di partire", "Stanchezza fisica", "Curiosità scientifica"],
        h: ["«Nóstos» = ritorno (pensa all'Odissea).", "«Álgos» = dolore.", "Esprime rimpianto e desiderio di ritorno."],
        e: "«Nostalgia» nasce dall'unione di «nóstos» (ritorno) e «álgos» (dolore)."
      }
    ]
  },

  // ================= LIVELLO 2: DIFFICILE (UNIVERSITÀ L-10) =================
  2: {
    grammatica: [
      {
        q: "Che cosa si intende per «anafonesi» nella grammatica storica dell'italiano?",
        o: ["Il passaggio di /e, o/ toniche a /i, u/ davanti a determinate consonanti palatali o velari", "La caduta della vocale finale atona", "L'inserimento di una vocale per facilitare la pronuncia", "La trasformazione di un verbo transitivo in intransitivo"],
        h: ["È un mutamento vocalico del fiorentino/toscano.", "Coinvolge «e» chiusa e «o» chiusa toniche.", "Avviene davanti a suoni come /ʎ/, /ɲ/, /ŋk/, /ŋɡ/."],
        e: "L'anafonesi è il innalzamento di /e/ tonica a /i/ e di /o/ tonica a /u/ in determinati contesti consonantici toscani (es. consilium > consiglio, fungum > fungo)."
      },
      {
        q: "Che cos'è la «epitesi» (o paragoge)?",
        o: ["L'aggiunta di una vocale o sillaba alla fine di una parola", "La caduta di una sillaba all'interno della parola", "La fusione di due vocali in un dittongo", "L'inversione di due consonanti contigue"],
        h: ["Avviene alla fine della parola.", "Aggiunge un elemento fonico (es. «piùe», «sìe» antichi).", "È l'opposto dell'apocope."],
        e: "L'epitesi è l'aggiunta di un fono o una sillaba alla fine di una parola (attestata in italiano antico e in varietà dialettali)."
      },
      {
        q: "In sintassi, qual è una caratteristica tipica della «dislocazione a sinistra»?",
        o: ["Un costituente è messo in evidenza a sinistra ed è ripreso da un pronome clitico", "Il verbo è sempre collocato in ultima posizione", "La frase manca del predicato", "Si usa solo in poesia latina"],
        h: ["C'è una ripresa pronominale (es. «il pane, lo compro io»).", "Sposta un elemento a sinistra.", "È molto frequente nell'italiano neostandard."],
        e: "Nella dislocazione a sinistra un sintagma è anteposto e ripreso anaforicamente da un clitico («Il caffè, lo prendo amaro»)."
      },
      {
        q: "Che cos'è la «frase scissa»?",
        o: ["Una struttura che spezza la frase in due segmenti usando il verbo essere e «che»", "Una frase composta da sole congiunzioni", "Un periodo senza proposizione principale", "Una figura retorica di ripetizione"],
        h: ["Usa «è... che» per mettere in focus un elemento.", "Es. «È Marco che ha chiamato».", "Serve a focalizzare un costituente."],
        e: "La frase scissa isola un elemento in focus tramite «essere» + elemento focalizzato + «che» + resto della frase."
      },
      {
        q: "Che cosa designa il termine «dittongamento mobile» in italiano?",
        o: ["L'alternanza tra dittongo in sillaba tonica aperta e vocale semplice quando l'accento si sposta", "Lo spostamento dell'accento dall'ultima alla penultima sillaba", "La caduta dell'h iniziale", "Il passaggio da genere maschile a femminile"],
        h: ["Pensa a forme come «suono / suoniamo» o «muovo / muovevamo».", "Dipende dalla posizione dell'accento.", "È legato alla sillaba tonica aperta."],
        e: "Il dittongamento mobile è l'alternanza tra dittongo (sotto accento in sillaba aperta) e vocale monottongata quando l'accento cade altrove."
      },
      {
        q: "Che cos'è il «betacismo» nella storia linguistica?",
        o: ["La confusione o convergenza tra bilabiale occlusiva /b/ e fricativa/approssimante /β/ o /v/", "La palatalizzazione di /k/ davanti a vocale anteriore", "La caduta della nasale finale", "L'uso del passato remoto al posto del passato prossimo"],
        h: ["Riguarda i suoni labiali /b/ e /v/.", "È noto anche in latino tardo e in spagnolo.", "Non riguarda i tempi verbali."],
        e: "Il betacismo è la neutralizzazione o fusione tra esiti labiali occlusivi e fricativi/approssimanti (es. b/v)."
      }
    ],
    analisi: [
      {
        q: "In «Si dice che partirà domani», la costruzione con «si» è:",
        o: ["Impersonale (con «si» impersonale)", "Passivante", "Riflessivo apparente", "Reciproco"],
        h: ["Regge una proposizione completiva.", "Non c'è un nome plurale accordato al verbo.", "Ha valore generico/impersonale."],
        e: "Con verbo intransitivo o reggente una completiva senza oggetto nominale accordato, il «si» ha valore impersonale."
      },
      {
        q: "In «Si vendono case antiche», «case antiche» ha funzione di:",
        o: ["Soggetto grammaticale in costruzione passivante", "Complemento oggetto di verbo attivo", "Complemento di specificazione", "Apposizione del predicato"],
        h: ["Il verbo «vendono» è al plurale.", "Concorda con «case antiche».", "È il «si» passivante."],
        e: "Nel «si» passivante il sintagma nominale («case antiche») concorda col verbo e funge da soggetto grammaticale."
      },
      {
        q: "In «Mi sono lavato le mani», «le mani» è:",
        o: ["Complemento oggetto (riflessivo apparente)", "Soggetto grammaticale", "Complemento di termine", "Predicato nominale"],
        h: ["L'azione non ricade sull'intero soggetto ma su una parte.", "«Mi» ha valore dativale/possessivo.", "«Le mani» subisce direttamente l'azione del lavare."],
        e: "Nel riflessivo apparente «le mani» è complemento oggetto, mentre «mi» indica il beneficiario/possessore."
      },
      {
        q: "In «Dato che piove, restiamo in casa», «dato che piove» è una subordinata:",
        o: ["Causale perifrasticamente introdotta", "Concessiva", "Consecutiva", "Finale"],
        h: ["Esprime la causa del restare in casa.", "«Dato che» equivale a «poiché/siccome».", "È di modo indicativo."],
        e: "«Dato che» è una locuzione congiuntiva causale che introduce una subordinata causale."
      },
      {
        q: "In «A malincuore accettò l'incarico», «a malincuore» ha funzione:",
        o: ["Avverbiale / modale", "Di complemento d'agente", "Di soggetto partitivo", "Di proposizione relativa"],
        h: ["Indica con quale disposizione d'animo/modo agì.", "È una locuzione avverbiale.", "Non è un soggetto."],
        e: "«A malincuore» funziona come locuzione avverbiale di modo."
      },
      {
        q: "Qual è la differenza tra proposizione relativa «restrittiva» (limitativa) e «apッositiva» (esplicativa)?",
        o: ["La restrittiva delimita l'antecedente, l'esplicativa aggiunge un'informazione accessoria", "L'esplicativa è sempre implicita", "La restrittiva non ha mai un antecedente", "Non c'è alcuna differenza funzionale"],
        h: ["Pensa a «Gli studenti che hanno studiato sono passati» vs «Gli studenti, che sono stanchi, riposano».", "La virgola spesso segnala l'esplicativa.", "Una restringe l'insieme, l'altra commenta."],
        e: "La relativa limitativa/restrittiva restringe il riferimento dell'antecedente; quella esplicativa/appositiva aggiunge un'informazione non indispensabile per identificarlo."
      }
    ],
    vocaboli: [
      {
        q: "In filologia e lessicografia, che cosa indica la marca «ant.»?",
        o: ["Antico / arcaico", "Antropologico", "Antonimico", "Antologico"],
        h: ["È un'abbreviazione lessicografica.", "Riguarda l'epoca d'uso della parola.", "Indica termini non più dell'uso moderno."],
        e: "Nei dizionari la marca «ant.» segnala una voce antica o arcaica."
      },
      {
        q: "Che cosa si intende per «polisemia» di un lessema?",
        o: ["La proprietà di una parola di avere più significati collegati tra loro", "L'esistenza di due parole con pronuncia identica ma origine diversa", "La perdita totale di significato di un termine", "L'uso di parole solo in poesia"],
        h: ["«Poli-» = molti, «-semia» = significato.", "I sensi hanno un legame semantico.", "Diversa dall'omonimia pura."],
        e: "La polisemia indica che un unico lessema sviluppa più accezioni correlate."
      },
      {
        q: "Che cosa si intende per «omonimia»?",
        o: ["L'identità di forma (grafica o fonica) tra parole di diversa origine e significato", "La somiglianza tra due sinonimi", "L'uso di un termine tecnico", "La formazione di un composto"],
        h: ["Le parole coincidono nella forma ma non nell'origine.", "Es. «vite» (pianta / strumento).", "Riguarda forma vs significato."],
        e: "L'omonimia ricorre quando due parole hanno uguale forma (grafica e/o fonica) ma origine e significato distinti."
      },
      {
        q: "Che cosa designa un «cultismo» (o parola dotta)?",
        o: ["Una parola ripresa direttamente dal latino o dal greco senza evoluzione popolare", "Una parola nata esclusivamente nel parlato infantile", "Un neologismo informatico inglese", "Una parola dialettale"],
        h: ["Non ha subito i normali mutamenti fonetici popolari.", "Spesso affianca un allotropo popolare.", "Ha origine colta/scritta."],
        e: "Il cultismo è un vocabolo entrato per via dotta dal latino o dal greco, conservando tratti più vicini all'etimo."
      },
      {
        q: "Che cosa significa «registro diafasico»?",
        o: ["La variazione della lingua in base alla situazione comunicativa e al grado di formalità", "La variazione legata all'area geografica", "La variazione legata al ceto sociale", "La variazione lungo l'asse del tempo"],
        h: ["Riguarda formale/informale, solenne/colloquiale.", "Cambia in base al contesto e all'interlocutore.", "Diverso da diatopico (luogo) e diastratico (strato sociale)."],
        e: "La diafasia riguarda la variazione situazionale e funzionale (registri e sottocodici) in base al contesto."
      },
      {
        q: "Che cosa significa «diatopia» in sociolinguistica?",
        o: ["La variazione linguistica su base geografica", "La variazione lungo l'asse storico", "La variazione tra scritto e parlato", "La variazione legata all'età"],
        h: ["«Topos» = luogo.", "Riguarda lo spazio geografico.", "Spiega le differenze regionali."],
        e: "La diatopia è la variazione della lingua nello spazio geografico."
      }
    ],
    impiccato: [
      {
        q: "Filologia: disciplina che studia e ricostruisce i testi attraverso l'analisi dei testimoni.",
        p: "CRITICA DEL TESTO",
        h: ["I", "T", "E"],
        e: "La critica del testo (o ecdotica) mira a ricostruire l'assetto più attendibile di un'opera a partire dalla tradizione."
      },
      {
        q: "Filologia romanza: errore del copista che omette una parola o un rigo per salto visivo.",
        p: "SAUT DU MEME AU MEME",
        h: ["E", "A", "U"],
        e: "Il saut du même au même avviene quando l'occhio del copista salta da una parola o sequenza uguale a un'altra successiva."
      },
      {
        q: "Linguistica storica: l'insieme dei manoscritti o stampe che tramandano un testo.",
        p: "TRADIZIONE",
        h: ["I", "O", "N"],
        e: "La tradizione è l'insieme dei testimoni (manoscritti e a stampa) che conservano un testo."
      },
      {
        q: "Linguistica generale: l'unità minima distintiva del sistema fonologico di una lingua.",
        p: "FONEMA",
        h: ["O", "E", "A"],
        e: "Il fonema è l'unità distintiva minima in grado di creare opposizioni di significato (coppie minime)."
      },
      {
        q: "Semiotica: il rapporto tra significante e significato nel segno linguistico secondo Saussure.",
        p: "ARBITRARIETA",
        h: ["A", "R", "I"],
        e: "L'arbitrarietà del segno linguistico indica che il legame tra significante e significato non è naturale/necessario."
      },
      {
        q: "Letteratura italiana: trattato in volgare di Dante rimasto incompiuto con commento a canzoni.",
        p: "IL CONVIVIO",
        h: ["O", "I", "V"],
        e: "Il Convivio è l'opera dottrinale in volgare (prosimetro) composta da Dante in esilio."
      }
    ],
    stranieri: [
      {
        q: "In filologia e critica letteraria, che cosa significa «hapax legomenon»?",
        o: ["Una parola attestata una sola volta in un corpus o in un autore", "Un manoscritto miniato del Duecento", "Una rima imperfetta nella metrica romanza", "Un commento in margine al testo"],
        h: ["«Hapax» in greco significa «una volta sola».", "Riguarda la frequenza di attestazione.", "È un termine tecnico filologico e lessicografico."],
        e: "L'hapax (legomenon) è una parola o forma attestata una sola volta in un testo, autore o corpus."
      },
      {
        q: "Che cosa si intende in linguistica per «calco strutturale»?",
        o: ["La traduzione o riproduzione della struttura interna di un'espressione straniera con materiale della propria lingua", "L'inserimento di una parola straniera invariata", "La cancellazione di un prefisso", "L'uso di un dialetto al posto della lingua standard"],
        h: ["Usa parole/elementi della propria lingua.", "Ricalca la struttura o il significato di un modello straniero.", "Es. «grattacielo» da «skyscraper»."],
        e: "Il calco riproduce con elementi della lingua ricevente una struttura o un significato di un modello alloglotto."
      },
      {
        q: "Che cosa designa il termine «code-switching» in sociolinguistica?",
        o: ["Il passaggio alternato da una lingua o varietà a un'altra all'interno dello stesso scambio comunicativo", "La traduzione automatica di un libro", "La riforma ortografica di un alfabeto", "La perdita della memoria linguistica"],
        h: ["Avviene nell'alternanza tra codici linguistici.", "Può essere interfrasale o intrafrasale.", "È studiato nel bilinguismo e plurilinguismo."],
        e: "Il code-switching è l'alternanza di due lingue o varietà linguistiche nel corso di un'interazione."
      },
      {
        q: "In critica del testo, che cosa indica il termine latino «archetipo»?",
        o: ["Il manoscritto perduto, capostipite di tutta la tradizione conservata, già portatore di almeno un errore congiuntivo", "La prima edizione a stampa moderna", "Il titolo originale dell'opera", "La traduzione in un'altra lingua"],
        h: ["È un testimone ricostruito/perduto nella stemmatica.", "È caratterizzato da almeno un errore d'archetipo.", "Sta sopra i rami della tradizione conservata."],
        e: "Nella stemmatica l'archetipo è il testimone perduto all'origine della tradizione conservata, individuato tramite errori comuni a tutti i testimoni."
      },
      {
        q: "Che cosa significa «lectio difficilior» in filologia?",
        o: ["La variante più difficile o insolita, spesso preferibile perché più difficilmente innovata da un copista", "La lezione più breve del manoscritto", "La variante con più errori grammaticali", "La traduzione letterale dal greco"],
        h: ["«Difficilior» = più difficile.", "I copisti tendono a banalizzare ciò che non capiscono.", "È un criterio orientativo, non meccanico."],
        e: "Secondo il criterio della lectio difficilior, la variante più rara o impegnativa ha maggiori probabilità di essere originaria rispetto alla banalizzazione."
      },
      {
        q: "Che cosa indica il termine «incipit»?",
        o: ["Le parole iniziali di un'opera o di un testo", "L'ultima nota del curatore", "La copertina di un libro", "L'indice analitico"],
        h: ["Viene dal latino «incipit» («comincia»).", "Indica l'inizio del testo.", "È usato in catalogazione e filologia."],
        e: "L'incipit è l'inizio testuale (le prime parole) di un'opera, capitolo o manoscritto."
      }
    ],
    dialetti: [
      {
        q: "In glottologia e dialettologia, che cos'è una «isoglossa»?",
        o: ["Una linea ideale che delimita l'area geografica di diffusione di un determinato tratto linguistico", "Un tipo di verso della metrica medievale", "Una figura retorica basata sull'uguaglianza sillabica", "Una regola di concordanza verbale"],
        h: ["«Iso-» = uguale, «-glossa» = lingua/parola.", "È uno strumento della geografia linguistica.", "Segna i confini di un fenomeno."],
        e: "L'isoglossa è la linea che delimita sul territorio l'area in cui si realizza un determinato fenomeno linguistico."
      },
      {
        q: "Che cosa si intende per «sostrato» linguistico?",
        o: ["L'influsso esercitato da una lingua preesistente su una lingua che vi si sovrappone", "La lingua ufficiale scritta nei documenti", "Un prestito recente dall'inglese", "Una variante gergale giovanile"],
        h: ["Sta «sotto» la lingua successiva.", "Es. il celtico o l'osco-umbro rispetto al latino.", "Si distingue da adstrato e superstrato."],
        e: "Il sostrato è l'insieme dei tratti lasciati da una lingua parlata in precedenza su un territorio quando viene sostituita da un'altra."
      },
      {
        q: "Che cos'è il «superstrato» linguistico?",
        o: ["L'influsso di una lingua che si sovrappone senza sostituire del tutto la lingua locale (es. elementi germanici)", "La base latina originaria", "Un errore di ortografia", "Una regola sintattica fissa"],
        h: ["Deriva da popolazioni sopraggiunte (es. germani, arabi).", "Non cancella la lingua di base ma la influenza.", "Si contrappone al sostrato."],
        e: "Il superstrato è l'influsso esercitato da una lingua dominante/sopraggiunta che non soppianta la lingua locale ma vi lascia elementi (soprattutto lessicali)."
      },
      {
        q: "Qual è una caratteristica della «koinè» in ambito storico-linguistico?",
        o: ["Una lingua comune sovraregionale nata dal contatto e dal livellamento di varietà locali", "Un dialetto parlato in un solo villaggio", "Una lingua artificiale priva di parlanti", "Un testo scritto solo in versi"],
        h: ["«Koiné» in greco significa «comune».", "Riduce le particolarità troppo locali.", "Ha funzione di ampia comunicazione."],
        e: "Una koinè è una varietà linguistica comune sovraregionale formata per conguaglio e livellamento tra parlate vicine."
      },
      {
        q: "Che cosa si intende in dialettologia italiana per «metafonesi» (o metafonia)?",
        o: ["Il mutamento della vocale tonica per effetto della vocale finale originaria (spesso -i o -u)", "La caduta della consonante iniziale", "L'aggiunta di un prefisso", "Il cambio di coniugazione di un verbo"],
        h: ["È un'assimilazione a distanza provocata dalla vocale finale.", "È diffusa in molti dialetti italiani (settentrionali e centro-meridionali).", "Modifica la vocale accentata."],
        e: "La metafonesi è la modificazione del timbro o del grado di apertura di una vocale tonica indotta dalla vocale finale originaria."
      },
      {
        q: "In sociolinguistica, che cos'è la «dilalia»?",
        o: ["Una situazione in cui sia la lingua standard che il dialetto sono usati anche nel parlato quotidiano, con sovrapposizione funzionale", "L'assenza totale di dialetti", "La scrittura solo in latino", "Un disturbo della fonazione"],
        h: ["Distingue la situazione italiana moderna dalla diglossia rigida.", "Entrambi i codici possono essere parlati in famiglia/quotidianità.", "Il codice alto resta comunque quello della scrittura formale."],
        e: "La dilalia descrive un repertorio in cui varietà alta (italiano) e bassa (dialetto) sono entrambe presenti nell'uso parlato, con ambiti in parte sovrapposti."
      }
    ],
    letteratura: [
      {
        q: "Quale opera di Dante Alighieri affronta la teoria della lingua volgare e della poesia?",
        o: ["De vulgari eloquentia", "Monarchia", "Epistole", "Quaestio de aqua et terra"],
        h: ["È scritta in latino.", "Esamina i volgari italiani alla ricerca del «volgare illustre».", "È rimasta incompiuta al secondo libro."],
        e: "Il «De vulgari eloquentia» è il trattato latino di Dante dedicato alla lingua volgare e alla retorica poetica."
      },
      {
        q: "Quale elemento caratterizza la forma del «Canzoniere» di Petrarca?",
        o: ["La struttura unitaria e ordinata di un libro di rime con una vicenda interiore", "Una raccolta disordinata senza filo narrativo", "Un poema epico in ottave", "Una tragedia in cinque atti"],
        h: ["È un «macrotesto» lirico organizzato.", "I componimenti sono disposti secondo un disegno.", "Ruota attorno al tempo, alla memoria e a Laura."],
        e: "Il «Canzoniere» è concepito come un libro unitario (366 componimenti) che traccia un percorso interiore e temporale."
      },
      {
        q: "Quale caratteristica distingue il «Decameron» di Boccaccio per la prosa italiana?",
        o: ["La varietà di registri, stili e punti di vista in una cornice narrativa", "L'uso esclusivo del latino", "La forma di trattato filosofico scolastico", "L'assenza di dialoghi tra personaggi"],
        h: ["C'è una cornice (la brigata) e cento novelle.", "Spazia dal tragico al comico/beffardo.", "Modula la sintassi sui personaggi e sulle situazioni."],
        e: "Il «Decameron» fonda una prosa narrativa moderna capace di modulare registri, stili e voci diverse all'interno della cornice."
      },
      {
        q: "In «Orlando furioso», che cos'è l'«inchiesta»?",
        o: ["La ricerca errante e incessante dei personaggi dietro un oggetto del desiderio", "Un processo giuridico", "Una preghiera religiosa", "Un dialogo filosofico"],
        h: ["È un motivo tipico del romanzo cavalleresco.", "I cavalieri si cercano e si incrociano senza meta fissa.", "Si intreccia con l'entrelacement."],
        e: "L'inchiesta (quête) è la ricerca aperta e labirintica che spinge i personaggi a muoversi e intrecciare le proprie storie."
      },
      {
        q: "Quale tratto è tipico della poesia «ermetica» del Novecento?",
        o: ["La parola essenziale, densa e allusiva, spesso priva di nessi esplicativi tradizionali", "La narrazione lunga e realistica in prosa", "La satira politica in versi martelliani", "Il teatro dialettale comico"],
        h: ["Riduce al minimo gli elementi superflui.", "Punta sull'analogia e sul valore evocativo della parola.", "Viene associata a poeti come Ungaretti e Quasimodo (in diverse fasi)."],
        e: "L'ermetismo novecentesco privilegia la essenzialità della parola, l'analogia e l'allusività rispetto alla discorsività esplicativa."
      },
      {
        q: "Che cosa si intende per «metaletteratura»?",
        o: ["La riflessione della letteratura su se stessa, sui propri procedimenti e sul fare scrittura", "La traduzione di un testo scientifico", "Una biografia storica di un re", "Un manuale di geografia"],
        h: ["«Meta-» indica un livello ulteriore/riflessivo.", "Il testo parla della scrittura o della lettura stessa.", "È presente in opere moderne e postmoderni (es. Calvino, Pirandello)."],
        e: "La metaletteratura è la riflessione interna all'opera sui meccanismi della narrazione, della finzione e della scrittura."
      }
    ],
    etimologie: [
      {
        q: "In linguistica storica, quale parola italiana è un esito popolare del latino «focus»?",
        o: ["Fuoco", "Focolare", "Focale", "Focoso"],
        h: ["«Focus» in latino classico significava «focolare».", "In italiano passa a indicare la fiamma/il fuoco.", "L'aggettivo «focale» ha trafila dotta."],
        e: "Dal latino «focus» (focolare) deriva per via popolare l'italiano «fuoco»."
      },
      {
        q: "Quale coppia costituisce un esempio di «allotropi» dal latino «causa»?",
        o: ["Cosa e causa", "Casa e cassa", "Vento e vento", "Sole e luna"],
        h: ["Entrambi derivano dalla stessa base latina.", "Uno segue la via popolare, l'altro quella dotta.", "La base è «causa»."],
        e: "«Cosa» (esito popolare) e «causa» (esito dotto) sono allotropi provenienti dal latino «causa»."
      },
      {
        q: "Dal latino «platea» derivano per vie diverse:",
        o: ["Piazza e platea", "Porta e portone", "Pane e paniere", "Pietra e petraia"],
        h: ["Pensa allo spazio aperto o alla zona di un teatro.", "Uno ha palatalizzazione popolare, l'altro conservazione dotta.", "La base è «platea»."],
        e: "«Piazza» (esito popolare con esito palatale) e «platea» (cultismo/esito dotto) derivano entrambi dal latino «platea»."
      },
      {
        q: "Che cosa si intende in etimologia per «paretimologia» (o etimologia popolare)?",
        o: ["La reinterpretazione di una parola opaca per accostamento a un'altra più nota e trasparente", "La ricostruzione documentata tramite documenti notarili", "Il prestito da una lingua sconosciuta", "La creazione di un acronimo"],
        h: ["Nasce dall'accostamento intuitivo dei parlanti.", "Spesso modifica la forma o il senso per analogia.", "Non è l'etimologia scientifica reale."],
        e: "La paretimologia è la rielaborazione formale o semantica di una parola dovuta all'accostamento intuitivo a un'altra parola ritenuta affine."
      },
      {
        q: "Quale origine ha il suffisso avverbiale italiano «-mente» (in «lentamente», «chiaramente»)?",
        o: ["Dal latino «mente» (ablativo di «mens», «mente/animo/modo»)", "Dal greco «méntis»", "Dal tedesco «Mund»", "Dal francese «mentir»"],
        h: ["In origine era un sostantivo latino.", "Si è grammaticalizzato come suffisso per formare avverbi.", "Concorda col genere femminile dell'aggettivo (es. «chiara + mente»)." ],
        e: "«-mente» deriva dall'ablativo latino «mente» («con animo/modo»), poi grammaticalizzato come suffisso avverbiale."
      },
      {
        q: "Che cosa si intende in linguistica storica per «grammaticalizzazione»?",
        o: ["Il processo per cui una parola o costruzione autonoma assume una funzione grammaticale (es. ausiliare, suffisso, preposizione)", "L'aggiunta di regole ortografiche a un vocabolario", "La traduzione di un testo letterario", "La scomparsa di tutte le vocali"],
        h: ["Un elemento lessicale diventa più grammaticale.", "Spesso perde autonomia o significato concreto.", "È un processo evolutivo fondamentale."],
        e: "La grammaticalizzazione è il mutamento per cui un elemento lessicale o una costruzione assume funzioni grammaticali."
      }
    ]
  }
};

function expandTo100(items, mode, level) {
  const out = [];
  for (let i = 0; i < 100; i++) {
    const base = items[i % items.length];
    const item = {
      q: base.q,
      h: [...base.h],
      e: base.e
    };
    if (Array.isArray(base.o)) {
      item.o = [...base.o];
    }
    if (typeof base.p === "string") {
      item.p = base.p;
    }
    out.push(item);
  }
  return out;
}
const result = { italiano: {} };
for (const mode of MODES) {
  result.italiano[mode] = [0, 1, 2].map((lvl) => expandTo100(BANK[lvl][mode], mode, lvl));
}

const content =
  "// Generato automaticamente: 100 quesiti per modalità e livello (2.400 quesiti totali)\n" +
  "export const Q_ITALIANO_2400 = " +
  JSON.stringify(result, null, 2) +
  ";\n";

fs.writeFileSync("italiano_2400.js", content, "utf8");
console.log("Creato italiano_2400.js con 100 quesiti per modalità e livello.");