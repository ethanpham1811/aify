import {useState, useRef, useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from 'react-router-dom'

import {Sidebar, UserProfile} from '../components'
import {userQuery, categoriesQuery} from '../utils/data'
import {client} from '../client'
import Posts from './Posts'
import logo from '../assets/logo.png'

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState()
  const [categories, setCategories] = useState()
  const scrollRef = useRef(null)

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

  useEffect(() => {
    /* fetch User data */
    client.fetch(userQuery(userInfo?.jti)).then((data) => {
      setUser(data[0])
    })
    /* fetch categories data */
    client.fetch(categoriesQuery).then((data) => {
      setCategories(data)
    })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  })

  return (
    <div className="flex bg-feed md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user} categories={categories} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Posts user={user} categories={categories} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
