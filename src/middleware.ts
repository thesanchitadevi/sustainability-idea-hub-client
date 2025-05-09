import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./service/auth";


const authRoutes = ['/login', '/register'];

const roleBasedPrivateRoutes = {
    admin:[/^\/admin/],
    landlord:[/^\/member/],
  
}
type Role = keyof typeof roleBasedPrivateRoutes;

export const  middleware = async(req: NextRequest) => {

    // const user = await getCurrentUser();
    // const user = {
    //     email: 'kamrul@gmail.com',
    //     role: "ADMIN"
    // };

    // const {pathname}= req.nextUrl;
    // if(!user) {
    //     if(authRoutes.includes(pathname)) {
    //         return NextResponse.next();
    //     }
    //     else {
    //         return NextResponse.redirect(
    //             new  URL(`http://localhost:3000/login?redirectPath=${pathname}`, req.url)
    //         )
    //     }
    // }
    // if(user?.role && roleBasedPrivateRoutes[user?.role as Role]) {
    //     const routes = roleBasedPrivateRoutes[user?.role as Role];
    //     if(routes.some(route => pathname.match(route))) {
    //         return NextResponse.next();
    //     }
    // }
    // return  NextResponse.redirect(new URL("/", req.url))

}

// export const config = {
//     // matcher er moddhe j j private route hobe tara thakbe
//     matcher: [
//       "/login",
//       "/admin",
//       "/admin/:page",
//       "/member",
//       "/member/:page",

//     ], 
//   };