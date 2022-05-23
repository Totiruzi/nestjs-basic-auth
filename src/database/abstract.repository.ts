import { Logger, NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, Types } from "mongoose";
import { AbstractDocument } from "./abstract.schema";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected readonly abstract logger: Logger;

  constructor (protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    })
    return (await createDocument.save()).toJSON() as unknown as TDocument
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document =  this.model.findOne(filterQuery, {}, { lean: true })

    if(!document) {
      this.logger.warn('Document not found with filterquery', filterQuery)
      throw new NotFoundException('Document not found!')
    }
    return document
  }
}