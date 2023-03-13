import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const{ useState,useEffect } = React;

const App = () => {
    const[characters,setCharacters] = useState([]);
    const[name,setName] = useState('');
    const[finalForm,setFinalForm] = useState('')
    const[species,setSpecies] = useState('')
    const[error,setError] = useState('')
    useEffect(() =>{
        const fetchCharacters = async() => {
            const response = await axios.get('/api/characters')
            setCharacters(response.data)
        }
        fetchCharacters()
    },[])

    const create = async(ev) =>{
        try{
            ev.preventDefault()
            const character = {name,species,finalForm}
            const response = await axios.post('/api/characters', character);
            setCharacters([...characters,response.data])
            setName('')
            setFinalForm('')
            setSpecies('')
            setError('')
        }
        catch(ex){
            setError(ex.response.data.error.errors[0].message);
        }
    }

    const increment = async(character) => {
        const response = await axios.put(`/api/characters/${character.id}`,{
            powerLevel:character.powerLevel + 200000
        })
        character = response.data
        setCharacters(characters.map(_character => {
            if(_character.id === character.id){
                return character
            }
            return _character
        }))
    }

    const decrement = async(character) => {
        const response = await axios.put(`/api/characters/${character.id}`,{
            powerLevel:character.powerLevel - 200000
        })
        character = response.data
        setCharacters(characters.map(_character => {
            if(_character.id === character.id){
                return character
            }
            return _character
        }))
    }

    const destroy = async(character) => {
        await axios.delete(`/api/characters/${character.id}`);
        setCharacters(characters.filter(_character => _character.id !== character.id ));
    }

    return (
        <div>
            <h2>Dragon Ball Z & Super React</h2>
            <form onSubmit={ create }>
                {error}
                <input value={name} onChange={ ev => setName(ev.target.value)} placeholder='Enter the name of character'/>
                <input value={finalForm} onChange={ ev => setFinalForm(ev.target.value)} placeholder = 'Enter the final form of  the character'/>
                <select value={species} onChange={ ev => setSpecies(ev.target.value )}>
                    <option value = ''>--choose a species---</option>
                    <option value='Saiyan'>Saiyan</option>
                    <option value='Namek'>Namek</option>
                    <option value='Earthling'>Earthling</option>
                </select>
                <button disabled = {!species || !name || !finalForm}>Add a new character</button>
            </form>
            <ul>
                {
                    characters.map(character => {
                        return (
                            <li key={character.id}>
                                {character.name}< br/>
                                species: {character.species}< br/>
                                final form: {character.finalTransformation}< br/>
                                power level: {character.powerLevel}<button onClick = {() => decrement(character)}>-</button><button onClick={ () => increment(character)}>+</button><button onClick ={ ()=>destroy(character)}>x</button>
                                <br />
                                <br />
                                <br />
                            </li>


                        )
                    })
                }
            </ul>
        </div>
    )
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />)

