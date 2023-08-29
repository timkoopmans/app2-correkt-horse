import './App.css';
import {useAuth} from "@frontegg/react";
import React, { useState, useEffect } from 'react';

function App() {
    const [getCookieValue, setCookieValue] = useState(null);

    useEffect(() => {
        // On component mount, read the cookie value
        const value = getCookie("loginOrigin");
        setCookieValue(value);
    }, []);

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; domain=.correkt.horse; path=/";
    };

    const getCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    const {user, isAuthenticated} = useAuth();

    let loginOrigin = getCookieValue;
    if (loginOrigin) {
        console.log('got loginOrigin', loginOrigin);
    }

    const logout = () => {
        window.location.href = `${window.location}account/logout`;
    }

    const redirectToLogin = () => {
        setCookie("loginOrigin", "app2.correkt.horse", 7);
        console.log(getCookieValue);
        window.location.href = `https://auth.correkt.horse`;
    }

    return (<div className='App'>
        {isAuthenticated ? (
                <div>
                    <h1>app2.correkt.horse</h1>
                    <div className="profile-section">
                        <img className="profile-pic" src={user?.profilePictureUrl} alt={user?.name} />
                        <p className="profile-name">{user?.name}</p>
                    </div>
                    <div className="logout-section">
                        <button className="logout-button" onClick={() => logout()}>Logout</button>
                    </div>
                </div>

            ) :
            <div>
                <h1>app2.correkt.horse</h1>
                <button className="login-button" onClick={() => redirectToLogin()}>Login</button>
            </div>}
        <div className="debug">
            <p>loginOrigin: {loginOrigin}</p>
        </div>
    </div>);
}

export default App;
