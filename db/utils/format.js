function formatUsers(dataUsers){
    const usersFomated = dataUsers.map(({ role, ...rest }) => ({
        ...rest,
        is_host: role === 'host'
      }));
    return usersFomated.map(({first_name, surname, email, phone_number, avatar, is_host}) => {
        return [first_name, surname, email, phone_number, avatar, is_host]})
}
//return an array instead of an object

function usersIdRef (users) {
  const userId = {}
  users.map((user) => {
        const fullName = `${user.first_name} ${user.surname}`
        userId[fullName] = user.user_id
  })
  return userId
}

function propertiesIdRef(propertiesData){
  const propertyId = {}
  propertiesData.map((property) => {
    propertyId[property.name] = property.property_id
  })
  return propertyId
}


function formatProperties (dataProperties, userRef) {
  return dataProperties.map(({host_name, name, property_type, location, price_per_night, description}) => {
    const host_id = userRef[host_name]
    return [name, property_type, location, price_per_night, description, host_id]    

  });

}

function formatAmenities (dataProperties) {
  const amenities = []

  dataProperties.map((property) => {
    property.amenities.map((item)=>{
      if(amenities.includes(item)) {
        return amenities
      } else {
        amenities.push(item)
        return amenities
      }
    })
  })
  return amenities
}

function formatPropertiesAmenities(dataProperties, userRef, propertyId){
    const amenityResult = []
    
    const propertyByHostId = dataProperties.map(({host_name, name, property_type, location, price_per_night, description, amenities}) => {
                                                  const host_id = userRef[host_name]
                                                  return {name, property_type, location, price_per_night, description, host_id, amenities  }
                                                });
    propertyId.forEach(property => {
      const match = propertyByHostId.find(propertyAmenities => propertyAmenities.name === property.name);
      if (match && match.amenities) {
          match.amenities.forEach(amenity => {
              amenityResult.push([property.property_id, amenity]);
        });
      }
  });
  return amenityResult
}

function formatImages(imagesData, insertedProperties) {
  const imageResult = []

  insertedProperties.forEach(property => {
    return imagesData.forEach(image => {
      if (image.property_name === property.name) {
        imageResult.push([property.property_id, 
                          image.image_url, 
                          image.alt_tag]);
      }
    }
  );
  });

  return imageResult;

}

function formatFavourites(favouritesData, userRef, insertedProperties){
  const favouritesResult = []

  insertedProperties.forEach(property => {
    
    return favouritesData.forEach(favourite => {
      if (favourite.property_name === property.name) {
        favouritesResult.push([userRef[favourite.guest_name], 
                              property.property_id]);
      }
    })
  })
  return favouritesResult
}


function formatReviews (insertedProperties, userRef, reviews){

  const reviewsResult = []

  insertedProperties.forEach(property => {
    
    return reviews.forEach(review => {
      if (review.property_name === property.name) {
        reviewsResult.push([property.property_id,
                            userRef[review.guest_name], 
                            review.rating,
                            review.comment]);
      }
    })
  })
  return reviewsResult
}

function formatBookings(insertedProperties, userRef, bookingsData){
  const bookingResult = []

  insertedProperties.forEach((property)=>{
    return bookingsData.forEach((booking)=>{
      if(booking.property_name && property.name){
        bookingResult.push([property.property_id,
          userRef[booking.guest_name],
                            booking.check_in_date,
                            booking.check_out_date,
        ])
      }
    })
  })
  return bookingResult
}


module.exports = {
                  formatUsers, 
                  usersIdRef,
                  propertiesIdRef,
                  formatProperties, 
                  formatAmenities, 
                  formatPropertiesAmenities,
                  formatImages,
                  formatFavourites,
                  formatReviews,
                  formatBookings
                };
