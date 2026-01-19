
import React from 'react';
import { User, Shield, Briefcase, FileSignature, ChevronLeft, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface RegisterPageProps {
  onBack: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onBack }) => {
  return (
    <div className="flex min-h-screen bg-white" dir="rtl">
      {/* Left Decorative Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(0, 77, 64, 0.85), rgba(0, 77, 64, 0.9)), url('https://picsum.photos/id/1019/1200/1200')` }}
        ></div>
        
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-400" />
             </div>
             <div>
               <div className="font-bold text-lg">الوصول المصرح به</div>
               <div className="text-xs opacity-70">نظام الإدارة المركزية</div>
             </div>
          </div>

          <div className="max-w-md">
            <div className="w-16 h-1 bg-emerald-400 mb-6"></div>
            <h1 className="text-5xl font-black mb-6 leading-tight">خدمة ضيوف الرحمن أمانة ومسؤولية</h1>
            <p className="text-xl opacity-80 leading-relaxed mb-8">
              مرحباً بكم في منصة الخدمات الإدارية الموحدة لوزارة الحج والعمرة. نهدف من خلال هذه البوابة إلى تسهيل الإجراءات الإدارية ورفع كفاءة العمل المؤسسي.
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur text-center border border-white/10">
                <Shield className="w-6 h-6 mx-auto mb-2 text-emerald-300" />
                <div className="text-xs">بيئة آمنة</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur text-center border border-white/10">
                <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                <div className="text-xs">إنجاز سريع</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur text-center border border-white/10">
                <RefreshCw className="w-6 h-6 mx-auto mb-2 text-blue-300" />
                <div className="text-xs">ربط مباشر</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm opacity-60">
            <span>© ٢٠٢٤ وزارة الحج والعمرة</span>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
           <div className="flex items-center gap-2">
             <span className="text-sm text-gray-400 font-bold">وزارة الحج والعمرة</span>
             <div className="w-6 h-6 bg-emerald-500 rounded-sm"></div>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-xs text-gray-400">هل لديك حساب؟</span>
             <button onClick={onBack} className="text-emerald-500 text-xs font-bold hover:underline">تسجيل الدخول</button>
           </div>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-lg mx-auto w-full">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">تسجيل مسؤول جديد</h2>
          <p className="text-gray-400 mb-10">يرجى إدخال البيانات الرسمية لإتمام عملية التسجيل في البوابة الوزارية</p>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm">الاسم الكامل</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="أدخل الاسم الثلاثي" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm">الإدارة القسم</label>
              <div className="relative">
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-4 pl-10 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-500">
                  <option>اختر الإدارة التابع لها</option>
                  <option>إدارة شؤون الحجاج</option>
                  <option>إدارة الخدمات اللوجستية</option>
                  <option>إدارة الأمن والسلامة</option>
                </select>
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm">الرقم الوظيفي</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="00000000" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                />
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm">تحميل التوقيع الرقمي</label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer group">
                <FileSignature className="w-10 h-10 mx-auto mb-4 text-gray-300 group-hover:text-emerald-400 transition-colors" />
                <p className="text-sm text-gray-500">اسحب وأفلت ملف التوقيع هنا أو <span className="text-emerald-500 font-bold">تصفح الجهاز</span></p>
                <p className="text-[10px] text-gray-400 mt-2">يدعم صيغ PNG, JPG مع خلفية شفافة</p>
              </div>
            </div>

            <button 
              type="button"
              className="w-full bg-[#004d40] hover:bg-[#003d33] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/10"
            >
              <User className="w-5 h-5" />
              <span>إتمام عملية التسجيل</span>
            </button>
          </form>
        </div>

        <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 font-medium">
          <div className="flex gap-4">
            <span className="hover:text-emerald-600 cursor-pointer">الدعم الفني</span>
            <span className="hover:text-emerald-600 cursor-pointer">سياسة الخصوصية</span>
          </div>
          <span>© 2024 وزارة الحج والعمرة</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
