const BASE_URL = import.meta.env.VITE_BASE_URL

export const authEndpoint = {
 
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  SIGNUP_API: BASE_URL + "/auth/signUp",
  LOGIN_API: BASE_URL + "/auth/logIn",
  CHANGEPASSWORD_API : BASE_URL + "/auth/changePassword",
  RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordLink",
  RESETPASSWORD_API: BASE_URL + "/auth//resetPassword"

}
