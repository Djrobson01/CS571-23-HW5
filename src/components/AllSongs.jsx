import { useEffect, useState } from "react";
import {Row, Col} from 'react-bootstrap';
import Song from './Song';

const AllSongs = (props) => {
    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState(new Set());
    const [runTime, setRuntime] = useState(0);

    // anon function outside useEffect to calculate time and genres to fetch data once
    
    useEffect(() => {
        fetch("https://cs571.org/s23/hw5/api/songs", {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_14a36d6cb07d9384668f"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setSongs(data);
            console.log(data);
            let secs = 0;
            let mins = 0;
            data.forEach((song) => {
                setGenres((oldGenres) => oldGenres.add(song.genre));
                let time = song.length.split(":");
                mins += parseInt(time[0]);
                secs += parseInt(time[1]);
            })

            setRuntime(mins*60 + secs);
        })
    }, [])

    return <div>
        {
            songs ?
            <>
            <h1>Songs</h1>
            <h5>We have {songs.length} songs in {genres.size} genres for a total of {runTime} seconds of music!</h5>
            <Row>
                {
                    songs.map((song) => 
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
            </>
        : <></>
        }
    </div>
}

export default AllSongs;