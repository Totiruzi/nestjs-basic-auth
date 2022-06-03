import { Model } from 'mongoose';
import { Bookmark } from './models/bookmark.model';
import { Injectable, Logger } from "@nestjs/common";
import { BookmarkDocument } from './models/bookmark.schema';
import { AbstractRepository } from 'src/database/abstract.repository';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BookmarksRepository extends AbstractRepository<BookmarkDocument> {
  protected logger = new Logger(BookmarksRepository.name)

  constructor(@InjectModel(Bookmark.name) bookmarkModel: Model<BookmarkDocument>) {
    super(bookmarkModel);
  }
}