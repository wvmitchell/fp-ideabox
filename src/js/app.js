import { ideaGenerator } from './ideas.js'

const startApp = () => {
  let ideas = []
  let showFiltered = false

  const addIdea = (ideaDetails) => {
    ideas = [...ideas, ideaGenerator(ideaDetails)]
  }

  const deleteIdea = (id) => {
    ideas = ideas.filter(idea => {
      return idea.getId() != id
    })
  }

  const getIdeas = () => {
    if(showFiltered) {
      return ideas.filter(idea => idea.getStarred())
    }
    return ideas
  }

  const toggleStarred = (id) => {
    ideas = ideas.map(idea => {
      if(idea.getId() == id) {
        idea.toggleStarred()
      }
      return idea
    })
  }

  const toggleFiltered = () => {
    showFiltered = !showFiltered
  }

  const getFilterStatus = () => {
    return showFiltered
  }

  return {
    addIdea,
    deleteIdea,
    getIdeas,
    toggleStarred,
    toggleFiltered,
    getFilterStatus,
  }
}

module.exports = startApp
