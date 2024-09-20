const mongoose = require('mongoose');
const { validate } = require('./books.model');
const { Schema } = mongoose;

const VendorSchema = new Schema({
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
  address: {
    type: String,
    required: true,
    minLength: [10, 'Address length too short!'],
    maxLength: [70, 'Address too long!'],
  },
  phone_no: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        const stringVal = v.toString();
        return stringVal.length === 9;
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
  refreshToken: {
    type: String,
  },
});

VendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 7);
  next();
});

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;
