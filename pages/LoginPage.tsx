
import React from 'react';
import { User, Lock, Globe, ChevronLeft, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center luxury-gradient overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#C5A059] opacity-5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#004328] opacity-20 rounded-full blur-[120px]"></div>
      
      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-6xl px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-col text-white animate-fadeIn">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-[#C5A059] rounded-2xl flex items-center justify-center shadow-2xl">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_of_the_Ministry_of_Hajj_and_Umrah.svg" alt="MOHU" className="w-10 h-10 invert brightness-0" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-wide">وزارة الحج والعمرة</h2>
              <p className="text-xs text-[#C5A059] uppercase tracking-[0.2em]">Ministry of Hajj and Umrah</p>
            </div>
          </div>
          
          <h1 className="text-6xl font-black leading-tight mb-8">
            بوابة الإدارة <br />
            <span className="text-[#C5A059]">المركزية والذكية</span>
          </h1>
          
          <p className="text-lg text-white/60 max-w-md leading-relaxed mb-12">
            منصة متطورة لإدارة العمليات الميدانية وتخصيص المخيمات في المشاعر المقدسة باستخدام أحدث تقنيات الـ GIS والذكاء الاصطناعي.
          </p>
          
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#C5A059]">١.٨+ م</span>
              <span className="text-xs text-white/40">حاج تتم إدارتهم</span>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#C5A059]">١٠٠٪</span>
              <span className="text-xs text-white/40">تخصيص رقمي</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="glass-panel rounded-[40px] p-10 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059] opacity-5 rounded-bl-[100px]"></div>
            
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-white mb-2">تسجيل الدخول</h3>
              <p className="text-white/40 text-sm">أدخل بياناتك للوصول إلى لوحة التحكم</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs text-[#C5A059] font-bold mr-1">الرقم الوظيفي / البريد</label>
                <div className="relative group">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#C5A059] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="example@haj.gov.sa"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-[#C5A059] transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs text-[#C5A059] font-bold">كلمة المرور</label>
                  <span className="text-[10px] text-white/30 cursor-pointer hover:text-[#C5A059]">نسيت كلمة المرور؟</span>
                </div>
                <div className="relative group">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#C5A059] transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:outline-none focus:border-[#C5A059] transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <button 
                onClick={onLogin}
                className="w-full bg-[#C5A059] hover:bg-[#d4b06a] text-[#004328] font-black py-4 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>دخول النظام</span>
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>

              <div className="text-center pt-4">
                <p className="text-white/30 text-xs">
                  ليس لديك صلاحية وصول؟ 
                  <button onClick={onRegister} className="text-[#C5A059] font-bold mr-2 hover:underline">طلب تسجيل</button>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-4 text-white/20 text-[10px]">
            <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> نظام مشفر</div>
            <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            <div className="flex items-center gap-1"><Globe className="w-3 h-3" /> السحابة الحكومية</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
