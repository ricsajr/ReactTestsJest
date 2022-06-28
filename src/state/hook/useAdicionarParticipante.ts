import { erroState } from './../atom';
import { useRecoilValue, useSetRecoilState } from "recoil"
import { listaDeParticipantesState } from "../atom"

//criando hook para teste
export const  useAdicionarParticipante = () =>{

  //criando setter para incluir nomes na lista
  //informo à função a lista com a qual quero trabalhar
  const setLista = useSetRecoilState(listaDeParticipantesState)
  const lista = useRecoilValue(listaDeParticipantesState)
  const setErro = useSetRecoilState(erroState)
  
  //adicionando o nome
  return (nomeDoParticipante: string) =>{


    //verificando se há nomes duplicados na lista e setando a mensagem de erro no state da mesma
    if(lista.includes(nomeDoParticipante)){
      setErro('Nomes duplicados não são permitidos')
      setTimeout(() =>{
        setErro("")
      }, 5000)
      return
    }
    //a funcao setLista me possibilita acessar o estado atual da lista e adicionar o nome do
    //novo participante
    return setLista(listaAtual =>  [...listaAtual, nomeDoParticipante])
  }

}