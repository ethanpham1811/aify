import {Link} from 'react-router-dom'
import {IoMdAdd} from 'react-icons/io'
import SearchBar from './SearchBar'

export const Navbar = ({user, handleSearch}) => {
  if (user) {
    return (
      <div className="flex bg-feed gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <SearchBar handleSearch={handleSearch}></SearchBar>
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user?.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
          </Link>
          <Link to="/create-post" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd />
          </Link>
        </div>
      </div>
    )
  }

  return null
}

export default Navbar
