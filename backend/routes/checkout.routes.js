const express = require("express");
const router = express.Router();
const User = require("../models/users.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

router.route("/buy").put(async (req, res, next) => {
  try{
    // get the book data, user id, seller id, no of stock bought
  const { booksdata, userId } = req.body;
  // check if all 3 are present, else return err
  if(!booksdata?.length || !userId){  
    return next(new ApiError({
      statusCode: 400,
      message: "Insufficient data, cannot process checkout!"
    }));
  }
  // get data of both book and user from modals
  const user = await User.findOne({ _id: userId });

  await Promise.all(booksdata.map(async (book) => {
      const seller = await User.findOne({ _id: book.seller.toString() });

      if (!seller) {
        next(ApiError({
          statusCode: 500,
          message: `Seller not found for book ${book.name}`,
        }));
      }

      // Update user boughtList and seller soldList with book id and date
      user.boughtList.push({ book: book._id, boughtOn: new Date(), seller: seller._id });
      seller.soldList.push({ book: book._id, soldOn: new Date(), buyer: userId });

      await seller.save();
  }));

    // Save user data after all books are processed
    await user.save();

    res.status(200).json(new ApiResponse({
      message: 'Checkout Done successfully!'
    }));
  }catch(err){
    next(new ApiError({
      statusCode: 400,
      errors: err,
      message: err?.message || 'Not able to checkout. Try again later!'
    }));
  }
});

module.exports = router;
