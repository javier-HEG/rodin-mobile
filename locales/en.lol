import('common.lol')

/* ------------------------------------------------------------------------- */
<expansionSpace "Search refinement space">
<expansionSearching "Searching related terms ...">

<expansionCount[plural($relatedTermsCount), formFactor(@screen)] {
	zero: "No related terms found",
	one: "One related term found",
	*many: {
		*desktop: "{{ $relatedTermsCount }} related terms found",
		landscape: "{{ $relatedTermsCount }} terms found"
	}
}>

<expansionSelection[plural($selectedTermsCount), formFactor(@screen)] {
	zero: " ",
	*many: {
		*desktop: "({{ $selectedTermsCount }} selected)",
		landscape: "({{ $selectedTermsCount }} sel.)"
	}
}>

<narrowerCategory "Narrower">
<broaderCategory "Broader">
<relatedCategory "Related">

<cancelButton "" value: "Cancel">
<saveButton "" value: "Save">
<removeButton "" value: "Remove">
<defaultInput "" value: "Default">

/* ------------------------------------------------------------------------- */
<globalSearching "Searching ...">
<globalNoResults "No results">

/* ------------------------------------------------------------------------- */
<userOptions "User options">
<userOptionsName "Name">
<userOptionsPassword "Password">
<userOptionsChangePassword "Change password">
<userOptionsOldPassword "Old password">
<userOptionsNewPassword "New password">
<userOptionsLanguage "Language">
<userOptionsSession "Session">
<userOptionsLogoutButton "" value: "Logout">

/* ------------------------------------------------------------------------- */
<universeOptions "Universe options">
<universeOptionsAboutCurrent "About current universe">
<universeOptionsCurrent "Configure current universe">
<universeOptionsName "Name">
<universeOptionsCurrentSources "Sources">
<universeOptionsRemoveUniverse "Remove this universe">
<universeOptionsRemoveWarning "Warning">
<universeOptionsRemoveWarningText "Are you sure you want to remove the current universe?">
<universeOptionsUniverseSelection "Universe selection">
<universeOptionsCreateUniverse "Create universe">
