function formatUsers(dataUsers){
    return dataUsers.map(({ role, ...rest }) => ({
        ...rest,
        is_host: role === 'host'
      }));
}

//return an array instead of an object


function userRef (users) {
  const userId = {}
  return users.map((user) => {
        const fullName = `${user.first_name} ${user.surname}`
        userId[fullName] = user.user_id
        return userId
    })
}

function formatProperties (dataProperties, hostRef) {
  let hostMapId = hostRef[0]
  return dataProperties.map(({host_name, amenities, ...property}) => {
    let host_id = 0
    if(Object.hasOwn(hostMapId, host_name)){
      host_id = hostMapId[host_name]
    }
    return {
            ...property,
            host_id: host_id
          }

  });

}



module.exports = {formatUsers, userRef, formatProperties};
