import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    // todos os componentes precisam de acessar o contexto dos desafios, por isso
    // foi colocado no _app.tsx em volta de todos os componentes
    <Component {...pageProps} />
  )
}

export default MyApp
