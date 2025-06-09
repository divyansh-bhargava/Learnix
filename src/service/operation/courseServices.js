import { apiConnector } from "../apiconnector";
import {categoryEndpoint } from "../api"

const {CATEGORIES_API} = categoryEndpoint

export function getAllcategory(setCatalog){
    return async (dispatch) => {
        try {
            console.log("catagories services");
            const data = await apiConnector( "GET" , CATEGORIES_API )
            setCatalog(data.data.data)
        } catch (error) {
            console.log("Could not fetch Categories.", error)
        }
    }
}

