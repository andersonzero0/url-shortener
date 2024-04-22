import { Controller, Get, NotFoundException, Param, Post, Query, Redirect } from "@nestjs/common";
import { AppService } from "./app.service";
import { ShortenerDto } from "./shortener.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async shorten(@Query() query: ShortenerDto) {
    try {
      return await this.appService.createShortener(query);
    } catch (error) {
      throw error;
    }
  }

  @Get(":short")
  @Redirect()
  async redirectToUrl(@Param("short") short: string) {
    try {
      const shortener = await this.appService.getShorneterByShort(short);

      if(!shortener) {
        throw new NotFoundException();
      }

      return { url: shortener.url, statusCode: 302}
    } catch (error) {
      throw error;
    }
  }
}
