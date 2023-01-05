# Functional Ideabox

A pedestrian attempt to build out a from scratch ideabox, utilizing functional
principles.

## Running the app

1) Clone the repo: `git clone git@github.com:wvmitchell/fp-ideabox.git`
2) Install the dependencies: `npm i`
3) Start the app: `npm start`

## Running the tests

Follow the same installation steps as above, then:
1) Run the tests: `npm test`
2) Alternatively, run the tests in watch mode: `npm run test:watch`

## Functional Programming Commentary

I tried to use as many functional principles in this project as I could, while
also only doing so in spaces that seemed to make sense. The following section is
part reflection, part code tour.

### Pure Functions

There are many different places around the app that utilize pure functions, but
the space that I was most satisfied with this is in `draw.js`. There are a
number of utility functions here that have the responisbility of taking in raw
data, and outputing html elements. By extracting this logic from the
responsibility of actually updating the page, I was able to make the logic that
adds things to the page pure, and thus very easy to test. Here's one of those
functions:

```javascript
const makeSearchTag = (term) => {
  const tag = document.createElement('div')
  tag.classList.add('search-tag')

  const text = document.createElement('p')
  text.innerHTML = term

  const img = document.createElement('img')
  img.classList.add('remove-tag')
  img.setAttribute('data-use', 'remove tag')
  img.setAttribute('data-tag', term)

  tag.append(text, img)

  return tag
}
```

### Higher Order Functions

In multiple places throughout the app I've made use of closures and curried
functions, which meet the definition of a higher order function. However, my
most common use case was making using of the built in array prototype methods.
In this case, I've passed an anonymous function to `.map`, so that I can get the
data contained in an idea into an object literal, so that I can store the
information in localstorage.

```javascript
const saveToStorage = (ideas) => {
  const ideaData = ideas.map(idea => ({
    title: idea.getTitle(),
    body: idea.getBody(),
    id: idea.getId(),
    starred: idea.getStarred(),
  }))

  localStorage.setItem('ideas', JSON.stringify(ideaData))
}
```

### Closures

I made fairly extensive use of closures in this application, and in fact all of
my business logic is wrapped in a closure. This allowed me to keep my data store
out of the global state, and protect exacty how it was interacted with. In this
case, rather than the closure returning a single function that was closed over,
I returned an object with functions, all of which maintain the scope of the
closure.

```javascript
const startApp = () => {
  let ideas = retrieveFromStorage()
  let showFiltered = false
  let searchTerm = ''
  let searchTerms = []

  ...

  return {
    addIdea,
    deleteIdea,
    getIdeas,
    toggleStarred,
    toggleFiltered,
    getFilterStatus,
    setSearch,
    getSearchTerms,
    addSearchTerm,
    removeSearchTerm,
  }
```

I also represented an idea as a closure. In the same was that I used a closure
for the main application, this allowed me to define exactly how the data of the
idea was modified.

```javascript
const ideaGenerator = (ideaDetails={}) => {
  let id = ideaDetails.id || uuidv4()
  let starred = ideaDetails.starred || false;

  return { 
    getId: () => id,
    getTitle: () => ideaDetails.title,
    getBody: () => ideaDetails.body,
    getStarred: () => starred,
    toggleStarred: () => starred = !starred,
  }
}
```

### Curried Functions


### Composition

## Application Architecture Commentary

### Data Model vs DOM

### JavaScript file types

### Testing
