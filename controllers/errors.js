exports.handlePathNotFound = (err, req, res, next) =>{
    if(err.code === '22P02'){
        res.status(404).send({msg:"Path not found."})
    } else {
        next(err)
    }
}

exports.handleDataNotFound = (err, req, res, next) => {
    res.status(err.status).send({msg: err.msg})
}

exports.handleBadRequest = (err, req, res, next) => {
    res.status(400).send({msg:"Bad request."})
}
