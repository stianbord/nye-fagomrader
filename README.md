# bino-ai-pilot

En liten testbenk for å prøve ut hvor godt AI klarer å generere kode med
BI-designsystemet. Du skriver en prompt, og ser resultatet i nettleseren.

## Slik kommer du i gang (én gang)

```bash
pnpm install
```

## Slik kjører du et eksperiment

1. Start appen:

   ```bash
   pnpm dev
   ```

   Åpne http://localhost:5173. Siden er tom til du har kjørt noe.

2. Åpne Claude Code i samme mappe, og skriv prompten din rett i chatten — for
   eksempel «Lag en primary-knapp med teksten Home» eller «Lag et skjema med
   navn, e-post og en submit-knapp».

3. Resultatet dukker opp i nettleseren av seg selv. Du trenger ikke laste inn
   siden på nytt.

4. Ta skjermbilde med **cmd+shift+4** og dra et utsnitt rundt resultatet.
   Flaten er helt hvit, så bildet blir rent.

5. Vil du ha koden? Trykk **Kopier kode** øverst til høyre. **Vis kode** lar deg
   lese den først.

Neste prompt overskriver forrige resultat. Trenger du å ta vare på noe, ta
skjermbildet eller kopier koden før du kjører videre.
