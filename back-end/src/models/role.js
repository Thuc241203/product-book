import connection from "../db";
export default class Role {
    static getAllRole() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM role", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    static getRoleById(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM role WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
    static createRole(name) {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO role (name) VALUES (?)",
                [name],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
    }
    static updateRole(id, name) {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE role SET name = ? WHERE id = ?",
                [name, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }
    static deleteRole(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM role WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}
