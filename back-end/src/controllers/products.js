import Products from "../models/products";
import { productsSchema } from "../schemas/products";

export const list = async (req, res) => {
  try {
    const product = await Products.getAllProducts();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const show = async (req, res) => {
  try {
    const product = await Products.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product không tồn tại" });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, description, price, img, category_id } = req.body;
    const { error } = productsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const productId = await Products.addProducts(
      name,
      description,
      price,
      img,
      category_id
    );
    res.json({ id: productId, message: "thêm product thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, description, price, img, category_id } = req.body;
    const { error } = productsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Products.updateProduct(
      req.params.id,
      name,
      description,
      price,
      img,
      category_id
    );
    res.json({ message: "Update product thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await Products.deleteProducts(req.params.id);
    res.json({ message: "Xóa product thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
