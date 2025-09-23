import Image from "next/image";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Diag</h1>
      <p>prefix = <code>{prefix || '(empty)'}</code></p>

      <h2>next/image (auto-prefixed)</h2>
      <Image src="/berry_college.webp" alt="next-image" width={400} height={250} />

      <h2>raw &lt;img&gt; (manual prefix)</h2>
      <img src={`${prefix}/berry_college.webp`} alt="raw-img" width={400} height={250} />
    </main>
  );
}
