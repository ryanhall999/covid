let pop = {
	AL: 4903185,
	AK: 731545,
	AS: 55312,
	AZ: 7278717,
	AR: 3017804,
	CA: 39512223,
	CO: 5758736,
	CT: 3565287,
	DE: 973764,
	DC: 705749,
	FM: 104929,
	FL: 21477737,
	GA: 10617423,
	GU: 167294,
	HI: 1415872,
	ID: 1787065,
	IL: 12671821,
	IN: 6732219,
	IA: 3155070,
	KS: 2913314,
	KY: 4467673,
	LA: 4648794,
	ME: 1344212,
	MH: 58791,
	MD: 6045680,
	MA: 6892503,
	MI: 9986857,
	MN: 5639632,
	MS: 2976149,
	MO: 6137428,
	MT: 1068778,
	NE: 1934408,
	NV: 3080156,
	NH: 1359711,
	NJ: 8882190,
	NM: 2096829,
	NY: 19453561,
	NC: 10488084,
	ND: 762062,
	MP: 51994,
	OH: 11689100,
	OK: 3956971,
	OR: 4217737,
	PW: 18008,
	PA: 12801989,
	PR: 3193694,
	RI: 1059361,
	SC: 5148714,
	SD: 884659,
	TN: 6829174,
	TX: 28995881,
	UT: 3205958,
	VT: 623989,
	VI: 104578,
	VA: 8535519,
	WA: 7614893,
	WV: 1792147,
	WI: 5822434,
	WY: 578759,
};

function getStateInfo(state, states) {
	return states.find((st) => state == st.state);
}

function createStateLabels(states) {
	let newArr = [];
	for (let i = 0; i < states.length; i++) {
		newArr.push(states[i].state);
	}
	return newArr;
}

function createStateCases(states) {
	let newArr = [];
	for (let i = 0; i < states.length; i++) {
		newArr.push(states[i].positive);
	}
	return newArr;
}

function createCaseDates(states) {
	let newArr = [];
	for (let i = 0; i < states.length; i++) {
		newArr.push(states[i].date);
	}
	return newArr;
}

function createDeathInfo(states) {
	let newArr = [];
	for (let i = 0; i < states.length; i++) {
		if (states[i].death !== null) {
			newArr.push(states[i].death);
		}
	}
	return newArr;
}

function getStatePop(state) {
	return pop[state];
}

function sortDays(days, state2) {
	let newArr = [];
	for (let i = 0; i < days.length; i++) {
		if (days[i].state === state2) {
			newArr.push(days[i]);
		}
	}
	return newArr;
}
export {
	getStateInfo,
	createStateLabels,
	createStateCases,
	getStatePop,
	sortDays,
	createCaseDates,
	createDeathInfo,
};
