import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./service/auth";


const authRoutes = ['/login', '/register'];

const roleBasedPrivateRoutes = {
    admin:[/^\/dashboard\/admin/],
    member:[/^\/\dashboard\/members/],
  
}
type Role = keyof typeof roleBasedPrivateRoutes;

export const  middleware = async(req: NextRequest) => {

    const user = await getCurrentUser();
   
   

    const {pathname}= req.nextUrl;
    console.log("pathname", pathname);
console.log("user role", user?.role);

    if(!user) {
        if(authRoutes.includes(pathname)) {
            return NextResponse.next();
        }
        else {
            return NextResponse.redirect(
                new  URL(`http://localhost:3000/login?redirectPath=${pathname}`, req.url)
            )
        }
    }
    
    const role = user?.role?.toLowerCase() as Role;
    if(user?.role && roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if(routes.some(route => pathname.match(route))) {
            return NextResponse.next();
        }
    }
    console.log(req.url)
    return  NextResponse.redirect(new URL("/", req.url))

}

export const config = {
    // matcher er moddhe j j private route hobe tara thakbe
    matcher: [
      "/login",
      "/dashboard/:path*",
    //   "/dashboard/admin",
    //   "/dashboard/admin/:page",
    //   "/dashboard/member",
    //   "/dashboard/member/:page",

    ], 
  };