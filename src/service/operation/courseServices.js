import { apiConnector } from "../apiconnector";
import {categoryEndpoint } from "../api"
import { courseEndpoint } from "../api";

const {CATEGORIES_API} = categoryEndpoint
const {GETALLMYCOURSE_API} = courseEndpoint

export function getAllcategory(setCatalog){
    return async (dispatch) => {
        try {
            console.log("catagories services");
            const data = await apiConnector( "GET" , CATEGORIES_API)
            setCatalog(data.data.data)
        } catch (error) {
            console.log("Could not fetch Categories.", error)
        }
    }
}

export function getAllMyCourses(setCourses ,token){
    return async (dispatch) => {
        try {
            console.log("my courses services");
            const response = await apiConnector( "GET" , GETALLMYCOURSE_API , null , { Authorization: `Bearer ${token}` } )

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            setCourses(response.data.data)

        } catch (error) {
            console.log("Could not fetch myCourses.", error)
        }
    }
}

