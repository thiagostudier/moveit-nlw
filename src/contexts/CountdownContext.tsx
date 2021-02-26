import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps){

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25*60); //60 segundos vezes 25 minutos
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60) ; //pegar minutos
    const seconds = time % 60; //pegar segundos

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(25*60);
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
               setTime(time - 1);
            }, 1000);
        }else if(isActive && time === 0){ // SE O TIMES ESTIVER ATIVO E O TEMPO CHEGOU NO ZERO
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]) //EXECUTAR FUNÇÃO SEMPRE QUE O ACTIVE MUDAR

    return (
        <CountdownContext.Provider value={{ minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown }}>
            {children}
        </CountdownContext.Provider>
    )

}