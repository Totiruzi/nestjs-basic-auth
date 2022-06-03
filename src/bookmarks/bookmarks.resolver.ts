import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { GqlAuthGuard } from './../auth/gaurds/gql-auth.guard';
import { Bookmark } from './models/bookmark.model';
import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { BookmarksService } from './bookmarks.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-userdecorator';
import { User } from 'src/users/models/user.model';

@Resolver(() => Bookmark)
export class BookmarksResolver {

  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  async createBookmark(
    @Args('createBookmarkData') createBookmarkData: CreateBookmarkInput,
    @CurrentUser() user: User
  ) {
    return this.bookmarksService.createBookmark(createBookmarkData, user._id)
  }

}
