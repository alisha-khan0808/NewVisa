import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { USER_ROLES } from '@/lib/constants';

const protectedRoutes = ['/dashboard', '/admin'];
const adminRoutes = ['/admin'];
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthenticated = !!session;
  const userRole = (session?.user?.user_metadata as { role?: string | undefined })?.role;
  const isAdmin = userRole ? (Object.values(USER_ROLES).includes(userRole as typeof USER_ROLES[keyof typeof USER_ROLES]) && userRole !== 'customer') : false;

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Check if current path is admin route
  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Check if current path is auth route
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users from auth routes
  if (isAuthenticated && isAuthRoute) {
    if (isAdminRoute || (isAdmin && request.nextUrl.pathname.startsWith('/admin'))) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect non-admin users from admin routes
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
