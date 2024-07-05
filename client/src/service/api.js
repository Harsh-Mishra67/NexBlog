import axios from 'axios';
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config.js';
import { getAccessToken,getType } from '../utils/common-utils.js';
const API_URL='http://localhost:8000';

const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,// 10000ms means 10s(if api response is delay).
    headers:{
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    // it takes two callback funcions:
    // one in case of success:

    function(config){
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url=config.url+'/'+config.TYPE.query;
        }
        return config;
    },
    // other in case of failure:
    function(error){
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    function(response){
        // stop global loader here
        return processResponse(response);
    },
    function(error){
        // stop global loader here
        return Promise.reject(processError(error));
    }
);

// // // 
// if sucess -> return {isSuccess: true,data: object}
// if fail -> return{isFailure: true,status: string, msg: string ,code: int}
///////////

const processResponse = (response) => {
    if(response?.status === 200){
        return {isSuccess: true,data: response.data}
    }
    else{
        return{
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError=(error)=>{
    if(error.response){
        // Request made and server responded with a status other
        // that fails out of the range 2.x.x
        
        console.log('ERROR IN RESPONSE:',error.toJSON());
        return{
            isError: true,
            // status: response?.status,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if (error.request){
        // Request made but no response was received.
        // console.log(error.toJSON());
        console.log('ERROR IN REQUEST:',error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else{
        // something happened in setting up request that triggers an error
        console.log('ERROR IN NETWORK:',error.toJSON());
        return{
            isError: true,
            // status: response?.status,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}
 
// 
const API= {};
// what is for of loop:
// const string = "Hello";
// for (const char of string) {
//   console.log(char);
// }
// This loop will log each character of the string "Hello" to the console.

// The for...of loop is often preferred over traditional for loops when iterating over arrays or
//  other iterable objects because it provides a more concise syntax and automatically handles iteration 
//  over the elements without needing to manage indices.
for (const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            // data:body,
            data:value.method==='DELETE'?{}:body,
            responseType:value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
}
export { API };
