import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    userObj: null,
    login: (userObj) => {},
    logout: () => {}
});

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    
    //login token
    function login(user) {
        setUserData(user)
        setIsLoggedIn(true)
    }
    //clear token
    function logout() {
        setUserData(null)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value = 
        {{
            isLoggedIn: isLoggedIn,
            userData,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export { AuthProvider }