import { serverUrl } from "./serverUrl";
import { commanApi } from "./commanApi";

//Add video Api

export const addVideoApi = async(reqBody)=>{
    return await commanApi('post',`${serverUrl}/allvdeos`,reqBody)
}

//get allvideo

export const getAllVideoApi = async()=>{
    return await commanApi('get',`${serverUrl}/allvdeos`,{})
}

//deleteaparticular video details

export const  deletAVideoApi=async(id)=>{
    return await commanApi('delete',`${serverUrl}/allvdeos/${id}`,"")
}

//add wacth history api

export const addWatchHistoryApi = async(reqBody)=>{
    return await commanApi('post', `${serverUrl}/watchHistory`, reqBody)
}

//get watch history api

export const getWatchHistory =async()=>{
    return await commanApi ('get',`${serverUrl}/watchHistory`,{})
}

//delete watch history api
export const deleteWatchHistoryApi=async(id)=>{
        return await commanApi('delete',`${serverUrl}/watchHistory/${id}`,"")
}

//add category
export const addCategoryApi=async(reqBody)=>{
    return await commanApi('post',`${serverUrl}/category`,reqBody)
}
///get category
export const getCategoryApi=async()=>{
    return await commanApi('get',`${serverUrl}/category`,{})
}

//delete category
export const deleteCategoryApi=async(id)=>{
    return await commanApi('delete',`${serverUrl}/category/${id}`,"")
}
//drag and drop
 export const dragAndDropApi=async(id)=>{
    return await commanApi('get',`${serverUrl}/allvdeos/${id}`,{})
 }

 //update category
 export const updateCategoryApi=async(categoryId,categoryDetails,)=>{
    return await commanApi('put',`${serverUrl}/category/${categoryId}`,categoryDetails)
 }
