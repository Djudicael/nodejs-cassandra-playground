module.exports = class UsersRepository {
    constructor() {
        this.usersCollection = usersCollection;
    }

    async create(user) {
        //if (!article.title || !article.description) return;
        return this.usersCollection.save(user);
    };

    async getUsers() {
        //if (!article.title || !article.description) return;
        /*Users.all().then(function (response) {
          console.log(`Load all saved documents.`, response._result)
        });*/
        return this.usersCollection.all();
    };

    async getUserByID(id) {
        if (!id) return;
        return this.usersCollection.firstExample({ _key: id });
    };

    async getUserByEmail(email) {
        if (!email) return;
        return this.usersCollection.firstExample({ email });
    };

    async editUserByID(id, user) {
        if (!id) return;
        return this.usersCollection.update(id, user);
    };

}