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
        *desktop: "Generell",
        smartphone: "Gen."        
}>
<relatedCategory[formFactor(@screen)] {
        *desktop: "Verwandte",
        smartphone: "Verw."        
}>

<cancelButton "" value: "Abbrechen">
<saveButton "" value: "Speichern">
<removeButton "" value: "Löschen">
<defaultInput "" value: "Standard">

/* ------------------------------------------------------------------------- */
<globalSearching "Suche läuft ...">
<globalNoResults "Aucun resultat">

/* ------------------------------------------- */
<userOptions "Options utilisateur">
<userOptionsName "Nom d'utilisateur">
<userOptionsPassword "Mot de passe">
<userOptionsChangePassword "Changement de mot de passe">
<userOptionsOldPassword "Altes Passwort">
<userOptionsNewPassword "Neues Passwort">
<userOptionsLanguage "Langue">
<userOptionsSession "Session">
<userOptionsLogoutButton "" value: "Sortir">

/* ------------------------------------------- */
<universeOptions "Options universe">
<universeOptionsAboutCurrent "L'univers actuel">
<universeOptionsCurrent "Modifier l'univers actuel">
<universeOptionsName "Nom">
<universeOptionsCurrentSources "Sources">
<universeOptionsRemoveUniverse "Dieses Universum löschen">
<universeOptionsRemoveWarning "Attention">
<universeOptionsRemoveWarningText "Möchten Sie dieses Universum wirklich löschen?">
<universeOptionsUniverseSelection "Choisir un autre univers">
<universeOptionsCreateUniverse "Créer un univers">

