<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
## SwiftCloud! Api
<p>
  <a href="https://taylor-swift-playlist.onrender.com/api" target="_blank" rel="noopener noreferrer">Explore the SwiftCloud APIs</a>.
  Dive into the API documentation and discover all the features available.
  <p><strong>*Note: </strong> The Api page will takes at least 5 seconds to load as the service is not frequently accessed, it might be going into a “cold start” state, which can cause delays when it needs to spin back up.</p>
  <br>
  Alternatively, you can <strong>copy and paste the link</strong> into your browser to start exploring right away: 
  <span style="color: #007bff; font-family: monospace;">
    https://taylor-swift-playlist.onrender.com/api#/
  </span>
</p>

## Testing Approach
<p>
  Once a NestJS service is completed, I'll create a unit test using Jest in the file `songs.service.spec.ts`. A sample unit test will be provided for the `getSongsByYear` method to verify that the service correctly returns the expected array of songs. Unit testing is executed by running `npm test` in the VSCode terminal.

Following unit testing, functional testing will be conducted to test the API endpoints using Swagger. This will be followed by documentation testing to ensure that all endpoints, parameters, and responses documented accurately reflect the actual API behavior.
</p>


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


