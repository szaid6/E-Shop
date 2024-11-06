import { useSelector } from 'react-redux';

import { setLogin, setLogout } from 'state/AppState';

const useAuth = () => {

    const auth = {
        email: useSelector((state) => state.appData.email),
        token: useSelector((state) => state.appData.token),
        isAdmin: useSelector((state) => state.appData.isAdmin)
    }

    return { setLogin, setLogout, auth };
}

export default useAuth;
