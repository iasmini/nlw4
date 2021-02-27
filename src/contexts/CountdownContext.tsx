import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import {ChallengesContext} from "./ChallengesContext";

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  countdownStarted: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData)

// let hasAType: boolean = true ==> set a type (boolean) and assigned it a value
// use the colon to set the type of our variable
let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.05 * 60)
  const [countdownStarted, setCountdownStarted] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown() {
    setCountdownStarted(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setCountdownStarted(false)
    setTime(0.05 * 60)
    setHasFinished(false)
  }

  // useEffect - quando alguma coisa acontecer deve disparar uma acao
  // primeiro parametro: funcao
  // segundo parametro: quando a funcao será executada. será executada sempre q o valor de active mudar
  useEffect(() => {
    // se o countdown está ativo e o time não chegou em zero
    if (countdownStarted && time > 0) {
      // executa a função que está dentro de setTimeout depois de 1 segundo (1000)
      countdownTimeout = setTimeout(() => {
        // reduz o time em um segundo
        setTime(time - 1)
      }, 1000)
    } else if (countdownStarted && time === 0) {
      setHasFinished(true)
      setCountdownStarted(false)
      startNewChallenge()
    }
  }, [countdownStarted, time])  // executa toda vez q o active ou o time muda

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      countdownStarted,
      startCountdown,
      resetCountdown
    }}>
      { children }
    </CountdownContext.Provider>
  )
}
