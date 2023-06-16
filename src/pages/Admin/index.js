import { useState, useEffect } from 'react';
import './admin.css';

import { auth, db } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';
import { 
    addDoc ,
    collection
} from 'firebase/firestore';


export default function Admin(){
    const [tarefa, setTarefa] = useState('');
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadtarefas(){
            const userDetail = localStorage.getItem("@detailUser");
            setUser(JSON.parse(userDetail))
        }

        loadtarefas();
    }, [])

    async function handleRegister(e){
        e.preventDefault();

        if(tarefa === ''){
            alert("Digite sua tarefa...")
            return;
        }

        await addDoc(collection(db, "tarefas"),{
            tarefa: tarefa,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            console.log("TAREFA REGISTRADA")
            setTarefa('')
        })
        .catch((error) => {
            console.log("ERRO AO REGISTRAR "+ error)
        })
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