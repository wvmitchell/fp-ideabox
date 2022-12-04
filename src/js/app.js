import { pipe } from 'ramda'
import { ideaGenerator } from './ideas.js'
import { searchByTerm } from './search.js'
import { saveToStorage, retrieveFromStorage } from './storage'

const startApp = () => {
  let ideas = retrieveFromStorage()
  let showFiltered = false
  let searchTerm = ''

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

  // helper functions
  const findByFilter = (filterStatus) => (ideas) => {
    if(filterStatus) {
      return ideas.filter(idea => idea.getStarred())
    }
    return ideas
  }

  return {
    addIdea,
    deleteIdea,
    getIdeas,
    toggleStarred,
    toggleFiltered,
    getFilterStatus,
    setSearch,
  }
}

module.exports = startApp
