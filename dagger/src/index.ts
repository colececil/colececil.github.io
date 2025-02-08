import {dag, Container, Directory, object, func, Service} from "@dagger.io/dagger"

@object()
export class ColececilGithubIo {
  @func()
  devMode(src: Directory): Service {
    return this.getBuildContainer(src)
        .withExposedPort(4000)
        .withExposedPort(35729)
        .asService({
          args: ['jekyll', 'serve', '--force_polling', '--livereload']
        })
  }

  @func()
  build(src: Directory): Directory {
    return this.getBuildContainer(src)
        .withExec(['jekyll', 'build'])
        .directory('/srv/jekyll/_site')
  }

  @func()
  getBuildContainer(src: Directory): Container {
    return dag
        .container()
        .from('jekyll/jekyll:3.8')
        .withMountedDirectory('/srv/jekyll', src)
  }
}
