import connection from "./../db";

export default class Category {
  static getAllCategory() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM category", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  static getCategoryById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM category WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static getAllProductsCate(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT c.name, p.id, p.name, p.description, p.price , p.imageFROM category c JOIN products p ON c.id = p.category_id WHERE c.id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  static createCategory(name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO category (name) VALUES (?)",
        [name],
        (err, results) => {
          if (err) reject(err);
          resolve(results.insertId);
        }
      );
    });
  }
  static updateCategory(id, name) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE category SET name = ? WHERE id = ?",
        [name, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }
  static deleteCategory(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM category WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }
}
