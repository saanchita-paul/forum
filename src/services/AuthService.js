import AuthAPI from "../api/auth/AuthAPI.js";

import store from "../store/index.js";
import axios from "axios";

import router from "../router/index.js";

/**
 * get user auth state
 *
 * @return boolean
 */
const isAuthenticated = () => store.getters.isAuthenticated


/**
 * Register
 * @param form
 * @return {Promise<Route>}
 */
export const register = async form => {
    try {
        console.log('register');

        await AuthAPI.register(form)
        // await authUser();
        router.push({
            name: 'ForumList'
        });

    } catch (e) {
        console.log('REGISTRATION FAILED', e)
        return false;
    }
}

/**
 * Login
 * @param form
 * @return {Promise<Route>}
 */
export const login = async form => {
    try {
        console.log('login');

        await AuthAPI.login(form)
        await authUser();
        router.push({
            name: 'ForumList'
        });

    } catch (e) {
        console.log('LOGIN FAILED', e)
        return false;
    }
}

export const logout = () => {
    kickOut();
    AuthAPI.logout();
}

/**
 * update user in store
 *
 * @return {Promise<void>}
 */
export const authUser = async () => {
    const user = await AuthAPI.getAuthUser();
    store.commit('setUser', user)
}


/**
 * route authentication middleware
 *
 * @param to
 * @param from
 * @param next
 */
export const checkRouteAuthentication = (to, from, next) => {
    const isLoggedIn = isAuthenticated();
    const isProtected = to.meta.isProtected;
    if (isLoggedIn) {
        if(isProtected) {
            next()
        } else { //unprotected route
            next({name: 'ForumList'})
        }
    } else { // not logged in user
        if (isProtected) {
            next({name: 'Login'})
        } else {//unprotected route
            next()
        }
    }
}

/**
 * get authenticated user
 *
 * @returns {User}
 */
export const getAuthUser = () => store.getters.user;

export const kickOut = () => {
    localStorage.removeItem('auth_token');
    axios.defaults.headers.common['Authorization'] = null;
    store.commit('setUser', null);
    router.push({name: 'Login'})
}


export default {
    register,
    getAuthUser,
    login,
    authUser,
    isAuthenticated,
    kickOut,
    checkRouteAuthentication,
    logout,
}



