import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { UpdateBookmarkInput } from './dto/input/update-bookmark-input.dto';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { GqlAuthGuard } from './../auth/gaurds/gql-auth.guard';
import { Bookmark } from './models/bookmark.model';
import { BookmarksService } from './bookmarks.service';
import { CurrentUser } from 'src/auth/current-userdecorator';
import { User } from 'src/users/models/user.model';
import { GetBookmarkArgs } from './dto/args/get-bookmark-args.dto';

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  async updateBookmark(
    @Args('updateBookmarkData') updateBookmarkData: UpdateBookmarkInput,
    @CurrentUser() user: User
  ) {
    return this.bookmarksService.updateBookmark(updateBookmarkData, user._id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bookmark], {name: 'bookmarks'})
  async getBookmarks(
    @CurrentUser() user: User
  ) {
    return this.bookmarksService.getBookmarks(user._id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bookmark, {name: 'bookmark'})
  async getBookmark(
    @Args() getBookmarkArgs: GetBookmarkArgs,
    @CurrentUser() user: User
  ) {
    return this.bookmarksService.getBookmark(getBookmarkArgs, user._id)
  }

}
