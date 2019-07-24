<h1 align="center"><%= name %></h1>

<p align="center">
  <img src="https://flat.badgen.net/npm/node/next" alt="node version" />
  <a href="https://npmjs.com/package/<%= name %>">
    <img src="https://flat.badgen.net/npm/v/<%= name %>" alt="npm version" />
  </a>
  <a href="https://npmjs.com/package/<%= name %>">
    <img src="https://flat.badgen.net/npm/dm/<%= name %>" alt="npm downloads" />
  </a>
  <img src="https://flat.badgen.net/github/license/<%= username %>/<%= repo %>" alt="license" />
  <%_ if (travis) { _%>
  <a href="https://travis-ci.org/<%= username %>/<%= repo %>">
    <img src="https://flat.badgen.net/travis/<%= username %>/<%= repo %>/master" alt="Travis CI build status" />
  </a>
  <%_ } _%>
  <%_ if (appveyor) { _%>
  <a href="https://ci.appveyor.com/project/<%= username %>/<%= repo %>/branch/master">
    <img src="https://flat.badgen.net/appveyor/ci/<%= username %>/<%= repo %>/master" alt="AppVeyor build status" />
  </a>
  <%_ } _%>
</p>

## Install
```bash
$ yarn add <%= name %>
# or
$ npm i --save <%= name %>
```

## Usage
```typescript
import { getRandomNumber } from '<%= name %>';

console.log(getRandomNumber());
```
