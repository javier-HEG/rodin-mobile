import('common.lol')

/* ------------------------------------------- */
<expansionSpace[formFactor(@screen)] {
        *desktop: "Semantische Filter",
        landscape: "Semantische Filter"
}>

<expansionSearching "Suche läuft ...">

<expansionCount[plural($relatedTermsCount), formFactor(@screen)] {
        zero: {
                *desktop: "Keine verwandten Begriffe gefunden",
                smartphone: "Keine verw. Begriffe gefunden"
        },
        one: {
                *desktop: "{{ $relatedTermsCount }} Verwandter Begriff gefunden",
                smartphone: "{{ $relatedTermsCount }} Verw. Begriff gefunden"
        },
        *many: {
                *desktop: "{{ $relatedTermsCount }} Verwandte Begriffe gefunden",
                smartphone: "{{ $relatedTermsCount }} Verw. Begriffe gefunden"
        }
}>

<expansionSelection[plural($selectedTermsCount), formFactor(@screen)] {
        zero: " ",
        *many: {
                *desktop: "({{ $selectedTermsCount }} ausgewählt)",
                smartphone: "({{ $selectedTermsCount }} ausg.)",
                landscape: "({{ $selectedTermsCount }} ausg.)"
        }
}>

<narrowerCategory[formFactor(@screen)] {
        *desktop: "Spezifisch",
        smartphone: "Spez."        
}>
<broaderCategory[formFactor(@screen)] {
        *desktop: "Erweitert",
        smartphone: "Erw."        
}>
<relatedCategory[formFactor(@screen)] {
        *desktop: "Verwandt",
        smartphone: "Verw."        
}>

<cancelButton "" value: "Abbrechen">
<saveButton "" value: "Speichern">
<removeButton "" value: "Löschen">
<defaultInput "" value: "Standard">

/* ------------------------------------------------------------------------- */
<globalSearching "Suche läuft ...">
<globalNoResults "Keine Resultate">

/* ------------------------------------------- */
<userOptions "Benutzeroptionen">
<userOptionsName "Benutzername">
<userOptionsPassword "Passwort">
<userOptionsChangePassword "Passwort ändern">
<userOptionsOldPassword "Altes Passwort">
<userOptionsNewPassword "Neues Passwort">
<userOptionsLanguage "Sprache">
<userOptionsSession "Sitzung">
<userOptionsLogoutButton "" value: "Verlassen">

/* ------------------------------------------- */
<universeOptions "Universumsoptionen">
<universeOptionsAboutCurrent "Aktives Universum">
<universeOptionsCurrent "Aktives Universum bearbeiten">
<universeOptionsName "Name">
<universeOptionsCurrentSources "Quellen">
<universeOptionsRemoveUniverse "Dieses Universum löschen">
<universeOptionsRemoveWarning "Achtung">
<universeOptionsRemoveWarningText "Möchten Sie dieses Universum wirklich löschen?">
<universeOptionsUniverseSelection "Ein anderes Universum auswählen">
<universeOptionsCreateUniverse "Ein Universum erstellen">

