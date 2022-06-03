import { BookmarkSchema } from './models/bookmark.schema';
import { Bookmark } from './models/bookmark.model';
import { BookmarksRepository } from './bookmarks.repository';
import { Module } from '@nestjs/common';
import { BookmarksResolver } from './bookmarks.resolver';
import { BookmarksService } from './bookmarks.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Bookmark.name,
      schema: BookmarkSchema
    },
  ]),
  ],
  providers: [
    BookmarksResolver, 
    BookmarksService, 
    BookmarksRepository
  ]
})
export class BookmarksModule {}
