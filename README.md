# bun-jwt
Convenience package for signing and verifying JWTs in [Bun](https://bun.sh), powered by [`jose`](https://github.com/panva/jose), because the regular [`jsonwebtoken`](https://npmjs.com/package/jsonwebtoken) package always errors out in Bun if you set an expiry date.

If you need more advanced functionality than this, you can use `jose`.

## Example
```js
import { sign, verify } from "bun-jwt";

// Create a JWT
const token = await sign(
  { id: "123" }, // Payload: Has to be an object, since it uses the `JWTPayload` type from `jose`.
  "abc", // Key/secret: Has to be a string.
  { expires: "1h" }, // Options object: optional, but lets you set the expiry date.
);
console.log(token); // Will be the JWT as a string.

// Verify/get payload from a JWT
const payload = await verify(
  token, // The JWT: Has to be a string.
  "abc", // The key used to sign the JWT: Again, has to be a string.
);

console.log(payload); // Will either be the payload object (if valid), or `false` (if invalid).
```
