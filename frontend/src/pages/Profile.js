import React ,{useEffect, useState}from 'react'
import { Link, useHistory } from "react-router-dom";
import logoImg from '../img/logo.svg'
import{ FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../services/api'



export default function Profile() {
    const [incidents, setIncidents] = useState([])
    
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    
    const history = useHistory();

    useEffect(()=>{
        api.get('profile', {
            headers: {
                authorization: ongId
            }
        }).then(response =>{
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id){
         try{
            await api.delete(`incidents/${id}`, {
                headers:{
                    authorization:ongId,
                }
            })
        setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err){
            alert('Erro ao deletar o caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
      }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/newIncident">Cadastrar novos casos</Link>
                <button type="button"  onClick={handleLogout}>
                    <FiPower size={18} color="#A8A8B3"/>
                </button>
            </header>

            <h1 className="texto">casos cadastrados</h1>

            <ul>
                   {incidents.map(incident =>(
                       <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>
        
                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>
        
                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                            {/* arrow function sendo passada pq se nao na hr que atualizar a page deleta td */}
                            <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#999"/>
                            </button>
                       </li>
                   ))}
             
            </ul>
        </div>
        )

}