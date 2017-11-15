export function sortByFilterType(filter,order) {
  if(filter === 'votes') {
    return function(a,b) {
      return (order === 'asc' ? a.votes_count - b.votes_count : b.votes_count - a.votes_count);
    }
  } else {

    return function(a,b) {
      var valA = null;
      var valB = null;
      if(filter === 'username') {
        valA = a.user.name.toUpperCase(); 
        valB = b.user.name.toUpperCase();
      } else if(filter === 'product') {
        valA = a.name.toUpperCase(); 
        valB = b.name.toUpperCase(); 
      } else if(filter === 'date') {
        valA = Date.parse(a.created_at);
        valB = Date.parse(a.created_at);
      }
      if (valA < valB) {
        return (order === 'asc'? -1 : 1);
      }
      if (valA > valB) {
        return (order === 'asc'? 1 : -1);
      }
      //must be equal
      return 0;
    }
  }
}