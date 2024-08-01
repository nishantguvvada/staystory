import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "./UserContext";

export default function Header(){
    const {user} = useContext(UserContext);
    return (
        <header className="flex justify-between items-center">
        <Link to={'/'} href="" className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
        <span className="font-bold text-xl">staystory</span>
        </Link>
        <div className="flex gap-10 border border-gray-300 text-gray-500 rounded-full py-1 px-10 shadow-md shadow-gray-500">
            <div>Location</div>
            <div className="bg-gray-300 w-0.5"></div>
            <div>Dates</div>
            <div className="bg-gray-300 w-0.5"></div>
            <div>Budget</div>
            <button className="bg-primary text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </button>
        </div>
        <Link to={user?'/account':'/login'} className="flex items-center gap-10 border border-gray-300 rounded-full py-2 px-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
            <div className="flex gap-4">
            <div className="border border-gray-300 text-gray-500 rounded-full flex justify-center items-center w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
            </div>
            {!!user && (
                <div>{user.name}</div>
            )}
            </div>
        </Link>
        </header>
    )
}