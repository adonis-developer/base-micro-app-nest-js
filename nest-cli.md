### Generate resource in monorepo

=> nest g res $name $path -> nest g app identity /modules

### Generate table form entity in monorepo

## Create migration by entity

=> npm run build && npx typeorm migration:generate -d dist/apps/$service/src/configs/data-source.js ./apps/$service/src/migrations/InitEntity
-> npm run build && npx typeorm migration:generate -d dist/apps/auth-svc/src/configs/data-source.js ./apps/auth-svc/src/migrations/InitEntity

## Apply migration by entity

=> npm run build && npx typeorm migration:run -d dist/apps/$service/src/configs/data-source.js
-> npm run build && npx typeorm migration:run -d dist/apps/auth-svc/src/configs/data-source.js

## Revert migration by entity

=> npm run build && npx typeorm migration:revert -d dist/apps/$service/src/configs/data-source.js
-> npm run build && npx typeorm migration:revert -d dist/apps/auth-svc/src/configs/data-source.js
