/*eslint-disable react-hooks/exhaustive-deps */
/*eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container } from "reactstrap"
import axios from "axios"

const Anime = () => {
    const { id } = useParams()

    const [animeData, setAnimeData] = useState([])
    
    const animeUrl = `https://api.jikan.moe/v4/anime/${id}`
    useEffect(() => {
        fetch(animeUrl)
        .then((res) => res.json())
        .then((json) => {
            setAnimeData([json.data])
        })
        .catch(console.error)
        axios.get(animeUrl, {headers: {"Content-Type": "application/json"}})
        .then((data) => console.log(`Axios request: ${data}`))
    }, [])

    if(!animeData){
        return(
            <p>Page Loading</p>
            )
    }
    return(
        <>
            <Container>
        {
            animeData.map((item)=> (
                <div key={item.mal_id} className="anime-page-div">
            <img className="anime-img" alt={item.title} src={ item.images.jpg.large_image_url } />
                <h3><a href={item.trailer.embed_url} target="_blank" rel="noreferrer">{item.title}</a></h3>
                <div className="anime-info">
                    <ul className="anime-info-list">
                    {item.genres.map((genre, index)=> (
                        <li key={index}><p className="genre">{genre.name}</p></li>
                        ))}    
                    </ul>
                    <li><p>Ep {item.episodes} / {item.episodes} : {item.duration}</p> </li>
                </div>
                <h6>{item.synopsis}</h6>
                </div>
        ))
    }
    </Container>
        </>
    )
}

export default Anime