
import React from 'react';
import { Page } from '../types';
import { 
  Search, 
  Shield, 
  Activity, 
  Map as MapIcon, 
  ChevronRight, 
  PhoneCall, 
  AlertTriangle,
  LayoutGrid,
  Zap
} from 'lucide-react';

interface FieldCenterPageProps {
  onNavigate: (page: Page) => void;
}

const FieldCenterPage: React.FC<FieldCenterPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen luxury-gradient text-[#F8F9FA] flex flex-col font-sans" dir="rtl">
      {/* Top Navbar */}
      <header className="h-24 px-12 flex items-center justify-between border-b border-white/5 bg-[#004328]">
        <div className="flex items-center gap-8">
          <div 
            onClick={() => onNavigate(Page.DASHBOARD)}
            className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5"
          >
            <ChevronRight className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black">إدارة العمليات الميدانية</h1>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-500 text-xs font-bold animate-pulse">
             مباشر: مركز عمليات مشعر عرفات
           </div>
           <div className="w-12 h-12 bg-[#C5A059] rounded-xl flex items-center justify-center">
             <Shield className="w-6 h-6 text-[#004328]" />
           </div>
        </div>
      </header>

      {/* Grid Content */}
      <div className="flex-grow p-12 grid grid-cols-12 gap-8">
        
        {/* Right Side: Log & Commands (Now first in grid for RTL) */}
        <div className="col-span-4 space-y-8">
           <div className="glass-panel h-full rounded-[40px] p-10 flex flex-col gap-8">
              <h2 className="text-xl font-bold flex items-center gap-3">
                 <Zap className="w-5 h-5 text-[#C5A059]" />
                 سجل الأحداث اللحظي
              </h2>

              <div className="flex-grow overflow-y-auto custom-scrollbar space-y-6">
                 {[
                   { time: '١٠:٤٥ ص', text: 'تم اكتمال تفويج النطاق (أ)', type: 'success' },
                   { time: '١٠:٤٢ ص', text: 'تنبيه: ارتفاع درجة الحرارة في مخيم ٢٤', type: 'warning' },
                   { time: '١٠:٣٠ ص', text: 'وصول قافلة حجاج جنوب أفريقيا', type: 'info' },
                   { time: '١٠:١٥ ص', text: 'بدء عمليات التعقيم في مرافق مزدلفة', type: 'info' },
                 ].map((log, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className="text-[10px] text-[#C5A059] font-bold py-1 w-14 shrink-0 opacity-40 group-hover:opacity-100">{log.time}</div>
                      <div className="relative">
                         <div className="w-1.5 h-1.5 bg-white/20 rounded-full mt-2 group-hover:bg-[#C5A059] transition-colors"></div>
                         <div className="absolute top-4 left-[3px] bottom-[-24px] w-px bg-white/5"></div>
                      </div>
                      <div className="text-sm text-white/60 leading-relaxed group-hover:text-white transition-colors">{log.text}</div>
                   </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                 <button className="w-full bg-[#004328] hover:bg-[#002b1a] text-[#C5A059] font-black py-5 rounded-2xl transition-all border border-[#C5A059]/20 shadow-2xl">
                    إرسال توجيه عام للميدان
                 </button>
              </div>
           </div>
        </div>

        {/* Left Side: Live Feed & GIS */}
        <div className="col-span-8 space-y-8">
           <div className="relative h-[600px] bg-black/40 rounded-[40px] border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 grayscale opacity-20 contrast-150" style={{ backgroundImage: `url('https://picsum.photos/id/1016/1600/1200')`, backgroundSize: 'cover' }}></div>
              
              <div className="absolute top-10 right-10 p-8 glass-panel rounded-[30px] border-[#C5A059]/20 w-80 blur-in">
                 <div className="text-[10px] text-[#C5A059] font-black uppercase tracking-widest mb-4">بيانات الموقع الحالي</div>
                 <div className="space-y-6">
                    <div>
                       <div className="text-white/40 text-[10px] mb-1">رقم المربع التشغيلي</div>
                       <div className="text-2xl font-black">A-421 / عرفات</div>
                    </div>
                    <div>
                       <div className="text-white/40 text-[10px] mb-1">سرعة الاستجابة الميدانية</div>
                       <div className="text-2xl font-black text-emerald-500">٣.٤ دقيقة</div>
                    </div>
                    <div className="h-px bg-white/5"></div>
                    <button className="w-full bg-[#C5A059] text-[#004328] font-black py-4 rounded-2xl hover:bg-[#d4b06a] transition-all flex items-center justify-center gap-2">
                       <PhoneCall className="w-4 h-4" />
                       نداء الطوارئ
                    </button>
                 </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                    <div className="w-32 h-32 bg-[#C5A059]/20 rounded-full animate-ping absolute -inset-10"></div>
                    <div className="w-12 h-12 bg-[#C5A059] rounded-2xl flex items-center justify-center shadow-2xl border-2 border-[#004328] z-10 relative">
                       <MapIcon className="w-6 h-6 text-[#004328]" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-3 gap-8">
              {[
                { label: 'كاميرات المراقبة', val: '٨٤ وحدة', icon: Activity, color: 'emerald' },
                { label: 'نقاط الإمداد', val: '١٢ نقطة', icon: LayoutGrid, color: 'gold' },
                { label: 'بلاغات نشطة', val: '٠ بلاغ', icon: AlertTriangle, color: 'white' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-[35px] border border-white/10 hover:border-[#C5A059]/30 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className={`w-6 h-6 ${item.color === 'gold' ? 'text-[#C5A059]' : 'text-white'}`} />
                  </div>
                  <div className="text-white/40 text-xs mb-1">{item.label}</div>
                  <div className="text-2xl font-black">{item.val}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default FieldCenterPage;
