const request = require("supertest")
const app = require("../../app")
const db = require("../data/connection")
//const seed = require("../data/seed")

afterAll(()=>{
    db.end
})

/*beforeEach(() => {
    seed(....)
})*/
describe("app", ()=>{
    test("non-existent endpoint responds with 404 and message",async () => {
        const { body } = await request(app).get("/api/non-existent-path").expect(404)
        //expect (body.msg).toBe("Path not found.")
    })

    describe("GET - /api/properties", ()=>{
        test("responds with status of 200", async ()=>{
            await request(app).get("/api/properties").expect(200)
        })
        test("responds with an array of properties that contains: id, name, location, price and host", async () =>{
            const { body } = await request(app).get("/api/properties")
            
            expect(Array.isArray(body.properties)).toBe(true)
    
            //expect(body.properties.length).toBe(11)
    
            body.properties.forEach(property => {
                expect(property.hasOwnProperty('property_id')).toBe(true)
                expect(property.hasOwnProperty('property_name')).toBe(true)
                expect(property.hasOwnProperty('location')).toBe(true)
                expect(property.hasOwnProperty('price_per_night')).toBe(true)
                expect(property.hasOwnProperty('host')).toBe(true)
            });
        })
        test("responds with an array of properties ordered by most favourited to least by default", async () =>{
            const { body } = await request(app).get("/api/properties")
            expect(body.properties).toBeSortedBy('favourite_count', {descending: true})
        })
        test("returns properties with price_per_night <= maxPrice when maxPrice is provided", async () =>{
            const maxPrice = 200;
            const {body}  = await request(app).get(`/api/properties?maxPrice=${maxPrice}`)
            
            body.properties.map((property) => {
                expect(Number(property.price_per_night)).toBeLessThanOrEqual(maxPrice);
            });
        })
        test("returns properties with price_per_night >= minrice when minPrice is provided", async () =>{
            const minPrice = 100;
            const {body}  = await request(app).get(`/api/properties?minPrice=${minPrice}`)
            
            body.properties.map((property) => {
                expect(Number(property.price_per_night)).toBeGreaterThanOrEqual(minPrice);
            });
        })
        test("returns properties hosted by the given host when host_id is provided", async () =>{
            const host_id = 1
            const {body}  = await request(app).get(`/api/properties?host_id=${host_id}`)
            body.properties.map((property) => {
                expect(property).toHaveProperty('host')
            })
        })
        test("invalid input responds with 400 and msg", async ()=>{
            const {body} = await request(app).get("/api/properties/invalid-input").expect(400)
            expect(body.msg).toBe("Bad request.")
        })
        test("valid id but non-existent responds with 404 and msg", async() =>{
            const {body} = await request(app).get("/api/properties/10000").expect(404)
            expect(body.msg).toBe("Not found.")
        })
        test("returns a key image", async ()=> {
            const { body } = await request(app).get("/api/properties")
            body.properties.map((property)=>{
                expect(property).toHaveProperty('image')
            })
            
        })
        test("returns a key image with first image associated to the property", async ()=> {
            const { body } = await request(app).get("/api/properties")
            expect(body.properties).toHaveProperty('image')

            //how do I know if this image is the first if I dont have a timestamp?
        })
        
    })

    describe("GET - /api/properties/:id", ()=>{
        test("responds with status of 200", async ()=>{
            const id = 1;
            await request(app).get(`/api/properties/${id}`).expect(200)
        })
        test("responds with an object of property that contains: id, name, location, price, description, host, host_avatar and favourite_count", async ()=>{
            const id = 1;
            const {body} = await request(app).get(`/api/properties/${id}`).expect(200)

            expect(body.property).toHaveProperty('property_id')
            expect(body.property).toHaveProperty('property_name')
            expect(body.property).toHaveProperty('location')
            expect(body.property).toHaveProperty('price_per_night')
            expect(body.property).toHaveProperty('description')
            expect(body.property).toHaveProperty('host')
            expect(body.property).toHaveProperty('host_avatar')
            expect(body.property).toHaveProperty('favourite_count')

        })
        test("responds with 404 and msg when valid Id but non-existent", async ()=>{
            const{body} = await request(app).get('/api/properties/10000').expect(404)
            expect(body.msg).toBe('Not found.')
        })
        test("responds with 400 and msg when id is invalid", async ()=>{
            const{body} = await request(app).get('/api/properties/invalid-id').expect(400)

            expect(body.msg).toBe('Bad request.')
        })
        test("optional path user_id responds with property favourited", async ()=>{
            const id = 1;
            const user_id = 2;
            const {body} = await request(app).get(`/api/properties/${id}?user_id=${user_id}`).expect(200)

            expect(body.property).toHaveProperty('favourited')
            expect(body.property.favourited).toBe(false)
        })
        test("property favourited should return a boolean True or False", async ()=>{
            const id = 1;
            const user_id = 2;
            const {body} = await request(app).get(`/api/properties/${id}?user_id=${user_id}`).expect(200)

            expect(typeof body.property.favourited).toBe('boolean')
        })
    })

    describe("GET - /api/properties/:id/reviews", ()=>{
        test("responds status of 200", async () => {
            const id = 1
            await request(app).get(`/api/properties/${id}/reviews`).expect(200)
        })
        test("responds with an array of properties that contains: review_id, comment, rating, created_at, guests and guest_avatar", async () => {
            const id = 1
            const {body} = await request(app).get(`/api/properties/${id}/reviews`).expect(200)

            body.reviews.map((review)=> {
                expect(review).toHaveProperty('review_id')
                expect(review).toHaveProperty('comments')
                expect(review).toHaveProperty('rating')
                expect(review).toHaveProperty('created_at')
                expect(review).toHaveProperty('guests')
                expect(review).toHaveProperty('guest_avatar')
            })
        })
        test("invalid id input responds with 400 and msg", async ()=>{
            const {body} = await request(app).get(`/api/properties/invalid-id/reviews`).expect(400)
            expect(body.msg).toBe("Bad request.")
        })
        test("valid id but non-existent responds with 404 and msg", async() =>{
            const {body} = await request(app).get(`/api/properties/99999/reviews`).expect(404)
            expect(body.msg).toBe("Not found.")
        })

    })

    describe("GET - /api/users/:id", ()=>{
        test("responds with status of 200", async ()=>{
            const id = 1
            await request(app).get(`/api/users/${id}`).expect(200)
        })
        test("responds with an array of properties that contains: id, name, location, price and host", async () =>{
            const id = 1
            
            const { body } = await request(app).get(`/api/users/${id}`).expect(200)
            
            expect(body.user).toHaveProperty('user_id')
            expect(body.user).toHaveProperty('first_name')
            expect(body.user).toHaveProperty('surname')
            expect(body.user).toHaveProperty('email')
            expect(body.user).toHaveProperty('phone_number')
            expect(body.user).toHaveProperty('avatar')
            expect(body.user).toHaveProperty('created_at')
        })
        test("responds with 404 and msg when valid Id but non-existent", async ()=>{
            const{body} = await request(app).get('/api/users/10000').expect(404)
            expect(body.msg).toBe('Property not found.')
        })
        test("responds with 400 and msg when id is invalid", async ()=>{
            const{body} = await request(app).get('/api/users/invalid-id').expect(400)

            expect(body.msg).toBe('Bad request.')
        })
    })












    /*describe("POST - /api/properties/:id/reviews", ()=>{
        const newReview = {
            guest_id: 1,
            rating: 5, 
            comments: 'test'
        }
        test("responds with status of 201", async ()=>{
            const id = 1
            await request(app).post(`/api/properties/${id}/reviews`).send(newReview).expect(201)
        })
        test("responds with the created review", async() =>{
            const id = 1
            const {body} = await request(app).post(`/api/properties/${id}/reviews`).send(newReview).expect(201)
            expect(body.review.review_id).toBe(14)
        })
    })
    describe("PATCH - /api/users/:id", ()=>{
        test("responds with status of 200", async ()=>{
            const id = 1
            await request(app).patch(`/api/users/${id}`).expect(200)
        })
    })*/
}) 
