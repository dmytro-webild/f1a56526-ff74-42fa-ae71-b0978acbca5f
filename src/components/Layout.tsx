import { Outlet } from "react-router-dom";
import NavbarSealCorner from "@/components/navbars/NavbarSealCorner";
import FooterPlumPhone from "@/components/sections/footer/FooterPlumPhone";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="outline" data-card="frame" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarSealCorner
          brand="Klinik Mustopa"
          cta={{
            text: "Hubungi Kami",
            href: "#contact-plum-form"
          }}
        />
      </header>
      <main className="flex-grow" data-button="outline" data-card="frame" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterPlumPhone
          brand="Klinik Mustopa"
          email="info@klinikmustopa.com"
          address={[
            "Jl. Kesehatan No. 45",
            "Jakarta Selatan"
          ]}
          columns={[
            {
              title: "Layanan Utama",
              links: [
                {
                  text: "Kesehatan Umum",
                  href: "#services"
                },
                {
                  text: "Perawatan Kecantikan",
                  href: "#services"
                },
                {
                  text: "Konsultasi Dokter",
                  href: "#services"
                }
              ]
            },
            {
              title: "Informasi Klinik",
              links: [
                {
                  text: "Tentang Kami",
                  href: "#about"
                },
                {
                  text: "Testimoni Pasien",
                  href: "#testimonial"
                },
                {
                  text: "Tanya Jawab",
                  href: "#faq-plus-accordion"
                }
              ]
            },
            {
              title: "Hubungi Kami",
              links: [
                {
                  text: "Konsultasi",
                  href: "#contact-plum-form"
                },
                {
                  text: "Kebijakan Privasi",
                  href: "#"
                },
                {
                  text: "Syarat & Ketentuan",
                  href: "#"
                }
              ]
            }
          ]}
          legal="© 2026 Klinik Mustopa. Seluruh hak cipta dilindungi."
          toTopText="Ke atas"
          phone=""
        />
      </footer>
    </div>
  );
}
