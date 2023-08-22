import './App.css';
import {useAuth} from "@frontegg/react";

function App() {
    const {user, isAuthenticated} = useAuth();

    const logout = () => {
        window.location.href = `${window.location}account/logout`;
    }

    const redirectToLogin = () => {
        window.location.href = `https://auth.correkt.horse?redirectUrl=${window.location}`;
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
    </div>);
}

export default App;
