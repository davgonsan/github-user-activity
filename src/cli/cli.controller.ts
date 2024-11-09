import { Controller, Logger } from '@nestjs/common';
import { GithubService } from 'src/github/github.service';
import { format } from 'date-fns'; // Usaremos date-fns para formatear la fecha

@Controller()
export class CliController {
  private readonly logger = new Logger(CliController.name);

  constructor(private readonly githubService: GithubService) {}

  async getUserActivity(username: string): Promise<void> {
    try {
      const data = await this.githubService.fetchUserActivity(username);
      console.log(`\nActivity for ${username}:\n`);

      data.forEach((event) => {
        const eventDate = format(
          new Date(event.created_at),
          'yyyy-MM-dd HH:mm:ss',
        );
        const repoName = event.repo?.name ?? 'Unknown repository';
        console.log(`- ${event.type} in ${repoName} on ${eventDate}`);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
