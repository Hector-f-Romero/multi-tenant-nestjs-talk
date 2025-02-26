import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import type { Connection, Model, Schema } from 'mongoose';

@Injectable()
export class TenantService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async verifyDatabaseExist(tenantId: string): Promise<boolean> {
    const admin = this.connection.db.admin();

    const { databases } = await admin.listDatabases();
    return databases.some((db) => db.name === tenantId);
  }

  async getTenantConnection(tenantId: string): Promise<Connection> {
    const tenantExists = await this.verifyDatabaseExist(tenantId);

    if (!tenantExists) {
      throw new NotFoundException(
        `Database for tenant ${tenantId} does not exist.`,
      );
    }

    return this.connection.useDb(tenantId, { useCache: true });
  }

  async getTenantModel<T>(
    modelName: string,
    schema: Schema,
    tenantId: string,
  ): Promise<Model<T>> {
    const tenantConnection = await this.getTenantConnection(tenantId);

    // Verificar si el modelo ya existe en la conexión para retornarlo. De no ser así, lo agregamos.
    return tenantConnection.models[modelName]
      ? tenantConnection.model<T>(modelName)
      : tenantConnection.model<T>(modelName, schema);
  }
}
