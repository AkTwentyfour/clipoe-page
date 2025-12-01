"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { ChevronLeft, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  ChevronLeft,
  Users,
  Calendar,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Trees,
  Building2,
  Smartphone,
  Info,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  Tent,
  BedDouble,
  Utensils,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { AnimatedNumber } from "@/components/motion-primitives/animated-number";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@radix-ui/react-dropdown-menu";

import ScoringTable from "@/components/scoring-table"

interface Desa {
  id: number;
  nama: string;
  klasifikasi: string;
  poin: number;
  image: string;
  deskripsi: string;
  lokasi: string;
}

interface Kriteria {
  id: number;
  nama: string;
  maksimal: number;
  presentase: number;
  nilai: string;
  deskripsi: string;
}

type KriteriaDetail = {
  nilai: number;
  maksimal: number;
  persentase: number;
  deskripsi: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const profitData = [
  { month: "Jan", profit: 12000000 },
  { month: "Feb", profit: 15500000 },
  { month: "Mar", profit: 11000000 },
  { month: "Apr", profit: 18000000 },
  { month: "Mei", profit: 24000000 },
  { month: "Jun", profit: 21500000 },
];

// Data Profil Desa (Sesuai Request)
const profilStats = [
  {
    label: "Tahun Berdiri",
    value: "2021",
    icon: Calendar,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Objek Wisata",
    value: "6 Spot",
    icon: Tent,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    label: "Guesthouse",
    value: "10 Unit",
    icon: BedDouble,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    label: "Restoran & Cafe",
    value: "5 Outlet",
    icon: Utensils,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    label: "Rata-rata Pengunjung",
    value: "96 / Bulan",
    icon: Users,
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
];

// Formatter Rupiah untuk Chart
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedDesa, setSelectedDesa] = useState<Desa | null>();
  const [selectedKriteria, setSelectedKriteria] = useState<Kriteria | null>(
    null
  );

  // Helper untuk warna badge berdasarkan klasifikasi
  const getBadgeColor = (klasifikasi: string) => {
    switch (klasifikasi) {
      case "Mandiri":
        return "bg-emerald-500 hover:bg-emerald-600";
      case "Maju":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-amber-500 hover:bg-amber-600";
    }
  };

  const getKriteriaIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Building2 className="h-6 w-6" />; // Kelembagaan
      case 2:
        return <Trees className="h-6 w-6" />; // Lingkungan/Daya Tarik
      case 3:
        return <Users className="h-6 w-6" />; // Sosial/Partisipasi
      case 4:
        return <Smartphone className="h-6 w-6" />; // Digital
      case 5:
        return <ShieldCheck className="h-6 w-6" />; // CHSE/Keamanan
      default:
        return <LayoutGrid className="h-6 w-6" />;
    }
  };

  // Helper warna status
  const getStatusColor = (persentase: number) => {
    if (persentase >= 80)
      return "text-emerald-600 bg-emerald-100 border-emerald-200";
    if (persentase >= 70) return "text-blue-600 bg-blue-100 border-blue-200";
    if (persentase >= 60) return "text-amber-600 bg-amber-100 border-amber-200";
    return "text-red-600 bg-red-100 border-red-200";
  };

  // 10 Kriteria penilaian
  const kriteriaList = [
    { id: 1, nama: "Kepemimpinan oleh Masyarakat" },
    { id: 2, nama: "Perencanaan" },
    { id: 3, nama: "Kelembagaan" },
    { id: 4, nama: "Sumber Daya Manusia" },
    { id: 5, nama: "Keuangan" },
    { id: 6, nama: "Produk dan Daya Tarik" },
    { id: 7, nama: "Pemasaran" },
    { id: 8, nama: "Pelayanan" },
    { id: 9, nama: "Dampak Ekonomi" },
    { id: 10, nama: "Dampak Sosial Budaya dan Lingkungan" },
  ];

  // Data detail nilai per kriteria (dummy)
  const nilaiKriteria: Record<number, KriteriaDetail> = {
    1: {
      nilai: 8,
      maksimal: 10,
      persentase: 80,
      deskripsi:
        "Memiliki struktur organisasi yang jelas dengan kepengurusan aktif",
    },
    2: {
      nilai: 7,
      maksimal: 10,
      persentase: 70,
      deskripsi: "Memiliki rencana pengembangan wilayah dan rencana aksi",
    },
    3: {
      nilai: 7.5,
      maksimal: 10,
      persentase: 75,
      deskripsi: "Kelembagaan terstruktur dengan pembagian tugas yang baik",
    },
    4: {
      nilai: 8,
      maksimal: 10,
      persentase: 80,
      deskripsi: "SDM terlatih dengan sertifikasi di bidang pariwisata",
    },
    5: {
      nilai: 7,
      maksimal: 10,
      persentase: 70,
      deskripsi: "Pengelolaan keuangan transparan dengan laporan berkala",
    },
    6: {
      nilai: 9,
      maksimal: 10,
      persentase: 90,
      deskripsi: "Memiliki produk wisata unik dan beragam atraksi",
    },
    7: {
      nilai: 6,
      maksimal: 10,
      persentase: 60,
      deskripsi: "Strategi pemasaran digital dan offline yang cukup efektif",
    },
    8: {
      nilai: 8.5,
      maksimal: 10,
      persentase: 85,
      deskripsi: "Pelayanan ramah dengan standar operasional yang baik",
    },
    9: {
      nilai: 7.5,
      maksimal: 10,
      persentase: 75,
      deskripsi: "Memberikan dampak ekonomi positif bagi masyarakat lokal",
    },
    10: {
      nilai: 7,
      maksimal: 10,
      persentase: 70,
      deskripsi: "Menjaga kelestarian budaya dan lingkungan dengan baik",
    },
  };

  const handleDesaClick = (desa: any) => {
    setSelectedDesa(desa);
    setCurrentView("detail");
    setSelectedKriteria(null);
  };

  const handleKriteriaClick = (kriteria: any) => {
    setSelectedKriteria(kriteria);
  };

  const handleBack = () => {
    if (selectedKriteria) {
      setSelectedKriteria(null);
    } else if (currentView === "detail") {
      setCurrentView("list");
      setSelectedDesa(null);
    } else if (currentView === "list") {
      setCurrentView("home");
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const destinations = [
  //   {
  //     title: "Sawah Terasering",
  //     description: "Nikmati pemandangan sawah bertingkat yang hijau dan asri",
  //     image:
  //       "https://www.agoda.com/wp-content/uploads/2024/07/Jatiluwih-rice-terrace-Bali-Featured.jpg",
  //     rating: 4.8,
  //     visitors: "500+ pengunjung/bulan",
  //   },
  //   {
  //     title: "Homestay Tradisional",
  //     description: "Menginap di rumah tradisional dengan suasana pedesaan",
  //     image:
  //       "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  //     rating: 4.9,
  //     visitors: "300+ pengunjung/bulan",
  //   },
  //   {
  //     title: "Wisata Kuliner",
  //     description: "Rasakan kelezatan masakan tradisional khas desa",
  //     image:
  //       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  //     rating: 4.7,
  //     visitors: "800+ pengunjung/bulan",
  //   },
  //   {
  //     title: "Kerajinan Lokal",
  //     description: "Belajar membuat kerajinan tangan dari pengrajin lokal",
  //     image:
  //       "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
  //     rating: 4.6,
  //     visitors: "200+ pengunjung/bulan",
  //   },
  // ];

  const desaList: Desa[] = [
    {
      id: 1,
      nama: "Desa Wisata Kebonsari",
      klasifikasi: "Mandiri",
      poin: 94,
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      deskripsi: "Desa wisata dengan panorama alam yang memukau",
      lokasi: "Kecamatan Magelang Utara",
    },
    {
      id: 2,
      nama: "Desa Wisata Kaliurang",
      klasifikasi: "Maju",
      poin: 85,
      image:
        "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80",
      deskripsi: "Destinasi wisata pegunungan dengan udara sejuk",
      lokasi: "Kecamatan Candimulyo",
    },
    {
      id: 3,
      nama: "Desa Wisata Pentingsari",
      klasifikasi: "Maju",
      poin: 88,
      image:
        "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80",
      deskripsi: "Pengalaman homestay tradisional yang autentik",
      lokasi: "Kecamatan Pakis",
    },
    {
      id: 4,
      nama: "Wisata Nglanggeran",
      klasifikasi: "Berkembang",
      poin: 78,
      image:
        "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&q=80",
      deskripsi: "Wisata gunung dengan pemandangan spektakuler",
      lokasi: "Kecamatan Grabag",
    },
    {
      id: 5,
      nama: "Desa Wisata Candirejo",
      klasifikasi: "Berkembang",
      poin: 75,
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
      deskripsi: "Wisata budaya dengan nilai sejarah tinggi",
      lokasi: "Kecamatan Borobudur",
    },
    {
      id: 6,
      nama: "Wisata Ngargomulyo",
      klasifikasi: "Berkembang",
      poin: 72,
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
      deskripsi: "Desa dengan kerajinan tangan khas lokal",
      lokasi: "Kecamatan Dukun",
    },
  ];

  const activities = [
    {
      icon: Users,
      title: "Edukasi Pertanian",
      desc: "Belajar bertani dan berkebun",
    },
    {
      icon: Calendar,
      title: "Festival Budaya",
      desc: "Acara budaya setiap bulan",
    },
    {
      icon: MapPin,
      title: "Tracking Alam",
      desc: "Jelajahi keindahan alam desa",
    },
  ];
  

  const [destination, setDestination] = useState(0);
  const [wisatawan, setWisatawan] = useState(0);
  const [rating, setRating] = useState(0);
  const [homestay, setHomestay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // kalau elemen keluar dari viewport (karena sticky nempel), ubah state
      setIsSticky(!entry.isIntersecting);
      setDestination(208);
      setWisatawan(5005);
      setRating(5005);
      setHomestay(50);
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Home View
  if (currentView === "home") {
    return (
      // <div className="flex flex-col gap-2 min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      //   {/* <ModeToggle /> */}
      //   <Card className="w-full max-w-md shadow-xl">
      //     <CardHeader className="space-y-4 text-center">
      //       <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
      //         <MapPin className="h-8 w-8 text-white" />
      //       </div>
      //       <CardTitle className="text-3xl">
      //         Sistem Klasifikasi Desa Wisata
      //       </CardTitle>
      //       <CardDescription className="text-base">
      //         Kabupaten Magelang
      //       </CardDescription>
      //     </CardHeader>
      //     <CardContent>
      //       <Button
      //         onClick={() => setCurrentView("list")}
      //         className="h-14 w-full bg-blue-600 text-lg font-semibold hover:bg-blue-700"
      //       >
      //         Klasifikasi Desa Wisata
      //       </Button>
      //     </CardContent>
      //   </Card>
      // </div>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-50 mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl text-gray-800">
                  Desa Wisata Magelang
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                <a
                  href="/"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Beranda
                </a>
                <a
                  href="#destinasi"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Destinasi
                </a>
                <a
                  href="#aktivitas"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Aktivitas
                </a>
                <a
                  href="#kontak"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Kontak
                </a>
              </div>

              <Button className="hidden md:block bg-green-600 hover:bg-green-700">
                Register
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4">
                <a href="/" className="block py-2 text-gray-700">
                  Beranda
                </a>
                <a href="#destinasi" className="block py-2 text-gray-700">
                  Destinasi
                </a>
                <a href="#aktivitas" className="block py-2 text-gray-700">
                  Aktivitas
                </a>
                <a href="#kontak" className="block py-2 text-gray-700">
                  Kontak
                </a>
                <Button className="w-full mt-2 bg-green-600 hover:bg-green-700">
                  Register
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div ref={ref}></div>
        <section
          id="home"
          className="relative h-[600px] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4">
            {/* <Badge className="mb-4 bg-green-600 text-white">
              Destinasi Terbaik 2024
            </Badge> */}
            <h1 className="text-5xl md:text-6xl !leading-none font-light mb-4">
              Wonderful Magelang
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rasakan pengalaman wisata pedesaan yang autentik dengan
              pemandangan alam yang memukau
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-gray-800 hover:bg-gray-100"
                onClick={() => setCurrentView("list")}
              >
                Lihat Klasifikasi Desa Wisata
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex justify-center items-center text-4xl font-bold">
                  <AnimatedNumber
                    springOptions={{
                      bounce: 0,
                      duration: 3000,
                    }}
                    value={destination}
                  />
                  <div>+</div>
                </div>
                <div className="text-green-100 mt-2">Destinasi Wisata</div>
              </div>
              <div>
                <div className="flex justify-center items-center text-4xl font-bold">
                  <AnimatedNumber
                    springOptions={{
                      bounce: 0,
                      duration: 3000,
                    }}
                    value={wisatawan}
                  />
                  <div>+</div>
                </div>
                <div className="text-green-100 mt-2">Wisatawan/Tahun</div>
              </div>
              <div>
                <div className="flex justify-center items-center text-4xl font-bold">
                  <AnimatedNumber
                    springOptions={{
                      bounce: 0,
                      duration: 3000,
                    }}
                    value={rating}
                  />
                  <div>.8</div>
                </div>
                <div className="text-green-100 mt-2">Rating Pengunjung</div>
              </div>
              <div>
                <div className="flex justify-center items-center text-4xl font-bold">
                  <AnimatedNumber
                    springOptions={{
                      bounce: 0,
                      duration: 3000,
                    }}
                    value={homestay}
                  />
                  <div>+</div>
                </div>
                <div className="text-green-100 mt-2">Homestay Tersedia</div>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section id="destinasi" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* <Badge className="mb-4">Destinasi Populer</Badge> */}
              <h2 className="text-4xl font-normal border-b-0 text-gray-800 mb-4">
                List Desa Wisata
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kunjungi berbagai destinasi menarik yang telah kami siapkan
                untuk pengalaman wisata Anda
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {desaList.slice(0, 4).map((dest, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300 pt-0"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.nama}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{dest.nama}</CardTitle>
                    <CardDescription>{dest.deskripsi}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-semibold">{dest.poin}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-xs">{dest.poin}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleDesaClick(dest)}
                    >
                      Lihat Detail
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="cursor-pointer text-center w-full mt-9">
              <a onClick={() => setCurrentView("list")}>Lihat Selengkapnya</a>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section
          id="aktivitas"
          className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* <Badge className="mb-4 bg-green-600">Aktivitas Seru</Badge> */}
              <h2 className="text-4xl font-normal border-b-0 text-gray-800 mb-4">
                Yang Bisa Anda Lakukan
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="h-8 w-8 text-green-600" />
                      </div>
                      <CardTitle>{activity.title}</CardTitle>
                      <CardDescription>{activity.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              {/* <Badge className="mb-4 !px-3 py-1">Testimoni</Badge> */}
              <h2 className="text-4xl font-normal border-b-0 text-gray-800 mb-4">
                Kata Mereka Tentang Kami
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-200 rounded-full mr-3"></div>
                      <div>
                        <CardTitle className="text-base">
                          Pengunjung {i}
                        </CardTitle>
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="h-4 w-4 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      "Pengalaman yang luar biasa! Suasana desa yang tenang dan
                      pemandangan yang indah membuat liburan kami sangat
                      berkesan."
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600 text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-normal mb-4 border-b-0">
              Siap Untuk Petualangan Baru?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Pesan paket wisata Anda sekarang dan dapatkan diskon spesial
              hingga 20%
            </p>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Hubungi Kami Sekarang
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer
          id="kontak"
          className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-green-500" />
                  <span className="ml-2 font-bold">Desa Wisata</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Destinasi wisata pedesaan terbaik dengan pengalaman autentik
                  dan berkesan
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Tautan Cepat</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>
                    <a href="#" className="hover:text-white">
                      Tentang Kami
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Paket Wisata
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Galeri
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Kontak</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>info@desawisata.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-green-500">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="hover:text-green-500">
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              © 2024 Desa Wisata Magelang. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // List Desa View
  if (currentView === "list") {
    return (
      <div className="min-h-screen ">
        {/* navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-50 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl text-gray-800">
                  Desa Wisata Magelang
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                <a
                  href="/"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Beranda
                </a>
                <a
                  href="#destinasi"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Destinasi
                </a>
                <a
                  href="#aktivitas"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Aktivitas
                </a>
                <a
                  href="#kontak"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Kontak
                </a>
              </div>

              <Button className="hidden md:block bg-green-600 hover:bg-green-700">
                Register
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4">
                <a href="/" className="block py-2 text-gray-700">
                  Beranda
                </a>
                <a href="#destinasi" className="block py-2 text-gray-700">
                  Destinasi
                </a>
                <a href="#aktivitas" className="block py-2 text-gray-700">
                  Aktivitas
                </a>
                <a href="#kontak" className="block py-2 text-gray-700">
                  Kontak
                </a>
                <Button className="w-full mt-2 bg-green-600 hover:bg-green-700">
                  Register
                </Button>
              </div>
            )}
          </div>
        </nav>
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header Section */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Button
                onClick={handleBack}
                variant="ghost"
                className="mb-2 pl-0 text-muted-foreground hover:text-primary hover:bg-transparent"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Kembali ke Dashboard
              </Button>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Jelajahi Desa Wisata
              </h1>
              <p className="text-muted-foreground mt-1">
                Temukan potensi dan keindahan desa wisata terbaik di wilayah
                ini.
              </p>
            </div>
          </div>

          {/* Grid Content */}
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {desaList.map((desa) => (
              <motion.div
                key={desa.id}
                variants={cardVariants}
                // whileHover={{ y: -5 }} // Efek naik sedikit saat hover
                className="h-full"
              >
                <Card className="group h-full overflow-hidden border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl ring-1 ring-gray-100 pt-0">
                  {/* Image Section */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <motion.img
                      src={desa.image}
                      alt={desa.nama}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Badge Klasifikasi (Top Right) */}
                    <Badge
                      className={`absolute right-3 top-3 z-20 shadow-sm border-0 ${getBadgeColor(
                        desa.klasifikasi
                      )}`}
                    >
                      {desa.klasifikasi}
                    </Badge>

                    {/* Score (Bottom Right over Image) */}
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm shadow-sm">
                      <Trophy className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-gray-800">
                        {desa.poin}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-1 text-xl group-hover:text-blue-600 transition-colors">
                      {desa.nama}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {desa.lokasi}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                      {desa.deskripsi}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      className="w-full group/btn"
                      variant="outline"
                      onClick={() => handleDesaClick(desa)}
                    >
                      Lihat Detail
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Footer */}
        <footer
          id="kontak"
          className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-green-500" />
                  <span className="ml-2 font-bold">Desa Wisata</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Destinasi wisata pedesaan terbaik dengan pengalaman autentik
                  dan berkesan
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Tautan Cepat</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>
                    <a href="#" className="hover:text-white">
                      Tentang Kami
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Paket Wisata
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Galeri
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Kontak</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>info@desawisata.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-green-500">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="hover:text-green-500">
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              © 2024 Desa Wisata Magelang. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Detail Desa View
  if (currentView === "detail" && selectedDesa) {
    const currentNilai = selectedKriteria
      ? nilaiKriteria[selectedKriteria.id]
      : null;

    return (

      <>
        {/* Navbar */}
        <nav className="bg-white shadow-md sticky top-0 z-50 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl text-gray-800">
                  Desa Wisata Magelang
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                <a
                  href="/"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Beranda
                </a>
                <a
                  href="#destinasi"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Destinasi
                </a>
                <a
                  href="#aktivitas"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Aktivitas
                </a>
                <a
                  href="#kontak"
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  Kontak
                </a>
              </div>

              <Button className="hidden md:block bg-green-600 hover:bg-green-700">
                Register
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4">
                <a href="/" className="block py-2 text-gray-700">
                  Beranda
                </a>
                <a href="#destinasi" className="block py-2 text-gray-700">
                  Destinasi
                </a>
                <a href="#aktivitas" className="block py-2 text-gray-700">
                  Aktivitas
                </a>
                <a href="#kontak" className="block py-2 text-gray-700">
                  Kontak
                </a>
                <Button className="w-full mt-2 bg-green-600 hover:bg-green-700">
                  Register
                </Button>
              </div>
            )}
          </div>
        </nav>

        <div className="min-h-screen p-4 md:p-0">

          <div className="mx-auto max-w-4xl space-y-6">
            {/* 1. Navigation Back */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                onClick={handleBack}
                variant="ghost"
                className="group pl-0 text-slate-600 hover:text-blue-600 hover:bg-transparent"
              >
                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Kembali ke Daftar Desa
              </Button>
            </motion.div>

            {/* 2. Hero Card: Informasi Desa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-6">
                {/* 1. HERO CARD (EXISTING) */}
                <Card className="overflow-hidden border-none shadow-xl ring-1 ring-slate-900/5 pt-0">
                  <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 sm:p-8 text-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-sm"
                          >
                            Desa Wisata
                          </Badge>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                          {selectedDesa.nama}
                        </h1>
                      </div>

                      {/* Score Circle */}
                      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                        <div className="text-right">
                          <p className="text-xs font-medium text-blue-100 uppercase tracking-wider">
                            Total Poin
                          </p>
                          <p className="text-3xl font-extrabold">
                            {selectedDesa.poin}
                          </p>
                        </div>
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-400 text-yellow-900 shadow-lg">
                          <Trophy className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="bg-white p-6 flex flex-col sm:flex-row items-center gap-4 text-sm">
                    <div className="flex-1 flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-900 w-full">
                      <Info className="h-5 w-5 text-blue-600 shrink-0" />
                      <p>
                        Status saat ini adalah{" "}
                        <span className="font-bold">
                          {selectedDesa.klasifikasi}
                        </span>
                        . Tingkatkan aspek penilaian untuk naik ke klasifikasi
                        berikutnya.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {currentView == "detail"}

                {/* 2. STATISTIK GRID (NEW) */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {profilStats.map((stat, idx) => (
                    <Card
                      key={idx}
                      className="border-none shadow-md ring-1 ring-slate-900/5 hover:bg-slate-50 transition-colors"
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full gap-2">
                        <div
                          className={`p-3 rounded-full ${stat.bg} ${stat.color} mb-1`}
                        >
                          <stat.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                            {stat.label}
                          </p>
                          <p className="text-lg font-bold text-slate-800">
                            {stat.value}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* 3. CHART & MAP SECTION (NEW) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Grafik Profit (2/3 width on desktop) */}
                  <Card className="lg:col-span-2 border-none shadow-lg ring-1 ring-slate-900/5">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            Grafik Profit Desa
                          </CardTitle>
                          <p className="text-sm text-slate-500">
                            Performa pendapatan 6 bulan terakhir
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1"
                        >
                          <DollarSign className="h-3 w-3" /> Profit Positif
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-0">
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={profitData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id="colorProfit"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#10b981"
                                  stopOpacity={0.2}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#10b981"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="month"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: "#64748b", fontSize: 12 }}
                              dy={10}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              tick={{ fill: "#64748b", fontSize: 12 }}
                              tickFormatter={(value) => `${value / 1000000}jt`}
                            />
                            <Tooltip
                              formatter={(value: number) => [
                                formatRupiah(value),
                                "Profit",
                              ]}
                              contentStyle={{
                                borderRadius: "8px",
                                border: "none",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="profit"
                              stroke="#10b981"
                              strokeWidth={3}
                              fillOpacity={1}
                              fill="url(#colorProfit)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Peta Lokasi (1/3 width on desktop) */}
                  <Card className="border-none shadow-lg ring-1 ring-slate-900/5 flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-red-500" />
                        Lokasi Desa
                      </CardTitle>
                      <p className="text-sm text-slate-500">
                        Titik lokasi administratif
                      </p>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 min-h-[250px] relative">
                      {/* Embed Google Maps Dummy (Magelang Area) */}
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.088237955518!2d110.2246473759451!3d-7.565342974720978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a884400552733%3A0xc3f7a63319084807!2sKebonsari%2C%20Borobudur%2C%20Magelang%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1709228394021!5m2!1sen!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: "300px" }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full lg:rounded-b-xl"
                      />

                      {/* Overlay Info (Optional) */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-slate-200 text-xs">
                        <p className="font-semibold text-slate-800">
                          Desa Wisata Kebonsari
                        </p>
                        <p className="text-slate-500">
                          Kec. Borobudur, Magelang, Jawa Tengah
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>

            {/* 3. Content Area: Switch between Grid and Detail */}
            <AnimatePresence mode="wait">
              {!selectedKriteria ? (
                // --- STATE A: LIST KRITERIA (GRID) ---
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 border-b-0">
                        Kriteria Penilaian
                      </h2>
                      <p className="text-slate-500 text-sm">
                        Pilih aspek untuk melihat detail skor
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {kriteriaList.map((kriteria, index) => (
                      <motion.div
                        key={kriteria.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Button
                          variant="outline"
                          className="group relative h-auto w-full flex-col items-start p-6 hover:border-green-400 hover:shadow-md transition-all duration-300 bg-white"
                          onClick={() => handleKriteriaClick(kriteria)}
                        >
                          <div className="flex w-full items-center justify-between mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                              {getKriteriaIcon(kriteria.id)}
                            </div>
                            <Badge
                              variant="outline"
                              className="text-slate-500 group-hover:border-green-200"
                            >
                              ID: {kriteria.id}
                            </Badge>
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-lg whitespace-normal text-slate-800 group-hover:text-green-700">
                              {kriteria.nama}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                              Klik untuk lihat detail indikator
                            </p>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // --- STATE B: DETAIL KRITERIA ---
                <motion.div
                  key="detail-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-xl border-none ring-1 ring-slate-900/5 overflow-hidden mb-6">
                    <CardHeader className="border-b bg-slate-50/50 pb-4">
                      <div className="flex items-center justify-between">
                        <Button
                          onClick={() => setSelectedKriteria(null)}
                          variant="ghost"
                          size="sm"
                          className="-ml-2 text-slate-600 hover:text-green-600"
                        >
                          <ChevronLeft className="mr-1 h-4 w-4" />
                          Kembali ke Kriteria
                        </Button>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white shadow-sm">
                          {getKriteriaIcon(selectedKriteria.id)}
                        </div>
                        <CardTitle className="text-xl">
                          {selectedKriteria.nama}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 sm:p-8 space-y-8">
                      {currentNilai && (
                        <>
                          {/* Section 1: Score Visualization */}
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <span className="text-sm font-medium text-slate-500">
                                Perolehan Nilai
                              </span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-extrabold text-slate-900">
                                  {currentNilai.nilai}
                                </span>
                                <span className="text-lg text-slate-400 font-medium">
                                  / {currentNilai.maksimal}
                                </span>
                              </div>
                              <progress
                                value={currentNilai.persentase}
                                className="h-2.5 bg-slate-100"
                                // Custom color prop or CSS class for the indicator usually handled in global CSS or inline styles
                                // Assuming default shadcn/radix behavior uses bg-primary
                              />
                              <p className="text-xs text-slate-400 pt-1">
                                Akumulasi poin dari seluruh indikator{" "}
                                {selectedKriteria.nama.toLowerCase()}.
                              </p>
                            </div>

                            <div className="flex flex-col justify-center gap-3">
                              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                                <span className="text-sm font-medium text-slate-600">
                                  Persentase
                                </span>
                                <span
                                  className={`font-bold ${
                                    currentNilai.persentase >= 70
                                      ? "text-green-600"
                                      : "text-amber-600"
                                  }`}
                                >
                                  {currentNilai.persentase}%
                                </span>
                              </div>

                              {/* Status Banner */}
                              <div
                                className={`flex items-center gap-3 rounded-lg border p-3 ${getStatusColor(
                                  currentNilai.persentase
                                )}`}
                              >
                                {currentNilai.persentase >= 70 ? (
                                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 shrink-0" />
                                )}
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                                    Status Penilaian
                                  </p>
                                  <p className="font-bold">
                                    {currentNilai.persentase >= 80
                                      ? "Sangat Baik"
                                      : currentNilai.persentase >= 70
                                      ? "Baik"
                                      : currentNilai.persentase >= 60
                                      ? "Cukup"
                                      : "Perlu Peningkatan"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Section 2: Deskripsi */}
                          <div>
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
                              <Info className="h-4 w-4 text-green-500" />
                              Catatan Evaluasi
                            </h4>
                            <div className="rounded-xl bg-slate-50 p-5 text-slate-700 leading-relaxed text-sm border border-slate-100">
                              {currentNilai.deskripsi}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  <ScoringTable></ScoringTable>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <footer
          id="kontak"
          className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-green-500" />
                  <span className="ml-2 font-bold">Desa Wisata</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Destinasi wisata pedesaan terbaik dengan pengalaman autentik
                  dan berkesan
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Tautan Cepat</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>
                    <a href="#" className="hover:text-white">
                      Tentang Kami
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Paket Wisata
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Galeri
                    </a>
                  </div>
                  <div>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Kontak</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>info@desawisata.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-green-500">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="hover:text-green-500">
                    <Facebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              © 2024 Desa Wisata Magelang. All rights reserved.
            </div>
          </div>
        </footer>
      </>
    );
  }

  return null;
};

export default App;