const colorSchemeContainerEl = document.querySelector(".color-scheme-container")

function getColor() {
	//returns the selected hex color code and removes the "#""
	const selectedColor = document.getElementById("color-picker").value.substring(1)
	return selectedColor
}

function getMode() {
	// returns the selected color harmony
	const selectedOption = document.querySelector(".select-color-harmony")
	return selectedOption.value
}

function renderColorScheme(ColorSchemeObject) {
	// renders the newly generated palette into the HTML 
	let FullColorScheme = ""
	
		for (const color of ColorSchemeObject) {
	
			const hexValue = color.hex.value
			
			let colorSchemeElement = `
				<div class="color-container" id="${hexValue}" tabindex="0">
						<div class="color-swatch" style="background-color:${hexValue}" aria-label="${color.name.value}"></div>
						<h2 class="color-hex-code"> ${hexValue}</h2>
					</div>
			`
			FullColorScheme += colorSchemeElement
		}	 
	colorSchemeContainerEl.innerHTML = FullColorScheme
	
}

colorSchemeContainerEl.addEventListener("click", (event) => {
	//Finds clicked swatch and copies Hexcode
    const target = event.target.closest(".color-container")
    if (target) {
        const colorCode = target.id
        navigator.clipboard.writeText(colorCode)
			.then(() => alert(`Copied ${colorCode} to clipboard!`))
			.catch(err => console.error("Failed to copy text to clipboard: ", err))
    }
})

document.querySelector(".color-picker-btn").addEventListener( "click", () => {
	fetch(`https://www.thecolorapi.com/scheme?hex=${getColor()}&mode=${getMode()
	}&count=5`)
			.then(res => res.json())
			.then(data => renderColorScheme(data.colors))
})

