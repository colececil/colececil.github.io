import {dag, Container, Directory, object, func, Service} from "@dagger.io/dagger"

@object()
export class ColececilGithubIo {
  /**
   * Get a service that runs Jekyll in dev mode.
   *
   * @param src The source directory.
   * @returns The dev mode service.
   */
  @func()
  devMode(src: Directory): Service {
    return this.container(src)
        .withExposedPort(4000)
        .withExposedPort(35729)
        .asService({
          args: ['jekyll', 'serve', '--force_polling', '--livereload']
        })
  }

  /**
   * Build the site.
   *
   * @param src The source directory.
   * @returns The build output directory.
   */
  @func()
  build(src: Directory): Directory {
    return this.container(src)
        .withExec(['jekyll', 'build'])
        .directory('/srv/jekyll/_site')
  }

  /**
   * Get the build container.
   *
   * @param src The source directory.
   * @returns The build container.
   */
  @func()
  container(src: Directory): Container {
    return dag
        .container()
        .from('jekyll/jekyll:3.8')
        .withMountedDirectory('/srv/jekyll', src)
  }
}
