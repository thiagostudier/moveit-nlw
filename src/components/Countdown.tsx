import { useState, useEffect, useContext } from 'react';
import { clearTimeout, setTimeout } from 'timers';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';
import { ChallengeBox } from './ChallengeBox';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown(){

    const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //SEPARAR O NUMERO EM DUAS STRINGS
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split(''); //SEPARAR O NUMERO EM DUAS STRINGS

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            { hasFinished ? (
                <button disabled type="button" className={`${styles.countdownButton}`}>Ciclo encerrado</button>
            ) : (
                <>
                { isActive ? (
                    <button onClick={resetCountdown} type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>Abandonar ciclo</button>
                ) : (
                    <button onClick={startCountdown} type="button" className={styles.countdownButton}>Iniciar um ciclo</button>
                )}
                </>                
            )}

        </div>
    );
}