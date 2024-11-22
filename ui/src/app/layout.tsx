import "./globals.css";

export const metadata = {
  title: "Server-Sent Events Demo",
  description: "Server-Sent Events Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
