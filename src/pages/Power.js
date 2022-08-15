import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Power = () => {

    const params = useParams()
    const [hero, setHero] = useState(null)
    const [power, setPower] = useState(null)
    const [newPower, setNewPower] = useState(undefined)

    useEffect(() =>{
        getPower()
        getHero()
    }, [])

    const getPower = async () =>{
        const request = await fetch(`http://localhost:5003/heroes/${params.slug}/powers`)
        const response = await request.json()
        // console.log(response)
        setPower(response)
    }

    const getHero = async () => {
        const request = await fetch(`http://localhost:5003/heroes/${params.slug}/`)
        const responseBis = await request.json()
        setHero(responseBis)
    }

    const handleChangePower = (e) => {
        console.log(e.target.value)
        setNewPower(e.target.value)
    }

    const handleSubmitPut = async (e) => {
        e.preventDefault()

        const addPower = {power : newPower}

        const request = await fetch(`http://localhost:5003/heroes/${params.slug}/powers`, {
            method: "PUT", 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(addPower)
        })

        const response = await request.json()

        console.log(request.status)

        if(request.status === 200){
            alert(`the power ${newPower} is correctly added !`)
            window.location.reload()
        }else if(request.status === 404){
            alert(`Power already exist`)
        }else if(request.status === 409){
            alert(`Power is empty`)
        }
    }   

    console.log(power)

    const handleDeletePower = async (e) => {
        e.preventDefault()

        const request = await fetch(`http://localhost:5003/heroes/${params.slug}/power/${e.target.value}`, {
            method: "delete"
        })
        const response = await request.json()

        console.log(response)

            alert(`Le pouvoir ${e.target.value} du héro ${hero.slug} a été effacé correctement`)
            window.location.reload()
    }

    // console.log(power)

    if(!power || !hero){
       return <h3>Chargement...</h3>
    }
    return(
        <>
            <img src={hero.image}/>
            <h2>{hero.name}'s Power</h2>
            {power.map((power) => {
                return(
                <ul key={power}>
                    <li>{power}</li>
                    <button onClick={handleDeletePower} value={power} >Delete this power</button>
                </ul>
                )
            })}
            <form onSubmit={handleSubmitPut}>
                <input type='text' placeholder="add power" onChange={handleChangePower} value={newPower}/>
                <button type="submit">Add a new power</button>
            </form>
        </>
    )
}

export default Power
