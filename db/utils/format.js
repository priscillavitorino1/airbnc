function formatUsers(dataUsers){
    return dataUsers.map(({ role, ...rest }) => ({
        ...rest,
        is_host: role === 'host'
      }));
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

function formatProperties (dataProperties, usersId) {
  const userId = usersIdRef(usersId)
  return dataProperties.map(({host_name, name, property_type, location, price_per_night, description}) => {
    const host_id = userId[host_name]
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

function formatPropertiesAmenities(dataProperties, usersId, propertyId){
    const amenityResult = []
    const userId = usersIdRef(usersId)
    
    const propertyByHostId = dataProperties.map(({host_name, name, property_type, location, price_per_night, description, amenities}) => {
                                                  const host_id = userId[host_name]
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

function formatFavourites(favouritesData, insertedUsers, insertedProperties){
  const userId = usersIdRef(insertedUsers)
  const favouritesResult = []

  insertedProperties.forEach(property => {
    
    return favouritesData.forEach(favourite => {
      if (favourite.property_name === property.name) {
        favouritesResult.push([userId[favourite.guest_name], 
                              property.property_id]);
      }
    })
  })
  return favouritesResult
}


function formatReviews (insertedProperties, insertedUsers, reviews){
  const userId = usersIdRef(insertedUsers)

  const reviewsResult = []

  insertedProperties.forEach(property => {
    
    return reviews.forEach(review => {
      if (review.property_name === property.name) {
        reviewsResult.push([property.property_id,
                            userId[review.guest_name], 
                            review.rating,
                            review.comment]);
      }
    })
  })
  return reviewsResult
}

function formatBookings(insertedProperties, insertedUsers, bookingsData){
  const userId = usersIdRef(insertedUsers)
  const bookingResult = []

  insertedProperties.forEach((property)=>{
    return bookingsData.forEach((booking)=>{
      if(booking.property_name && property.name){
        bookingResult.push([property.property_id,
                            userId[booking.guest_name],
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
                  formatProperties, 
                  formatAmenities, 
                  formatPropertiesAmenities,
                  formatImages,
                  formatFavourites,
                  formatReviews,
                  formatBookings
                };
