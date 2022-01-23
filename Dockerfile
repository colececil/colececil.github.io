FROM jekyll/jekyll:3.8

COPY --chown=jekyll:jekyll ./Gemfile ./Gemfile.lock ./
RUN bundle install

COPY . .
CMD jekyll serve --force_polling --livereload