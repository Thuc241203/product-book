import connection from "../db";
export default class StatusOrder {
    static getAllStatusOrder() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM status_order", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getStatusOrderById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM status_order WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
    static createStatusOrder(name) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO status_order (name) VALUES (?)",
                [name],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateStatusOrder(id, name) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE status_order SET name = ? WHERE id = ?",
                [name, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteStatusOrder(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM status_order WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
