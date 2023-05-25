export default class User {
    /**
     *
     * @param {number} id
     * @param {string} email
     * @param {string} name
     */
    constructor({id, email, name}) {
        this.name = name
        this.id = id
        this.email = email
    }
}
