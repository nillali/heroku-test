const testFunction = (a, b) => {
    return a * b
}

test('Multiplies two arguments', () => {
    expect(testFunction(2, 3)).toBe(6)
})

// const request = require('supertest');
// const assert = require('assert');
// const app = require("../server")

// describe(`POST /api/v0/authorize`, () => {
//     test('Successful authorization', () => {
//         return request(app)
//             .post(process.env.authorizeUser)
//             .expect('Content-Type', /json/)
//             .send({
//                 email: "testar@test.se",
//                 pwd: "hejhej"
//             })
//             .expect(200)
//             .then((res) => {
//                 assert(res.body.hasOwnProperty('name'), true)
//                 assert(typeof res.body.name, 'string')
//                 assert(res.body.hasOwnProperty('email'), true)
//                 assert(typeof res.body.email, 'string')
//                 assert(res.body.hasOwnProperty('phone'), true)
//                 assert(typeof res.body.phone, 'string')
//                 assert(res.body.hasOwnProperty('pwd'), true)
//                 assert(typeof res.body.phone, 'string')
//                 assert(res.body.hasOwnProperty('accessLevel'), true)
//                 assert(typeof res.body.accessLevel, 'string')
//                 assert(Object.keys(res.body).length, 5)
//             })

//     });
//     test('Unsuccessful authorization', () => {
//         return request(app)
//             .post(process.env.authorizeUser)
//             .expect('Content-Type', /json/)
//             .send({
//                 email: "testar@test.se",
//                 pwd: "hejhej1"
//             })
//             .expect(401)
//             .then((res) => {
//                 assert(res.body.hasOwnProperty('error'), true)
//                 assert(typeof res.body.error, 'string')
//                 assert(Object.keys(res.body).length, 1)
//             })

//     });
// });

// // describe(`POST ${process.env.registerUser}`, () => {
// //     test('Successful register', () => {
// //         return request(app)
// //             .post(process.env.registerUser)
// //             .expect('Content-Type', /json/)
// //             .send({
// //                 name: "testar@test.se",
// //                 pwd: "hejhej"
// //             })
// //             .expect(200)
// //             .then((res) => {
// //                 assert(res.body.hasOwnProperty('name'), true)
// //                 assert(typeof res.body.name, 'string')
// //                 assert(res.body.hasOwnProperty('email'), true)
// //                 assert(typeof res.body.email, 'string')
// //                 assert(res.body.hasOwnProperty('phone'), true)
// //                 assert(typeof res.body.phone, 'string')
// //                 assert(res.body.hasOwnProperty('pwd'), true)
// //                 assert(typeof res.body.phone, 'string')
// //                 assert(res.body.hasOwnProperty('accessLevel'), true)
// //                 assert(typeof res.body.accessLevel, 'string')
// //                 assert(Object.keys(res.body).length, 5)
// //             })

// //     });
// //     test('Unsuccessful authorization', () => {
// //         return request(app)
// //             .post(process.env.authorizeUser)
// //             .expect('Content-Type', /json/)
// //             .send({
// //                 email: "testar@test.se",
// //                 pwd: "hejhej1"
// //             })
// //             .expect(401)
// //             .then((res) => {
// //                 assert(res.body.hasOwnProperty('error'), true)
// //                 assert(typeof res.body.error, 'string')
// //                 assert(Object.keys(res.body).length, 1)
// //             })

// //     });
// // });