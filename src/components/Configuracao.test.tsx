import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { Configuracao } from "../screens/configuracao";


// mockando o hook de navegacao

const mockNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    
    useNavigate: () => mockNavegacao // utilizar outra arrow function quando o hook em questao chamar outra funcao
  }
})

describe("pagina de configuração",() => {

  test('deve ser renderizada corretamente', () => {
    // testaremos o resultado do render, teste de snapshot
    const { container } = render(
      <RecoilRoot>
        <Configuracao/>
      </RecoilRoot>
    )

    // esperamos que o container seja renderizado dempre igual
    // este snapshot sera utilizado nos testes seguintes e se algo for alterado
    // o mesmo snapshot deve ser atualizado
    expect(container).toMatchSnapshot()
  })
})