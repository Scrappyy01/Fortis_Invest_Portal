'use client';

import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Investor Status
    investorType: '',
    netAssets: '',
    annualIncome: '',
    
    // Investment Details
    investmentAmount: '',
    investmentTimeframe: '',
    
    // Additional Information
    accountantName: '',
    accountantFirm: '',
    investmentExperience: '',
    comments: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Application submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
      
      <main className="container mx-auto px-8 pt-32 pb-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-luxury font-bold text-white mb-6 tracking-tight">
            Apply for Investor Access
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Complete this application to begin your journey with the Fortis Fund. Our team will review your submission and contact you within 48 hours.
          </p>
        </div>

        {/* Application Form */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#252525] border border-[#c9a961]/20 p-10 rounded-sm">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Personal Information */}
              <div>
                <h2 className="text-3xl font-luxury font-bold text-[#c9a961] mb-6 pb-3 border-b border-[#c9a961]/30">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Wholesale Investor Status */}
              <div>
                <h2 className="text-3xl font-luxury font-bold text-[#c9a961] mb-6 pb-3 border-b border-[#c9a961]/30">
                  Wholesale Investor Status
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="investorType" className="block text-sm font-medium text-gray-300 mb-2">
                      Investor Classification *
                    </label>
                    <select
                      id="investorType"
                      name="investorType"
                      value={formData.investorType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    >
                      <option value="">Select investor type</option>
                      <option value="high-net-worth">High Net Worth Individual (Net Assets $2.5M+)</option>
                      <option value="high-income">High Income Individual (Gross Income $250K+ p.a.)</option>
                      <option value="professional">Professional Investor</option>
                      <option value="institutional">Institutional Investor</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="netAssets" className="block text-sm font-medium text-gray-300 mb-2">
                        Estimated Net Assets
                      </label>
                      <select
                        id="netAssets"
                        name="netAssets"
                        value={formData.netAssets}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                      >
                        <option value="">Select range</option>
                        <option value="2.5-5m">$2.5M - $5M</option>
                        <option value="5-10m">$5M - $10M</option>
                        <option value="10-25m">$10M - $25M</option>
                        <option value="25m+">$25M+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-300 mb-2">
                        Annual Gross Income
                      </label>
                      <select
                        id="annualIncome"
                        name="annualIncome"
                        value={formData.annualIncome}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                      >
                        <option value="">Select range</option>
                        <option value="250-500k">$250K - $500K</option>
                        <option value="500k-1m">$500K - $1M</option>
                        <option value="1m+">$1M+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div>
                <h2 className="text-3xl font-luxury font-bold text-[#c9a961] mb-6 pb-3 border-b border-[#c9a961]/30">
                  Investment Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-300 mb-2">
                      Intended Investment Amount *
                    </label>
                    <select
                      id="investmentAmount"
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    >
                      <option value="">Select amount</option>
                      <option value="250-500k">$250K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1-2.5m">$1M - $2.5M</option>
                      <option value="2.5m+">$2.5M+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="investmentTimeframe" className="block text-sm font-medium text-gray-300 mb-2">
                      Investment Timeframe *
                    </label>
                    <select
                      id="investmentTimeframe"
                      name="investmentTimeframe"
                      value={formData.investmentTimeframe}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    >
                      <option value="">Select timeframe</option>
                      <option value="immediate">Immediate (0-3 months)</option>
                      <option value="short-term">Short-term (3-6 months)</option>
                      <option value="medium-term">Medium-term (6-12 months)</option>
                      <option value="long-term">Long-term (12+ months)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Accountant Verification */}
              <div>
                <h2 className="text-3xl font-luxury font-bold text-[#c9a961] mb-6 pb-3 border-b border-[#c9a961]/30">
                  Accountant Verification
                </h2>
                <p className="text-sm text-gray-400 mb-6 italic">
                  ASIC regulations may require certification by a qualified accountant to verify wholesale investor status.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="accountantName" className="block text-sm font-medium text-gray-300 mb-2">
                      Accountant Name
                    </label>
                    <input
                      type="text"
                      id="accountantName"
                      name="accountantName"
                      value={formData.accountantName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="accountantFirm" className="block text-sm font-medium text-gray-300 mb-2">
                      Accounting Firm
                    </label>
                    <input
                      type="text"
                      id="accountantFirm"
                      name="accountantFirm"
                      value={formData.accountantFirm}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-3xl font-luxury font-bold text-[#c9a961] mb-6 pb-3 border-b border-[#c9a961]/30">
                  Additional Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="investmentExperience" className="block text-sm font-medium text-gray-300 mb-2">
                      Investment Experience
                    </label>
                    <select
                      id="investmentExperience"
                      name="investmentExperience"
                      value={formData.investmentExperience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">New to alternative investments</option>
                      <option value="intermediate">Some experience with private funds</option>
                      <option value="experienced">Extensive experience with alternative assets</option>
                      <option value="professional">Professional/Institutional investor</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-2">
                      Additional Comments or Questions
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#c9a961]/30 rounded-sm text-white focus:outline-none focus:border-[#c9a961] transition-colors resize-none"
                      placeholder="Please share any specific questions or additional information..."
                    />
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-[#1a1a1a] border border-[#c9a961]/20 p-6 rounded-sm">
                <p className="text-sm text-gray-400 leading-relaxed">
                  By submitting this application, you acknowledge that you meet the wholesale investor criteria under the Corporations Act 2001 and agree to provide supporting documentation as required. Fortis Fundamenta reserves the right to verify all information provided and may request additional documentation before granting investor access.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#c9a961] hover:bg-[#d4b876] text-[#1a1a1a] font-semibold text-xl px-8 py-5 rounded-sm transition-all duration-300 tracking-wide shadow-2xl hover:shadow-[#c9a961]/60 hover:scale-[1.02]"
                >
                  SUBMIT APPLICATION
                </button>
                <p className="text-center text-sm text-gray-400 mt-4">
                  Our team will review your application and contact you within 48 business hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
