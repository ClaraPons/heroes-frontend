import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Power = () => {

    const params = useParams()
    const [hero, setHero] =useState(null)
    const [power, setPower] = useState(null)
    const [newPower, setNewPower] = useState(null)

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

    // const handleSubmitPut = async () => {
    //     const request = await fetch(`http://localhost:5003/heroes/${params.slug}/powers`, {
    //         method: "PUT", 
    //         headers: {
    //             'Content-Type'
    //         }
    //     })
    // }

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
                <ul>
                    <li>{power}</li>
                </ul>
                )
            })}
            <form onSubmit={handleSubmitPut}>
                <button type="submit">Add a new power</button>
            </form>
        </>
    )
}

export default Power
