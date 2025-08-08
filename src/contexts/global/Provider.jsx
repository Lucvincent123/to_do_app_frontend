import { useReducer, useState } from 'react';

import Context from './Context';
import reducer, { initState } from './reducer';

export default function Provider({ children }) {
    const [refresh, setRefresh] = useState(false);
    const [state, dispatch] = useReducer(reducer, initState);
    return <Context.Provider value={[state, dispatch, refresh, setRefresh]}>{children}</Context.Provider>;
}
