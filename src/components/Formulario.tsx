import React, { useRef, useState } from 'react';
import { useAdicionarParticipante } from '../state/hook/useAdicionarParticipante';
import { useMensagemDeErro } from '../state/hook/useMensagemDeErro';


export const Formulario = () =>{
  
  const [nome, setNome] = useState('')
  
  const inputRef = useRef<HTMLInputElement>(null)

  const adicionarNaLista = useAdicionarParticipante()

  const mensagemDeErro = useMensagemDeErro()

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    //retiro o comportamento padrão do formulário, assim a página não é recarregada automaticamente
    evento.preventDefault()
    adicionarNaLista(nome)
    setNome("")
    inputRef.current?.focus()
  }

  
  return (
    <form onSubmit={adicionarParticipante}>
      <input
        ref={ inputRef } 
        type="text"
        onChange={ evento => setNome(evento.target.value) }
        placeholder="Insira os nomes dos participantes"
        value={ nome }
      />
      <button disabled={ !nome }>Adicionar</button>
      { mensagemDeErro && <p role='alert'>{ mensagemDeErro }</p> }
    </form>
  )
}