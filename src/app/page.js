
// Landing page

import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DBConnection } from "@/app/utils/config/db";
import UserNavigation from "@/app/components/UserNavigation";
import ProductCollection from "@/app/components/ProductCollection";

const Page = async () => {
  const session = await auth();

  console.log("FULL SESSION:", session);

  // ❌ Not logged in
  if (!session) {
    redirect("/login");
  }

  await DBConnection();

  const userName = session.user.name; // FIXED

  console.log("role check:", session.user.role);

  return (
    <div>
      {/* Another USER VIEW */}
      {session.user.role === "user" && (
        <>
          <UserNavigation userName={userName} />
          {/* <h1>Welcome to Holiday Resort</h1> */}
          <ProductCollection />
        </>
      )}

      {/* ADMIN saireddy */}
      {session.user.role === "admin" && (
        <div>
          <h1>Admin Dashboard</h1>
          <p>Go to /admin for full admin panel</p>
        </div>
      )}
    </div>
  );
};

export default Page;


{/* / Mount it */ }
{/* usernavigation component ki pass it --> Props [userName] */}


 {/* role Admin aytha */}
 {/* admin page ki redirect */}

