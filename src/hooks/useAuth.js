import { useSelector } from 'react-redux';

import { setLogin, setLogout } from 'state/AppState';

const useAuth = () => {

    const auth = {
        email: useSelector((state) => state.appData.email),
        isAdmin: useSelector((state) => state.appData.isAdmin),
        userId: useSelector((state) => state.appData.userId),
      
    }

    return { setLogin, setLogout, auth };
}

export default useAuth;
