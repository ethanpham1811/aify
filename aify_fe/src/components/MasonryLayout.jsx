import Masonry from 'react-masonry-css'
import Post from './Post'

import i10n from '../i10n/en.json'
import {breakpointColumnsObj} from '../enums'

const MasonryLayout = ({posts}) => {
  return posts.length ? (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
      {posts?.map((post) => (
        <Post key={post._id} post={post} className="w-max" />
      ))}
    </Masonry>
  ) : (
    <p className="text-center">{i10n.noPostFounded}</p>
  )
}

export default MasonryLayout
