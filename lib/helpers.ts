import path from "path"

export const Base64Placeholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk5pZ/CgABWgEUxJ+HIQAAAABJRU5ErkJggg=="

export function changeExtension(file: string, extension: string) {
  const basename = path.basename(file, path.extname(file))
  return path.join(path.dirname(file), `${basename}${extension}`)
}

/**
 * Clamps the given value between the min and max values.
 * @param value
 * @param min
 * @param max
 * @returns clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}

/**
 * Checks if the given value is an integer.  Short-circuiting, and saving a parse operation
 * @param value
 * @returns true if the value is an integer, false otherwise
 */
export function isInteger(value: unknown) {
  if (isNaN(value as number)) {
    return false
  }
  const x = parseFloat(value as string)
  return (x | 0) === x
}

/**
 * Shuffles the given array with Fisher–Yates algorithm.
 *
 * @param array
 * @returns shuffled array
 */
export const shuffle = (array: unknown[]) => {
  let counter = array.length
  if (counter <= 1) {
    return array
  }

  while (counter > 0) {
    const randomIndex = Math.floor(Math.random() * counter)

    counter--

    const tempArr = array[counter]
    array[counter] = array[randomIndex]
    array[randomIndex] = tempArr
  }

  return array
}

export enum Role {
  Admin = 100,
  Member = 20,
  Viewer = 10,
  NoRole = 0,
}

export function getRole(role: number) {
  switch (role) {
    case Role.Admin:
      return "Admin"
    case Role.Member:
      return "Member"
    case Role.Viewer:
      return "Viewer"
    default:
      return "No role"
  }
}

interface JWTPayload {
  ID: string
  Subject: string
  Roles: number
}

export function decodeJWT(token: string) {
  const buffer = Buffer.from(token.split(".")[1], "base64")
  const payload: JWTPayload = JSON.parse(buffer.toString())
  return payload
}

export function parseCookieHeader(key: string, cookie?: string | null) {
  if (!cookie) {
    return null
  }

  let parsed: string | undefined
  try {
    parsed = cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1]
  } catch (e) {
    return null
  }

  return parsed
}
