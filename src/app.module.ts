import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubService } from './github/github.service';
import { CliController } from './cli/cli.controller';

@Module({
  imports: [],
  controllers: [AppController, CliController],
  providers: [AppService, GithubService],
})
export class AppModule {}
