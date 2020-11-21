import React from "react";
import "./Table.css";
function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr key={country.name}>
          <td>{country.name}</td>
          <td>{country.cases}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
