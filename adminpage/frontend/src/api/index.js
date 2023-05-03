import request from "../utils/request";

/**
 * login api
 */
export const getLogin = (data) =>{
    return request({method: 'post', url: '/api/v1/admin/login', data})
};

/**
 * register api
 */
export const getRegister = (data) =>{
    return request({method: 'post', url: '/api/v1/admin/register', data})
};

/**
 * 获取members列表数据的api
 */
export const getMember = (data) =>{
    return request({method: 'get', url: '/api/v1/member/find', data})
}

/**
 * member info修改的api
 */
export const changeMemberInfo = (data) =>{
    return request({method: 'get', url: '/api/v1/member/update', data})
}

/**
 * delete api
 */
export const deleteMember = (data) =>{
    return request({method: 'get', url: '/api/v1/member/delete', data})
}

/**
 * admin list api
 */
export const getAdmin = (data) =>{
    return request({method: 'get', url: '/api/v1/member/search', data})
}

/**
 * admin info edit api
 */
export const updateAdmin = (data) =>{
    return request({method: 'get', url: '/api/v1/member/edit', data})
}

/**
 * photo display api
 */
export const displayImage = (data) =>{
    return request({method: 'get', url: '/api/v1/admin/display', data})
}

/**
 * upload photo api
 */
export const uploadImage = (data) =>{
    return request({method: 'post', url: '/api/v1/admin/upload', data})
}

/**
 * delete photo api
 */
export const deleteImage = (data) =>{
    return request ({method: 'get', url: '/api/v1/admin/delete', data})
}

/**
 * create rally api
 */
export const getRally = (data) =>{
    return request ({method: 'post', url: '/api/v1/admin/create', data})
}

/**
 * list rally api
 */
export const listRally = (data) =>{
    return request({method: 'get', url: '/api/v1/member/listRally', data})
}

/**
 * delete rally api
 */
export const deleteRally = (data) =>{
    return request({method: 'get', url: '/api/v1/member/deleteRally', data})
}

/**
 * set rally close api
 */
export const closeRally = (data) =>{
    return request({method: 'get', url: '/api/v1/member/close', data})
}

/**
 * set rally open api
 */
export const openRally = (data) =>{
    return request({method: 'get', url: '/api/v1/member/open', data})
}

/**
 * update rally info api
 */
export const updateRally = (data) =>{
    return request ({method: 'get', url: '/api/v1/member/updateRally', data})
}