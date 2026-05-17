/**
 * Buana Studio v2 - Living Ecosystem Data
 * Focus: Youth Growth, Adab, Meaningful Activities, and Sunnah-Inspired Character
 */

const BUANA_DATA = {
  // 1. Current Initiative: Buana Activities
  activities: [
    {
      id: "act-swimming",
      nameEn: "Endurance Swimming",
      nameId: "Renang Ketahanan",
      descEn: "Building lung capacity, physical resilience, and breath control in a highly disciplined environment.",
      descId: "Membangun kapasitas paru-paru, ketahanan fisik, dan kontrol napas dalam lingkungan yang sangat disiplin.",
      focusEn: "Physical Resilience, Courage",
      focusId: "Ketahanan Fisik, Keberanian"
    },
    {
      id: "act-hiking",
      nameEn: "Mountain Navigation",
      nameId: "Navigasi Pegunungan",
      descEn: "Topographic reading and outdoor survival experiences to cultivate patience and teamwork under pressure.",
      descId: "Membaca topografi dan pengalaman bertahan hidup di alam liar untuk memupuk kesabaran dan kerja tim di bawah tekanan.",
      focusEn: "Sabr, Ukhuwah, Endurance",
      focusId: "Sabr, Ukhuwah, Daya Tahan"
    },
    {
      id: "act-martialarts",
      nameEn: "Martial Arts (Taekwondo)",
      nameId: "Bela Diri (Taekwondo)",
      descEn: "Motoric discipline, self-defense, and mental focus for youth.",
      descId: "Disiplin motorik, bela diri, dan fokus mental untuk remaja.",
      focusEn: "Shaja’ah (Courage), Adab",
      focusId: "Shaja’ah (Keberanian), Adab"
    },
    {
      id: "act-outdoor",
      nameEn: "Outdoor Learning & Craft",
      nameId: "Pembelajaran Alam & Keterampilan",
      descEn: "Hands-on collaborative challenges requiring problem-solving and environmental responsibility.",
      descId: "Tantangan kolaboratif praktis yang membutuhkan pemecahan masalah dan tanggung jawab lingkungan.",
      focusEn: "Amanah, Teamwork",
      focusId: "Amanah, Kerja Tim"
    }
  ],

  // 2. Principles We Cultivate (Sunnah-Inspired)
  principles: [
    {
      title: "Amanah",
      meaningEn: "Trust & Responsibility",
      meaningId: "Kepercayaan & Tanggung Jawab",
      descEn: "Learning responsibility through preparation, punctuality, teamwork, and caring for others.",
      descId: "Belajar tanggung jawab melalui persiapan, ketepatan waktu, kerja tim, dan kepedulian terhadap sesama."
    },
    {
      title: "Ihsan",
      meaningEn: "Excellence & Beauty",
      meaningId: "Keunggulan & Keindahan",
      descEn: "Striving for excellence in every action, whether in physical discipline, code architecture, or daily interactions.",
      descId: "Berusaha mencapai keunggulan dalam setiap tindakan, baik dalam disiplin fisik, arsitektur kode, maupun interaksi sehari-hari."
    },
    {
      title: "Ukhuwah",
      meaningEn: "Brotherhood & Community",
      meaningId: "Persaudaraan & Komunitas",
      descEn: "Building unbreakable social bonds through shared challenges and mutual support in outdoor environments.",
      descId: "Membangun ikatan sosial yang tak terpatahkan melalui tantangan bersama dan saling mendukung di alam terbuka."
    },
    {
      title: "Shaja’ah",
      meaningEn: "Courage & Bravery",
      meaningId: "Keberanian",
      descEn: "Cultivating the mental fortitude to face fears, lead by example, and stand firm in martial arts and daily life.",
      descId: "Menumbuhkan ketangguhan mental untuk menghadapi ketakutan, memimpin dengan memberi teladan, dan berdiri teguh dalam bela diri dan kehidupan."
    },
    {
      title: "Sabr",
      meaningEn: "Patience & Endurance",
      meaningId: "Kesabaran & Ketahanan",
      descEn: "Developing emotional and physical stamina during grueling hikes, cold swims, and complex problem-solving.",
      descId: "Mengembangkan stamina emosional dan fisik selama pendakian berat, renang di air dingin, dan pemecahan masalah kompleks."
    },
    {
      title: "Khidmah",
      meaningEn: "Service to Others",
      meaningId: "Pelayanan kepada Sesama",
      descEn: "Understanding that true leadership is rooted in serving the community and facilitating the growth of peers.",
      descId: "Memahami bahwa kepemimpinan sejati berakar pada pelayanan kepada komunitas dan memfasilitasi pertumbuhan sesama."
    }
  ],

  // 3. Ecosystem Pillars
  pillars: [
    {
      id: "pillar-activities",
      nameEn: "Buana Activities",
      nameId: "Aktivitas Buana",
      descEn: "Experiential outdoor and physical learning programs for youth.",
      descId: "Program pembelajaran fisik dan alam terbuka berbasis pengalaman untuk pemuda.",
      statusEn: "Active",
      statusId: "Aktif",
      statusColor: "sage"
    },
    {
      id: "pillar-learning",
      nameEn: "Buana Learning",
      nameId: "Pembelajaran Buana",
      descEn: "Mentorship environments cultivating technical thinking and adab.",
      descId: "Lingkungan bimbingan yang menumbuhkan pemikiran teknis dan adab.",
      statusEn: "Growing",
      statusId: "Berkembang",
      statusColor: "clay"
    },
    {
      id: "pillar-systems",
      nameEn: "Buana Systems",
      nameId: "Sistem Buana",
      descEn: "Operational infrastructure supporting our community initiatives.",
      descId: "Infrastruktur operasional yang mendukung inisiatif komunitas kami.",
      statusEn: "Supporting",
      statusId: "Mendukung",
      statusColor: "sand"
    },
    {
      id: "pillar-community",
      nameEn: "Buana Community",
      nameId: "Komunitas Buana",
      descEn: "Meaningful gatherings and shared physical spaces for leaders.",
      descId: "Pertemuan bermakna dan ruang fisik bersama bagi para pemimpin.",
      statusEn: "Active",
      statusId: "Aktif",
      statusColor: "sage"
    },
    {
      id: "pillar-labs",
      nameEn: "Buana Labs",
      nameId: "Lab Buana",
      descEn: "Experimental side projects and operational prototypes.",
      descId: "Proyek sampingan eksperimental dan prototipe operasional.",
      statusEn: "Research",
      statusId: "Penelitian",
      statusColor: "sand"
    }
  ],

  // 4. Systems (Backend Infrastructure)
  systems: [
    {
      id: "sys-tibyan",
      nameEn: "T.I.B.Y.A.N. ERP",
      nameId: "ERP T.I.B.Y.A.N.",
      descEn: "The invisible backbone. Offline-first administrative systems for attendance, scheduling, and community ledgers, allowing our instructors to focus on teaching, not paperwork.",
      descId: "Tulang punggung yang tak terlihat. Sistem administrasi offline-first untuk kehadiran, penjadwalan, dan buku kas komunitas, memungkinkan instruktur kami fokus pada pengajaran, bukan dokumen."
    },
    {
      id: "sys-pancakaki",
      nameEn: "Pancakaki Registries",
      nameId: "Registri Pancakaki",
      descEn: "A secure, local-first data tool for tracking student kinship and emergency contacts. It ensures we know exactly who belongs to our community safely.",
      descId: "Alat data local-first yang aman untuk melacak kekerabatan siswa dan kontak darurat. Memastikan kami tahu persis siapa yang tergabung dalam komunitas kami dengan aman."
    }
  ]
};

window.BUANA_DATA = BUANA_DATA;
