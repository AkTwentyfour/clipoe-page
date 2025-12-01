"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { number } from "motion/react";

// Data Penilaian Lengkap (Clean Data)
const penilaianData = [
  // KRITERIA 1
  {
    no: "1",
    kriteria: "Kepemilikan dan Kepengurusan oleh Masyarakat",
    subKriteria: "1.1 Legalitas lembaga/kelompok desa wisata dan unit usaha desa sebagai badan usaha mengelola Desa Wisata dengan berkolaborasi bersama Kelompok Sadar Wisata (Pokdarwis)",
    indikator: "1.1.a Legalitas kepemilikan pengelola desa wisata",
    poin: 2,
    jawaban: "b. Terdapat Pokdarwis yang sudah aktif",
  },
  {
    no: "1",
    kriteria: "",
    subKriteria: "1.2 Terdapat rencana pengelolaan yang efektif dan transparan",
    indikator: "1.2.a Perencanaan",
    poin: 2,
    jawaban: "c. Memiliki rencana pengembangan wilayah",
  },
  {
    no: "1",
    kriteria: "",
    subKriteria: "1.2 Terdapat rencana pengelolaan yang efektif dan transparan",
    indikator: "1.2.b Basis data perencanaan",
    poin: 2,
    jawaban: "c. Memiliki rencana pembangunan jangka menengah desa yang berisi pengembangan pariwisata secara umum",
  },
  {
    no: "1",
    kriteria: "",
    subKriteria: "1.2 Terdapat rencana pengelolaan yang efektif dan transparan",
    indikator: "1.2.c Rencana tata ruang",
    poin: 2,
    jawaban: "b. Terdapat konsep zonasi pengembangan wisata",
  },
  {
    no: "1",
    kriteria: "",
    subKriteria: "1.3 Pengelolaan melalui kerjasama pemerintah desa dengan pihak yang akan mengelola desa wisata",
    indikator: "1.3.a Proses administrasi bisnis",
    poin: 2,
    jawaban: "b. Terdapat pencatatan keuangan sederhana (dana masuk dan keluar)",
  },
  {
    no: "1",
    kriteria: "",
    subKriteria: "1.3 Pengelolaan melalui kerjasama pemerintah desa dengan pihak yang akan mengelola desa wisata",
    indikator: "1.3.b Proses pengelolaan yang profesional",
    poin: 2,
    jawaban: "b. Sudah memiliki pembagian tugas dan fungsi secara profesional, c. Namun pembagian tugas dan fungsi belum terjadi secara rutin",
  },
  {
    no: "1",
    kriteria: "",
    subKriteria: "1.3 Pengelolaan melalui kerjasama pemerintah desa dengan pihak yang akan mengelola desa wisata",
    indikator: "1.3.c Mitigasi risiko bencana dan kecelakaan kerja",
    poin: 2,
    jawaban: "b. Memiliki rencana mitigasi kecelakaan di wilayah desa wisata",
  },
  // KRITERIA 2
  {
    no: "2",
    kriteria: "Partisipasi masyarakat lokal",
    subKriteria: "2.1 Partisipasi masyarakat lokal dalam pengelolaan desa wisata",
    indikator: "2.1.a Jumlah masyarakat yang bergelut di usaha desa wisata",
    poin: 4,
    jawaban: "Terdapat 1 kelompok masyarakat yang didelegasikan khusus mengurus satu aktivitas pariwisata (divisi/bidang)",
  },
  {
    no: "2",
    kriteria: "",
    subKriteria: "2.1 Partisipasi masyarakat lokal dalam pengelolaan desa wisata",
    indikator: "2.1.b Pemanfaatan dan pemberdayaan sumber daya lokal",
    poin: 4,
    jawaban: "100% makanan minuman, atraksi, dan fasilitas operasional diproduksi di internal desa wisata",
  },
  {
    no: "2",
    kriteria: "",
    subKriteria: "2.1 Partisipasi masyarakat lokal dalam pengelolaan desa wisata",
    indikator: "2.1.c Bentuk Partisipasi masyarakat dalam layanan wisata",
    poin: 4,
    jawaban: "Masyarakat berpartisipasi aktif sebagai penyedia homestay, makanan minuman, atraksi dan fasilitas tour wisata yang terintegrasi dengan desa wisata",
  },
  {
    no: "2",
    kriteria: "",
    subKriteria: "2.2 Keberlanjutan produk-produk wisata berbasis masyarakat",
    indikator: "2.2.a Regenerasi kepengurusan desa wisata",
    poin: 3,
    jawaban: "Ada regenerasi dan terlibat dalam kegiatan dan pengambilan keputusan",
  },
  // KRITERIA 3
  {
    no: "3",
    kriteria: "Ketersediaan Atraksi",
    subKriteria: "3.1 Daya tarik wisata",
    indikator: "3.1.a Jumlah daya tarik wisata",
    poin: 2,
    jawaban: "Terdapat 4-6 daya tarik wisata",
  },
  {
    no: "3",
    kriteria: "",
    subKriteria: "3.1 Daya tarik wisata",
    indikator: "3.1.b Sumber daya budaya/alam sebagai daya tarik",
    poin: 3,
    jawaban: "Memiliki 3 Sumber daya budaya/alam sebagai daya tarik",
  },
  {
    no: "3",
    kriteria: "",
    subKriteria: "3.2 Paket Wisata dan sovenir",
    indikator: "3.2.a Jumlah paket wisata",
    poin: 4,
    jawaban: "Terdapat >= 4 paket wisata",
  },
  {
    no: "3",
    kriteria: "",
    subKriteria: "3.2 Paket Wisata dan sovenir",
    indikator: "3.2.b Produk kerajinan khas lokal sebagai souvenir",
    poin: 4,
    jawaban: "d. Pengemasan kerajinan menarik, e. Penjualan kerajinan dapat meningkatkan pendapatan masyarakat",
  },
  {
    no: "3",
    kriteria: "",
    subKriteria: "3.3 Kesenian dan event desa wisata",
    indikator: "3.3.a Kesenian tradisional",
    poin: 3,
    jawaban: "Terdapat 3 macam kesenian tradisional",
  },
  {
    no: "3",
    kriteria: "",
    subKriteria: "3.3 Kesenian dan event desa wisata",
    indikator: "3.3.b Event desa wisata",
    poin: 1,
    jawaban: "Terdapat even desa wisata rutin dalam skala kecamatan",
  },
  // KRITERIA 4
  {
    no: "4",
    kriteria: "Amenitas makanan Minuman",
    subKriteria: "4.1 Keberadaan dan keaslian makanan khas lokal",
    indikator: "4.1.a Jumlah dan kualitas makanan khas lokal",
    poin: 2,
    jawaban: "Terdapat makanan >2 khas lokal (termasuk hasil inovasi) dari campuran bahan dasar lokal dan non lokal",
  },
  {
    no: "4",
    kriteria: "",
    subKriteria: "4.2 Ketersediaan amenitas pendukung wisata",
    indikator: "4.2.a Tingkat kelengkapan amenitas di area wisata",
    poin: 3,
    jawaban: "a. Terdapat tempat makan dan minum, b. Terdapat toko retail di area wisata, c. Terdapat penjualan cinderamata di area wisata",
  },
  // KRITERIA 5
  {
    no: "5",
    kriteria: "Kualitas Fasilitas Umum dan Ancillary",
    subKriteria: "5.1 Sanitasi dan infrastruktur lingkungan",
    indikator: "5.1.a Ketersediaan air bersih, tempat sampah, sistem drainase, dan papan himbauan kebersihan",
    poin: 3,
    jawaban: "a. Tersedia air bersih, b. Tersedia tempat sampah, c. Tersedia sistem drainase untuk keperluan wisatawan",
  },
  {
    no: "5",
    kriteria: "",
    subKriteria: "5.2 Fasilitas umum wisata",
    indikator: "5.2.a Toilet umum",
    poin: 3,
    jawaban: "toilet umum tersedia dengan perbandingan 2:1 terhadap daya tarik wisata",
  },
  {
    no: "5",
    kriteria: "",
    subKriteria: "5.3 Layanan informasi dan komunikasi",
    indikator: "5.3.a Ketersediaan jaringan telekomunikasi, pusat informasi, brosur, narahubung, dan media online",
    poin: 3,
    jawaban: "a. Terdapat jaringan telekomunikasi atau sinyal telpon seluler, b. Terdapat kantor sekretariat atau pusat layanan informasi wisata, c. Tersedia brosur",
  },
  {
    no: "5",
    kriteria: "",
    subKriteria: "5.4 Fasilitas MICE",
    indikator: "5.4.a Ketersediaan dan kapasitas tempat pertemuan",
    poin: 3,
    jawaban: "Terdapat tempat pertemuan kapasitas 30-50 orang",
  },
  {
    no: "5",
    kriteria: "",
    subKriteria: "5.5 Homestay",
    indikator: "5.5.a Ketersediaan dan integrasi homestay dengan atraksi wisata",
    poin: 3,
    jawaban: "Terdapat homestay yang menunjang desa wisata, tapi tidak terintegrasi dengan atraksi",
  },
  {
    no: "5",
    kriteria: "",
    subKriteria: "5.6 Transportasi lokal",
    indikator: "5.6.a Ketersediaan, kekhasan, dan aksesibilitas transportasi lokal",
    poin: 3,
    jawaban: "Terdapat transportasi lokal khas menuju dan/atau di dalam desa wisata",
  },
  {
    no: "5",
    kriteria: "",
    subKriteria: "5.7 Aksesibilitas dan Penunjuk arah",
    indikator: "5.7.a Ketersedian jalan umum, penunjuk arah, penanda dan peta desa wisata yang ramah disabilitas",
    poin: 3,
    jawaban: "a. Terdapat jalan umum dan titik lokasi di Google Maps yang memadai, b. Terdapat peta lokasi atraksi desa wisata",
  },
  // KRITERIA 6
  {
    no: "6",
    kriteria: "Kualitas SDM dan Pramuwisata",
    subKriteria: "6.1 Kompetensi pramuwisata",
    indikator: "6.1.a Latar belakang pendidikan, pelatihan, dan kemampuan bahasa asing",
    poin: 3,
    jawaban: "a. Terdapat SDM lulusan sekolah/pernah mengikuti pelatihan/sertifikasi pengelola pariwisata, b. Menguasai bahasa asing secara pasif",
  },
  {
    no: "6",
    kriteria: "",
    subKriteria: "6.2 Kemampuan digital pengelola",
    indikator: "6.2.a Kemampuan menggunakan gawai dan media sosial untuk promosi desa wisata",
    poin: 3,
    jawaban: "a. Pengelola aktif menggunakan gawai dan media sosial untuk promosi, informasi, serta komunikasi dengan wisatawan, b. meski strategi konten masih sederhana.",
  },
  // KRITERIA 7
  {
    no: "7",
    kriteria: "Kinerja Friendly Tour Operator dan Sapta pesona",
    subKriteria: "7.1. FTO mempromosikan pengalaman yang memuaskan dan aman bagi wisatawan dan masyarakat",
    indikator: "7.1.a Standar pelayanan FTO untuk pengalaman memuaskan",
    poin: 2,
    jawaban: "Terdapat standar pelayanan tertulis secara sistematis dan disosialisasikan kepada pengelola desa wisata secara berkala",
  },
  // KRITERIA 8
  {
    no: "8",
    kriteria: "Penerapan Teknologi",
    subKriteria: "8.1 Menerapkan teknologi sebagai media penyebaran informasi dan promosi",
    indikator: "8.1.a strategi promosi",
    poin: 2,
    jawaban: "Promosi menggunakan media cetak dan online",
  },
  {
    no: "8",
    kriteria: "",
    subKriteria: "8.2 Teknologi untuk pengelolaan desa wisata",
    indikator: "8.2.a Penggunaan teknologi digital untuk keanggotaan, keuangan, tiket, QRIS, dan sistem terintegrasi",
    poin: 0,
    jawaban: "Tidak menggunakan teknologi dalam pengelolaan desa wisata",
  },
  // KRITERIA 9
  {
    no: "9",
    kriteria: "Kontribusi terhadap Kesejahteraan Sosial",
    subKriteria: "9.1 Pembagian biaya dan hasil usaha yang adil",
    indikator: "9.1.a Jumlah kunjungan wisata per bulan",
    poin: 1,
    jawaban: "Terdapat kunjungan wisatawan < 100 per bulan",
  },
  {
    no: "9",
    kriteria: "",
    subKriteria: "9.1 Pembagian biaya dan hasil usaha yang adil",
    indikator: "9.1.b Sistem pembagian hasil usaha dan transparansi laporan keuangan",
    poin: 3,
    jawaban: "a. Hasil usaha dibagikan kepada unit usaha secara proporsional, b. Sebagian hasil usaha masuk ke kas Pokdarwis/badan usaha/Koperasi, c. Tersedia laporan keuangan meski kurang transparan",
  },
  {
    no: "9",
    kriteria: "",
    subKriteria: "9.2 Menjaga martabat manusia",
    indikator: "9.2.a Himbauan menaati norma bagi pengelola dan pengunjung",
    poin: 3,
    jawaban: "Terdapat himbuan lisan dan tertulis menaati norma dan peraturan bagi pengelola dan pengunjung",
  },
  {
    no: "9",
    kriteria: "",
    subKriteria: "9.3 Kemitraan dan jaringan ekonomi",
    indikator: "9.3.a Kemitraan dengan pemerintah, akademik, industri, media",
    poin: 2,
    jawaban: "Memiliki kemitraan dengan a. pokdarwis, b. pemerintah (desa/kab/kota/provinsi/nasional) dan c. akademik",
  },
  // KRITERIA 10
  {
    no: "10",
    kriteria: "Kontribusi terhadap lingkungan",
    subKriteria: "10.1 Konservasi dan pelestarian",
    indikator: "10.1.a Konsep dan implementasi pelestarian lingkungan",
    poin: 3,
    jawaban: "a. Sudah ada konsep tertulis dan b. melibatkan pengelola dan masyarakat dalam implementasinya",
  },
];

// Total nilai: 94

export default function ScoringTable({ scoreId }: { scoreId: number }) {
  return (
    <Card className="w-full shadow-lg border-t-4 border-t-green-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Tabel Indikator Penilaian
            </CardTitle>
            {/* <p className="text-sm text-gray-500 mt-1">
              Acuan Data Desa Kebonsari - Detail Penilaian
            </p> */}
          </div>
          <Badge
            variant="outline"
            className="text-lg px-4 py-1 rounded-xl border-green-600 text-green-600"
          >
            Total Poin: 94
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px] font-bold text-gray-700">
                Kriteria
              </TableHead>
              <TableHead className="w-[250px] font-bold text-gray-700">
                Sub Kriteria
              </TableHead>
              <TableHead className="w-[250px] font-bold text-gray-700">
                Indikator
              </TableHead>
              <TableHead className="w-[80px] text-center font-bold text-gray-700">
                Poin
              </TableHead>
              <TableHead className="font-bold text-gray-700">
                Jawaban / Kondisi Riil
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {penilaianData.filter((item) => Number(item.no) == scoreId).map((item, index) => (
              <TableRow key={index} className="hover:bg-green-50/30 transition-colors even:bg-slate-50/50">
                <TableCell className="align-top font-semibold text-gray-800">
                  {item.kriteria}
                </TableCell>
                <TableCell className="align-top text-gray-600">
                  {item.subKriteria}
                </TableCell>
                <TableCell className="align-top whitespace-pre-line text-sm text-gray-600">
                  {item.indikator !== "-"
                    ? item.indikator
                    : ""}
                </TableCell>
                <TableCell className="align-top text-center font-bold text-green-600 text-lg">
                  {item.poin}
                </TableCell>
                <TableCell className="align-top text-gray-700 bg-green-50/20">
                  {item.jawaban}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
