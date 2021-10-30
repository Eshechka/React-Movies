import noPhoto from "../img/nophoto.png";

export function Card(props) {
  const { Title, Poster, Year, Type } = props.movie;

  return (
    <div className="card">
      <div className="card-image waves-effect waves-block waves-light card__image">
        {
          <img
            className="activator"
            src={Poster === "N/A" ? noPhoto : Poster}
            alt="poster"
          />
        }
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          {Title}
        </span>
        <div className="grey-text text-darken-3">
          year: {Year}
          <span className="grey-text text-darken-3 right">type: {Type}</span>
        </div>
      </div>
    </div>
  );
}
