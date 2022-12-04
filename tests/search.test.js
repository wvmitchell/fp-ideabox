import { ideaGenerator } from '../src/js/ideas'
import { searchByTerm, searchByTerms } from '../src/js/search'

describe('searchByTerm', () => {
  let ideas = [
    ideaGenerator({title: 'one', body: 'the first body'}),
    ideaGenerator({title: 'two', body: 'the second body'}),
    ideaGenerator({title: 'three', body: 'the third body'}),
  ]

  test('it can search for a full title', () => {
    const matched = searchByTerm('one')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for a partial match title', () => {
    const matched = searchByTerm('tw')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('two')
  })

  test('it can search for another partial match title', () => {
    const matched = searchByTerm('hre')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('three')
  })

  test('it can search title case insensitive', () => {
    const matched = searchByTerm('hRe')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('three')
  })

  test('it returns all items when the search is blank', () => {
    const matched = searchByTerm('')(ideas)

    expect(matched.length).toBe(3)
    expect(matched[0].getTitle()).toBe('one')
    expect(matched[1].getTitle()).toBe('two')
    expect(matched[2].getTitle()).toBe('three')
  })

  test('it returns all items when the search is undefined', () => {
    const matched = searchByTerm()(ideas)

    expect(matched.length).toBe(3)
  })

  test('it can search for a full body', () => {
    const matched = searchByTerm('the first body')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for a partial body', () => {
    const matched = searchByTerm('first')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('one')
  })

  test('it can search for another partial body', () => {
    const matched = searchByTerm('sec')(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('two')
  })
})

describe('searchByTerms', () => {
  let ideas = [
    ideaGenerator({title: 'one', body: 'the first body'}),
    ideaGenerator({title: 'two', body: 'the second body'}),
    ideaGenerator({title: 'three', body: 'the third body'}),
    ideaGenerator({title: 'two', body: 'mystery'}),
  ]

  test('it can search by a single term', () => {
    const matched = searchByTerms(['three'])(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getTitle()).toBe('three')
  })

  test('it can search for multiple terms', () => {
    const matched = searchByTerms(['two', 'mystery'])(ideas)

    expect(matched.length).toBe(1)
    expect(matched[0].getBody()).toBe('mystery')
  })

  test('it returns all the ideas if no terms are passed', () => {
    const matched = searchByTerms([])(ideas)

    expect(matched.length).toBe(4)
  })

  test('it returns all the ideas if terms are undefined', () => {
    const matched = searchByTerms()(ideas)

    expect(matched.length).toBe(4)
  })
})
