const UsersRepository = require('../repository/UsersRepository');

module.exports = class UserService {

    constructor() {
        this.userRepository = new UsersRepository();
    }

    async findUsers() {
        return this.userRepository.getUsers();
    }

    async findUser(id) {
        return this.userRepository.getUserByID(id);
    }

    async addUser(user) {
        return this.userRepository.create(user);
    }

    async updateUser(id, user) {
        if (!id) return;
        return this.userRepository.editUserByID(id, user);
    }

    async deleteUser(id) {
        if (!id) return;
        return this.userRepository.removeByKeys([id]);
    }

}