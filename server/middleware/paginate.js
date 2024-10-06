const chalk = require('chalk');
const { USER_PAGINATION_SCHEMA } = require('../utils/validationSchemas');
const queryParser = require('query-parser-express');

const DEFAULT_LIMIT = 5;
const DEFAULT_OFFSET = 0;

module.exports.paginateUsers = async (req, res, next) => {
  //let { limit = 5, offset = 0 } = req.query;
  let { limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET } = req.query;

  console.log(chalk.yellow(limit, offset));
  // Convert to numbers
  // limit = Number(limit);
  // offset = Number(offset);

  // const isLimitValid = await USER_PAGINATION_SCHEMA.isValid({ limit });
  // const isOffsetValid = await USER_PAGINATION_SCHEMA.isValid({ offset });

  // if (!isLimitValid) {
  //   limit = 5;
  // }

  // if (!isOffsetValid) {
  //   offset = 0;
  // }

  limit = (await USER_PAGINATION_SCHEMA.isValid({ limit }))
    ? limit
    : DEFAULT_LIMIT;
  offset = (await USER_PAGINATION_SCHEMA.isValid({ offset }))
    ? offset
    : DEFAULT_OFFSET;

  req.pagination = {
    limit,
    offset,
  };

  next();
};
