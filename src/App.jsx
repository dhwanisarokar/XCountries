import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

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
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="heading">
        <h1>XCountries</h1>
      </div>
      <div className="container">
        {countries?.map((item, idx) => (
          <div key={idx} className="box">
            <img src={item.flags.png} alt={`${item.name.common} flag`} />
            <p>{item.name.common}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
