import { Injectable, Logger } from '@nestjs/common';
import * as https from 'https';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  fetchUserActivity(username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/events`,
        method: 'GET',
        headers: {
          'User-Agent': 'node.js',
        },
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else if (res.statusCode === 404) {
            reject('User not found.');
          } else if (res.statusCode === 403) {
            reject('API rate limit exceeded. Please try again later.');
          } else {
            reject(`Error ${res.statusCode}: ${res.statusMessage}`);
          }
        });
      });

      req.on('error', (error) => {
        reject(`Connection error: ${error.message}`);
      });

      req.end();
    });
  }
}
