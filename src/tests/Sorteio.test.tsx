import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { Sorteio } from "../screens/sorteio";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";

jest.mock('../state/hook/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})
jest.mock('../state/hook/useResultadoSorteio', () => {
  return {
    useResultadoSorteio: jest.fn()
  }
})

describe("na pagina de sorteio", () => {

  const participantes = [
    'Ana', 'Beatriz', 'Catarina'
  ]

  const resultado = new Map([
    ['Ana', 'Beatriz'],
    ['Beatriz', 'Catarina'],
    ['Catarina', 'Ana']
  ]);
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado)
  })
  
  test('todos os participantes podem escolher seu nome', () => {
    render(
      <RecoilRoot>
        <Sorteio/>
      </RecoilRoot>
    )
    const opcoes = screen.queryAllByRole('option')

    expect(opcoes).toHaveLength(participantes.length)
  })
  
  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio/>
      </RecoilRoot>
    )
    const select = screen.getByPlaceholderText('Selecione o seu nome')

    fireEvent.change(select,{
      target:{
        value: participantes[0]
      }
    })

    const botao = screen.getByRole('button')

    fireEvent.click(botao)

    const amigoSecreto = screen.getByRole('alert')

    expect(amigoSecreto).toBeInTheDocument()

  })
})