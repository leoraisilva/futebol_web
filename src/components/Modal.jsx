import { useEffect, useState } from 'react';
import '../components/modal.css';

function Modal({ clube }) {
    const [jogos, setJogos] = useState([]);
    const [partida, setPartida] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/jogos`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => {
            if (!res.ok) throw new Error("Erro na conexão do serviço");
            return res.json();
        })
        .then(dado => {
            setJogos(dado);
        })
        .catch(error => {
            console.error("Erro no carregamento de dados:", error);
        });
    }, []); 
    
    useEffect(() => {
        if (jogos.length > 0 && clube) {
            const jogoEncontrado = jogos.find(item =>
                item.mandante_escudo_nome_popular === clube.nome_popular ||
                item.visitante_escudo_nome_popular === clube.nome_popular
            );
    
            if (jogoEncontrado) {
                setPartida(jogoEncontrado);
            }
        }
    }, [jogos, clube]); 


    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {clube.nome_popular}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
  
            <div className="modal-body">
              <div className='container-modal'> 
                <div className='content-modal'>
                  <img src={partida.mandante_escudo} alt="Escudo Mandante" />
                  <p>{partida.mandante_escudo_nome_popular}</p>
                </div>
                <div className='content-modal-placar'>
                  <h2>{partida.placar_oficial_mandante}</h2> 
                  X
                  <h2>{partida.placar_oficial_visitante}</h2> 
                </div>
                <div className='content-modal'>
                  <img src={partida.visitante_escudo}  alt="Escudo Visitante" />
                  <p>{partida.visitante_escudo_nome_popular}</p>
                </div>
              </div>
            </div>
  
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Fechar
              </button>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  

export default Modal;
