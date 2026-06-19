# Slice B - Medikation & eRezept-Vorbereitung
  
Repository für Gruppenprojekt im Kurs B90G Medizinische Informationssysteme im Sommersemester 2026

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

Patient resource:
- **Patient**: https://hl7.org/fhir/patient.html
