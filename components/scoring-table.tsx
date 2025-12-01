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

// Data Penilaian Lengkap (Clean Data)
const penilaianData = [
  {
    no: "1",
    kriteria: "1.1 Legalitas lembaga/kelompok desa wisata & unit usaha",
    subKriteria: "1.1.a Legalitas kepemilikan pengelola desa wisata",
    indikator: "a. Terdapat embrio Pokdarwis\nb. Terdapat Pokdarwis aktif",
    poin: 2,
    jawaban: "b. Terdapat Pokdarwis yang sudah aktif",
  },
  {
    no: "",
    kriteria: "1.2 Terdapat rencana pengelolaan yang efektif dan transparan",
    subKriteria: "1.2.a Perencanaan",
    indikator: "a. Memiliki data kepariwisataan\nb. Memiliki pemetaan potensi",
    poin: 2,
    jawaban: "c. Memiliki rencana pengembangan wilayah",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "1.2.b Basis data perencanaan",
    indikator: "a. Memiliki data monografi\nb. Memiliki rencana pembangunan jangka menengah desa",
    poin: 2,
    jawaban: "c. Memiliki RPJM desa yang berisi pengembangan pariwisata secara umum",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "1.2.c Rencana tata ruang",
    indikator: "a. Terdapat rencana tata ruang wilayah desa\nb. Terdapat konsep zonasi",
    poin: 2,
    jawaban: "b. Terdapat konsep zonasi pengembangan wisata",
  },
  {
    no: "",
    kriteria: "1.3 Pengelolaan melalui kerjasama pemerintah desa",
    subKriteria: "1.3.a Proses administrasi bisnis",
    indikator: "a. Terdapat pencatatan administrasi keanggotaan",
    poin: 2,
    jawaban: "b. Terdapat pencatatan keuangan sederhana (dana masuk dan keluar)",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "1.3.b Proses pengelolaan yang profesional",
    indikator: "a. Terdapat aktivitas koordinasi",
    poin: 2,
    jawaban: "b. Sudah memiliki pembagian tugas dan fungsi secara profesional, c. Namun belum rutin",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "1.3.c Mitigasi risiko bencana dan kecelakaan kerja",
    indikator: "a. Memiliki data potensi kecelakaan\nb. Memiliki rencana mitigasi",
    poin: 2,
    jawaban: "b. Memiliki rencana mitigasi kecelakaan di wilayah desa wisata",
  },
  {
    no: "2",
    kriteria: "2.1 Partisipasi masyarakat lokal dalam pengelolaan",
    subKriteria: "2.1.a Jumlah masyarakat yang bergelut di usaha desa wisata",
    indikator: "-",
    poin: 4,
    jawaban: "Terdapat 1 kelompok masyarakat yang didelegasikan khusus mengurus satu aktivitas pariwisata",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "2.1.b Pemanfaatan dan pemberdayaan sumber daya lokal",
    indikator: "-",
    poin: 4,
    jawaban: "100% makanan minuman, atraksi, dan fasilitas operasional diproduksi di internal desa wisata",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "2.1.c Bentuk Partisipasi masyarakat dalam layanan wisata",
    indikator: "-",
    poin: 4,
    jawaban: "Masyarakat berpartisipasi aktif sebagai penyedia homestay, kuliner, atraksi & fasilitas tour",
  },
  {
    no: "",
    kriteria: "2.2 Keberlanjutan produk-produk wisata",
    subKriteria: "2.2.a Regenerasi kepengurusan desa wisata",
    indikator: "-",
    poin: 3,
    jawaban: "Ada regenerasi dan terlibat dalam kegiatan dan pengambilan keputusan",
  },
  {
    no: "3",
    kriteria: "3.1 Daya tarik wisata",
    subKriteria: "3.1.a Jumlah daya tarik wisata",
    indikator: "-",
    poin: 2,
    jawaban: "Terdapat 4-6 daya tarik wisata",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "3.1.b Sumber daya budaya/alam sebagai daya tarik",
    indikator: "-",
    poin: 3,
    jawaban: "Memiliki 3 Sumber daya budaya/alam sebagai daya tarik",
  },
  {
    no: "",
    kriteria: "3.2 Paket Wisata dan sovenir",
    subKriteria: "3.2.a Jumlah paket wisata",
    indikator: "-",
    poin: 4,
    jawaban: "Terdapat >= 4 paket wisata",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "3.2.b Produk kerajinan khas lokal sebagai souvenir",
    indikator: "a. Produk > 4\nb. Material lokal\nc. Kemasan layak",
    poin: 4,
    jawaban: "d. Pengemasan kerajinan menarik & e. Penjualan meningkatkan pendapatan",
  },
  {
    no: "",
    kriteria: "3.3 Kesenian dan event desa wisata",
    subKriteria: "3.3.a Kesenian tradisional",
    indikator: "-",
    poin: 3,
    jawaban: "Terdapat 3 macam kesenian tradisional",
  },
  {
    no: "",
    kriteria: "",
    subKriteria: "3.3.b Event desa wisata",
    indikator: "-",
    poin: 1,
    jawaban: "Terdapat even desa wisata rutin dalam skala kecamatan",
  },
  {
    no: "4",
    kriteria: "4.1 Keberadaan dan keaslian makanan khas lokal",
    subKriteria: "4.1.a Jumlah dan kualitas makanan khas lokal",
    indikator: "-",
    poin: 2,
    jawaban: "Terdapat makanan >2 khas lokal (termasuk hasil inovasi) dari bahan lokal",
  },
  {
    no: "",
    kriteria: "4.2 Ketersediaan amenitas pendukung wisata",
    subKriteria: "4.2.a Tingkat kelengkapan amenitas di area wisata",
    indikator: "a. Tempat makan/minum\nb. Toko retail\nc. Penjualan cinderamata",
    poin: 3,
    jawaban: "c. Terdapat penjualan cinderamata di area wisata",
  },
  {
    no: "5",
    kriteria: "5.1 Sanitasi dan infrastruktur lingkungan",
    subKriteria: "5.1.a Ketersediaan air bersih, sampah, drainase",
    indikator: "a. Air bersih\nb. Tempat sampah\nc. Drainase",
    poin: 3,
    jawaban: "c. Tersedia sistem drainase untuk keperluan wisatawan",
  },
  {
    no: "",
    kriteria: "5.2 Fasilitas umum wisata",
    subKriteria: "5.2.a Toilet umum",
    indikator: "-",
    poin: 3,
    jawaban: "Toilet umum tersedia dengan perbandingan 2:1 terhadap daya tarik wisata",
  },
  {
    no: "",
    kriteria: "5.3 Layanan informasi dan komunikasi",
    subKriteria: "5.3.a Ketersediaan telekomunikasi & pusat informasi",
    indikator: "a. Sinyal seluler\nb. Pusat informasi\nc. Brosur/Online",
    poin: 3,
    jawaban: "b. Terdapat kantor sekretariat/pusat informasi & c. Tersedia brosur",
  },
  {
    no: "",
    kriteria: "5.4 Fasilitas MICE",
    subKriteria: "5.4.a Ketersediaan dan kapasitas tempat pertemuan",
    indikator: "-",
    poin: 3,
    jawaban: "Terdapat tempat pertemuan kapasitas 30-50 orang",
  },
  {
    no: "",
    kriteria: "5.5 Homestay",
    subKriteria: "5.5.a Ketersediaan dan integrasi homestay",
    indikator: "-",
    poin: 3,
    jawaban: "Terdapat homestay yang menunjang, tapi tidak terintegrasi dengan atraksi",
  },
  {
    no: "",
    kriteria: "5.6 Transportasi lokal",
    subKriteria: "5.6.a Ketersediaan, kekhasan, aksesibilitas",
    indikator: "-",
    poin: 3,
    jawaban: "Terdapat transportasi lokal khas menuju dan/atau di dalam desa wisata",
  },
  {
    no: "",
    kriteria: "5.7 Aksesibilitas dan Penunjuk arah",
    subKriteria: "5.7.a Jalan umum, penunjuk arah, peta",
    indikator: "a. Jalan & GMaps memadai\nb. Peta lokasi atraksi",
    poin: 3,
    jawaban: "b. Terdapat peta lokasi atraksi desa wisata",
  },
  {
    no: "6",
    kriteria: "6.1 Kompetensi pramuwisata",
    subKriteria: "6.1.a Latar belakang pendidikan & pelatihan",
    indikator: "a. Lulusan/Sertifikasi\nb. Bahasa asing",
    poin: 3,
    jawaban: "a. Terdapat SDM terlatih/sertifikasi & b. Menguasai bahasa asing pasif",
  },
  {
    no: "",
    kriteria: "6.2 Kemampuan digital pengelola",
    subKriteria: "6.2.a Kemampuan gawai & medsos",
    indikator: "-",
    poin: 3,
    jawaban: "a. Pengelola aktif promosi medsos, b. meski strategi konten sederhana",
  },
  {
    no: "7",
    kriteria: "7.1 FTO mempromosikan pengalaman memuaskan",
    subKriteria: "7.1.a Standar pelayanan FTO",
    indikator: "-",
    poin: 2,
    jawaban: "Terdapat standar pelayanan tertulis sistematis dan disosialisasikan berkala",
  },
  {
    no: "8",
    kriteria: "8.1 Teknologi informasi & promosi",
    subKriteria: "8.1.a Strategi promosi",
    indikator: "-",
    poin: 2,
    jawaban: "Promosi menggunakan media cetak dan online",
  },
  {
    no: "",
    kriteria: "8.2 Teknologi pengelolaan desa wisata",
    subKriteria: "8.2.a Penggunaan teknologi (keuangan, tiket, QRIS)",
    indikator: "-",
    poin: 0,
    jawaban: "Tidak menggunakan teknologi dalam pengelolaan desa wisata",
  },
  {
    no: "9",
    kriteria: "9.1 Kontribusi Kesejahteraan Sosial",
    subKriteria: "9.1.a Jumlah kunjungan wisata per bulan",
    indikator: "-",
    poin: 1,
    jawaban: "Terdapat kunjungan wisatawan < 100 per bulan",
  },
  {
    no: "",
    kriteria: "9.1 Pembagian biaya & hasil usaha",
    subKriteria: "9.1.b Sistem pembagian hasil usaha",
    indikator: "a. Proporsional\nb. Masuk kas Pokdarwis\nc. Laporan keuangan",
    poin: 3,
    jawaban: "a. Dibagi proporsional, b. Masuk kas, c. Laporan ada meski kurang transparan",
  },
  {
    no: "",
    kriteria: "9.2 Menjaga martabat manusia",
    subKriteria: "9.2.a Himbauan menaati norma",
    indikator: "-",
    poin: 3,
    jawaban: "Terdapat himbuan lisan dan tertulis menaati norma bagi pengelola & pengunjung",
  },
  {
    no: "",
    kriteria: "9.3 Kemitraan dan jaringan ekonomi",
    subKriteria: "9.3.a Kemitraan dengan stakeholders",
    indikator: "a. Pokdarwis\nb. Pemerintah\nc. Akademik",
    poin: 2,
    jawaban: "Memiliki kemitraan dengan Pokdarwis & Pemerintah, Akademik (konsep tertulis)",
  },
  {
    no: "10",
    kriteria: "10.1 Konservasi dan pelestarian",
    subKriteria: "10.1.a Konsep dan implementasi pelestarian",
    indikator: "-",
    poin: 3,
    jawaban: "a. Konsep tertulis ada, b. melibatkan pengelola & masyarakat dalam implementasi",
  },
];

export default function ScoringTable() {
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
          <Badge variant="outline" className="text-lg px-4 py-1 rounded-xl border-green-600 text-green-600">
            Total Poin: 94
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[50px] font-bold text-gray-700">No</TableHead>
              <TableHead className="w-[200px] font-bold text-gray-700">Kriteria</TableHead>
              <TableHead className="w-[250px] font-bold text-gray-700">Sub Kriteria</TableHead>
              <TableHead className="w-[250px] font-bold text-gray-700">Indikator</TableHead>
              <TableHead className="w-[80px] text-center font-bold text-gray-700">Poin</TableHead>
              <TableHead className="font-bold text-gray-700">Jawaban / Kondisi Riil</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {penilaianData.map((item, index) => (
              <TableRow key={index} className="hover:bg-green-50/30 transition-colors even:bg-slate-50/50">
                <TableCell className="font-medium align-top">{item.no}</TableCell>
                <TableCell className="align-top font-semibold text-gray-800">
                  {item.kriteria}
                </TableCell>
                <TableCell className="align-top text-gray-600">
                  {item.subKriteria}
                </TableCell>
                <TableCell className="align-top whitespace-pre-line text-sm text-gray-600">
                  {item.indikator !== "-" ? item.indikator : ""}
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