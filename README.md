TypeScript Cypress Fixture Demo
===============================

使用`cy.fixture`可以从`cypress/fixture`目录下load各种文件，好处是可以指定各种encoding,
比如hex, binary等等，比较方便。

如果想把某个fixture用于`cy.route`来stub response，可以使用`cy.fixture(...).as('alias')`，
并将该alias用于`cy.route`

```
npm install
npm run test:open

npm run test:run
```
