import { Card } from './Card.jsx';

export function Cards({movies}) {

        return <ul className="cards__list">
            {
                movies.map((movie) => {
                    return <li className="cards__item" key={movie.imdbID}>
                        <Card
                            key={movie.imdbID}
                            movie={movie}
                        />
                    </li>
                })
            }
            
        </ul>
}
