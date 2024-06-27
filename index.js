import { SignJWT, jwtVerify } from "jose";

/**
 * @typedef JWTOptions
 * @property {string?} expires
 */

/**
 * Signs a JWT.
 * @param {import("jose").JWTPayload} payload The payload for the JWT. Supports standardized JWT attributes.
 * @param {string} key The key to sign the JWT with.
 * @param {JWTOptions?} options
 * @returns {Promise<string>}
 */
export async function sign(payload, key, options) {
  const encodedKey = new TextEncoder().encode(key);
  const token = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();

  if (options?.expires) {
    token.setExpirationTime(options.expires);
  }

  return await token.sign(encodedKey);
}

/**
 * Verifies a JWT.
 * @param {string} jwt The JWT to verify.
 * @param {string} key The key the JWT was signed with.
 * @returns {Promise<import("jose").JWTPayload | false>} Payload if valid, `false` if invalid.
 */
export async function verify(jwt, key) {
  const encodedKey = new TextEncoder().encode(key);
  try {
    const token = await jwtVerify(jwt, encodedKey);
    return token.payload;
  } catch {
    return false;
  }
}
