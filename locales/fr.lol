import('common.lol')

/* ------------------------------------------- */
<expansionSpace[formFactor(@screen)] {
	*desktop: "Espace pour le refinement semantique",
	landscape: "Refinement semantique"
}>

<expansionSearching "Recherche en cours ...">

<expansionCount[plural($relatedTermsCount)] {
	zero: "Pas de temes relationnés trouvés",
	one: "{{ $relatedTermsCount }} terme relationné trouvé",
	*many: "{{ $relatedTermsCount }} terme relationnés trouvés"
}>

<expansionSelection[plural($selectedTermsCount), formFactor(@screen)] {
	zero: " ",
	*many: {
		*desktop: "({{ $selectedTermsCount }} selectionnés)",
		landscape: "({{ $selectedTermsCount }} sel.)"
	}
}>

<narrowerCategory "Specifique">
<broaderCategory "Généraux">
<relatedCategory "Relationnés">

<cancelButton "" value: "Annuler">
<saveButton "" value: "Enregistrer">
<removeButton "" value: "Eliminer">
<defaultInput "" value: "Par défaut">

/* ------------------------------------------------------------------------- */
<globalSearching "Recherche en cours ...">
<globalNoResults "Aucun resultat">

/* ------------------------------------------- */
<userOptions "Options utilisateur">
<userOptionsName "Nom d'utilisateur">
<userOptionsPassword "Mot de passe">
<userOptionsChangePassword "Changement de mot de passe">
<userOptionsOldPassword "Ancien mot de passe">
<userOptionsNewPassword "Nouveau mot de passe">
<userOptionsLanguage "Langue">
<userOptionsSession "Session">
<userOptionsLogoutButton "" value: "Sortir">

/* ------------------------------------------- */
<universeOptions "Options universe">
<universeOptionsAboutCurrent "L'univers actuel">
<universeOptionsCurrent "Modifier l'univers actuel">
<universeOptionsName "Nom">
<universeOptionsCurrentSources "Sources">
<universeOptionsRemoveUniverse "Eliminer cet univers">
<universeOptionsRemoveWarning "Attention">
<universeOptionsRemoveWarningText "Êtes-vous sûr de vouloir eliminer l'univers?">
<universeOptionsUniverseSelection "Choisir un autre univers">
<universeOptionsCreateUniverse "Créer un univers">
