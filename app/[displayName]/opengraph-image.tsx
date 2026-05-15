import { ImageResponse } from "next/og";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const alt = "MyLink Profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 60; // 60 seconds

export default async function Image({ params }: { params: Promise<{ displayName: string }> }) {
  const { displayName } = await params;

  // 1. 유저 조회
  const userQuery = query(
    collection(db, "users"),
    where("displayName", "==", displayName)
  );
  const userSnapshot = await getDocs(userQuery);

  if (userSnapshot.empty) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#09090b",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          User Not Found
        </div>
      ),
      { ...size }
    );
  }

  const userData = userSnapshot.docs[0].data();
  const username = userData.username || "User";
  const bio = userData.bio || "";
  const photoURL = userData.photoURL;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #09090b, #18181b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#27272a", // zinc-800
            borderRadius: 48,
            padding: "80px",
            border: "1px solid #3f3f46", // zinc-700
            width: "80%",
            maxWidth: 800,
          }}
        >
          {photoURL ? (
            <img
              src={photoURL}
              width="200"
              height="200"
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                border: "4px solid #3f3f46",
                objectFit: "cover",
                marginBottom: 40,
              }}
            />
          ) : (
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: "#3f3f46",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 80,
                color: "white",
                marginBottom: 40,
                border: "4px solid #52525b",
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: "white",
                marginBottom: 16,
              }}
            >
              {username}
            </span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 600,
                color: "#a1a1aa", // zinc-400
                marginBottom: 32,
              }}
            >
              @{displayName}
            </span>
            
            {bio && (
              <span
                style={{
                  fontSize: 32,
                  color: "#d4d4d8", // zinc-300
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {bio}
              </span>
            )}
          </div>
        </div>

        {/* Footer Branding */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <span style={{ color: "#71717a", fontSize: 24, fontWeight: 600 }}>
            Powered by MyLink
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
