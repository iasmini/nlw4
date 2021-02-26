import styles from '../styles/components/Countdown.module.css'
import {useState, useEffect} from "react";

export function Countdown() {
  const [time, setTime] = useState(25 * 60)
  const [active, setActive] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  // padStart - formata como 00
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setActive(true)
  }

  // useEffect - quando alguma coisa acontecer deve disparar uma acao
  // primeiro parametro: funcao
  // segundo parametro: quando a funcao será executada. será executada sempre q o valor de active mudar
  useEffect(() => {
    // se o countdown está ativo e o time não chegou em zero
    if (active && time > 0) {
      // executa a função que está dentro de setTimeout depois de 1 segundo (1000)
      setTimeout(() => {
        // reduz o time em um segundo
        setTime(time - 1)
      }, 1000)
    }
  }, [active, time])  // executa toda vez q o active ou o time muda

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

      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  )
}
