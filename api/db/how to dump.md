## Steps do dump and restore production database

1. get database urls from prod and staging:

   - `fly ssh console -C bash -a sofia-galvao-group-staging` and `fly ssh console -C bash -a sofia-galvao-group`
   - type `env` and note the `DATABASE_URL` for each.
   - replace `@sofia-galvao-group-staging-db.flycast:5432` with `@localhost:15432` for each of them

1. proxy into prod:

   - `fly proxy 15432:5432 --app sofia-galvao-group-staging-db`

1. Get db dump from prod:

   - `/opt/homebrew/opt/postgresql@15/bin/pg_dump -Fc PROD_DATABASE_URL > ./latest.dump`

1. restore locally, for testing:

   - `pg_restore --verbose --clean --no-acl --no-owner -h localhost -U vascofigueiredo -d sofia_galvao_development latest.dump`

1. stop prod proxy, proxy staging:

   - `fly proxy 15432:5432 --app sofia-galvao-group-staging-db`

1. restore in staging

   - `pg_restore --verbose --clean --no-acl --no-owner -d STAGING_DATABASE_URL < latest.dump`
