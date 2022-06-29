import { realizarSorteio } from '../state/helpers/realizarSorteio';
import React from "react";

describe("dado um sorteio de amigo secreto", () => {

  test('cada participante não sorteie ele mesmo', () => {
    const participantes = [
      'Juliana',
      'João',
      'Josefina',
      'Calebe',
      'Nataliene'
    ]
    
    const sorteio = realizarSorteio(participantes)

    participantes.forEach(participante =>{
      // o metodo get pega a chave do map
      const amigoSecreto = sorteio.get(participante)
      //garantindo que o valor não é igual à chave
      expect(amigoSecreto).not.toEqual(participante)
    })
  })
})