# Javascript Story Engine Library

[![Build Status](https://travis-ci.org/cmillauriaux/javascript-story-engine.svg?branch=master)](https://travis-ci.org/cmillauriaux/javascript-story-engine)

[![Coverage Status](https://coveralls.io/repos/github/cmillauriaux/javascript-story-engine/badge.svg?branch=master)](https://coveralls.io/github/cmillauriaux/javascript-story-engine?branch=master)

## What is Story Engine Library

This library allows you to create dynamic, multi-branched stories in a simple way. Written in javascript, it can then be used in any web project, NodeJS or Electron.

## How to use it

The point of entry to the library is `StoryEngine` class. It exposes severals methods to init, load, save and play a story.

```javascript
TODO
```

## How to compile it

Simply run `npm run build` and copy the `lib` directory. The library is ES5 compatible and provide Typescript mapping.

## How to test it

Simply run `npm test` and see the result in the terminal.

## How to write a story in YML

This library supports severals file formats, but YML is the simple one to write easily and quickly a story.

### Init the story

First, you have to make a new directory. All the files of the story will have to be deposited in this directory. You can create as many files and subdirectories as you want. To see an example of a story tree, look at the `example` directory.

### Write the story

#### Story

TODO

#### Context

TODO

#### Characters

TODO

#### Sequences

TODO

##### Conditions

TODO

##### Consequences

TODO

### Check the story's tree

In the root directory project, you can see a `visualizer` directory. This is a simple web page, powered by AlchemyJS to see eavery sequences of your story and their relashionship. It's a great tool for visually checking your story.

## TODO

* Return text to display in a consequence
* Visualize relations
* Mark dialog as "skipped after first display"
* Display sequence title before dialog
* Display inventory