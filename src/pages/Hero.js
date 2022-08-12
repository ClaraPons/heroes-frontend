import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Hero = () => {

    const [heroDetail, setheroDetail] = useState([])
    const params = useParams()

    useEffect(() => {
        getHero()
    }, [])

    const getHero = async () =>{
        const request = await fetch(`http://localhost:5003/heroes/${params.slug}`)
        const response = await request.json()
        // console.log(response);
        setheroDetail(response)
    }

    console.log(heroDetail)

    if (!heroDetail) {
        return <h3>Chargement...</h3>
      }
    return (
        <>
            <img src={heroDetail.image}/>
            <h2>{heroDetail.name}</h2>
            <Link to={`/power/${heroDetail.slug}`}>
                <button>See hero's power</button>
            </Link>
        </>
    )
}

export default Hero 