import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Anime = () => {
    const { id } = useParams()

    const [animeData, setAnimeData] = useState([])
    
    const animeUrl = `https://api.jikan.moe/v4/anime/${id}`
    console.log(animeUrl)
    useEffect(() => {
        fetch(animeUrl)
        .then((res) => res.json())
        .then((json) => {
            console.log(json.data)
            setAnimeData([json.data])
            console.log(animeData)
        })
    }, [])
    
    console.log(animeData)
    
    if(!animeData){
        console.log(animeData)
        return(
            <p>Page Loading</p>
            )
    }
    console.log(animeData)
    return(
        <>
        {
            animeData.map((item)=> (
                <div>
            <img className="anime-img" alt={"img"} src={ item.images.jpg.small_image_url } />
             <h2>{ item.title_english ? item.title_english : item.title}</h2>
                <h4>{ item.title_japanese}</h4>
                    </div>
        
    ))
        }
        </>
    )
}

export default Anime