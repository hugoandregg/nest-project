import { Request, Response, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Request() req, @Response() res) {
    // Authenticate user (e.g., check credentials, query the database, etc.)
    const { username, password } = req.body;

    // Check if the credentials are valid
    if (username === 'admin' && password === 'password') {
      // Set user session
      req.session.user = { username };

      // Return success response
      res.status(200).json(req.session);
    } else {
      // Return error response
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
