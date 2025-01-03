import {Link, Navigate} from "react-router-dom";
import {useState, useContext} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login', {email, password});
            setUser(data);
            // alert("Login successful!");
            setRedirect(true);
        } catch(e){
            alert("Login failed!");
        }
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="mb-2 text-4xl text-center">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input className="mt-2" type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)}></input>
                    <input className="mt-2" type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
                    <button className="primary mt-2">Login</button>
                    <div className="text-center py-2 text-gray-500">Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link></div>
                </form>
            </div>
        </div>
    )
}