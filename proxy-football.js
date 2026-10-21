export default async (req, context) => {
  const API_KEY = "qxz_YHPvi67q9YVorqd0wR4avF4h";
  const { searchParams } = new URL(req.url);
  const playerName = searchParams.get("q");

  if (!playerName) {
    return new Response(JSON.stringify({ error: "请输入球员名字" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  const targetUrl = `https://www.qiuxiaoce.com/wp-json/abv2-creator/v1/players?q=${encodeURIComponent(playerName)}`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "请求失败: " + err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
};
