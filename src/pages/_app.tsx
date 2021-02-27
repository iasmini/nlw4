import '../styles/global.css'
import {ChallengesProvider} from "../contexts/ChallengesContext";

function MyApp({ Component, pageProps }) {
  return (
    // todos os componentes precisam de acessar o contexto dos desafios, por isso
    // foi colocado no _app.tsx em volta de todos os componentes
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
