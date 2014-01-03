<plural($n) {
	$n == 0 ? "zero" :
		$n == 1 ? "one" :
			"many" }> 

<formFactor($n) {
	$n.width.px < 480 ? "smartphone" :
		$n.width.px < 768 ? "tablet" :
			$n.width.px < 960 ? "landscape" :
				$n.width.px < 1024 ? "ipad" :
					"desktop" }>

<currentWidth "{{ @screen.width.px }}px">

<mediaName[formFactor(@screen)] {
	*desktop: "Desktop",
	ipad: "iPad (960px-1024px)",
	landscape: "Landscape (768px-959px)",
	tablet: "Table (481px-767px)",
	smartphone: "Smatphone (?-480px)" }>

<frenchTag[formFactor(@screen)] {
	*desktop: "Français",
	smartphone: "Fr" }>

<germanTag[formFactor(@screen)] {
	*desktop: "Deutsch",
	smartphone: "De" }>

<italianTag[formFactor(@screen)] {
	*desktop: "Italiano",
	smartphone: "It" }>

<englishTag[formFactor(@screen)] {
	*desktop: "English",
	smartphone: "En" }>

<userOptionsLanguageFrench "" value: "{{ frenchTag }}">
<userOptionsLanguageGerman "" value: "{{ germanTag }}">
<userOptionsLanguageItalian "" value: "{{ italianTag }}">
<userOptionsLanguageEnglish "" value: "{{ englishTag }}">
