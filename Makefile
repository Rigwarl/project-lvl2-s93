install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

watch:
	npm test -- --watch

lint:
	npm run eslint -- src

test:
	npm test

publish:
	npm publish
