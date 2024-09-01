const _ = require('lodash');
const createHttpError = require('http-errors');
const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const createdUser = await User.create(body);
    if (!createdUser) {
      return next(createError(400, 'Something went wrong'));
    }
    const preparedUser = _.omit(createdUser.get(), [
      'password',
      'createdAt',
      'updatedAt',
    ]);
    res.status(201).send(preparedUser);
  } catch (err) {
    next(err);
  }
};
// --------------------------------------------------------------------------------------------------------
module.exports.getUsers = async (req, res, next) => {
  const { limit, offset } = req.pagination;
  try {
    // const foundUsers1 = await User.findByPk(37, {
    //   attributes: {
    //     include: ['role'],
    //   },
    // });
    // console.log(foundUsers1);
    const foundUsers = await User.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      limit,
      offset,
      order: ['id'],
    }); // excluded data from response
    res.status(200).send({ data: foundUsers });
  } catch (error) {
    next(error);
  }
};
// --------------------------------------------------------------------------------------------------------
module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
    });

    if (!foundUser) {
      //return res.status(404).send([{ status: 404, message: 'User not found ):' }]);
      return next(createError(404, 'User not found'));
    }

    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};
// --------------------------------------------------------------------------------------
module.exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    //body.passwHash = hashSync(body.passwHash, HASH_SALT);

    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      //return res.status(404).send([{ status: 404, title: 'User Not Found' }]);
      return next(createError(404, 'User not found'));
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};
// -------------------------------------------------------------------------------------
module.exports.updateOrCreateUser = async (req, res, next) => {
  // check if exist
  // if exist - update data
  // else , create user
  const {
    body,
    params: { id },
  } = req;
  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });
    if (!updatedUsersCount) {
      // if not found - create a new one
      body.id = id;
      return next();
    }
    const preparedUser = _.omit(updatedUser, [
      'password',
      'createdAt',
      'updatedAt',
    ]);
    res.status(200).send({ data: preparedUser });
  } catch (error) {
    next(error);
  }
};
/// -------------------------------------------------------------------------------------
module.exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUserCount = await User.destroy({ where: { id } });
    if (deletedUserCount === 0) {
      //return res.status(404).send([{ status: 404, title: 'User Not Found' }]);
      return next(createError(404, 'User Not Found'));
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
