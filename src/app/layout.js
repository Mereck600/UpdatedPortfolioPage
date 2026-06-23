import './globals.css';
import ThemeRegistry from '@/app/ThemeRegistry';
import Providers from '@/components/Providers';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'Mereck McGowan – Portfolio',
  description: 'Portfolio of Mereck McGowan',
  icons: {
    icon: '/logo.png',   
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
