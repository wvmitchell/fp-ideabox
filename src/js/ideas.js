import { v4 as uuidv4 } from 'uuid'

const ideaGenerator = (ideaDetails={}) => {
  let id = uuidv4()
  let starred = false;

  return { 
    getId: () => id,
    getTitle: () => ideaDetails.title,
    getBody: () => ideaDetails.body,
    getStarred: () => starred,
    toggleStarred: () => starred = !starred,
  }
}

module.exports = {
  ideaGenerator,
}
