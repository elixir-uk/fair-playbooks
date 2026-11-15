# Live slides for every module, automatically.
#
# Any module in _modules with a `session:` gets a present-mode page at
# /present/<module-id>/, built with _layouts/present.html. Module authors
# don't need to create anything. (A hand-written present/<module-id>.html
# still wins if one exists.)
module FairPlaybook
  class PresentPages < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      modules = site.collections["modules"]
      return unless modules

      taken = site.pages.map(&:url)
      modules.docs.each do |doc|
        session = doc.data["session"]
        next unless session.is_a?(Array) && !session.empty?

        slug = doc.data["slug"] || doc.basename_without_ext
        url = "/present/#{slug}/"
        next if taken.include?(url)

        page = Jekyll::PageWithoutAFile.new(site, site.source, "present/#{slug}", "index.html")
        page.data["layout"] = "present"
        page.data["module"] = slug
        page.data["permalink"] = url
        page.data["sitemap"] = false
        site.pages << page
      end
    end
  end
end
