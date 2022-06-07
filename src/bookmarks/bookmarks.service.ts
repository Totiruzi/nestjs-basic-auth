import { BookmarkDocument } from './models/bookmark.schema';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { BookmarksRepository } from './bookmarks.repository';
import { GetBookmarkArgs } from './dto/args/get-bookmark-args.dto';
import { UpdateBookmarkInput } from './dto/input/update-bookmark-input.dto';;

@Injectable()
export class BookmarksService {

  constructor(private readonly bookmarksRepository: BookmarksRepository) {}

  async createBookmark(createBookmarkData: CreateBookmarkInput, userId: string) {
    const bookmarkDocument = await this.bookmarksRepository.create({
      ...createBookmarkData,
      links: [],
      userId
    })
    return this.toModel(bookmarkDocument)
  }

  async getBookmarks(userId: string) {
    const bookmarkDocuments = await this.bookmarksRepository.find({userId});
    return bookmarkDocuments.map(bookmark => this.toModel(bookmark))
  }

  async getBookmark(getBookmarkArgs: GetBookmarkArgs, userId: string) {
    const bookmarkDocument = await this.bookmarksRepository.findOne({
      ...getBookmarkArgs,
      userId
    })
    return this.toModel(bookmarkDocument)
  }

  async updateBookmark(updateBookmarkData: UpdateBookmarkInput, userId: string) {
    const bookmarkDocument = await this.bookmarksRepository.findOneAndUpdate(
      {_id: updateBookmarkData._id, userId},
      updateBookmarkData
    )

    return this.toModel(bookmarkDocument)
  }
  
  private toModel(bookmarkDocument: BookmarkDocument) {
    return {
      _id: bookmarkDocument._id.toHexString(),
      ...bookmarkDocument,
    }
  }

}
