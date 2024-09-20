// module.exports.paginateUsers = (req, res, next) => {
//   const { page = 1, results = 20 } = req.query;

//   req.pagination = {
//     limit: Number(results),
//     offset: (page - 1) * results,
//   };
//   next();
// };
const chalk = require('chalk');
const { USER_PAGINATION_SCHEMA } = require('../utils/validationSchemas');

// module.exports.paginateUsers = (req, res, next) => {
//   console.log(req.query, 'paginate');
//   let { page = 1, results = 10 } = req.query;

//   // Convert to numbers
//   page = Number(page);
//   results = Number(results);

//   if (results === 0) {
//     req.pagination = {}; // No limit or offset, fetch all items
//   } else {
//     req.pagination = {
//       limit: results,
//       offset: (page - 1) * results,
//     };
//   }

//   next();
// };

// module.exports.paginateUsers = (req, res, next) => {

//   // Extract limit and offset from the query
//   let { limit = 1, offset = 5 } = req.query;

//   // Convert to numbers
//   limit = Number(limit);
//   offset = Number(offset);

//   if (limit === 0) {
//     req.pagination = {}; // No limit or offset, fetch all items
//   } else {
//     req.pagination = {
//       limit,
//       offset,
//     };
//   }

//   next();
// };
const queryParser = require('query-parser-express');

module.exports.paginateUsers = async (req, res, next) => {
  //console.log(chalk.yellow(JSON.stringify(req.query)));
  let { limit = 5, offset = 0 } = req.query;
  console.log(chalk.yellow(limit, offset));
  // Convert to numbers
  // limit = Number(limit);
  // offset = Number(offset);

  const isLimitValid = await USER_PAGINATION_SCHEMA.isValid({ limit });
  const isOffsetValid = await USER_PAGINATION_SCHEMA.isValid({ offset });

  if (!isLimitValid) {
    limit = 5;
  }

  if (!isOffsetValid) {
    offset = 0;
  }

  req.pagination = {
    limit,
    offset,
  };

  next();
};
