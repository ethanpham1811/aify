import {NavLink, Link} from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import logo from '../assets/logo.png'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({closeToggle, user, categories}) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  return (
    <div className="grid grid-col-1 bg-white min-w-210 h-screen">
      <div>
        <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseSidebar}>
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <NavLink to="/" className={({isActive}) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar}>
          <RiHomeFill />
          Home
        </NavLink>
      </div>
      <div className="overflow-y-scroll">
        <div className="flex flex-col gap-5 ">
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
          {categories?.length &&
            categories.slice(0, categories.length - 1).map((category) => (
              <NavLink
                to={`/category/${category._id}`}
                className={({isActive}) => (isActive ? isActiveStyle : isNotActiveStyle)}
                onClick={handleCloseSidebar}
                key={category.categoryName}
              >
                <img src={category?.image?.asset?.url} className="w-8 h-8 rounded-full shadow-sm" />
                {category.categoryName}
              </NavLink>
            ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  )
}

export default Sidebar
