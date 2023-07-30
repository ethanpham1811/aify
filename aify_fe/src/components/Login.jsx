import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google'
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import {client} from '../client'
import shareVideo from '../assets/login.mp4'
import logo from '../assets/logowhite.png'

const Login = () => {
  const navigate = useNavigate()
  const handleLoginRespond = (res) => {
    const user = jwt_decode(res.credential)
    localStorage.setItem('user', JSON.stringify(user))

    const {name, jti, picture} = user
    const doc = {
      _id: jti,
      _type: 'user',
      userName: name,
      image: picture
    }
    client.createIfNotExists(doc).then(() => {
      navigate('/', {replace: true})
    })
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen w-screen">
      <div className="relative w-full h-full">
        <video src={shareVideo} type="video/mp4" muted loop controls={false} autoPlay className="w-full h-full object-cover" />
        <div className="bg-blackOverlay absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API}>
              <GoogleLogin onSuccess={handleLoginRespond} onError={handleLoginRespond} />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
