import startApp from '../src/js/app'

describe('app', () => {
  test('it should not have any ideas initally', () => {
    const app = startApp()
    const ideas = app.getIdeas()
    expect(ideas).toEqual([])
  })

  test('it should store an idea', () => {
    const app = startApp()
    const details = {
      title: 'Some title',
      body: 'Somebody'
    }
    app.addIdea(details)
    const ideas = app.getIdeas()

    expect(ideas.length).toBe(1)
    expect(ideas[0].getTitle()).toBe('Some title')
    expect(ideas[0].getBody()).toBe('Somebody')
  })

  test('it should be able to toggle the star', () => {
    const app = startApp()
    const details = {
      title: 'Some title',
      body: 'Somebody'
    }
    app.addIdea(details)
    const ideas = app.getIdeas()
    const idea = ideas[0]
    const id = idea.getId()

    expect(idea.getStarred()).toBe(false)
    app.toggleStarred(id)
    expect(idea.getStarred()).toBe(true)
  })

  test('it should be able to delete an idea', () => {
    const app = startApp()
    const details = {
      title: 'Some title',
      body: 'Somebody'
    }
    app.addIdea(details)
    const ideas = app.getIdeas()
    const id = ideas[0].getId()

    expect(ideas.length).toBe(1)
    app.deleteIdea(id)
    expect(app.getIdeas().length).toBe(0)
  })

  test('it should be able to return the starred ideas', () => {
    const app = startApp()
    const details = {
      title: 'Some title',
      body: 'Somebody'
    }
    app.addIdea(details)
    app.addIdea(details)
    app.addIdea(details)

    const ideas = app.getIdeas()
    const id = ideas[0].getId()
    app.toggleStarred(id)
    app.toggleFiltered()
    const filteredIdeas = app.getIdeas()

    expect(ideas.length).toBe(3)
    expect(filteredIdeas.length).toBe(1)
  })

  test('it should be able to get the filter status', () => {
    const app = startApp()

    expect(app.getFilterStatus()).toBe(false)
    app.toggleFiltered()
    expect(app.getFilterStatus()).toBe(true)
  })
})
