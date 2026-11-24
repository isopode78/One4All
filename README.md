# ONE4ALL Cultura Quotidiana

## Avvio
1. Console Firebase → crea progetto → **Authentication** → abilita Email/Password.
2. **Firestore Database** → crea database → scheda Regole → incolla `firestore.rules`.
3. Impostazioni progetto → app Web → copia la config in `firebase-config.js`.
4. In VS Code installa **Live Server** → tasto destro su `index.html` → *Open with Live Server*.
5. Online: `npm i -g firebase-tools`, `firebase init hosting` (cartella `.`), `firebase deploy`.
   Aggiungi il dominio in Authentication → Impostazioni → Domini autorizzati.

## Dove mettere mano
- `questions.js`: quesiti (formato spiegato in testa al file). Più quesiti per livello = uno diverso ogni giorno.
- `app.js` → funzione `ad()`: collega qui AdSense/AdMob. Ora è un conto alla rovescia finto.
- Nuova materia: metti `true` in `SUBJECTS` e aggiungi `Q.materia = { modalita: [[facile],[medio],[difficile]] }`.
