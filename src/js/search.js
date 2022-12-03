const search = (ideas, searchTerm) => {
  return ideas.filter(idea => {
    const title = idea.getTitle()
    const body = idea.getBody()
    const searchRegExp = new RegExp(searchTerm)
    return title.match(searchRegExp) || body.match(searchRegExp) 
  })
}

module.exports = {
  search,
}
