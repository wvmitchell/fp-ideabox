import { ideaGenerator } from './ideas.js'

const startApp = () => {
  let ideas = []

  const addIdea = (ideaDetails) => {
    ideas = [...ideas, ideaGenerator(ideaDetails)]
  }

  const deleteIdea = (id) => {
    ideas = ideas.filter(idea => {
      return idea.getId() != id
    })
  }

  const toggleStarred = (id) => {
    ideas = ideas.map(idea => {
      if(idea.getId() == id) {
        idea.toggleStarred()
      }
      return idea
    })
  }

  const getIdeas = () => ideas

  return {
    addIdea,
    deleteIdea,
    getIdeas,
    toggleStarred,
  }
}

module.exports = startApp
