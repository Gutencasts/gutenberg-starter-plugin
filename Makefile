SHELL=/bin/bash
LINT_DIRS=inc blocks

install: install-js
.PHONY: install

lint: lint-php lint-js
.PHONY: lint

make-cache-dir:
	mkdir -p .cache
.PHONY: make-cache-dir

# JS Commands
build:
	yarn build
.PHONY: build

install-js:
	yarn install
.PHONY: install-js

test-js:
	yarn test:js
.PHONY: test-js

lint-js:
	yarn lint:js
.PHONY: lint-js

fix-js:
	yarn lint:js:fix
.PHONY: fix-js

# PHP Commands

lint-php: make-cache-dir
	vendor/bin/phpcs --cache=.cache/phpcs.json $(LINT_DIRS)
.PHONY: lint-php

fix-php:
	vendor/bin/phpcbf  -s $(LINT_DIRS)
.PHONY: fix-php

test-php:
	vendor/bin/phpunit
.PHONY: test-php

coverage-php:
	vendor/bin/phpunit --coverage-clover=coverage.xml
.PHONY: coverage-php
