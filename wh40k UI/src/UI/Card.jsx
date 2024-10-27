import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div className="card mt-2 mb-2 mx-2 card-shadow bg-secondary text-white">
      <div className="card-body">
        <div className="d-flex align-items-center position-relative">

          {/* IMAGE */}
          <img
            src={`${props.apiHost}/images/${props.unit.filename}`}
            className="img-thumbnail"
            style={{ width: "250px", height: "auto", margin: "15px" }}
            alt={"Image of " + props.unit.name}
          />

          {/* CARD DATA */}
          <div className="unit-info overflow-auto">
            <h5 className="card-title">{props.unit.name}</h5>

            <p className="card-text">
              Faction: {props.unit.faction}
              <br />
              Type: {props.unit.type}
              <br /> Points: {props.unit.points} <br /> State:{" "}
              {props.unit.state}
            </p>
            <p className="card-text">{props.unit.description}</p>
          </div>

          {props.showLinks && (
            <div className="position-absolute top-0 end-0">
              <Link
                to={`/update/${props.unit.id}`}
                className="btn btn-light btn-sm bg-secondary"
              >
                <i className="bi bi-pencil"></i>
              </Link>
              &nbsp;
              <Link
                to={`/delete/${props.unit.id}`}
                className="btn btn-light btn-sm bg-secondary"
              >
                <i className="bi bi-trash"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
