function getStateInfo(state, states) {
	return states.find((st) => state == st.state);
}

function createStateLabels(states) {
	let newArr = [];
	for (let i = 0; i < states.length; i++) {
		newArr.push(states[i].state);
	}
	console.log(newArr);
	return newArr;
}

function createStateCases(states) {
	let newArr = [];
	for (let i = 0; i < states.length; i++) {
		newArr.push(states[i].positive);
	}
	console.log(newArr);
	return newArr;
}

export { getStateInfo, createStateLabels, createStateCases };
