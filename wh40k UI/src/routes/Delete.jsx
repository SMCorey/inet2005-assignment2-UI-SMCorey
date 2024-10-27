import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../UI/Card";

export default function Delete() {
  const { id } = useParams();

  // Store the result from API
  const [unit, setUnit] = useState(null);
  const [responseError, setResponseError] = useState(null);

  const apiHost = import.meta.env.VITE_API_HOST;
  const getUrl = apiHost + "/api/wh40k/get/" + id;
  const deleteUrl = apiHost + "/api/wh40k/delete/" + id;

  // GET the contact to delete
  useEffect(() => {
    // Fetch data from API
    async function fetchUnit() {
      const response = await fetch(getUrl);
      if (response.ok) {
        const data = await response.json();
        if (!ignore) {
          setUnit(data);
        }
      } else {
        setUnit(null);
      }
    }

    let ignore = false;
    fetchUnit();
    return () => {
      ignore = true;
    };
  }, []);

  // Put data to API
  async function deleteUnit() {
    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });

    // Control for good/bad response
    if (response.ok) {
      window.location.href = "/";
    } else {
        setResponseError(`Error: Could not delete unit - ${response.statusText}`)
    }
  }

  return (
    <div className="bg-dark text-white min-vh-100 min-vw-100">
      <h1 className="text-center fw-bold">Remove Unit</h1>
      <h2 className="text-center fw-bold">
        Are you sure you want to remove this unit?
      </h2>
      <div className="container">
        {responseError && <h2 className="text-center text-danger">{responseError}</h2>}
        {unit && <Card unit={unit} apiHost={apiHost} showLinks={false} />}
      </div>

      <p className="text-center fw-bold">
        <button className="btn btn-danger" onClick={deleteUnit}>
          Yes
        </button>{" "}
        <Link to="/" className="btn btn-outline-secondary">
          Cancel
        </Link>
      </p>
    </div>
  );
}
