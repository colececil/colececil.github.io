import { dag, Container, Directory, object, func } from "@dagger.io/dagger"

@object()
export class ColececilGithubIo {
  @func()
  getBuildContainer(src: Directory): Container {
    return dag
        .container()
        .from('jekyll/jekyll:3.8')
        .withMountedDirectory('/srv/jekyll', src)
  }

  @func()
  build(src: Directory): Directory {
    return this.getBuildContainer(src)
        .withExec(['jekyll', 'build'])
        .directory('/srv/jekyll/_site')
  }
}
