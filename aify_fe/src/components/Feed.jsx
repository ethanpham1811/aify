import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {client} from '../client'
import {feedQuery, postByCategoryQuery} from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import i10n from '../i10n/en.json'

const Feed = () => {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(false)
  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true)
    client.fetch(categoryId ? postByCategoryQuery(categoryId) : feedQuery).then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [categoryId])

  return loading ? <Spinner message={i10n.loadingPost} /> : <div className="w-full">{posts && <MasonryLayout posts={posts} />}</div>
}

export default Feed
