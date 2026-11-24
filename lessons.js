// Contenuti didattici per materia > modalità > livello (0 facile, 1 medio, 2 difficile).
// h = 3 indizi (aiutini, MAI la soluzione) · e = spiegazione generale del concetto (senza i dati del quesito)
// x = esempio svolto con DATI DIVERSI dal quesito; le scene della lezione si separano con " | ".
// Se aggiungi più quesiti per livello, metti own:true nel quesito per usare i suoi h/e/x personali.
const L = (h, e, x) => ({ h, e, x });
const I = (e, x) => ({ e, x }); // impiccato: gli indizi sono le lettere svelate (in questions.js)
export const X = {
 italiano: {
  grammatica: [
   L(["Controlla se dopo la parola compare un nome.", "Prova a togliere la parola: la frase regge ancora?", "Pensa a cosa sostituisce quando sta da sola."], "Il possessivo è aggettivo se accompagna un nome, pronome se lo sostituisce mantenendo genere e numero.", "«Quella è la sua casa, questa è la mia» | «sua casa»: «sua» accompagna il nome, quindi è aggettivo | «la mia» senza nome: sostituisce «casa», quindi è pronome"),
   L(["Chiediti che cosa prova o pensa il soggetto.", "Osserva il modo verbale della subordinata.", "Il verbo principale esprime un sentimento o un'opinione?"], "Le completive oggettive completano un verbo reggente come complemento oggetto; con verbi di timore, speranza o opinione richiedono spesso il congiuntivo.", "«Spero che tu venga» | Che cosa spero? «che tu venga» | È l'oggetto di «spero»: completiva oggettiva al congiuntivo"),
   L(["Distingui norma formale e italiano dell'uso medio.", "Prima di giudicare «errore», cerca attestazioni storiche.", "Il registro (parlato o scritto sorvegliato) conta."], "L'italiano neostandard accoglie nel parlato tratti presenti anche in fasi antiche, che la norma formale sconsiglia nello scritto sorvegliato.", "«Ho incontrato i ragazzi e gli ho parlato» | «gli» sta per «a loro» (la norma vuole «ho parlato loro») | Diffuso nel parlato, da evitare nello scritto formale")
  ],
  analisi: [
   L(["Guarda se la parola unisce una preposizione e un articolo.", "Prova la domanda «di chi?» o «di che cosa?».", "Cerca il nome da cui dipende il complemento."], "Preposizione + articolo formano la preposizione articolata; il complemento di specificazione precisa un nome e risponde a «di chi? di che cosa?».", "«La borsa della nonna è vecchia» | «della» = di + la: preposizione articolata | «della nonna» risponde a «di chi?»: specificazione"),
   L(["La stessa forma può cambiare funzione.", "Un articolo sta davanti a un nome.", "Un pronome atono si appoggia al verbo."], "L'articolo determina un nome; il pronome atono sostituisce un nome già noto e sta vicino al verbo.", "«I libri li leggo» | Il primo «i» è articolo davanti a «libri» | «li» è pronome atono, complemento oggetto che riprende «i libri»"),
   L(["Osserva se il verbo è singolare o plurale.", "Cerca quale nome regge l'accordo.", "Distingui il si passivante dal si impersonale."], "Con il si passivante il nome concorda col verbo e ne è soggetto grammaticale; con il si impersonale il verbo resta alla terza persona singolare.", "«Si vendono libri» | Il verbo è plurale come «libri»: si passivante | «Si vive bene qui»: nessun soggetto, verbo singolare, si impersonale")
  ],
  vocaboli: [
   L(["È un genere di narrazione breve.", "Escludi le registrazioni di fatti reali.", "Spesso porta un insegnamento finale."], "Nel dizionario ogni parola ha lemma, categoria grammaticale e definizione: confrontare la definizione con le parole simili aiuta a scegliere.", "Definizione: «racconto popolare di eventi straordinari tramandato a voce» | Candidati: leggenda, cronaca, saggio | Solo «leggenda» corrisponde alla definizione"),
   L(["Pensa a una capacità innata, non a un'abitudine.", "Escludi i termini dal senso negativo.", "Prova a inserire la parola in una frase."], "Parole vicine hanno sfumature diverse: la definizione e la marca d'uso aiutano a distinguerle.", "Definizione: «scarsa voglia di agire» | Candidati: pigrizia, prudenza, curiosità | Solo «pigrizia» indica inerzia"),
   L(["Cerca la marca storica (ant., lett.).", "Considera il tono: svalutativo o elogiativo?", "Escludi i significati legati a memoria o fretta."], "I dizionari storici segnalano con marche (ant., lett.) le parole antiche e i loro slittamenti di significato.", "Definizione (ant.): «persona saggia e prudente» | Candidati: savio, sciocco, frettoloso | «savio» ha tono positivo e marca antica")
  ],
  impiccato: [
   I("Nell'impiccato si parte dalle lettere più frequenti in italiano (E, A, I, O) e si usano gli indizi per quelle rare.", "Frase: «IL MAR MEDITERRANEO» | Provo la E: compare 3 volte | Con A ed R completo le altre parole"),
   I("Contare le parole e la loro lunghezza aiuta a ipotizzare articoli e preposizioni brevi.", "Frase: «LA TORRE DI PISA» | Parole brevi: LA, DI | Provo A e I, poi le consonanti R e T"),
   I("Le doppie e le lettere rare (Q, Z, H) sono preziose: se escono, riducono molto le possibilità.", "Frase: «IL TEOREMA DI PITAGORA» | Provo E, A, I, O | La Z non c'è, la T sì: completo con R e M")
  ],
  stranieri: [
   L(["Prova a tradurre le due parti della parola.", "Pensa a cosa si dice dopo aver fatto qualcosa.", "Escludi i significati tecnici."], "Un prestito si capisce unendo traduzione letterale e uso reale nella frase.", "«Weekend» = «week» + «end» | Letteralmente «fine della settimana» | In italiano: «fine settimana»"),
   L(["Traduci l'immagine metaforica.", "Pensa a chi decide e a chi resta fuori.", "Considera il contesto di una comunità online."], "Molti prestiti «new gen» nascono da metafore inglesi tradotte alla lettera.", "«Ghosting» da «ghost» (fantasma) | Chi sparisce come un fantasma | In italiano: sparire senza dare spiegazioni"),
   L(["Spezza la parola tedesca in due parti.", "Cerca il senso collettivo e storico.", "Una parte può indicare il tempo."], "Nei prestiti colti la traduzione letterale fa da ponte verso la definizione concettuale.", "«Leitmotiv» = Leit (guida) + Motiv (motivo) | Un tema guida che ritorna in un'opera | In italiano: tema ricorrente")
  ],
  dialetti: [
   L(["Immagina la scena: dove ti trovi?", "Cerca la radice nascosta nella parola.", "Escludi gli oggetti che non servono per mangiare."], "I dialetti conservano esiti etimologici diversi dall'italiano standard: il contesto d'uso aiuta a capire.", "Milanese: «Portami la cadrega» | Il contesto: serve per sedersi | «cadrega» = sedia"),
   L(["Il verbo è usato in senso figurato.", "Quale emozione spinge a questo comportamento?", "Pensa a una situazione di competizione."], "Nelle espressioni idiomatiche il senso nasce da metafore fisiche o corporee.", "Romanesco: «fa' er pesce in barile» | Il pesce nel barile sta fermo e zitto | Significa far finta di niente"),
   L(["Pensa alla situazione in cui la si pronuncia.", "È una voce usata anche nell'italiano regionale.", "Non è un saluto né un lamento."], "Il sardo ha forte autonomia lessicale e molte sue voci passano nell'italiano regionale.", "Sardo: «Gràssias, amigu meu» | Si dice dopo aver ricevuto un favore | «gràssias» = grazie")
  ],
  letteratura: [
   L(["Cerca il soggetto della frase.", "Sostituisci i termini antichi con quelli attuali.", "Mantieni i nessi logici senza aggiungere nulla."], "Parafrasare significa riscrivere il senso con parole attuali mantenendo i nessi logici.", "«Amor, ch'a nullo amato amar perdona» | «a nullo amato» = a nessuno che sia amato | Parafrasi: l'amore non lascia libero chi è amato di non ricambiare"),
   L(["Distingui genere (ode, carme, romanzo) e metro.", "Collega l'opera al suo contesto storico.", "Chiediti se i versi hanno la rima."], "Per riconoscere un'opera contano genere letterario, metro e contesto storico.", "«Il cinque maggio» di Manzoni | Genere: ode, metro: settenari | Contesto: la morte di Napoleone nel 1821"),
   L(["Chi è Bonagiunta e a quale scuola appartiene?", "Che cosa riconosce come novità in Dante?", "Distingui ispirazione interiore e imitazione di modelli."], "Nel canto dei poeti d'amore Dante definisce la poetica stilnovista come fedeltà all'ispirazione interiore.", "Purg. XXVI: Dante incontra Guido Guinizzelli | Lo chiama «padre» dei poeti d'amore | Segna il legame tra Guinizzelli e lo stil novo")
  ],
  etimologie: [
   L(["Cerca una forma verbale latina.", "Il suffisso indica ciò che deve essere fatto.", "Pensa al verbo di base."], "Molte parole derivano da forme verbali latine passate all'uso nominale: il gerundivo indica ciò che va fatto.", "«Leggenda» viene dal latino «legenda» | È il gerundivo di «legere» | Significa «cose da leggere»"),
   L(["Pensa a un oggetto concreto dell'antichità.", "Cerca la lingua d'origine nella radice.", "Collega il significato attuale alla pratica antica."], "Molte parole sociali e politiche nascono da pratiche concrete dell'antichità.", "«Stipendio» dal latino «stipendium» | Da «stips» (moneta) e «pendere» (pesare) | Si pesava il metallo per pagare i soldati"),
   L(["Gli allotropi hanno la stessa base latina.", "Gli esiti divergono per via popolare o dotta.", "Scarta le coppie con basi diverse."], "Gli allotropi sono parole con la stessa base latina ma esiti diversi, per trafila popolare o dotta.", "«Dritto» e «diretto» | Entrambi dal latino «directum» | Via popolare (dritto) e via dotta (diretto)")
  ]
 },
 matematica: {
  duello: [
   L(["Per sommare servono denominatori uguali.", "Cerca un multiplo comune ai denominatori.", "Trasforma le frazioni, poi somma i numeratori."], "Per sommare frazioni si porta tutto a un denominatore comune e si sommano i numeratori.", "2/3 + 1/4 | Denominatore comune 12: 8/12 + 3/12 | Somma: 11/12"),
   L(["Hai due equazioni e due incognite.", "Somma o sottrai le equazioni per eliminare un'incognita.", "Poi sostituisci per trovare l'altra."], "In un sistema lineare si elimina un'incognita sommando o sottraendo le equazioni, poi si ricava l'altra.", "x + y = 9 e x − y = 3 | Sommo: 2x = 12, quindi x = 6 | Sostituisco: y = 3"),
   L(["Numeratore e denominatore tendono entrambi a 0.", "Esistono limiti notevoli da ricordare.", "Vicino al punto prova ad approssimare la funzione."], "Nei limiti con forma 0/0 si usano limiti notevoli o approssimazioni delle funzioni vicino al punto.", "lim x→0 di (1 − cos x)/x² | Per x piccolo cos x ≈ 1 − x²/2 | Il rapporto vale (x²/2)/x² = 1/2")
  ],
  grafico: [
   L(["Guarda se la retta sale o scende.", "Trova dove incontra l'asse y.", "Il coefficiente di x dà la pendenza."], "Nella retta y = mx + q, m è la pendenza (sale se positiva) e q l'intersezione con l'asse y.", "y = −x + 2 | m = −1: la retta scende | q = 2: parte da quota 2 sull'asse y"),
   L(["Apre verso l'alto o verso il basso?", "Dove si trova il vertice?", "Come si sposta il vertice se cambiano i termini?"], "In y = a(x − h)² + k il segno di a dà il verso della parabola e il vertice è (h, k).", "y = −(x − 2)² | a < 0: apre verso il basso | Vertice in (2, 0)"),
   L(["Quanti rami ha il grafico?", "Si avvicina a un valore o va all'infinito?", "Cosa succede nel punto che manca?"], "Una discontinuità è a salto se i limiti destro e sinistro sono finiti ma diversi, di seconda specie se uno è infinito.", "y = 1/(x − 1) | In x = 1 il denominatore si annulla | I limiti vanno a ±∞: asintoto verticale, discontinuità di seconda specie")
  ],
  curva: [
   L(["x si legge sull'asse orizzontale.", "y si legge sull'asse verticale.", "Un valore negativo va a sinistra o in basso."], "Un punto è una coppia (x, y): dall'origine ci si sposta di x in orizzontale e di y in verticale.", "Punto P(−2, 3) | Dall'origine vado a sinistra di 2 | Poi salgo di 3"),
   L(["Gli zeri stanno sull'asse x: quanto vale y lì?", "Prova a scomporre il polinomio.", "Il vertice sta sull'asse di simmetria."], "Gli zeri si trovano risolvendo y = 0; il vertice di una parabola sta a metà tra gli zeri.", "y = x² − 9 | Zeri: x² = 9, quindi x = ±3 | Vertice a metà: x = 0, y = −9"),
   L(["I punti stazionari annullano la derivata.", "Calcola y′ e risolvi y′ = 0.", "Poi calcola y nelle x trovate."], "I punti stazionari si trovano ponendo f′(x) = 0 e calcolando poi f in quei punti.", "y = x² − 4x | y′ = 2x − 4 = 0, quindi x = 2 | y(2) = −4: punto (2, −4)")
  ],
  errore: [
   L(["Rileggi ogni passaggio con calma.", "Ricorda quali operazioni vengono prima.", "Rifai il calcolo da capo e confrontalo."], "Moltiplicazioni e divisioni precedono addizioni e sottrazioni; per trovare un errore si rifà il calcolo passo per passo.", "9 − 3×2 = 6×2 = 12? | Prima la moltiplicazione: 9 − 6 | Il risultato giusto è 3, non 12"),
   L(["Controlla il dominio delle funzioni usate.", "Verifica la regola con un numero negativo.", "Quale proprietà vale solo per x > 0?"], "Molte proprietà (logaritmi, radici) valgono solo con ipotesi sul segno: prima si controlla il dominio.", "«√((−4)²) = −4»? | √16 = 4, non −4 | La regola corretta è √(x²) = |x|"),
   L(["Chi garantisce che lo scambio sia lecito?", "Calcola entrambi i lati e confrontali.", "Cerca l'ipotesi di un teorema che manca."], "Scambiare limite e integrale (o somma e derivata) richiede teoremi come la convergenza dominata o uniforme.", "Serie di potenze su un intervallo | Derivare termine a termine richiede convergenza uniforme | Senza l'ipotesi il risultato può essere falso")
  ],
  stima: [
   L(["Arrotonda i numeri a valori comodi.", "Moltiplica i valori arrotondati.", "L'errore sarà piccolo."], "Per stimare si arrotondano i numeri a valori comodi e si calcola a mente.", "31 × 29 | Arrotondo a 30 × 30 | ≈ 900 (esatto 899)"),
   L(["Scomponi il numero in un prodotto con una potenza di 10.", "Il logaritmo di un prodotto è una somma.", "Ricorda i logaritmi di 2, 3 e 5."], "Con log(a·b) = log a + log b si stima un logaritmo scomponendo il numero in potenze di 10.", "log₁₀(200) | 200 = 2 × 10² | ≈ 0,3 + 2 = 2,3"),
   L(["Disegna la funzione nell'intervallo.", "Confrontala con funzioni più semplici.", "Fissa un minimo e un massimo per l'area."], "Per stimare un integrale si confronta la funzione con altre più semplici e si limita l'area.", "∫₀¹ sin x dx | sin x sta sotto la retta y = x | L'area è meno di 1/2: stima circa 0,46")
  ],
  vincoli: [
   L(["Elenca i numeri possibili per il primo vincolo.", "Applica gli altri vincoli uno alla volta.", "Alla fine resta un solo candidato."], "Con più vincoli si parte da un elenco e si scartano i candidati che ne violano uno.", "Multiplo di 6, pari, tra 19 e 29 | Multipli di 6: 18, 24, 30 | Solo 24 sta nell'intervallo"),
   L(["Gli zeri indicano i fattori del polinomio.", "Il segno del coefficiente dà minimo o massimo.", "Il vertice è a metà tra gli zeri."], "Una parabola con zeri a e b è y = k(x − a)(x − b); se k < 0 ha un massimo a metà tra gli zeri.", "Zeri in 0 e 4, con massimo | y = k·x(x − 4) con k < 0 | Scelgo k = −1: y = −x(x − 4)"),
   L(["La traccia è la somma degli autovalori.", "Il determinante è il loro prodotto.", "Verifica i candidati con traccia e determinante."], "Per una matrice 2×2 la traccia è la somma e il determinante il prodotto degli autovalori.", "Autovalori 2 e 6 | Traccia 8 e determinante 12 | [[4,2],[2,4]] ha traccia 8 e determinante 12: va bene")
  ],
  labirinto: [
   L(["Ricorda la definizione di numero primo.", "Escludi i numeri divisibili per altri numeri.", "Controlla ogni candidato."], "Un numero primo ha solo due divisori: 1 e se stesso. Nel cammino si sceglie in ogni riga la casella che rispetta la regola.", "Regola: multipli di 3 | Tra 10, 12 e 14 scelgo 12 (3 × 4) | 10 e 14 non sono divisibili per 3"),
   L(["Sostituisci il valore di x in ogni relazione.", "Calcola i due lati.", "Confronta i risultati."], "Per verificare una relazione si sostituisce il valore e si confrontano i due lati.", "Per x = 3 | «x² > 8» è vera perché 9 > 8 | «x + 1 < 2» è falsa perché 4 > 2"),
   L(["Quando una matrice quadrata è invertibile?", "Calcola il determinante se non è dato.", "Righe proporzionali cambiano il rango."], "Una matrice quadrata è invertibile se e solo se il determinante è diverso da zero.", "Matrice [[1,2],[3,6]] | det = 1·6 − 2·3 = 0 | Righe proporzionali: non è invertibile")
  ],
  confronto: [
   L(["Porta le frazioni allo stesso denominatore.", "Oppure confrontale come decimali.", "Poi confronta i numeratori."], "Per confrontare frazioni si usa un denominatore comune oppure si passa ai decimali.", "3/4 e 7/10 | Denominatore 20: 15/20 e 14/20 | 15 > 14: la prima è maggiore"),
   L(["Con numeri enormi passa ai logaritmi.", "Una funzione crescente conserva l'ordine.", "Confronta i logaritmi dei due numeri."], "Il logaritmo è crescente: confrontare due numeri positivi equivale a confrontare i loro logaritmi.", "2¹⁰⁰ e 10³⁰ | Logaritmi: 100·log 2 ≈ 30,1 contro 30 | 30,1 > 30: 2¹⁰⁰ è maggiore"),
   L(["Calcola il limite del rapporto A/B.", "Prova a ricondurti a limiti noti.", "Ricorda come crescono potenze e logaritmi."], "Per confrontare ordini d'infinito si studia il limite del rapporto: zero, finito non nullo o infinito.", "A = √x e B = ln x per x→∞ | Rapporto A/B = √x / ln x | Il limite è +∞: A è di ordine superiore")
  ]
 }
};
