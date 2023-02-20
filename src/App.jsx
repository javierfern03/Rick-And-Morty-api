import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import getRandomLocation from "./utils/getRandomLocation";
import LocationInfo from "./components/LocationInfo";
import ResidentInfo from "./components/ResidentInfo";

function App() {
  const [location, setLocation] = useState();
  const [numberLocation, setNumberLocation] = useState(getRandomLocation);
  const [hasError, setHasError] = useState(false);
  const [listLocation, setListLocation] = useState();
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`;
    axios
      .get(url)
      .then((res) => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  }, [numberLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.input.value.trim().length === 0) {
      setNumberLocation(getRandomLocation());
    } else {
      setNumberLocation(e.target.input.value.trim());
    }
    e.target.input.value = e.target.input.value.trim();
  };

  const handleChange = (e) => {
    console.log(e.target.value.trim());
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`;
    axios
      .get(url)
      .then((res) => setListLocation(res.data.results))
      .catch((err) => console.log(err));
  };
  const handleFocus = () => setIsShow(false)
  const handleblur = () => setIsShow(false)

  return (
    <div className="app">
      <h1 className="app__tittle">Rick and Morty</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="form__input"
          type="text"
          id="input"
          onFocus={handleFocus}
          onBlur={handleblur}
        />
        <button className="form__btn">Search</button>
      </form>
          {/* <ul>
          {
            listLocation?.map(loc=>(
              <li onClick={() => setNumberLocation(loc.id)} key={loc.id}>{loc.name}</li>
            ))
          }
        </ul> */}
      {
      hasError ? (
        <h2 className="app__error">
          Hey! you must provide an id from 1 to 126
        </h2>
      ) : (
        <>
          <LocationInfo location={location} />

          <div className="residents__container">
            {location?.residents.map((url) => (
              <ResidentInfo key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
