import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello",
    success: 1,
  });
});

export default router;
