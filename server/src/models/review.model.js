import { MySql } from "../config/mysql";

export class ReviewModel {
  constructor() {}

  static async findbyUserID(id) {
    const db = await MySql();

    try {
      const review = await db.query("SELECT * FROM review WHERE userID = ?", [
        id,
      ]);

      return review;
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }

  static async findbyProductID(id) {
    const db = await MySql();

    try {
      const review = await db.query(
        "SELECT * FROM review WHERE productID = ?",
        [id]
      );

      return review;
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }

  static async create(data) {
    const db = await MySql();

    try {
      const { userID, productID, content, createAt, star } = data;

      const review = await db.query(
        "INSERT INTO review(userID,productID, content, createAt, star) VALUES (?,?,?,?,?)",
        [userID, productID, content, createAt, star]
      );

      if (review.affectedRows === 1) {
        return {
          status: "success",
          message: "Created Successfully",
          response: review,
        };
      } else {
        return {
          status: "error",
          message: "Created Failed",
          response: null,
        };
      }
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }

  static async update(id, data) {
    const db = await MySql();

    try {
      const review = await db.query("UPDATE review SET ? WHERE id = ?", [
        data,
        id,
      ]);

      if (review.affectedRows === 1) {
        return {
          status: "success",
          message: "Updated Successfully",
        };
      } else {
        return {
          status: "error",
          message: "Updated Failed",
        };
      }
    } catch (error) {
      throw error;
    } finally {
      db.end();
    }
  }
}
