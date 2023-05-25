
import axios from "axios";


export default {

    insertForum: async (forum) => {
        return await axios.post('http://127.0.0.1:8000/api/forums', forum)
    },

    listForum: async (page, per_page, search) => {
        return await axios.get('http://127.0.0.1:8000/api/forums',{params: {page, per_page, search}})
    }

}
