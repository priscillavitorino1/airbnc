const usersRef = require("../utils/usersRef.js")

describe("usersRef", ()=>{
    let users = 0
    beforeEach(() => {
        users = [
            {
              "first_name": "Alice",
              "surname": "Johnson",
              "email": "alice@example.com",
              "phone_number": "+44 7000 111111",
              "role": "host",
              "avatar": "https://example.com/images/alice.jpg"
            }]
    })
    test('should return a property called is_hold', () => {
        const result = usersRef(users)
        //console.log(result)
        expect(result[0].hasOwnProperty('is_host')).toBe(true)
    });
    test('Property is_hold contains boolean value', () => {
        const result = usersRef(users)
        expect(result[0].is_host).toBe(true)
    });
    test('should remove role', () => {
        const users = [
            {
              "first_name": "Alice",
              "surname": "Johnson",
              "email": "alice@example.com",
              "phone_number": "+44 7000 111111",
              "role": "host",
              "avatar": "https://example.com/images/alice.jpg"
            }]
        const result = usersRef(users)
        expect(result[0].hasOwnProperty('role')).toBe(false)
    });
})