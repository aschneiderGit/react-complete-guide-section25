import {useEffect, useState} from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
	const setState = useState(globalState)[1];

	const dispatch = (actionId, payload) => {
		const newState = actions[actionId](globalState, payload);
		globalState = {...globalState, ...newState};

		for (const listener of listeners) {
			listener(globalState);
		}
	};

	useEffect(() => {
		console.log(listeners);
		if (shouldListen) {
			listeners.push(setState);
		}
		console.log(listeners);

		return () => {
			if (shouldListen) {
				listeners = listeners.filter((li) => li !== setState);
				console.log(listeners);
			}
		};
	}, [setState, shouldListen]);
	return [globalState, dispatch];
};

export const initStore = (userActions, initialeState) => {
	if (initialeState) {
		globalState = {...globalState, ...initialeState};
	}
	actions = {...actions, ...userActions};
};
