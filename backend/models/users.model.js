const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      minLength: [3, 'Username too short!'],
      maxLength: [30, 'Username too long!'],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [4, 'Password length too short!'],
      maxLength: [21, 'Password length too long!'],
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      validate: {
        validator: function (v) {
          if (this.role === 'vendor') {
            const stringVal = v.toString();
            return stringVal.length === 9;
          }
        },
      },
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
    soldList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    boughtList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
