const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const boughtListSchema = Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  boughtOn: {
    type: Date,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const soldListSchema = Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  soldOn: {
    type: Date,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      minLength: [3, 'Username too short!'],
      maxLength: [40, 'Username too long!'],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [4, 'Password length too short!'],
      maxLength: [200, 'Password length too long!'],
    },
    address: {
      type: String,
      minLength: [10, 'Address length too short!'],
      maxLength: [70, 'Address too long!'],
    },
    phone_no: {
      type: Number,
      validate: {
        validator: function (v) {
          if (this.role === 'vendor') {
            const stringVal = v.toString();
            return stringVal.length === 9;
          }
        },
      },
    },
    bookList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    soldList: [soldListSchema],
    boughtList: [boughtListSchema],
    role: {
      type: String,
      enum: ['user', 'vendor', 'admin'],
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// pre hooks
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 7);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  const jwtPayload = {
    id: this._id,
    username: this.username,
    role: this.role,
  };

  return jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_PRIVATE_KEY);
};

UserSchema.methods.generateRefreshToken = function () {
  const jwtPayload = {
    username: this.username,
    id: this._id,
  };

  return jwt.sign(jwtPayload, process.env.REFRESH_TOKEN_PRIVATE_KEY);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
