const searchByTerm = (searchTerm) => (ideas) => {
  return ideas.filter(idea => {
    const title = idea.getTitle().toLowerCase()
    const body = idea.getBody().toLowerCase()
    const searchRegExp = new RegExp(searchTerm.toLowerCase())
    return title.match(searchRegExp) || body.match(searchRegExp) 
  })
}

module.exports = {
  searchByTerm,
}
