// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function middleware(request) {
//   try {
//     const token = request.headers.get("authorization");

//     // if (!token) {
//     //   throw Error();
//     // }

//     const decoded = jwt.verify(token, "kodingacademy24");
//     console.log(decoded);

//     // const user = await db.user.findFirst({
//     //   where: {
//     //     id: decoded.id,
//     //   },
//     // });
//   } catch (e) {
//     console.log(e);
//     return new NextResponse("Unauthorized", { status: 401 });
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/api/products/:path*"],
// };
