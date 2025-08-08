import useGlobalState from '../global';
import { setUser } from '../global/actions';

export function useAuth() {
    const [globalState, globalDispatch] = useGlobalState();
    if (!globalState.user.available) {
        const tokenString = document.cookie.split('; ').find((row) => row.startsWith('token='));
        if (!tokenString) {
            return false;
        }
        const token = tokenString.split('=')[1];
        if (!token) {
            return false;
        }
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/info/`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error();
                }
                const json = await response.json();
                if (!json.success) {
                    throw new Error();
                }
                globalDispatch(
                    setUser({
                        available: true,
                        id: json.data._id,
                        username: json.data.username,
                        email: json.data.email,
                    }),
                );
                return true;
            } catch {
                return false;
            }
        };
        fetchUserInfo();
    }
    return true;
}
