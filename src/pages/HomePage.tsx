import HeroArchPoster from "@/components/sections/hero/HeroArchPoster";
import ServicesNightList from "@/components/sections/features/ServicesNightList";
import AboutArchCurve from "@/components/sections/about/AboutArchCurve";
import TestimonialPhotoQuote from "@/components/sections/testimonial/TestimonialPhotoQuote";
import FaqPlusAccordion from "@/components/sections/faq/FaqPlusAccordion";
import ContactPlumForm from "@/components/sections/contact/ContactPlumForm";

export default function HomePage() {
  return (
    <>
      <div id="hero" data-webild-section="HeroArchPoster" data-webild-section-id="HeroArchPoster-1" data-section="hero" className="contents" data-scene>
        <HeroArchPoster
          title="Klinik Mustopa"
          script="Estetika"
          labelLeft="Layanan Medis"
          labelRight="Kecantikan Alami"
          marquee={[
            "Dokter Ahli",
            "Perawatan Aman",
            "Hasil Alami"
          ]}
          imageSrc="https://img.b2bpic.net/free-photo/mature-doctor-talking-nurse-about-diagnosis_1098-18686.jpg"
          imageAlt="modern medical examination room"
          cta={{
            text: "Lihat Layanan",
            href: "#services"
          }}
        />
      </div>

      <div id="services" data-webild-section="ServicesNightList" data-webild-section-id="ServicesNightList-1" data-section="services" data-scene>
        <ServicesNightList
          items={[
            {
              title: "Pemeriksaan Umum",
              description: "Diagnosis dan pengobatan tepat untuk kesehatan harian seluruh anggota keluarga.",
              imageSrc: "https://img.b2bpic.net/free-photo/asian-woman-doctor-breast-cancer-symptoms-risk-factors-treatment-checking-patient-clinic-office_609648-2363.jpg",
              imageAlt: "doctor examining patient with stethoscope"
            },
            {
              title: "Perawatan Wajah",
              description: "Facial medis dan perawatan jerawat untuk tekstur kulit sehat dan bersih.",
              imageSrc: "https://img.b2bpic.net/free-photo/woman-cosmetology-studio-procedures_1157-34906.jpg",
              imageAlt: "cosmetologist applying cream to client face"
            },
            {
              title: "Konsultasi Estetika",
              description: "Analisis kondisi kulit medis untuk mendapatkan rencana perawatan tepat.",
              imageSrc: "https://img.b2bpic.net/free-photo/specialist-patient-discussing-diagnostic-results-modern-medical-office_482257-122832.jpg",
              imageAlt: "doctor and patient reviewing medical results"
            },
            {
              title: "Terapi Kontur",
              description: "Perawatan pengencangan kulit dan penuaan dini dengan hasil alami.",
              imageSrc: "https://img.b2bpic.net/free-photo/close-up-face-young-woman-relaxing-gentle_158595-4582.jpg",
              imageAlt: "woman relaxing during facial treatment"
            },
            {
              title: "Skrining Kesehatan",
              description: "Pemeriksaan laboratorium awal dan cek fisik menyeluruh untuk pencegahan.",
              imageSrc: "https://img.b2bpic.net/free-photo/doctor-patient_1421-67.jpg",
              imageAlt: "doctor discussing results with patient"
            },
            {
              title: "Perawatan Tubuh",
              description: "Terapi klinis untuk merawat kesehatan kulit tubuh dan postur ideal.",
              imageSrc: "https://img.b2bpic.net/free-photo/doctor-putting-facial-mask-woman-s-face_181624-28379.jpg",
              imageAlt: "cosmetologist applying serum to client"
            },
            {
              title: "Tindakan Medis",
              description: "Penanganan cepat dan tepat untuk luka ringan serta konsultasi medis.",
              imageSrc: "https://img.b2bpic.net/free-photo/medical-serious-cute-smart-doctor-lab-coat-working-remotely-computer-with-medicine_140725-166994.jpg",
              imageAlt: "two staff cleaning clinic"
            }
          ]}
          imageSrc="https://img.b2bpic.net/free-photo/still-life-spa_23-2148000417.jpg"
          imageAlt="Still life of spa"
          cta={{
            text: "Hubungi Kami",
            href: "#contact-plum-form"
          }}
        />
      </div>

      <div id="about" data-webild-section="AboutArchCurve" data-webild-section-id="AboutArchCurve-1" data-section="about">
        <AboutArchCurve
          title="Filosofi Klinik Kami"
          label="Layanan Terpercaya dan Profesional"
          placeTitle="KLINIK MUSTOPA"
          description="Kesehatan yang baik adalah fondasi kecantikan yang nyata. Kami hadir memberikan pelayanan medis yang jujur dan mengutamakan keamanan setiap pasien."
          note="Dr. Mustopa, Direktur Medis"
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/experienced-female-medic-practitioner-consulting-patient-health-insurance_482257-126948.jpg",
              imageAlt: "Experienced female medic practitioner consulting a patient on health insurance"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/young-woman-lies-with-closed-eyes-cosmetologist-making-procedure_158595-4613.jpg",
              imageAlt: "Young woman lies with closed eyes, cosmetologist making procedure"
            }
          ]}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialPhotoQuote" data-webild-section-id="TestimonialPhotoQuote-1" data-section="testimonial" data-scene>
        <TestimonialPhotoQuote
          items={[
            {
              quote: "Pelayanan dokter sangat ramah dan sabar. Perawatan wajah di Klinik Mustopa memberikan hasil alami tanpa iritasi.",
              name: "Dewi Kurniawan",
              role: "Pasien Perawatan Wajah"
            },
            {
              quote: "Pemeriksaan kesehatan menyeluruh dan nyaman. Fasilitas bersih serta staf melayani dengan profesional.",
              name: "Agus Halim",
              role: "Pasien Umum"
            }
          ]}
          imageSrc="https://img.b2bpic.net/free-photo/blonde-girl-getting-ready-bathroom_23-2148147465.jpg"
          imageAlt="Blonde girl getting ready in the bathroom"
        />
      </div>

      <div id="faq-plus-accordion" data-webild-section="FaqPlusAccordion" data-webild-section-id="FaqPlusAccordion-1" data-section="faq-plus-accordion">
        <FaqPlusAccordion
          title="Hal Yang Sering Ditanyakan"
          script="Tanya Jawab"
          ariaLabel="Pertanyaan populer Klinik Mustopa"
          cta={{
            text: "Hubungi Kami",
            href: "#contact-plum-form"
          }}
          items={[
            {
              title: "BAGAIMANA CARA MEMBUAT JANJI KONSULTASI?",
              description: "Anda dapat menghubungi kami melalui WhatsApp di  untuk menentukan jadwal kedatangan yang sesuai."
            },
            {
              title: "KAPAN JAM OPERASIONAL KLINIK MUSTOPA?",
              description: "Kami melayani pasien setiap hari Senin hingga Sabtu dari pukul 08.00 sampai 20.00 WIB."
            },
            {
              title: "DI MANA LOKASI KLINIK MUSTOPA?",
              description: "Klinik kami berlokasi strategis di Jl. Kesehatan No. 45, Jakarta Selatan."
            },
            {
              title: "APAKAH KONSULTASI KECANTIKAN BERBAYAR?",
              description: "Konsultasi awal analisis kulit gratis bagi pasien baru yang mengambil paket perawatan estetika."
            },
            {
              title: "BERAPA LAMA EFEK PERAWATAN ESTETIKA BERTAHAN?",
              description: "Hasil perawatan bervariasi sesuai kondisi kulit, rata-rata bertahan antara 3 hingga 6 bulan."
            },
            {
              title: "APAKAH TINDAKAN KECANTIKAN DI SINI AMAN?",
              description: "Semua tindakan dilakukan langsung oleh dokter berpengalaman menggunakan produk medis terdaftar BPOM."
            }
          ]}
        />
      </div>

      <div id="contact-plum-form" data-webild-section="ContactPlumForm" data-webild-section-id="ContactPlumForm-1" data-section="contact-plum-form">
        <ContactPlumForm
          title="Hubungi Kami"
          script="Kontak"
          options={[
            "Konsultasi Kesehatan",
            "Perawatan Estetika",
            "Pemeriksaan Rutin"
          ]}
          submitText="Kirim Pesan"
          labels={{
            name: "Nama Lengkap",
            email: "Alamat Email",
            enquiry: "Jenis Layanan",
            message: "Pesan Anda",
            sending: "Mengirim...",
            sent: "Terkirim",
            thanks: "Terima kasih, kami akan segera menghubungi Anda."
          }}
        />
      </div>
    </>
  );
}
