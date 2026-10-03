// Self-check for db-url.ts. Run: node src/lib/db-url.check.mjs
import assert from "node:assert/strict";
import { parseDbUrl } from "./db-url.ts";

const byLabel = (r) => Object.fromEntries(r.parts.map((p) => [p.label, p]));

const pg = parseDbUrl(
  'DATABASE_URL="postgresql://app:p%40ss@db.example.com/shop?sslmode=verify-full&connect_timeout=10"',
);
let p = byLabel(pg);
assert.equal(pg.engine, "PostgreSQL");
assert.equal(p.Username.value, "app");
assert.equal(p.Password.value, "p@ss");
assert.equal(p.Password.secret, true);
assert.equal(p.Host.value, "db.example.com");
assert.equal(p.Port.value, "5432");
assert.equal(p.Port.note, "default");
assert.equal(p.Database.value, "shop");
assert.match(pg.params[0].about, /verify-full: .*host name/);
assert.equal(
  pg.summary,
  "Connects to PostgreSQL database shop on db.example.com as app, encrypted with TLS.",
);
assert.deepEqual(pg.warnings, []);

// Raw @ in the password still splits at the last @, with a warning
p = byLabel(parseDbUrl("mysql://root:pa@ss@localhost:3307/app"));
assert.equal(p.Password.value, "pa@ss");
assert.equal(p.Port.value, "3307");
assert.equal(p.Port.note, undefined);
assert.match(parseDbUrl("mysql://root:pa@ss@localhost/app").warnings[0], /%40/);

// SQLAlchemy dialect+driver
p = byLabel(parseDbUrl("postgresql+psycopg2://u:x@h/db"));
assert.equal(p.Driver.value, "psycopg2");

// MongoDB replica set and SRV
const mongo = parseDbUrl("mongodb://a:b@h1:27017,h2,h3:27018/app?replicaSet=rs0");
p = byLabel(mongo);
assert.equal(p["Host 2"].value, "h2");
assert.equal(p["Port 2"].note, "default");
assert.equal(p["Port 3"].value, "27018");
assert.match(mongo.params[0].about, /replica set/);
const srv = parseDbUrl(
  "mongodb+srv://u:p@cluster0.ab1cd.mongodb.net/test?retryWrites=true",
);
assert.equal(srv.engine, "MongoDB (DNS seed list)");
assert.equal(byLabel(srv).Port, undefined);
assert.match(srv.summary, /TLS/);
assert.match(parseDbUrl("mongodb+srv://h:27017/x").warnings[0], /no port/);

// Redis: password with no user, database number
const redis = parseDbUrl("rediss://:s3cret@cache.example.com:6380/2");
p = byLabel(redis);
assert.equal(p.Username, undefined);
assert.equal(p.Password.value, "s3cret");
assert.equal(p["Database number"].value, "2");
assert.match(redis.summary, /TLS/);

// JDBC SQL Server with ; options
const jdbc = parseDbUrl("jdbc:sqlserver://sql.local:1433;databaseName=app;encrypt=true");
assert.equal(byLabel(jdbc).Scheme.value, "jdbc:sqlserver");
assert.deepEqual(
  jdbc.params.map((x) => x.key),
  ["databaseName", "encrypt"],
);

// Unix socket and empty host
assert.equal(
  byLabel(parseDbUrl("postgres://u@%2Fvar%2Frun%2Fpostgresql/db")).Host.value,
  "/var/run/postgresql",
);
assert.match(parseDbUrl("postgresql:///app").summary, /default local host/);

// SQLite and Prisma file: URLs
assert.equal(byLabel(parseDbUrl("sqlite:///app.db")).File.value, "app.db");
assert.equal(
  byLabel(parseDbUrl("sqlite:////var/data/app.db")).File.value,
  "/var/data/app.db",
);
assert.match(parseDbUrl("sqlite://").summary, /in-memory/);
assert.equal(byLabel(parseDbUrl("file:./dev.db")).File.value, "./dev.db");

// Bad input and odd ports
assert.throws(() => parseDbUrl("just some text"));
assert.throws(() => parseDbUrl("postgres:db"));
assert.match(parseDbUrl("postgres://h:99999/db").warnings[0], /65535/);
assert.match(byLabel(parseDbUrl("foo://h/db")).Scheme.about, /best guess/);

console.log("db-url: ok");
