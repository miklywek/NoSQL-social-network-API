const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: "UserName is required",
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
    // thoughts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Thought",
    //   },
    // ],
  //   friends: [
  //     // {
  //     //   type: Schema.Types,
  //     // },
  //   ],
});
const User = model("User", UserSchema);

module.exports = User;
