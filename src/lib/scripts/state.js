import { writable } from 'svelte/store';

const post_template = `---
layout: $layout
title: $title
description: $description
tags: $tags
date_added: $date_added
date_updated: $date_updated
date_published: $date_published
pinned: $pinned
---`;

export const frontmatter = writable(post_template);
