import { ideaGenerator } from '../src/js/ideas'

describe('ideaGenerator', () => {
  test('it should add a title', () => {
    const title = 'the title'
    const idea = ideaGenerator({title})

    expect(idea.getTitle()).toBe(title)
  })

  test('it should have a body', () => {
    const body = 'the body'
    const idea = ideaGenerator({body})

    expect(idea.getBody()).toBe(body)
  })

  test('it should have an id', () => {
    const idea = ideaGenerator()

    expect(idea.getId()).toBeTruthy()
  })

  test('it is not starred by default', () => {
    const idea = ideaGenerator()

    expect(idea.getStarred()).toBe(false)
  })

  test('it can update the starred status', () => {
    const idea = ideaGenerator()
    idea.toggleStarred()

    expect(idea.getStarred()).toBe(true)
  })
})
