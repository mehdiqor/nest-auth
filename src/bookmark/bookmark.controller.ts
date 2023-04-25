import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Bookmark')
@ApiBearerAuth('Token-Please')
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  @Get()
  @ApiOkResponse({
    description:
      'The resources were returned successfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  @ApiOkResponse({
    description:
      'The resource was returned successfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(
      userId,
      bookmarkId,
    );
  }

  @Patch(':id')
  @ApiOkResponse({
    description:
      'The resource was updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Bad Request',
  })
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOkResponse({
    description:
      'The resource was returned successfully',
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
