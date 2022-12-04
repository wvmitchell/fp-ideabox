import { saveToStorage, retrieveFromStorage } from '../src/js/storage.js'
import { ideaGenerator } from '../src/js/ideas.js'

describe('saveToStorage', () => {
  test('it can save an idea to storage', () => {
    const ideas = [
      ideaGenerator({title: 'one', body: 'first'})
    ]
    const expectedTitle = 'one'
    const expectedBody = 'first'
    const expectedId = ideas[0].getId()
    const expectedStarred = ideas[0].getStarred()

    saveToStorage(ideas)
    const savedIdeas = JSON.parse(localStorage.getItem('ideas'))

    expect(savedIdeas[0].title).toBe(expectedTitle)
    expect(savedIdeas[0].body).toBe(expectedBody)
    expect(savedIdeas[0].id).toBe(expectedId)
    expect(savedIdeas[0].starred).toBe(expectedStarred)
  })

  test('it can save multiple ideas to storage', () => {
    const ideas = [
      ideaGenerator({title: 'one', body: 'first'}),
      ideaGenerator({title: 'two', body: 'second'})
    ]
    const expectedTitle = 'two'
    const expectedBody = 'second'
    const expectedId = ideas[1].getId()
    const expectedStarred = ideas[1].getStarred()

    saveToStorage(ideas)
    const savedIdeas = JSON.parse(localStorage.getItem('ideas'))

    expect(savedIdeas[1].title).toBe(expectedTitle)
    expect(savedIdeas[1].body).toBe(expectedBody)
    expect(savedIdeas[1].id).toBe(expectedId)
    expect(savedIdeas[1].starred).toBe(expectedStarred)
  })
})

describe('retrieveFromStorage', () => {
  test('it can rehydrate an idea from storage', () => {
    const ideas = [
      ideaGenerator({title: 'one', body: 'first'}),
    ]
    const expectedTitle = 'one'
    const expectedBody = 'first'
    const expectedId = ideas[0].getId()
    const expectedStarred = ideas[0].getStarred()

    saveToStorage(ideas)
    const retrievedIdeas = retrieveFromStorage()

    expect(retrievedIdeas[0].getTitle()).toBe(expectedTitle)
    expect(retrievedIdeas[0].getBody()).toBe(expectedBody)
    expect(retrievedIdeas[0].getId()).toBe(expectedId)
    expect(retrievedIdeas[0].getStarred()).toBe(expectedStarred)
  })

  test('it can rehydrate many ideas from storage', () => {
    const ideas = [
      ideaGenerator({title: 'one', body: 'first'}),
      ideaGenerator({title: 'two', body: 'second'})
    ]
    const expectedTitle = 'two'
    const expectedBody = 'second'
    const expectedId = ideas[1].getId()
    const expectedStarred = ideas[1].getStarred()

    saveToStorage(ideas)
    const retrievedIdeas = retrieveFromStorage()

    expect(retrievedIdeas[1].getTitle()).toBe(expectedTitle)
    expect(retrievedIdeas[1].getBody()).toBe(expectedBody)
    expect(retrievedIdeas[1].getId()).toBe(expectedId)
    expect(retrievedIdeas[1].getStarred()).toBe(expectedStarred)
  })

  test('it returns an empty array if no ideas in storage', () => {
    localStorage.clear()
    const retrievedIdeas = retrieveFromStorage()
    expect(retrievedIdeas).toEqual([])
  })
})
