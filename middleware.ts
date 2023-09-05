export { default } from "next-auth/middleware"

export const config = { matcher: ["/api/:path*", "/user", "/link-account", "/change-password"] }