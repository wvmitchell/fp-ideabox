const ideaGenerator = (ideaDetails={}) => {
  let id = Date.now();
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
