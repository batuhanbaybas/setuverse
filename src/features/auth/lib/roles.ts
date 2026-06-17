export const USER_ROLES = ['USER', 'MODERATOR', 'ADMIN'] as const

export type UserRole = (typeof USER_ROLES)[number]

export function isAdminRole(role: unknown): role is 'ADMIN' {
  return role === 'ADMIN'
}

export function getUserRole(user: { role?: unknown }): UserRole {
  const role = user.role

  if (role === 'ADMIN' || role === 'MODERATOR' || role === 'USER') {
    return role
  }

  return 'USER'
}
