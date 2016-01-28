function nameIsNotEmpty (input) {
  return !input.trim() ? 'Name cannot be empty' : '';
}
function streetIsNotEmpty (input) {
  return !input.trim() ? 'Street name cannot be empty' : '';
}
function cityIsNotEmpty (input) {
  return !input.trim() ? 'City cannot be empty' : '';
}
function stateIsNotEmpty (input) {
  return !input.trim() ? 'State cannot be empty' : '';
}
function zipIsNotEmpty (input) {
  return !input.trim() ? 'Zip code cannot be empty' : '';
}
function neighborhoodIsNotEmpty (input) {
  return !input.trim() ? 'Neighborhood cannot be empty' : '';
}
function cuisineIsNotEmpty (input) {
  return !input.trim() ? 'Cuisine cannot be empty' : '';
}
// function ratingIsNotEmpty (input) {
//   return !input.trim() ? 'Rating cannot be empty' : '';
// }
function imageIsNotEmpty (input) {
  return !input.trim() ? 'Image URL cannot be empty' : '';
}
// function descriptionIsNotEmpty (input) {
//   return !input.trim() ? 'Description cannot be empty' : '';
// }

module.exports =  function (input) {
  var errors = [];
  errors.push(nameIsNotEmpty(input.name));
  errors.push(streetIsNotEmpty(input.street1));
  errors.push(cityIsNotEmpty(input.city));
  errors.push(stateIsNotEmpty(input.state));
  errors.push(zipIsNotEmpty(input.zip));
  // errors.push(ratingIsNotEmpty(input.rating));
  errors.push(cuisineIsNotEmpty(input.cuisine));
  errors.push(imageIsNotEmpty(input.image));
  // errors.push(descriptionIsNotEmpty(input.bio));
  return errors.filter(function (error) {
    return error !== true;
  })
}
