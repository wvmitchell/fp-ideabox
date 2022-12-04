import { v4 as uuidv4 } from 'uuid'

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

module.exports = {
  ideaGenerator,
}
