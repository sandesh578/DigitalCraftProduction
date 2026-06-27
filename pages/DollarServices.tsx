import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Check, X, Shield, ArrowRight, Wallet, Banknote, HelpCircle, Phone, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useTheme } from '../App';
import SEO from '../components/SEO';

type ServiceType = '0:ads' | '200:flat' | 'pct3:pct' | 'pct2:pct' | '300:flat' | '250:flat' | 'pct15:pct' | '500:flat';
type FormType = 'Business' | 'Personal' | 'Freelancer' | 'NGO / Organization';

interface SelectedPackage {
  name: string;
  detail: string;
  type: 'Ads Package' | 'Dollar Service';
}

const DollarServices: React.FC = () => {
  const { theme } = useTheme();
  
  // Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(50);
  const [calcService, setCalcService] = useState<ServiceType>('0:ads');
  
  // Selection State
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    type: 'Business' as FormType,
    purpose: '',
    budget: '',
    source: '',
    notes: ''
  });

  // Calculate fees
  const getFee = (amount: number, service: ServiceType) => {
    const base = amount * 165;
    let fee = 0;
    
    if (service === '200:flat') fee = 200;
    else if (service === '300:flat') fee = 300;
    else if (service === '250:flat') fee = 250;
    else if (service === '500:flat') fee = 500;
    else if (service === 'pct3:pct') fee = Math.round(base * 0.03);
    else if (service === 'pct2:pct') fee = Math.round(base * 0.02);
    else if (service === 'pct15:pct') fee = Math.round(base * 0.015);
    
    return {
      base,
      fee,
      total: base + fee
    };
  };

  const { base, fee, total } = getFee(calcAmount, calcService);
  const selectedBarRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to selected bar
  useEffect(() => {
    if (selectedPackage && selectedBarRef.current) {
      selectedBarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedPackage]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.business || !formData.purpose || !formData.source) {
      alert('Please fill in all required fields (*).');
      return;
    }

    setIsSubmitting(true);

    const subject = encodeURIComponent(`New DCP Dollar Package Request — ${selectedPackage?.name}`);
    const body = encodeURIComponent(
      `NEW REQUEST FROM DCP DOLLAR SERVICES PAGE\n` +
      `==========================================\n\n` +
      `SELECTED: ${selectedPackage?.type}\n` +
      `Package / Service: ${selectedPackage?.name}\n` +
      `Details: ${selectedPackage?.detail}\n\n` +
      `CUSTOMER DETAILS\n` +
      `----------------\n` +
      `Full Name: ${formData.name}\n` +
      `Phone / WhatsApp: ${formData.phone}\n` +
      `Business / Personal Name: ${formData.business}\n` +
      `Type: ${formData.type}\n` +
      `Purpose / What to run ads for: ${formData.purpose}\n` +
      `Estimated Budget: ${formData.budget || 'Not provided'}\n` +
      `How they heard about DCP: ${formData.source}\n` +
      `Additional Notes: ${formData.notes || 'None'}\n\n` +
      `==========================================\n` +
      `Sent from DCP Dollar Services Website`
    );

    window.location.href = `mailto:digitalcraftp@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 1200);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsSuccess(false), 300); // Reset after animation
  };

  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <SEO 
        title="Dollar Services" 
        description="Pay in Dollars. Simple, Fast, Trusted. Run ads, transfer dollars, load Mastercard, pay via PayPal — all handled by DCP at Nepal's best service rate."
        keywords="dollar load nepal, mastercard load nepal, facebook ads nepal dollar, paypal transfer nepal, international payment nepal"
      />
      
      {/* HERO SECTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 mb-16 animate-fade-in-up">
        <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wider uppercase mb-6 border border-indigo-200 dark:border-indigo-800/60">
          DCP Dollar Services — Nepal
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Pay in Dollars.<br className="hidden md:block"/> Simple, Fast, Trusted.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Run ads, transfer dollars, load Mastercard, pay via PayPal — all handled by DCP at Nepal's best service rate.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left shadow-sm flex-1 max-w-sm mx-auto sm:mx-0">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Ads running (via DCP)</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">Rs. 180–184 / $</div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">For Meta, Google, TikTok ad spend</div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-500 dark:border-indigo-500/50 rounded-2xl p-6 text-left shadow-sm flex-1 max-w-sm mx-auto sm:mx-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
               <Wallet className="w-16 h-16 text-indigo-500" />
            </div>
            <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1 uppercase tracking-wider relative z-10">Dollar services (transfer, load)</div>
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 relative z-10">Rs. 165 / $</div>
            <div className="text-xs text-indigo-600/80 dark:text-indigo-400/80 mt-2 relative z-10">For all extra services listed below</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CALCULATOR */}
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6">
            Live NPR Calculator
          </h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300 md:w-40 shrink-0">Select Service</label>
              <div className="flex-1 relative">
                <select 
                  value={calcService}
                  onChange={(e) => setCalcService(e.target.value as ServiceType)}
                  className="w-full appearance-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700"
                >
                  <option value="0:ads">Meta Ads account load</option>
                  <option value="200:flat">Mastercard load (+ Rs. 200)</option>
                  <option value="pct3:pct">PayPal transfer (+ 3%)</option>
                  <option value="pct2:pct">International bank transfer (+ 2%)</option>
                  <option value="300:flat">TikTok account load (+ Rs. 300)</option>
                  <option value="250:flat">Google / Apple Pay top-up (+ Rs. 250)</option>
                  <option value="pct15:pct">Wise transfer (+ 1.5%)</option>
                  <option value="500:flat">Dollar to NPR cash out (+ Rs. 500)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300 md:w-40 shrink-0">Amount ($)</label>
              <div className="flex-1 flex items-center gap-4">
                <input 
                  type="range" 
                  min="5" 
                  max="1000" 
                  step="5" 
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="w-20 text-right text-lg font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  ${calcAmount}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Dollar Amount</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">${calcAmount}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Base (@ Rs. 165)</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">Rs. {base.toLocaleString()}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Service Fee</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">Rs. {fee.toLocaleString()}</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 shadow-sm relative overflow-hidden">
                <div className="text-xs text-indigo-700 dark:text-indigo-300 mb-1 relative z-10">Total you pay</div>
                <div className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400 relative z-10">Rs. {total.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ADS PACKAGES */}
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6">
            Ads running packages — select to buy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Package 1 */}
            <div 
              onClick={() => setSelectedPackage({ name: 'Minimum Boost', detail: 'Rs. 180–184 per dollar. Meta / Instagram / Google. 1 campaign. Monthly report.', type: 'Ads Package' })}
              className={`bg-white dark:bg-slate-900 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 relative group
                ${selectedPackage?.name === 'Minimum Boost' ? 'border-indigo-600 shadow-lg shadow-indigo-500/10' : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md'}
              `}
            >
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${selectedPackage?.name === 'Minimum Boost' ? 'bg-indigo-600 border-indigo-600 shadow-sm' : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-indigo-400 dark:group-hover:border-indigo-500'}`}>
                {selectedPackage?.name === 'Minimum Boost' ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
              <span className="inline-block py-1 px-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold mb-4">Starter</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Minimum Boost</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">Up to $5</span>
                <span className="text-sm text-slate-500">/ day</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">Rs. 184 per dollar</p>
              
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Meta / Instagram / Google</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> 1 campaign managed</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Ads setup included</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Monthly report</div>
                <div className="flex items-start gap-3 text-sm text-slate-400 dark:text-slate-600"><X className="w-4 h-4 text-rose-500 mt-0.5 shrink-0"/> No creative design</div>
              </div>
            </div>

            {/* Package 2 */}
            <div 
              onClick={() => setSelectedPackage({ name: 'High Boost', detail: 'Rs. 180 per dollar (discount rate). Meta + Instagram + Google. Multiple campaigns + A/B test. Bi-weekly report. 1 ad creative/month.', type: 'Ads Package' })}
              className={`bg-white dark:bg-slate-900 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 relative group shadow-lg
                ${selectedPackage?.name === 'High Boost' ? 'border-indigo-600 shadow-indigo-500/20 scale-[1.02]' : 'border-indigo-300 dark:border-indigo-800 hover:border-indigo-500'}
              `}
            >
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${selectedPackage?.name === 'High Boost' ? 'bg-indigo-600 border-indigo-600 shadow-sm' : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-indigo-400 dark:group-hover:border-indigo-500'}`}>
                {selectedPackage?.name === 'High Boost' ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-600 text-white text-xs font-semibold mb-4 shadow-sm">Best rate</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">High Boost</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">Above $5</span>
                <span className="text-sm text-slate-500">/ day</span>
              </div>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-6">Rs. 180 per dollar — save Rs. 4/$</p>
              
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Meta + Instagram + Google</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Multiple campaigns + A/B</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Ads setup included</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Bi-weekly report</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium"><Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0"/> 1 ad creative / month</div>
              </div>
            </div>

            {/* Package 3 */}
            <div 
              onClick={() => setSelectedPackage({ name: 'Custom Business', detail: 'Fully customized plan. Any platform, any spend. Full setup + strategy. Creatives + copywriting. Dedicated manager. Rate negotiable at scale.', type: 'Ads Package' })}
              className={`bg-white dark:bg-slate-900 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 relative group
                ${selectedPackage?.name === 'Custom Business' ? 'border-indigo-600 shadow-lg shadow-indigo-500/10' : 'border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700/50 hover:shadow-md'}
              `}
            >
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${selectedPackage?.name === 'Custom Business' ? 'bg-indigo-600 border-indigo-600 shadow-sm' : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-indigo-400 dark:group-hover:border-indigo-500'}`}>
                {selectedPackage?.name === 'Custom Business' ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
              <span className="inline-block py-1 px-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-4">Custom</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Customize for Biz</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">Your budget</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">We build around your needs</p>
              
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Any platform, any spend</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Full setup + strategy</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Creatives + copywriting</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Dedicated manager</div>
                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"/> Rate negotiable at scale</div>
              </div>
            </div>
            
          </div>
        </div>

        {/* EXTRA DOLLAR SERVICES */}
        <div className="mb-10">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6">
            Extra dollar services — select to buy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Meta Ads load', icon: '📣', badge: 'Most used', badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', rate: 'Rs. 165 / $', fee: 'No extra fee', detail: 'Top up your Facebook / Instagram ad account directly in dollars.' },
              { name: 'Mastercard load', icon: '💳', badge: 'Load card', badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300', rate: 'Rs. 165 / $', fee: '+ Rs. 200 flat fee', detail: 'Load virtual or physical Mastercard for online payments anywhere.' },
              { name: 'PayPal transfer', icon: '🅿️', badge: 'Transfer', badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', rate: 'Rs. 165 / $', fee: '+ 3% service fee', detail: 'Send dollars to any verified PayPal account worldwide.' },
              { name: 'Bank wire transfer', icon: '🏦', badge: 'International', badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', rate: 'Rs. 165 / $', fee: '+ 2% service fee', detail: 'Send dollars to any international bank account in 24–48 hrs.' },
              { name: 'TikTok ads load', icon: '📱', badge: 'Ads load', badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300', rate: 'Rs. 165 / $', fee: '+ Rs. 300 flat fee', detail: 'Top up TikTok Ads Manager in dollars for Nepali businesses.' },
              { name: 'Google/Apple Pay', icon: '🌐', badge: 'Wallet', badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', rate: 'Rs. 165 / $', fee: '+ Rs. 250 flat fee', detail: 'Top up international digital wallets for subscriptions and purchases.' },
              { name: 'Wise transfer', icon: '⚡', badge: 'Low fee', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', rate: 'Rs. 165 / $', fee: '+ 1.5% service fee', detail: 'Fast, low-cost international transfer via Wise to any country.' },
              { name: 'Dollar cash out', icon: '💵', badge: 'Cash out', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', rate: 'Rs. 165 / $', fee: '+ Rs. 500 service charge', detail: 'Convert your dollars to Nepali Rupees — paid via eSewa, bank or cash.' },
            ].map((srv, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPackage({ name: srv.name, detail: srv.detail, type: 'Dollar Service' })}
                className={`bg-white dark:bg-slate-900 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 relative group
                  ${selectedPackage?.name === srv.name ? 'border-indigo-600 shadow-md shadow-indigo-500/10' : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'}
                `}
              >
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${selectedPackage?.name === srv.name ? 'bg-indigo-600 border-indigo-600 shadow-sm' : 'bg-transparent border-slate-300 dark:border-slate-600 group-hover:border-indigo-400 dark:group-hover:border-indigo-500'}`}>
                  {selectedPackage?.name === srv.name ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </div>
                <div className="text-3xl mb-3">{srv.icon}</div>
                <span className={`inline-block py-0.5 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${srv.badgeColor}`}>{srv.badge}</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{srv.name}</h4>
                <div className="text-sm font-semibold text-slate-900 dark:text-white mt-2">{srv.rate}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">{srv.fee}</div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{srv.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SELECTION BAR */}
        <div 
          ref={selectedBarRef}
          className={`bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5 md:p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 origin-top
            ${selectedPackage ? 'opacity-100 scale-100 flex' : 'opacity-0 scale-95 hidden'}
          `}
        >
          <div className="flex-1">
            <div className="text-indigo-800 dark:text-indigo-300 font-bold text-lg mb-1">{selectedPackage?.name}</div>
            <div className="text-indigo-600 dark:text-indigo-400 text-sm leading-relaxed">{selectedPackage?.detail}</div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            Buy this package <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* INFO BAR */}
        <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 mb-16">
          <Shield className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <p>All services processed within 24 hours. Payment accepted via eSewa, bank transfer, or cash. Contact DCP before sending payment. Rate is fixed at time of billing.</p>
        </div>

        {/* CHAT/SUPPORT SECTION */}
        <div className="mb-12">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6">
            Budget feels too high? Let's talk
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-slate-900 dark:bg-slate-950 p-6 md:p-8 flex items-start gap-4 text-white">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl shrink-0 border-2 border-white/20">
                👨‍💼
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Let's finalize your budget together</h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">Every business is different. If the cost feels high, we'll find a plan that fits — even if it means starting small and scaling up.</p>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl rounded-bl-sm p-4 text-sm text-slate-700 dark:text-slate-300 self-start max-w-[85%] md:max-w-[70%]">
                Hi! Looks like the budget is a bit high for you right now. That's totally okay — let's find something that works. 😊
              </div>
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-br-sm p-4 text-sm text-slate-500 italic self-end max-w-[85%] md:max-w-[70%]">
                "The cost is too high for me right now..."
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl rounded-bl-sm p-4 text-sm text-slate-700 dark:text-slate-300 self-start max-w-[85%] md:max-w-[70%]">
                No worries! We can start with as little as $1–2/day and scale as you see results. Let's talk and customize a plan that fits your budget perfectly.
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl rounded-bl-sm p-4 text-sm text-slate-700 dark:text-slate-300 self-start max-w-[85%] md:max-w-[70%]">
                Reach out on WhatsApp or email — we usually reply within 1–2 hours. 🚀
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
               <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase text-center mb-6">Choose how you'd like to connect</div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <NavLink to="/contact" className="flex items-center gap-4 bg-[#25D366] hover:bg-[#1ebd59] text-white p-4 rounded-xl transition-transform hover:-translate-y-0.5">
                   <Phone className="w-6 h-6 shrink-0" />
                   <div>
                     <div className="font-bold text-sm">Chat on WhatsApp</div>
                     <div className="text-xs text-white/80 mt-0.5">Direct via Contact Page</div>
                   </div>
                 </NavLink>
                 <NavLink to="/contact" className="flex items-center gap-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 p-4 rounded-xl transition-transform hover:-translate-y-0.5 group text-slate-900 dark:text-white">
                   <Mail className="w-6 h-6 text-indigo-500 shrink-0 group-hover:scale-110 transition-transform" />
                   <div>
                     <div className="font-bold text-sm">Send an Email</div>
                     <div className="text-xs text-slate-500 mt-0.5">Direct via Contact Page</div>
                   </div>
                 </NavLink>
               </div>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="border-l-4 border-emerald-500 bg-white dark:bg-slate-900 rounded-r-xl p-5 text-xs text-slate-500 dark:text-slate-400 shadow-sm border-y border-r border-slate-200 dark:border-slate-800">
          <strong>Note:</strong> Rs. 165/$ applies to all extra dollar services. Ads running through DCP uses a separate rate (Rs. 180–184/$). All service fees are non-refundable once the transfer is initiated. For custom budgets or bulk transfers, contact DCP directly.
        </div>

      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-down">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Complete your request</h2>
                <p className="text-xs text-slate-500 mt-1">Fill in your details — we'll reply within a few hours.</p>
              </div>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/50 mb-6">
                    <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Selected Package</div>
                    <div className="font-bold text-indigo-900 dark:text-indigo-300">{selectedPackage?.name}</div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-400 mt-1">{selectedPackage?.detail}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Full name *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Phone / WhatsApp *</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="98XXXXXXXX" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Business or personal name *</label>
                    <input required type="text" value={formData.business} onChange={e => setFormData({...formData, business: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Sharma Clothing Store" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Type</label>
                    <div className="relative">
                      <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as FormType})} className="w-full appearance-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 pr-10 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                        <option>Business</option>
                        <option>Personal</option>
                        <option>Freelancer</option>
                        <option>NGO / Organization</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Purpose / what you want to run ads for *</label>
                    <input required type="text" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Promote clothing shop on Facebook" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Estimated budget (NPR or $)</label>
                    <input type="text" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Rs. 10,000/month" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">How did you hear about us? *</label>
                    <div className="relative">
                      <select required value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full appearance-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 pr-10 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                        <option value="">— Select —</option>
                        <option>Facebook / Instagram</option>
                        <option>TikTok</option>
                        <option>Friend / Referral</option>
                        <option>Google Search</option>
                        <option>WhatsApp</option>
                        <option>Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Additional notes (optional)</label>
                    <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-y" placeholder="Any other details..." />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70">
                    {isSubmitting ? 'Sending Request...' : 'Send Request to DCP'} <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-3">
                    Your details will be sent via email. We'll contact you on WhatsApp or email to finalize.
                  </p>
                </form>
              ) : (
                <div className="py-12 px-6 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Request sent successfully!</h3>
                  <p className="text-sm text-slate-500 max-w-xs mb-8">
                    Thank you! DCP will contact you on WhatsApp or email within a few hours to confirm your package and payment details.
                  </p>
                  <button onClick={closeModal} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-3 px-8 rounded-xl shadow-md transition-all hover:scale-105">
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DollarServices;
