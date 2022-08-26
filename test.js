const assert = require('assert')
const db = require('./db')

describe('Users', () => {
    describe('#findUser()', () => {
        const id = 2
        const user = db.users.find(user => user.id === id)
        it('Name of user should be Nilla when id is 2', () => {
            assert.equal(user.name, 'Nilla')
        })
    })
    describe('#findUser()', () => {
        const id = 3
        const user = db.users.find(user => user.id === 3)
        it('Name of user should be Isabelle when id is 3', () => {
            assert.equal(user.name, 'Isabelle')
        })
    })
    describe('#authUser()', () => {
        const login = { email: "johanna@mail.com", pwd: 123 }
        let id = null;
        const user = db.users.find(user => user.email === login.email)
        if (user) {
            if (user.pwd === login.pwd)
                id = 1
        }
        it('Should set id to 1 when email is johanna@mail.com and pwd is 123', () => {
            assert.equal(id, 1)
        })
    })
    describe('#authUser()', () => {
        const login = { email: "anna@mail.com", pwd: 901 }
        let id = null;
        const user = db.users.find(user => user.email === login.email)
        if (user) {
            if (user.pwd === login.pwd)
                id = 4
        }
        it('Should set id to 4 when email is anna@mail.com and pwd is 901', () => {
            assert.equal(id, 4)
        })
    })
})