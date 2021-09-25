import './styles.css';

import axios from 'axios';
import React, { useCallback, useState } from 'react';

import computador from '../../assets/images/computador-vetor.png';


function Main(){

    const [vagas, setVagas] =  useState([]);

    const handleSessaoVagas = useCallback((event) => {
       
    if(event === '1'){
        axios.get("https://api.github.com/repos/frontendbr/vagas/issues")
        .then(response => {
           setVagas(response.data);
        }) 
    }else if (event === '2'){
        axios.get("https://api.github.com/repos/backend-br/vagas/issues")
        .then(response => {
           setVagas(response.data);
        })
    }
},[]);

const handleRemoverVaga = useCallback((id) => {

    const newVagas = vagas.filter((vaga => vaga.id !== id))
 
      setVagas(newVagas)
           
},[vagas]); 


    return(
                
       <div className="container">

        <div className="banner">
            <div className="primeira-sessao">
                <h1 className="span-formulario">Diga o que esta procurando hoje.</h1>

                <div className="formulario">

                    <div className="divisao">
                        <select className="selects" id="selects" 
                            onChange={(event) => {handleSessaoVagas(event.target.value)}}
                        >
                            <option selected disabled>Selecione o cargo desejado</option>
                            <option value="1">Front-end</option>
                            <option value="2">Back-end</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
        <div className="sessao-vagas">
            {vagas.map((vaga)=>(
                <div key={vaga.id}>
                    <div className = "vagas">
                        <span className="titulo-vagas">{vaga.title}</span>
                        <span className="desc-vagas">{vaga.body}
                            <button 
                                className="btn-remover" 
                                onClick={() => {handleRemoverVaga(vaga.id)}}                            
                            >Remover</button>
                        </span>
                    </div>
                </div>    
            ))}
        </div>
        <div className="segunda-sessao">
            <div className="div-visao">
                <img className="img-visao" src={computador} alt="imagem-de-computador"></img>
            </div>
            <article className="missao">
                <h2>Na Vagas Tech, nossa missão é ser um site que inspira e satisfaz sua curiosidade por novas vagas
                    na area de TI. Nossa paixão infinita por tecnologia, conteúdo e serviços, nós motivam sempre
                    estar em buscas por inovação, permitem com que possamos oferecer qualidade em serviço para você.
                </h2>
            </article>
        </div>
    </div>
    )
}

export default Main;