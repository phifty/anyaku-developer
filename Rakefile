
BUILD_PATH = File.expand_path(File.dirname(__FILE__) + '/build')
GIT_REMOTE = 'ssh://git@github.com/simia-tech/anyaku-developer.io'

desc 'Deploys the website'
task :deploy do
  if File.exists?("#{BUILD_PATH}/.git")
    system "cd #{BUILD_PATH} && git pull"
  else
    system "git clone #{GIT_REMOTE} #{BUILD_PATH}"
  end
  system "cd #{BUILD_PATH} && git checkout gh-pages"

  system 'bundle exec middleman build'

  system "cd #{BUILD_PATH} && git add ."
  system "cd #{BUILD_PATH} && git commit -am'site deployment at #{Time.now}'"
  system "cd #{BUILD_PATH} && git push origin gh-pages"
end
