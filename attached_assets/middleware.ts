import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Allow all routes without authentication check
  return NextResponse.next()

  /* COMMENTED OUT FOR DEVELOPMENT - UNCOMMENT TO RE-ENABLE AUTH
  const session = request.cookies.get("session")
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/home", "/auth/login", "/auth/register", "/create-admin", "/preview-dashboard"]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    const user = JSON.parse(session.value)

    // Admin routes protection
    if (pathname.startsWith("/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // User routes protection
    if (pathname.startsWith("/dashboard") && !user) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    return NextResponse.next()
  } catch {
    // Invalid session cookie
    const response = NextResponse.redirect(new URL("/auth/login", request.url))
    response.cookies.delete("session")
    return response
  }
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
