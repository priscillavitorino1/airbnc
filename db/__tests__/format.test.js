const {formatUsers, userRef, formatProperties} = require("../utils/format.js")
let users = 0

describe("formatUsers", ()=>{
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
    test('should return a property called is_host', () => {
        const result = formatUsers(users)
        //console.log(result)
        expect(result[0].hasOwnProperty('is_host')).toBe(true)
    });
    test('Property is_hold contains boolean value', () => {
        const result = formatUsers(users)
        expect(result[0].is_host).toBe(true)
    });
    test('should remove role', () => {
        const result = formatUsers(users)
        expect(result[0].hasOwnProperty('role')).toBe(false)
    });
})

describe("formatProperties", () =>{
    beforeEach(() => {
        property = [
            {
                "name": "Modern Apartment in City Center",
                "property_type": "Apartment",
                "location": "London, UK",
                "price_per_night": 120.0,
                "description": "Description of Modern Apartment in City Center.",
                "host_name": "Alice Johnson",
                "amenities": ["WiFi", "TV", "Kitchen"]
            },
            {
                "name": "Cosy Family House",
                "property_type": "House",
                "location": "Manchester, UK",
                "price_per_night": 150.0,
                "description": "Description of Cosy Family House.",
                "host_name": "Alice Johnson",
                "amenities": ["WiFi", "Parking", "Kitchen"]
            }
        ]
        hostRef = [{
            'Alice Johnson': 1,
            'Bob Smith': 2,
            'Emma Davis': 3,
            'Frank White': 4,
            'Isabella Martinez': 5,
            'Rachel Cummings': 6
            }]
    })
    test("return an array", ()=>{
        expect(typeof formatProperties(property, hostRef)).toBe('object')
    })
    test("Should have a property called host_id", ()=>{
        const test = formatProperties(property, hostRef)
        expect(test[0].hasOwnProperty('host_id')).toBe(true)
    })
    test("Should have a property called host_id", ()=>{
        const test = formatProperties(property, hostRef)
        expect(test[0].hasOwnProperty('host_id')).toBe(true)
    })
    test('should remove host_name property', () => {
        const test = formatUsers(property, hostRef)
        console.log(test)
        expect(test[0].hasOwnProperty('role')).toBe(false)
    });


})


xdescribe("userRef", () => {
    const insertedUsers = 
                        [
                            {
                            user_id: 1,
                            first_name: 'Alice',
                            surname: 'Johnson',
                            email: 'alice@example.com',
                            phone_number: '+44 7000 111111',
                            avatar: 'https://example.com/images/alice.jpg',
                            is_host: true,
                            created_at: '2025-05-17T11:16:23.940Z'
                            }
                        ]

    //console.log(userRef(insertedUsers))
    
})