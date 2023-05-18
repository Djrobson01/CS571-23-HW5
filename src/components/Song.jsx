import { Card, Button } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import { useContext } from 'react';

const Song = (props) => {
    const [favs, setFavs] = useContext(BadgerBeatsFavoritesContext);

    const addSong = () => {
        setFavs((oldFavs) => [...oldFavs, props.id])
    }

    const removeSong = () => {
        setFavs((oldFavs) => oldFavs.filter((fav) => fav !== props.id));
    }

    return <Card style={{width: 'auto', height: 'auto', marginBottom: '20px'}}>
        <Card.Img variant="top" src={props.img} alt={`Cover photo for ${props.title} by ${props.artist}`} />
        <Card.Body style={{paddingBottom: "10px"}}>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                by {props.artist} <br /> {props.genre} | {props.year} | {props.length}
            </Card.Text>
            {
                favs.includes(props.id)
                ? <Button variant="danger" onClick={removeSong}>Remove from Favorites</Button>
                : <Button variant="primary" onClick={addSong}>Add to Favorites</Button>
            }
            
        </Card.Body>
    </Card>
}

export default Song;