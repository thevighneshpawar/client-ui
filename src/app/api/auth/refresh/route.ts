import { cookies } from "next/headers";
import cookie from "cookie";

export async function POST() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/auth/refresh`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        Cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
      },
    }
  );

  console.log(response);

  if (!response.ok) {
    console.log("Refresh failed.");
    return Response.json({ success: false });
  }

  const c = response.headers.getSetCookie();
  const accessToken = c.find((cookie) => cookie.includes("accessToken"));
  const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

  if (!accessToken || !refreshToken) {
    console.log("Tokens could not found.");
    return Response.json({ success: false });
  }

  const parsedAccessToken = cookie.parse(accessToken);
  const parsedRefreshToken = cookie.parse(refreshToken);

  if (parsedAccessToken.accessToken && parsedRefreshToken.refreshToken) {
    (await cookies()).set({
      name: "accessToken",
      value: parsedAccessToken.accessToken,
      expires: parsedAccessToken.Expires
        ? new Date(parsedAccessToken.Expires)
        : new Date(),
      // todo: check auth service for httpOnly parameter
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      domain: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.SameSite as "strict",
    });

    (await cookies()).set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken,
      expires: parsedRefreshToken.Expires
        ? new Date(parsedRefreshToken.Expires)
        : new Date(),
      // todo: check auth service for httpOnly parameter
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      path: parsedRefreshToken.Path,
      domain: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return Response.json({ success: true });
  }
}
