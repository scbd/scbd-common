//function for UI releted ID assignment, due to one in 10^15 probability of duplication
export function makeUid(){
    const key = Math.random().toString(36).substr(2)
    return 'uid-' + key
  }