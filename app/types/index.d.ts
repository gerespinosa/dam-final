import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { userId, username, email, imgUrl } = await request.json();

  console.log("🧾 PATCH recibido con:", { userId, username, email, imgUrl });

  const user = await getCurrentUser();
  if (!user || user.id !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (username) user.username = username;
  if (email) user.email = email;
  if (imgUrl) user.imgUrl = imgUrl;

  await user.save();

  console.log("✅ Usuario actualizado:", user);

  return NextResponse.json({ message: "User updated successfully" });
}