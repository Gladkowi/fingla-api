import * as convict from 'convict';
import * as toml from 'toml';
import * as path from 'path';

convict.addParser({ extension: 'toml', parse: toml.parse });
convict.addFormat({
  name: 'path-array',
  validate: paths => {
    if (!Array.isArray(paths)) {
      throw new Error('Must be of type Array');
    }

    if (paths.length < 1) {
      throw new Error('Array must contain at least one path');
    }

    for (const testPath of paths) {
      path.parse(testPath);
    }
  }
});
convict.addFormat({
  name: 'path',
  validate: value => {
    if (typeof value !== 'string') {
      throw new Error('Must be of type String');
    }
    path.parse(value);
  }
});

const BASE_DIR = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  main_url: {
    doc: ' Origin parameter for X-FRAME-OPTIONS',
    format: 'url',
    default: 'http://localhost:3000'
  },
  frontend_url: {
    doc: ' front-end url',
    format: 'url',
    default: 'http://localhost:3000'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  tz: {
    doc: 'Global node timezone',
    default: 'utc',
    format: String
  },
  config: {
    doc: 'Config file path, toml or json or json5',
    default: './config.toml',
    format: String
  },
  jwt: {
    expires_in: {
      doc: 'Microseconds to token expiration',
      default: 259200,
      format: 'nat'
    },
    secret: {
      doc: 'Random secret for token encryption',
      format: '*',
      default: 'WfwwX7gdt6UuSXoHBtoTGjKFJNofFYDC'
    }
  },
  mailgun: {
    domain: {
      default: 'demo2.42px.org',
      format: '*'
    },
    api_key: {
      default: 'ae59264db502b88cfc06aa6a4c338997-3fb021d1-7b6a4d3b',
      format: '*'
    },
    emailFrom: {
      default: 'meow@demo2.42px.org',
      format: '*'
    }
  },
  user: {
    minutes_last_change_request: {
      default: 10,
      format: Number
    },
  },
  storage: {
    store: {
      doc: 'Path to storage all files',
      default: '/tmp',
      format: String
    },
    maxFileSizeBytes: {
      doc: 'Maximum file size in bytes',
      default: 1048576,
      format: Number
    }
  },
  db: {
    type: {
      doc: 'Connection type/driver',
      env: 'TYPEORM_CONNECTION',
      default: 'mysql',
      format: String
    },
    host: {
      doc: 'DB host uri',
      env: 'TYPEORM_HOST',
      default: 'localhost',
      format: String
    },
    port: {
      doc: 'DB port',
      env: 'TYPEORM_PORT',
      default: 3306,
      format: 'port'
    },
    username: {
      doc: 'DB connection user',
      env: 'TYPEORM_USERNAME',
      default: ''
    },
    password: {
      doc: 'DB connection password',
      env: 'TYPEORM_PASSWORD',
      default: '',
      sensitive: true
    },
    database: {
      doc: 'db name',
      env: 'TYPEORM_DATABASE',
      default: 'aurapro'
    },
    entities: {
      doc: 'Single entitities directory only',
      env: 'TYPEORM_ENTITIES',
      format: 'path-array',
      default: [`${BASE_DIR}/**/*.entity.{ts,js}`]
    },
    synchronize: {
      doc: 'Use typeorm sync',
      env: 'TYPEORM_SYNCHRONIZE',
      default: false,
      format: Boolean
    },
    debug: {
      doc: 'Extended logging',
      env: 'TYPEORM_DEBUG',
      default: false,
      format: Boolean
    },
    logging: {
      doc: '',
      env: 'TYPEORM_LOGGING',
      format: Boolean,
      default: false
    },
    charset: {
      doc: '',
      env: 'TYPEORM_CHARSET',
      format: String,
      default: 'utf8mb4_general_ci'
    },
    subscribers: {
      format: 'path-array',
      default: [`${BASE_DIR}/db/subscribers/*.{ts,js}`]
    },
    dropSchema: {
      format: Boolean,
      doc: '',
      default: false,
      env: 'TYPEORM_DROP_SCHEMA'
    },
    migrations: {
      dir: {
        format: 'path-array',
        env: 'TYPEORM_MIGRATIONS_DIR',
        default: [`${BASE_DIR}/db/migrations/**/*.{ts,js}`]
      },
      table: {
        env: 'TYPEORM_MIGRATIONS_TABLE_NAME',
        doc: '',
        default: 'typeorm_migrations',
        format: String
      },
      run: {
        doc:
          'Indicates if migrations should be run on every application launch',
        format: Boolean,
        default: false
      }
    },
    cli: {
      entitiesDir: {
        doc: '',
        env: 'TYPEORM_ENTITIES_DIR',
        default: 'src/db/entities'
      },
      migrationsDir: {
        doc: '',
        env: 'TYPEORM_MIGRATIONS_DIR',
        default: 'src/db/migrations'
      },
      subscribersDir: {
        doc: '',
        env: 'TYPEORM_SUBSCRIBERS_DIR',
        default: 'src/db/subscriber'
      },
      exportPath: {
        doc: 'Path to export TypeOrm config file',
        default: 'ormconfig.json',
        format: 'path',
        arg: 'typeorm-export-path'
      },
      onlyExportConfig: {
        doc: 'Export config on this launch and exit',
        default: false,
        format: Boolean,
        arg: 'typeorm-export-only'
      }
    }
  },
  swagger: {
    ui_path: {
      doc: 'Relative path to serve Swagger UI',
      format: String,
      default: '/doc',
      env: 'SWAGGER_UI_PATH'
    }
  }
});

export default config;
