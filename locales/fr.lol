import('common.lol')

/* ------------------------------------------- */
<expansionSpace[formFactor(@screen)] {
	*desktop: "Espace pour le refinement semantique",
	landscape: "Refinement semantique"
}>

<expansionSearching "Recherche en cours ...">

<expansionCount[plural($relatedTermsCount), formFactor(@screen)] {
	zero: {
		*desktop: "Pas de termes relationnés trouvés",
		smartphone: "Pas de termes rel. trouvés"
	},
	one: {
		*desktop: "{{ $relatedTermsCount }} terme relationné trouvé",
		smartphone: "{{ $relatedTermsCount }} terme rel. trouvé"
	},
	*many: {
		*desktop: "{{ $relatedTermsCount }} termes relationnés trouvés",
		smartphone: "{{ $relatedTermsCount }} termes rel. trouvés"
	}
}>

<expansionSelection[plural($selectedTermsCount), formFactor(@screen)] {
	zero: " ",
	*many: {
		*desktop: "({{ $selectedTermsCount }} selectionnés)",
		smartphone: "({{ $selectedTermsCount }} sel.)",
		landscape: "({{ $selectedTermsCount }} sel.)"
	}
}>

<narrowerCategory[formFactor(@screen)] {
	*desktop: "Specifique",
	smartphone: "Spec."	
}>
<broaderCategory[formFactor(@screen)] {
	*desktop: "Généraux",
	smartphone: "Gén."	
}>
<relatedCategory[formFactor(@screen)] {
	*desktop: "Relationnés",
	smartphone: "Rel."	
}>

<cancelButton "" value: "Annuler">
<saveButton "" value: "Enregistrer">
<removeButton "" value: "Eliminer">
<defaultInput "" value: "Par défaut">

/* ------------------------------------------------------------------------- */
<globalSearching "Recherche en cours ...">
<globalNoResults "Aucun resultat">
<globalMoreResults "Encore 10 résultats"> /* NEW */

/* ------------------------------------------- */
<userOptions "Options utilisateur">
<userOptionsName "Nom d'utilisateur">
<userOptionsPassword "Mot de passe">
<userOptionsChangePassword[formFactor(@screen)] {
	*desktop: "Changement de mot de passe",
	smartphone: "Changer"
	}>
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
<universeOptionsRemoveConfirm "Cette action est irréversible!"> /* NEW */
<universeOptionsUniverseSelection "Choisir un autre univers">
<universeOptionsCreateUniverse "Créer un univers">
<universeOptionsCreateUniverseConfirm "Êtes-vous sûr de vouloir créer un nouvel univers? (Il sera choisi par défaut)"> /* NEW */

/* ------------------------------------------------------------------------- */
<helpAddAUniverse "Aucun universe, veuillez en créer un pour commencer à utiliser RODIN."> /* NEW */
<helpAddDataSource "Aucune Datasource, ajoutez-en une pour obtenir des résultats."> /* NEW */
<helpHerePointer "Ici!">
