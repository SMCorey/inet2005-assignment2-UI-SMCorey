import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function Update() {
  const { id } = useParams();
  const [unit, setUnit] = useState(null);
  const [unitImg, setUnitImg] = useState(null);
  const [responseError, setResponseError] = useState(null);

  // API URL
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + `/api/wh40k/get/${id}`;
  const updateUrl = apiHost + `/api/wh40k/update/${id}`;
  console.log(apiUrl);

  useEffect(() => {
    // Fetch the unit data from your API using the `id` and set it in state
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUnit(data);
        setUnitImg(`${apiHost}/images/${data.filename}`);
      })
      .catch((error) => console.error("Error fetching unit:", error));
  }, [id]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Add new contact to API
  function updateUnit(data) {
    //e.preventDefault();

    console.log(data);

    // Create form
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("faction", data.faction);
    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("points", data.points);
    formData.append("state", data.state);
    formData.append("image", data.image[0] || null);

    // "Put" data to API/Database
    async function putData() {
      const response = await fetch(updateUrl, {
        method: "PUT",
        body: formData,
      });

      // Handle response
      if (response.ok) {
        window.location.href = "/";
      } else {
          setResponseError(`Error: Could not update unit - ${response.statusText}`)
      }
    }

    putData();
  }
  // Doesnt load the page fully if unit doesnt exist
  if (!unit) {
    return <div>Loading...</div>;
  }

  // Update image if new image selected
  const handleImageChange = (item) => {
    const file = item.target.files[0];
    if (file) {
      setUnitImg(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100 min-vw-100">
      <h1 className="text-center fw-bold">Update Unit</h1>
      <div className="container">
        {responseError && <h2 className="text-center text-danger">{responseError}</h2>}
        {/* FORM START */}
        <form
          onSubmit={handleSubmit(updateUnit)}
          method="post"
          encType="multipart/form-data"
          className="mx-auto"
          style={{ maxWidth: "600px" }}
        >
          {/* UNIT IMG */}
          <div className="mb-3 d-flex justify-content-center">
            <img
              src={unitImg || `${apiHost}/images/${unit.filename}`}
              className="img-thumbnail mb-3"
              style={{ maxWidth: "75%", height: "auto" }}
              alt={`Image of ${unit.name}`}
            />
          </div>

          {/* IMG SELECTION */}
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              {...register("image", {
                validate: {
                  validFormat: (value) => {
                    const file = value[0];
                    if (file) {
                      const regex = /\.(jpg|jpeg|png|webp)$/i;
                      return (
                        regex.test(file.name) ||
                        "Invalid file type. Only jpg, jpeg, png, and webp are allowed."
                      );
                    }
                    return true;
                  },
                },
              })}
              type="file"
              className="form-control bg-light"
              onChange={handleImageChange}
            />
            {errors.image && (
              <span className="text-danger">{errors.image.message}</span>
            )}
          </div>

          {/* NAME */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              {...register("name")}
              type="text"
              className="form-control bg-light"
              placeholder={unit.name}
            />
            {errors.name && (
              <span className="text-danger">Name is required.</span>
            )}
          </div>

          {/* FACTION */}
          <div className="mb-3">
            <label className="form-label">Faction</label>
            <input
              {...register("faction")}
              type="text"
              className="form-control bg-light"
              placeholder={unit.faction}
            />
            {errors.faction && (
              <span className="text-danger">Faction is required.</span>
            )}
          </div>

          {/* TYPE */}
          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              {...register("type")}
              type="text"
              className="form-control bg-light"
              placeholder={unit.type}
            />
            {errors.type && <span className="text-danger">Type required.</span>}
          </div>

          {/* STATE */}
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              {...register("state")}
              type="text"
              className="form-control bg-light"
              placeholder={unit.state}
            />
          </div>

          {/* POINTS */}
          <div className="mb-3">
            <label className="form-label">Points</label>
            <input
              {...register("points", {
                validate: {
                  validFormat: (value) =>
                    /^([0-9]{0,4})$/.test(value) ||
                    "Invalid Points. 0-9999 Allowed",
                },
              })}
              type="text"
              className="form-control bg-light"
              placeholder={unit.points}
            />
            {errors.points && (
              <span className="text-danger">{errors.points.message}</span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              {...register("description")}
              type="text"
              className="form-control bg-light"
              placeholder={unit.description}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <Link to="/" className="btn btn-outline-secondary ms-3">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
