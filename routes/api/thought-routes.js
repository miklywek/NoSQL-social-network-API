const router = require("express").Router();
const {
  getAllThoughts,
  getAllThoughtById,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughts-controller");
// /api/thoughts
router.route("/").get(getAllThoughts);

// /api/thoughts/:id
router
  .route("/:id")
  .post(createThought)
  .get(getAllThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/:thoughtId/reactions

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);
module.exports = router;
