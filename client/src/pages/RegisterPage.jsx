import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // const registerUser = useCallback(()=>{
    //     axios.get('/test');
    // },[])

    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert("Registration successful!");
        } catch(e){
            // alert("Registration failed!");
            alert(e);
        }
    }
        

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="mb-2 text-4xl text-center">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                <input className="mt-2" 
                        type="text" 
                        placeholder="Your Name"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        ></input>
                    <input className="mt-2" 
                            type="email" 
                            placeholder="your@email.com"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                            ></input>
                    <input className="mt-2" 
                            type="password" 
                            placeholder="password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                            ></input>
                    <button className="primary mt-2">Register</button>
                    <div className="text-center py-2 text-gray-500">Already a member? <Link className="underline text-black" to={'/login'}>Login</Link></div>
                </form>
            </div>
        </div>
    )
}