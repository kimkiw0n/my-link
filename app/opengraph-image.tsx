import { ImageResponse } from "next/og";

export const alt = "MyLink - Portfolio in One Link";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 구글 폰트에서 필요한 글자만 서브셋으로 가져오는 함수 (Satori 한글 렌더링용)
async function getFont(text: string, weight: number) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@${weight}&text=${encodeURIComponent(text)}`;
    
    const css = await (
      await fetch(url, {
        headers: {
          // TTF 폰트를 받기 위해 오래된 User-Agent 사용
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
      })
    ).text();

    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

    if (resource) {
      const res = await fetch(resource[1]);
      if (res.status == 200) {
        return await res.arrayBuffer();
      }
    }
  } catch (e) {
    console.error("Failed to fetch font", e);
  }
  return null;
}

export default async function Image() {
  const titleText = "Portfolio in One Link.";
  const subtitleText = "GitHub, 블로그, 수상 이력까지.모든 활동을 한 페이지에 담아 나만의 포트폴리오를 완성하세요.";
  const allText = titleText + subtitleText + "MyLink";

  const fontDataBold = await getFont(allText, 800);
  const fontDataMedium = await getFont(allText, 500);

  const fonts = [];
  if (fontDataBold) {
    fonts.push({ name: "Noto Sans KR", data: fontDataBold, style: "normal" as const, weight: 800 as const });
  }
  if (fontDataMedium) {
    fonts.push({ name: "Noto Sans KR", data: fontDataMedium, style: "normal" as const, weight: 500 as const });
  }

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#09090b", // zinc-950
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "'Noto Sans KR', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Radial Glow */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "100%",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(9, 9, 11, 0) 60%)",
          }}
        />

        {/* Text Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#ffffff", // white
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1.1,
              marginBottom: 32,
              letterSpacing: "-0.04em",
            }}
          >
            <span>Portfolio in</span>
            <span style={{ color: "#3b82f6" }}>One Link.</span>
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#a1a1aa", // zinc-400
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1.5,
              letterSpacing: "-0.02em",
            }}
          >
            <span>GitHub, 블로그, 수상 이력까지.</span>
            <span>모든 활동을 한 페이지에 담아 나만의 포트폴리오를 완성하세요.</span>
          </div>
        </div>

        {/* Mockup Card Wrapper for Centering */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "absolute",
            bottom: -100,
            zIndex: 20,
          }}
        >
          {/* Tilted Card (Dark Mode) */}
          <div
            style={{
              display: "flex",
              transform: "rotate(-4deg)",
              width: 700,
              height: 320,
              backgroundColor: "#18181b", // zinc-900
              borderRadius: 32,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              border: "1px solid #27272a", // zinc-800
              padding: 40,
              flexDirection: "column",
            }}
          >
            {/* Card Header */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#27272a", // zinc-800
                  marginRight: 20,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ width: 160, height: 16, borderRadius: 8, backgroundColor: "#3f3f46" }} />
                <div style={{ width: 120, height: 16, borderRadius: 8, backgroundColor: "#27272a" }} />
              </div>
            </div>

            {/* Card Body - Link Item */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: 72,
                  borderRadius: 20,
                  backgroundColor: "#09090b", // zinc-950
                  border: "1px solid #27272a", // zinc-800
                  padding: "0 20px",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#2563eb", // blue-600
                    marginRight: 20,
                  }}
                />
                <div style={{ width: 240, height: 16, borderRadius: 8, backgroundColor: "#3f3f46" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
