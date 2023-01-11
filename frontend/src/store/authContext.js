import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: (token) => {},
    logout: () => {}
});

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    
    //login token
    function login(newToken) {
        setToken(newToken)
        setIsLoggedIn(true)
    }
    //clear token
    function logout() {
        setToken(null)
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value = 
        {{
            isLoggedIn: isLoggedIn,
            token,
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