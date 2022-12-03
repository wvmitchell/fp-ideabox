import { ideaGenerator } from '../src/js/ideas'
import { search } from '../src/js/search'

describe('search', () => {
  let ideas = [
    ideaGenerator({title: 'one', body: 'the first body'}),
    ideaGenerator({title: 'two', body: 'the second body'}),
    ideaGenerator({title: 'three', body: 'the third body'}),
  ]

  test('it can search for a full title', () => {
    const matched = search(ideas, 'one')

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for a partial match title', () => {
    const matched = search(ideas, 'tw')

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('two')
  })

  test('it can search for another partial match title', () => {
    const matched = search(ideas, 'hre')

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('three')
  })

  test('it returns all items when the search is blank', () => {
    const matched = search(ideas, '')

    expect(matched.length).toBe(3)
    expect(matched[0].getTitle()).toBe('one')
    expect(matched[1].getTitle()).toBe('two')
    expect(matched[2].getTitle()).toBe('three')
  })

  test('it can search for a full body', () => {
    const matched = search(ideas, 'the first body')

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for a partial body', () => {
    const matched = search(ideas, 'first')

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for another partial body', () => {
    const matched = search(ideas, 'sec')

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('two')
  })
})
