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
