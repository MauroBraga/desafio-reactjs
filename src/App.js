import React, { useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
 
  const [repositories, setRepositories] = useState([])
  
  useState(() =>{
    api.get('repositories').then(resp=> setRepositories(resp.data))
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Desafio  ${Date.now()}`, 
      url: "http://github.com/...", 
      techs: ["Node.js", "..."]
    })

      const repositorie = response.data

      setRepositories([... repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
    
    api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => {


          return (
            <li key={repositorie.id}>
                {repositorie.title}
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </li>
          )
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
