import {Routes, Route} from 'react-router-dom'

import {Navbar, Feed, PostDetail, CreatePost} from '../components'
import {useState} from 'react'

const Posts = ({user, categories}) => {
  const [searchTerm, setSearchTerm] = useState(null)

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar user={user} handleSearch={(val) => setSearchTerm(val)} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed searchTerm={searchTerm} />} />
          <Route path="/category/:categoryId" element={<Feed searchTerm={searchTerm} />} />
          <Route path="/post-detail/:postId" element={<PostDetail user={user} />} />
          <Route path="/create-post" element={<CreatePost user={user} categories={categories} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Posts
