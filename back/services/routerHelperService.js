const handleResponse = (resObject, response) => {
  if(resObject.error === true){
    response
      .status(resObject.code)
      .append('error', resObject.message)
      .send()
  }else{
    response
      .status(resObject.code)
      .json(resObject.data)
  }
}

module.exports = {
  handleResponse
}