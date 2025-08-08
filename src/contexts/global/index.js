import { useContext } from 'react';
import Context from './Context';

export default function useGlobalState() {
    const [state, dispatch, refresh, setRefresh] = useContext(Context);
    return [state, dispatch, refresh, setRefresh];
}

export { default as GlobalContext } from './Context';

export { default as GlobalProvider } from './Provider';
