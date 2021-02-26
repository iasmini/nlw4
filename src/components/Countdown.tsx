import styles from '../styles/components/Countdown.module.css'
import {useState, useEffect} from "react";

// let hasAType: boolean = true ==> set a type (boolean) and assigned it a value
// use the colon to set the type of our variable
let countdownTimeout: NodeJS.Timeout

export function Countdown() {
  const [time, setTime] = useState(0.05 * 60)
  const [countdownStarted, setCountdownStarted] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  // padStart - formata como 00
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setCountdownStarted(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setCountdownStarted(false)
    setTime(0.05 * 60)
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
    }
  }, [countdownStarted, time])  // executa toda vez q o active ou o time muda

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{ minuteLeft }</span>
          <span>{ minuteRight }</span>
        </div>
        <span>:</span>
        <div>
          <span>{ secondLeft }</span>
          <span>{ secondRight }</span>
        </div>
      </div>

      {/*{ hasFinished && () {} = if (hasFinished) {}*/}
      { hasFinished ? (
        <button
          disabled
          type="button"
          className={`${styles.countdownButton}`}
          onClick={resetCountdown}
        >
          Abandonar o ciclo
        </button>
      ) : (
        // <> = fragment: é usado pra encapsular o html, mas nao aparece no html final
        <>
        { countdownStarted ? (
            <button
              className={`${styles.countdownButton} ${styles.countdownButtonStarted}`}
            >
              Ciclo encerrado
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.countdownButton}`}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>

          ) }
        </>
      )
      }
    </div>
  )
}
