import { BookmarkDocument } from './models/bookmark.schema';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { BookmarksRepository } from './bookmarks.repository';

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

  private toModel(bookmarkDocument: BookmarkDocument) {
    return {
      _id: bookmarkDocument._id.toHexString(),
      ...bookmarkDocument,
    }
  }
}
