import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import { updateProfilePicture } from "../../../service/operation/settingsService"


function UpdateDP() {

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const fileref = useRef(null)

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleclick = () => {
        fileref.current.click()
    }

    const previewFile = (image) => {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = () => {
            setPreview(reader.result)
        }
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            previewFile(file)
        }
    }

    const handleSubmit = () => {
        try {
            dispatch(updateProfilePicture(setLoading , token , image))
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     if (image) {
    //         previewFile(image)
    //     }
    // }, [image]);

    return (
        <div className='w-full border border-richblack-600 bg-richblack-800 rounded-lg p-5'>

            <div className='flex gap-15'>
                <img
                    className='aspect-square w-25 rounded-full ml-5'
                    src={preview || user?.image}
                    alt='profile pic'
                />

                <div className=''>

                    <div className='text-xl text-gray-200 font-semibold'>Update Profile Picture</div>

                    <input
                        type="file"
                        id="Image"
                        ref={fileref}
                        onChange={handleChange}
                        className="hidden"
                        accept="image/png, image/jpeg , image/jpg"
                    />

                    <div className='flex justify-evenly mt-5'>
                        <button
                            onClick={handleclick}
                            className='bg-amber-300 text-lg px-4 py-1 rounded-sm'
                        >
                            Select
                        </button>

                        <button
                            onClick={handleSubmit}
                            className='bg-amber-300 text-lg px-4 py-1 rounded-sm'
                            disabled={loading}
                        >
                            {!loading && (
                                <FiUpload className="text-lg text-richblack-900" />
                            )}
                        </button>
                    </div>

                </div>




            </div>
        </div>
    )
}

export default UpdateDP