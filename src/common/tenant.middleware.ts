import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const tenantId = req.headers['custom-db-tenant'];

    req['tenantId'] = tenantId;

    if (!tenantId) {
      return res.status(400).json({
        error: 'Tenant ID is required',
      });
    }

    next();
  }
}
