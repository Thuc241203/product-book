import Reviews from "../models/reviews";
import { reviewSchema } from "../schemas/reviews";

export const list = async (req, res) => {
  try {
    const reviews = await Reviews.getListReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const show = async (req, res) => {
  try {
    const review = await Reviews.getReview(req.params.id);
    if (!review) {
      res.status(404).json({ error: "không tìm thấy review" });
    } else {
      res.json(review);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { user_id, rating, comment, created_at, services_id } = req.body;
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const reviewId = await Reviews.createReview(user_id, rating, comment, created_at, services_id);
    res.json({ id: reviewId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await Reviews.deleteReviews(req.params.id);
    res.json({ message: "xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const blockReview = async (req, res) => {
  try {
    const { id, is_delete } = req.body;
    await Reviews.updateBlockReview(id, is_delete);
    res.json({ message: "Khóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};