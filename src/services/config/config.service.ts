import { Injectable } from '@nestjs/common';
import config from './config.schema';
import { Config } from 'convict';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { writeFileSync } from 'fs';


@Injectable()
export class ConfigService implements TypeOrmOptionsFactory, JwtOptionsFactory {
  private readonly config: Config<any> = config;

  constructor() {
    this.loadFile(`${config.get('config')}`);
    this.validate({ allowed: 'strict' });
  }

  private validate(...args) {
    this.config.validate(...args);
  }

  get(key: string) {
    return this.config.get(key);
  }

  set(name: string, value: any) {
    this.config.set(name, value);
  }

  getSchema() {
    return config.getSchemaString();
  }

  loadFile(path: string) {
    this.config.loadFile(path);
  }

  createTypeOrmOptions() {
    return {
      type: this.get('db.type'),
      host: this.get('db.host'),
      port: this.get('db.port'),
      username: this.get('db.username'),
      password: this.get('db.password'),
      database: this.get('db.database'),
      entities: this.get('db.entities'),
      synchronize: this.get('db.synchronize'),
      debug: this.get('db.debug'),
      logging: this.get('db.logging'),
      dropSchema: this.get('db.dropSchema'),
      subscribers: this.get('db.subscribers'),
      migrations: this.get('db.migrations.dir'),
      migrationsRun: this.get('db.migrations.run'),
      migrationsTableName: this.get('db.migrations.table'),
      cli: {
        entitiesDir: this.get('db.cli.entitiesDir'),
        migrationsDir: this.get('db.cli.migrationsDir'),
        subscribersDir: this.get('db.cli.subscribersDir')
      }
    };
  }

  createJwtOptions() {
    return {
      secretOrPrivateKey: this.get('jwt.secret'),
      signOptions: {
        expiresIn: this.get('jwt.expires_in')
      }
    };
  }

  async exportTypeOrmConfig() {
    const config = JSON.stringify(this.createTypeOrmOptions(), null, 2);

    await writeFileSync(this.get('db.cli.exportPath'), config);
  }
}
