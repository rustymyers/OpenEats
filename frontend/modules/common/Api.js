import { request } from './CustomSuperagent';
import { serverURLs } from './config'

class ApiClass {
  getRecipes(callback, filter) {
    const map = {
      'cuisine': 'cuisine__slug',
      'course': 'course__slug'
    };

    let parsed_filter = {};
    for (let f in filter) {
      if (filter[f] !== null) {
        parsed_filter[f in map ? map[f] : f] = filter[f];
      }
    }

    request
      .get(serverURLs.browse)
      .query(parsed_filter)
      .end(callback);
  }

  getCourses(callback, filter) {
    let parsed_filter = {};
    for (let f in filter) {
      if (!['limit', 'offset'].includes(f)) {
        parsed_filter[f] = filter[f];
      }
    }

    request
      .get(serverURLs.course)
      .query(parsed_filter)
      .end(callback);
  }

  getCuisines(callback, filter) {
    let parsed_filter = {};
    for (let f in filter) {
      if (!['limit', 'offset'].includes(f)) {
        parsed_filter[f] = filter[f];
      }
    }

    request
      .get(serverURLs.cuisine)
      .query(parsed_filter)
      .end(callback);
  }

  getRatings(callback, filter) {
    let parsed_filter = {};
    for (let f in filter) {
      if (!['limit', 'offset'].includes(f)) {
        parsed_filter[f] = filter[f];
      }
    }

    request
      .get(serverURLs.ratings)
      .query(parsed_filter)
      .end(callback);
  }
}

module.exports = new ApiClass();