import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {
    @Get()
    homepage(@Res() res: Response) {
        return res.render('index')
    }
}