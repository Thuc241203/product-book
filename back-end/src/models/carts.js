import connection from "../db";
const now = new Date();
export default class Carts {
  static getAllCarts(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT carts.id, carts.quantity, users.name AS userCart, products.name AS productCart, products.price AS priceCart, products.img AS imgCart, (SELECT name FROM category WHERE category.id = products.category_id) AS cateProductCart FROM carts JOIN users ON carts.user_id = users.id JOIN products ON carts.products_id = products.id WHERE carts.user_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
  static deleteAllCarts(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM carts WHERE user_id = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
  static deleteCartsById(userId, cartId) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM carts WHERE user_id = ? AND id = ?",
        [userId, cartId],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  static createCarts(user_id, product_id, quantity) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM carts WHERE user_id = ? AND products_id = ?",
        [user_id, product_id],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          if (results.length > 0) {
            const Quantity = results[0].quantity;
            const newQuantity = Quantity + quantity;

            connection.query(
              "UPDATE carts SET quantity = ?, updated_at = ? WHERE user_id = ? AND products_id = ?",
              [newQuantity, now, user_id, product_id],
              (updateErr, updateResults) => {
                if (updateErr) {
                  reject(updateErr);
                } else {
                  resolve(updateResults);
                }
              }
            );
          } else {
            connection.query(
              "INSERT INTO carts (user_id, products_id, quantity, created_at, updated_at) VALUES (?,?,?,?,?)",
              [user_id, product_id, quantity, now, now],
              (insertErr, insertResults) => {
                if (insertErr) {
                  reject(insertErr);
                } else {
                  resolve(insertResults);
                }
              }
            );
          }
        }
      );
    });
  }

  static updateCarts(id, quantity) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE carts SET quantity = ?, updated_at = ?  WHERE id = ?",
        [quantity, now, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static addQuantityToCarts(id, quantity) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE carts SET quantity = quantity + ?, updated_at = ?  WHERE id = ?",
        [quantity, now, id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  static decreaseQuantityToCarts(id, quantity) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE carts SET quantity = GREATEST(quantity - ?, 1), updated_at = ? WHERE id = ?",
        [quantity, now, id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
}
