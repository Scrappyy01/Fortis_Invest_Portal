'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Address
    streetAddress: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Australia',
    
    // Investor Status
    investorType: '',
    investmentAmount: '',
    accreditationProof: null as File | null,
    
    // Entity Details (if applicable)
    entityName: '',
    abn: '',
    trusteeNames: '',
    
    // Financial Information
    annualIncome: '',
    netAssets: '',
    investmentExperience: '',
    
    // Additional
    referralSource: '',
    comments: '',
    
    // Declarations
    agreeTerms: false,
    agreeRisks: false,
    agreeCompliance: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement form submission logic
    alert('Application submitted! We will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-luxury font-bold mb-4 text-[#c9a961]">
              Apply for Investor Access
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete this application to gain access to The Fortis Fund. All information is confidential and secure.
            </p>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Information */}
            <section className="bg-[#1f1f1f] border border-[#c9a961]/20 rounded-lg p-8">
              <h2 className="text-2xl font-luxury font-bold mb-6 text-[#c9a961]">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="bg-[#1f1f1f] border border-[#c9a961]/20 rounded-lg p-8">
              <h2 className="text-2xl font-luxury font-bold mb-6 text-[#c9a961]">Residential Address</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Street Address *</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                    >
                      <option value="">Select State</option>
                      <option value="NSW">NSW</option>
                      <option value="VIC">VIC</option>
                      <option value="QLD">QLD</option>
                      <option value="SA">SA</option>
                      <option value="WA">WA</option>
                      <option value="TAS">TAS</option>
                      <option value="NT">NT</option>
                      <option value="ACT">ACT</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Postcode *</label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Investor Status */}
            <section className="bg-[#1f1f1f] border border-[#c9a961]/20 rounded-lg p-8">
              <h2 className="text-2xl font-luxury font-bold mb-6 text-[#c9a961]">Investor Eligibility</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Investor Type *</label>
                  <select
                    name="investorType"
                    value={formData.investorType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  >
                    <option value="">Select Investor Type</option>
                    <option value="individual">Individual (Wholesale Investor)</option>
                    <option value="company">Company</option>
                    <option value="trust">Trust</option>
                    <option value="superfund">Self-Managed Super Fund</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Intended Investment Amount *</label>
                  <select
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  >
                    <option value="">Select Amount</option>
                    <option value="500000-1000000">$500,000 - $1,000,000</option>
                    <option value="1000000-2500000">$1,000,000 - $2,500,000</option>
                    <option value="2500000-5000000">$2,500,000 - $5,000,000</option>
                    <option value="5000000+">$5,000,000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Accreditation Proof (Accountant Certificate or Financial Statements)
                  </label>
                  <input
                    type="file"
                    name="accreditationProof"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-gray-300 focus:border-[#c9a961] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#c9a961] file:text-[#1a1a1a] file:font-semibold hover:file:bg-[#d4b876]"
                  />
                  <p className="text-xs text-gray-400 mt-2">Upload proof of wholesale investor status (PDF, DOC, DOCX)</p>
                </div>
              </div>
            </section>

            {/* Entity Details (if applicable) */}
            <section className="bg-[#1f1f1f] border border-[#c9a961]/20 rounded-lg p-8">
              <h2 className="text-2xl font-luxury font-bold mb-6 text-[#c9a961]">Entity Details (If Applicable)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Entity Name</label>
                  <input
                    type="text"
                    name="entityName"
                    value={formData.entityName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">ABN / ACN</label>
                  <input
                    type="text"
                    name="abn"
                    value={formData.abn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Trustee Names (if Trust/SMSF)</label>
                  <input
                    type="text"
                    name="trusteeNames"
                    value={formData.trusteeNames}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                    placeholder="Separate multiple names with commas"
                  />
                </div>
              </div>
            </section>

            {/* Financial Information */}
            <section className="bg-[#1f1f1f] border border-[#c9a961]/20 rounded-lg p-8">
              <h2 className="text-2xl font-luxury font-bold mb-6 text-[#c9a961]">Financial Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Annual Income (Individual) *</label>
                  <select
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  >
                    <option value="">Select Range</option>
                    <option value="under250k">Under $250,000</option>
                    <option value="250k-500k">$250,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1,000,000</option>
                    <option value="over1m">Over $1,000,000</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Net Assets *</label>
                  <select
                    name="netAssets"
                    value={formData.netAssets}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  >
                    <option value="">Select Range</option>
                    <option value="under2.5m">Under $2.5 million</option>
                    <option value="2.5m-10m">$2.5 million - $10 million</option>
                    <option value="10m-25m">$10 million - $25 million</option>
                    <option value="over25m">Over $25 million</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Investment Experience *</label>
                  <select
                    name="investmentExperience"
                    value={formData.investmentExperience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="beginner">Limited Experience</option>
                    <option value="intermediate">Moderate Experience (5-10 years)</option>
                    <option value="advanced">Extensive Experience (10+ years)</option>
                    <option value="professional">Professional Investor</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Additional Information */}
            <section className="bg-[#1f1f1f] border border-[#c9a961]/20 rounded-lg p-8">
              <h2 className="text-2xl font-luxury font-bold mb-6 text-[#c9a961]">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">How did you hear about us?</label>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none"
                  >
                    <option value="">Select Source</option>
                    <option value="referral">Personal Referral</option>
                    <option value="advisor">Financial Advisor</option>
                    <option value="website">Website</option>
                    <option value="event">Investment Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Additional Comments</label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#c9a961]/30 rounded text-white focus:border-[#c9a961] focus:outline-none resize-none"
                    placeholder="Any additional information or questions..."
                  />
                </div>
              </div>
            </section>

            {/* Declarations */}
            <section className="bg-[#1f1f1f] border border-[#c9a961]/20 rounded-lg p-8">
              <h2 className="text-2xl font-luxury font-bold mb-6 text-[#c9a961]">Declarations</h2>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 bg-[#2a2a2a] border-[#c9a961]/30 rounded focus:ring-[#c9a961]"
                  />
                  <span className="text-gray-300 text-sm">
                    I confirm that I am a wholesale investor as defined under Section 761G of the Corporations Act 2001 (Cth) and meet the eligibility criteria. *
                  </span>
                </label>
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeRisks"
                    checked={formData.agreeRisks}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 bg-[#2a2a2a] border-[#c9a961]/30 rounded focus:ring-[#c9a961]"
                  />
                  <span className="text-gray-300 text-sm">
                    I acknowledge that investing involves risk and I have read and understood the risks associated with this investment. *
                  </span>
                </label>
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeCompliance"
                    checked={formData.agreeCompliance}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 bg-[#2a2a2a] border-[#c9a961]/30 rounded focus:ring-[#c9a961]"
                  />
                  <span className="text-gray-300 text-sm">
                    I agree to comply with all AML/CTF requirements and authorize Fortis Fundamenta to verify my identity and conduct necessary due diligence. *
                  </span>
                </label>
              </div>
            </section>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-[#c9a961] hover:bg-[#d4b876] text-[#1a1a1a] font-semibold text-lg px-16 py-4 rounded transition-all duration-300 tracking-wide shadow-2xl hover:shadow-[#c9a961]/60 hover:scale-105"
              >
                Submit Application
              </button>
              <p className="text-sm text-gray-400 mt-4">
                * Required fields. Your information is secure and confidential.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
