const searchByTerm = (searchTerm = '') => (ideas) => {
  return ideas.filter(idea => {
    const title = idea.getTitle().toLowerCase()
    const body = idea.getBody().toLowerCase()
    const searchRegExp = new RegExp(searchTerm.toLowerCase())
    return title.match(searchRegExp) || body.match(searchRegExp) 
  })
}

const searchByTerms = (searchTerms = []) => (ideas) => {
  return ideas.reduce((foundIdeas, idea) => {
    const title = idea.getTitle().toLowerCase()
    const body = idea.getBody().toLowerCase()
    const matchesAllTerms = searchTerms.every(term => {
      const searchRegExp = new RegExp(term.toLowerCase())
      return title.match(searchRegExp) || body.match(searchRegExp)
    })

    if(matchesAllTerms) {
      return [...foundIdeas, idea]
    }
    return foundIdeas
  }, [])
}

module.exports = {
  searchByTerm,
  searchByTerms,
}
