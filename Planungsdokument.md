# Planungsdokument

## Schritte 
$\to$ jede Abfrage / Änderung soll in AuditTrail-Datei dokumentiert werden mit timestamp
1. Patient in in FHIR Testdatenbank suchen (per Krankenversicherungsnummer??)
    - wenn Patient gefunden, Datensatz aus FHIR übernehmen
    - wenn nicht gefunden: Datensatz für Patient anlegen in FHIR Testdatenbank $\to$ soll Stammdaten, Vorerkrankungen, Dauermedikation, Einwilligung (DSGVO) (bezogen auf Gematik) enthalten
    - überlegen / recherchieren was wir in lokaler Datenbank speichern dürfen (nur ID?? $\to$ Datenschutz) und in lokaler Datenbank speichern
2. Dauermedikation von Patient abfragen $\to$ Ressource `MedicationStatement` ("A record of a medication that is being consumed by a patient. A MedicationStatement may indicate that the patient may be taking the medication now or has taken the medication in the past or will be taking the medication in the future.")
3. Nach verordnetem Medikament in FHIR Testdatenbank suchen $\to$ Ressoure: `Medication` ("This resource is primarily used for the identification and definition of a medication, including ingredients, for the purposes of prescribing, dispensing, and administering a medication as well as for making statements about medication use.")
4. ggf. Medikament in FHIR Testdatenbank erstellen
5. Verordnung des Medikaments in FHIR Testdatenbank erstellen für den Patienten $\to$ Ressource: `MedicationRequest` ("An order or request for both supply of the medication and the instructions for administration of the medication to a patient. ")
6. verordnete Medikation zu Medikamentenhistorie des Patienten hinzufügen zu FHIR Testdatenbank $\to$ Ressource `MedicationStatement`


## Anfragen an FHIR Testdatenbank
- `getPatient`: nach Patient in FHIR Testdatenbank suchen nach Krankenversicherungsnummer
- `postPatient`: Patient Stammdaten in FHIR Testdatenbank erstellen
- `putPatient`: DSGVO-Einwilligung (bezogen auf Gematik), Dauermedikation, Vorerkrankungen aktualisieren in FHIR Testdatenbank
- `getMedicationStatement`: nach Dauermedikation eines Patienten in FHIR Testdatenbank suchen
- `getMedication`: suchen ob zu verordneter Medikation schon Datensatz in FHIR Testdatenbank existiert (Ressource `Medication`)
- `postMedication`: Datensatz zu verordneter Medikation in FHIR Testdatenbank erstellen (Ressource `Medication`)
- `postMedicationRequest`: Datensatz zu Verordnung der Medikation für Patient in FHIR Testdatenbank erstellen
- `putMedicationStatement`: verordnete Medikation zu Medikamentenhistorie des Patienten hinzufügen in FHIR Testdatenbank


## Endpoints
- `[GET]/Patient`: nach Patient suchen (`getPatient`) und ggf. anlegen (`postPatient`) 
- `[PUT]/Patient`: Daten zu Patient in Testdatenbank aktualisieren (`putPatient`) 
- `[GET]/MedicationStatement`: Abfrage zu Dauermedikation (`getMedicationStatement`)
- `[POST]/Prescription`: checken ob Medikation in Medication Ressource in FHIR Datenbank existiert (`getMedication`), ggf. anlegen (`postMedication`), Verordnung für Medikation und Patient in FHIR Datenbank erstellen (`postMedicationRequest`), Medikamentenhistorie des Patienten in FHIR Datenbank aktualisieren (`putMedicationStatement`)

## Bundles
$\to$ alles was nur zusammen funktionieren oder zusammen fehlschlagen soll, soll in ein Bundle
- Was soll in Bundles bei uns??

## Ideen zu Persistenzen / Was speichern wir lokal?
- eigene interne ID vergeben für Patient und die zu FHIR-Patient-ID mappen $\to$ Mapping macht es aber nicht sicherer!
- an Daten vom Patient aus FHIR Datenbank also nur Patient-ID speichern lokal $\to$ Datenschutz
- Daten die nicht in FHIR-Datenbank vorkommen (Krankenversicherungsnummer?, DSGVO-Einwilligung für unsere Klinik spezifisch und nicht für Gematik)
- evtl weiteres speichern für AuditTrails??

## Logging vs AuditTrails
- Logging: technisch, Systemlogs, z.B. Fehlercodes vom Browser $\to$ in Serverlogs dürfen keine sicherheitskritischen Infos, (sensible) Patientendaten sein $\to$ sonst Datenschutzproblem! (Patientendaten würden geleaked werden)
- AuditTrails: welche Anfragen haben wir geschickt etc $\to$ enthält Patientendaten $\to$ welche?