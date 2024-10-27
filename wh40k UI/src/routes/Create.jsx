import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Create() {
  // API URL
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "/api/wh40k/add";

  const [responseError, setResponseError] = useState(null);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Add new contact to API
  function addUnit(data) {
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

    // Post data to API
    async function postData() {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      // Handle repsonse
      if (response.ok) {
        window.location.href = "/";
      } else {
          setResponseError(`Error: Could not create unit - ${response.statusText}`)
      }
    }

    postData();
  }

  return (
    <div className="bg-dark text-white min-vh-100 min-vw-100">
      <h1 className="text-center fw-bold">Add new Unit</h1>
      <div className="container">
        {responseError && <h2 className="text-center text-danger">{responseError}</h2>}
        <form
          onSubmit={handleSubmit(addUnit)}
          method="post"
          encType="multipart/form-data"
          className="mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="form-control bg-light"
            />
            {errors.name && <span className="text-danger">Name required.</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Faction</label>
            <input
              {...register("faction", { required: true })}
              type="text"
              className="form-control bg-light"
            />
            {errors.faction && (
              <span className="text-danger">Faction required.</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <input
              {...register("type", { required: true })}
              type="text"
              className="form-control bg-light"
            />
            {errors.type && <span className="text-danger">Type required.</span>}
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              {...register("description")}
              type="text"
              className="form-control bg-light"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              {...register("state")}
              type="text"
              className="form-control bg-light"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Points</label>
            {/* <input {...register("email", { required: true })} type="text" className="form-control bg-light" />
              {errors.email && <span className="text-danger">Email is required.</span>} */}
            <input
              {...register("points", {
                required: "Points required.",
                validate: {
                  validFormat: (value) =>
                    /^([0-9]{1,4})$/.test(value) ||
                    "Invalid Points. 0-9999 Allowed",
                },
              })}
              type="text"
              className="form-control bg-light"
            />
            {errors.points && (
              <span className="text-danger">{errors.points.message}</span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              {...register("image")}
              type="file"
              className="form-control bg-light"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
          <Link to="/" className="btn btn-outline-secondary ms-3">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
