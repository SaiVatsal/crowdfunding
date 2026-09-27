import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Rocket,
  Compass,
  PlusCircle,
  TrendingUp,
  Clock,
  Users,
  Target,
  CheckCircle2,
  DollarSign,
  Heart,
  Share2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter,
  Search,
  Gift,
  CreditCard,
  Building,
  Layers,
  ChevronRight,
  MessageSquareQuote,
  Flame,
  Award,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedCampaignId,
    setSelectedCampaignId,
    campaigns,
    currentUser,
    userPledges,
    contributeToCampaign,
    createCampaign,
    postUpdate
  } = useStore();

  // Contribution Modal
  const [pledgeModalOpen, setPledgeModalOpen] = useState(false);
  const [selectedPerk, setSelectedPerk] = useState(null);
  const [customTip, setCustomTip] = useState(10);
  const [customPledgeAmount, setCustomPledgeAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // New Campaign Form
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formCategory, setFormCategory] = useState('Tech & Hardware');
  const [formGoal, setFormGoal] = useState('50000');
  const [formDuration, setFormDuration] = useState('30');
  const [formStory, setFormStory] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formPerkTitle, setFormPerkTitle] = useState('Founder Edition Bundle');
  const [formPerkAmount, setFormPerkAmount] = useState('99');
  const [formPerkDesc, setFormPerkDesc] = useState('First production run unit with VIP backer credits.');

  // Creator Update form in Detail view
  const [newUpdateTitle, setNewUpdateTitle] = useState('');
  const [newUpdateContent, setNewUpdateContent] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const categories = ['All', 'Tech & Hardware', 'Games', 'Eco Innovations', 'Publishing'];

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  // Filtering & Sorting
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'trending') return b.backerCount - a.backerCount;
    if (sortBy === 'funded') return (b.raisedAmount / b.goalAmount) - (a.raisedAmount / a.goalAmount);
    if (sortBy === 'ending') return a.daysLeft - b.daysLeft;
    return b.id.localeCompare(a.id);
  });

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    const baseAmount = selectedPerk ? selectedPerk.amount : Number(customPledgeAmount) || 25;
    contributeToCampaign(selectedCampaign.id, baseAmount, selectedPerk?.id, customTip);
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setPledgeModalOpen(false);
      setSelectedPerk(null);
    }, 1800);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createCampaign({
      title: formTitle,
      tagline: formTagline,
      category: formCategory,
      goalAmount: formGoal,
      duration: formDuration,
      story: formStory,
      image: formImage || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80',
      perkTitle: formPerkTitle,
      perkAmount: formPerkAmount,
      perkDescription: formPerkDesc
    });
  };

  const handlePostUpdateSubmit = (e) => {
    e.preventDefault();
    if (!newUpdateTitle || !newUpdateContent) return;
    postUpdate(selectedCampaign.id, newUpdateTitle, newUpdateContent);
    setNewUpdateTitle('');
    setNewUpdateContent('');
    setShowUpdateModal(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-slate-900 font-sans flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-700 via-teal-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                <Rocket className="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <span className="text-2xl font-display font-extrabold tracking-tight bg-gradient-to-r from-teal-900 via-teal-700 to-orange-600 bg-clip-text text-transparent">
                  IgniteLaunch
                </span>
                <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Decentralized Crowdfunding
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'explore'
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Compass className="w-4 h-4" /> Explore Projects
              </button>
              <button
                onClick={() => setActiveTab('creator-dashboard')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'creator-dashboard'
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <TrendingUp className="w-4 h-4" /> Creator Desk
              </button>
              <button
                onClick={() => setActiveTab('my-pledges')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'my-pledges'
                    ? 'bg-teal-50 text-teal-800'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Gift className="w-4 h-4" /> My Pledges
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  {userPledges.length}
                </span>
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('start-campaign')}
              className="bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-teal-800/20 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" /> Start a Campaign
            </button>
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-stone-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full border-2 border-teal-600 object-cover"
              />
              <div className="text-left leading-tight">
                <div className="text-xs font-bold text-stone-800">{currentUser.name}</div>
                <div className="text-[11px] text-teal-700 font-semibold">${currentUser.totalPledged} Pledged</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= TAB 1: EXPLORE ================= */}
        {activeTab === 'explore' && (
          <div className="space-y-10">
            {/* Hero Spotlight */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-950 via-teal-900 to-stone-900 text-white p-8 md:p-12 shadow-2xl border border-teal-800/40">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Flame className="w-4 h-4 text-orange-400 animate-pulse" /> Project Spotlight
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight">
                    Lumina AR: Next-Gen Neural Spatial Glasses
                  </h1>
                  <p className="text-stone-300 text-base leading-relaxed max-w-2xl">
                    Ultralight 48g augmented reality eyewear featuring neural gaze tracking, 4K micro-OLED wave-guides, and 14-hour hot-swappable battery pods.
                  </p>
                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <div>
                      <div className="text-3xl font-display font-black text-teal-300">$148,500</div>
                      <div className="text-xs text-stone-400 font-medium">pledged of $120,000 goal (123%)</div>
                    </div>
                    <div className="h-10 w-px bg-stone-700 hidden sm:block" />
                    <div>
                      <div className="text-3xl font-display font-black text-white">412</div>
                      <div className="text-xs text-stone-400 font-medium">backers worldwide</div>
                    </div>
                    <div className="h-10 w-px bg-stone-700 hidden sm:block" />
                    <div>
                      <div className="text-3xl font-display font-black text-orange-400">14</div>
                      <div className="text-xs text-stone-400 font-medium">days remaining</div>
                    </div>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-4">
                    <button
                      onClick={() => setSelectedCampaignId('CAMP-801')}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2"
                    >
                      Back This Project <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedCampaignId('CAMP-801')}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all"
                    >
                      Explore Campaign
                    </button>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="relative group overflow-hidden rounded-2xl border-2 border-teal-500/30 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1000&q=80"
                      alt="Lumina AR"
                      className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                      <div className="text-xs font-semibold text-teal-200">
                        Designed by Vortex Optics Lab · San Francisco, CA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-teal-800 text-white shadow-md shadow-teal-800/20'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search campaigns or creators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 shadow-sm"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-700 shadow-sm"
                >
                  <option value="trending">🔥 Most Trending</option>
                  <option value="funded">💰 Highest % Funded</option>
                  <option value="ending">⏳ Ending Soon</option>
                  <option value="newest">✨ Newest</option>
                </select>
              </div>
            </div>

            {/* Campaign Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((camp) => {
                const percent = Math.min(Math.round((camp.raisedAmount / camp.goalAmount) * 100), 400);
                return (
                  <div
                    key={camp.id}
                    className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    {/* Cover image */}
                    <div className="relative h-52 overflow-hidden bg-stone-100">
                      <img
                        src={camp.image}
                        alt={camp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md text-stone-800 text-[11px] font-bold px-3 py-1 rounded-full shadow">
                        {camp.category}
                      </div>
                      <div className="absolute top-3.5 right-3.5 bg-teal-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                        {percent}% Funded
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={camp.creator.avatar}
                            alt={camp.creator.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-xs font-semibold text-stone-500 truncate">
                            {camp.creator.name}
                          </span>
                          {camp.creator.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 inline" />
                          )}
                        </div>
                        <h3
                          onClick={() => setSelectedCampaignId(camp.id)}
                          className="font-display font-bold text-lg text-stone-900 line-clamp-1 group-hover:text-teal-700 cursor-pointer transition-colors"
                        >
                          {camp.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {camp.tagline}
                        </p>
                      </div>

                      {/* Progress Bar & Stats */}
                      <div className="space-y-3 pt-2 border-t border-stone-100">
                        <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-teal-600 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-stone-900 font-display text-sm">
                              ${camp.raisedAmount.toLocaleString()}
                            </span>
                            <span className="text-stone-500 block text-[10px]">
                              of ${camp.goalAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="font-bold text-stone-900 font-display text-sm">
                              {camp.backerCount}
                            </span>
                            <span className="text-stone-500 block text-[10px]">backers</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-orange-600 font-display text-sm">
                              {camp.daysLeft}d
                            </span>
                            <span className="text-stone-500 block text-[10px]">remaining</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <button
                        onClick={() => setSelectedCampaignId(camp.id)}
                        className="w-full mt-2 bg-stone-50 hover:bg-teal-700 hover:text-white text-stone-800 font-bold text-xs py-2.5 rounded-xl border border-stone-200 transition-all flex items-center justify-center gap-2"
                      >
                        View Perks & Back <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: CAMPAIGN DETAIL ================= */}
        {activeTab === 'campaign-detail' && selectedCampaign && (
          <div className="space-y-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <button onClick={() => setActiveTab('explore')} className="hover:text-stone-900">
                Home
              </button>
              <span>/</span>
              <span>{selectedCampaign.category}</span>
              <span>/</span>
              <span className="text-stone-900 truncate max-w-xs">{selectedCampaign.title}</span>
            </div>

            {/* Campaign Header Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Media & Story */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 leading-tight">
                    {selectedCampaign.title}
                  </h1>
                  <p className="text-stone-600 text-base mt-2 leading-relaxed">
                    {selectedCampaign.tagline}
                  </p>
                </div>

                <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
                  <img
                    src={selectedCampaign.image}
                    alt={selectedCampaign.title}
                    className="w-full h-96 object-cover"
                  />
                </div>

                {/* Creator card */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedCampaign.creator.avatar}
                      alt={selectedCampaign.creator.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-teal-600"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-base">
                          {selectedCampaign.creator.name}
                        </span>
                        {selectedCampaign.creator.verified && (
                          <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified Creator
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {selectedCampaign.creator.location} · $
                        {(selectedCampaign.creator.totalRaisedAcrossProjects || 0).toLocaleString()} raised across campaigns
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUpdateModal(true)}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs px-4 py-2 rounded-xl transition"
                  >
                    + Post Creator Update
                  </button>
                </div>

                {/* Detailed Story and Updates tabs */}
                <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
                  <div className="border-b border-stone-200 pb-4">
                    <h2 className="text-2xl font-display font-bold text-stone-900">
                      About the Project
                    </h2>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                    {selectedCampaign.story}
                  </p>

                  {/* Creator Updates */}
                  <div className="pt-6 border-t border-stone-200 space-y-4">
                    <h3 className="text-lg font-display font-bold text-stone-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-orange-500" /> Backer Updates & Milestones (
                      {selectedCampaign.updates.length})
                    </h3>

                    {selectedCampaign.updates.length === 0 ? (
                      <p className="text-xs text-stone-400 italic">No updates posted yet.</p>
                    ) : (
                      selectedCampaign.updates.map((upd) => (
                        <div
                          key={upd.id}
                          className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-stone-900 text-sm">{upd.title}</h4>
                            <span className="text-[11px] font-semibold text-stone-400">
                              {upd.date}
                            </span>
                          </div>
                          <p className="text-xs text-stone-700 leading-relaxed">{upd.content}</p>
                          <div className="text-[11px] font-semibold text-teal-800 flex items-center gap-1 pt-1">
                            <Heart className="w-3.5 h-3.5 fill-teal-600 text-teal-600" /> {upd.likes} Backers liked this
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Funding Progress & Reward Perks */}
              <div className="lg:col-span-4 space-y-6 sticky top-28">
                {/* Funding Card */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-lg space-y-6">
                  <div className="space-y-2">
                    <div className="text-3xl font-display font-black text-teal-900">
                      ${selectedCampaign.raisedAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-stone-500">
                      pledged of ${selectedCampaign.goalAmount.toLocaleString()} target
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-600 to-orange-500 h-3 rounded-full"
                      style={{
                        width: `${Math.min(
                          Math.round((selectedCampaign.raisedAmount / selectedCampaign.goalAmount) * 100),
                          100
                        )}%`
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="text-2xl font-display font-bold text-stone-900">
                        {selectedCampaign.backerCount}
                      </div>
                      <div className="text-xs text-stone-500">Backers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-display font-bold text-orange-600">
                        {selectedCampaign.daysLeft}
                      </div>
                      <div className="text-xs text-stone-500">Days to go</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPerk(null);
                      setPledgeModalOpen(true);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-md shadow-orange-500/20 transition active:scale-95"
                  >
                    Back This Project (Custom Pledge)
                  </button>
                </div>

                {/* Available Perks */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-stone-900 text-base flex items-center gap-2">
                    <Gift className="w-4 h-4 text-teal-700" /> Reward Tiers & Perks
                  </h3>

                  {selectedCampaign.perks.map((perk) => (
                    <div
                      key={perk.id}
                      className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-teal-600 shadow-sm transition space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-xl text-teal-900">
                          ${perk.amount}
                        </span>
                        {perk.retailPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ${perk.retailPrice} Retail
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-stone-900">{perk.title}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{perk.description}</p>
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span>📦 Delivery: {perk.estimatedDelivery}</span>
                        <span>{perk.backersClaimed} claimed</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPerk(perk);
                          setPledgeModalOpen(true);
                        }}
                        className="w-full bg-teal-50 hover:bg-teal-800 hover:text-white text-teal-900 font-bold text-xs py-2.5 rounded-xl border border-teal-200 transition"
                      >
                        Select This Reward (${perk.amount})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: START A CAMPAIGN ================= */}
        {activeTab === 'start-campaign' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-10 border border-stone-200 shadow-xl space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Creator Launch Studio
              </span>
              <h1 className="text-3xl font-display font-black text-stone-900 mt-1">
                Bring Your Creative Vision to Life
              </h1>
              <p className="text-stone-500 text-sm mt-1">
                Set up funding milestones, perks, and launch to our global community of backer innovators.
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AeroPod: Solar-Powered Drone Dock"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Short Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="One-sentence hook describing what makes this unique"
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    >
                      <option value="Tech & Hardware">Tech & Hardware</option>
                      <option value="Games">Games</option>
                      <option value="Eco Innovations">Eco Innovations</option>
                      <option value="Publishing">Publishing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Funding Goal ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="500"
                      value={formGoal}
                      onChange={(e) => setFormGoal(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Duration (Days)
                    </label>
                    <input
                      type="number"
                      min="7"
                      max="60"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Cover Image URL (Optional Unsplash link)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Campaign Story & Technical Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your manufacturing timeline, engineering breakthroughs, and why you need funding..."
                    value={formStory}
                    onChange={(e) => setFormStory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                {/* Primary Reward Tier */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-teal-900">
                    Primary Reward Tier / Perk
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Perk Title (e.g. Early Bird Kit)"
                      value={formPerkTitle}
                      onChange={(e) => setFormPerkTitle(e.target.value)}
                      className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-teal-700"
                    />
                    <input
                      type="number"
                      placeholder="Pledge Amount ($)"
                      value={formPerkAmount}
                      onChange={(e) => setFormPerkAmount(e.target.value)}
                      className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Perk Description & Included items"
                    value={formPerkDesc}
                    onChange={(e) => setFormPerkDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('explore')}
                  className="px-5 py-2.5 rounded-xl text-stone-600 font-semibold text-sm hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-sm px-8 py-2.5 rounded-xl shadow-lg shadow-teal-800/20 transition active:scale-95"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 4: CREATOR DESK ================= */}
        {activeTab === 'creator-dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-display font-black text-stone-900">
                Creator Payout & Analytics Desk
              </h1>
              <p className="text-stone-500 text-sm mt-1">
                Real-time backer telemetry, gross funds raised, 5% platform fee settlement, and escrow payouts.
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Gross Funds Raised</span>
                <div className="text-2xl font-display font-black text-stone-900">$250,500</div>
                <span className="text-[11px] text-teal-700 font-semibold">Across all active campaigns</span>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Platform Fee (5%)</span>
                <div className="text-2xl font-display font-black text-orange-600">-$12,525</div>
                <span className="text-[11px] text-stone-400">Automated ledger fee deduction</span>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Net Disbursable</span>
                <div className="text-2xl font-display font-black text-teal-700">$237,975</div>
                <span className="text-[11px] text-teal-700 font-semibold">Ready for Stripe Payout</span>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase">Total Community Backers</span>
                <div className="text-2xl font-display font-black text-stone-900">1,702</div>
                <span className="text-[11px] text-stone-500">100% verified identities</span>
              </div>
            </div>

            {/* Campaign Management Table */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-stone-900">
                  Active Campaign Telemetry
                </h3>
                <span className="bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                  Stripe Test Mode Connected
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-stone-500 text-xs uppercase font-bold border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-4">Campaign Title</th>
                      <th className="px-6 py-4">Goal</th>
                      <th className="px-6 py-4">Raised</th>
                      <th className="px-6 py-4">Backers</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Payout Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium">
                    {campaigns.map((c) => (
                      <tr key={c.id} className="hover:bg-stone-50/80 transition">
                        <td className="px-6 py-4 font-bold text-stone-900">{c.title}</td>
                        <td className="px-6 py-4 text-stone-500">${c.goalAmount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-teal-700 font-bold">
                          ${c.raisedAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">{c.backerCount}</td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1 rounded-lg">
                            Escrow Locked (30d)
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: MY PLEDGES ================= */}
        {activeTab === 'my-pledges' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-display font-black text-stone-900">
                My Backed Projects & Digital Receipts
              </h1>
              <p className="text-stone-500 text-sm mt-1">
                Track manufacturing schedules, perk fulfillment, and digital pledge authenticity certificates.
              </p>
            </div>

            <div className="space-y-4">
              {userPledges.map((plg) => (
                <div
                  key={plg.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-teal-700 font-bold">{plg.id}</span>
                    <h3 className="font-display font-bold text-base text-stone-900">
                      {plg.campaignTitle}
                    </h3>
                    <div className="text-xs text-stone-500">
                      Reward: <span className="font-semibold text-stone-800">{plg.perkTitle}</span>
                    </div>
                    <div className="text-xs text-stone-400">
                      Backed on {plg.date} · Delivery: {plg.estimatedDelivery}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                    <span className="font-display font-black text-xl text-teal-800">
                      ${plg.amount}
                    </span>
                    <span className="bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold px-3 py-1 rounded-full">
                      {plg.shippingStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ================= PLEDGE / CHECKOUT MODAL ================= */}
      {pledgeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-stone-200 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            {checkoutSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-black text-stone-900">
                  Pledge Confirmed!
                </h3>
                <p className="text-stone-600 text-sm">
                  Thank you for backing {selectedCampaign.title}. Your receipt and confirmation certificate have been recorded.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-orange-600">
                      Secure Checkout
                    </span>
                    <h3 className="text-xl font-display font-black text-stone-900">
                      Back this Project
                    </h3>
                  </div>
                  <button
                    onClick={() => setPledgeModalOpen(false)}
                    className="text-stone-400 hover:text-stone-700 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handlePledgeSubmit} className="space-y-5">
                  {selectedPerk ? (
                    <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-teal-900">{selectedPerk.title}</span>
                        <span className="font-display font-black text-sm text-teal-950">
                          ${selectedPerk.amount}
                        </span>
                      </div>
                      <p className="text-[11px] text-teal-800">{selectedPerk.description}</p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                        Pledge Amount ($)
                      </label>
                      <input
                        type="number"
                        required
                        min="5"
                        placeholder="e.g. 50"
                        value={customPledgeAmount}
                        onChange={(e) => setCustomPledgeAmount(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-teal-700"
                      />
                    </div>
                  )}

                  {/* Creator Support Tip */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                      Add a tip to support platform innovation ($)
                    </label>
                    <div className="flex gap-2">
                      {[5, 10, 20].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setCustomTip(t)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                            customTip === t
                              ? 'bg-orange-500 text-white'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          +${t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-stone-700">
                      Payment Method (Stripe Test Simulator)
                    </label>
                    <div className="flex items-center gap-2 border border-stone-300 rounded-xl px-4 py-2.5 bg-stone-50 text-xs font-mono">
                      <CreditCard className="w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="bg-transparent focus:outline-none flex-1"
                      />
                      <span className="text-[10px] text-teal-700 font-bold">TEST MODE</span>
                    </div>
                  </div>

                  {/* Total Summary */}
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between font-bold text-sm">
                    <span className="text-stone-700">Total Contribution</span>
                    <span className="text-teal-900 font-display text-lg">
                      $
                      {(
                        (selectedPerk ? selectedPerk.amount : Number(customPledgeAmount) || 25) +
                        Number(customTip)
                      ).toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-sm py-3 rounded-xl shadow-lg transition active:scale-95"
                  >
                    Confirm & Authorize Pledge
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= POST UPDATE MODAL ================= */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-stone-200 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="font-display font-bold text-base text-stone-900">
                Post Backer Milestone Update
              </h3>
              <button onClick={() => setShowUpdateModal(false)} className="text-stone-400 text-xs">
                ✕
              </button>
            </div>
            <form onSubmit={handlePostUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Update Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tooling Molds Validated & Beta Shipping"
                  value={newUpdateTitle}
                  onChange={(e) => setNewUpdateTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Update Body
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details with your backer community..."
                  value={newUpdateContent}
                  onChange={(e) => setNewUpdateContent(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 rounded-lg text-stone-600 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-800 text-white font-bold text-xs px-5 py-2 rounded-lg"
                >
                  Publish Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-stone-950 text-stone-400 py-10 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white font-display text-sm">IgniteLaunch</span> · Project 54 / 59
            </div>
          </div>
          <div className="text-stone-500">
            Port 3054 · Full-Stack Crowdfunding & Milestone Reward Architecture
          </div>
        </div>
      </footer>
    </div>
  );
}
