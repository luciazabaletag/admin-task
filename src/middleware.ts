export { default } from "next-auth/middleware"

export const config = {
    matcher: ['/dashboard']
}
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//     callbacks: {
//         async authorized({ token }) {
//             return !!token;
//         },
//     },
// })

// export function middleware( request: NextRequest) {
//     // return NextResponse.redirect(new URL('/', request.url))
// }

// export const config = {
//     matcher: ['/dashboard']
// }