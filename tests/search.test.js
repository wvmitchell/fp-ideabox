import { ideaGenerator } from '../src/js/ideas'
import { search } from '../src/js/search'

describe('search', () => {
  let ideas = [
    ideaGenerator({title: 'one', body: 'the first body'}),
    ideaGenerator({title: 'two', body: 'the second body'}),
    ideaGenerator({title: 'three', body: 'the third body'}),
  ]

  test('it can search for a full title', () => {
    const matched = search('one')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for a partial match title', () => {
    const matched = search('tw')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('two')
  })

  test('it can search for another partial match title', () => {
    const matched = search('hre')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('three')
  })

  test('it can search title case insensitive', () => {
    const matched = search('hRe')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('three')
  })

  test('it returns all items when the search is blank', () => {
    const matched = search('')(ideas)

    expect(matched.length).toBe(3)
    expect(matched[0].getTitle()).toBe('one')
    expect(matched[1].getTitle()).toBe('two')
    expect(matched[2].getTitle()).toBe('three')
  })

  test('it can search for a full body', () => {
    const matched = search('the first body')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for a partial body', () => {
    const matched = search('first')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for another partial body', () => {
    const matched = search('sec')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('two')
  })
})
