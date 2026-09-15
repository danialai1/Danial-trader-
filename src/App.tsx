import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Users, 
  Home,
  Globe, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Menu, 
  X, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  ArrowUpRight, 
  ShieldCheck,
  Eye,
  ZoomIn,
  ChevronDown,
  Building,
  Sparkles,
  Calculator,
  HelpCircle,
  Clock,
  Truck,
  FileText,
  Check,
  Plus,
  Minus,
  Sun,
  Moon,
  Camera,
  Lock,
  ShieldAlert,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { stats, biscuitsProducts, kiteProducts, leaders, testimonials } from './data';
import { Product, Leader, InquiryFormData, Testimonial } from './types';

// Unique, actionable benefits helper for Product detail highlights
const getProductHighlights = (product: any) => {
  const name = (product.name || "").toLowerCase();
  const cat = product.category;

  if (cat === 'biscuits') {
    if (name.includes('roll') || name.includes('crust')) {
      return [
        { title: "Crisp Wafer Shells", text: "Multi-layered baked golden wafer wraps for lightweight, micro-thin crunch.", badge: "Crispness" },
        { title: "Velvety Cream Core", text: "Generously packed with slow-cooked aromatic cocoa or fruit spread.", badge: "Flavor Sensation" },
        { title: "Moisture Barrier Shield", text: "Double-laminated flow-wrapped packets lock out air to preserve bakery freshness.", badge: "Pristine Pack" }
      ];
    }
    if (name.includes('digestive') || name.includes('wheatable')) {
      return [
        { title: "High-Density Fiber", text: "Baked with premium milled whole wheat bran to support digestion and prolonged satiety.", badge: "Digestive Care" },
        { title: "Sustained Carbohydrates", text: "Formulated for complex-carb slow energy release, ideal for breakfast pairings.", badge: "Sustained Energy" },
        { title: "Pure Stevia Sweetness", text: "Calorie-conscious diabetic-safe alternative sweetened with premium plant Stevia extracts.", badge: "Zero Sugar" }
      ];
    }
    if (name.includes('lotus') || name.includes('speculoos')) {
      return [
        { title: "Authentic Cinnamon Spiced", text: "Infused with genuine ground cinnamon, ginger, cardamom, and clove oils.", badge: "Traditional Spices" },
        { title: "Deep Caramelized Crunch", text: "Cooked with organic brown sugar syrup to create a gorgeous toffee-like bite.", badge: "Gourmet Texture" },
        { title: "Decadent Double Layer", text: "Sandwiched with rich, spreadable speculoos cookie-butter for extreme indulgence.", badge: "Cream Filling" }
      ];
    }
    if (name.includes('bakeri') || name.includes('nankhatai')) {
      return [
        { title: "Clarified Desi Ghee", text: "Kneaded with fine clarified butter ghee for that legendary crumbly melt-in-mouth finish.", badge: "Clarified Ghee" },
        { title: "Cardamom Fusion", text: "Aromatic whole green cardamom seeds offer sweet and herbal backnotes in every bite.", badge: "Spiced Heritage" },
        { title: "The Perfect Tea Dunker", text: "Optimized structural absorbency to perfectly hold tea (chai) during high-temperature dipping.", badge: "Chai Friendly" }
      ];
    }
    // General Biscuits
    return [
      { title: "Cream Butter Blend", text: "Crafted with sweet cream dairy butter for standard sensory indulgence.", badge: "Premium Dairy" },
      { title: "Melt-In-Your-Mouth Chips", text: "Densely loaded with premium roasted cocoa chunks or crunch almonds.", badge: "Rich Toppings" },
      { title: "Fully Automated Baking", text: "Baked on sterile European continuous lines certified under rigorous ISO and HACCP guidelines.", badge: "Safety Standard" }
    ];
  } else {
    // Kite Brand Products
    if (name.includes('match') || name.includes('safety')) {
      return [
        { title: "Pre-Carbonized Wood Splints", text: "Poplar wood splints fully carbonized to ensure no snapping during intense striking pressure.", badge: "Splint Safety" },
        { title: "Stable Potassium Chlorate Head", text: "Consistent ignition head paste fires instantly without sparkling or shedding hot soot.", badge: "Instant Light" },
        { title: "Dual Wax Paraffin Protection", text: "Splints are pre-dipped in high-melting paraffin wax to ensure instant strike-on-box in extreme humidity.", badge: "Damp-Proof" }
      ];
    }
    if (name.includes('detergent') || name.includes('glow')) {
      return [
        { title: "Oxygen Active Enzymes", text: "Deep-cleaning oxygen bubble formulation directly lifts stubborn lipid, tea, or grease stains.", badge: "Active Wash" },
        { title: "Optical Color Guard", text: "Preserves the brilliant whites and prevents fading of rich primary fabric colors.", badge: "Color Lock" },
        { title: "Phosphate-Free Chemistry", text: "Eco-friendly zeolite formulation completely free from phosphates to protect freshwater systems.", badge: "Safe Eco" }
      ];
    }
    // Soap bars / liquids
    return [
      { title: "Heavy Lipid Binder", text: "Formulated to emulsify extreme culinary grease, ghee, and burnt food residues instantly.", badge: "Deep Degreaser" },
      { title: "Citric Antibacterial Defense", text: "Enriched with real cold-pressed lemon peel extracts to safely eliminate microbes.", badge: "Hygiene Shield" },
      { title: "Skin-Saving Aloe Vera", text: "Includes natural humectant Aloe extracts to preserve hand hydration during regular scrubbing.", badge: "Hand Safe" }
    ];
  }
};

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState('home');
  const [currentTab, setCurrentTab] = useState<'home' | 'info' | 'images' | 'contact' | 'security'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Hero section slider states
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Product Filter and Selection states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [productCategoryTab, setProductCategoryTab] = useState<'all' | 'biscuits' | 'kite'>('all');

  // Contact form state
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: 'B2B',
    brandType: 'Both',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // B2B Modal quick toggle
  const [b2bModalOpen, setB2bModalOpen] = useState(false);

  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // B2B Volume Calculator States
  const [calculatorContainer, setCalculatorContainer] = useState<'20ft' | '40ft'>('20ft');
  const [calculatorProduct, setCalculatorProduct] = useState<'biscuits' | 'matches'>('biscuits');
  const [calculatorQuantity, setCalculatorQuantity] = useState<number>(1500); // default number of cartons

  // FAQ Accordion State
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Gallery and Security Page states
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'biscuits' | 'matches' | 'factory' | 'logistics'>('all');
  const [gallerySearch, setGallerySearch] = useState('');
  const [customTicketId, setCustomTicketId] = useState('');
  const [ticketSearchQuery, setTicketSearchQuery] = useState('');
  const [ticketStatus, setTicketStatus] = useState<{ id: string; status: string; percent: number; update: string; location: string } | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(prev => prev === index ? null : index);
  };

  const getCalculatorResults = () => {
    const isMatches = calculatorProduct === 'matches';
    const cartonWeightKg = isMatches ? 15 : 8;
    const cartonVolumeCbm = isMatches ? 0.05 : 0.035;

    const totalWeightKg = calculatorQuantity * cartonWeightKg;
    const totalVolumeCbm = calculatorQuantity * cartonVolumeCbm;
    const totalWeightTons = Number((totalWeightKg / 1000).toFixed(2));
    const totalCbm = Number(totalVolumeCbm.toFixed(1));

    const containerLimitCbm = calculatorContainer === '20ft' ? 33 : 67;
    const containerLimitWt = calculatorContainer === '20ft' ? 21.5 : 26.5;

    const volumePct = Math.min(100, Number(((totalVolumeCbm / containerLimitCbm) * 100).toFixed(0)));
    const weightPct = Math.min(100, Number(((totalWeightTons / containerLimitWt) * 100).toFixed(0)));

    // estimate production & loading time in weeks
    const productionWeeks = Math.max(1, Math.ceil(calculatorQuantity / (isMatches ? 1200 : 2500)));

    return {
      totalWeightTons,
      totalCbm,
      volumePct,
      weightPct,
      productionWeeks,
      exceedsCbm: totalVolumeCbm > containerLimitCbm,
      exceedsWt: totalWeightTons > containerLimitWt,
      containerLimitCbm,
      containerLimitWt
    };
  };

  const exportCalculatorAsPDF = () => {
    const results = getCalculatorResults();
    const productName = calculatorProduct === 'matches' ? 'Kite Brand Safety Matches (Mohsin Match Factory)' : 'Innovative Biscuits Premium Portfolio';
    const containerType = calculatorContainer === '20ft' ? '20ft General Purpose (GP) Dry Container' : '40ft High-Cube (HC) Dry Container';
    const refId = `DT-EST-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked! Please enable pop-ups to export the PDF order estimate.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>B2B Cargo Estimate - ${refId}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              color: #0f172a;
              background-color: #ffffff;
              padding: 40px;
              margin: 0;
            }
            .header-container {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid #f1f5f9;
              padding-bottom: 30px;
              margin-bottom: 30px;
            }
            .brand-section h1 {
              font-size: 24px;
              font-weight: 800;
              color: #0b0f19;
              margin: 0;
              letter-spacing: -0.025em;
              text-transform: uppercase;
            }
            .brand-section .subtitle {
              font-size: 11px;
              font-weight: 700;
              color: #d97706;
              margin-top: 4px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }
            .brand-section .address {
              font-size: 11px;
              color: #64748b;
              margin-top: 8px;
              line-height: 1.5;
            }
            .meta-section {
              text-align: right;
            }
            .meta-section h2 {
              font-size: 18px;
              font-weight: 800;
              color: #0f172a;
              margin: 0 0 8px 0;
            }
            .meta-item {
              font-size: 11px;
              color: #64748b;
              margin-top: 4px;
            }
            .meta-item strong {
              color: #0f172a;
            }
            .section-title {
              font-size: 13px;
              font-weight: 800;
              color: #0b0f19;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 8px;
              margin-top: 30px;
              margin-bottom: 15px;
            }
            .grid-details {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 25px;
            }
            .detail-card {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 16px;
            }
            .detail-card-title {
              font-size: 10px;
              font-weight: 700;
              color: #64748b;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 6px;
            }
            .detail-card-value {
              font-size: 14px;
              font-weight: 700;
              color: #0f172a;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            th {
              background-color: #0b0f19;
              color: #ffffff;
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              text-align: left;
              padding: 12px 16px;
            }
            td {
              border-bottom: 1px solid #e2e8f0;
              padding: 14px 16px;
              font-size: 12px;
              color: #334155;
            }
            td strong {
              color: #0f172a;
            }
            .alert-box {
              background-color: #fffbeb;
              border: 1px solid #fef3c7;
              border-left: 4px solid #d97706;
              border-radius: 8px;
              padding: 14px 18px;
              font-size: 11px;
              color: #78350f;
              line-height: 1.6;
              margin-bottom: 30px;
            }
            .footer-notes {
              margin-top: 40px;
              border-top: 1px solid #e2e8f0;
              padding-top: 20px;
              font-size: 10px;
              color: #94a3b8;
              line-height: 1.6;
            }
            .actions-bar {
              margin-top: 30px;
              text-align: center;
              background-color: #f8fafc;
              padding: 15px;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
            }
            .btn-print {
              background-color: #0b0f19;
              color: #ffffff;
              border: none;
              padding: 10px 24px;
              font-size: 11px;
              font-weight: 700;
              border-radius: 8px;
              cursor: pointer;
              transition: background-color 0.2s;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .btn-print:hover {
              background-color: #1e293b;
            }
            @media print {
              .actions-bar {
                display: none;
              }
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="header-container">
            <div class="brand-section">
              <h1>Danial Trader</h1>
              <div class="subtitle">Authorized Trade Distributor</div>
              <div class="address">
                90-B, Industrial Estate, Jamrud Road, Hayatabad, Peshawar, Pakistan<br>
                Kite Brand Matches & Innovative Biscuits Group Exports
              </div>
            </div>
            <div class="meta-section">
              <h2>Cargo Plan Estimate</h2>
              <div class="meta-item">Ref ID: <strong>${refId}</strong></div>
              <div class="meta-item">Date Issued: <strong>${dateStr}</strong></div>
              <div class="meta-item">FMCG Origin: <strong>Pakistan</strong></div>
            </div>
          </div>

          <div class="section-title">Estimation Parameters</div>
          <div class="grid-details">
            <div class="detail-card">
              <div class="detail-card-title">Consignment Product</div>
              <div class="detail-card-value">${productName}</div>
            </div>
            <div class="detail-card">
              <div class="detail-card-title">Ocean Shipping Container</div>
              <div class="detail-card-value">${containerType}</div>
            </div>
          </div>

          <div class="section-title">Volumetric Loading Summary</div>
          <table>
            <thead>
              <tr>
                <th style="width: 50%;">Metric Parameter</th>
                <th style="width: 25%; text-align: right;">Calculated Yield</th>
                <th style="width: 25%; text-align: right;">Container Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Requested Consignment Quantity</strong></td>
                <td style="text-align: right; font-weight: 700;">${calculatorQuantity.toLocaleString()} Cartons</td>
                <td style="text-align: right; color: #64748b;">N/A</td>
              </tr>
              <tr>
                <td><strong>Gross Consignment Weight</strong></td>
                <td style="text-align: right; font-weight: 700; ${results.exceedsWt ? 'color: #ef4444;' : ''}">${results.totalWeightTons} Metric Tons</td>
                <td style="text-align: right; color: #64748b;">${results.containerLimitWt} Tons (Max)</td>
              </tr>
              <tr>
                <td><strong>Consignment Cubic Space (Volume)</strong></td>
                <td style="text-align: right; font-weight: 700; ${results.exceedsCbm ? 'color: #ef4444;' : ''}">${results.totalCbm} CBM</td>
                <td style="text-align: right; color: #64748b;">${results.containerLimitCbm} CBM (Max)</td>
              </tr>
              <tr>
                <td><strong>Volumetric Container Space Utilization</strong></td>
                <td style="text-align: right; font-weight: 700; ${results.exceedsCbm ? 'color: #ef4444;' : ''}">${results.volumePct}% Fill Ratio</td>
                <td style="text-align: right; color: #64748b;">100% Volume</td>
              </tr>
              <tr>
                <td><strong>Container Weight Utilization Ratio</strong></td>
                <td style="text-align: right; font-weight: 700; ${results.exceedsWt ? 'color: #ef4444;' : ''}">${results.weightPct}% Weight Ratio</td>
                <td style="text-align: right; color: #64748b;">100% Weight</td>
              </tr>
              <tr>
                <td><strong>Estimated Factory Production Time</strong></td>
                <td style="text-align: right; font-weight: 700;">~ ${results.productionWeeks} ${results.productionWeeks === 1 ? 'Week' : 'Weeks'}</td>
                <td style="text-align: right; color: #64748b;">Standard Lead-Time</td>
              </tr>
            </tbody>
          </table>

          <div class="alert-box">
            <strong>Logistics Assessment:</strong><br>
            ${results.exceedsCbm || results.exceedsWt 
              ? `Your specified carton quantity exceeds the safe volumetric limit (${results.containerLimitCbm} CBM) or standard gross legal weight limit (${results.containerLimitWt} Tons) of a standard ${calculatorContainer} container. Please lower your carton count or contact Danial Ahmad directly to split your shipment into multiple dry containers.` 
              : `Your requested cargo of ${calculatorQuantity} cartons is safely within all official international guidelines. This consignment utilizes approximately ${results.volumePct}% of the standard dry container volume. Safe for prompt sea voyage consolidation.`
            }
          </div>

          <div class="footer-notes">
            <strong>Legal Disclaimers:</strong><br>
            1. This document is a preliminary engineering estimate generated automatically by the Danial Trader B2B Volumetric Analyzer.<br>
            2. Volumetric calculations are strictly structured according to standard EN-1783 safety match box patterns and standard biscuit master carton dimensions.<br>
            3. Final commercial proforma contracts (FOB Karachi or CIF Destination Seaport) are subject to sea freight ocean line rates, localized dry-port customs regulations, and final physical weighing during container loading.<br>
            For official stamping and direct commercial proforma, please email <strong>danialtrdr@gmail.com</strong> or WhatsApp <strong>+92-333-8931786</strong>.
          </div>

          <div class="actions-bar">
            <button class="btn-print" onclick="window.print()">Save as PDF / Print Document</button>
          </div>

          <script>
            // Auto trigger print when fully loaded
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Gemini AI Trade Assistant states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [chatLog, setChatLog] = useState<{role: 'user' | 'assistant', text: string}[]>([
    {
      role: 'assistant',
      text: "Asalam-o-Alaikum! I am the Gemini-powered AI Sales Agent for Danial Trader. Ask me anything about our premium Innovative Biscuits selection, Kite Brand safety matches, global logistics, or how to contact our founder Danial Ahmad!"
    }
  ]);

  const askGemini = async (customPrompt?: string) => {
    const promptToSend = customPrompt || aiPrompt;
    if (!promptToSend.trim()) return;

    setAiLoading(true);
    setAiPrompt('');
    
    const newUserMessage = { role: 'user' as const, text: promptToSend };
    setChatLog(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          prompt: promptToSend,
          history: chatLog
        })
      });

      const data = await response.json();
      if (data.error) {
        setChatLog(prev => [...prev, { 
          role: 'assistant', 
          text: `⚠️ AI Agent offline: ${data.error}` 
        }]);
      } else if (data.text) {
        setChatLog(prev => [...prev, { role: 'assistant', text: data.text }]);
      }
    } catch (err) {
      console.error("AI Assistant Error:", err);
      setChatLog(prev => [...prev, { 
        role: 'assistant', 
        text: "⚠️ Unable to reach the AI Sales Server. Please verify that your backend server is fully compiled." 
      }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Auto-rotate hero slider
  const startSlider = () => {
    stopSlider();
    sliderInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5500); // 5.5 seconds rotation
  };

  const stopSlider = () => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  };

  useEffect(() => {
    startSlider();
    return () => stopSlider();
  }, []);

  // Auto scroll to latest message in Gemini Chat Support
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog, aiLoading]);

  // Track scroll position for header blur & active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active link detection
      const sections = ['home', 'biscuits', 'kite', 'danial-trader-portal', 'b2b-shipping-calculator', 'faq-section', 'testimonials', 'leadership', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form Submission Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const generatedId = `DT-${Math.floor(1000 + Math.random() * 9000)}`;
    setCustomTicketId(generatedId);

    // Simulate submission
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      inquiryType: 'B2B',
      brandType: 'Both',
      message: ''
    });
    setFormSubmitted(false);
  };

  const openB2bInquiry = (brand: 'Both' | 'Biscuits' | 'Kite') => {
    setFormData(prev => ({
      ...prev,
      inquiryType: 'B2B',
      brandType: brand
    }));
    setB2bModalOpen(true);
  };

  const heroSlides = [
    {
      id: 0,
      image: 'https://images.unsplash.com/photo-1558961309-dbdf000302c6?auto=format&fit=crop&w=1920&q=80',
      brand: 'Innovative Biscuits',
      headline: 'Taste, Quality & Baking Innovation',
      subHeadline: "Pakistan's premium biscuit manufacturer. Explore our world-class wafers, luxury chocolate rolls, and fiber-rich digestives.",
      ctaScroll: '#biscuits',
      ctaScrollLabel: 'Explore Products',
      ctaLink: 'https://innovativebiscuits.com',
      ctaLinkLabel: 'Visit Website'
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80',
      brand: 'Kite Brand',
      headline: "Pakistan's Leading Match & FMCG Exporter",
      subHeadline: 'Over 50 years of matchless quality. Supplying premium damp-proof safety matches and detergent powder to over 40 countries.',
      ctaScroll: '#kite',
      ctaScrollLabel: 'Discover Products',
      ctaLink: 'https://kitepk.com',
      ctaLinkLabel: 'Visit Website'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80',
      brand: 'Danial Trader',
      headline: 'Authorized Wholesale & Export Agency',
      subHeadline: 'Officially represented by Danial Ahmad. Direct factory supplies, complete customs clearing, and robust container logistics.',
      ctaScroll: '#danial-trader-portal',
      ctaScrollLabel: 'Open Trade Portal',
      ctaLink: 'https://wa.me/923338931786',
      ctaLinkLabel: 'WhatsApp Bulk Deal'
    }
  ];

  const handleNextSlide = () => {
    stopSlider();
    setCurrentSlide((prev) => (prev + 1) % 3);
    startSlider();
  };

  const handlePrevSlide = () => {
    stopSlider();
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
    startSlider();
  };

  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (currentTab !== 'home') {
      setCurrentTab('home');
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 180);
    setMobileMenuOpen(false);
  };

  const getSectionLabel = (section: string) => {
    switch (section) {
      case 'home': return 'Overview';
      case 'biscuits': return 'Innovative Biscuits';
      case 'kite': return 'Kite Brand Matches';
      case 'danial-trader-portal': return 'B2B Trade Portal';
      case 'b2b-shipping-calculator': return 'Wholesale Freight Calculator';
      case 'faq-section': return 'FAQ & Support';
      case 'testimonials': return 'Trade Endorsements';
      case 'leadership': return 'Group Leadership';
      case 'contact': return 'Inquiry & Contact';
      default: return 'Overview';
    }
  };

  // Icon mapper for Stats
  const renderStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-amber-500" />;
      case 'Users': return <Users className="w-6 h-6 text-amber-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-amber-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-500" />;
      default: return <Award className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className={`relative min-h-screen bg-[#080B11] text-slate-100 selection:bg-amber-500/30 selection:text-white font-sans antialiased transition-colors duration-300 ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      
      {/* Premium Top Bar */}
      <div className="bg-[#05070C] text-slate-300 py-2.5 px-4 text-[11px] sm:text-xs font-semibold border-b border-slate-900 tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[9px] uppercase font-black px-2 py-0.5 rounded-sm tracking-widest shadow-sm shadow-amber-500/10">
              Authorized Trade Partner
            </span>
            <span className="text-slate-400">Danial Trader — Verified B2B & Global Export Agent for Innovative Biscuits & Kite Brand</span>
          </div>
          <div className="flex items-center gap-5 text-slate-400">
            <a href="mailto:danialtrdr@gmail.com" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-bold">
              <Mail className="w-3.5 h-3.5 text-amber-500" /> danialtrdr@gmail.com
            </a>
            <a href="https://wa.me/923338931786" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold">
              <Phone className="w-3.5 h-3.5 text-emerald-500" /> +92-333-8931786 (WhatsApp Enabled)
            </a>
          </div>
        </div>
      </div>

      {/* STICKY GLASS NAVIGATION */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#080B11]/90 backdrop-blur-md shadow-2xl border-b border-slate-900/80 py-3' 
            : 'bg-[#080B11]/50 py-4 border-b border-slate-900/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Custom Unified Brand Emblem Logo */}
            <div className="flex items-center select-none">
              <a href="#home" onClick={(e) => scrollToSection('home', e)} className="flex items-center gap-3">
                
                {/* SVG Monogram Emblem */}
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/10 flex items-center justify-center">
                  <div className="w-full h-full bg-[#080B11] rounded-[10px] flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-6 h-6 text-amber-400 fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 30 C20 15, 80 15, 80 30 C80 65, 50 85, 50 85 C50 85, 20 65, 20 30 Z" className="text-amber-500/80" strokeWidth="4" />
                      <path d="M40 38 L60 38 M50 28 L50 62 M35 55 C35 65, 65 65, 65 55" className="text-amber-400" strokeWidth="5" />
                    </svg>
                  </div>
                </div>

                {/* Company Typography */}
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-white tracking-widest leading-none font-sans">DANIAL TRADER</span>
                  <span className="text-[9px] text-amber-400 font-black tracking-widest uppercase mt-1 leading-none">GLOBAL FMCG EXPORTS</span>
                </div>

              </a>
            </div>

            {/* Desktop Nav Links (Sleek Dark Luxe styling) */}
            <nav className="hidden lg:flex items-center gap-8 font-bold text-xs tracking-widest uppercase text-slate-400">
              <button 
                onClick={() => setCurrentTab('home')}
                className={`transition-colors cursor-pointer hover:text-amber-400 ${currentTab === 'home' ? 'text-amber-400 font-extrabold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentTab('info')}
                className={`transition-colors cursor-pointer hover:text-amber-400 ${currentTab === 'info' ? 'text-amber-400 font-extrabold' : ''}`}
              >
                Information
              </button>
              <button 
                onClick={() => setCurrentTab('images')}
                className={`transition-colors cursor-pointer hover:text-amber-400 ${currentTab === 'images' ? 'text-amber-400 font-extrabold' : ''}`}
              >
                Gallery
              </button>
              <button 
                onClick={() => setCurrentTab('security')}
                className={`transition-colors cursor-pointer hover:text-amber-400 ${currentTab === 'security' ? 'text-amber-400 font-extrabold' : ''}`}
              >
                Security
              </button>
              <button 
                onClick={() => setCurrentTab('contact')}
                className={`transition-colors cursor-pointer hover:text-amber-400 ${currentTab === 'contact' ? 'text-amber-400 font-extrabold' : ''}`}
              >
                Contact
              </button>
            </nav>

            {/* Right side Action Buttons (Refined Golden Accents) */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-3 text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all rounded-xl cursor-pointer flex items-center justify-center"
                title="Toggle visual theme"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-400" />
                )}
              </button>
              <button 
                onClick={() => openB2bInquiry('Both')}
                className="text-xs font-bold tracking-widest uppercase text-slate-300 bg-slate-900 hover:bg-slate-800 transition-all rounded-xl px-4 py-3 flex items-center gap-2 border border-slate-800 cursor-pointer"
              >
                <Building className="w-3.5 h-3.5 text-amber-500" /> B2B Portal
              </button>
              <button 
                onClick={() => setCurrentTab('contact')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs tracking-widest uppercase transition-all rounded-xl px-5 py-3.5 shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 text-slate-400 hover:bg-slate-900 rounded-xl transition-colors border border-slate-800/60 flex items-center justify-center"
                title="Toggle visual theme"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-400" />
                )}
              </button>
              <button 
                onClick={() => openB2bInquiry('Both')}
                className="sm:hidden p-2.5 text-slate-400 bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-800"
                title="B2B Inquiry"
              >
                <Building className="w-4 h-4 text-amber-500" />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-slate-400 hover:bg-slate-900 rounded-xl transition-colors border border-slate-800/60"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Nav Dropdown (Redesigned for Premium Dark) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0A0E17] border-t border-slate-900 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3 flex flex-col font-bold text-slate-300 text-xs tracking-widest uppercase">
                <button 
                  onClick={() => {
                    setCurrentTab('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 hover:text-amber-400 border-b border-slate-900/60 ${currentTab === 'home' ? 'text-amber-400' : ''}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    setCurrentTab('info');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 hover:text-amber-400 border-b border-slate-900/60 ${currentTab === 'info' ? 'text-amber-400' : ''}`}
                >
                  Information
                </button>
                <button 
                  onClick={() => {
                    setCurrentTab('images');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 hover:text-amber-400 border-b border-slate-900/60 ${currentTab === 'images' ? 'text-amber-400' : ''}`}
                >
                  Gallery
                </button>
                <button 
                  onClick={() => {
                    setCurrentTab('security');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 hover:text-amber-400 border-b border-slate-900/60 ${currentTab === 'security' ? 'text-amber-400' : ''}`}
                >
                  Security
                </button>
                <button 
                  onClick={() => {
                    setCurrentTab('contact');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 hover:text-amber-400 ${currentTab === 'contact' ? 'text-amber-400' : ''}`}
                >
                  Contact Us
                </button>

                <div className="pt-3.5 border-t border-slate-900 flex flex-col gap-2.5">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openB2bInquiry('Both');
                    }}
                    className="w-full text-center py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border border-slate-800"
                  >
                    <Building className="w-4 h-4 text-amber-500" /> B2B Portal Inquiry
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentTab('contact');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-3.5 bg-amber-500 hover:bg-amber-650 text-slate-950 font-black text-xs rounded-xl shadow-lg"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Dynamic Breadcrumb Navigation Trail */}
      <div className="bg-[#05070C]/80 backdrop-blur-md border-b border-slate-900/60 py-3 px-4 sticky top-[73px] z-30 transition-all duration-300 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:items-center justify-between text-xs font-bold uppercase tracking-wider">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-slate-400">
            <button 
              onClick={() => setCurrentTab('home')}
              className="hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-amber-500" />
              <span className="whitespace-nowrap">Danial Trader</span>
            </button>
            
            <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
            
            {currentTab === 'home' ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-amber-500 font-extrabold hover:underline cursor-pointer"
                >
                  Home
                </button>
                {activeSection !== 'home' && (
                  <>
                    <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
                    <span className="text-slate-200 font-extrabold lowercase first-letter:uppercase">
                      {getSectionLabel(activeSection)}
                    </span>
                  </>
                )}
                
                {/* Horizontal Quick Navigator */}
                <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-800">
                  <span className="text-[10px] text-slate-500 tracking-wider">Jump to:</span>
                  {['biscuits', 'kite', 'danial-trader-portal', 'b2b-shipping-calculator', 'leadership', 'contact'].map((sect) => (
                    <button
                      key={sect}
                      onClick={() => scrollToSection(sect)}
                      className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border transition-all cursor-pointer ${
                        activeSection === sect 
                          ? 'bg-amber-400/15 text-amber-400 border-amber-500/30' 
                          : 'bg-slate-900/50 text-slate-400 border-slate-800/80 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      {sect === 'danial-trader-portal' ? 'B2B Portal' : sect === 'b2b-shipping-calculator' ? 'Freight' : getSectionLabel(sect).replace('Innovative ', '').replace('Kite Brand ', '').replace(' Matches', '').replace(' Matches', '')}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                <button 
                  onClick={() => setCurrentTab('home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
                <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
                {currentTab === 'info' && (
                  <span className="text-amber-500 font-extrabold">Information & Timeline</span>
                )}
                {currentTab === 'images' && (
                  <span className="text-amber-500 font-extrabold">Media Showcase</span>
                )}
                {currentTab === 'security' && (
                  <span className="text-amber-500 font-extrabold">Security Standards</span>
                )}
                {currentTab === 'contact' && (
                  <span className="text-amber-500 font-extrabold">Support Desk</span>
                )}
              </div>
            )}
          </nav>

          {/* Quick Active section scroll status guide */}
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold tracking-widest uppercase select-none self-end md:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="hidden sm:inline">Active Area:</span>
            <span className="text-slate-300 font-black">
              {currentTab === 'home' ? getSectionLabel(activeSection) : currentTab.toUpperCase() + ' TAB'}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT DISPLAY WITH CONDITIONAL ROUTING */}
      {currentTab === 'home' && (
        <>
          {/* HERO SECTION (SLIDING BANNER) */}
          <section id="home" className="relative h-[560px] sm:h-[650px] lg:h-[700px] w-full overflow-hidden bg-[#05070C]">
        
        {/* Animated Banner Slides */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${heroSlides[currentSlide].image}')` }}
              />
              
              {/* Dark Overlay (approx 55% opacity) */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

              {/* Slide Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl text-left">
                    
                    {/* Brand tag */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-1.5 bg-amber-500/95 text-slate-950 text-xs uppercase tracking-widest font-black px-3.5 py-1.5 rounded-md mb-4 shadow-lg shadow-amber-500/10"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                      {heroSlides[currentSlide].brand}
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-sans tracking-wide"
                    >
                      {heroSlides[currentSlide].headline}
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 text-base sm:text-lg lg:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl"
                    >
                      {heroSlides[currentSlide].subHeadline}
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 flex flex-col sm:flex-row gap-4"
                    >
                      <button 
                        onClick={() => scrollToSection(heroSlides[currentSlide].ctaScroll.replace('#', ''))}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-7 py-4 rounded-xl text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {heroSlides[currentSlide].ctaScrollLabel}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <a 
                        href={heroSlides[currentSlide].ctaLink}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 text-slate-200 hover:text-amber-400 font-bold px-7 py-4 rounded-xl text-sm tracking-wide transition-all backdrop-blur-sm flex items-center justify-center gap-1.5"
                      >
                        {heroSlides[currentSlide].ctaLinkLabel}
                        <ArrowUpRight className="w-4 h-4 text-amber-500" />
                      </a>
                    </motion.div>

                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicators (Dots) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                stopSlider();
                setCurrentSlide(index);
                startSlider();
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-8 bg-amber-500' : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slider Navigation Arrows */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm border border-white/10 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm border border-white/10 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Elegant downward scroll suggestion */}
        <div className="absolute bottom-6 right-8 hidden lg:flex flex-col items-center gap-1.5 text-white/40 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>

      </section>

      {/* KEY STATS BANNER */}
      <section className="relative z-10 -mt-10 max-w-6xl mx-auto px-4">
        <div className="bg-[#121826] text-white rounded-3xl shadow-2xl shadow-black/60 p-6 sm:p-8 lg:p-10 border border-slate-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center lg:items-start text-center lg:text-left bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 transition-all hover:bg-amber-500/[0.04] hover:border-amber-500/20 group"
              >
                <div className="mb-3.5 flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 shadow-inner group-hover:border-amber-500/30 transition-all">
                  {renderStatIcon(stat.iconName)}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400 font-bold tracking-wide leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIAL & LOGISTICAL INFRASTRUCTURE SHOWCASE */}
      <section className="py-24 bg-[#080B11] border-b border-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
              Oven-to-Ocean Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
              Factory & Logistics Visual Showcase
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold">
              Explore the advanced production plants, secure packing lines, and global cargo logistics routes backing our trade commitments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Automated Baking Plant",
                subtitle: "Innovative Biscuits Oven Lines",
                desc: "Equipped with state-of-the-art continuous multi-tier ovens, guaranteeing precise temperatures and consistent texture for every single cookie and wafer.",
                image: "https://images.unsplash.com/photo-1558961309-dbdf717a13d8?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Damp-Proof Splints Prep",
                subtitle: "Mohsin Match Quality Control",
                desc: "Poplar wood logs carbonized and treated with specialized humidity-repelling agents to ensure clean ignition spark performance globally.",
                image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Peshawar Container Loading",
                subtitle: "Dry Port Sealing Bay",
                desc: "Loading B2B consignments under dual-party supervision, applying official FBR security seals for seamless customs declarations clearance.",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Global Ocean Voyages",
                subtitle: "Karachi Port Marine Departure",
                desc: "Consolidated freight containers loaded onto reliable ocean liners, shipping wholesale supplies to Riyadh, São Paulo, Mombasa, and beyond.",
                image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Formulation Lab & QC Testing",
                subtitle: "Innovative Biscuits Lab Desk",
                desc: "Equipped with active moisture analyzers and texture stress-testers, guaranteeing perfect crispness levels and long-life shelf-stability.",
                image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "High-Speed Flow-Wrap Packaging",
                subtitle: "Clean-Room Biscuit Enveloping",
                desc: "Fully automated primary packaging lines enveloping biscuits and wafers in premium moisture-barrier BOPP film under sterile atmospheric seals.",
                image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Wholesale Supply Depot",
                subtitle: "Heavy-Duty Multi-Tier Storage",
                desc: "Spacious dry-storage warehousing utilizing vertical racks and electric forklift fleet, managing high-throughput dispatch ready for maritime freight.",
                image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Overland Transit Routes",
                subtitle: "Seaport Container Dispatch",
                desc: "Secure container-trailer fleet shipping large-scale wholesale consignments from the Peshawar Industrial Estate directly to Karachi Ports.",
                image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Innovative Biscuits Production Line",
                subtitle: "State-of-the-Art Rotary Moulding",
                desc: "High-speed rotary moulders and custom product design plates creating perfectly shaped chocolate chip cookies and butter wafers consistently.",
                image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Kite Match Machine Automation",
                subtitle: "Automated Splint Injection & Friction Coaters",
                desc: "Sophisticated matchbox manufacturing systems running continuous splint-feeding and chemical head dipping under automated digital temperature limits.",
                image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              }
            ].map((infra, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[#121826]/75 border border-slate-800/80 rounded-2xl overflow-hidden group shadow-xl flex flex-col h-full hover:border-amber-400/60 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden bg-slate-950 relative">
                  <img 
                    src={infra.image} 
                    alt={infra.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121826] to-transparent opacity-60" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block">{infra.subtitle}</span>
                    <h3 className="text-white font-black text-sm tracking-wide mt-1 group-hover:text-amber-300 transition-colors">{infra.title}</h3>
                    <p className="text-slate-400 text-xs mt-2.5 font-semibold leading-relaxed">{infra.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SPECIAL SPOTLIGHT: BRAND PROFILES & AUTOMATION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 pt-16 border-t border-slate-900/60">
            {/* Innovative Biscuits Banner */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#121826]/80 p-8 md:p-10 group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl group-hover:bg-amber-400/10 transition-colors duration-500" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-3 py-1 rounded-full border border-amber-500/10">
                    Innovative Biscuits
                  </span>
                  <h3 className="text-2xl font-black text-white mt-4 tracking-wide font-sans leading-tight">
                    Biscuit Baking Excellence
                  </h3>
                  <p className="text-slate-400 mt-3 text-xs sm:text-sm font-semibold leading-relaxed">
                    Operated by a highly advanced FMCG division using automated baking tunnels, wrapping, and clean-room environments to deliver Pakistan's favorite cookie lines.
                  </p>
                </div>
                <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-2xl relative flex-shrink-0 group-hover:scale-[1.02] transition-all duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80"
                    alt="Innovative Biscuits Baking"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/80 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Kite Matches Automation Banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#121826]/80 p-8 md:p-10 group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-3 py-1 rounded-full border border-amber-500/10">
                    Kite Matches Machine
                  </span>
                  <h3 className="text-2xl font-black text-white mt-4 tracking-wide font-sans leading-tight">
                    Matchbox Machine Automation
                  </h3>
                  <p className="text-slate-400 mt-3 text-xs sm:text-sm font-semibold leading-relaxed">
                    Watch our state-of-the-art box filling, high-precision splint carbonization, and automated friction coating machines processing millions of sticks daily.
                  </p>
                </div>
                <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-2xl relative flex-shrink-0 group-hover:scale-[1.02] transition-all duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                    alt="Kite Safety Match Machines"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/80 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* AUTHORIZED TRADER & LOGISTICS DESK - DANIAL TRADER */}
      <section id="danial-trader-portal" className="py-24 bg-[#0B0F19] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
              OFFICIAL DISTRIBUTION CHANNEL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
              Danial Trader Portal
            </h2>
            <p className="text-slate-400 mt-3 text-base sm:text-lg font-semibold">
              Operated by <strong className="text-white font-bold">Danial Ahmad</strong>, managing premium trade, customized exporting, bulk orders, and domestic distribution for Innovative Biscuits and Kite safety matches.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Interactive Gemini AI Consultant */}
            <div className="lg:col-span-6 bg-[#121826]/95 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col h-[580px]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg animate-pulse">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-extrabold flex items-center gap-1.5">
                      Gemini Trade AI <span className="bg-red-500/15 text-red-400 text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded">Active</span>
                    </h3>
                    <p className="text-slate-400 text-xs">Automated Danial Trader Support Desk</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-semibold">Gemini 3.8 Flash</span>
              </div>

              {/* Chat Log Window */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
                {chatLog.map((chat, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${chat.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm font-semibold leading-relaxed shadow-md ${
                        chat.role === 'user' 
                          ? 'bg-red-600 text-white rounded-tr-none' 
                          : 'bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800/80'
                      }`}
                    >
                      {chat.text}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold pl-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span>Gemini is analyzing catalog...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Area */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                {/* Suggestions pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <button 
                    onClick={() => askGemini("What is the export volume for safety matches?")}
                    className="text-[10px] font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white px-2.5 py-1 rounded-full transition-all cursor-pointer border border-slate-800"
                  >
                    Match Exports
                  </button>
                  <button 
                    onClick={() => askGemini("Show me the Innovative Biscuits list.")}
                    className="text-[10px] font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white px-2.5 py-1 rounded-full transition-all cursor-pointer border border-slate-800"
                  >
                    Biscuit Catalog
                  </button>
                  <button 
                    onClick={() => askGemini("How to contact Danial Ahmad directly?")}
                    className="text-[10px] font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white px-2.5 py-1 rounded-full transition-all cursor-pointer border border-slate-800"
                  >
                    Contact Owner
                  </button>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    askGemini();
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="text" 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ask Gemini about bulk order, logistics, prices..."
                    className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 font-semibold"
                  />
                  <button 
                    type="submit"
                    disabled={aiLoading}
                    className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase px-5 py-3 rounded-xl tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Ask
                  </button>
                </form>
              </div>
            </div>

            {/* Warehouse Logistics Map & Contact details */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Authorized Partner Bio Card */}
              <div className="bg-[#121826]/90 p-6 rounded-3xl border border-slate-800/80 shadow-2xl flex flex-col md:flex-row gap-5 items-center">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" 
                  alt="Danial Ahmad" 
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border-2 border-emerald-500/20 shadow-inner"
                />
                <div className="text-center md:text-left">
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/15">
                    Managing Partner
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-1">Danial Ahmad</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-0.5">Founder, Danial Trader</p>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed font-semibold">
                    Facilitating localized distribution networks across Khyber Pakhtunkhwa, Punjab, and standard shipping lanes to the Middle East, Central Asia, and Africa.
                  </p>
                </div>
              </div>

              {/* Verified Headquarters Map Link */}
              <div className="bg-[#121826]/90 rounded-3xl border border-slate-800/80 shadow-2xl p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Peshawar Corporate Head Office</h4>
                      <p className="text-[11px] text-slate-400 font-bold">90-B, Industrial Estate, Jamrud Road, Hayatabad, Peshawar</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/sVebUoAKkQthaEndA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-extrabold text-amber-400 hover:text-white flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/20 transition-all"
                  >
                    View Link <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Google Map Embed Iframe */}
                <div className="w-full h-[220px] rounded-2xl overflow-hidden border border-slate-800 shadow-inner relative bg-slate-900">
                  <iframe 
                    title="Danial Trader / Mohsin Match Factory Map"
                    src="https://maps.google.com/maps?q=Mohsin%20Match%20Factory,%2090-B,%20Industrial%20Estate,%20Jamrud%20Road,%20Hayatabad,%20Peshawar,%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0"
                  />
                </div>
              </div>

              {/* Direct Instant Action B2B buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="https://wa.me/923338931786?text=Hi%20Danial%20Ahmad,%20I%20am%20interested%20in%20placing%20a%20B2B%20bulk%20order%20for%20Innovative%20Biscuits%20and%20Kite%20Matches%20through%20Danial%20Trader."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#10b981] hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#10b981]/20"
                >
                  <Phone className="w-4 h-4 fill-white text-emerald-600" />
                  WhatsApp Direct Deal
                </a>
                <button 
                  onClick={() => openB2bInquiry('Both')}
                  className="bg-slate-900 hover:bg-slate-850 text-white font-extrabold text-xs uppercase tracking-wider py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-800"
                >
                  <Building className="w-4 h-4 text-amber-500" />
                  Register Dealership
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* B2B BULK CONTAINER CALCULATOR & SHIPPING ESTIMATOR */}
      <section id="b2b-shipping-calculator" className="py-24 bg-[#080B11] border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
              INTERACTIVE PLANNING TOOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
              Bulk Volume & Container Planner
            </h2>
            <p className="text-slate-400 mt-3 text-base sm:text-lg font-semibold">
              Estimate your container capacity, total payload weight, and production lead times in real-time. Use these figures to instantly draft a B2B quote request.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Calculation Configurator */}
            <div className="lg:col-span-5 bg-[#121826]/90 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  Estimate Order Parameters
                </h3>
                
                {/* Product Selection */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2.5">
                    1. Select Cargo Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCalculatorProduct('biscuits');
                        if (calculatorQuantity > 3000) setCalculatorQuantity(2000);
                      }}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-black tracking-wide transition-all text-center cursor-pointer ${
                        calculatorProduct === 'biscuits'
                          ? 'bg-red-500/10 border-red-500 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      🍪 Innovative Biscuits
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCalculatorProduct('matches');
                        if (calculatorQuantity > 2500) setCalculatorQuantity(1500);
                      }}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-black tracking-wide transition-all text-center cursor-pointer ${
                        calculatorProduct === 'matches'
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      🔥 Kite Safety Matches
                    </button>
                  </div>
                </div>

                {/* Container Size Selection */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2.5">
                    2. Choose Container Size
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCalculatorContainer('20ft')}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-black tracking-wide transition-all text-center cursor-pointer ${
                        calculatorContainer === '20ft'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      🚢 20ft Standard GP
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalculatorContainer('40ft')}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-black tracking-wide transition-all text-center cursor-pointer ${
                        calculatorContainer === '40ft'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      🚢 40ft High-Cube
                    </button>
                  </div>
                </div>

                {/* Number of Cartons Slider / Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-extrabold uppercase tracking-widest text-slate-400">
                      3. Quantity of Cartons
                    </label>
                    <span className="text-sm font-extrabold text-amber-400 bg-amber-500/15 border border-amber-550/20 px-2.5 py-1 rounded-md">
                      {calculatorQuantity.toLocaleString()} Cartons
                    </span>
                  </div>
                  
                  {/* Custom Number Input and Slider Sync */}
                  <div className="flex gap-3 items-center mb-2">
                    <button
                      type="button"
                      onClick={() => setCalculatorQuantity(prev => Math.max(100, prev - 100))}
                      className="p-2 border border-slate-800 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input 
                      type="range"
                      min={100}
                      max={calculatorContainer === '20ft' ? 3000 : 6000}
                      step={50}
                      value={calculatorQuantity}
                      onChange={(e) => setCalculatorQuantity(Number(e.target.value))}
                      className="flex-grow accent-amber-500 h-1.5 bg-slate-900 rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => setCalculatorQuantity(prev => Math.min(6000, prev + 100))}
                      className="p-2 border border-slate-800 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-extrabold px-1 tracking-wider uppercase">
                    <span>Min: 100</span>
                    <span>Max: {calculatorContainer === '20ft' ? '3,000' : '6,000'}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 border-t border-slate-800 mt-6 space-y-3">
                <a 
                  href={`https://wa.me/923338931786?text=Hi%20Danial%20Ahmad,%20I%20have%20calculated%20a%20B2B%20cargo%20plan%20on%20your%20Trade%20Desk%20for%20${calculatorQuantity}%20cartons%20of%20${calculatorProduct === 'matches' ? 'Kite%20Matches' : 'Innovative%20Biscuits'}%20loaded%20in%20a%20${calculatorContainer}%20container.%20Please%20provide%20a%20wholesale%20CIF/FOB%20commercial%20quote.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-widest py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-500/20"
                >
                  <Phone className="w-4 h-4 fill-white text-emerald-600" />
                  Pre-fill WhatsApp Quote
                </a>
                
                <button 
                  onClick={exportCalculatorAsPDF}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-amber-400 hover:text-amber-300 border border-slate-800 hover:border-amber-400/40 font-extrabold text-xs uppercase tracking-widest py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  Export Cargo Estimate PDF
                </button>

                <p className="text-[10px] text-slate-500 font-bold text-center leading-relaxed tracking-wider uppercase">
                  Calculated values are engineering estimates based on international packing guidelines and standard EN-1783 matchbox sizes.
                </p>
              </div>
            </div>

            {/* Right Column: Visual Container Loading Summary */}
            <div className="lg:col-span-7 bg-[#121826]/90 rounded-3xl p-6 sm:p-8 text-white border border-slate-800/80 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-extrabold flex items-center gap-1.5">
                    <Truck className="w-4 h-4" /> Live Shipments Analyzer
                  </span>
                  <span className="text-xs font-extrabold bg-slate-900 text-slate-300 px-3 py-1 rounded-lg border border-slate-800">
                    {calculatorContainer === '20ft' ? '20ft General Purpose' : '40ft High-Cube'}
                  </span>
                </div>

                {/* Simulated Container Loading visualizer */}
                <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 relative mb-8 overflow-hidden">
                  <div className="absolute top-3 right-3 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                    3D Volumetric Fill
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Container Outline</h4>
                  
                  {/* Visual representation of filling */}
                  <div className="w-full h-14 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex items-center p-1.5">
                    {/* Fill bar */}
                    <div 
                      className={`h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-3 font-extrabold text-xs relative ${
                        getCalculatorResults().exceedsCbm 
                          ? 'bg-red-600/80 text-white animate-pulse' 
                          : getCalculatorResults().volumePct > 85 
                          ? 'bg-amber-600/80 text-white' 
                          : 'bg-emerald-600/80 text-white'
                      }`}
                      style={{ width: `${getCalculatorResults().volumePct}%` }}
                    >
                      {getCalculatorResults().volumePct > 15 && (
                        <span>{getCalculatorResults().volumePct}%</span>
                      )}
                    </div>
                    {/* Exceeds indicator */}
                    {getCalculatorResults().exceedsCbm && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-950/80 text-red-200 font-extrabold text-xs tracking-wider">
                        ⚠️ EXCEEDS CONTAINER CAPACITY
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-wider">
                    <span>Empty (0 CBM)</span>
                    <span>Max ({getCalculatorResults().containerLimitCbm} CBM)</span>
                  </div>
                </div>

                {/* Numbers Panel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  {/* Total Weight Metric */}
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Gross Weight
                    </span>
                    <span className={`text-xl sm:text-2xl font-extrabold tracking-tight block ${
                      getCalculatorResults().exceedsWt ? 'text-red-500' : 'text-white'
                    }`}>
                      {getCalculatorResults().totalWeightTons} Tons
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold block mt-1">
                      Max Limit: {getCalculatorResults().containerLimitWt} Tons
                    </span>
                  </div>

                  {/* Volumetric Space Metric */}
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Cargo Volume
                    </span>
                    <span className={`text-xl sm:text-2xl font-extrabold tracking-tight block ${
                      getCalculatorResults().exceedsCbm ? 'text-red-500' : 'text-white'
                    }`}>
                      {getCalculatorResults().totalCbm} CBM
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold block mt-1">
                      Max Space: {getCalculatorResults().containerLimitCbm} CBM
                    </span>
                  </div>

                  {/* Estimated Production Weeks */}
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Est. Production
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white block">
                      ~{getCalculatorResults().productionWeeks} {getCalculatorResults().productionWeeks === 1 ? 'Week' : 'Weeks'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold block mt-1">
                      Factory Lead-Time
                    </span>
                  </div>

                  {/* Minimum Order Verification */}
                  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Trade Status
                    </span>
                    <span className="text-xs font-extrabold tracking-tight block text-emerald-400 mt-1 uppercase flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 inline" /> MOQ Passed
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold block mt-1">
                      MOQ: 100 Cartons
                    </span>
                  </div>

                </div>
              </div>

              {/* Status feedback & logistics recommendation */}
              <div className="mt-8 p-4 bg-slate-950/70 border border-slate-850 rounded-2xl text-xs text-slate-400 font-medium leading-relaxed">
                {getCalculatorResults().exceedsCbm || getCalculatorResults().exceedsWt ? (
                  <p className="text-red-400 font-extrabold">
                    ⚠️ Optimization Note: Your volume or gross weight exceeds the maximum capacity of a standard {calculatorContainer === '20ft' ? '20ft GP' : '40ft HC'} container. Please scale down the carton count or choose a larger shipping container option.
                  </p>
                ) : (
                  <p>
                    💡 <strong className="text-slate-200">Logistics Recommendation:</strong> Based on your cargo of {calculatorQuantity} cartons, this load safely fits inside the selected container with an estimated {100 - getCalculatorResults().volumePct}% volumetric safety clearance. Excellent choice for export consolidation!
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>
        </>
      )}

      {currentTab === 'info' && (
        <>
          {/* CORPORATE SPECIFICATIONS & GROUP PROFILES BRAND DASHBOARD */}
          <section className="py-20 bg-[#080B11] border-b border-slate-900/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
                  Technical Specifications
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
                  Corporate Specs & Packaging Matrix
                </h2>
                <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold">
                  Detailed volumetric measurements, packing standards, and chemical safety certifications conforming to international wholesale export guidelines.
                </p>
              </div>

              {/* Grid of specifications and company profiles */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Brand overview cards */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-[#121826]/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-2xl" />
                    <div className="flex items-center gap-3.5 mb-4">
                      <img 
                        src="https://kitepk.com/assets/640x640kite-CDjjXNac.jpg" 
                        alt="Kite Brand" 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-cover rounded-lg border border-slate-800"
                      />
                      <div>
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Mohsin Match Factory</h4>
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Est. 1974 — Peshawar</p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-semibold">
                      Under the flagship Aziz Group of Industries, Mohsin Match Factory stands as Pakistan's largest fully automated safety match exporter, outputting premium damp-proof splints globally.
                    </p>
                  </div>

                  <div className="bg-[#121826]/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-2xl" />
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg border border-slate-850 flex items-center justify-center font-black text-amber-400 text-xs uppercase tracking-widest">
                        IB
                      </div>
                      <div>
                        <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Innovative Biscuits</h4>
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Advanced Confectionery</p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-semibold">
                      An advanced FMCG powerhouse with a state-of-the-art baking plant, producing highly customized private label and retail sandwich cookies, crispy wafers, and energy biscuits.
                    </p>
                  </div>
                </div>

                {/* Technical specs matrix tables */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Kite Safety Match Specs */}
                  <div className="bg-[#121826]/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="px-6 py-4.5 bg-slate-950/60 border-b border-slate-850 flex items-center justify-between">
                      <h3 className="text-sm font-extrabold uppercase tracking-widest text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-500" /> Kite Brand Safety Matches Specs
                      </h3>
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-400/5 px-2.5 py-1 rounded-md border border-amber-500/10">
                        EN-1783 Compliant
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-semibold text-slate-300">
                        <tbody>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider w-1/3">Packaging Size</td>
                            <td className="px-6 py-4 text-white">Standard Box: 51mm x 36mm x 12mm</td>
                          </tr>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider">Splint Quality</td>
                            <td className="px-6 py-4 text-white">White Poplar wood, carbonized & damp-resistant</td>
                          </tr>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider">Average Stick Count</td>
                            <td className="px-6 py-4 text-white">40 sticks per box (custom sizes from 30 to 100 sticks available)</td>
                          </tr>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider">Friction Chemistry</td>
                            <td className="px-6 py-4 text-white">Red Phosphorus longevity coating, humidity-safe resin binder</td>
                          </tr>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider">Outer Master Packing</td>
                            <td className="px-6 py-4 text-white">10 boxes in cellowrap, 10 cellowraps in packet, 10 packets in carton (1,000 boxes/carton)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Innovative Biscuits Specs */}
                  <div className="bg-[#121826]/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="px-6 py-4.5 bg-slate-950/60 border-b border-slate-850 flex items-center justify-between">
                      <h3 className="text-sm font-extrabold uppercase tracking-widest text-white flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-500" /> Innovative Biscuits Specs
                      </h3>
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-400/5 px-2.5 py-1 rounded-md border border-amber-500/10">
                        HACCP Certified
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-semibold text-slate-300">
                        <tbody>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider w-1/3">Moisture Level</td>
                            <td className="px-6 py-4 text-white">Calibrated below 4% to maintain crispy shelf integrity</td>
                          </tr>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider">Film Wrapping</td>
                            <td className="px-6 py-4 text-white">Double-laminated Food Grade BOPP wrapper, heat-sealed</td>
                          </tr>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider">Master Carton Gross Weight</td>
                            <td className="px-6 py-4 text-white">Approximately 8.5 kg to 10.2 kg depending on selection</td>
                          </tr>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider">Master Carton Dimensions</td>
                            <td className="px-6 py-4 text-white">450mm x 320mm x 280mm (Corrugated Double-Wall structure)</td>
                          </tr>
                          <tr className="border-b border-slate-850">
                            <td className="px-6 py-4 text-slate-400 font-extrabold uppercase tracking-wider">Product Shelf Life</td>
                            <td className="px-6 py-4 text-white">12 Months (Guaranteed storage stability under 25°C)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* 5-STEP EXPORT & TRADE TIMELINE */}
          <section className="py-24 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
              SUPPLY CHAIN JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
              How We Trade & Export
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold">
              A transparent, highly coordinated, and secure five-step process ensuring seamless factory-to-port delivery for wholesale buyers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            {/* Visual connector line for desktop */}
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-slate-800 -z-10" />

            {/* Step 1 */}
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-800 text-amber-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-xl group-hover:border-amber-400 transition-all">
                1
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Inquiry Submission</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed font-semibold">
                  Submit cargo specifics, destination port, and branding desires through our B2B form, AI Chat, or WhatsApp.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-800 text-amber-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-xl group-hover:border-amber-400 transition-all">
                2
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Proforma Invoice</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed font-semibold">
                  Danial Trader drafts detailed proforma invoices incorporating customized FOB Karachi or CIF prices.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-800 text-amber-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-xl group-hover:border-amber-400 transition-all">
                3
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Secure Payment & Contract</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed font-semibold">
                  Sign commercial agreements and activate production lines via standard bank Telegraphic Transfer (T/T) or Letter of Credit (L/C).
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-800 text-amber-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-xl group-hover:border-amber-400 transition-all">
                4
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Production & Packing</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed font-semibold">
                  Our modern factories manufacture and securely load your biscuits or damp-proof safety matches with complete QA certification.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-emerald-500/30 text-[#10b981] font-extrabold text-xl flex items-center justify-center mx-auto shadow-xl group-hover:border-emerald-400 transition-all">
                5
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Customs & Delivery</h4>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed font-semibold">
                  Customs declaration clearance at Peshawar/Karachi dry ports followed by transit shipping to your designated global seaport.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE SCROLL-BASED HISTORICAL TIMELINE */}
      <section className="py-24 bg-[#080B11] border-t border-slate-900/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,191,36,0.02),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
              OUR CORPORATE JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
              Milestones of Legacy & Innovation
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold">
              From establishing Mohsin Match Factory in 1974 to modernizing confectionery exports under Innovative Biscuits.
            </p>
          </motion.div>

          {/* Timeline Tree */}
          <div className="relative">
            {/* Center visual line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 -translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  year: "1974",
                  title: "Mohsin Match Factory Founded",
                  subtitle: "Peshawar Industrial Estate",
                  desc: "Established the flagship safety match plant under the pioneering Aziz Group of Industries, laying down initial chemical-dipping and continuous splint carbonization lines.",
                  brand: "Kite Brand",
                  icon: <Building className="w-4 h-4 text-amber-400" />
                },
                {
                  year: "1988",
                  title: "First Inter-Continental Exports",
                  subtitle: "Central Asia & Africa Logistics",
                  desc: "Dispatched the first international consolidated cargo shipments of damp-proof safety matches, establishing global trading corridors across Afghanistan, Riyadh, and East Africa.",
                  brand: "Kite Brand",
                  icon: <Globe className="w-4 h-4 text-amber-400" />
                },
                {
                  year: "1999",
                  title: "Automation Technological Leap",
                  subtitle: "High-Speed Match Machinery",
                  desc: "Deconstructed legacy manual packaging and replaced it with Swedish and German high-speed friction coating lines, continuous inner box pasting systems, and digital temperature sensors.",
                  brand: "Kite Brand",
                  icon: <Sparkles className="w-4 h-4 text-amber-400" />
                },
                {
                  year: "2010",
                  title: "Innovative Biscuits Confectionery Launch",
                  subtitle: "Premium Food-Grade FMCG Division",
                  desc: "Pivoted and diversified corporate reach by setting up a premier confectionery baking plant equipped with state-of-the-art sterile baking chambers and modular formulation labs.",
                  brand: "Innovative Biscuits",
                  icon: <Award className="w-4 h-4 text-amber-400" />
                },
                {
                  year: "2016",
                  title: "Flow-Wrap & Moulding Modernization",
                  subtitle: "Double Production Capacity",
                  desc: "Installed high-throughput rotary biscuit moulders and double-laminated moisture-barrier horizontal flow-wrapping machinery, certifying all lines under strict ISO & HACCP standards.",
                  brand: "Innovative Biscuits",
                  icon: <TrendingUp className="w-4 h-4 text-amber-400" />
                },
                {
                  year: "2021",
                  title: "1,500+ Shipping Containers Annually",
                  subtitle: "Global Cargo Milestone",
                  desc: "Reached a peak volume of over 1,500 40ft container shipments per year, serving major retail conglomerates and wholesale suppliers across 40+ countries.",
                  brand: "Aziz Group FMCG",
                  icon: <Truck className="w-4 h-4 text-amber-400" />
                },
                {
                  year: "2026",
                  title: "Dynamic B2B Digital Integration",
                  subtitle: "Modern Trade & Smart Platform",
                  desc: "Launched our full-stack digital B2B trade portal, empowering global procurement officers to perform real-time volumetric freight calculations, request bespoke private label products, and inspect technical specs instantly.",
                  brand: "Aziz Group FMCG",
                  icon: <Clock className="w-4 h-4 text-amber-400" />
                }
              ].map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className="relative flex flex-col md:flex-row items-stretch"
                  >
                    {/* Dot Node */}
                    <div className="absolute left-4 md:left-1/2 top-6 w-9 h-9 rounded-full bg-slate-900 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center -translate-x-1/2 shadow-xl z-10 hover:border-amber-400 transition-colors">
                      {item.icon}
                    </div>

                    {/* Left Side spacer/content */}
                    <div className={`pl-12 md:pl-0 w-full md:w-1/2 pr-0 md:pr-12 text-left md:text-right ${isEven ? 'md:block' : 'md:hidden md:pointer-events-none'}`}>
                      {isEven && (
                        <div className="bg-[#121826]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative group hover:border-amber-500/20 transition-all duration-300">
                          <span className="text-[11px] uppercase tracking-widest font-black text-amber-500">{item.brand}</span>
                          <div className="text-2xl font-black text-white mt-1 mb-2 font-sans">{item.year}</div>
                          <h4 className="text-sm font-extrabold text-slate-100">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">{item.subtitle}</p>
                          <p className="text-slate-400 text-xs mt-3 leading-relaxed font-semibold">{item.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Side spacer/content */}
                    <div className={`pl-12 md:pl-12 w-full md:w-1/2 text-left ${!isEven ? 'md:block' : 'md:hidden md:pointer-events-none'}`}>
                      {!isEven && (
                        <div className="bg-[#121826]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative group hover:border-amber-500/20 transition-all duration-300">
                          <span className="text-[11px] uppercase tracking-widest font-black text-amber-500">{item.brand}</span>
                          <div className="text-2xl font-black text-white mt-1 mb-2 font-sans">{item.year}</div>
                          <h4 className="text-sm font-extrabold text-slate-100">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">{item.subtitle}</p>
                          <p className="text-slate-400 text-xs mt-3 leading-relaxed font-semibold">{item.desc}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
        </>
      )}

      {currentTab === 'security' && (
        <>
          {/* SECURITY & COMPLIANCE SECTION */}
          <section className="py-20 bg-[#080B11]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
                  Global Standards
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide flex items-center justify-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-amber-500" /> Export Compliance & Security
                </h2>
                <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold">
                  Comprehensive anti-tampering protocols, rigorous quality control certifications, and ISO 17712 container-seal safeguards.
                </p>
              </div>

              {/* Security Compliance Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Protocol 1 */}
                <div className="bg-[#121826]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden group shadow-2xl">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-2xl -z-10" />
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-6">
                    <Lock className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Anti-Tampering Container Locking</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                    We deploy ISO 17712 rated high-security bolt seals. Every seal is logged, photographed, and registered with customs officers at Peshawar Dry Port and Karachi Seaport before boarding the ocean cargo ship.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] text-amber-400 bg-amber-400/5 px-2.5 py-1 rounded border border-amber-500/10 font-black tracking-widest uppercase">
                      ISO 17712 Bolt Seal
                    </span>
                    <span className="text-xs text-slate-500 font-bold">Protocol C-34</span>
                  </div>
                </div>

                {/* Protocol 2 */}
                <div className="bg-[#121826]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden group shadow-2xl">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-2xl -z-10" />
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-6">
                    <ShieldAlert className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Chemical & Foodstuff Segregation</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                    Kite Safety Matches contain combustible chemicals (Potassium Chlorate), while Innovative Biscuits are food-grade wafers. We strictly enforce zero-mix shipping policies. Chemicals and foodstuffs are always segregated in completely separate ocean container voyages.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] text-amber-400 bg-amber-400/5 px-2.5 py-1 rounded border border-amber-500/10 font-black tracking-widest uppercase">
                      Strict Segregation
                    </span>
                    <span className="text-xs text-slate-500 font-bold">FMCG Standard</span>
                  </div>
                </div>

                {/* Protocol 3 */}
                <div className="bg-[#121826]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden group shadow-2xl">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-2xl -z-10" />
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-6">
                    <Camera className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Biometric Loading Logins</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                    All factory warehouse loaders must authenticate via biometric logs before packing master cartons. Loading bays are under 24/7 high-definition digital surveillance with real-time video feeds synced to Aziz Group headquarters.
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] text-amber-400 bg-amber-400/5 px-2.5 py-1 rounded border border-amber-500/10 font-black tracking-widest uppercase">
                      24/7 HD Feed Logs
                    </span>
                    <span className="text-xs text-slate-500 font-bold">C-TPAT Grade</span>
                  </div>
                </div>

              </div>

              {/* Secure Supply Chain Certification Verification */}
              <div className="mt-12 bg-[#121826]/40 border border-slate-800 rounded-3xl p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Verified Wholesale Export Licenses</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                      Danial Trader holds active trade authorization permits with major regulatory bodies in Pakistan and globally, confirming compliant customs routing and phytosanitary clearance for poplar and pine wood splints.
                    </p>
                    <ul className="space-y-3.5 text-xs font-semibold text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        Federal Board of Revenue (FBR) Registered Manufacturer & Export Agent
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        Peshawar Chamber of Commerce & Industry Active Corporate Member
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        Phytosanitary Wood Safety Certification (for matches export wood splints)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500" />
                        HACCP & SGS Food Quality Verification Certs (Innovative Biscuits)
                      </li>
                    </ul>
                  </div>

                  {/* interactive download panel */}
                  <div className="bg-[#121826] border border-slate-800 p-6 rounded-2xl space-y-6">
                    <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Download Compliance Package</h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-semibold">
                      Wholesale buyers require verified regulatory dossiers. Click below to simulate compiling and exporting our comprehensive international quality dossier.
                    </p>
                    <button 
                      onClick={() => {
                        const win = window.open('', '_blank');
                        if (!win) {
                          alert('Pop-up blocked! Please allow pop-ups.');
                          return;
                        }
                        win.document.write(`
                          <html>
                            <head>
                              <title>Compliance Dossier - Danial Trader</title>
                              <style>
                                body { font-family: sans-serif; padding: 40px; color: #0f172a; }
                                h1 { font-size: 24px; color: #b45309; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
                                .badge { background: #fef3c7; border: 1px solid #fde047; padding: 6px 12px; border-radius: 4px; font-size: 12px; color: #78350f; font-weight: bold; }
                                p { line-height: 1.6; }
                              </style>
                            </head>
                            <body>
                              <h1>Official Trade Compliance Dossier</h1>
                              <span class="badge">SECURE EXPORT PASS</span>
                              <p>This certifies that <strong>Danial Trader</strong> (authorized distributor for Innovative Biscuits & Mohsin Match Factory) meets all security compliance, anti-tampering, and segregation directives for cross-border ocean logistics.</p>
                              <p>Signed and sealed by the Security Oversight Council, Peshawar Industrial Estate, Pakistan.</p>
                            </body>
                          </html>
                        `);
                        win.document.close();
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-3.5 rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/10"
                    >
                      <FileText className="w-4 h-4" /> Export Quality Dossier
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </section>
        </>
      )}

      {currentTab === 'home' && (
        <>
          {/* FREQUENTLY ASKED QUESTIONS SECTION */}
          <section id="faq-section" className="py-24 bg-[#080B11] border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
              TRADE GUIDELINES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold">
              Explore essential answers related to wholesale MOQs, safety match fire standards, custom OEM match branding, and export shipping logistics.
            </p>
          </motion.div>

          <div className="space-y-4">
            
            {/* FAQ 1 */}
            <div className="bg-[#121826]/90 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden transition-all hover:border-slate-700/80">
              <button 
                type="button"
                onClick={() => toggleFaq(0)}
                className="w-full flex items-center justify-between p-6 text-left font-extrabold text-white hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  What is the Minimum Order Quantity (MOQ) for international B2B shipments?
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${faqOpenIndex === 0 ? 'transform rotate-180 text-amber-400' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {faqOpenIndex === 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm border-t border-slate-800/50 leading-relaxed font-semibold">
                      For international exports, our standard MOQ is **one 20ft container**, which can carry approximately **1,200 to 1,500 cartons** depending on the specific biscuit weight or safety match carton dimensions. We support consolidated container options containing both Innovative Biscuits and Kite matches.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 2 */}
            <div className="bg-[#121826]/90 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden transition-all hover:border-slate-700/80">
              <button 
                type="button"
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between p-6 text-left font-extrabold text-white hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  Are your safety matches EN-1783 compliant and damp-proof?
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${faqOpenIndex === 1 ? 'transform rotate-180 text-amber-400' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {faqOpenIndex === 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm border-t border-slate-800/50 leading-relaxed font-semibold">
                      Yes, absolutely. Our **Kite Brand safety matches** are strictly manufactured in compliance with **European Standard EN 1783** standards. They feature carbonized premium splints, premium sulfur-free striker boards, and special damp-proof lacquer treatments to ensure reliable ignition in highly humid and extreme tropical climates.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 3 */}
            <div className="bg-[#121826]/90 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden transition-all hover:border-slate-700/80">
              <button 
                type="button"
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between p-6 text-left font-extrabold text-white hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  Do you provide custom OEM labeling and private brand packing for matches?
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${faqOpenIndex === 2 ? 'transform rotate-180 text-amber-400' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {faqOpenIndex === 2 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm border-t border-slate-800/50 leading-relaxed font-semibold">
                      Yes. We offer complete **OEM and custom brand packaging services** for matchboxes. You can customize the matchbox dimensions, strike-strip patterns, splints count (e.g. 30s, 40s, 50s matches per box), side-striker colors, and custom cardboard graphic branding. Please specify your design parameters on our B2B intake portal.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 4 */}
            <div className="bg-[#121826]/90 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden transition-all hover:border-slate-700/80">
              <button 
                type="button"
                onClick={() => toggleFaq(3)}
                className="w-full flex items-center justify-between p-6 text-left font-extrabold text-white hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  What are the standard international payment terms?
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${faqOpenIndex === 3 ? 'transform rotate-180 text-amber-400' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {faqOpenIndex === 3 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm border-t border-slate-800/50 leading-relaxed font-semibold">
                      We trade under standard international commercial frameworks. Our primary accepted payment terms are:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>**Telegraphic Transfer (T/T)**: 30% advance deposit at order confirmation, 70% balance payable upon presentation of original Bill of Lading (B/L) copy.</li>
                        <li>**Letter of Credit (L/C)**: 100% Irrevocable Confirmed L/C payable at sight from a first-class prime international bank.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 5 */}
            <div className="bg-[#121826]/90 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden transition-all hover:border-slate-700/80">
              <button 
                type="button"
                onClick={() => toggleFaq(4)}
                className="w-full flex items-center justify-between p-6 text-left font-extrabold text-white hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  How is Danial Trader officially connected to Mohsin Match Factory?
                </span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${faqOpenIndex === 4 ? 'transform rotate-180 text-amber-400' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {faqOpenIndex === 4 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm border-t border-slate-800/50 leading-relaxed font-semibold">
                      **Danial Trader** (owned and operated by **Danial Ahmad**) is the officially authorized wholesale trade representative and distribution portal for the products of **Innovative Biscuits (Pvt) Ltd** and **Kite Brand / Mohsin Match Factory (Aziz Group)**. We handle bulk client acquisition, shipping container configurations, trade documentation, customs clearing, and direct localized supply lines.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* CLIENT TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-[#0B0F19] border-t border-slate-900 relative overflow-hidden">
        {/* Abstract background grids/circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
              TRUSTED GLOBALLY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
              Client Testimonials
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
              Hear directly from our verified international B2B wholesale buyers and regional trade distributors about our export logistics, match quality, and pristine service.
            </p>
          </motion.div>

          {/* Testimonial Motion Card Container */}
          <div className="relative min-h-[380px] sm:min-h-[320px] bg-[#121826]/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Background Quote Watermark */}
            <div className="absolute top-4 right-8 text-slate-800/15 pointer-events-none select-none">
              <svg viewBox="0 0 100 100" className="w-28 h-28 fill-current">
                <path d="M20 50 C20 30, 35 25, 40 15 L25 15 C15 30, 10 45, 10 70 L35 70 L35 50 Z M65 50 C65 30, 80 25, 85 15 L70 15 C60 30, 55 45, 55 70 L80 70 L80 50 Z" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stars and Category badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="inline-flex text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-amber-400/5 text-amber-400 border border-amber-500/20 w-fit">
                    Portfolio: {testimonials[currentTestimonial].portfolio === 'biscuits' ? 'Innovative Biscuits' : testimonials[currentTestimonial].portfolio === 'matches' ? 'Kite Matches' : 'Dual Brand Distribution'}
                  </span>
                </div>

                {/* Feedback Quote */}
                <blockquote className="text-white text-base sm:text-lg md:text-xl font-semibold leading-relaxed relative z-10 italic">
                  "{testimonials[currentTestimonial].feedback}"
                </blockquote>

                {/* Divider */}
                <div className="h-[1px] bg-slate-800/80 w-full" />

                {/* User Info Area */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center gap-1.5">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-slate-400 text-xs font-semibold mt-0.5">
                      {testimonials[currentTestimonial].role} — <strong className="text-amber-400 font-bold">{testimonials[currentTestimonial].company}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs bg-[#0B0F19] px-3.5 py-2 rounded-xl border border-slate-800/80 w-fit">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>{testimonials[currentTestimonial].location}</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls overlayed or bottom */}
            <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentTestimonial === index ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slider Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCurrentTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
                  }}
                  className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 rounded-xl transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
                  }}
                  className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 rounded-xl transition-all cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Micro Trust Stats banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center">
            <div className="bg-[#121826]/40 p-4 rounded-2xl border border-slate-800/60">
              <span className="block text-xl font-extrabold text-white">100%</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1 block">Container Seal Integrity</span>
            </div>
            <div className="bg-[#121826]/40 p-4 rounded-2xl border border-slate-800/60">
              <span className="block text-xl font-extrabold text-white">40+</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1 block">Active Import Seaports</span>
            </div>
            <div className="bg-[#121826]/40 p-4 rounded-2xl border border-slate-800/60">
              <span className="block text-xl font-extrabold text-white">EN-1783</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1 block">EU Match Safety Compliance</span>
            </div>
          </div>

        </div>
      </section>
        </>
      )}

      {currentTab === 'images' && (
        <>
          {/* PRODUCT SHOWCASE SELECTOR BLOCK */}
          <section className="pt-24 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest font-black text-amber-400 mb-2">Our Premium Portfolio</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">Quality Foods & Manufactured FMCG</p>
          <p className="text-slate-400 mt-3 text-base sm:text-lg font-semibold">
            Sourcing only the highest grade ingredients and technology to power household favorites across Pakistan and international borders.
          </p>

          {/* Interactive filter tabs */}
          <div className="flex justify-center gap-2.5 mt-8 p-1.5 bg-[#121826]/90 rounded-full max-w-md mx-auto border border-slate-800">
            <button 
              onClick={() => {
                setProductCategoryTab('all');
                scrollToSection('biscuits');
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                productCategoryTab === 'all' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Brands
            </button>
            <button 
              onClick={() => {
                setProductCategoryTab('biscuits');
                scrollToSection('biscuits');
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                productCategoryTab === 'biscuits' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Biscuits
            </button>
            <button 
              onClick={() => {
                setProductCategoryTab('kite');
                scrollToSection('kite');
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                productCategoryTab === 'kite' 
                  ? 'bg-amber-500 text-slate-950 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kite Brand
            </button>
          </div>
        </div>
      </section>

      {/* INNOVATIVE BISCUITS SECTION */}
      <AnimatePresence mode="popLayout">
        {(productCategoryTab === 'all' || productCategoryTab === 'biscuits') && (
          <motion.section 
            id="biscuits" 
            key="biscuits-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
        
        {/* Brand Showcase Hero Header */}
        <div className="bg-gradient-to-br from-[#121826] to-[#0B0F19] border border-slate-800 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
          {/* Subtle design element */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl opacity-60 -z-10 translate-x-24 -translate-y-24" />
          
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <img 
                src="https://innovativebiscuits.com/wp-content/uploads/2026/02/innovative-premium-logo-new.webp" 
                alt="Innovative Biscuits Logo" 
                referrerPolicy="no-referrer"
                className="h-16 object-contain mb-5 brightness-0 invert" 
              />
              <span className="text-amber-400 font-extrabold uppercase text-xs tracking-widest bg-amber-400/5 border border-amber-500/25 px-3 py-1 rounded-full">
                Est. Quality Foods
              </span>
              <h3 className="text-3xl font-extrabold text-white mt-4 leading-tight font-sans tracking-wide">
                Innovative Biscuits
              </h3>
              <p className="text-slate-400 mt-4 text-sm leading-relaxed font-semibold">
                "Innovative Biscuits, a leading Pakistani biscuit manufacturer committed to quality, innovation, and great taste. From crunchy biscuits and creamy wafers to rich chocolates, we deliver exceptional products that delight consumers."
              </p>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <a 
                  href="https://innovativebiscuits.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
                >
                  Visit Corporate Site <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button 
                  onClick={() => openB2bInquiry('Biscuits')}
                  className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                >
                  B2B Distribution <Building className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="w-full lg:w-2/3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-8 lg:pt-0 lg:pl-10">
              <p className="text-slate-400 font-extrabold uppercase text-xs tracking-widest mb-4">Core Flavor Categories</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                  <p className="font-bold text-amber-400 text-sm">Signature Wafers</p>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Feather-light crispy wafer rolls packed with rich chocolate and premium cocoa creams.</p>
                </div>
                <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                  <p className="font-bold text-amber-400 text-sm">Classic Digestives</p>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">High-fiber, whole wheat biscuits made for perfect digestion and traditional tea-time dipping.</p>
                </div>
                <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                  <p className="font-bold text-amber-400 text-sm">Rich Choc-Chips</p>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Crunchy golden baked cookies packed with overflowing chunks of premium melting chocolate chips.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <h4 className="text-white text-2xl font-extrabold">Discover Our Products</h4>
          <p className="text-slate-400 text-sm mt-1 font-semibold">Click on any product card below to explore dynamic ingredients, nutrition, and bulk inquiry options.</p>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {biscuitsProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -6, scale: 1.018 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProduct(product)}
              className="group bg-[#121826]/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              {/* Product Image Area */}
              <div className="relative aspect-square bg-[#0B0F19] flex items-center justify-center p-4 overflow-hidden border-b border-slate-800/80">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
                  <span className="bg-amber-400/5 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-500/25">
                    Premium Biscuit
                  </span>
                  {product.badge && (
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                      product.badge === 'Best Seller' 
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                        : product.badge === 'New Arrival'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : product.badge === 'Trending'
                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                        : 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                {/* Subtle top-right zoom-in eye trigger */}
                <div className="absolute top-3 right-3 z-30 flex items-center justify-center">
                  <div 
                    title="Quick View Product"
                    className="bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-300 hover:scale-110 border border-slate-800 hover:border-amber-400 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                {/* Quick View Button Overlay */}
                <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
                  <span className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4.5 py-2.5 rounded-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-amber-400/20">
                    <Eye className="w-4 h-4" />
                    Quick View
                  </span>
                </div>
                {/* Click overlay feedback */}
                <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Product Info Area */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h5 className="font-extrabold text-white group-hover:text-amber-400 transition-colors text-base line-clamp-1">
                    {product.name}
                  </h5>
                  <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed font-semibold">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                  <span className="text-amber-400 font-bold text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    Aziz Group
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section bottom CTA */}
        <div className="mt-12 text-center">
          <a 
            href="https://innovativebiscuits.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#121826] hover:bg-[#1B2337] text-white border border-slate-800 hover:border-slate-700 font-bold text-sm tracking-wide transition-all rounded-xl px-7 py-3.5 shadow-xl cursor-pointer"
          >
            View All Products on Official Website <ExternalLink className="w-4 h-4 text-amber-400" />
          </a>
        </div>

          </motion.section>
        )}
      </AnimatePresence>

      {/* KITE BRAND SECTION */}
      <AnimatePresence mode="popLayout">
        {(productCategoryTab === 'all' || productCategoryTab === 'kite') && (
          <motion.section 
            id="kite" 
            key="kite-section"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="py-20 bg-[#0B0F19] border-y border-slate-900"
          >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Brand Showcase Hero Header */}
          <div className="bg-gradient-to-br from-[#121826] to-[#0B0F19] border border-slate-800 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl relative overflow-hidden text-white">
            {/* Subtle amber gradient element */}
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl opacity-40 -z-10 -translate-x-24 translate-y-24" />
            
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-3 mb-5">
                  <img 
                    src="https://kitepk.com/assets/640x640kite-CDjjXNac.jpg" 
                    alt="Kite Brand Logo" 
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 object-cover rounded-2xl border border-slate-800 shadow-md" 
                  />
                  <div>
                    <span className="bg-amber-500/15 text-amber-400 font-extrabold uppercase text-[10px] tracking-wider border border-amber-500/20 px-2.5 py-0.5 rounded-full block w-max">
                      Aziz Group Company
                    </span>
                    <span className="text-xs text-slate-400 font-medium block mt-0.5">Est. 1974</span>
                  </div>
                </div>
                <h3 className="text-3xl font-extrabold text-white leading-tight font-sans tracking-wide">
                  Kite Brand
                </h3>
                <p className="text-slate-300 mt-4 text-sm leading-relaxed font-semibold">
                  "Part of Aziz Group of Industries, Kite Brand represents the pinnacle of FMCG excellence under Mohsin Match Factory (Pvt.) Limited. With over 50 years of manufacturing excellence since 1974, we have become Pakistan's largest safety match manufacturer and exporter."
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <a 
                    href="https://kitepk.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
                  >
                    Visit Kitepk.com <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button 
                    onClick={() => openB2bInquiry('Kite')}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    B2B Export Inquiry <Building className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-2/3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-8 lg:pt-0 lg:pl-10">
                <p className="text-amber-500 font-extrabold uppercase text-xs tracking-widest mb-4">Export Powerhouse & Milestones</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-slate-300">
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <p className="font-bold text-white text-sm">#1 Match Exporter</p>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">Proudly exporting premium damp-proof safety matches across 40+ countries for five decades.</p>
                  </div>
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <p className="font-bold text-white text-sm">Mohsin Match Factory</p>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">Established in 1974, our production capacities employ state-of-the-art match manufacturing tech.</p>
                  </div>
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <p className="font-bold text-white text-sm">Kite Glow (Launched 2025)</p>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">Rapidly-recognized active-oxygen formula detergent delivering elite level wash performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Block (Two-Column Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 text-xs uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-md border border-amber-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Trusted Legacy FMCG Brand
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-wide">
                Over 50 Years of Industrial and Export Excellence
              </h4>
              <p className="text-slate-400 leading-relaxed font-semibold text-sm sm:text-base">
                Kite Brand represents the absolute pinnacle of safety match and cleaning agent craftsmanship under the historic Aziz Group of Industries banner. Beginning our production journey in 1974 as Mohsin Match Factory (Pvt.) Limited, we have sustained our spot as Pakistan's largest and most reliable exporter of high-grade safety matches.
              </p>
              <p className="text-slate-400 leading-relaxed font-semibold text-sm sm:text-base">
                Our expansion into cleaning FMCG with the premium **Kite Glow Detergent** in 2025 marks a new era. Blended with advanced active elements, we bring the same trust, quality standards, and affordability to household laundry and kitchens across Asia and Europe.
              </p>
              
              <div className="pt-2">
                <blockquote className="border-l-4 border-amber-500 pl-4 italic text-slate-400 text-xs sm:text-sm font-semibold">
                  "Our safety match formulations are trusted in over 40 countries, withstanding rigorous climatic changes to deliver reliable lighting under any conditions."
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl filter blur-sm opacity-25" />
              <div className="relative bg-[#121826] p-2.5 rounded-2xl border border-slate-800 shadow-2xl">
                <img 
                  src="https://kitepk.com/assets/Shippment-1920x640-OvFnXOMB.jpeg" 
                  alt="Kite Brand Shipment & Logistics" 
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full h-[320px] object-cover opacity-90" 
                />
                <div className="absolute bottom-6 right-6 bg-slate-950/90 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg border border-slate-800 backdrop-blur-sm shadow-xl">
                  Export Operations, Lahore
                </div>
              </div>
            </div>
          </div>

          {/* Section Sub-header */}
          <div className="mb-8">
            <h4 className="text-white text-2xl font-extrabold">Kite Portfolio Products</h4>
            <p className="text-slate-400 text-sm mt-1 font-semibold">Our leading matches, household wash powders, and heavy-duty grease-cutting bars.</p>
          </div>

          {/* Product Grid (smaller) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kiteProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -6, scale: 1.018 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedProduct(product)}
                className="group bg-[#121826]/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Product Image Area */}
                <div className="relative h-56 bg-[#0B0F19] flex items-center justify-center p-4 overflow-hidden border-b border-slate-800/80">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
                    <span className="bg-amber-400/5 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-500/25">
                      FMCG Champion
                    </span>
                    {product.badge && (
                      <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                        product.badge === 'Best Seller' 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                          : product.badge === 'New Arrival'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : product.badge === 'Trending'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                          : 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  {/* Subtle top-right zoom-in eye trigger */}
                  <div className="absolute top-3 right-3 z-30 flex items-center justify-center">
                    <div 
                      title="Quick View Product"
                      className="bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-300 hover:scale-110 border border-slate-800 hover:border-amber-400 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  {/* Quick View Button Overlay */}
                  <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
                    <span className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4.5 py-2.5 rounded-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-amber-400/20">
                      <Eye className="w-4 h-4" />
                      Quick View
                    </span>
                  </div>
                  {/* Click overlay feedback */}
                  <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Product Info Area */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h5 className="font-extrabold text-white group-hover:text-amber-400 transition-colors text-base line-clamp-1">
                      {product.name}
                    </h5>
                    <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed font-semibold">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Aziz Group
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
          </motion.section>
        )}
      </AnimatePresence>

          {/* HIGH-RESOLUTION TRADE ASSETS GALLERY */}
          <section className="py-20 bg-[#0B0F19] border-t border-slate-900/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
                  Media Showcase
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
                  High-Resolution Trade Assets Gallery
                </h2>
                <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold">
                  A comprehensive visual archive showcasing our state-of-the-art FMCG packaging lines, automated baking ovens, and dry port container loading.
                </p>
              </div>

              {/* Gallery Controls (Search + Filters) */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-12 bg-[#121826]/40 p-4 rounded-2xl border border-slate-800">
                {/* Search Bar */}
                <div className="w-full md:w-80 relative">
                  <input 
                    type="text"
                    value={gallerySearch}
                    onChange={e => setGallerySearch(e.target.value)}
                    placeholder="Search gallery assets..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-xs focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-500 font-semibold text-white"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold pointer-events-none">
                    🔍
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { id: 'all', label: 'All Media' },
                    { id: 'biscuits', label: 'Wafer/Biscuits' },
                    { id: 'matches', label: 'Safety Matches' },
                    { id: 'factory', label: 'Production Plant' },
                    { id: 'logistics', label: 'Seaport Logistics' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setGalleryFilter(tab.id as any)}
                      className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                        galleryFilter === tab.id 
                          ? 'bg-amber-500 border-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/10'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-750'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    id: 1,
                    title: "Innovative Biscuit Packing Line",
                    category: "biscuits",
                    image: "https://images.unsplash.com/photo-1558961309-dbdf717a13d8?auto=format&fit=crop&w=800&q=80",
                    description: "Automated, high-precision hygienic packaging lines for Innovative sandwich and wafer range.",
                    dimensions: "Fully Sealed BOPP Food Grade film wrapper, 45g packs.",
                    moq: "200 Master Cartons"
                  },
                  {
                    id: 2,
                    title: "Kite Brand Damp-Proof Matches",
                    category: "matches",
                    image: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&w=800&q=80",
                    description: "Ready-to-ship cardboard matchboxes. Strike-on-box formulation tested to work under high humidity.",
                    dimensions: "40 sticks/box, average length 40mm, carbonized splints.",
                    moq: "1 x 20ft General Cargo Container"
                  },
                  {
                    id: 3,
                    title: "Karachi Seaport Container Transit",
                    category: "logistics",
                    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
                    description: "Primary seaport consolidation yard for cargo vessels destined for East Africa and Gulf ports.",
                    dimensions: "FOB Karachi Port / CIF Delivery options available.",
                    moq: "Consolidated Cargo"
                  },
                  {
                    id: 4,
                    title: "High-Speed Wafer Baking Automation",
                    category: "factory",
                    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
                    description: "Continuous rotary multi-tier wafer oven baking lines for premium wafer biscuits.",
                    dimensions: "HACCP & ISO 22000 Quality Assurance Protocols.",
                    moq: "Continuous Supply"
                  },
                  {
                    id: 5,
                    title: "Customs Seals & Cargo Inspection",
                    category: "logistics",
                    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
                    description: "Official customs checks and high-security seal inspection logs at Peshawar dry port.",
                    dimensions: "Clearance certified under Federal Board of Revenue (FBR) protocols.",
                    moq: "N/A"
                  },
                  {
                    id: 6,
                    title: "Calibrated Match Head Combustion Spark",
                    category: "matches",
                    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
                    description: "Safety match head chemistry strike testing, validating spark-free and even burn speeds.",
                    dimensions: "Non-explosive strike, Potassium Chlorate formulation.",
                    moq: "500 Master Cartons"
                  }
                ]
                .filter(item => {
                  const matchCategory = galleryFilter === 'all' || item.category === galleryFilter;
                  const matchSearch = item.title.toLowerCase().includes(gallerySearch.toLowerCase()) || 
                                      item.description.toLowerCase().includes(gallerySearch.toLowerCase());
                  return matchCategory && matchSearch;
                })
                .map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#121826] border border-slate-800 rounded-2xl overflow-hidden group shadow-xl hover:shadow-2xl hover:border-slate-750 transition-all"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-950">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3.5 left-3.5 text-[9px] uppercase font-black text-amber-400 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-amber-500/10 tracking-widest">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5.5 space-y-4">
                      <div>
                        <h4 className="text-white font-extrabold text-sm tracking-wide leading-snug line-clamp-1">{item.title}</h4>
                        <p className="text-slate-400 text-xs mt-1.5 font-semibold leading-relaxed line-clamp-2">{item.description}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-850 space-y-2 text-[10px] sm:text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 font-bold uppercase tracking-wider">Specifications</span>
                          <span className="text-slate-300 font-semibold">{item.dimensions}</span>
                        </div>
                        {item.moq !== 'N/A' && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 font-bold uppercase tracking-wider">Wholesale MOQ</span>
                            <span className="text-amber-500 font-extrabold">{item.moq}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </section>
        </>
      )}

      {currentTab === 'home' && (
        <>
          {/* LEADERSHIP SECTION */}
          <section id="leadership" className="py-24 bg-[#080B11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
              Board & Management
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
              Our Leadership
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base font-semibold">
              Guided by a vision of robust industrial exports, strict fiscal discipline, and community development.
            </p>
          </motion.div>

          {/* Three profiles in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-[#121826]/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full hover:border-amber-400 transition-all duration-300"
              >
                {/* Leader Image Area */}
                <div className="relative aspect-[4/5] bg-[#0B0F19] overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500" 
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-12">
                    <h3 className="text-lg font-bold text-white tracking-wide">{leader.name}</h3>
                    <p className="text-xs text-amber-400 font-bold tracking-wider uppercase mt-1">{leader.role}</p>
                  </div>
                </div>

                {/* Leader Info Area */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                    {leader.bio}
                  </p>
                  
                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <button 
                      onClick={() => setSelectedLeader(leader)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-350 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      Read Full Profile & Roles <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Corporate Values highlight banner */}
          <div className="mt-16 bg-[#121826] rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <p className="font-extrabold text-white text-lg">Looking for Partnership or Distribution Channels?</p>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed font-semibold">
                We have over 50 years of localized and export supply chain framework. Get in touch with our marketing and distribution heads to register as a local distributor or international buyer.
              </p>
            </div>
            <button 
              onClick={() => openB2bInquiry('Both')}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-500/20 whitespace-nowrap cursor-pointer"
            >
              Open B2b Partnership Portal
            </button>
          </div>

        </div>
      </section>
        </>
      )}

      {/* CONTACT & INQUIRY SECTION */}
      {currentTab === 'contact' && (
        <>
          <section id="contact" className="py-24 bg-[#0B0F19] border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Information & Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-black text-amber-400 bg-amber-400/5 px-4 py-1.5 rounded-full border border-amber-500/10">
                  Connect With Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 font-sans tracking-wide">
                  Contact Pathway
                </h2>
                <p className="text-slate-400 mt-3 text-sm leading-relaxed font-semibold">
                  Whether you are an international buyer, interested local distributor, or have consumer product feedback, we would love to hear from you.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4">
                <a href="https://wa.me/923338931786" target="_blank" rel="noopener noreferrer" className="flex gap-4 p-4 bg-[#121826] rounded-2xl border border-slate-800/80 hover:border-emerald-500/50 shadow-2xl transition-all block group">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/5 border border-emerald-500/25 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">WhatsApp Trade Desk</p>
                    <p className="text-sm font-extrabold text-white mt-0.5 group-hover:text-emerald-400 transition-colors">+92-333-8931786</p>
                    <p className="text-[11px] text-slate-400 font-semibold">Contact Danial Ahmad (WhatsApp Enabled)</p>
                  </div>
                </a>

                <a href="mailto:danialtrdr@gmail.com" className="flex gap-4 p-4 bg-[#121826] rounded-2xl border border-slate-800/80 hover:border-amber-400 shadow-2xl transition-all block group">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-500/5 border border-amber-500/25 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email Inquiry</p>
                    <p className="text-sm font-extrabold text-white mt-0.5 group-hover:text-amber-400 transition-colors">danialtrdr@gmail.com</p>
                    <p className="text-[11px] text-slate-400 font-semibold">General, Export & B2B Inquiries</p>
                  </div>
                </a>

                <div className="flex gap-4 p-4 bg-[#121826] rounded-2xl border border-slate-800/80 shadow-2xl">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Registered Corporate Address</p>
                    <p className="text-sm font-extrabold text-white mt-0.5">Peshawar & Lahore, Pakistan</p>
                    <p className="text-[11px] text-slate-400 font-semibold">90-B, Industrial Estate, Jamrud Road, Hayatabad, Peshawar</p>
                  </div>
                </div>
              </div>

              {/* Quality & Safety Badges */}
              <div className="p-5 bg-slate-950/80 text-white rounded-2xl border border-slate-800 space-y-3.5 shadow-2xl">
                <p className="text-xs uppercase tracking-widest text-amber-400 font-extrabold">Safety & Exports Certifications</p>
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-semibold">ISO 9001 Quality</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-semibold">Halal Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-semibold">EN-1783 Matches</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-semibold">40+ Countries</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Form Panel */}
            <div className="lg:col-span-7 bg-[#121826] p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-800 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">Inquiry Intake Portal</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 mb-6 leading-relaxed font-semibold">
                Fill out the secure form below to directly alert our distribution department.
              </p>

              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/20 border border-emerald-900/60 rounded-2xl p-6 sm:p-8 text-center"
                >
                  <div className="w-14 h-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-extrabold text-white">Inquiry Successfully Lodged</h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-md mx-auto font-semibold">
                    Thank you, <strong className="text-amber-400 font-bold">{formData.name}</strong>. Your <strong className="text-white">{formData.inquiryType}</strong> inquiry for our <strong className="text-white">{formData.brandType}</strong> portfolio has been securely logged. A designated Aziz Group manager will reach back within 24 business hours.
                  </p>
                  
                  {/* Detailed receipt data */}
                  <div className="mt-6 p-4 bg-[#0B0F19] rounded-xl border border-emerald-900/30 text-left space-y-1.5 text-xs text-slate-300 font-semibold">
                    <p><strong>Lodged Name:</strong> {formData.name}</p>
                    <p><strong>Email Address:</strong> {formData.email}</p>
                    {formData.company && <p><strong>Registered Corporate Entity:</strong> {formData.company}</p>}
                    <p><strong>Contact Phone:</strong> {formData.phone}</p>
                    <p><strong>Inquiry Channel:</strong> {formData.inquiryType} (Brand: {formData.brandType})</p>
                  </div>

                  <button 
                    onClick={resetForm}
                    className="mt-6 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Mohsin Ali" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-500 font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="e.g. mohsin@company.com" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-500 font-semibold text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5">Company Name</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        placeholder="e.g. Aziz Trading LLC" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-500 font-semibold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5">Phone / WhatsApp <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="e.g. +92 300 1234567" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-500 font-semibold text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5">Inquiry Pathway Type</label>
                      <select 
                        value={formData.inquiryType}
                        onChange={e => setFormData({...formData, inquiryType: e.target.value as 'B2B' | 'Export' | 'Consumer'})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all font-semibold text-white"
                      >
                        <option value="B2B" className="bg-[#121826]">Domestic B2B / Distribution</option>
                        <option value="Export" className="bg-[#121826]">International Export Order</option>
                        <option value="Consumer" className="bg-[#121826]">Consumer Feedback / Query</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5">Target Portfolio</label>
                      <select 
                        value={formData.brandType}
                        onChange={e => setFormData({...formData, brandType: e.target.value as 'Both' | 'Biscuits' | 'Kite'})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all font-semibold text-white"
                      >
                        <option value="Both" className="bg-[#121826]">Joint Corporate Group Portfolio</option>
                        <option value="Biscuits" className="bg-[#121826]">Innovative Biscuits only</option>
                        <option value="Kite" className="bg-[#121826]">Kite Brand only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-1.5">Inquiry Message <span className="text-red-500">*</span></label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Please write down order specifications, quantity demands, or feedback..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-500 font-semibold text-white resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={formLoading}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider py-4 rounded-xl shadow-md shadow-amber-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {formLoading ? 'Verifying Integrity...' : 'Lodge Secure Inquiry'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>

          {/* Interactive B2B Live Inquiry Status Tracker Card & Map Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 pt-16 border-t border-slate-900/80">
            {/* Live Cargo & Custom Clearance Ticket Tracker */}
            <div className="bg-[#121826]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full filter blur-2xl -z-10" />
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">Live B2B Inquiry & Clearance Tracker</h3>
                  <p className="text-xs text-slate-400">Track custom-seals, packing lists, and clearance certificates at Peshawar Dry Port.</p>
                </div>
              </div>

              {customTicketId && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Your Newly Lodged Ticket ID</p>
                    <p className="text-lg font-black text-amber-400 mt-0.5">{customTicketId}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setTicketSearchQuery(customTicketId);
                      setTicketStatus({
                        id: customTicketId,
                        status: 'Packing Lists & Customs Declaration verified. Awaiting dry port loading.',
                        percent: 45,
                        update: '10 Minutes Ago',
                        location: 'Peshawar Dry Port, Hayatabad Industrial Area'
                      });
                    }}
                    className="bg-amber-500 hover:bg-amber-605 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Track Now
                  </button>
                </div>
              )}

              <div className="flex gap-2.5">
                <input 
                  type="text" 
                  value={ticketSearchQuery}
                  onChange={e => setTicketSearchQuery(e.target.value)}
                  placeholder="Enter Ticket ID (e.g., DT-8421)" 
                  className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:bg-slate-950 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-500 font-semibold text-white"
                />
                <button 
                  onClick={() => {
                    const id = ticketSearchQuery.trim() || `DT-${Math.floor(1000 + Math.random() * 9000)}`;
                    setTicketSearchQuery(id);
                    setTicketStatus({
                      id,
                      status: 'Customs declaration & FBR duty clearance complete. High-security container seal attached.',
                      percent: 85,
                      update: '2 Hours Ago',
                      location: 'Karachi Seaport Yard C, Pakistan'
                    });
                  }}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs sm:text-sm font-extrabold px-5 rounded-xl transition-all whitespace-nowrap cursor-pointer"
                >
                  Track Clearance
                </button>
              </div>

              {ticketStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-[#0B0F19] border border-slate-800 rounded-2xl space-y-4"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-300">Ticket Ref: <strong className="text-amber-400 font-bold">{ticketStatus.id}</strong></span>
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Updated {ticketStatus.update}</span>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-amber-500 font-extrabold">Dry Port Clearance Progress</span>
                      <span className="text-white font-extrabold">{ticketStatus.percent}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: `${ticketStatus.percent}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs">
                      <span className="text-slate-400 block font-bold">Current Processing Stage:</span>
                      <span className="text-slate-200 font-semibold leading-relaxed block mt-0.5">{ticketStatus.status}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400 block font-bold">Physical Transit Location:</span>
                      <span className="text-amber-400 font-semibold block mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" /> {ticketStatus.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Dry Port Location Map */}
            <div className="bg-[#121826]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide mb-1">Peshawar Dry Port Location</h3>
                <p className="text-xs text-slate-400 mb-6 font-semibold">Our physical offices and export loading bay sit directly on Jamrud Industrial Estate, Peshawar.</p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 h-[220px] bg-slate-950">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7268846313133!2d71.4326532!3d33.9994842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d910a30b4ec741%3A0xc4eb7893b0b74051!2sIndustrial%20Estate%20Hayatabad%20Peshawar!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  title="Peshawar Industrial Estate"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs bg-slate-900/40 border border-slate-850 p-3 rounded-xl">
                <span className="text-slate-400 font-semibold">Dry Port Clearance Office Hours</span>
                <span className="text-white font-bold">Mon - Sat (09:00 - 18:00 PST)</span>
              </div>
            </div>
          </div>

        </div>
      </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="bg-[#080B11] text-slate-450 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-900">
            
            {/* Column 1: About the group */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <img 
                  src="https://innovativebiscuits.com/wp-content/uploads/2026/02/innovative-premium-logo-new.webp" 
                  alt="Innovative Biscuits Logo" 
                  referrerPolicy="no-referrer"
                  className="h-8 object-contain brightness-0 invert" 
                />
                <div className="h-6 w-[1.5px] bg-slate-800"></div>
                <img 
                  src="https://kitepk.com/assets/640x640kite-CDjjXNac.jpg" 
                  alt="Kite Brand Logo" 
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 object-cover rounded-lg border border-slate-800" 
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
                Aziz Group represents over 50 years of robust manufacturing legacy, employing over 10,000 workers nationwide and exporting safety matches and premium confectionery to over 40 countries.
              </p>
              
              {/* Social media icons */}
              <div className="space-y-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Connect Socially</p>
                <div className="flex gap-3">
                  {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className="text-xs font-black text-slate-400 hover:text-amber-400 transition-colors border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg bg-slate-900"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Innovative Biscuits */}
            <div className="lg:col-span-2.5 space-y-4">
              <p className="text-xs uppercase tracking-widest text-white font-extrabold">Innovative Biscuits</p>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-400">
                <li>
                  <a href="https://innovativebiscuits.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    Official Website <ExternalLink className="w-3 h-3 text-amber-500" />
                  </a>
                </li>
                <li>
                  <a href="#biscuits" onClick={() => scrollToSection('biscuits')} className="hover:text-amber-400 transition-colors">
                    Product Portfolio
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-colors">
                    Innovation Lab
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-colors">
                    Careers & Internships
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Kite Brand */}
            <div className="lg:col-span-2.5 space-y-4">
              <p className="text-xs uppercase tracking-widest text-white font-extrabold">Kite Brand FMCG</p>
              <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-400">
                <li>
                  <a href="https://kitepk.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    Official Website <ExternalLink className="w-3 h-3 text-amber-500" />
                  </a>
                </li>
                <li>
                  <a href="#kite" onClick={() => scrollToSection('kite')} className="hover:text-amber-400 transition-colors">
                    Safety Matches
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-colors">
                    Kite Glow Laundry
                  </a>
                </li>
                <li>
                  <a href="#kite" onClick={() => scrollToSection('kite')} className="hover:text-amber-400 transition-colors">
                    Export Logistics
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="lg:col-span-3 space-y-4 text-xs sm:text-sm font-semibold text-slate-400">
              <p className="text-xs uppercase tracking-widest text-white font-extrabold">Contact Info</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>+92-333-8931786</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>danialtrdr@gmail.com</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>90-B, Industrial Estate, Jamrud Road, Hayatabad, Peshawar, Pakistan</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Area */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
            <p>© 2026 Danial Trader. Authorized Trade Distributor for Innovative Biscuits & Kite Brand. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-400 transition-colors">Legal Disclaimer</a>
            </div>
          </div>

        </div>
      </footer>

      {/* DYNAMIC PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#121826] rounded-3xl overflow-hidden max-w-3xl w-full border border-slate-800 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-850 text-slate-400 transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Modal Product Image */}
                <div className="md:col-span-5 bg-[#0B0F19] p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-800/60 min-h-[250px] md:min-h-full">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    referrerPolicy="no-referrer"
                    className="max-h-[200px] md:max-h-[300px] max-w-full object-contain" 
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-amber-400/5 text-amber-400 border-amber-500/25">
                      {selectedProduct.category === 'biscuits' ? 'Innovative Biscuit' : 'Kite Brand FMCG'}
                    </span>
                    {selectedProduct.badge && (
                      <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                        selectedProduct.badge === 'Best Seller' 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                          : selectedProduct.badge === 'New Arrival'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : selectedProduct.badge === 'Trending'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                          : 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                      }`}>
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Modal Product Details */}
                <div className="md:col-span-7 p-6 flex flex-col justify-between h-full overflow-y-auto max-h-[500px] md:max-h-[620px]">
                  <div>
                    <h3 className="text-xl font-extrabold text-white font-sans tracking-wide">{selectedProduct.name}</h3>
                    <p className="text-[11px] text-amber-400 font-extrabold uppercase tracking-wider mt-1.5">AZIZ GROUP OF INDUSTRIES</p>
                    
                    <div className="mt-4 space-y-4">
                      {selectedProduct.price && (
                        <div className="bg-amber-400/5 border border-amber-500/20 p-3 rounded-xl flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">Wholesale B2B Price</span>
                          <span className="text-xs sm:text-sm font-black text-white">{selectedProduct.price}</span>
                        </div>
                      )}

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                        {selectedProduct.details || selectedProduct.description}
                      </p>

                      {/* Product Highlights Section */}
                      <div className="py-3.5 border-t border-b border-slate-900/60 my-1">
                        <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block mb-3 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Product Highlights & Actionable Benefits
                        </span>
                        <div className="space-y-3">
                          {getProductHighlights(selectedProduct).map((item, index) => (
                            <div key={index} className="flex items-start gap-2.5 text-xs">
                              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-200 font-extrabold text-[11px]">{item.title}</span>
                                  <span className="text-[8px] font-black text-amber-400/90 bg-amber-400/5 px-1.5 py-0.2 rounded border border-amber-500/15 uppercase tracking-wide">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-slate-400 mt-0.5 text-[10.5px] leading-relaxed font-semibold">{item.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                        <div>
                          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5">Ingredients & Composition</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProduct.ingredients.map((ing, i) => (
                              <span key={i} className="text-[9px] font-bold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-md">
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProduct.specs && (
                        <div className="border border-slate-800/80 rounded-xl overflow-hidden text-[11px]">
                          <div className="bg-slate-900/50 px-3 py-1.5 border-b border-slate-800/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                            Technical Export Specifications
                          </div>
                          <div className="divide-y divide-slate-800/50 p-1">
                            <div className="flex justify-between py-1.5 px-2.5">
                              <span className="text-slate-500 font-bold">Wholesale Packing</span>
                              <span className="text-slate-200 font-semibold">{selectedProduct.specs.packing}</span>
                            </div>
                            <div className="flex justify-between py-1.5 px-2.5">
                              <span className="text-slate-500 font-bold">Carton Net Weight</span>
                              <span className="text-slate-200 font-semibold">{selectedProduct.specs.weight}</span>
                            </div>
                            <div className="flex justify-between py-1.5 px-2.5">
                              <span className="text-slate-500 font-bold">Carton Dimensions</span>
                              <span className="text-slate-200 font-semibold">{selectedProduct.specs.dimensions}</span>
                            </div>
                            {selectedProduct.specs.moisture && (
                              <div className="flex justify-between py-1.5 px-2.5">
                                <span className="text-slate-500 font-bold">Moisture / Compliance</span>
                                <span className="text-amber-500 font-semibold">{selectedProduct.specs.moisture}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-xl flex items-center gap-2 text-slate-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-[10px] font-bold text-slate-400">Export & Domestic Standard Quality Ensured</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col gap-2">
                    <button 
                      onClick={() => {
                        const targetBrand = selectedProduct.category === 'biscuits' ? 'Biscuits' : 'Kite';
                        setSelectedProduct(null);
                        openB2bInquiry(targetBrand);
                      }}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      B2B Bulk Inquiry for {selectedProduct.name}
                    </button>
                    {selectedProduct.link && (
                      <a 
                        href={selectedProduct.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                      >
                        Visit Official Website <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC LEADERSHIP PROFILE MODAL */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedLeader(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#121826] rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-800 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-850 text-slate-400 transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Modal Leader Image */}
                <div className="bg-[#0B0F19] aspect-[4/5] relative">
                  <img 
                    src={selectedLeader.image} 
                    alt={selectedLeader.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top" 
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5">
                    <h3 className="text-lg font-bold text-white tracking-wide">{selectedLeader.name}</h3>
                    <p className="text-xs text-amber-400 font-bold tracking-wider uppercase mt-1">{selectedLeader.role}</p>
                  </div>
                </div>

                {/* Modal Leader Bio Details */}
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-extrabold text-white font-sans tracking-wide">{selectedLeader.name}</h3>
                    <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider mt-1">{selectedLeader.role} — Aziz Group Board</p>
                    
                    <div className="mt-4 space-y-3.5">
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                        {selectedLeader.details || selectedLeader.bio}
                      </p>
                      
                      <div className="bg-[#0B0F19] border border-slate-800 p-3.5 rounded-xl text-[11px] text-slate-400 font-semibold space-y-1">
                        <p className="font-extrabold text-white uppercase text-[10px] tracking-wide">Active Corporate Roles</p>
                        <p>• Strategic Export Logistics Alignment</p>
                        <p>• Fiscal Policy & Board Direction</p>
                        <p>• Domestic Retail Supply Integration</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-800/80">
                    <button 
                      onClick={() => {
                        setSelectedLeader(null);
                        openB2bInquiry('Both');
                      }}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" /> Message the Executive Board
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GENERAL B2B / PARTNERSHIP MODAL */}
      <AnimatePresence>
        {b2bModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setB2bModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#121826] rounded-3xl overflow-hidden max-w-xl w-full border border-slate-800 shadow-2xl relative p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setB2bModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#0B0F19] hover:bg-slate-850 text-slate-400 transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="inline-flex items-center gap-1 bg-amber-400/5 text-amber-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-amber-500/25">
                  <Building className="w-3 h-3" /> Secure B2B Channel
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2 font-sans tracking-wide">Joint Distribution Portal</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed font-semibold">
                  Please provide your corporate specifications or import region to alert the designated sales desk.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-950/20 border border-emerald-900/60 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/10">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-white">B2B Request Lodged</h4>
                  <p className="text-slate-300 text-xs mt-1.5 leading-relaxed font-semibold">
                    Thank you. Your corporate profile and distribution requirements are securely shared. A regional sales manager will reach back.
                  </p>
                  <button 
                    onClick={() => {
                      setB2bModalOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl"
                  >
                    Close Portal Window
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormLoading(true);
                    setTimeout(() => {
                      setFormLoading(false);
                      setFormSubmitted(true);
                    }, 1000);
                  }} 
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-1">Company Representative *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:bg-slate-950 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-1">Business Email *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="corporate@domain.com" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:bg-slate-950 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none text-white font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-1">Registered Entity *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        placeholder="Company Name" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:bg-slate-950 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none text-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-1">Phone / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="Incl. Country Code" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:bg-slate-950 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none text-white font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-1">Inquiry Route</label>
                      <select 
                        value={formData.inquiryType}
                        onChange={e => setFormData({...formData, inquiryType: e.target.value as any})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:bg-slate-950 outline-none font-bold text-white"
                      >
                        <option value="B2B" className="bg-[#121826]">Domestic Distributor Channel</option>
                        <option value="Export" className="bg-[#121826]">Global Bulk Export</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-1">Interested Brand</label>
                      <select 
                        value={formData.brandType}
                        onChange={e => setFormData({...formData, brandType: e.target.value as any})}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:bg-slate-950 outline-none font-bold text-white"
                      >
                        <option value="Both" className="bg-[#121826]">Both Portfolios</option>
                        <option value="Biscuits" className="bg-[#121826]">Innovative Biscuits</option>
                        <option value="Kite" className="bg-[#121826]">Kite Brand Matches</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-1">Description of Requirements *</label>
                    <textarea 
                      rows={3}
                      required
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="e.g. Export demands for container order sizes, target port..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:bg-slate-950 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none text-white font-semibold resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={formLoading}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {formLoading ? 'Broadcasting to Desk...' : 'Submit Partnership Query'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
