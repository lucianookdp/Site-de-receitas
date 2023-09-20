import { useState, useContext } from 'react'
import './signin.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'


export default function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      await signIn(email, password);
    }

  }


  return(
    
    <div className="container-center">
      <div className="login">

        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input 
            type="text" 
            placeholder="Digite seu email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input 
            type="password" 
            placeholder="********"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit">
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>

          <br></br>

          <button type="submit">
            {loadingAuth ? "Criar uma conta" : <Link to='/register'>Criar uma conta</Link>}
          </button>

          <br></br>

          <button type="submit">
            {loadingAuth ? "Pagina Inicial" : <Link to='/'>Pagina Inicial</Link>}
          </button>

          <br></br>

        </form>


      </div>
    </div>
  )
}