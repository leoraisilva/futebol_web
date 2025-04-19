import Modal from "./Modal"
import '../components/tabela.css'
import { useEffect, useState } from "react";

function Tabela () {
    const [data, setData] = useState([])
    const [clubeSelecionado, setClubeSelecionado] = useState(null);

    const handleOpenModal = (clube) => {
        setClubeSelecionado(clube);
      };
    

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/tabela`, {
            method: 'GET',
            mode: 'cors' 
        })
        .then(res => {
            if(!res.ok)
                throw new Error('Erro na conexao');
            return res.json()
        })
        .then(dado => {
            setData(dado);
        })
        .catch(error => {
            console.Error("erro carregamento de dado")
        }, [])
    })
  
    return (
      <main className="container-table">
        <div>
            <div className="content-table">
                <table className="table table-striped table-bordered">
                    <thead  className="table-light content-header" >
                        <tr>
                            <td>Clube</td>
                            <td>Pontos</td>
                            <td>V</td>
                            <td>E</td>
                            <td>D</td>
                            <td>GF</td>
                            <td>GC</td>
                            <td>SG</td>
                            <td>%</td>
                        </tr>
                    </thead>
                    {data.map((value, index) => (
                        <tbody className="table-light">
                            <tr key={index} >
                                <td><img src={value.escudo} />
                                    <button type="button" className="btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleOpenModal(value)}>
                                        {value.nome_popular}
                                    </button>
                                </td>
                                <td>{value.pontos}</td>
                                <td>{value.vitorias}</td>
                                <td>{value.empates}</td>
                                <td>{value.derrotas}</td>
                                <td>{value.gols_pro}</td>
                                <td>{value.gols_contra}</td>
                                <td>{value.saldo_gols}</td>
                                <td>{value.aproveitamento}%</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                {clubeSelecionado && <Modal clube={clubeSelecionado} />}
            </div>
        </div>
      </main>
  
    );
}


export default Tabela;