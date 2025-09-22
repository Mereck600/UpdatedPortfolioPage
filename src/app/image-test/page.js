// src/app/image-test/page.tsx
import Image from "next/image";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Image test</h1>

      <h2>Next &lt;Image&gt; from /public (no prefix)</h2>
      <Image src="/images/hero.jpg" alt="via next/image" width={600} height={300} />

      <h2>Raw &lt;img&gt; (with prefix)</h2>
      <img src={`${prefix}/images/hero.jpg`} alt="via raw img" width={600} height={300} />

      <h2>Static import (no prefix)</h2>
      {/* @ts-expect-error: ignore type if not TS */}
      <ImportDemo />
    </main>
  );
}

function ImportDemo() {
  // If TypeScript complains, switch this file to .jsx/.tsx accordingly
  // and ensure the image exists at public/images/hero.jpg
  // Or import a real image you have in /public/images
  // import pic from "@/public/images/hero.jpg";
  return <p style={{ opacity: 0.6 }}>Uncomment static import demo when ready.</p>;
}
