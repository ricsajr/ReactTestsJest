import { realizarSorteio } from './../helpers/realizarSorteio';
import { useSetRecoilState } from 'recoil';
import { useListaDeParticipantes } from './useListaDeParticipantes';
import { resultadoDoAmigoSecreto } from '../atom';


export const useSorteador = () => {
  
  const participantes = useListaDeParticipantes()
  const setResultado = useSetRecoilState(resultadoDoAmigoSecreto)
  
  return () => {
    const resultado = realizarSorteio(participantes)
    setResultado(resultado)
  }
}