import { useContext, useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from './Song';

const FavoriteSongs = (props) => {
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [runTime, setRuntime] = useState(0);
    const [genres, setGenres] = useState(new Set());
    const [favSongs, setFavSongs] = useState([]);

    // rule of thumb is that data can be fetched only once and use anonymous functions
    // songs.filter((song) => favorites.includes(song.id))

    console.log(`favs = ${favorites}`)
    useEffect(() => {
        setFavSongs([])
        setGenres(new Set())
        fetch("https://cs571.org/s23/hw5/api/songs", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_14a36d6cb07d9384668f"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            let secs = 0;
            let mins = 0;
            data.forEach((song) => {
                if(favorites.includes(song.id)) {
                    setFavSongs((oldFavs) => [...oldFavs, song])
                    setGenres((oldGenres) => oldGenres.add(song.genre));
                    let time = song.length.split(":");
                    mins += parseInt(time[0]);
                    secs += parseInt(time[1]);
                }
            })

            setRuntime(mins*60 + secs);
        })
    }, [favorites])

    return <div>
        <h1>Favorites</h1>
        <h5>You have favorited {favSongs.length} songs in {genres.size} genres for a total of {runTime} seconds of music!</h5>
        <Row>
            {
                favSongs.map((song) => 
                  <Col key={song.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Song 
                        artist={song.artist}
                        genre={song.genre}
                        img={song.img}
                        length={song.length}
                        title={song.title}
                        year={song.year}
                        id={song.id}
                    />
                  </Col>
                )
            }
        </Row>
    </div>
}

export default FavoriteSongs;