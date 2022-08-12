import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const CreateHero = () => {

    const navigate = useNavigate()
    const [slug, setSlug] = useState('')
    const [name, setName] = useState('')
    const [power, setPower] = useState([])
    const [color, setColor] = useState('')
    const [isAlive, setIsAlive] = useState(false)
    const [age, setAge] = useState('')
    const [image, setImage] = useState("")

    useEffect(() => {
        handleSubmit()
    }, [])

    const handleChangeSlug = e => {
        setSlug(e.target.value)
        // console.log(slug);
    }

    const handleChangeName = e => {
        // console.log(e.target.value);
        setName(e.target.value)
    }

    const handleChangePower = e => {
        setPower(e.target.value)
        // console.log(power)
    }

    const handleChangeColor = e => {
        setColor(e.target.value)
        // console.log(color)
    }

    const handleChangeIsALive = e => {
        setIsAlive(e.target.checked)
        // console.log(isAlive)
    }

    const handleChangeAge = e => {
        setAge(e.target.value)
        console.log(age)
    }

    const handleChangeImage = e => {
        setImage(e.target.value)
        console.log(image)
    }

    const handleSubmit = async e =>{
        e.preventDefault()

        const hero ={
            slug: slug,
            name: name,
            power: [power],
            color: color,
            isAlive: isAlive,
            age: age,
            image: image
        }
        
        const request = await fetch('http://localhost:5003/heroes', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(hero)
        })
        const response = await request.json()
        console.log(request)

        if(request.status === 200){
            navigate(`/hero/${hero.slug}`)
        }else if(request.status === 404){
            navigate(`/heroes`)
        }

    }

    return (
        <>
            <h2>Create a new hero</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="slug" onChange={handleChangeSlug} value={slug}/>
                <input type='text' placeholder="name" onChange={handleChangeName} value={name}/>
                <input type='text' placeholder="power" onChange={handleChangePower} value={power}/>
                <input type='text' placeholder="color" onChange={handleChangeColor} value={color}/>
                <input type='checkbox' onChange={handleChangeIsALive} checked={isAlive}/>
                <input type='number' placeholder="age" onChange={handleChangeAge} value={age}/>
                <input type='text' placeholder="image" onChange={handleChangeImage} value={image}/>
                <button type="submit">Create a hero</button>
            </form>
        </>
    )
}

export default CreateHero