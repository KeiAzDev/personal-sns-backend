const router = require("express").Router();
const Post = require("../models/Post");

router.post("/", async(req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch(err) {
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      return res.status(200).json("投稿の編集に成功しました");
    } else {
      return res.status(403).json("他の人の投稿は編集できません");
    }
  } catch(err) {
    return res.status(403).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
      if(post.userId === req.body.userId) {
        await post.deleteOne();
        return res.status(200).json("投稿の削除に成功しました");
      } else {
        return res.status(403).json("他人の投稿は削除できません");
      }
  } catch(err) {
    return res.status(500).json(err);
  }
});

module.exports = router;