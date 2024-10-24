import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../UI/Card";

export default function Home() {
  const [units, setUnits] = useState([]); // initialize as empty array
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "/api/wh40k/all";

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (!ignore) {
          setUnits(data);
        }
      } else {
        setUnits(null);
      }
    }

    document.body.style.back;

    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    };
  }, []); // run only once

  return (
    <>
      <div className="bg-dark text-white min-vh-100">
        <h1 className="text-center fw-bold">My Warhammer 40,000 Units</h1>
        <div className="d-flex justify-content-center mb-4">
          <Link to="/create" className="btn btn-warning">
            Add New Unit
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-2">
          {units.length > 0 ? (
            units.map((unit) => (
              <div className="col">
                <Card unit={unit} apiHost={apiHost} showLinks={true} />
              </div>
            ))
          ) : (
            <p>No Units.</p>
          )}
        </div>
      </div>
    </>
  );
}
