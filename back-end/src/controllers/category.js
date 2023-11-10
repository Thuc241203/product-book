import Category from "../models/category";
import { categorySchema } from "../schemas/category";

export const list = async (req, res) => {
    try {
        const categories = await Category.getAllCategory();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const show = async (req, res) => {
    try {
        const category = await Category.getCategoryById(req.params.id);
        if (!category) {
            res.status(404).json({ error: "Danh mục không tồn tại" });
        } else {
            res.json(category);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const showProductsCate = async (req, res) => {
  try {
      const category = await Category.getAllProductsCate(req.params.id);
      if (!category) {
          res.status(404).json({ error: "Danh mục không tồn tại" });
      } else {
          res.json(category);
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
    try {
        const { name } = req.body;
        const { error } = categorySchema.validate(req.body);
        if (error) {
          const errors = error.details.map((errorItem) => errorItem.message);
          return res.status(400).json({
            message: errors,
          });
        }
        const categoryId = await Category.createCategory(name);
        res.json({ id: categoryId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const update = async (req, res) => {
    try {
        const { name } = req.body;
        const { error } = categorySchema.validate(req.body);
        if (error) {
          const errors = error.details.map((errorItem) => errorItem.message);
          return res.status(400).json({
            message: errors,
          });
        }
        await Category.updateCategory(req.params.id, name);
        res.json({ message: "Update danh mục thành công" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const destroy = async (req, res) => {
    try {
        await Category.deleteCategory(req.params.id);
        res.json({ message: "Xóa danh mục thành công" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
