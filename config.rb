
###
# Page options, layouts, aliases and proxies
###

%w{
documentation
documentation/general/installation
documentation/general/how-it-works
documentation/general/security
documentation/operations/create
documentation/operations/open
documentation/operations/update
documentation/operations/search
documentation/operations/manage-contacts
documentation/operations/manage-sections
documentation/operations/subscribe-contact-updates
documentation/modules/build-in
documentation/modules/create-own
download
contribute
}.each do |id|
  proxy "/#{id}", 'index.html'
end

proxy '404.html', 'index.html'

###
# Helpers
###

activate :livereload
# activate :directory_indexes

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
