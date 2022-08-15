import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Hero = () => {

    const navigate = useNavigate()
    const [heroDetail, setheroDetail] = useState([])
    const params = useParams()

    const [modifySlug, setModifySlug] = useState(null)
    const [modifyName, setModifyName] = useState(null)
    const [modifyPower, setModifyPower] = useState([])
    const [modifyColor, setModifyColor] = useState(null)
    const [modifyIsAlive, setModifyIsAlive] = useState(null)
    const [modifyAge, setModifyAge] = useState(null)
    const [modifyImage, setModifyImage] = useState(null)

    useEffect(() => {
        getHero()
    }, [])

    const getHero = async () =>{
        const request = await fetch(`http://localhost:5003/heroes/${params.slug}`)
        const response = await request.json()
        console.log(response.name);

        // console.log(modifyName)
        setheroDetail(response)
        setModifySlug(response.slug)
        setModifyName(response.name)
        setModifyPower(response.power)
        setModifyColor(response.color)
        setModifyIsAlive(response.isAlive)
        setModifyAge(response.age)
        setModifyImage(response.image)
    }

    // console.log(modifyName)

    const handleDeleteHero = async () => {
        // console.log(heroDetail.slug)
        const request = await fetch(`http://localhost:5003/heroes/${heroDetail.slug}`, {
            method: 'delete'
        })
        const response = await request.json()

        alert(`${heroDetail.slug} is correctly deleted !`)
        navigate(`/`)

    }

    const handleModifySlug = (e) => {
        setModifySlug(e.target.value)
        console.log(modifySlug)
    }

    const handleModifyName = (e) => {
        setModifyName(e.target.value)
        console.log(modifyName)
    }

    const handleModifyPower = (e) => {
        setModifyPower(e.target.value)
    }

    const handleModifyColor = (e) => {
        setModifyColor(e.target.value)
    }

    const handleModifyIsAlive = (e) => {
        setModifyIsAlive(e.target.checked)
        // console.log(modifyIsAlive);
    }

    const handleModifyAge = (e) => {
        setModifyAge(e.target.value)
    }

    const handleModifyImage = (e) => {
        setModifyImage(e.target.value)
    }

    const handleModifyHero = async (e) => {
        e.preventDefault()

        const heroModify ={
            slug: modifySlug,
            name: modifyName,
            power: [modifyPower],
            color: modifyColor,
            isAlive: modifyIsAlive,
            age: modifyAge,
            image: modifyImage
        }

        const request = await fetch(`http://localhost:5003/heroes/${heroDetail.slug}`, {
            method: "PUT", 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(heroModify)
        })
        const response = await request.json()
        console.log(response)

        alert('Modifications are taken into account')
        window.location.reload()

    }


    if (!heroDetail) {
        return <h3>Chargement...</h3>
      }
    return (
        <>
            <img src={heroDetail.image}/>
            <h2>{heroDetail.name}</h2>
            <ul>
                <li>Color: {heroDetail.color}</li>
                <li>Age: {heroDetail.age}</li>
                <li>is {heroDetail.name} alive ?
                {modifyIsAlive ? (" yes") : (" no")}</li>
            </ul>
            <Link to={`/power/${heroDetail.slug}`}>
                <button>See {heroDetail.name}'s power</button>
            </Link>
            <button onClick={handleDeleteHero}>Delete {heroDetail.name}</button>
            <h3>Modify {heroDetail.name} informations</h3>
            <form onSubmit={handleModifyHero}>
                <input type='text' placeholder={`change ${heroDetail.name}'s slug`} onChange={handleModifySlug} />
                <input type='text' placeholder={`change ${heroDetail.name}'s name`} onChange={handleModifyName} />
                <input type='text' placeholder={`change ${heroDetail.name}'s power`} onChange={handleModifyPower} />
                <input type='text' placeholder={`change ${heroDetail.name}'s color`} onChange={handleModifyColor} />
                <input type='checkbox' onChange={handleModifyIsAlive} />
                <input type='number' placeholder={`change ${heroDetail.name}'s age`} onChange={handleModifyAge} />
                <input type='text' placeholder={`change ${heroDetail.name}'s image`} onChange={handleModifyImage} />
                <button type="submit">Confirm modifications</button>
            </form>
        </>
    )
}

export default Hero 