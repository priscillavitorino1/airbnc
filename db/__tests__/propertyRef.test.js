const propertyRef = require("../utils/propertyRef.js")

describe("propertyRef", ()=>{
    let data = []
    beforeEach(() => {
        data = [
            {
                "name": "Modern Apartment in City Center",
                "property_type": "Apartment",
                "location": "London, UK",
                "price_per_night": 120.0,
                "description": "Description of Modern Apartment in City Center.",
                "host_name": "Alice Johnson",
                "amenities": ["WiFi", "TV", "Kitchen"]
              }]
    })
    xtest('should have a property called host_id', () => {
        expect(propertyRef(data).hasOwnProperty('host_id')).toBe(true)
    });
    xtest('should remove property called host_name', () => {
        expect(propertyRef().hasOwnProperty('host_name')).toBe(false)
    });
})