import {useEffect, useState} from "react";
import axios from "axios";
import {useContext} from "react";
import {UserContext} from "../UserContext";

export default function IndexPage(){
    const [places, setPlaces] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
      axios.get("/places").then(response => {
        setPlaces(response.data);
      });
    }, []);

    return <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (<div>
        <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:3000/uploads/"+place.photos?.[0]} alt=""/>
            )}
        </div>
        <h2 className="font-bold">{place.stayName}</h2>
        <h3 className="text-sm text-gray-500">{place.country}</h3>
        <div className="mt-1">
          <span className="font-bold">INR {place.price}</span> per night
        </div>
        {!!user && (
                <div className="mt-1 text-sm text-gray-500">Reviewed by {user.name}</div>
        )}
      </div>))}
  </div>
}