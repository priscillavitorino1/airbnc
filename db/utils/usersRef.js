function usersRef(dataUsers){
    return dataUsers.map(({ role, ...rest }) => ({
        ...rest,
        is_host: role === 'host'
      }));
}

module.exports = usersRef;
