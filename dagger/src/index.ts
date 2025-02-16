import {dag, Container, Directory, object, func, Service, argument, File} from "@dagger.io/dagger"

@object()
export class ColececilGithubIo {
  private readonly gemfileFile: File;
  private readonly gemfileLockFile: File;
  private readonly src: Directory;

  public constructor(
      @argument({defaultPath: '/src/Gemfile'}) gemfileFile: File,
      @argument({defaultPath: '/src/Gemfile.lock'}) gemfileLockFile: File,
      @argument({
        defaultPath: '/src/',
        ignore: [
          '*',
          '!_includes/',
          '!_layouts/',
          '!_posts/',
          '!_sass/',
          '!css/',
          '!fonts/',
          '!images/',
          '!scripts/',
          '!_config.yml',
          '!about-me.md',
          '!CNAME',
          '!feed.xml',
          '!Gemfile',
          '!Gemfile.lock',
          '!index.html',
          '!privacy-policy.md',
          '!projects.md'
        ]
      }) src: Directory
  ) {
    this.gemfileFile = gemfileFile;
    this.gemfileLockFile = gemfileLockFile;
    this.src = src;
  }

  /**
   * Get a service that runs Jekyll in dev mode.
   *
   * @returns The dev mode service.
   */
  @func()
  public devMode(): Service {
    return this.container()
        .withExposedPort(4000)
        .withExposedPort(35729)
        .asService({
          args: ['jekyll', 'serve', '--force_polling', '--livereload']
        });
  }

  /**
   * Build the site.
   *
   * @returns The build output directory.
   */
  @func()
  public build(): Directory {
    return this.container()
        .withExec(['mkdir', '/srv/jekyll/_site'])
        .withExec(['jekyll', 'build'])
        .directory('/srv/jekyll/_site');
  }

  /**
   * Update dependencies to their latest versions that meet the Gemfile specifications.
   *
   * @returns The updated Gemfile.lock file.
   */
  @func()
  public updateDependencies(): File {
    return this.container()
        .withExec(['bundle', 'update', '--all'])
        .file('/srv/jekyll/Gemfile.lock');
  }

  /**
   * Get the build container.
   *
   * @returns The build container.
   */
  private container(): Container {
    return dag
        .container()
        .from('jekyll/jekyll:3.8')
        .withMountedCache('/usr/local/bundle', dag.cacheVolume('rubygems-cache'))
        .withFiles('/srv/jekyll', [this.gemfileFile, this.gemfileLockFile], {owner: 'jekyll:jekyll'})
        .withExec(['bundle', 'install'])
        .withMountedDirectory('/srv/jekyll', this.src, {owner: 'jekyll:jekyll'});
  }
}
