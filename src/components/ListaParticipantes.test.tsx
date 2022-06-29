import { render, screen } from '@testing-library/react';
import React from 'react';//descrevendo o cenário de testes
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipantes';
import { ListaParticipantes } from './ListaParticipantes';


jest.mock('../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

describe('uma lista vazia de participantes', () => {
  //antes de cada teste deste describe
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })
  //chamar render de react testing library com o componente a ser testado
  test('deve ser renderizada sem elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes/>
      </RecoilRoot>
    )
  
      // obtendo acesso à lista a ser testada
      const itens = screen.queryAllByRole('listitem')
  
      expect(itens).toHaveLength(0);
  })

})
describe('uma lista preenchida de participantes', () => {

  const participantes = ['Ana', 'Catarina']

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  //chamar render de react testing library com o componente a ser testado
  test('deve ser renderizada com elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes/>
      </RecoilRoot>
    )
  
      // obtendo lista a ser testada
      const itens = screen.queryAllByRole('listitem')
  
      expect(itens).toHaveLength(participantes.length);
  })

})