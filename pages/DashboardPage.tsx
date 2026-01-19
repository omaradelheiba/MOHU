
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Map as MapIcon, 
  Layers, 
  Search, 
  Hexagon, 
  Tent, 
  Users, 
  AlertCircle, 
  Settings, 
  Maximize2,
  User,
  Activity,
  LogOut,
  Plus,
  Minus,
  Target,
  ArrowLeftRight,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Filter,
  ChevronRight,
  Shield,
  Navigation
} from 'lucide-react';
import { Page } from '../types';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
}

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = Math.ceil(value / (duration / 60));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  
  return <span className="count-up">{displayValue.toLocaleString()}</span>;
};

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'mina' | 'arafat' | 'muz'>('mina');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);

  const locations: Record<string, [number, number]> = {
    mina: [21.4172, 39.8824],
    arafat: [21.3548, 39.9841],
    muz: [21.3891, 39.9366]
  };

  const locationZones: Record<string, { id: string, pos: [number, number], color: string }[]> = {
    mina: [
      { id: 'Z1', pos: [21.4182, 39.8834], color: '#C5A059' },
      { id: 'Z2', pos: [21.4152, 39.8814], color: '#10b981' },
      { id: 'Z3', pos: [21.4192, 39.8804], color: '#3B82F6' },
      { id: 'Z4', pos: [21.4162, 39.8844], color: '#F59E0B' }
    ],
    arafat: [
      { id: 'Z1', pos: [21.3560, 39.9850], color: '#C5A059' },
      { id: 'Z2', pos: [21.3530, 39.9820], color: '#10b981' },
      { id: 'Z3', pos: [21.3575, 39.9810], color: '#3B82F6' },
      { id: 'Z4', pos: [21.3525, 39.9865], color: '#F59E0B' }
    ],
    muz: [
      { id: 'Z1', pos: [21.3900, 39.9380], color: '#C5A059' },
      { id: 'Z2', pos: [21.3880, 39.9350], color: '#10b981' },
      { id: 'Z3', pos: [21.3915, 39.9345], color: '#3B82F6' },
      { id: 'Z4', pos: [21.3875, 39.9395], color: '#F59E0B' }
    ]
  };

  const companyData: Record<string, any> = {
    'Z1': { name: 'شركة مطوفي جنوب آسيا', logo: 'https://i.pravatar.cc/100?u=11', tents: 1420, manager: 'م. خالد الدوسري', status: 'نشط', density: 82, color: '#C5A059', performance: [40, 65, 82, 70, 90, 85, 95] },
    'Z2': { name: 'حجاج تركيا وأوروبا وأمريكا', logo: 'https://i.pravatar.cc/100?u=12', tents: 850, manager: 'أ. عمر الخطيب', status: 'نشط', density: 45, color: '#10b981', performance: [20, 30, 45, 55, 40, 50, 48] },
    'Z3': { name: 'المؤسسة الأهلية للدول العربية', logo: 'https://i.pravatar.cc/100?u=13', tents: 2300, manager: 'د. لؤي الثبيتي', status: 'جاهز', density: 68, color: '#3B82F6', performance: [50, 60, 55, 75, 80, 70, 72] },
    'Z4': { name: 'حجاج دول جنوب شرق آسيا', logo: 'https://i.pravatar.cc/100?u=14', tents: 1960, manager: 'م. فهد القرشي', status: 'نشط', density: 91, color: '#F59E0B', performance: [70, 85, 91, 80, 95, 88, 92] },
  };

  // Watch current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    setSelectedZone(null);
    const L = (window as any).L;
    if (!L || !mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const currentPos = locations[activeTab] || locations.mina;
    const newMap = L.map(mapContainerRef.current, {
      center: currentPos,
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    mapRef.current = newMap;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);

    const zones = locationZones[activeTab] || locationZones.mina;
    zones.forEach(zone => {
      const circle = L.circle(zone.pos, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.3,
        radius: 120,
        weight: 2
      }).addTo(newMap);

      circle.on('click', () => {
        setSelectedZone(zone.id);
        newMap.flyTo(zone.pos, 16);
      });

      circle.bindTooltip(`نطاق: ${companyData[zone.id].name}`, {
        permanent: false,
        direction: 'top',
        className: 'luxury-tooltip'
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activeTab]);

  // Handle user marker updates separately to avoid map re-init
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(userLocation);
    } else {
      userMarkerRef.current = L.circleMarker(userLocation, {
        radius: 8,
        fillColor: '#3B82F6',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(mapRef.current).bindTooltip("أنت هنا", { permanent: true, direction: 'right' });
    }
  }, [userLocation]);

  const handleLocateMe = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo(userLocation, 17);
    }
  };

  const currentZone = selectedZone ? companyData[selectedZone] : null;

  const kpis = {
    hajjCount: Math.floor(842500 * (activeTab === 'arafat' ? 1.2 : activeTab === 'muz' ? 0.8 : 1.0)),
    readiness: activeTab === 'arafat' ? 98 : activeTab === 'muz' ? 85 : 96,
    density: activeTab === 'mina' ? 72 : activeTab === 'arafat' ? 91 : 45,
    alerts: activeTab === 'muz' ? 3 : 0
  };

  return (
    <div className="min-h-screen bg-[#001a10] text-[#F8F9FA] flex flex-col font-sans overflow-hidden" dir="rtl">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="h-20 px-12 flex items-center justify-between border-b border-white/5 bg-[#004328] z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white/5 rounded-full p-1 border border-white/10 pr-4">
            <div className="text-right">
              <div className="text-[10px] font-bold text-white">معالي الوزير</div>
              <div className="text-[8px] text-[#C5A059] opacity-70">إدارة العمليات العليا</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center border border-[#004328]">
              <User className="w-4 h-4 text-[#004328]" />
            </div>
          </div>
          <div className="relative cursor-pointer group">
            <Bell className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
            <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border border-[#004328] ${kpis.alerts > 0 ? 'bg-red-500' : 'bg-transparent'}`}></span>
          </div>
        </div>

        <nav className="flex items-center bg-black/30 p-1 rounded-xl border border-white/10">
          {[
            { id: 'mina', label: 'مشعر منى', icon: Tent },
            { id: 'arafat', label: 'مشعر عرفات', icon: MapIcon },
            { id: 'muz', label: 'مشعر مزدلفة', icon: Layers },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-10 py-2.5 rounded-lg flex items-center gap-2 transition-all font-bold text-xs ${
                activeTab === tab.id 
                  ? 'bg-[#C5A059] text-[#004328] shadow-lg shadow-gold/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-lg font-black text-white leading-none">وزارة الحج والعمرة</div>
            <div className="text-[8px] text-[#C5A059] uppercase tracking-widest font-black opacity-80">بوابة الإدارة المركزية</div>
          </div>
          <div className="w-12 h-12 bg-white/5 border border-[#C5A059]/30 rounded-xl flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_of_the_Ministry_of_Hajj_and_Umrah.svg" alt="MOHU" className="w-8 h-8 invert" />
          </div>
        </div>
      </header>

      {/* 2. LARGE CHARTS SECTION */}
      <div className="h-44 bg-[#002b1a] border-b border-white/5 flex items-center px-12 gap-8 overflow-x-auto custom-scrollbar shadow-inner z-40">
        <div className="glass-panel min-w-[320px] h-32 rounded-[25px] p-5 flex flex-col justify-between border-white/5 blur-in">
           <div className="flex justify-between items-center text-[10px] font-black text-[#C5A059] uppercase tracking-widest">
              <span>إجمالي الحجاج في {activeTab === 'mina' ? 'منى' : activeTab === 'arafat' ? 'عرفات' : 'مزدلفة'}</span>
              <Users className="w-4 h-4 opacity-50" />
           </div>
           <div className="text-4xl font-black text-white -mt-1"><AnimatedNumber value={kpis.hajjCount} /></div>
           <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>تحديث بيانات لحظي</span>
           </div>
        </div>

        <div className="glass-panel min-w-[320px] h-32 rounded-[25px] p-5 flex items-center gap-6 border-white/5 blur-in" style={{ animationDelay: '0.1s' }}>
           <div className="relative w-20 h-20 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                 <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
                 <circle cx="40" cy="40" r="34" stroke="#10b981" strokeWidth="6" fill="transparent" strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - kpis.readiness / 100)} strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-sm font-black">{kpis.readiness}%</span>
              </div>
           </div>
           <div>
              <div className="text-[10px] font-black text-white/40 uppercase mb-1">نسبة الجاهزية التشغيلية</div>
              <div className="text-xl font-black text-white">اكتمال الخدمات</div>
              <div className="text-[10px] text-[#C5A059] font-bold mt-1">الميدان مُهيّأ تماماً</div>
           </div>
        </div>

        <div className="glass-panel min-w-[320px] h-32 rounded-[25px] p-5 flex flex-col justify-between border-white/5 blur-in" style={{ animationDelay: '0.2s' }}>
           <div className="flex justify-between items-center text-[10px] font-black text-white/40">
              <span>توزيع الكثافة (٢٤ ساعة)</span>
              <Activity className="w-4 h-4 text-[#F59E0B]" />
           </div>
           <div className="flex items-end gap-1.5 h-12">
              {[30, 45, 60, 85, 92, 70, 50, 40, 65, 80].map((h, i) => (
                <div key={i} className={`flex-grow rounded-t-sm transition-all hover:opacity-100 ${i === 4 ? 'bg-red-500 opacity-80' : 'bg-[#C5A059] opacity-30'}`} style={{ height: `${h}%` }}></div>
              ))}
           </div>
           <div className="text-[9px] text-white/20 font-black uppercase flex justify-between">
              <span>ذروة: {kpis.density}%</span>
              <span>معدل تدفق آمن</span>
           </div>
        </div>

        <div className="glass-panel min-w-[320px] h-32 rounded-[25px] p-5 flex flex-col justify-between border-white/5 blur-in" style={{ animationDelay: '0.3s' }}>
           <div className="text-[10px] font-black text-white/40 uppercase">المؤشر الأمني والمروري</div>
           <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${kpis.alerts > 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                 <Shield className={`w-6 h-6 ${kpis.alerts > 0 ? 'text-red-500' : 'text-emerald-500'}`} />
              </div>
              <div>
                 <div className="text-xl font-black text-white">{kpis.alerts > 0 ? 'تنبيهات نشطة' : 'مستقرة جداً'}</div>
                 <div className="text-[10px] text-white/40">{kpis.alerts > 0 ? `هناك ${kpis.alerts} بلاغات معالجة` : 'لا توجد بلاغات حرجة'}</div>
              </div>
           </div>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${kpis.alerts > 0 ? 'bg-red-500 w-[60%]' : 'bg-emerald-500 w-[94%]'}`}></div>
           </div>
        </div>
      </div>

      <main className="flex-grow flex relative">
        {/* RIGHT SIDEBAR (First in RTL flow) */}
        <div className="w-[440px] bg-[#002b1a] border-l border-white/5 flex flex-col p-8 z-40 shadow-2xl overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.3em]">بيانات الجهات والشركات</h2>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <Filter className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>

          {!selectedZone ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center opacity-30 gap-8 grayscale">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border-2 border-dashed border-white/10">
                 <MapIcon className="w-10 h-10 text-[#C5A059]" />
              </div>
              <div>
                 <h3 className="text-xl font-black mb-2">تحديد النطاق الميداني</h3>
                 <p className="text-xs font-medium max-w-[200px] leading-relaxed">يرجى الضغط على أحد النطاقات الملونة في الخريطة لعرض تفاصيل الشركة والخدمات في مشعر {activeTab === 'mina' ? 'منى' : activeTab === 'arafat' ? 'عرفات' : 'مزدلفة'}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10 blur-in">
              <div className="flex flex-col items-center text-center gap-5">
                <div className="relative">
                   <div className="w-32 h-32 rounded-[50px] border-4 border-[#C5A059]/20 p-2 bg-black/40 shadow-2xl relative z-10">
                     <img src={currentZone.logo} className="w-full h-full object-cover rounded-[40px]" />
                   </div>
                   <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-[#002b1a] flex items-center justify-center z-20">
                      <Shield className="w-4 h-4 text-white" />
                   </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">{currentZone.name}</h3>
                  <div className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest mt-2 px-4 py-1.5 bg-[#C5A059]/10 rounded-full inline-block">
                    ترخيص تشغيلي: {activeTab === 'mina' ? 'M' : activeTab === 'arafat' ? 'A' : 'Z'}-١٤٤٥-٠٠٩٢
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[40px] border-white/5">
                <div className="flex justify-between items-center mb-8">
                   <span className="text-[10px] text-white/40 font-black tracking-widest uppercase">مؤشر أداء المشعر اللحظي</span>
                   <BarChart3 className="w-4 h-4 text-white/20" />
                </div>
                <div className="flex items-end gap-3 h-28">
                   {currentZone.performance.map((val: number, i: number) => (
                     <div key={i} className="flex-grow bg-[#C5A059] rounded-t-lg transition-all duration-700" style={{ height: `${val}%`, opacity: 0.1 + (i / 7) * 0.9 }}></div>
                   ))}
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center shrink-0 border border-white/5">
                       <Tent className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <div className="flex-grow">
                       <div className="text-[10px] text-white/40 font-bold mb-1">المخيمات المخصصة</div>
                       <div className="text-xl font-black text-white">{currentZone.tents} مخيم</div>
                    </div>
                 </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4">
                 <button className="bg-[#C5A059] text-[#004328] font-black py-5 rounded-3xl hover:bg-[#d4b06a] transition-all flex items-center justify-center gap-2 text-sm shadow-xl transform active:scale-95">
                    <Activity className="w-5 h-5" />
                    تحكم مباشر
                 </button>
                 <button className="bg-white/5 border border-white/10 text-white font-bold py-5 rounded-3xl hover:bg-white/10 transition-all text-sm flex items-center justify-center gap-2" onClick={() => setSelectedZone(null)}>
                    <LogOut className="w-5 h-5 rotate-180 opacity-40" />
                    إلغاء التحديد
                 </button>
              </div>
            </div>
          )}

          <div className="mt-10">
             <button onClick={() => onNavigate(Page.FIELD_CENTER)} className="w-full bg-[#004328] hover:bg-[#003d33] border border-[#C5A059]/30 text-[#C5A059] font-black py-5 rounded-[40px] flex items-center justify-center gap-3 transition-all group">
                <Filter className="w-5 h-5 transition-transform group-hover:rotate-180" />
                <span>عرض العمليات الميدانية</span>
                <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-1" />
             </button>
          </div>
        </div>

        {/* GIS MAP SECTION (Central/Left in visual) */}
        <div className="flex-grow relative bg-[#0a0f0d]">
          <div ref={mapContainerRef} className="absolute inset-0 z-0"></div>

          <div className="absolute top-8 right-8 flex flex-col gap-3 z-20">
            <div className="flex flex-col gap-1 bg-[#004328]/90 backdrop-blur rounded-2xl border border-white/10 p-1 shadow-2xl">
              <button onClick={() => mapRef.current?.zoomIn()} className="w-10 h-10 rounded-xl flex items-center justify-center text-[#C5A059] hover:bg-white/10 transition-all">
                <Plus className="w-5 h-5" />
              </button>
              <button onClick={() => mapRef.current?.zoomOut()} className="w-10 h-10 rounded-xl flex items-center justify-center text-[#C5A059] hover:bg-white/10 transition-all">
                <Minus className="w-5 h-5" />
              </button>
            </div>
            <button onClick={() => mapRef.current?.flyTo(locations[activeTab], 15)} className="w-12 h-12 bg-[#004328]/90 backdrop-blur rounded-2xl border border-white/10 flex items-center justify-center text-[#C5A059] hover:bg-white/10 transition-all shadow-2xl">
              <Target className="w-5 h-5" />
            </button>
            <button onClick={handleLocateMe} className={`w-12 h-12 bg-[#004328]/90 backdrop-blur rounded-2xl border border-white/10 flex items-center justify-center transition-all shadow-2xl ${userLocation ? 'text-[#3B82F6]' : 'text-white/20'}`}>
              <Navigation className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-20">
            <div className="bg-[#004328]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 flex items-center shadow-2xl">
              <Search className="mx-4 w-4 h-4 text-white/20" />
              <input type="text" placeholder="البحث في المشاعر المقدسة..." className="w-full bg-transparent border-none text-xs py-3 text-white focus:outline-none placeholder:text-white/20" />
              <button className="bg-[#C5A059] text-[#004328] font-black px-6 py-2.5 rounded-xl text-[10px] transform active:scale-95 transition-transform">بحث ذكي</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
