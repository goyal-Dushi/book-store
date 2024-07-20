const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const getAccessAndRefreshTokens = async (model) => {
  const accessToken = await model.generateAccessToken();
  const refreshToken = await model.generateRefreshToken();

  return { accessToken, refreshToken };
};

const getAll_users = (req, res) => {
  User.find((err, data) => {
    if (err) {
      return res.status(400).json({ msg: 'Not able to get all users' });
    }

    return res.status(200).json({ data });
  });
};

const user_register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    if ([username, password, role].some((val) => !val.trim())) {
      return next(
        ApiError({
          statusCode: 400,
          message: 'All fields are required!',
        })
      );
    }

    const user = await User.findOne({ username });
    if (user) {
      return next(
        ApiError({
          statusCode: 409,
          message:
            'Looks like user already Registered with same username! Try registering with another username!',
        })
      );
    }

    const newUser = new User({
      ...req.body,
    });

    const { accessToken, refreshToken } =
      await getAccessAndRefreshTokens(newUser);
    newUser.refreshToken = refreshToken;

    const savedUser = await newUser.save();
    const resData = { ...savedUser._doc };

    delete resData.password;
    delete resData.refreshToken;

    res.cookie('token', accessToken, {
      maxAge: 60 * 60 * 100 * 24,
    });
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message:
          'Successfully Registered ' +
          savedUser.name +
          '. Please Log in to Continue!',
        data: resData,
      })
    );
  } catch (err) {
    console.error('Error during Registering user: ', err);
    next(
      new ApiError({
        statusCode: err.statusCode || 400,
        errors: err.errors || err,
        message: err.message,
      })
    );
  }
};

const user_login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPwdCorrect = await user.isPasswordCorrect(password);

    if (!isPwdCorrect) {
      return next(
        new ApiError({
          statusCode: 401,
          message: 'Either Username or Password incorrect!',
        })
      );
    }

    const { accessToken, refreshToken } = await getAccessAndRefreshTokens(user);

    user.refreshToken = refreshToken;
    user.save();

    const data = {
      ...user._doc,
    };
    delete data.refreshToken;
    delete data.password;

    res.cookie('token', accessToken);
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: 'User Login Successfully done!',
        data,
      })
    );
  } catch (err) {
    next(
      new ApiError({
        statusCode: 401,
        message: 'Error during Login Process! Try again later.',
      })
    );
  }
};

const user_logout = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const { username } = jwt.decode(token);

    await User.updateOne({ username }, { $unset: { refreshToken: 1 } });

    res.clearCookie('token');
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: 'User Logged out successfully!',
        type: 'success',
      })
    );
  } catch (err) {
    next(
      new ApiError({
        stack: err.stack,
        statusCode: 400,
        errors: err,
        message: err.message,
      })
    );
  }
};

const get_user_profile = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return next(
        new ApiError({
          statusCode: 400,
          message: 'Something not right, not able to find user data!',
        })
      );
    }

    const data = {
      ...user._doc,
    };

    delete data.password;
    delete data.refreshToken;


    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: 'User data successfully found!',
        data,
      })
    );
  } catch (err) {
    next(
      new ApiError({
        statusCode: 400,
        message: err.message,
        errors: err,
      })
    );
  }
};

const get_user_inventory = async(req, res, next) => {
  try{
    const userId = req.params.id;
    if(!userId){
      return next(new ApiError({
        statusCode: 400,
        message: 'Not able to fetch user details due to insufficient data'
      }));
    }

    const user = await User.findOne({ _id: userId });
    if(!user){
      return next(new ApiError({
        statusCode: 400,
        message: 'User not Found!'
      }));
    }

    switch(user.role){
      case 'user':
        user.populate({ path: 'boughtList.book', model: 'Book' }).populate({ path: 'boughtList.seller', model: 'User' }).exec();
        return res.status(200).json(new ApiResponse({
          data: {
            boughtList: user.boughtList,
          },
          message: `Fetched inventory data for ${user.username}`,
        }));
      case 'vendor':
        user.populate({ path: 'soldList.book', model: 'Book' }).populate({ path: 'bookList.book', model: 'Book' }).populate({ path: 'soldList.buyer', model: 'User' }).exec();
        return res.status(200).json(new ApiResponse({
          data: {
            soldList: user.soldList,
            bookList: user.bookList,
          },
          message: `Fetched inventory data for ${user.username}`,
        }));
    }

    next(new ApiError({
      statusCode: 500,
      message: 'Admin roles not handled as of now!',
    }))
  }catch(err){
    next(new ApiError({
      statusCode:400,
      message: err.message,
      stack: err.stack,
      errors: err,
    }));
  }
}

module.exports = {
  getAll_users,
  user_register,
  user_login,
  user_logout,
  get_user_profile,
  get_user_inventory,
};
