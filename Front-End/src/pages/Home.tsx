import Login from './Login'
import Signup from './Signup'
import {Routes, Route} from 'react-router-dom'

function Home() {
  return (
      

    

      <>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes> 
      </>
  )
}

export default Home
