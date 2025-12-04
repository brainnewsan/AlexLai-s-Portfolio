import Navbar from './components/Navbar';
import './globals.css'; // 假設您有這個全域 CSS 檔案

export const metadata = {
  title: "Alex's Portfolio",
  description: 'A Multimedia Designer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}