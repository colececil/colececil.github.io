# Cole Cecil's personal website

## Tech stack

This project is built with the following technologies:

- [Jekyll](https://jekyllrb.com/), for building the static content using HTML templates and Markdown files.
- [Docker](https://www.docker.com/), for building and running the project locally.
- [GitHub Pages](https://pages.github.com/), for building and hosting the project.
- [CloudFlare](https://www.cloudflare.com/), for being able to use HTTPS with a custom domain on GitHub Pages (this might not be needed anymore).

## Running the project locally

To run the project locally, run the command `docker-compose up` at the root directory. This will build the static content and serve it at [http://localhost:4000](http://localhost:4000). It will also watch the source files and recompile/reload the static content whenever anything changes.

## Updating the dependencies

To update the dependencies that are specified by `Gemfile.lock`, first start the project running locally in Docker, as shown in the previous section. After that, run the command `docker exec -it <containerId> bash`, where `<containerId>` is the ID of the container the project is running in. Once this logs you in to the running container, run the command `bundle update`. This will update the dependencies and the `Gemfile.lock` file.

## Updating the Jekyll version

To update the Jekyll version, do the following:

- Modify the `Gemfile` to specify the version of Jekyll you want.
- Modify the version of [the github-pages gem](https://rubygems.org/gems/github-pages/) specified in the `Gemfile` to the latest version compatible with the chosen Jekyll version.
- Modify the version of [the Jekyll Docker image](https://hub.docker.com/r/jekyll/jekyll/) in the `Dockerfile` to the latest version compatible with the chosen Jekyll version.
- Delete the contents of `Gemfile.lock`, to allow the dependencies to be regenerated based on the new Jekyll and github-pages versions. Do not remove the file entirely, as this will prevent the Docker image from building.