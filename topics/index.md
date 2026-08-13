---
layout: default
title: Topics
permalink: /topics/
---

# Topics

<div class="topics-page-container">
  {% assign raw_topics = "" | split: "" %}
  {% for post in site.posts %}
    {% if post.topics %}
      {% for topic in post.topics %}
        {% assign raw_topics = raw_topics | push: topic %}
      {% endfor %}
    {% endif %}
  {% endfor %}
  {% assign sorted_topics = raw_topics | uniq | sort %}
  <ul class="topic-list">
    {% for topic in sorted_topics %}
      <li class="topic-list-item">
        <a href="{{ '/topics/' | append: topic | append: '/' | relative_url }}" class="topic-list-link">{{ topic }}</a>
      </li>
    {% endfor %}
  </ul>
</div>
