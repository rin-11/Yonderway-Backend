const express = require('express');
const router = express.Router();
const { getWishlist } = require('../controllers/wishlistCtrl');

// ROUTES
router.route('/').post(getWishlist);





// CREATE wishlist when user registers
// router.post("/", (req, res, next) => {
//     Wishlist.create(req.body, (error, data) => {
//       if (error) {
//         return next(error);
//       } else {
//         console.log(data);
//         res.json(data);
//       }
//     });
//   });

  // READ/display wishlist page
  // router.get("/:id", (req, res) => {
  //   Wishlist.find((error, data) => {
  //     if (error) {
  //       return next(error);
  //     } else {
  //       console.log(data);
  //       res.json(data);
  //     }
  //   });
  // });

  // UPDATE wishlist when api data added
  // router.route("/:id").put((req, res, next) => {
  //   Wishlist.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $set: req.body,
  //     },
  //     (error, data) => {
  //       if (error) {
  //         return next(error);
  //         console.log(error);
  //       } else {
  //           console.log(data);
  //           res.json(data);
  //       }
  //     }
  //   );
  // });

  // DELETE wishlist api item from wishlist page
  // router.delete("/:id", (req, res, next) => {
  //   Wishlist.findByIdAndRemove(
  //       req.params.id, (error, data) => {
  //     if (error) {
  //       return next(error);
  //     } else {
  //       res.status(200).json({
  //         msg: data,
  //       });
  //     }
  //   });
  // });

  
module.exports = router;