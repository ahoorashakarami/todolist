import "./globals.css";

export const metadata = {
  title: "Next Todo List",
  description: "Made by Ahoora Shakarami",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
