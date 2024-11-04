import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get('/')
  async hello(): Promise<string> {
    return 'Hello, app is up now';
  }
}