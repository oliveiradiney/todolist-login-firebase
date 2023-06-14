import { useState } from 'react';
import './admin.css';

import { auth } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';


export default function Admin(){
    const [tarefa, setTarefa] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        console.log("CLICOU")
    }

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form className="form" onSubmit={handleRegister}>
                <textarea 
                    placeholder='Digite sua tarefa...'
                    value={tarefa}
                    onChange={(e) => setTarefa(e.target.value)}

                />

                <button className="btn-register" type="submit">Registrar tarefa</button>
            </form>

            <article className='list'>
                <p>Estudar javascript e reactjs hoje a noite</p>

                <div>
                    <button>Editar</button>
                    <button className='btn-delete'>Concluir</button>
                </div>
            </article>
            
            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}