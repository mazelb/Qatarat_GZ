import '../../../styles/globals.css';
import type { Metadata } from 'next';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/navigation/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Qatarat Gaza',
    default: 'Qatarat Gaza | Supporting Communities in Gaza',
  },
  description: 'Qatarat Gaza is a charity organization providing humanitarian aid and sustainable solutions to communities in Gaza.',
};

/**
 * Language-specific layout with proper HTML lang attribute
 */
export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className="flex flex-col min-h-screen">
        <Navigation lang={lang} />
        <main className="flex-grow">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
