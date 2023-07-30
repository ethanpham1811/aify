import {useState} from 'react'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import {MdDelete} from 'react-icons/md'

import {client} from '../client'
import Spinner from './Spinner'
import i10n from '../i10n/en.json'
import {supportedImgTypes} from '../enums'
import {createPostRequestObj} from '../utils/sanityReqObj'

const CreatePost = ({user, categories}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState()
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState()
  const [errorMsg, setErrorMsg] = useState(null)

  const navigate = useNavigate()

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0]
    // uploading asset to sanity
    if (supportedImgTypes.includes(selectedFile.type)) {
      setErrorMsg(null)
      setLoading(true)
      client.assets
        .upload('image', selectedFile, {contentType: selectedFile.type, filename: selectedFile.name})
        .then((document) => setImageAsset(document))
        .catch(() => setErrorMsg(i10n.unsupportedFileMsg))
        .finally(() => setLoading(false))
    } else setErrorMsg(i10n.unsupportedFileMsg)
  }

  const savePost = () => {
    if (title && description && url && imageAsset?._id && category) {
      setErrorMsg(null)
      client.create(createPostRequestObj(imageAsset?._id, user?._id, title, description, url, category)).then(() => navigate('/'))
    } else setErrorMsg(i10n.allFieldsRequired)
  }
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {errorMsg && <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">{errorMsg}</p>}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="text-center text-gray-400">{i10n.uploadFileInstruction}</p>
                </div>
                <input type="file" name="upload-image" onChange={uploadImage} className="w-0 h-0" />
              </label>
            ) : (
              <div className="relative h-full">
                <img src={imageAsset?.url} alt="uploaded-pic" className="h-full w-full object-contain" />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell everyone what your Post is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Add a link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Post Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">
                  Select Category
                </option>
                {categories &&
                  categories.map((item) => (
                    <option key={item.categoryName} className="text-base border-0 outline-none capitalize bg-white text-black " value={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button type="button" onClick={savePost} className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none">
                Save Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
