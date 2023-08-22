import { Link } from "react-router-dom"
import './navbar.css'
export default function Navbar() {
  return (
   <nav>
      {/* <Link to='/' >front</Link> */}
    <Link to='/register' ><h1>Register</h1></Link>
      <Link to='/home' ><h1>Home</h1></Link> 
    <Link to='/login' ><h1>Login</h1></Link>
   </nav>
  )
}
