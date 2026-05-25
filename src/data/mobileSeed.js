export const STORAGE_KEY = 'radcare_mobile_app_data';
const names = ['Andi Pratama', 'Siti Rahma', 'Budi Santoso', 'Rina Lestari', 'Dewi Anggraini', 'Fajar Hidayat', 'Nina Puspita', 'Agus Wijaya'];
export const mobileSeed = {
    users: [{ id: 'u1', name: 'Demo User', role: 'Dokter Spesialis', facility: 'RS RADCARE Nusantara' }],
    patients: names.map((name, i) => ({ id: `p${i + 1}`, patientId: `RCN-${1001 + i}`, name, age: 30 + i, gender: i % 2 ? 'Perempuan' : 'Laki-laki', diagnosis: 'Karsinoma', cancerType: 'Nasofaring', stage: ['IIA', 'IIB', 'III'][i % 3], doctor: 'dr. Arya', physicist: 'M. Fisika', totalSessions: 25, completedSessions: 5 + i, status: i % 3 === 0 ? 'Perlu Evaluasi' : 'Aktif', riskLevel: ['Rendah', 'Sedang', 'Tinggi'][i % 3], startDate: '2026-05-01', notes: 'Data dummy' })),
    schedules: Array.from({ length: 10 }).map((_, i) => ({ id: `s${i + 1}`, patientId: `p${(i % 8) + 1}`, time: `${8 + i}:00`, date: '2026-05-25', room: `Linac-${(i % 3) + 1}`, doctor: 'dr. Arya', status: ['Terjadwal', 'Berlangsung', 'Selesai', 'Ditunda'][i % 4] })),
    treatmentPlans: Array.from({ length: 8 }).map((_, i) => ({ id: `t${i + 1}`, patientId: `p${i + 1}`, targetArea: 'Head & Neck', technique: 'IMRT', totalSessions: 25, completedSessions: 5 + i, status: 'Berjalan', qaStatus: i % 2 ? 'Pending' : 'Done' })),
    treatmentSessions: [],
    monitoringNotes: Array.from({ length: 8 }).map((_, i) => ({ id: `m${i + 1}`, patientId: `p${(i % 8) + 1}`, date: '2026-05-24', symptom: 'Mual', severity: ['Ringan', 'Sedang', 'Berat'][i % 3], riskLevel: ['Rendah', 'Sedang', 'Tinggi'][i % 3], note: 'Dipantau', reportedBy: 'Perawat', reviewed: i % 2 === 0 })),
    doctorNotes: Array.from({ length: 8 }).map((_, i) => ({ id: `dn${i + 1}`, patientId: `p${(i % 8) + 1}`, title: 'Evaluasi klinis', content: 'Kondisi stabil', date: '2026-05-24', author: 'dr. Arya', followUp: i % 2 === 0 })),
    physicsNotes: Array.from({ length: 5 }).map((_, i) => ({ id: `pn${i + 1}`, patientId: `p${(i % 5) + 1}`, title: 'QA mesin', content: 'Output stabil', date: '2026-05-24', author: 'Fis. Medis' })),
    documents: [],
    educationArticles: Array.from({ length: 8 }).map((_, i) => ({ id: `e${i + 1}`, title: `Edukasi Radioterapi ${i + 1}`, category: ['Persiapan Radioterapi', 'Efek Samping', 'Nutrisi', 'Perawatan Kulit'][i % 4], readingTime: '5 menit', bookmarked: false, read: false })),
    notifications: Array.from({ length: 8 }).map((_, i) => ({ id: `n${i + 1}`, title: 'Reminder Follow-up', message: 'Tinjau pasien prioritas', read: i % 2 === 0, type: 'reminder' })),
    symptomDiary: Array.from({ length: 5 }).map((_, i) => ({ id: `sd${i + 1}`, patientId: `p${i + 1}`, date: '2026-05-24', symptom: 'Lelah', severity: 'Sedang' })),
    followUpReminders: Array.from({ length: 5 }).map((_, i) => ({ id: `f${i + 1}`, patientId: `p${i + 1}`, dueDate: '2026-05-30', status: i % 2 ? 'Terlambat' : 'Terjadwal' })),
    aiInsights: Array.from({ length: 5 }).map((_, i) => ({ id: `ai${i + 1}`, prompt: 'Ringkas jadwal hari ini', result: 'Terdapat pasien prioritas tinggi', createdAt: '2026-05-25' })),
    auditLogs: [],
    settings: { facilityName: 'RS RADCARE Nusantara', location: 'Jakarta', theme: 'light' },
    selectedRole: 'Dokter Spesialis'
};
