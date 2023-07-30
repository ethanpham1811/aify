import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {client} from '../client'
import {postsQuery, postByCategoryQuery} from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import i10n from '../i10n/en.json'

const Feed = ({searchTerm}) => {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(false)
  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true)
    client.fetch(categoryId ? postByCategoryQuery(categoryId, searchTerm) : postsQuery(searchTerm)).then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [categoryId, searchTerm])

  return loading ? <Spinner message={i10n.loadingPost} /> : <div className="w-full">{posts && <MasonryLayout posts={posts} />}</div>
}

export default Feed
