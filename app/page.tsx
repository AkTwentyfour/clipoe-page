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
} from "lucide-react";

import { AnimatedNumber } from '@/components/motion-primitives/animated-number'

interface Desa {
  nama: string;
  klasifikasi: string;
  poin: number;
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

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedDesa, setSelectedDesa] = useState<Desa | null>();
  const [selectedKriteria, setSelectedKriteria] = useState<Kriteria | null>(
    null
  );

  // Data dummy desa
  const desaList = [
    {
      id: 1,
      nama: "Desa Wisata Borobudur",
      klasifikasi: "Berkembang",
      poin: 75,
    },
    { id: 2, nama: "Desa Wisata Kaliurang", klasifikasi: "Maju", poin: 85 },
    {
      id: 3,
      nama: "Desa Wisata Pentingsari",
      klasifikasi: "Mandiri",
      poin: 92,
    },
    {
      id: 4,
      nama: "Desa Wisata Nglanggeran",
      klasifikasi: "Berkembang",
      poin: 78,
    },
    { id: 5, nama: "Desa Wisata Candirejo", klasifikasi: "Maju", poin: 88 },
  ];

  // 10 Kriteria penilaian
  const kriteriaList = [
    { id: 1, nama: "Kepemimpinan dan Kepengurusan oleh Masyarakat" },
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

  const destinations = [
    {
      title: "Sawah Terasering",
      description: "Nikmati pemandangan sawah bertingkat yang hijau dan asri",
      image:
        "https://www.agoda.com/wp-content/uploads/2024/07/Jatiluwih-rice-terrace-Bali-Featured.jpg",
      rating: 4.8,
      visitors: "500+ pengunjung/bulan",
    },
    {
      title: "Homestay Tradisional",
      description: "Menginap di rumah tradisional dengan suasana pedesaan",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      rating: 4.9,
      visitors: "300+ pengunjung/bulan",
    },
    {
      title: "Wisata Kuliner",
      description: "Rasakan kelezatan masakan tradisional khas desa",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      rating: 4.7,
      visitors: "800+ pengunjung/bulan",
    },
    {
      title: "Kerajinan Lokal",
      description: "Belajar membuat kerajinan tangan dari pengrajin lokal",
      image:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      rating: 4.6,
      visitors: "200+ pengunjung/bulan",
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        // kalau elemen keluar dari viewport (karena sticky nempel), ubah state
        setIsSticky(!entry.isIntersecting);
        setDestination(208);
        setWisatawan(5005);
        setRating(5005);
        setHomestay(50);
      },
    );

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
                  href="#home"
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
                Pesan Sekarang
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
                <a href="#home" className="block py-2 text-gray-700">
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
                  Pesan Sekarang
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
                Tempat Wisata Pilihan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kunjungi berbagai destinasi menarik yang telah kami siapkan
                untuk pengalaman wisata Anda
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((dest, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300 pt-0"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{dest.title}</CardTitle>
                    <CardDescription>{dest.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-semibold">{dest.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-xs">{dest.visitors}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Lihat Detail
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="mx-auto max-w-4xl">
          <Button onClick={handleBack} variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Daftar Desa Wisata</CardTitle>
              <CardDescription>
                Pilih desa untuk melihat detail klasifikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {desaList.map((desa) => (
                <Card
                  key={desa.id}
                  className="cursor-pointer transition-all hover:border-blue-400 hover:shadow-md"
                  onClick={() => handleDesaClick(desa)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {desa.nama}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Klasifikasi:{" "}
                        <span className="font-medium text-blue-600">
                          {desa.klasifikasi}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {desa.poin}
                      </div>
                      <div className="text-xs text-gray-500">Poin</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Detail Desa View
  if (currentView === "detail" && selectedDesa) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="mx-auto max-w-4xl">
          <Button onClick={handleBack} variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <Card className="mb-6 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl mx-6 p-5">
              <CardTitle className="text-2xl">{selectedDesa.nama}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded border-l-4 border-blue-600 bg-blue-50 p-4">
                <p className="text-lg text-gray-800">
                  Desa ini diklasifikasikan sebagai{" "}
                  <span className="font-bold text-blue-600">
                    {selectedDesa.klasifikasi}
                  </span>{" "}
                  dengan poin{" "}
                  <span className="font-bold text-blue-600">
                    {selectedDesa.poin}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {!selectedKriteria ? (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Kriteria Penilaian</CardTitle>
                <CardDescription>
                  Pilih kriteria untuk melihat detail penilaian
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {kriteriaList.map((kriteria) => (
                  <Button
                    key={kriteria.id}
                    onClick={() => handleKriteriaClick(kriteria)}
                    variant="outline"
                    className="h-auto justify-start px-4 py-4 text-left hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div className="flex w-full items-start">
                      <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        {kriteria.id}
                      </div>
                      <span className="text-sm leading-tight font-medium text-gray-700">
                        {kriteria.nama}
                      </span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl">
              <CardHeader>
                <Button
                  onClick={() => setSelectedKriteria(null)}
                  variant="ghost"
                  className="mb-2 -ml-2"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Kembali ke Kriteria
                </Button>
                <CardTitle className="text-xl">
                  Kriteria {selectedKriteria.id}: {selectedKriteria.nama}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Indikator
                        </th>
                        <th className="border border-gray-300 p-3 text-center font-semibold">
                          Nilai
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">
                          Nilai Kriteria
                        </td>
                        <td className="border border-gray-300 p-3 text-center font-bold text-blue-600">
                          {nilaiKriteria[selectedKriteria.id].nilai} /{" "}
                          {nilaiKriteria[selectedKriteria.id].maksimal}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-3">
                          Persentase
                        </td>
                        <td className="border border-gray-300 p-3 text-center font-bold text-green-600">
                          {nilaiKriteria[selectedKriteria.id].persentase}%
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3" colSpan={2}>
                          <div className="mb-2 font-semibold">Deskripsi:</div>
                          <p className="text-gray-700">
                            {nilaiKriteria[selectedKriteria.id].deskripsi}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded border-l-4 border-green-500 bg-green-50 p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Status: </span>
                    {nilaiKriteria[selectedKriteria.id].persentase >= 80
                      ? "Sangat Baik"
                      : nilaiKriteria[selectedKriteria.id].persentase >= 70
                      ? "Baik"
                      : nilaiKriteria[selectedKriteria.id].persentase >= 60
                      ? "Cukup"
                      : "Perlu Peningkatan"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default App;
