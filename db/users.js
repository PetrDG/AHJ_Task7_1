class Users{
    constructor() {
        this.usersBox = [];
        this.listeners = [];
    }

    addUser(user) {
        this.usersBox.push(user);
        const userAdd = {...user};
        userAdd.status = 'add';

        if (this.listeners.length !== 0) this.listeners.forEach((l) => l.handler(userAdd));
    }

    getUsers() {
        return this.usersBox;
    }

    delUser(id) {
        const user = this.usersBox.find((u) => u.id === id);
        const userDel = {...user};
        userDel.status = 'del';

        if (this.listeners.length !== 0) this.listeners.forEach((l) => l.handler(userDel));
        this.usersBox = this.usersBox.filter((n) => n.id !== id);
    }

    isFreeNickname(nickname) {
        if (this.usersBox.find((n) => n.nickname === nickname)) return false;
        return true;
    }

    addlistener(listener) {
        this.listeners.push(listener);
    }

    delListener(id) {
        this.listeners = this.listeners.filter((l) => l.idListener !== id);
    }

    getNickname(id) {
        return this.usersBox.find((u) => u.id === id).nickname;
    }
}

const users = new Users();

module.exports = users;
