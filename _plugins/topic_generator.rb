module Jekyll
  class TopicPageGenerator < Generator
    safe true

    def generate(site)
      # Extract all unique topics from all posts
      raw_topics = []
      site.posts.docs.each do |post|
        topics = post.data['topics']
        if topics.is_a?(Array)
          raw_topics.concat(topics)
        elsif topics.is_a?(String)
          raw_topics << topics
        end
      end

      topics = raw_topics.compact.map(&:to_s).map(&:strip).reject(&:empty?).uniq

      # Generate a static page for each topic
      topics.each do |topic|
        site.pages << TopicPage.new(site, site.source, topic)
      end
    end
  end

  # Page object for dynamic topic listing
  class TopicPage < Page
    def initialize(site, base, topic)
      @site = site
      @base = base
      @dir  = File.join('topics', topic)
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'topic.html')
      self.data['topic_title'] = topic
      self.data['title']       = "Topics / #{topic}"
      self.data['permalink']   = "/topics/#{topic}/"
    end
  end
end
