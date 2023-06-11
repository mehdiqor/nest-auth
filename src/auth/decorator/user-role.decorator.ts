import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/utils';

export const Roles = (...roles: RolesEnum[]) =>
  SetMetadata('roles', roles);
