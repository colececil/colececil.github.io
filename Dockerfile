FROM jekyll/jekyll:latest

COPY --chown=jekyll:jekyll ./Gemfile ./Gemfile.lock ./
RUN bundle install

COPY . .
CMD jekyll serve --force_polling