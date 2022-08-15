import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Hero = () => {

    const navigate = useNavigate()
    const [heroDetail, setheroDetail] = useState([])
    const params = useParams()

    const [modifyName, setModifyName] = useState(response.slug)

    useEffect(() => {
        getHero()
    }, [])

    const getHero = async () =>{
        const request = await fetch(`http://localhost:5003/heroes/${params.slug}`)
        const response = await request.json()
        // console.log(response);
        setheroDetail(response)
    }

    const handleDeleteHero = async () => {
        // console.log(heroDetail.slug)
        const request = await fetch(`http://localhost:5003/heroes/${heroDetail.slug}`, {
            method: 'delete'
        })
        const response = await request.json()

        alert(`${heroDetail.slug} is correctly deleted !`)
        navigate(`/`)
    }

    const handleModifyName = () => {
        console.log(modifyName)
    }

    // console.log(heroDetail)

    if (!heroDetail) {
        return <h3>Chargement...</h3>
      }
    return (
        <>
            <img src={heroDetail.image}/>
            <h2>{heroDetail.name}</h2>
            <Link to={`/power/${heroDetail.slug}`}>
                <button>See {heroDetail.name}'s power</button>
            </Link>
            <button onClick={handleDeleteHero}>Delete {heroDetail.name}</button>
            <h3>Modify {heroDetail.name} informations</h3>
            <form>
                <input type='text' placeholder="change the name" onChange={handleModifyName}/>
            </form>
        </>
    )
}

export default Hero 