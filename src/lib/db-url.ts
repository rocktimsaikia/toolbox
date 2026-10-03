export type Part = {
  label: string;
  value: string;
  about: string;
  // Short tag after the value, such as "default"
  note?: string;
  secret?: boolean;
};

export type Param = { key: string; value: string; about?: string };

export type ParsedDbUrl = {
  engine: string;
  summary: string;
  parts: Part[];
  params: Param[];
  warnings: string[];
};

type Engine = { name: string; port?: string; db: string };

const SQL_DB = "The database to open on the server.";
const MONGO_DB =
  "The default database for this connection. Credentials are checked against it too, unless authSource names another one.";

const ENGINES: Record<string, Engine> = {
  postgres: { name: "PostgreSQL", port: "5432", db: SQL_DB },
  postgresql: { name: "PostgreSQL", port: "5432", db: SQL_DB },
  cockroachdb: { name: "CockroachDB", port: "26257", db: SQL_DB },
  mysql: { name: "MySQL", port: "3306", db: SQL_DB },
  mariadb: { name: "MariaDB", port: "3306", db: SQL_DB },
  sqlserver: { name: "Microsoft SQL Server", port: "1433", db: SQL_DB },
  mssql: { name: "Microsoft SQL Server", port: "1433", db: SQL_DB },
  oracle: {
    name: "Oracle Database",
    port: "1521",
    db: "The service name to connect to.",
  },
  mongodb: { name: "MongoDB", port: "27017", db: MONGO_DB },
  "mongodb+srv": { name: "MongoDB (DNS seed list)", db: MONGO_DB },
  redis: {
    name: "Redis",
    port: "6379",
    db: "The numbered database to select. Redis has 16 by default, 0 to 15.",
  },
  rediss: {
    name: "Redis over TLS",
    port: "6379",
    db: "The numbered database to select. Redis has 16 by default, 0 to 15.",
  },
};

const SSLMODE: Record<string, string> = {
  disable: "Never use TLS. Data, including the password, travels unencrypted.",
  allow: "Try without TLS first, and use it only if the server insists.",
  prefer: "Use TLS if the server supports it, otherwise connect unencrypted.",
  require: "Always use TLS, but don't check the server's certificate.",
  "verify-ca": "Always use TLS, and check the certificate was signed by a trusted CA.",
  "verify-full":
    "Always use TLS, check the certificate, and check it was issued for this host name.",
};

// Keys are lowercased; drivers disagree on case (connectTimeout vs connect_timeout)
const PARAMS: Record<string, string> = {
  sslmode: "How strictly to use TLS encryption.",
  ssl: "Turns TLS encryption on or off.",
  tls: "Turns TLS encryption on or off.",
  encrypt: "Turns TLS encryption on or off (SQL Server).",
  trustservercertificate:
    "Accept the server's certificate without checking it. Fine for local work, risky in production.",
  sslrootcert: "Path to the CA certificate used to check the server's certificate.",
  sslcert: "Path to the client certificate, for servers that require one.",
  sslkey: "Path to the private key for the client certificate.",
  sslaccept: "Whether to accept an invalid server certificate (Prisma, MySQL).",
  connect_timeout: "How long to wait for the connection to open, in seconds.",
  connecttimeout:
    "How long to wait for the connection to open. Check your driver for the unit.",
  connecttimeoutms: "How long to wait for the connection to open, in milliseconds.",
  sockettimeoutms: "How long a single read or write may wait, in milliseconds.",
  application_name: "A label for this client, shown in the server's list of connections.",
  appname: "A label for this client, shown in the server's logs and connection list.",
  options: "Settings sent to the server at startup, such as -c search_path=myschema.",
  schema: "The schema to use by default (Prisma and some other clients).",
  search_path: "The schemas to look in, in order, when a table name has no schema.",
  target_session_attrs:
    "With several hosts, which kind of server to settle on, such as read-write for the primary.",
  host: "Overrides the host, often a Unix socket directory such as /var/run/postgresql.",
  port: "Overrides the port.",
  user: "Overrides the username.",
  password: "Overrides the password.",
  pgbouncer:
    "Tells Prisma it is going through PgBouncer, so it skips prepared statements.",
  connection_limit: "The most connections Prisma's pool will open.",
  pool_timeout: "Seconds Prisma waits for a free pooled connection before failing.",
  charset: "The character set for this connection. utf8mb4 is the full UTF-8 set.",
  timezone: "The time zone the connection uses for dates and times.",
  servertimezone: "The time zone the server's dates and times are in (MySQL JDBC).",
  authsource: "The database that holds this user's credentials. Often admin.",
  authmechanism: "How the password is checked, such as SCRAM-SHA-256.",
  replicaset: "The name of the replica set to connect to.",
  retrywrites: "Retry a write once if it fails because of a network error or failover.",
  retryreads: "Retry a read once if it fails because of a network error or failover.",
  w: "Write concern: how many servers must confirm a write. majority means most of them.",
  readpreference: "Which servers to read from, such as primary or secondaryPreferred.",
  maxpoolsize: "The most connections the driver's pool will open.",
  minpoolsize: "Connections the pool keeps open even when idle.",
  directconnection:
    "Talk only to the listed host, without discovering the rest of the cluster.",
  databasename: "The database to open (SQL Server).",
  integratedsecurity: "Log in with the operating system account instead of a password.",
  protocol: "The wire protocol version to use.",
};

const TLS_ON = /^(true|1|require|verify-ca|verify-full|yes)$/i;

function decode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseParams(pairs: string[]): Param[] {
  return pairs.filter(Boolean).map((pair) => {
    const [rawKey, ...rest] = pair.split("=");
    const key = decode(rawKey);
    const value = decode(rest.join("=").replace(/\+/g, " "));
    const lower = key.toLowerCase();
    const about =
      lower === "sslmode" && SSLMODE[value]
        ? `${PARAMS.sslmode} ${value}: ${SSLMODE[value]}`
        : PARAMS[lower];
    return { key, value, about };
  });
}

function fileParts(scheme: string, rest: string): ParsedDbUrl {
  // sqlite:///app.db is relative, sqlite:////var/app.db is absolute (SQLAlchemy)
  let path = rest.replace(/^\/\//, "");
  if (scheme === "sqlite") path = path.replace(/^\//, "");
  const [file, query = ""] = path.split("?");
  const memory = file === ":memory:" || file === "";
  const about = memory
    ? "No file: the database lives in memory and is gone when the connection closes."
    : file.startsWith("/")
      ? "The database file, as an absolute path."
      : "The database file. A relative path is resolved from the app's working directory.";
  return {
    engine: "SQLite",
    summary: memory
      ? "Opens a temporary in-memory SQLite database."
      : `Opens the SQLite database file ${decode(file)}.`,
    parts: [
      {
        label: "Scheme",
        value: scheme,
        about:
          "Tells the client to open a SQLite database, which is a single local file.",
      },
      { label: "File", value: decode(file) || ":memory:", about },
    ],
    params: parseParams(query.split("&")),
    warnings: [],
  };
}

export function parseDbUrl(input: string): ParsedDbUrl {
  // Accept a pasted .env line: DATABASE_URL="postgres://..."
  let text = input
    .trim()
    .replace(/^(export\s+)?[A-Za-z_][A-Za-z0-9_]*\s*=\s*/, "")
    .replace(/^(["'])(.*)\1$/, "$2");
  const jdbc = /^jdbc:/i.test(text);
  if (jdbc) text = text.slice(5);

  const schemeMatch = text.match(/^([a-z][a-z0-9+.-]*):(.*)$/i);
  if (!schemeMatch) throw new TypeError("missing scheme");
  const scheme = schemeMatch[1].toLowerCase();
  const afterScheme = schemeMatch[2];
  if (scheme === "sqlite" || scheme === "file") return fileParts(scheme, afterScheme);
  if (!afterScheme.startsWith("//")) throw new TypeError("missing //");
  const rest = afterScheme.slice(2);

  // SQLAlchemy writes dialect+driver, as in postgresql+psycopg2
  const [dialect, driver] = ENGINES[scheme] ? [scheme] : scheme.split("+");
  const engine: Engine = ENGINES[dialect] ?? { name: dialect, db: SQL_DB };
  const parts: Part[] = [];
  const warnings: string[] = [];

  parts.push({
    label: "Scheme",
    value: jdbc ? `jdbc:${scheme}` : scheme,
    about: `Tells the client which database to talk to: ${engine.name}.${
      jdbc ? " The jdbc: prefix marks it as a Java (JDBC) connection URL." : ""
    }${ENGINES[dialect] ? "" : " This isn't a scheme the tool knows, so the rest is a best guess."}`,
  });
  if (driver) {
    parts.push({
      label: "Driver",
      value: driver,
      about: "The client library to connect with, in SQLAlchemy's dialect+driver style.",
    });
  }

  // ponytail: userinfo ends at the last @ before any ?, so a raw @ or / in the password
  // still parses. A raw ? in the password does not, and most drivers fail on it too.
  const queryAt = rest.indexOf("?");
  const beforeQuery = queryAt < 0 ? rest : rest.slice(0, queryAt);
  const query = queryAt < 0 ? "" : rest.slice(queryAt + 1);
  const at = beforeQuery.lastIndexOf("@");
  const userinfo = at < 0 ? "" : beforeQuery.slice(0, at);
  // JDBC SQL Server puts options after semicolons: host:1433;databaseName=app
  const [hostPath, ...semiParams] = beforeQuery.slice(at + 1).split(";");
  const slash = hostPath.indexOf("/");
  const hostport = slash < 0 ? hostPath : hostPath.slice(0, slash);
  const path = slash < 0 ? "" : decode(hostPath.slice(slash + 1));

  let user = "";
  if (userinfo) {
    const colon = userinfo.indexOf(":");
    user = decode(colon < 0 ? userinfo : userinfo.slice(0, colon));
    // Redis often has a password and no user: redis://:secret@host
    if (user) {
      parts.push({
        label: "Username",
        value: user,
        about:
          "The database user to log in as. Its permissions decide what this connection can do.",
      });
    }
    if (colon >= 0) {
      const rawPassword = userinfo.slice(colon + 1);
      parts.push({
        label: "Password",
        value: decode(rawPassword),
        about: "The password for that user, shown decoded.",
        secret: true,
      });
      const raw = rawPassword.match(/[@/#[\] ]/);
      if (raw) {
        const encoded = encodeURIComponent(raw[0]);
        warnings.push(
          `The password contains a raw "${raw[0]}". Many drivers misread it, so write it as ${encoded}.`,
        );
      }
    }
  }

  const hosts = hostport
    .split(",")
    .filter(Boolean)
    .map((entry) => {
      const m = entry.match(/^(\[[^\]]*\]|[^:]*)(?::(.*))?$/) ?? [];
      return { host: decode(m[1] ?? entry), port: m[2] ?? "" };
    });
  if (hosts.length === 0) {
    // libpq allows postgresql:///app, meaning the local default socket
    parts.push({
      label: "Host",
      value: "",
      about:
        "Left empty, so the driver uses its default, usually a local Unix socket or localhost.",
    });
  }

  const srv = dialect === "mongodb+srv";
  hosts.forEach(({ host, port }, idx) => {
    const many = hosts.length > 1;
    const about = srv
      ? "A DNS name, not a server. The driver looks up its SRV record to find the real servers, and its TXT record for extra options."
      : host.startsWith("/")
        ? "A Unix socket directory: the client connects through a local file instead of the network."
        : host === "localhost" || host === "127.0.0.1" || host === "[::1]"
          ? "This same machine."
          : many
            ? "One of several servers. The driver tries or balances across them by its own rules."
            : "The server's address: a host name or IP address.";
    parts.push({ label: many ? `Host ${idx + 1}` : "Host", value: host, about });
    if (port) {
      parts.push({
        label: many ? `Port ${idx + 1}` : "Port",
        value: port,
        about: "The network port the server listens on.",
      });
      if (!/^\d+$/.test(port) || Number(port) > 65535) {
        warnings.push(`Port "${port}" isn't a number from 0 to 65535.`);
      }
    } else if (engine.port && !srv && !host.startsWith("/")) {
      parts.push({
        label: many ? `Port ${idx + 1}` : "Port",
        value: engine.port,
        about: "Not in the URL, so the driver uses the default port for this database.",
        note: "default",
      });
    }
  });
  if (srv && (hosts.length > 1 || hosts[0]?.port)) {
    warnings.push("A mongodb+srv URL takes exactly one host name and no port.");
  }

  if (path) {
    const label = dialect.startsWith("redis") ? "Database number" : "Database";
    parts.push({ label, value: path, about: engine.db });
  }

  const params = parseParams([...query.split("&"), ...semiParams]);
  const tls =
    scheme === "rediss" ||
    srv ||
    params.some(
      ({ key, value }) => /^(ssl|tls|sslmode|encrypt)$/i.test(key) && TLS_ON.test(value),
    );
  const where =
    hosts.map(({ host, port }) => (port ? `${host}:${port}` : host)).join(", ") ||
    "the default local host";
  const summary = `Connects to ${engine.name}${path ? ` database ${path}` : ""} on ${where}${
    user ? ` as ${user}` : ""
  }${tls ? ", encrypted with TLS" : ""}.`;

  return { engine: engine.name, summary, parts, params, warnings };
}
