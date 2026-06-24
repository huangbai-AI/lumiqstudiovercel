import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--cream)" }}>
      <div style={{ maxWidth: 400, textAlign: "center" }}>
        <h1 style={{ fontSize: "7rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>404</h1>
        <h2 style={{ marginTop: "1rem", fontSize: "1.25rem", fontWeight: 600, color: "var(--ink)" }}>Page not found</h2>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "var(--ink-3)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link href="/" className="btn btn-navy">Go home</Link>
        </div>
      </div>
    </div>
  );
}
