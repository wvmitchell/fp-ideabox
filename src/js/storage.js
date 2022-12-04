import { ideaGenerator } from './ideas.js'

const saveToStorage = (ideas) => {
  const ideaData = ideas.map(idea => ({
    title: idea.getTitle(),
    body: idea.getBody(),
    id: idea.getId(),
    starred: idea.getStarred(),
  }))

  localStorage.setItem('ideas', JSON.stringify(ideaData))
}

const retrieveFromStorage = () => {
  const ideaData = JSON.parse(localStorage.getItem('ideas'))

  if(ideaData) {
    return ideaData.map(ideaGenerator)
  }
  return []
}

module.exports = {
  saveToStorage,
  retrieveFromStorage,
}
