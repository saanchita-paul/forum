

import router from "../router/index.js";
import ForumAPI from "../api/forum/ForumAPI.js";


export const insertForum = async (forum) => {
    try {
        const response = await ForumAPI.insertForum(forum)
        router.push({ name: 'ForumList' });
        return response.data;

    } catch (e) {
        console.log('Create Forum Failed', e)
        return false;
    }
}

export const listForum = async (page, per_page, search) => {
    try {
        const response = await ForumAPI.listForum(page, per_page, search)
        console.log('lll',response.data)
        return response.data;

    } catch (e) {
        console.log('Forum List Failed', e)
        return false;
    }
}

export default {
    insertForum,
    listForum
}



