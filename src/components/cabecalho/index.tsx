import React from 'react'
import './style.css'

export const Cabecalho = () => {
    return (
        <header className="cabecalho">
            <div className="imagem-logo" role="img" aria-label='Logo do Sorteador'></div>
            <img className='participante' src="./src/imagens/participante" alt="Participante com um presente na mão" />
        </header>
    )
}