import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { Formulario } from '../components/Formulario';
// Jest


describe('comportamento de Formulario.tsx', () => {
  test('quando o input está vazio, novos participantes não podem ser adicionados', ()=>{
  
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    //encontrar no dom o input está vazio
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    //encontrar o botão
    const botao = screen.getAllByRole('button')[0]
    //garantir que o input input esteja no documento
    expect(input).toBeInTheDocument();
    //garantir que o botão esteja  desabilitado
    expect(botao).toBeDisabled();
    
  })
  test('adicionar um participante caso exista um nome preenchido', () =>{
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    //encontrar no dom o input está vazio
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    //encontrar o botão
    const botao = screen.getAllByRole('button')[0]
  
    //inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      } 
    })
    //clicar no botao submeter
    fireEvent.click(botao)
    //garantir que o input esteja com o foco ativo para
    expect(input).toHaveFocus()
    //garantir que o input não tenha um valor
    expect(input).toHaveValue("")
  })
  test('nomes duplicado não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getAllByRole('button')[0]
  
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      } 
    })
    //clicar no botao submeter
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      } 
    })
    //clicar no botao submeter
    fireEvent.click(botao)
  
    //pegando a mensagem de erro
    const mensagemDeErro = screen.getByRole('alert')
  
    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos')
  })
  test('a mensagem de erro de duplicidade deve sumir após os timers', () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Formulario/>
      </RecoilRoot>
    )
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getAllByRole('button')[0]
  
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      } 
    })
    //clicar no botao submeter
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      } 
    })
    fireEvent.click(botao)
  
    
    //let mensagemDeErro = screen.getByRole('alert')
    //getByrole tenta pegar o elemento e caso não consiga, estoura um erro
    //caso não haja problema em eu tentar pegar o elemento e ele não existir,
    //posso utilizar o queryByRole
    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()
  
    //esperar N segundos
  
    //colocar dentro da função act pois quando executamos todos os timers, o formulário se renderiza novamente
    act(() => {
      jest.runAllTimers()
    });
     
    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
  })
})


