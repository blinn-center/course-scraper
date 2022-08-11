.PHONY: all
all: load-cache

.PHONY: load-cache
load-cache:
	deno cache --reload --lock=lock.json src/deps.ts src/deps.test.ts

.PHONY: lock
lock: lock.json

lock.json: src/deps.ts src/deps.test.ts
	deno cache --lock=lock.json --lock-write src/deps.ts src/deps.test.ts