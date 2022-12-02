const draw = (parentElement) => (...childrenElements) => {
  parentElement.append(...childrenElements)
}

const erase = (element) => {
  element.innerHTML = ""
}

const makeIdeaElement = (idea) => {
  const wrapper = document.createElement('div')
  wrapper.classList.add('idea')

  const header = makeHeader(idea)
  const textfield = makeTextField(idea)
  const footer = makeFooter(idea)

  wrapper.append(header, textfield, footer)
  return wrapper
}

const makeIdeaElements = (ideas = []) => {
  return ideas.map(makeIdeaElement)
}


// Helper functions
const makeHeader = (idea) => {
  const header = document.createElement('div')
  header.classList.add('idea-header')

  const star = document.createElement('img')
  const classes = idea.getStarred() ? ['star', 'active'] : ['star']
  star.classList.add(...classes)
  star.setAttribute('data-use', 'favorite')
  star.setAttribute('data-id', idea.getId())

  const menuClose = document.createElement('img')
  menuClose.classList.add('close')
  menuClose.setAttribute('data-id', idea.getId())

  header.append(star, menuClose)

  return header
}

const makeTextField = (idea) => {
  const textfield = document.createElement('div')
  textfield.classList.add('idea-text')

  const title = document.createElement('h2')
  title.innerHTML = idea.getTitle()

  const body = document.createElement('p')
  body.innerHTML = idea.getBody()

  textfield.append(title, body)
  return textfield
}

const makeFooter = (idea) => {
  const footer = document.createElement('div')
  footer.classList.add('idea-footer')

  const commentBtn = document.createElement('img')
  commentBtn.classList.add('comment')

  const commentTxt = document.createElement('p')
  commentTxt.innerHTML = 'Comment'

  footer.append(commentBtn, commentTxt)
  return footer
}

module.exports = {
  draw,
  erase,
  makeIdeaElement,
  makeIdeaElements,
}
