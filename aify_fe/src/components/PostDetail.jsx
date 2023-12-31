import {useEffect, useState} from 'react'
import {MdDownloadForOffline} from 'react-icons/md'
import {Link, useParams} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

import {client, urlFor} from '../client'
import MasonryLayout from './MasonryLayout'
import {morePostQuery, postDetailQuery} from '../utils/data'
import Spinner from './Spinner'

const PostDetail = ({user}) => {
  const {postId} = useParams()
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(true)
  const [postDetail, setPostDetail] = useState()
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)

  const fetchPostDetail = () => {
    client.fetch(postDetailQuery(postId)).then((data) => {
      setPostDetail(data[0])
      if (data[0]) {
        client.fetch(morePostQuery(data[0])).then((res) => {
          setPosts(res)
          setLoading(false)
        })
      }
    })
  }

  useEffect(() => {
    fetchPostDetail()
  }, [postId])

  const addComment = () => {
    if (comment) {
      setAddingComment(true)

      client
        .patch(postId)
        .setIfMissing({comment: []})
        .insert('after', 'comment[-1]', [{comment, _key: uuidv4(), postedBy: {_type: 'postedBy', _ref: user._id}}])
        .commit()
        .then((res) => {
          setPostDetail(res)
          setComment('')
          setAddingComment(false)
        })
    }
  }

  if (!postDetail) {
    return <Spinner message="Showing post" />
  }

  return (
    <>
      {postDetail && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:flex-row flex-col mx-[-20px] bg-white">
          {/* Left side: Image */}
          <div className="flex justify-center items-center flex-initial max-h-[600px] overflow-hidden">
            <img className="w-full object-cover" src={postDetail?.image && urlFor(postDetail?.image).url()} alt="user-post" />
          </div>
          {/* Right side: Info */}
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${postDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={postDetail.url} target="_blank" rel="noreferrer">
                {postDetail.url?.slice(8)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">{postDetail.title}</h1>
              <p className="mt-3">{postDetail.description}</p>
            </div>
            <Link to={`/user-profile/${postDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={postDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{postDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {postDetail?.comment?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                  <img src={item.postedBy?.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user?._id}`}>
                <img src={user?.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      {<h2 className="text-center font-bold text-white text-2xl mt-8 mb-4">More like this</h2>}
      {loading ? <Spinner message="Loading more posts" /> : <MasonryLayout posts={posts} />}
    </>
  )
}

export default PostDetail
