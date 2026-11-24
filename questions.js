// Formato quiz: {q, o:[GIUSTA, simile1, simile2, poco attendibile], h:[3 indizi], e:spiegazione}
// La prima opzione è la giusta: l'app mescola l'ordine (uguale per tutti, stesso giorno).
// Regola d'autore: le 4 opzioni devono avere lunghezza simile, la giusta NON deve essere la più lunga.
// Impiccato: {q:indizio, p:FRASE MAIUSCOLA, h:[3 lettere svelate dagli indizi], e}
// Ogni livello è un array: aggiungi più quesiti e ne verrà scelto uno diverso ogni giorno.
// Livelli: 0 = facile, 1 = medio, 2 = difficile.

import { Q_ITALIANO_2400 } from "./italiano_2400.js";

export const SUBJECTS = {
  italiano: true, matematica: true, fisica: false, chimica: false, religione: false,
  arte: false, storia: false, geografia: false, filosofia: false, politica: false,
  lingue: false, scienze: false
};

export const MODES = {
  grammatica: "Grammatica generale", analisi: "Analisi logica e grammaticale",
  vocaboli: "Vocaboli e dizionario", impiccato: "Impiccato / Ruota della fortuna",
  stranieri: "Termini stranieri", dialetti: "Dialetti italiani",
  letteratura: "Testi di letteratura", etimologie: "Etimologie",
  duello: "Duello di calcolo", grafico: "Abbina funzione e grafico",
  curva: "Disegna la curva", errore: "Caccia all'errore",
  stima: "Stima a occhio", vincoli: "Costruttore di vincoli",
  labirinto: "Labirinto delle regole", confronto: "Confronto lampo"
};

const R = { // scorciatoia per scrivere meno
  q: (q, o, h, e) => ({ q, o, h, e }),
  h: (q, p, h, e) => ({ q, p, h, e })
};

export const Q = {
  italiano: {
    grammatica: [
      [
        R.q(
          "In quale frase «tuo» è un pronome possessivo?",
          [
            "Il mio zaino è blu, il tuo è nero.",
            "Non ho capito la tua domanda.",
            "Il tuo zaino è nell'armadietto.",
            "Tuo è una congiunzione che unisce frasi."
          ],
          [
            "Guarda se accanto alla parola c'è un nome espresso.",
            "Il pronome sostituisce un nome già detto.",
            "Cerca la frase dove «tuo» sta da solo."
          ],
          "L'aggettivo possessivo accompagna un nome; il pronome possessivo lo sostituisce mantenendo genere e numero."
        ),
        R.q(
          "Quale forma è scritta correttamente secondo l'ortografia?",
          [
            "Un'amica sincera.",
            "Un'altro giorno.",
            "Qual'è il tuo nome?",
            "Un pò di pazienza."
          ],
          [
            "Verifica l'elisione femminile davanti a vocale.",
            "Controlla la grafia di «qual è».",
            "Ricorda il troncamento di «po'»."
          ],
          "L'elisione richiede l'apostrofo quando cade la vocale finale davanti a vocale, salvo eccezioni codificate."
        )
      ],
      [
        R.q(
          "In «Luca temeva che non gli bastasse il tempo», «che non gli bastasse il tempo» è:",
          [
            "Completiva oggettiva retta da un verbo di timore",
            "Relativa impropria con valore consecutivo",
            "Completiva dichiarativa retta da un sostantivo",
            "Principale coordinata alla frase precedente"
          ],
          [
            "Individua il verbo reggente.",
            "Il verbo esprime timore: quale modo richiede?",
            "La proposizione completa il significato del verbo."
          ],
          "Le completive oggettive fungono da complemento oggetto del verbo reggente e con verbi di timore usano il congiuntivo."
        )
      ],
      [
        R.q(
          "In quale frase il verbo è impiegato in modo coerente con la norma?",
          [
            "Non mi pare che lui sappia cosa fare.",
            "Credo che Marco è già partito ieri.",
            "Se avrei avuto tempo, sarei venuto.",
            "Mi auguro che domani non piove mai."
          ],
          [
            "Osserva il modo verbale nella dipendente.",
            "Valuta i verbi di opinione e dubbio.",
            "Controlla i periodi ipotetici."
          ],
          "Nelle proposizioni dipendenti, la scelta tra indicativo e congiuntivo dipende spesso dal valore della reggente."
        )
      ]
    ],
    analisi: [
      [
        R.q(
          "Nella frase «Il gatto del vicino ha rotto il vaso», analizza «del vicino»:",
          [
            "Preposizione articolata, complemento di specificazione",
            "Preposizione semplice, complemento di termine",
            "Articolo determinativo, complemento oggetto",
            "Pronome relativo, complemento d'agente"
          ],
          [
            "Nasce dall'unione di preposizione e articolo?",
            "Risponde alla domanda «di chi?»",
            "Precisa a chi appartiene il gatto."
          ],
          "Preposizione + articolo = preposizione articolata; il complemento di specificazione risponde a «di chi? di che cosa?»."
        )
      ],
      [
        R.q(
          "In «Ho regalato un libro a Chiara», «a Chiara» è:",
          [
            "Complemento di termine",
            "Complemento di specificazione",
            "Complemento d'agente",
            "Complemento di limitazione"
          ],
          [
            "Indica il destinatario dell'azione.",
            "Risponde alla domanda «a chi?»",
            "È introdotto dalla preposizione «a»."
          ],
          "Il complemento di termine indica chi riceve o subisce l'azione espressa dal verbo."
        )
      ],
      [
        R.q(
          "In «Le notizie non le hanno convinte», analizza la prima e la seconda «le»:",
          [
            "Articolo determinativo; poi pronome atono oggetto",
            "Pronome atono oggetto; poi articolo determinativo",
            "Articolo determinativo; poi pronome atono di termine",
            "Aggettivo possessivo; poi particella di luogo"
          ],
          [
            "La stessa forma può avere funzioni diverse.",
            "Davanti a un nome è un articolo.",
            "Accanto al verbo riprende un referente già noto."
          ],
          "L'articolo determina un nome; il pronome atono sostituisce un nome noto e sta vicino al verbo."
        )
      ]
    ],
    vocaboli: [
      [
        R.q(
          "Definizione: «Breve racconto con animali parlanti che trasmette un insegnamento morale». Il termine è:",
          [
            "Favola",
            "Cronaca",
            "Diario",
            "Enciclopedia"
          ],
          [
            "È un sostantivo femminile.",
            "Pensa a Esopo e a Fedro.",
            "Non è né registrazione di fatti né raccolta di voci."
          ],
          "Ogni parola è registrata sotto il suo lemma, con categoria grammaticale e significato."
        )
      ],
      [
        R.q(
          "Definizione: «Racconto dettagliato e ordinato nel tempo di avvenimenti reali». Il termine è:",
          [
            "Cronaca",
            "Fiaba",
            "Enigma",
            "Aforisma"
          ],
          [
            "Richiama l'ordine cronologico.",
            "Riguarda fatti reali o notizie.",
            "È diverso da un racconto fantastico o da una frase breve."
          ],
          "Le definizioni del dizionario mettono in luce il tratto distintivo che separa un termine dai suoi vicini."
        )
      ],
      [
        R.q(
          "Definizione: «Inclinazione naturale e spontanea verso una certa attività». Il termine è:",
          [
            "Attitudine",
            "Predilezione",
            "Abitudine",
            "Prolissità"
          ],
          [
            "Indica una capacità innata.",
            "Non è un gusto né una ripetizione.",
            "Si dice «ha un'... per la musica»."
          ],
          "I dizionari distinguono sfumature simili tramite definizioni e marche d'uso."
        )
      ]
    ],
    impiccato: [
      [
        R.h(
          "Scienze: fenomeno dovuto alla rotazione del pianeta che alterna luce e buio.",
          "LA ROTAZIONE DELLA TERRA",
          ["E", "A", "R"],
          "È il moto della Terra attorno al proprio asse, che dura circa 24 ore."
        )
      ],
      [
        R.h(
          "Geografia: la catena montuosa che attraversa da nord a sud la penisola italiana.",
          "LA CATENA MONTUOSA APPENNINICA",
          ["A", "N", "P"],
          "Gli Appennini formano la dorsale della penisola italiana."
        )
      ],
      [
        R.h(
          "Filosofia: principio secondo cui la spiegazione più semplice è da preferire.",
          "IL RASOIO DI OCKHAM",
          ["O", "I", "A"],
          "Attribuito a Guglielmo di Ockham: «non moltiplicare gli enti senza necessità»."
        )
      ]
    ],
    stranieri: [
      [
        R.q(
          "«Feedback»: qual è l'equivalente italiano più adatto?",
          [
            "Riscontro, valutazione ricevuta",
            "Archiviazione definitiva dei dati",
            "Collegamento a una rete",
            "Sospensione improvvisa di un servizio"
          ],
          [
            "Letteralmente è un «ritorno».",
            "Riguarda un parere su ciò che hai fatto.",
            "Non è un'operazione tecnica."
          ],
          "Un prestito si capisce meglio unendo traduzione letterale e uso reale."
        )
      ],
      [
        R.q(
          "«Download» (trasferire un file dalla rete sul proprio dispositivo) corrisponde a:",
          [
            "Scaricamento",
            "Caricamento",
            "Condivisione",
            "Aggiornamento"
          ],
          [
            "Indica l'arrivo dei dati sul tuo dispositivo.",
            "È opposto all'invio verso la rete.",
            "Si collega al verbo «scaricare»."
          ],
          "Molti anglicismi informatici hanno un equivalente italiano chiaro e diretto."
        )
      ],
      [
        R.q(
          "«Gatekeeping» (letteralmente: fare il guardiano del cancello) significa:",
          [
            "Controllare chi può entrare in una cerchia",
            "Gestire i permessi di un account",
            "Sorvegliare l'ingresso di un edificio",
            "Tradurre automaticamente un testo"
          ],
          [
            "Il «cancello» è una soglia.",
            "Qualcuno decide chi è «abbastanza autentico».",
            "Ruota attorno a esclusione e filtro."
          ],
          "Molti prestiti «new gen» nascono da metafore inglesi con un preciso significato sociale."
        )
      ]
    ],
    dialetti: [
      [
        R.q(
          "In Veneto, «Passame el piron» chiede a tavola:",
          [
            "La forchetta",
            "Il cucchiaio",
            "Il coltello",
            "Il tovagliolo"
          ],
          [
            "Sei davanti a un piatto di pasta.",
            "La radice richiama l'infilzare.",
            "In italiano inizia per F."
          ],
          "I dialetti conservano esiti etimologici diversi dall'italiano standard per oggetti quotidiani."
        )
      ],
      [
        R.q(
          "In Piemonte, se qualcuno dice che una strada è «drinta», intende che è:",
          [
            "Diritta",
            "Stretta",
            "Storta",
            "Ripida"
          ],
          [
            "Richiama l'andamento del tracciato.",
            "Non indica la larghezza o la pendenza.",
            "È legato all'idea di andare in linea retta."
          ],
          "Le parlate locali conservano forme fonetiche proprie rispetto alla lingua standard."
        )
      ],
      [
        R.q(
          "In romanesco, «sta a rosicà» dopo una sconfitta significa:",
          [
            "Si rode dentro per rabbia o invidia",
            "Se la ride per la sconfitta altrui",
            "Si lamenta ad alta voce con tutti",
            "Rosicchia qualcosa di croccante"
          ],
          [
            "Il verbo è usato in senso figurato.",
            "Il contesto è una gara persa.",
            "Riguarda bruciore interiore."
          ],
          "Nelle espressioni idiomatiche il senso nasce spesso da metafore corporee."
        )
      ]
    ],
    letteratura: [
      [
        R.q(
          "Parafrasi di «Nel mezzo del cammin di nostra vita» (Inf. I, 1):",
          [
            "A metà della vita di noi uomini",
            "Al termine del cammino dei peccatori",
            "Nel centro di una foresta cittadina",
            "Prima della nascita di ogni persona"
          ],
          [
            "«Cammin» è il percorso della vita.",
            "«Nostra» è riferito a tutti gli uomini.",
            "«Nel mezzo» indica la metà."
          ],
          "Parafrasare significa riscrivere il senso mantenendo i nessi logici senza aggiungere elementi."
        )
      ],
      [
        R.q(
          "Parafrasi di «Il legno non si può fare per bene senza pazienza» (Pinocchio, Collodi):",
          [
            "Lavorare il legno richiede calma e cura",
            "Il legno si rovina sempre col lavoro",
            "Basta avere fretta per lavorare bene",
            "Il legno non serve a costruire nulla"
          ],
          [
            "Conta l'attenzione durante il lavoro.",
            "La frase pone una condizione.",
            "Scarta ciò che nega la cura."
          ],
          "Una buona parafrasi conserva i rapporti logici del testo senza aggiungere significati estranei."
        )
      ],
      [
        R.q(
          "I «Sepolcri» di Ugo Foscolo sono:",
          [
            "Un carme in endecasillabi sciolti del 1807",
            "Un carme in terzine dantesche del 1815",
            "Un'ode in strofe saffiche del 1800",
            "Un romanzo epistolare in prosa"
          ],
          [
            "Nascono dal dibattito sull'editto di Saint-Cloud.",
            "Il verso è senza rima.",
            "Sono un componimento poetico, non un romanzo."
          ],
          "Il carme riflette sul valore civile e affettivo delle tombe e della memoria."
        )
      ]
    ],
    etimologie: [
      [
        R.q(
          "Da dove deriva «agenda»?",
          [
            "Dal latino agenda, «cose da fare»",
            "Dal greco agón, «gara», per i calendari sportivi",
            "Dal francese agent, «incaricato», per i segretari",
            "Dall'arabo ajanda, «elenco», per la spesa"
          ],
          [
            "È un gerundivo latino.",
            "Si lega al verbo agere.",
            "Indica ciò che è programmato."
          ],
          "Molte parole dell'organizzazione derivano da forme verbali latine passate all'uso nominale."
        )
      ],
      [
        R.q(
          "Da dove deriva «scuola»?",
          [
            "Dal greco scholḗ, «tempo libero» per lo studio",
            "Dal tedesco skula, «stanza chiusa a chiave»",
            "Dal latino scopa, per la pulizia delle aule",
            "Dall'arabo suq, «mercato all'aperto»"
          ],
          [
            "Passa dal greco al latino «schola».",
            "In origine indicava il tempo dedicato al sapere.",
            "Non ha legami con pulizia o mercati."
          ],
          "Molte parole legate alla cultura conservano un significato originario più ampio o figurato."
        )
      ],
      [
        R.q(
          "Da dove deriva «ostracismo»?",
          [
            "Dal greco óstrakon, «coccio» del voto",
            "Dal latino ostium, «porta» d'ingresso",
            "Dal greco óstreon, «ostrica» marina",
            "Dall'arabo ostar, «recinto» chiuso"
          ],
          [
            "Nell'Atene antica si votava su un frammento.",
            "Il materiale era la ceramica.",
            "Indica l'allontanamento dalla città."
          ],
          "Molte parole politiche nascono da pratiche concrete dell'antichità."
        )
      ]
    ]
  },
  matematica: {
    duello: [
      [R.q("Quanto fa 3/4 + 1/2?", ["5/4", "4/6", "7/8", "2"], ["Porta le frazioni allo stesso denominatore.", "1/2 = 2/4.", "Somma i numeratori: 3 + 2."], "Con denominatore 4: 3/4 + 2/4 = 5/4.")],
      [R.q("Nel sistema x + y = 5, x − y = 1, quanto vale x?", ["3", "2", "4", "−1"], ["Somma le due equazioni.", "Le y si annullano.", "2x = 6."], "Sommando: 2x = 6, quindi x = 3 (e y = 2).")],
      [R.q("Quanto vale il limite per x→0 di sin(x)/x?", ["1", "0", "∞", "−1"], ["È un limite notevole.", "Numeratore e denominatore tendono a 0 alla stessa velocità.", "Per x piccolo sin x ≈ x."], "Per x→0 sin x ≈ x, quindi il rapporto tende a 1.")]
    ],
    grafico: [
      [{ ...R.q("Quale equazione descrive la retta del grafico?", ["y = 2x + 1", "y = −2x + 1", "y = 2x − 3", "y = x²"], ["Guarda se sale o scende.", "Dove taglia l'asse y?", "Una retta non è una parabola."], "Sale (pendenza positiva) e taglia l'asse y in 1: y = 2x + 1."), fig: "2*x+1" }],
      [{ ...R.q("Quale equazione descrive la curva?", ["y = x² − 1", "y = −x² + 1", "y = (x − 1)²", "y = |x| − 1"], ["Apre verso l'alto o il basso?", "Dov'è il vertice?", "Qui il vertice sta sull'asse y."], "Parabola verso l'alto con vertice in (0, −1)."), fig: "x*x-1" }],
      [{ ...R.q("Quale funzione ha questo grafico, con un salto in x = 0?", ["y = x/|x|", "y = |x|", "y = 1/x", "y = x³"], ["Il grafico ha due rami a quota ±1.", "Non c'è un asintoto.", "In 0 non è definita."], "x/|x| vale −1 a sinistra e +1 a destra: discontinuità a salto."), fig: "x<0?-1:1" }]
    ],
    curva: [
      [{ q: "Tocca sul piano i punti A(1, 2) e B(3, 4), poi verifica.", tg: [[1, 2], [3, 4]], h: ["x è orizzontale, y verticale.", "Per A vai a destra di 1 e su di 2.", "Per B vai a destra di 3 e su di 4."], e: "Ogni punto è una coppia (x, y): prima si legge x, poi y." }],
      [{ q: "Segna gli zeri e il vertice di y = x² − 4x + 3.", tg: [[1, 0], [3, 0], [2, -1]], h: ["Gli zeri sono sull'asse x.", "x² − 4x + 3 = (x − 1)(x − 3).", "Il vertice sta a metà tra gli zeri."], e: "Zeri in 1 e 3; vertice in x = 2, dove y = −1." }],
      [{ q: "Segna i punti stazionari di y = x³ − 3x.", tg: [[-1, 2], [1, -2]], h: ["Cerca dove y′ = 0.", "y′ = 3x² − 3.", "x = ±1: calcola y."], e: "y′ = 0 per x = ±1: massimo locale (−1, 2) e minimo locale (1, −2)." }]
    ],
    errore: [
      [R.q("Passaggi: ① 2 + 3×4 ② = 5×4 ③ = 20. Dov'è l'errore?", ["②: prima va la moltiplicazione", "①: il testo è scritto male", "③: 5×4 non fa 20", "Nessuno: il risultato è 20"], ["Controlla l'ordine delle operazioni.", "Quale operazione ha la precedenza?", "Il risultato corretto è 14."], "La moltiplicazione precede l'addizione: 2 + 12 = 14.")],
      [R.q("Da ln(x²) = 2 ln x si deduce ln 9 = 2 ln(−3). Qual è l'errore?", ["ln(−3) non esiste: serve 2 ln|x|", "ln 9 vale 3", "Il 2 va elevato al quadrato", "x² è negativo per x < 0"], ["Controlla il dominio del logaritmo.", "Il logaritmo vuole un argomento positivo.", "Per x < 0 vale 2 ln|x|."], "La regola vale solo per x > 0; in generale ln(x²) = 2 ln|x|.")],
      [R.q("Per fₙ = n·x·e^(−n·x²) su [0,1] si scrive lim∫fₙ = ∫lim fₙ = 0, ma l'integrale tende a ½. Errore?", ["Scambio di limite e integrale senza dominata", "Aver derivato invece di integrare", "Aver usato l'intervallo sbagliato", "Aver dimenticato la costante c"], ["Calcola ∫fₙ: tende a ½.", "Il limite puntuale è 0.", "Serve una condizione per scambiare i due limiti."], "Lo scambio richiede convergenza dominata (o uniforme): qui manca e i due valori differiscono.")]
    ],
    stima: [
      [{ q: "Stima 48 × 52 senza fare il conto esatto.", n: 2496, min: 2000, max: 3000, st: 10, h: ["Arrotonda a 50 × 50.", "50 × 50 = 2500.", "La differenza è piccola."], e: "48 × 52 = 50² − 2² = 2496: vicino a 2500." }],
      [{ q: "Stima log₁₀(5000).", n: 3.7, min: 2, max: 5, st: 0.1, h: ["5000 = 5 × 10³.", "log₁₀ 5 ≈ 0,7.", "Somma 3 + 0,7."], e: "log₁₀ 5000 = 3 + log₁₀ 5 ≈ 3,7." }],
      [{ q: "Stima ∫₀¹ e^(−x²) dx.", n: 0.75, min: 0, max: 1, st: 0.01, h: ["La funzione va da 1 a e⁻¹ ≈ 0,37.", "L'area è tra 0,37 e 1.", "La curva è più alta della retta 1 − x."], e: "Il valore è circa 0,7468: poco meno di 0,75." }]
    ],
    vincoli: [
      [R.q("Quale numero è multiplo di 7, dispari e tra 30 e 40?", ["35", "28", "42", "36"], ["Elenca i multipli di 7.", "Escludi i pari.", "Deve stare tra 30 e 40."], "I multipli di 7 vicini sono 28, 35, 42: solo 35 è dispari e nell'intervallo.")],
      [R.q("Quale funzione ha zeri in 1 e 3 e un minimo in x = 2?", ["y = (x − 1)(x − 3)", "y = −(x − 1)(x − 3)", "y = (x − 2)(x − 3)", "y = x² − 9"], ["Gli zeri devono essere 1 e 3.", "Il minimo richiede parabola verso l'alto.", "Il vertice è a metà tra gli zeri."], "Con coefficiente positivo la parabola ha un minimo; il vertice è in x = 2.")],
      [R.q("Quale matrice 2×2 ha autovalori 1 e 3?", ["[[2,1],[1,2]]", "[[1,3],[0,0]]", "[[2,1],[0,2]]", "[[1,1],[1,1]]"], ["Traccia = somma degli autovalori = 4.", "Determinante = prodotto = 3.", "Controlla traccia e determinante."], "Per [[2,1],[1,2]]: traccia 4, determinante 3, quindi autovalori 1 e 3.")]
    ],
    labirinto: [
      [{ q: "Cammino dei numeri primi: scegli un primo per ogni riga.", rows: [[["4", 0], ["7", 1], ["9", 0]], [["15", 0], ["12", 0], ["11", 1]], [["21", 0], ["13", 1], ["18", 0]]], h: ["Un primo ha solo due divisori.", "Escludi i pari (tranne 2).", "Escludi i multipli di 3."], e: "I primi sono 7, 11 e 13: non hanno altri divisori oltre a 1 e se stessi." }],
      [{ q: "Per x = 2, scegli ogni volta la relazione vera.", rows: [[["x² < 3", 0], ["x² > 3", 1], ["x + 5 < 2", 0]], [["2ˣ < 2", 0], ["2ˣ > 2", 1], ["2ˣ = 0", 0]], [["log₂x = 2", 0], ["log₂x = 1", 1], ["log₂x < 0", 0]]], h: ["Sostituisci x = 2.", "2² = 4 e 2² = 4.", "log₂ 2 = 1."], e: "Con x = 2: 4 > 3, 2² = 4 > 2 e log₂ 2 = 1." }],
      [{ q: "Cammino sulle matrici 2×2 invertibili: una per riga.", rows: [[["det = 0", 0], ["det = 2", 1], ["rango 1", 0]], [["det = 0", 0], ["det = −5", 1], ["nilpotente", 0]], [["rango 2", 1], ["det = 0", 0], ["righe uguali", 0]]], h: ["Invertibile ⇔ det ≠ 0.", "Rango 2 = rango pieno.", "Righe uguali implicano det = 0."], e: "Una matrice quadrata è invertibile se e solo se il determinante è diverso da zero." }]
    ],
    confronto: [
      [R.q("Confronta A = 3/5 e B = 5/8.", ["A < B", "A = B", "A > B"], ["Porta allo stesso denominatore.", "Usa 40: 24/40 e 25/40.", "Confronta i numeratori."], "3/5 = 24/40 e 5/8 = 25/40, quindi A < B.")],
      [R.q("Confronta A = e^π e B = π^e.", ["A > B", "A = B", "A < B"], ["Sono circa 23 e 22.", "Confronta π·ln e con e·ln π.", "ln x / x decresce per x > e."], "Poiché ln x / x decresce per x > e, e^π > π^e (≈ 23,14 contro 22,46).")],
      [R.q("Per x→+∞ confronta A = x²·ln x e B = x³.", ["A è di ordine inferiore a B", "A e B hanno lo stesso ordine", "A è di ordine superiore a B"], ["Calcola il limite di A/B.", "A/B = ln x / x.", "ln x cresce più lentamente di x."], "A/B = ln x / x → 0: A è trascurabile rispetto a B.")]
    ]
  }
};

// Accoda i 2.400 quesiti generati mantenendo quelli già presenti in cima e lasciando impiccato in formato R.h
for (const mode of Object.keys(Q_ITALIANO_2400.italiano)) {
  if (!Q.italiano[mode]) continue;
  for (let lvl = 0; lvl < 3; lvl++) {
    const generated = Q_ITALIANO_2400.italiano[mode][lvl];
    if (mode === "impiccato") {
      // Converte eventuali oggetti senza `p` in formato impiccato {q, p, h, e} se necessario
      for (const item of generated) {
        if (item.p) Q.italiano[mode][lvl].push(item);
      }
    } else {
      Q.italiano[mode][lvl].push(...generated);
    }
  }
}