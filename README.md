# Pollock documentation

## Check the documentation localy

1. `jekyll serve`
2. go on [http://localhost:4000/Pollock](http://localhost:4000/Pollock/)

> If the CSS or images are not linked, edit the `baseurl` field in `_config.yml`.

## Edit a page

- Simply open the right markdown file, jekyll will compile the html automaticaly (don't forget to `jekyll serve`).


## Add a new page

- Create a new markdown file (.md) and add a yaml header with (at least) the title and the layout

```yaml
---
layout: page
title: API Specification
---
```
