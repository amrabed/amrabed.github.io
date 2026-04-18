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

deploy: build
	npx firebase deploy --only hosting

clean:
	rm -rf node_modules .next out