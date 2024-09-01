// module.exports.paginateUsers = (req, res, next) => {
//   const { page = 1, results = 20 } = req.query;

//   req.pagination = {
//     limit: Number(results),
//     offset: (page - 1) * results,
//   };
//   next();
// };
const chalk = require('chalk');

module.exports.paginateUsers = (req, res, next) => {
  let { page = 1, results = 10 } = req.query;

  // Convert to numbers
  page = Number(page);
  results = Number(results);

  if (results === 0) {
    req.pagination = {}; // No limit or offset, fetch all items
  } else {
    req.pagination = {
      limit: results,
      offset: (page - 1) * results,
    };
  }

  next();
};
