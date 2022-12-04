import startApp from './app.js'
import { 
  draw, 
  erase, 
  makeIdeaElements,
  makeSearchTags,
} from './draw.js'

// Business Logic
const app = startApp()

// DOM Elements
const titleInput = document.getElementById('title')
const bodyInput = document.getElementById('body')
const saveButton = document.getElementById('save')
const searchField = document.getElementById('search')
const searchTagsDisplay = document.getElementById('search-tags')
const filterButton = document.getElementById('filter')
const ideaDisplay = document.getElementById('idea-display')

// Drawing Functions
const drawIdeas = draw(ideaDisplay)
const drawFitlerButton = draw(filterButton)
const drawSearchTags = draw(searchTagsDisplay)

// Event Actions
const addIdea = () => {
  const title = titleInput.value
  const body = bodyInput.value
  if(!title.length || !body.length) return

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

const filterIdeas = () => {
  app.toggleFiltered()
  const btnText = app.getFilterStatus() ? "Show All" : "Show Starred"
  erase(filterButton)
  drawFitlerButton(btnText)
  updatePage()
}

const searchIdeas = event => {
  const searchTerm = event.target.value
  app.setSearch(searchTerm)
  updatePage()
}

const addSearchTag = event => {
  if(event.key != 'Enter') return
  const searchTerm = event.target.value
  searchField.value = ''
  app.addSearchTerm(searchTerm)
  app.setSearch('')
  updatePage()
}

const removeSearchTag = event => {
  const { use, tag } = event.target.dataset 
  if(!use && !tag) return
  app.removeSearchTerm(tag)
  updatePage()
}

// Event Action Helpers
updatePage = () => {
  const searchTerms = app.getSearchTerms()
  const ideas = app.getIdeas()
  erase(ideaDisplay)
  erase(searchTagsDisplay)
  drawIdeas(...makeIdeaElements(ideas))
  drawSearchTags(...makeSearchTags(searchTerms))
}

// Event Listeners
saveButton.addEventListener('click', addIdea)
ideaDisplay.addEventListener('click', handleIdeaAction)
filterButton.addEventListener('click', filterIdeas)
searchField.addEventListener('input', searchIdeas)
searchField.addEventListener('keyup', addSearchTag)
searchTagsDisplay.addEventListener('click', removeSearchTag)

// Page initialization
window.onload = updatePage
