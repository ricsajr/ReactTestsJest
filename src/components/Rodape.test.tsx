import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { Rodape } from './rodape';
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipantes';


jest.mock('../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

// mockando o hook de navegacao
const mockNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    
    useNavigate: () => mockNavegacao // utilizar outra arrow function quando o hook em questao chamar outra funcao
  }
})

describe('quando não existem participantes suficientes', () => {

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape/>
      </RecoilRoot>
    )

    // poderíamos utilizar tambem, o getByText(), que pegaria o elemento pelo texto do botão
    const botao = screen.getByRole('button')

    expect(botao).toBeDisabled()
    
  })

})

describe('quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Josefina'])
  })


  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape/>
      </RecoilRoot>
    )

    // poderíamos utilizar tambem, o getByText(), que pegaria o elemento pelo texto do botão
    const botao = screen.getByRole('button')
    
    expect(botao).not.toBeDisabled()

  })

  test('o sorteio foi iniciado', () => {
    render(
      <RecoilRoot>
        <Rodape/>
      </RecoilRoot>
    )

    // poderíamos utilizar tambem, o getByText(), que pegaria o elemento pelo texto do botão
    const botao = screen.getByRole('button')
    
    // disparo do evento de click para navegacao
    fireEvent.click(botao)
    // esperamos que o metodo seja chamado 
    // expect(mockNavegacao).toHaveBeenCalled()
    // podemos indicar também quantas vezes o método precisa ser chamado
    // expect(mockNavegacao).toHaveBeenCalledTimes(2)
    // ou se o metodo foi chamado com a rota que desejamos
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')


  })

})