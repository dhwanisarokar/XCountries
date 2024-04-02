import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/search";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCountries, setFilterCountries] = useState([]);

  async function fetchAPIData() {
    try {
      const res = await axios("https://restcountries.com/v3.1/all");
      return res.data;
    } catch (error) {
      console.log("Error fetching countries", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAPIData();
      setCountries(data);
      setFilterCountries(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;

    if (value) {
      const filterCountries = countries.filter((ele) =>
        ele.name.common.toLowerCase().includes(value.toLowerCase())
      );

      setFilterCountries(filterCountries);
    } else {
      setFilterCountries(countries);
    }
  };

  return (
    <>
      <div className="heading">
        <h1>XCountries</h1>
      </div>
      <SearchBar handleChange={handleChange} />
      <div className="container">
        {loading ? (
          <h1>Loading..</h1>
        ) : (
          filterCountries?.map((item, idx) => (
            <div key={idx} className="box">
              <img src={item.flags.png} alt={`${item.name.common} flag`} />
              <p>{item.name.common}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
