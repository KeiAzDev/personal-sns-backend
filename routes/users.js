const router = require("express").Router();
const User = require("../models/User");

router.put("/:id", async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("ユーザー情報が更新されました");
    } catch(err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("アカウントにアクセス出来ませんでした")
  }
});

// router.get("/", (req, res) => {
//   res.send("user Router");
// });

module.exports = router;