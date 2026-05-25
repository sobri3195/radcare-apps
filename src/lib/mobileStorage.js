import { mobileSeed, STORAGE_KEY } from '../data/mobileSeed';
const uid = () => Math.random().toString(36).slice(2, 10);
export const loadMobileAppData = () => { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) {
    saveMobileAppData(mobileSeed);
    return mobileSeed;
} return JSON.parse(raw); };
export const saveMobileAppData = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
export const resetMobileAppData = () => saveMobileAppData(mobileSeed);
export const createRecord = (entity, payload) => { const d = loadMobileAppData(); d[entity] = [...(d[entity] || []), { id: uid(), ...payload }]; saveMobileAppData(d); return d; };
export const updateRecord = (entity, id, payload) => { const d = loadMobileAppData(); d[entity] = (d[entity] || []).map((r) => r.id === id ? { ...r, ...payload } : r); saveMobileAppData(d); return d; };
export const deleteRecord = (entity, id) => { const d = loadMobileAppData(); d[entity] = (d[entity] || []).filter((r) => r.id !== id); saveMobileAppData(d); return d; };
export const exportJSON = () => JSON.stringify(loadMobileAppData(), null, 2);
export const importJSON = (json) => saveMobileAppData(JSON.parse(json));
export const generateAIInsight = (prompt) => {
    const d = loadMobileAppData();
    const highRisk = d.patients.filter(p => p.riskLevel === 'Tinggi').length;
    const heavy = d.monitoringNotes.filter(m => m.severity === 'Berat').length;
    const delayed = d.schedules.filter(s => s.status === 'Ditunda').length;
    const unreviewed = d.doctorNotes.filter(n => !n.followUp).length;
    const result = `Insight: ${prompt}. Pasien risiko tinggi ${highRisk}, efek samping berat ${heavy}, jadwal tertunda ${delayed}, catatan perlu review ${unreviewed}. Rekomendasi: prioritaskan evaluasi klinis hari ini.`;
    const insight = { id: uid(), prompt, result, createdAt: new Date().toISOString() };
    d.aiInsights = [insight, ...d.aiInsights];
    d.auditLogs = [...d.auditLogs, { id: uid(), action: 'generate_ai', time: insight.createdAt }];
    saveMobileAppData(d);
    return insight;
};
