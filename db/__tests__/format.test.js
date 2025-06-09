const {
      formatUsers, 
      usersIdRef,
      propertiesIdRef,
      formatProperties, 
      formatAmenities, 
      formatPropertiesAmenities,
      formatImages,
      formatFavourites,
      formatReviews,
      formatBookings} = require("../utils/format.js")

let users = 0


describe("usersIdRef", ()=>{
  const usersTest =  [
    {
      user_id: 2,
      first_name: 'Bob',
      surname: 'Smith',
      email: 'bob@example.com',
      phone_number: '+44 7000 222222',
      avatar: 'https://example.com/images/bob.jpg',
      is_host: false,
      created_at: '2025-05-26T10:32:53.256Z'
    }
  ]

  test("usersIdRef return an object",()=>{
    expect(typeof usersIdRef(usersTest)).toBe("object")
  })
  test("the key object should be the full name",()=>{
    expect(usersIdRef(usersTest).hasOwnProperty('Bob Smith')).toBe(true)
  })
  test("the value of key should be the user id",()=>{
    const key = 'Bob Smith'
    const userIdTest = usersIdRef(usersTest)
    expect(userIdTest[key]).toBe(2)
  })
})

describe("propertyIdRef", ()=>{
  const propertyTest =  [ {
    property_id: 18,
    name: 'Stylish Loft in Shoreditch',
    property_type: 'Loft',
    location: 'London, UK',
    price_per_night: '220',
    description: 'A modern loft in a trendy area of London, surrounded by street art and restaurants.',
    host_id: 11
  }]

  test("propertyIdRef return an object",()=>{
    expect(typeof propertiesIdRef(propertyTest)).toBe("object")
  })
  test("the key object should be the property name",()=>{
    expect(propertiesIdRef(propertyTest).hasOwnProperty('Stylish Loft in Shoreditch')).toBe(true)
  })
  test("the value of key should be the user id",()=>{
    const key = 'Stylish Loft in Shoreditch'
    const propertyIdTest = propertiesIdRef(propertyTest)
    expect(propertyIdTest[key]).toBe(18)
  })
})

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
        expect(Array.isArray(result)).toBe(true)
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
            }
        ]
        users = {
          'Alice Johnson': 1,
          'Bob Smith': 2,
          'Emma Davis': 3,
          'Frank White': 4,
          'Isabella Martinez': 5,
          'Rachel Cummings': 6
        }
    })
    test("return an array", ()=>{
        expect(Array.isArray(formatProperties(property, users))).toBe(true)
    })
    test("Should have an element with host_id value", ()=>{
        const [test] = formatProperties(property, users)
        expect(test).toEqual([
                                  'Modern Apartment in City Center',
                                  'Apartment',
                                  'London, UK',
                                  120,
                                  'Description of Modern Apartment in City Center.',
                                  1
        ])
    })
})

describe("formatAmenities", () => {
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
                "host_name": "Emma Davis",
                "amenities": ["WiFi", "Parking", "Kitchen"]
            }]
    })
    test ("amenities is an array", ()=> {
        const test = formatAmenities(property)
        expect(Array.isArray(test)).toBe(true)
    })
    test ("array should contain amenities from properties", ()=> {
      const test = formatAmenities(property)
      expect(test).toEqual(['WiFi','TV','Kitchen','Parking'])
  })
})

describe("formatPropertiesAmenities", () => {
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
            }]
        users = [
                {
                  user_id: 1,
                  first_name: 'Alice',
                  surname: 'Johnson',
                  email: 'alice@example.com',
                  phone_number: '+44 7000 111111',
                  avatar: 'https://example.com/images/alice.jpg',
                  is_host: true,
                  created_at: "2025-05-24T08:31:37.677Z"
                }]
        propertyId = [
                      {
                        property_id: 1,
                        name: 'Modern Apartment in City Center',
                        property_type: 'Apartment',
                        location: 'London, UK',
                        price_per_night: '120',
                        description: 'Description of Modern Apartment in City Center.',
                        host_id: 1
                      }]
    })
    test ("property amenities is an array", ()=> {
        const test = formatPropertiesAmenities(property, users,propertyId)
        expect(Array.isArray(test)).toBe(true)
    })
    test ("amenities array should return arrays with property id and amenities", ()=> {
      const test = formatPropertiesAmenities(property, users,propertyId)
      expect(test).toEqual([[1,'WiFi'], 
                            [1,'TV'], 
                            [1,'Kitchen']])
  })

})

describe("formatImages", () => {
  beforeEach(() => {
      propertyId = [
                    {
                      property_id: 1,
                      name: 'Modern Apartment in City Center',
                      property_type: 'Apartment',
                      location: 'London, UK',
                      price_per_night: '120',
                      description: 'Description of Modern Apartment in City Center.',
                      host_id: 1
                    }]
      images = [
                {
                  "property_name": "Modern Apartment in City Center",
                  "image_url": "https://example.com/images/modern_apartment_1.jpg",
                  "alt_tag": "Alt tag for Modern Apartment in City Center"
                }
               ]
  })
  test ("images is an array", ()=> {
      const test = formatImages(images, propertyId)
      expect(Array.isArray(test)).toBe(true)
  })



})

describe("formatFavourites", () => {
  beforeEach(() => {
    favourites = [
                    {
                      "guest_name": "Bob Smith",
                      "property_name": "Modern Apartment in City Center"
                    }
                  ]
      propertyId = [
                    {
                      property_id: 1,
                      name: 'Modern Apartment in City Center',
                      property_type: 'Apartment',
                      location: 'London, UK',
                      price_per_night: '120',
                      description: 'Description of Modern Apartment in City Center.',
                      host_id: 1
                    }]
      guestId = [{
                user_id: 2,
                first_name: 'Bob',
                surname: 'Smith',
                email: 'bob@example.com',
                phone_number: '+44 7000 222222',
                avatar: 'https://example.com/images/bob.jpg',
                is_host: false,
                created_at: "2025-05-26T10:32:53.256Z"
              }]
 
  })
  test ("Favourites is an array", ()=> {
      const test = formatFavourites(favourites, guestId, propertyId)
      expect(Array.isArray(test)).toBe(true)
  })



})


describe("formatReviews", () => {
  beforeEach(() => {
    reviews = [
                {
                  "guest_name": "Bob Smith",
                  "property_name": "Modern Apartment in City Center",
                  "rating": 2,
                  "comment": "Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Wouldn’t stay again."
                }
              ]
      insertedProperties = [
                    {
                      property_id: 1,
                      name: 'Modern Apartment in City Center',
                      property_type: 'Apartment',
                      location: 'London, UK',
                      price_per_night: '120',
                      description: 'Description of Modern Apartment in City Center.',
                      host_id: 1
                    }]
      insertedUsers = [{
                user_id: 2,
                first_name: 'Bob',
                surname: 'Smith',
                email: 'bob@example.com',
                phone_number: '+44 7000 222222',
                avatar: 'https://example.com/images/bob.jpg',
                is_host: false,
                created_at: "2025-05-26T10:32:53.256Z"
              }]
 
  })
  test ("Favourites is an array", ()=> {
      const test = formatReviews(insertedProperties, insertedUsers, reviews)
      expect(Array.isArray(test)).toBe(true)
  })

})


describe("formatBookings", () => {
  beforeEach(() => {
    bookings = [
                {
                  "property_name": "Modern Apartment in City Center",
                  "guest_name": "Bob Smith",
                  "check_in_date": "2025-12-01",
                  "check_out_date": "2025-12-05"
                }
              ]
      insertedProperties = [
                    {
                      property_id: 1,
                      name: 'Modern Apartment in City Center',
                      property_type: 'Apartment',
                      location: 'London, UK',
                      price_per_night: '120',
                      description: 'Description of Modern Apartment in City Center.',
                      host_id: 1
                    }]
      insertedUsers = [{
                user_id: 2,
                first_name: 'Bob',
                surname: 'Smith',
                email: 'bob@example.com',
                phone_number: '+44 7000 222222',
                avatar: 'https://example.com/images/bob.jpg',
                is_host: false,
                created_at: "2025-05-26T10:32:53.256Z"
              }]
 
  })
  test ("Favourites is an array", ()=> {
      const test = formatBookings(insertedProperties, insertedUsers, bookings)
      expect(Array.isArray(test)).toBe(true)
  })

})