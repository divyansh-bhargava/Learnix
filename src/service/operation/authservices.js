import { apiConnector } from "../apiconnector";
import { authEndpoint } from "../api";
import toast from "react-hot-toast";
import { setUserData , setLoading , setToken} from "../../redux/slices/authSlice"

const { SENDOTP_API , SIGNUP_API , LOGIN_API , CHANGEPASSWORD_API , RESETPASSTOKEN_API , RESETPASSWORD_API } = authEndpoint

export function sendOTP(email , navigate){

    return async (dispatch) => {

        const id = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("post" , SENDOTP_API , {email} )

            console.log(response);

            if(!response.data.success){
                throw new Error(response.data.message);   
            }

            toast.success("OTP Send Successfully")
            navigate("/verify-email")
        }
        catch(err){

            console.log(err)
            toast.error("OTP not send")
        }

        dispatch(setLoading(false))
        toast.dismiss(id)
        

    }
    
}

export function signUp(body , navigate) {
    return async (dispatch) => {

        const id = toast.loading("loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("post" , SIGNUP_API , body)

            if(!response.data.success){
                throw new Error(response.data.message);   
            }

            toast.success("account created successfully")
            navigate("/logIn")
            
        }
        catch(err){
            console.log(err)
            toast.error("error in account creation");
            navigate("/signUP")
        }
        dispatch(setLoading(false))
        toast.dismiss(id)
    }
    
}

export  function logIn(body , navigate ) {

    return async (dispatch) => {
        const id = toast.loading("loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("post" , LOGIN_API , body)

            if(!response.data.success){
                throw new Error(response.data.message);   
            }

            dispatch(setToken(response.data.user.token))
            dispatch(setUserData(response.data.user))
            toast.success("logged in successfully")


        }
        catch(err){
            console.log(err)
            toast.error("login failed");
        }

        dispatch(setLoading(false))
        toast.dismiss(id)
        navigate("/dashboard/my-profile")
    }

}

export function resetPasswordLink(email , setSendMail){
    return async (dispatch) => {
        const id = toast.loading("loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("post" , RESETPASSTOKEN_API , email)

            if(!response.data.success){
                throw new Error(response.data.message);   
            }

            setSendMail(true)

            toast.success("mail send successfully")

        } catch (error) {
            console.log(error);
            toast.error("mail send failed")

        }
        dispatch(setLoading(false))
        toast.dismiss(id)
    } 
}

export function resetPassword( body , navigate){
    return async (dispatch) => {
        dispatch(setLoading(true))

        try {
            
            const response = await apiConnector("post" , RESETPASSWORD_API , body)

            if(!response.data.success){
                throw new Error(response.data.message);   
            }

            toast.success("reset password successfully")
            navigate("/logIn")

        } catch (err) {
            
            console.log(err);
            toast.error("failed")
            navigate("/forget-password")
        }
        dispatch(setLoading(false))
        
    }
}