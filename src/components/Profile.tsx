import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(challengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/pedrosaGp.png" alt="Gabriel Lira" />
            <div>
                <strong>Gabriel Lira</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}