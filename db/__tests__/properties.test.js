const request = require("supertest")
const app = require("../../app")
const db = require("../data/connection")

afterAll(() =>{
    db.end()
})
describe("app", ()=>{
    test("non-existent endpoint responds with 404 and message",async () => {
        const { body } = await request(app).get("/api/non-existent-path").expect(404)

        expect (body.msg).toBe("Path not found.")
    })
    describe("GET - /api/properties", ()=>{
        test("responds with status of 200", async ()=>{
            await request(app).get("/api/properties").expect(200)
        })
        test("responds with an array of properties that contains: id, name, location, price and host", async () =>{
            const { body } = await request(app).get("/api/properties")
            
            expect(Array.isArray(body.properties)).toBe(true)
    
            expect(body.properties.length > 0).toBe(true)
    
            body.properties.forEach(property => {
                expect(property.hasOwnProperty('property_id')).toBe(true)
                expect(property.hasOwnProperty('property_name')).toBe(true)
                expect(property.hasOwnProperty('location')).toBe(true)
                expect(property.hasOwnProperty('price_per_night')).toBe(true)
                expect(property.hasOwnProperty('host')).toBe(true)
            });
        })
        test("responds with an array of properties ordered by most favourited to least by default", async () =>{
            //const { body } = await request(app).get("/api/properties")
            const properties = { rows: [{
                property_id: 1,
                property_name: 'Modern Apartment in City Center',
                location: 'London, UK',
                price_per_night: '120',
                host: 'Alice Johnson'
              },
              {
                property_id: 2,
                property_name: 'Cosy Family House',
                location: 'Manchester, UK',
                price_per_night: '150',
                host: 'Alice Johnson'
              },
              {
                property_id: 3,
                property_name: 'Chic Studio Near the Beach',
                location: 'Brighton, UK',
                price_per_night: '90',
                host: 'Alice Johnson'
              }]}

        expect().toEqual([1,2,3])

        
           // body.properties.
            //how do I test default order?...
        })
        test("invalid optional query path responds with 404 and msg", () =>{

        })
    })
}) 