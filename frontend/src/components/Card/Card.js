import React from 'react';
import typeColors from '../../helpers/typeColors'
import './style.css';
import StarIcon from '../starIcon';

function Card({ pokemon, isFavourite, setFavourites }) {
    const addFav = async (pokemon) => {
        const res = await fetch(process.env.REACT_APP_ENDPOINT, {
            method: isFavourite?'DELETE':'POST',  
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({userID: localStorage['userID'], pokemonID: pokemon.id})
        })
        const data = await res.json();
        setFavourites(data.favourites)
    }

    return (
        <div className="Card">
            <div className="Card__img">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="Card__name">
                {pokemon.name} 
                <StarIcon isFilled={isFavourite}/>
                <div className='btn'>
                    <button onClick={() => addFav(pokemon)}>Favourite</button>
                </div>
            </div>
            <div className="Card__types">
                {
                    pokemon.types.map(type => {
                        return (
                            <div className="Card__type" style={{ backgroundColor: typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="Card__info">
                <div className="Card__data Card__data--weight">
                    <p className="title">Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="Card__data Card__data--weight">
                    <p className="title">Height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="Card__data Card__data--ability">
                    <p className="title">Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
