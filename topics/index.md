---
layout: default
title: Topics
permalink: /topics/
---

# <span data-i18n="sections.topics">{{ site.data.translations.en.sections.topics }}</span>

<div class="topics-page-container">
  {% assign en_topics = "" | split: "" %}
  {% assign es_topics = "" | split: "" %}
  {% for post in site.posts %}
    {% if post.topics %}
      {% for topic in post.topics %}
        {% if post.lang == 'es' %}
          {% assign es_topics = es_topics | push: topic %}
        {% else %}
          {% assign en_topics = en_topics | push: topic %}
        {% endif %}
      {% endfor %}
    {% endif %}
  {% endfor %}
  {% assign en_topics = en_topics | uniq | sort %}
  {% assign es_topics = es_topics | uniq | sort %}
  <ul class="topic-list">
    {% for topic in en_topics %}
      <li class="topic-list-item" data-lang="en">
        <a href="{{ '/topics/' | append: topic | append: '/' | relative_url }}" class="topic-list-link" data-lang="en">{{ topic }}</a>
      </li>
    {% endfor %}
    {% for topic in es_topics %}
      <li class="topic-list-item" data-lang="es">
        <a href="{{ '/topics/' | append: topic | append: '/' | relative_url }}" class="topic-list-link" data-lang="es">{{ topic }}</a>
      </li>
    {% endfor %}
  </ul>
</div>
