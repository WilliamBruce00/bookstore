import { ReviewModel } from "../models/review.model";

export class ReviewController {
  constructor() {}

  static async findbyUserID(req, res) {
    const data = await ReviewModel.findbyUserID(req.params.id);
    res.status(200).json(data);
  }

  static async findbyProductID(req, res) {
    const data = await ReviewModel.findbyProductID(req.params.id);
    res.status(200).json(data);
  }

  static async update(req, res) {
    const data = await ReviewModel.update(req.params.id, req.body);
    res.status(200).json(data);
  }

  static async create(req, res) {
    const data = await ReviewModel.create(req.body);
    res.status(200).json(data);
  }
}
