import { MySql } from "../config/mysql";

export class ProductModel {
  constructor() {}

  static async findAll() {
    const db = await MySql();

    try {
      const [products, details] = await Promise.all([
        db.query("SELECT * FROM products"),
        db.query("SELECT * FROM details"),
      ]);

      const result = products.map((prod) => {
        return {
          ...prod,
          details: details.find((del) => del.ProductID === prod.id),
        };
      });

      return result;
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }

  static async findID(id) {
    const db = await MySql();

    try {
      const [products, details] = await Promise.all([
        db.query("SELECT * FROM products WHERE id  = ?", [id]),
        db.query("SELECT * FROM details WHERE ProductID = ?", [id]),
      ]);

      if (!products[0]) {
        return {
          status: "Not Found",
          code: 404,
          data: null,
        };
      }

      const result = {
        ...products[0],
        details: details[0],
      };

      return result;
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }

  static async update(id, data) {
    const db = await MySql();

    try {
      const result = await db.query(
        "UPDATE products JOIN details ON products.id = details.ProductID SET ? WHERE id = ? ",
        [data, id]
      );

      return {
        status: "OK",
        code: 200,
        message: "Updated Successfully",
      };
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }

  static async delete(id) {
    const db = await MySql();

    try {
      await db.query("DELETE FROM details WHERE ProductID = ?", [id]);
      await db.query("DELETE FROM products WHERE id = ?", [id]);

      return {
        status: "OK",
        code: 200,
        message: "Deleted Successfully",
      };
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }

  static async create(data) {
    const db = await MySql();

    try {
      const { name, price, img, CategoryID, auchor, weight, page, size } = data;

      const products = await db.query(
        "INSERT INTO products (name,price,img,CategoryID) VALUES (?,?,?,?)",
        [name, price, img, CategoryID]
      );

      if (products) {
        await db.query(
          "INSERT INTO details (auchor,weight,page,size,ProductID) VALUES (?,?,?,?,?)",
          [auchor, weight, page, size, products.insertId]
        );
      }

      return {
        status: "Created",
        code: 201,
        message: "Created Succefully",
      };
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }
}
