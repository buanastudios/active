/**
 * Buana Studios (v3) - Dribbble Quality Data Engine
 * Updated: Umbrella Architecture (Buana Active + Network)
 */

const BUANA_DATA = {
  activities: [
    {
      id: "act-archery",
      icon: "🏹",
      color: "bg-orange-100 text-orange-600",
      languages: ["English", "Arabic"],
      instructorEn: "Core Mentorship",
      instructorId: "Mentorship Inti",
      nameEn: "Archery & Focus",
      nameId: "Panahan & Fokus",
      descEn: "Building absolute mental clarity and physical stillness under the direct guidance of our Lead Mentor.",
      descId: "Membangun kejernihan mental mutlak dan ketenangan fisik di bawah bimbingan langsung Mentor Utama kami."
    },
    {
      id: "act-swim",
      icon: "🏊‍♂️",
      color: "bg-blue-100 text-blue-600",
      languages: ["English", "Arabic"],
      instructorEn: "Core Mentorship",
      instructorId: "Mentorship Inti",
      nameEn: "Fundamental Swimming",
      nameId: "Renang Dasar",
      descEn: "Developing essential breath control and water survival skills through structured, disciplined routines.",
      descId: "Mengembangkan kontrol napas esensial dan keterampilan bertahan hidup di air melalui rutinitas yang terstruktur dan disiplin."
    },
    {
      id: "act-coding",
      icon: "💻",
      color: "bg-indigo-100 text-indigo-600",
      languages: ["English"],
      instructorEn: "Core Mentorship",
      instructorId: "Mentorship Inti",
      nameEn: "Coding & Design",
      nameId: "Pemrograman & Desain",
      descEn: "Teaching youth to become digital creators using Code and Canva, rather than passive consumers of screens.",
      descId: "Mengajarkan pemuda untuk menjadi kreator digital menggunakan Kode dan Canva, bukan sekadar konsumen layar yang pasif."
    },
    {
      id: "act-aikido",
      icon: "🥋",
      color: "bg-red-100 text-red-600",
      languages: ["Indonesian"],
      instructorEn: "Core & Guest Sensei",
      instructorId: "Inti & Sensei Tamu",
      nameEn: "Aikido Martial Arts",
      nameId: "Seni Bela Diri Aikido",
      descEn: "Foundational Rokyu taught directly by our Lead Mentor, with advanced techniques led by our trusted Sensei partners.",
      descId: "Dasar-dasar Rokyu diajarkan langsung oleh Mentor Utama kami, dengan teknik lanjutan dipimpin oleh mitra Sensei terpercaya kami."
    },
    {
      id: "act-climbing",
      icon: "🧗",
      color: "bg-emerald-100 text-emerald-600",
      languages: ["Indonesian", "English"],
      instructorEn: "Partner Session",
      instructorId: "Sesi Mitra",
      nameEn: "Rock Climbing",
      nameId: "Panjat Tebing",
      descEn: "Advanced physical problem-solving on the wall, guided by certified climbing experts.",
      descId: "Pemecahan masalah fisik tingkat lanjut di dinding, dipandu oleh pakar panjat tebing bersertifikat."
    }
  ],

  milestones: [
    {
      icon: "👂",
      titleEn: "Listening & Focus",
      titleId: "Mendengarkan & Fokus",
      descEn: "Follows basic bilingual commands during activities without needing translation.",
      descId: "Mengikuti instruksi dasar bilingual selama aktivitas tanpa perlu terjemahan."
    },
    {
      icon: "🗣️",
      titleEn: "Conversational Courage",
      titleId: "Keberanian Percakapan",
      descEn: "Initiates requests (e.g., asking for water) using target vocabulary, even if shy.",
      descId: "Memulai permintaan (mis., meminta air) menggunakan kosakata target, meskipun pemalu."
    },
    {
      icon: "🤝",
      titleEn: "Adab in Action",
      titleId: "Adab dalam Tindakan",
      descEn: "Demonstrates patience (Sabr) and brotherhood (Ukhuwah) when a teammate struggles.",
      descId: "Menunjukkan kesabaran (Sabr) dan persaudaraan (Ukhuwah) saat teman satu tim kesulitan."
    }
  ],

  reasons: [
    {
      icon: "💻",
      problemEn: "Digital Creation vs Consumption",
      problemId: "Penciptaan vs Konsumsi Digital",
      solutionEn: "We don't ban screens; we give them purpose. We balance intense outdoor physical routines with indoor skills like Coding and Canva.",
      solutionId: "Kami tidak melarang layar; kami memberinya tujuan. Kami menyeimbangkan rutinitas fisik luar ruangan dengan keterampilan seperti Pemrograman dan Canva."
    },
    {
      icon: "🤝",
      problemEn: "Boutique Mentorship",
      problemId: "Bimbingan Eksklusif",
      solutionEn: "We aren't a massive corporate school. We run small, highly-focused cohorts led by a dedicated Lead Architect to ensure real character growth.",
      solutionId: "Kami bukan sekolah korporat besar. Kami menjalankan kelompok kecil yang sangat fokus dipimpin oleh Arsitek Utama untuk memastikan pertumbuhan karakter yang nyata."
    }
  ],

  upcoming: [
    {
      titleEn: "Weekend Mountain Hike",
      titleId: "Pendakian Gunung Akhir Pekan",
      ageEn: "Ages 12-16",
      ageId: "Usia 12-16",
      scheduleEn: "Saturday, 06:00 AM",
      scheduleId: "Sabtu, 06:00 Pagi",
      color: "bg-orange-500"
    },
    {
      titleEn: "Friday Endurance Swim",
      titleId: "Renang Ketahanan Jumat",
      ageEn: "Ages 8-15",
      ageId: "Usia 8-15",
      scheduleEn: "Friday, 03:00 PM",
      scheduleId: "Jumat, 15:00 Sore",
      color: "bg-emerald-500"
    }
  ],

  // NEW: The Umbrella Network
  network: [
    {
      name: "Buana Systems",
      icon: "⚙️",
      color: "bg-charcoal-800 text-white",
      descEn: "Building robust, offline-first operational software (like T.I.B.Y.A.N. ERP) for disciplined communities.",
      descId: "Membangun perangkat lunak operasional offline-first yang kuat (seperti ERP T.I.B.Y.A.N.) untuk komunitas yang disiplin."
    },
    {
      name: "Buana Spaces",
      icon: "🏗️",
      color: "bg-emerald-600 text-white",
      descEn: "Designing and maintaining physical co-living and productive workspaces for continuous growth.",
      descId: "Merancang dan memelihara ruang hidup bersama fisik dan ruang kerja produktif untuk pertumbuhan berkelanjutan."
    },
    {
      name: "Buana Foundation",
      icon: "🌱",
      color: "bg-sunny-500 text-white",
      descEn: "Our non-profit arm dedicated to social outreach, community registries, and accessible youth mentorship.",
      descId: "Lembaga nirlaba kami yang didedikasikan untuk penjangkauan sosial, pendaftaran komunitas, dan bimbingan pemuda yang dapat diakses."
    }
  ]
};

window.BUANA_DATA = BUANA_DATA;
