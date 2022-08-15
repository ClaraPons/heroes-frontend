import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../App.css'

const Home = () => {

    const [hero, setHero] = useState(null)

    useEffect (() => {
        getHeroes()
    }, [])

    const getHeroes = async () => {
        const request = await fetch('http://localhost:5003/heroes')
        const response = await request.json()
        console.log(response)
        setHero(response)
    }

    

    if (!hero) {
        return <h3>Chargement...</h3>
      }
      console.log(hero.power)
    return (
        <>
            <h1>Home</h1>    
            {hero.map(hero => {
                return(
                <div key={hero.slug} className="heroes-box">
                    <img className="image-home" src={hero.image}/>
                    <h2 key={hero.slug}>{hero.name}</h2>
                    <Link to={`/hero/${hero.slug}`}>
                        <button>See {hero.slug} description</button>
                    </Link>
                </div>
                )
            })}
            <Link to={`create-hero`}>
                <button>Create a new hero</button>
            </Link>
        </>
    
    )
}

export default Home