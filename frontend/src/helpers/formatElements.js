export function formatElements(elements){
	let formattedElements = {}
	elements.forEach((element) => {
		formattedElements[element.id] = element
	})
	return formattedElements
}