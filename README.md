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

I was able to make use of curried functions in a few different places, but what
I'll highlight here is my draw function. By creating a function that takes in a
parent element and an array of children to append, I was able to make a simple
DRY implementation of getting things added to the DOM. In going a step further
and turning this into a curried function, I was able to create one-off functions
tooled to update specific parts of the DOM.

```javascript
const draw = (parentElement) => (...childrenElements) => {
  parentElement.append(...childrenElements)
}

const searchTagsDisplay = document.getElementById('search-tags')
const filterButton = document.getElementById('filter')
const ideaDisplay = document.getElementById('idea-display')

const drawIdeas = draw(ideaDisplay)
const drawFitlerButton = draw(filterButton)
const drawSearchTags = draw(searchTagsDisplay)
```

### Composition

It was challenging to find a reasonable use case for composition in an
application this small, however by adding some additional seach functionality, I
was able to come up with one. What I realized is that the display of ideas is
really just a series of filtering operations. Ideas are filtered based off their
starred status, as well as if they contain the search term in the form. By
adding 'tag' functionality to the app, I also enabled searching for multiple
terms at once. These three functions all take two parameters, so by creating
curried functions, I was able to make use of a pipeline function. The end result
is actually extremely readable, so I'm happy with the way it turned out.

```javascript
const findByFilter = (filterStatus) => (ideas) => {
  if(filterStatus) {
    return ideas.filter(idea => idea.getStarred())
  }
  return ideas
}

const searchByTerm = (searchTerm = '') => (ideas) => {
  return ideas.filter(idea => {
    const title = idea.getTitle().toLowerCase()
    const body = idea.getBody().toLowerCase()
    const searchRegExp = new RegExp(searchTerm.toLowerCase())
    return title.match(searchRegExp) || body.match(searchRegExp) 
  })
}

const searchByTerms = (searchTerms = []) => (ideas) => {
  return ideas.reduce((foundIdeas, idea) => {
    const title = idea.getTitle().toLowerCase()
    const body = idea.getBody().toLowerCase()
    const matchesAllTerms = searchTerms.every(term => {
      const searchRegExp = new RegExp(term.toLowerCase())
      return title.match(searchRegExp) || body.match(searchRegExp)
    })

    if(matchesAllTerms) {
      return [...foundIdeas, idea]
    }
    return foundIdeas
  }, [])
}

const getIdeas = () => {
  return pipe(
    findByFilter(showFiltered),
    searchByTerm(searchTerm),
    searchByTerms(searchTerms),
  )(ideas)
}
```

## Application Architecture Commentary

### Data Model vs DOM

I built this application initially by focusing exclusively on the Data Model,
and only considered later how that model would be visually represented and
manipulated. Thus, there is a very neat separation between my data model and the
DOM. All of the business logic (data model) lives in, or is used by, `app.js`.
The DOM accessing and manipulation all happens in `index.js`, which also makes
use of some drawing utility functions that I created, which live in `draw.js`.

### JavaScript file types

One of the challenges for this project was trying to answer the question, 'where
do things go?' Ultimately, I feel that there's any number of ways that I _could_
organize things, so the real goal was to divide things intentionally. With that
in mind, there are really 3 file types that I have here:

1) The index, which holds onto all my DOM selectors, listeners, and event
handlers. These could potentially be extrated to their own file, but given that
there isn't much else in index, that seemed like overkill.
2) My datastore closures, `app.js` and `ideas.js`. Essential to this divsion was
wanted to have some obvious place where the business logic lived.
3) The rest of the files are essentially utilities; `storage.js` is functions
related to localStorage, `search.js` is functions specifically for searching
through an array of ideas, and `draw.js` has functions related to drawing DOM
elements on the page.

### Testing

One of the big wins that I found in trying to be more functional with my
approach was an ease of testing. Because so many of the functions are simply
input -> output functions with no side effects, writing the tests was
straightforward. The only file that does not have 100% test coverage is
`index.js`, which I would probably use Cypress to test effectively, rather than
Jest, as I have for the rest of the application.
