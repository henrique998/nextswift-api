import { Role } from '@app/entities/Role'

export class RoleViewModel {
  static toHttp(role: Role) {
    return {
      id: role.id,
      name: role.name.value,
    }
  }
}
