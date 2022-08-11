.PHONY: all
all: load-cache

.PHONY: update
update: lock vendor

.PHONY: load-cache
load-cache:
	deno cache --reload --lock=lock.json --no-remote --import-map=vendor/import_map.json src/deps.ts src/deps.test.ts

.PHONY: lock
lock: lock.json

lock.json: src/deps.ts src/deps.test.ts
	deno cache --lock=lock.json --lock-write src/deps.ts src/deps.test.ts

.PHONY: vendor
vendor: lock.json
	deno vendor --lock=lock.json src/deps.ts src/deps.test.ts