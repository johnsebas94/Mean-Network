const Post = require("../models/post");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const savePost = async (req, res) => {
  if (!req.body.text) return res.status(400).send("Incomplete Data");

  let imageUrl = "";
  if (req.files.image) {
    if (req.files.image.type != null) {
      const url = req.protocol + "://" + req.get("host") + "/";
      const serverImg =
        "./uploads/" + moment().unix() + path.extname(req.files.image.path);
      fs.createReadStream(req.files.image.path).pipe(
        fs.createWriteStream(serverImg)
      );
      imageUrl =
        url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
    }
  }

  const post = new Post({
    userId: req.user._id,
    text: req.body.text,
    hashtag: req.body.hashtag,
    postStatus: "public",
    imageUrl: imageUrl,
  });

  const result = await post.save();
  if (!result) return res.status(400).send("Error posting status");
  return res.status(200).send({ result });
};

const listPost = async (req, res) => {
  let post = await Post.find({ userId: req.user._id });
  if (!post || post.length === 0)
    return res.status(400).send("You do not have posting yet");
  return res.status(200).send({ post });
};

const updatePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.postStatus)
    return res.status(400).send("Incomplete data");

  let post = await Post.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    postStatus: req.body.postStatus,
  });

  if (!post) return res.status(400).send("Post not found");
  return res.status(200).send({ post });
};

const deletePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid Id");

  let postImg = await Post.findById(req.params._id);
  postImg = postImg.imageUrl;
  postImg = postImg.split("/")[4];
  let serverImg = "./uploads/" + postImg;

  const post = await Post.findByIdAndDelete(req.params._id);
  if (!post) return res.status(400).send("Post not found");
  try {
    fs.unlinkSync(serverImg);
  } catch (error) {
    console.log("Image no found in server");
  }
  return res.status(200).send({ message: "Post deleted" });
};

module.exports = { savePost, listPost, deletePost, updatePost };
