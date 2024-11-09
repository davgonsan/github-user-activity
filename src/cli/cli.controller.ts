import { Controller, Logger } from '@nestjs/common';
import { GithubService } from 'src/github/github.service';

@Controller()
export class CliController {
  private readonly logger = new Logger(CliController.name);

  constructor(private readonly githubService: GithubService) {}

  async getUserActivity(username: string): Promise<void> {
    try {
      const data = await this.githubService.fetchUserActivity(username);
      console.log(`Activity for ${username}:`);
      data.forEach((event) => {
        console.log(`- ${event.type} at ${event.created_at}`);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
