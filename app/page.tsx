"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, MapPin } from "lucide-react";
import { useState } from "react";

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
  const nilaiKriteria: Record<number, KriteriaDetail>= {
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

  // Home View
  if (currentView === "home") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl">
              Sistem Klasifikasi Desa Wisata
            </CardTitle>
            <CardDescription className="text-base">
              Kabupaten Magelang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setCurrentView("list")}
              className="h-14 w-full bg-blue-600 text-lg font-semibold hover:bg-blue-700"
            >
              Klasifikasi Desa Wisata
            </Button>
          </CardContent>
        </Card>
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
