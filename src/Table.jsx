import React from "react";
import "./Table.css";
function Table({ countries }) {
  return (
    <div className="table">
      <table>
        <thead></thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>{country.cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
