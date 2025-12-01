"use client";

import React from "react";
import {
  Trophy,
  Info,
  Calendar,
  Tent,
  BedDouble,
  Utensils,
  Users,
  MapPin,
  TrendingUp,
  DollarSign
} from "lucide-react";

// Import Recharts untuk Grafik
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- DUMMY DATA ---
// Data Profit 6 Bulan Terakhir
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
  { label: "Tahun Berdiri", value: "2021", icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Objek Wisata", value: "6 Spot", icon: Tent, color: "text-emerald-600", bg: "bg-emerald-100" },
  { label: "Guesthouse", value: "10 Unit", icon: BedDouble, color: "text-purple-600", bg: "bg-purple-100" },
  { label: "Restoran & Cafe", value: "5 Outlet", icon: Utensils, color: "text-orange-600", bg: "bg-orange-100" },
  { label: "Rata-rata Pengunjung", value: "96 / Bulan", icon: Users, color: "text-pink-600", bg: "bg-pink-100" },
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

export default function Pricing({ selectedDesa }: { selectedDesa: any }) {
  return (
    <div className="space-y-6">
      
      {/* 1. HERO CARD (EXISTING) */}
      <Card className="overflow-hidden border-none shadow-xl ring-1 ring-slate-900/5 pt-0">
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-sm">
                  Desa Wisata
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{selectedDesa.nama}</h1>
            </div>

            {/* Score Circle */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
              <div className="text-right">
                <p className="text-xs font-medium text-blue-100 uppercase tracking-wider">Total Poin</p>
                <p className="text-3xl font-extrabold">{selectedDesa.poin}</p>
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
              Status saat ini adalah <span className="font-bold">{selectedDesa.klasifikasi}</span>.
              Tingkatkan aspek penilaian untuk naik ke klasifikasi berikutnya.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. STATISTIK GRID (NEW) */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {profilStats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-md ring-1 ring-slate-900/5 hover:bg-slate-50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full gap-2">
              <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mb-1`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
                <p className="text-lg font-bold text-slate-800">{stat.value}</p>
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
                <p className="text-sm text-slate-500">Performa pendapatan 6 bulan terakhir</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
                <DollarSign className="h-3 w-3" /> Profit Positif
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => `${value / 1000000}jt`} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatRupiah(value), "Profit"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
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
            <p className="text-sm text-slate-500">Titik lokasi administratif</p>
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
              <p className="font-semibold text-slate-800">Desa Wisata Kebonsari</p>
              <p className="text-slate-500">Kec. Borobudur, Magelang, Jawa Tengah</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}