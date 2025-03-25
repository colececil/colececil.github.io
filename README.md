# Cole Cecil's personal website

## Tech stack

This project is built with the following technologies:

- [Jekyll](https://jekyllrb.com/), for building the static content using HTML templates and Markdown files.
- [Dagger](https://dagger.io/), for containerized workflows that can be run both locally and in CI.
- [GitHub Actions](https://github.com/features/actions), for building and deploying the project.
- [GitHub Pages](https://pages.github.com/), for hosting the project.

## Development

### Prerequisites

In order to run the project on your local machine, you'll need the following:

- **[Dagger CLI](https://docs.dagger.io/install) (v0.15.3+):** This is needed for running Dagger functions.
- **[EditorConfig](https://editorconfig.org/):** This is a tool for helping maintain consistent code formatting between different editors. Some editors/IDEs come with it preinstalled, but for others, you'll need to download it as an extension. When it's installed, it will automatically read the project's `.editorconfig` file and use the settings it specifies.

### Running the project locally

To run the project locally, run the command `dagger call dev-mode up` at the root directory. This will build the static content and serve it at [http://localhost:4000](http://localhost:4000).

_**Note:** Because of [current limitations in Dagger](https://github.com/dagger/dagger/issues/6990), this command will not watch the source files and recompile/reload the static content._

### Building the project

To build the project, run the command `dagger call build` at the root directory.

### Updating the dependencies

To update the dependencies that are specified by `src/Gemfile.lock`, run the command `dagger call update-dependencies` at the root directory.

### Updating the Jekyll version

To update the Jekyll version, do the following:

- Modify `src/Gemfile` to specify the version of Jekyll you want.
- Modify the version of [the Jekyll Docker image](https://hub.docker.com/r/jekyll/jekyll/) in the `container` function in `dagger/src/index.ts`.
- Delete the contents of `src/Gemfile.lock`, to allow the dependencies to be regenerated based on the new Jekyll and github-pages versions. Do not remove the file entirely, as this will prevent the Docker image from building.

## Deployment

The project is automatically built (using the Dagger `build` function) and then deployed to GitHub Pages when a commit is pushed to the `master` branch.
