const BASE_URL = import.meta.env.VITE_BASE_URL

export const authEndpoint = {
 
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  SIGNUP_API: BASE_URL + "/auth/signUp",
  LOGIN_API: BASE_URL + "/auth/logIn",
  CHANGEPASSWORD_API : BASE_URL + "/auth/changePassword",
  RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordLink",
  RESETPASSWORD_API: BASE_URL + "/auth/resetPassword"

}

export const courseEndpoint = {
  CREATECOURSE_API : BASE_URL + "/course/createCourse",
  GETALLCOURSE_API : BASE_URL + "/course/getAllCourse",
  GETCOURSEDETAILS_API : BASE_URL + "/course/getCourseAllDetails",

  ADDSECTION_API : BASE_URL + "/course/addSection",
  UPDATESECTION_API : BASE_URL + "/course/updateSection",
  DELETESECTION_API : BASE_URL + "/course/deletesection",

  ADDSUBSECTION_API : BASE_URL + "/course/addSubSection",
  UPDATESUBSECTION_API : BASE_URL + "/course/updateSubSection",
  DELETESUBSECTION_API : BASE_URL + "/course/deleteSubSection",

  GETALLMYCOURSE_API : BASE_URL + "/profile/getAllCourses"

} 

export const categoryEndpoint = {
  CATEGORIES_API : BASE_URL + "/course/showAllCategories",
}

export const settingsEndpoint = {
  DELETEACCOUNT_API : BASE_URL + "/profile/deleteAccount", 
  UPDATEPROFILE_API :  BASE_URL + "/profile/updateProfile",
  UPDATEPASSWORD_API : BASE_URL + "/profile/updatePassword",
  UPDATEPROFILEPICTURE_API : BASE_URL + "/profile/updateProfilePicture",
  
}