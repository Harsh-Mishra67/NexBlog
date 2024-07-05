// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded,please wait'
    },
    success:{
        title: 'Success',
        message: 'Data successfully loaded'
    },
    responseFailure:{
        title: 'Error',
        message: 'An error occured while fetching response from the server . please try agin'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while parsing request data'
    },
    networkError: {
        title: 'Error',
        message: 'unable to connect with the server. please check internet conncectivity and try again later'
    }
}

// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL: {url:'/',method:'POST/GET/PUT/DELETE' params: true/false,query:true/false}
export const SERVICE_URLS = {

    userSignup: {url: '/signup',method: 'POST'},
    userLogin: {url: '/login',method: 'POST'},
    uploadFile: {url:'/file/upload',method:'POST'},
    createPost:{url:'create',method:'POST'},
    newComment:{url:'/comment/new',method:'POST'},

    getAllPosts:{url:'/posts',method:'GET',params:true},
    getPostById:{url:'post',method:'GET',query:true},
    getAllComments:{url:'comments',method:'GET',query:true},

    updatePost:{url:'update',method:'PUT',query:true},
    
    deletePost:{url:'delete',method:'DELETE',query:true},
    deleteComment:{url:'/comment/delete',method:'DELETE',query:true}




    // url should be same as we wrote in route.js otherwise nahi 
    // chalega
}