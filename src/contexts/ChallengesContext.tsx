import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completChallenge: () => void;
    closeLevelUpModal: () => void
}

interface ChallengeProviderProps {
    children: ReactNode;
    currentExperience: number;
    challengeCompleted: number;
    level: number;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
    children, 
    ...rest    
}: ChallengeProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengeCompleted ?? 0);

    const [activeChallenge, setActivechallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false)

    useEffect(() => {
    }, [])

    useEffect(() => {
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setisLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setisLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengIndex];

        setActivechallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio!!', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActivechallenge(null);
    }

    function completChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActivechallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <challengesContext.Provider
            value={{
                level,
                levelUp,
                currentExperience,
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                experienceToNextLevel,
                resetChallenge,
                completChallenge,
                closeLevelUpModal,
            }}
        >
            { children}
         { isLevelUpModalOpen && <LevelUpModal />}
        </challengesContext.Provider>
    );
}