import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  AddDirectorDto,
  AddMovieDto,
  UpdateDirectorDto,
  UpdateMovieDto,
} from './dto';
import { FilmService } from './film.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Film')
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Post('add-director')
  @ApiConsumes('application/x-www-form-urlencoded')
  addDirector(@Body() dto: AddDirectorDto) {
    return this.filmService.addDirector(dto);
  }

  @Patch('update-director')
  @ApiConsumes('application/x-www-form-urlencoded')
  updateDirector(@Body() dto: UpdateDirectorDto) {
    return this.filmService.updateDirector(dto);
  }

  @Delete('remove-director/:id')
  removeDirector(@Param('id') id: string) {
    return this.filmService.removeDirector(id);
  }

  @Post('add-movie')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  addMovie(
    @Body() dto: AddMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filmService.addMovie(dto, file);
  }

  @Patch('update-movie')
  @ApiConsumes('application/x-www-form-urlencoded')
  updateMovie(@Body() dto: UpdateMovieDto) {
    return this.filmService.updateMovie(dto);
  }

  @Delete('remove-movie')
  removeMovie(
    @Query('name') name: string,
    @Query('title') title: string,
  ) {
    return this.filmService.removeMovie(name, title);
  }
}
