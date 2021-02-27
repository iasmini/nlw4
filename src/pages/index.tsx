import Head from "next/head";
import {GetServerSideProps} from 'next'

import {ExperienceBar} from "../components/ExperienceBar";
import {Profile} from "../components/Profile";
import {CompletedChallenges} from "../components/CompletedChallenges";
import {Countdown} from "../components/Countdown";
import {ChallengeBox} from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css'
import {CountdownProvider} from "../contexts/CountdownContext";
import {ChallengesProvider} from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Moveit</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
                <Countdown />
            </div>
            <div>
                <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

// 3 camadas
// backend, python por exemplo
// next.js (node.js) - intermediaria
// frontend (react)
// o usuario faz a requisição para o next que monta o front com os dados do back

// getServerSideProps - tem que ser esse nome
// quando é declarada essa função dentro de uma página do next é possível manipular quais dados
// são repassados da camada do next para o front
// as requisições a serviços externos devem ser feitas aqui para que o SEO funcione, pois aqui
// essas requisições são feitas antes da tela ser montada e exibida para o usuário
// tudo que é feito dentro dessa função é executado no servidor node.js (que é o next.js)
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
