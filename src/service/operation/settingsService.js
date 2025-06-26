import { apiConnector } from "../apiconnector";
import { settingsEndpoint } from "../api";
import toast from "react-hot-toast";
import { logOut } from "./authservices";
import { setUser } from "../../redux/slices/profileSlice";
import { FaBullseye } from "react-icons/fa6";


const { DELETEACCOUNT_API, UPDATEPASSWORD_API, UPDATEPROFILE_API, UPDATEPROFILEPICTURE_API } = settingsEndpoint

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const id = toast.loading("Loading...")
        try {
            const response = await apiConnector("post", DELETEACCOUNT_API, null, { Authorization: `Bearer ${token}` })

            console.log(response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Account deleted")
            dispatch(logOut(navigate))

        } catch (error) {
            console.log(error);
            toast.error("Could Not Delete Account")
        }
        toast.dismiss(id)
    }
}

export function UpdatePassword(token, data) {
    return async (dispatch) => {
        const id = toast.loading("Loading...")
        try {
            const response = await apiConnector("put", UPDATEPASSWORD_API, data, { Authorization: `Bearer ${token}` })

            console.log(response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password changed Succesfully")

        } catch (error) {
            console.log(error);
            toast.error("failed changing")
        }
        toast.dismiss(id)
    }
}

export function UpdateProfile(token, data) {
    return async (dispatch) => {
        const id = toast.loading("Loading...")
        try {
            const response = await apiConnector("put", UPDATEPROFILE_API, data, { Authorization: `Bearer ${token}` })

            console.log(response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const userImage = response.data.data.image ? response.data.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.fname} ${response.data.data.lname}`

            dispatch(setUser({ ...response.data.data, image: userImage }))

            toast.success("Profile Update Succesfully")

        } catch (error) {
            console.log(error);
            toast.error("failed changing")
        }
        toast.dismiss(id)
    }
}

export function updateProfilePicture(setLoading, token, displayPicture) {
    return async (dispatch) => {
        setLoading(true)
        const id = toast.loading("Loading...")
        try {
            const response = await apiConnector("put", UPDATEPROFILEPICTURE_API, { displayPicture }, { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}` })
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.data))

            toast.success("Profile changed Successfully")

        } catch (error) {
            console.log(error);
            toast.error("Failed")
        }
        setLoading(false)
        toast.dismiss(id)
    }
}