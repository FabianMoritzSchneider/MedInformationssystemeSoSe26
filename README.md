# Slice B - Medikation & eRezept-Vorbereitung
  
Repository für Gruppenprojekt im Kurs B90G Medizinische Informationssysteme im Sommersemester 2026

## Aufgabe: 
Implementiert einen "Vertical Slice" eines medizinischen Informationssystems, der einen Vorgang während der Behandlung eines Patienten/einer Patientin in einem Krankenhaus abbildet.

- Wählt aus einem der folgenden Vorschläge aus
- Implementiert eine HTTP-API (RESTful) die mehrere Schnittstellen zum vollständigen Durchlaufen des Vorgangs, im  Zusammenspiel mit dem FHIR R4 Testserver (https://hapi.fhir.org/baseR4) ermöglicht
- Jeder Vorgang beginnt mit dem Erfassen und/oder Updaten von Patientenstammdaten
- Jeder Vorgang endet mit einer Erfolgs- oder Fehlernachricht
- Jeder Vorgang hinterlässt vollständige Audit-Trails und Event-Logs in dem FHIR R4 Testserver und einem lokalen Speichermedium (mongo DB)

## Abgabe:
- Planungsdokument aus dem die Entscheidungen zum Aufbau der Systemarchitektur hervorgehen.
- Dokumentierter Quellcode.
- Live-Demonstration mit Test-Daten, die bereitgestellt werden.

## Bei jedem Vorgang
Rolle: Notaufnahme-Software (KIS-Modul)
Touchpoint: Patient:in wird aufgenommen, Anamnesebogen wird erfasst

### FHIR-Operationen:
- **/Patient** Sucher oder Neuanlage
- **/Patient** Suche per Krankenversichertennummer
- **/Bundle** (transaction) Patient + Condition (Vorerkrankungen) + MedicationStatement (Dauermedikamente) + Consent (DSGVO)
- **/AuditEvent**
- **/Provenance**

## Medikation & eRezept-Vorbereitung
Rolle: Ärztliches Dokumentationssystem
Touchpoint: Schmerzmedikation wird verordnet, Medikationshistorie abgeglichen.

### FHIR-Operationen:
- **/Patient?**...
- **/MedicationStatement?subject=.**.. — bestehende Medikation abfragen
- **/MedicationRequest**— neue Verordnung
- **/Bundle (transaction)** — MedicationRequest + Provenance atomar


### Medication resources:
- **MedicationRequest**: https://hl7.org/fhir/medicationrequest.html
- **MedicationAdministration**: https://hl7.org/fhir/medicationadministration.html
- **MedicationDispense**: https://hl7.org/fhir/medicationdispense.html
- **MedicationStatement**: https://hl7.org/fhir/medicationstatement.html
- **Medication**: https://hl7.org/fhir/medication.html
- **MedicationKnowledge**: https://hl7.org/fhir/medicationknowledge.html

### Patient resource:
- **Patient**: https://hl7.org/fhir/patient.html
