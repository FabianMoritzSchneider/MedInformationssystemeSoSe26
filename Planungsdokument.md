# Planungsdokument

## Schritte:  
jede Abfrage / Änderung soll in Log-Datei dokumentiert werden mit timestamp
1. Patient in in FHIR Testdatenbank suchen (per Krankenversicherungsnummer??)
    - wenn Patient gefunden, Datensatz aus FHIR übernehmen
    - wenn nicht gefunden: Datensatz für Patient anlegen in FHIR Testdatenbank -> soll Stammdaten, Vorerkrankungen, Dauermedikation, Einwilligung (DSGVO) enthalten
    - überlegen / recherchieren was wir in lokaler Datenbank speichern dürfen (nur ID?? -> Datenschutz) und in lokaler Datenbank speichern
2. Dauermedikation von Patient abfragen -> Ressource `MedicationStatement` ("A record of a medication that is being consumed by a patient. A MedicationStatement may indicate that the patient may be taking the medication now or has taken the medication in the past or will be taking the medication in the future.")
3. Nach verordnetem Medikament in FHIR Testdatenbank suchen -> Ressoure: `Medication` ("This resource is primarily used for the identification and definition of a medication, including ingredients, for the purposes of prescribing, dispensing, and administering a medication as well as for making statements about medication use.")
4. ggf. Medikament in FHIR Testdatenbank erstellen
5. Verordnung des Medikaments in FHIR Testdatenbank erstellen für den Patienten -> Ressource: `MedicationRequest` ("An order or request for both supply of the medication and the instructions for administration of the medication to a patient. ")
6. verordnete Medikation zu Medikamentenhistorie des Patienten hinzufügen zu FHIR Testdatenbank -> Ressource `MedicationStatement`


## Anfragen an FHIR Testdatenbank:
- getPatient: nach Patient in FHIR Testdatenbank suchen nach Krankenversicherungsnummer
- postPatient: Patient Stammdaten in FHIR Testdatenbank erstellen
- putPatient: DSGVO-Einwilligung, Dauermedikation, Vorerkrankungen aktualisieren in FHIR Testdatenbank
- getMedicationStatement: nach Dauermedikation eines Patienten in FHIR Testdatenbank suchen
- getMedication: suchen ob zu verordneter Medikation schon Datensatz in FHIR Testdatenbank existiert (Ressource Medication)
- postMedication: Datensatz zu verordneter Medikation in FHIR Testdatenbank erstellen (Ressource Medication)
- postMedicationRequest: Datensatz zu Verordnung der Medikation für Patient in FHIR Testdatenbank erstellen
- putMedicationStatement: verordnete Medikation zu Medikamentenhistorie des Patienten hinzufügen in FHIR Testdatenbank


## Endpoints:
- getPatient: nach Patient suchen (getPatient) und ggf. anlegen (postPatient) 
- updatePatient: Daten zu Patient in Testdatenbank aktualisieren (putPatient) 
- getMedicationStatement: Abfrage zu Dauermedikation (getMedicationStatement)
- postPrescription: checken ob Medikation in Medication Ressource in FHIR Datenbank existiert (getMedication), ggf. anlegen (postMedication), Verordnung für Medikation und Patient in FHIR Datenbank erstellen (postMedicationRequest), Medikamentenhistorie des Patienten in FHIR Datenbank aktualisieren (putMedicationStatement)


## Ideen zu Persistenzen:
- eigene interne ID vergeben für Patient und die zu FHIR-Patient-ID mappen
- an Daten vom Patient aus FHIR Datenbank also nur Patient-ID speichern lokal -> Datenschutz