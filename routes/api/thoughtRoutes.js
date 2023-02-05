const router = require("express").Router();
const {
  addThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughts-controller");
// /api/thoughts/:id
router.route("/:id").post(addThought).delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:id/").delete(removeThought);
module.exports = router;
