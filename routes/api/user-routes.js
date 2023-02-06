const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToFriendList,
  removeFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUser).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addToFriendList)
  .delete(removeFriend);

module.exports = router;
