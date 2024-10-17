//Api configration
import axios from 'axios'

export const commanApi=async(httpMethod,url,reqBody)=>{
    let reqConfig={
        method:httpMethod,
        url,
        data:reqBody
    }

    return await axios(reqConfig).then((response)=>{
        return response

    })
    .catch((error)=>{
        return error
    })

}

