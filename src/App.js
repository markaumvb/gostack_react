import React, {useEffect, useState} from "react";
import api from 'services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  //Pegar os dados da API
  useEffect(() => {
    api.get('repositories').then(response=>{
      setRepositories(response.data)
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: 'Umbriel',
      url: 'http://www.github.com/markaumvb/simb',
      techs: ['node', 'react']
    })

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    //apagar o repositorio da api
    await api.delete(`repositories/${id}`);

    //apagar da lista
    // filter procura em todo o array [repositories], com iteração de 1 em 1, assim ele refaz o array 
    setRepositories (repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=>
        <li key = {repository.id}>
          {repository.title}
          <button onClick={() =>handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
