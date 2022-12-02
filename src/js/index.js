import startApp from './app.js'
import { draw, erase, makeIdeaElements } from './draw.js'

// Business Logic
const app = startApp()

// DOM Elements
const titleInput = document.getElementById('title')
const bodyInput = document.getElementById('body')
const saveButton = document.getElementById('save')
const searchField = document.getElementById('search')
const ideaDisplay = document.getElementById('idea-display')

// Drawing Functions
const drawIdeas = draw(ideaDisplay)

// Event Actions
const addIdea = event => {
  const title = titleInput.value
  const body = bodyInput.value

  app.addIdea({title, body})
  updatePage()
}

const handleIdeaAction = event => {
  const { use, id } = event.target.dataset
  if(!use && !id) return

  switch(use) {
    case 'favorite':
      app.toggleStarred(id)
      break;
    case 'delete':
      app.deleteIdea(id)
      break;
  }

  updatePage()
}

// Event Action Helpers
updatePage = () => {
  const ideas = app.getIdeas()
  erase(ideaDisplay)
  drawIdeas(...makeIdeaElements(ideas))
}

// Event Listeners
saveButton.addEventListener('click', addIdea)
ideaDisplay.addEventListener('click', handleIdeaAction)
