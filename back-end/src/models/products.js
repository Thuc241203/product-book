import connection from "../db";

export default class Products {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT products.id, products.name,products.description,products.price, products.img ,category.name AS nameCategory FROM products JOIN category ON products.category_id = category.id ",
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static getProductById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static addProducts(name, description, price, img, category_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO products (name, description, price, img, category_id) VALUES (?, ?, ?, ?, ?)",
        [name, description, price, img, category_id],
        (err, results) => {
          if (err) {
            console.error("Error inserting :", err);
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }
  static updateProduct(id, name, description, price, img, category_id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products SET name = ?,description = ?,price = ?,img = ?,category_id = ? WHERE id = ?",
        [name, description, price, img, category_id, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteProducts(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM products WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
