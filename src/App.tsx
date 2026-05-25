import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { loadMobileAppData, saveMobileAppData, createRecord, deleteRecord, generateAIInsight } from './lib/mobileStorage';
import { useMemo, useState } from 'react';
import { Home, Users, CalendarDays, Bot, Grid3X3, Bell } from 'lucide-react';

const Shell=({children}:{children:any})=><div className='min-h-screen bg-gradient-to-b from-slate-100 to-cyan-50 py-4'><div className='mx-auto max-w-[430px] min-h-screen bg-white shadow-2xl rounded-3xl overflow-hidden relative'><div className='p-4 pb-28'>{children}</div><BottomNav/></div></div>;
const BottomNav=()=>{const items=[['/app','Home',Home],['/app/patients','Pasien',Users],['/app/schedule','Jadwal',CalendarDays],['/app/ai','AI',Bot],['/app/more','Lainnya',Grid3X3]] as const;return <nav className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/90 backdrop-blur border-t rounded-t-2xl'><div className='grid grid-cols-5'>{items.map(([to,label,Icon])=><NavLink key={to} to={to} className={({isActive})=>`min-h-11 py-2 flex flex-col items-center text-xs ${isActive?'text-cyan-700':'text-slate-500'}`}><Icon size={18}/>{label}</NavLink>)}</div></nav>}
const Login=()=>{const navigate=useNavigate();const roles=['Pasien','Dokter Spesialis','Fisikawan Medis','Admin Rumah Sakit','Manajemen','Caregiver / Pendamping'];return <div className='min-h-screen grid place-items-center p-4 bg-slate-100'><div className='w-full max-w-[430px] bg-white rounded-3xl p-5 shadow'><h1 className='text-2xl font-bold'>RADCARE NUSANTARA</h1><p className='text-sm text-slate-600 mb-4'>Pilih Mode Aplikasi</p><div className='grid gap-3'>{roles.map(r=><button key={r} onClick={()=>{const d=loadMobileAppData();d.selectedRole=r;saveMobileAppData(d);alert(`Login sukses sebagai ${r}`);navigate('/app')}} className='p-3 rounded-2xl border text-left hover:border-cyan-500'>{r}</button>)}</div></div></div>}
const HomePage=()=>{const d=loadMobileAppData();return <Shell><div className='flex justify-between items-start'><div><p className='font-semibold'>Halo, {d.selectedRole}</p><p className='text-xs text-slate-500'>{new Date().toLocaleDateString('id-ID')}</p></div><Bell size={18}/></div><div className='mt-4 rounded-3xl bg-gradient-to-r from-slate-900 to-cyan-700 text-white p-4'><p className='font-semibold'>Smart Radiotherapy Care</p><p className='text-xs opacity-90'>Continuous Specialist Monitoring</p></div><div className='grid grid-cols-2 gap-3 mt-4'>{[['Pasien Aktif',d.patients.length],['Jadwal Hari Ini',d.schedules.length],['Risiko Tinggi',d.patients.filter(p=>p.riskLevel==='Tinggi').length],['Sesi Selesai',d.treatmentPlans.reduce((a,b)=>a+b.completedSessions,0)]].map(([t,v])=><div key={String(t)} className='rounded-2xl bg-slate-50 p-3'><p className='text-xs'>{t}</p><p className='text-xl font-bold'>{String(v)}</p></div>)}</div></Shell>}
const Patients=()=>{const [q,setQ]=useState('');const [d,setD]=useState(loadMobileAppData());const data=useMemo(()=>d.patients.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())),[q,d]);return <Shell><div className='flex gap-2'><input className='border rounded-xl p-2 w-full' placeholder='Search pasien' value={q} onChange={e=>setQ(e.target.value)}/><NavLink to='/app/patients/new' className='bg-cyan-700 text-white px-3 rounded-xl grid place-items-center'>+</NavLink></div><div className='mt-3 space-y-2'>{data.map(p=><div key={p.id} className='border rounded-2xl p-3'><p className='font-semibold'>{p.name}</p><p className='text-xs'>{p.patientId} • {p.diagnosis}</p><div className='flex gap-2 mt-2'><NavLink to={`/app/patients/${p.id}`} className='text-cyan-700 text-sm'>Detail</NavLink><button onClick={()=>{setD(deleteRecord('patients',p.id))}} className='text-rose-600 text-sm'>Hapus</button></div></div>)}</div></Shell>}
const PatientNew=()=>{const nav=useNavigate();const [name,setName]=useState('');return <Shell><input className='border rounded-xl p-2 w-full' placeholder='Nama pasien' value={name} onChange={e=>setName(e.target.value)}/><button className='mt-3 bg-cyan-700 text-white w-full rounded-xl p-3' onClick={()=>{createRecord('patients',{name,patientId:'RCN-NEW',age:45,gender:'Laki-laki',diagnosis:'Dummy',cancerType:'Dummy',stage:'II',doctor:'dr.',physicist:'fis.',totalSessions:20,completedSessions:0,status:'Aktif',riskLevel:'Sedang',startDate:'2026-05-25',notes:''});nav('/app/patients')}}>Simpan</button></Shell>}
const AIPage=()=>{const [prompt,setPrompt]=useState('Pasien mana yang perlu evaluasi?');const [d,setD]=useState(loadMobileAppData());return <Shell><div className='rounded-3xl p-4 text-white bg-gradient-to-br from-slate-900 to-blue-700'>AI Assistant RADCARE</div><p className='text-xs mt-2'>AI Assistant hanya simulasi berbasis data dummy dan tidak menggantikan keputusan klinis tenaga kesehatan.</p><textarea className='border rounded-xl p-2 w-full mt-3' value={prompt} onChange={e=>setPrompt(e.target.value)}/><button className='bg-cyan-700 text-white w-full rounded-xl p-3 mt-2' onClick={()=>{generateAIInsight(prompt);setD(loadMobileAppData())}}>Generate Insight</button><div className='mt-3 space-y-2'>{d.aiInsights.slice(0,6).map(i=><div key={i.id} className='bg-slate-50 rounded-2xl p-3 text-sm'>{i.result}</div>)}</div></Shell>}
const Simple=(title:string)=><Shell><h2 className='font-semibold text-lg'>{title}</h2><p className='text-sm text-slate-500'>Fitur mobile RADCARE tersedia dengan data localStorage.</p></Shell>;

export default function App(){
  return <Routes>
    <Route path='/' element={<Navigate to='/login'/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/app' element={<HomePage/>}/>
    <Route path='/app/patients' element={<Patients/>}/>
    <Route path='/app/patients/new' element={<PatientNew/>}/>
    <Route path='/app/patients/:id' element={Simple('Detail Pasien')}/>
    <Route path='/app/schedule' element={Simple('Jadwal Terapi')}/>
    <Route path='/app/monitoring' element={Simple('Monitoring Gejala')}/>
    <Route path='/app/treatment' element={Simple('Rencana Terapi')}/>
    <Route path='/app/notes' element={Simple('Catatan Klinis')}/>
    <Route path='/app/ai' element={<AIPage/>}/>
    <Route path='/app/reports' element={Simple('Laporan')}/>
    <Route path='/app/documents' element={Simple('Dokumen')}/>
    <Route path='/app/education' element={Simple('Edukasi')}/>
    <Route path='/app/notifications' element={Simple('Notifikasi')}/>
    <Route path='/app/profile' element={Simple('Profil')}/>
    <Route path='/app/settings' element={Simple('Pengaturan')}/>
    <Route path='/app/more' element={Simple('Menu Lainnya')}/>
    <Route path='/app/journey' element={Simple('Radiotherapy Journey Map')}/>
    <Route path='/app/risk-heatmap' element={Simple('Smart Risk Heatmap')}/>
    <Route path='/app/priority' element={Simple('Clinical Priority Queue')}/>
    <Route path='/app/symptom-diary' element={Simple('Patient Symptom Diary')}/>
    <Route path='/app/follow-up' element={Simple('Smart Follow-Up Reminder')}/>
    <Route path='/app/continuity-score' element={Simple('Care Continuity Score')}/>
  </Routes>
}
