import { Card, CardContent, FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
// BEM naming convention
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({});

  // https://disease.sh/v3/covid-19/countries
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((resp) => resp.json())
      .then((data) => {
        setcountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const geCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((resp) => resp.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            cases: country.cases,
          }));
          const sortedData = sortData(countries);
          setCountries(sortedData);
        });
    };
    geCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setcountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem key="worldwide" value="worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></Infobox>
          <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></Infobox>
          <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></Infobox>
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={countries} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
