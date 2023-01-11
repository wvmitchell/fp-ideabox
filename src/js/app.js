import { pipe } from 'ramda'
import { ideaGenerator } from './ideas.js'
import { searchByTerm, searchByTerms, findByFilter } from './search.js'
import { saveToStorage, retrieveFromStorage } from './storage'

const startApp = () => {
  let ideas = retrieveFromStorage()
  let showFiltered = false
  let searchTerm = ''
  let searchTerms = []

  // interface functions
  const addIdea = (ideaDetails) => {
    ideas = [...ideas, ideaGenerator(ideaDetails)]
    saveToStorage(ideas)
  }

  const deleteIdea = (id) => {
    ideas = ideas.filter(idea => {
      return idea.getId() != id
    })
    saveToStorage(ideas)
  }

  const getIdeas = () => {
    return pipe(
      findByFilter(showFiltered),
      searchByTerm(searchTerm),
      searchByTerms(searchTerms),
    )(ideas)
  }

  const toggleStarred = (id) => {
    ideas = ideas.map(idea => {
      if(idea.getId() == id) {
        idea.toggleStarred()
      }
      return idea
    })
    saveToStorage(ideas)
  }

  const toggleFiltered = () => {
    showFiltered = !showFiltered
  }

  const getFilterStatus = () => {
    return showFiltered
  }

  const setSearch = (term) => {
    searchTerm = term
  }

  const getSearchTerms = () => {
    return searchTerms
  }

  const addSearchTerm = (term) => {
    const downcasedTerm = term.toLowerCase()
    const termExists = searchTerms.indexOf(downcasedTerm) > -1
    if(!termExists) {
      searchTerms = [...searchTerms, downcasedTerm]
    }
  }

  const removeSearchTerm = (termToRemove) => {
    searchTerms = searchTerms.filter(term => {
      return term != termToRemove
    })
  }

  return {
    addIdea,
    deleteIdea,
    getIdeas,
    toggleStarred,
    toggleFiltered,
    getFilterStatus,
    setSearch,
    getSearchTerms,
    addSearchTerm,
    removeSearchTerm,
  }
}

module.exports = startApp
