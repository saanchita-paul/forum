
import { createStore } from 'vuex'
import authStore from "./modules/authStore.js";


export default createStore({
    modules: {
        authStore,
    }
})
