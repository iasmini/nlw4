import {useContext} from "react";
import {CountdownContext} from "../contexts/CountdownContext";

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const {
    minutes,
    seconds,
    hasFinished,
    countdownStarted,
    resetCountdown,
    startCountdown } = useContext(CountdownContext)

  // padStart - formata como 00
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

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
