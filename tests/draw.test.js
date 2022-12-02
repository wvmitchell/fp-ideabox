import { draw, erase, makeIdeaElement, makeIdeaElements } from '../src/js/draw.js'
import { ideaGenerator } from '../src/js/ideas.js'

describe('draw', () => {
  test('it should add one element to another element', () => {
    const dummyDiv = document.createElement('div')
    const dummyParagraph = document.createElement('p')
    dummyParagraph.innerHTML = 'Hello World'
    const drawToDiv = draw(dummyDiv)

    drawToDiv(dummyParagraph)

    expect(dummyDiv.children.length).toBe(1)
    expect(dummyDiv.children[0].innerHTML).toMatch(/Hello World/)
  })

  test('it should add many elements to another element', () => {
    const dummyDiv = document.createElement('div')
    const one = document.createElement('p')
    one.innerHTML = 'Hello World'
    const two = document.createElement('p')
    two.innerHTML = 'Hello Solar System'
    const three = document.createElement('p')
    three.innerHTML = 'Hello Universe'
    const drawToDiv = draw(dummyDiv)

    drawToDiv(one, two, three)

    expect(dummyDiv.children.length).toBe(3)
    expect(dummyDiv.children[0].innerHTML).toMatch(/Hello World/)
    expect(dummyDiv.children[1].innerHTML).toMatch(/Hello Solar System/)
    expect(dummyDiv.children[2].innerHTML).toMatch(/Hello Universe/)
  })
})

describe('erase', () => {
  test('it clears the innerHTML of an element', () => {
    const dummyParagraph = document.createElement('p')
    dummyParagraph.innerHTML = 'Hello World'

    erase(dummyParagraph)

    expect(dummyParagraph.innerHTML).toBe('')
  })
})

describe('makeIdeaElement', () => {
  test('it should return a dom element', () => {
    const idea = ideaGenerator({title: 'Hello', body: 'World'})
    const ideaElement = makeIdeaElement(idea)

    expect(ideaElement.classList).toContainEqual('idea')
  })

  test('it should contain a header', () => {
    const idea = ideaGenerator({title: 'Hello', body: 'World'})
    const ideaElement = makeIdeaElement(idea)
    const ideaHeader = ideaElement.children[0]

    expect(ideaHeader.classList).toContainEqual('idea-header')
  })

  test('the header should have a inactive star', () => {
    const idea = ideaGenerator({title: 'Hello', body: 'World'})
    const ideaElement = makeIdeaElement(idea)
    const ideaHeader = ideaElement.children[0]
    const star = ideaHeader.children[0]

    expect(star.classList).toContainEqual('star')
  })

  test('the header should have an active star if starred is true', () => {
    const idea = ideaGenerator({title: 'Hello', body: 'World'})
    idea.toggleStarred()
    const ideaElement = makeIdeaElement(idea)
    const ideaHeader = ideaElement.children[0]
    const star = ideaHeader.children[0]

    expect(star.classList).toContainEqual('active')
  })

  test('the header star should have the right attributes', () => {
    const idea = ideaGenerator({title: 'Hello', body: 'World'})
    idea.toggleStarred()
    const ideaElement = makeIdeaElement(idea)
    const ideaHeader = ideaElement.children[0]
    const star = ideaHeader.children[0]
    const dataId = star.attributes.getNamedItem('data-id').value
    const dataUse = star.attributes.getNamedItem('data-use').value

    expect(dataId).toBeTruthy()
    expect(dataUse).toBe('favorite')
  })

  test('the header should have a close button', () => {
    const idea = ideaGenerator({title: 'Hello', body: 'World'})
    idea.toggleStarred()
    const ideaElement = makeIdeaElement(idea)
    const ideaHeader = ideaElement.children[0]
    const closeBtn = ideaHeader.lastElementChild
    const dataId = closeBtn.attributes.getNamedItem('data-id').value

    expect(closeBtn.classList).toContainEqual('close')
    expect(dataId).toBeTruthy()
  })

  test('it should contain a body', () => {
    const idea = ideaGenerator({title: 'Hello', body: 'World'})
    const ideaElement = makeIdeaElement(idea)
    const ideaText = ideaElement.children[1]
    const ideaTitle = ideaText.children[0]
    const ideaBody = ideaText.children[1]

    expect(ideaText.classList).toContainEqual('idea-text')
    expect(ideaTitle.innerHTML).toMatch(new RegExp(idea.getTitle()))
    expect(ideaBody.innerHTML).toMatch(new RegExp(idea.getBody()))
  })

  test('it should have a footer', () => {
    const idea = ideaGenerator({title: 'Hello', body: 'World'})
    const ideaElement = makeIdeaElement(idea)
    const ideaFooter = ideaElement.lastElementChild
    const commentBtn = ideaFooter.children[0]
    const commentTxt = ideaFooter.children[1]

    expect(ideaFooter.classList).toContainEqual('idea-footer')
    expect(commentBtn.classList).toContainEqual('comment')
    expect(commentTxt.innerHTML).toMatch(/Comment/)
  })
})

describe('makeIdeaElements', () => {
  test('it should return an array', () => {
    const ideaElements = makeIdeaElements()

    expect(ideaElements).toEqual([])
  })

  test('it should take in an array and return one elements', () => {
    const ideaOne = ideaGenerator({title: 'Hello', body: 'World'})
    const ideaTwo = ideaGenerator({title: 'Hello', body: 'Universe'})
    const ideas = [ideaOne, ideaTwo]
    const ideaElements = makeIdeaElements(ideas)

    expect(ideaElements.length).toBe(ideas.length)
    ideaElements.forEach(ideaElement => {
      expect(ideaElement.classList).toContainEqual('idea')
    })
  })
})
