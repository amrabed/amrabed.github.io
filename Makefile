install:
	npm install

format:
	npm run format

lint:
	npm run lint

local: install format lint
	npm run dev

build:
	npm run build

.PHONY: firebase
firebase:
	npm install -g firebase-tools

deploy: build
	firebase deploy --only hosting

deploy-dev: build
	firebase hosting:channel:deploy dev

clean:
	rm -rf node_modules .next out
