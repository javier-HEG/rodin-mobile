import('common.lol')

/* ------------------------------------------- */
<expansionSpace[formFactor(@screen)] {
	*desktop: "Filtri semantichi",
	landscape: "Filtri semantichi"
}>

<expansionSearching "Ricerca sta effettuando ...">

<expansionCount[plural($relatedTermsCount), formFactor(@screen)] {
	zero: {
		*desktop: "Nessun termini parente trovato",
		smartphone: "Nessun termini par. trovato"
	},
	one: {
		*desktop: "{{ $relatedTermsCount }} termine parente trovato",
		smartphone: "{{ $relatedTermsCount }} termine par. trovato"
	},
	*many: {
		*desktop: "{{ $relatedTermsCount }} termini parente trovato",
		smartphone: "{{ $relatedTermsCount }} termini par. trovato"
	}
}>

<expansionSelection[plural($selectedTermsCount), formFactor(@screen)] {
	zero: " ",
	*many: {
		*desktop: "({{ $selectedTermsCount }} selezionato)",
		smartphone: "({{ $selectedTermsCount }} sel.)",
		landscape: "({{ $selectedTermsCount }} sel.)"
	}
}>

<narrowerCategory[formFactor(@screen)] {
	*desktop: "Specifico",
	smartphone: "Spec."	
}>
<broaderCategory[formFactor(@screen)] {
	*desktop: "Generale",
	smartphone: "Gen."	
}>
<relatedCategory[formFactor(@screen)] {
	*desktop: "Parente",
	smartphone: "Par"	
}>

<cancelButton "" value: "Interrompi">
<saveButton "" value: "Salva">
<removeButton "" value: "Cancellazione">
<defaultInput "" value: "Standard">

/* ------------------------------------------------------------------------- */
<globalSearching "Ricerca sta effettuando ...">
<globalNoResults "Nessun resultato">

/* ------------------------------------------- */
<userOptions "Opzioni dei utenti">
<userOptionsName "Nome">
<userOptionsPassword "Password">
<userOptionsChangePassword "Cambia password">
<userOptionsOldPassword "Precedente password">
<userOptionsNewPassword "Nuovo password">
<userOptionsLanguage "Lingua">
<userOptionsSession "Sessione">
<userOptionsLogoutButton "" value: "Uscire">

/* ------------------------------------------- */
<universeOptions "Opzioni dei universi">
<universeOptionsAboutCurrent "Universo attivo">
<universeOptionsCurrent "Modificare l'universo attivo">
<universeOptionsName "Nome">
<universeOptionsCurrentSources "Fonti">
<universeOptionsRemoveUniverse "Eliminare l'universo">
<universeOptionsRemoveWarning "Attenzione">
<universeOptionsRemoveWarningText "Siete sicuro di voler eliminare questo universo?">
<universeOptionsUniverseSelection "Scegliere un altro universo">
<universeOptionsCreateUniverse "Creare un universo">
