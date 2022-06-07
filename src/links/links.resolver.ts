import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Link } from './link.model';
import { GqlAuthGuard } from 'src/auth/gaurds/gql-auth.guard';
import { LinksService } from './links.service';
import { GetLinksArgs } from './dto/args/get-links-args.dto';

@Resolver(() => Link)
export class LinksResolver {

  constructor(private readonly linksService: LinksService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Link], {name: 'links'})
  async getLinks(
    @Args() getLinksArgs: GetLinksArgs,
  ) {
    return this.linksService.getLinks(getLinksArgs)
  }
}
