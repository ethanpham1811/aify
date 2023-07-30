import {useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {IoMdSearch} from 'react-icons/io'

const SearchBar = ({handleSearch}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const {register, handleSubmit, watch, setValue} = useForm()
  const searchTerm = watch('search')

  const handleSubmitForm = () => {
    handleSearch(searchTerm)
    setSearchParams({search: searchTerm})
  }

  useEffect(() => {
    setValue('search', searchParams.get('search'))
    handleSearch(searchParams.get('search'))
  }, [searchParams])

  return (
    <div className="flex mx-2 justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-1">
        <button type="submit" className="outline-none hover:border-transparent focus:outline-none">
          <IoMdSearch fontSize={21} className="ml-1" />
        </button>
        <input id="search" {...register('search')} type="text" placeholder="Search" className="p-2 w-full bg-white outline-none" />
      </form>
    </div>
  )
}

export default SearchBar
