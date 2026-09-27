import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'explore', // 'explore' | 'campaign-detail' | 'start-campaign' | 'creator-dashboard' | 'my-pledges'
  selectedCategory: 'All',
  searchQuery: '',
  sortBy: 'trending', // 'trending' | 'funded' | 'ending' | 'newest'
  selectedCampaignId: 'CAMP-801',

  currentUser: {
    id: 'USR-9021',
    name: 'Alexandra Wright',
    email: 'alex.wright@innovate.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    backedCount: 3,
    totalPledged: 425
  },

  userPledges: [
    {
      id: 'PLG-101',
      campaignId: 'CAMP-801',
      campaignTitle: 'Lumina AR: Next-Gen Neural Spatial Glasses',
      perkTitle: 'Early Backer Special Kit',
      amount: 249,
      date: '2026-09-12',
      status: 'Confirmed',
      estimatedDelivery: 'Feb 2027',
      shippingStatus: 'In Production'
    },
    {
      id: 'PLG-102',
      campaignId: 'CAMP-803',
      campaignTitle: 'SolTerra: Biophilic Carbon-Capture Air Purifier',
      perkTitle: 'Standard Home Unit',
      amount: 120,
      date: '2026-09-20',
      status: 'Confirmed',
      estimatedDelivery: 'Nov 2026',
      shippingStatus: 'Processing'
    }
  ],

  campaigns: [
    {
      id: 'CAMP-801',
      title: 'Lumina AR: Next-Gen Neural Spatial Glasses',
      tagline: 'Ultralight 48g augmented reality eyewear featuring neural gaze tracking and 4K micro-OLED wave-guides.',
      story: 'Lumina AR bridges biological cognition and ambient computing. Engineered in Silicon Valley with custom diffractive optics, our dual 4K micro-OLED displays deliver 120Hz refresh rates with seamless optical hand-tracking and 14-hour hot-swappable magnetic battery arms.',
      category: 'Tech & Hardware',
      creator: {
        name: 'Vortex Optics Lab',
        verified: true,
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
        totalRaisedAcrossProjects: 1450000
      },
      goalAmount: 120000,
      raisedAmount: 148500,
      backerCount: 412,
      daysLeft: 14,
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      featured: true,
      perks: [
        {
          id: 'PERK-801-1',
          title: 'Early Bird Developer Edition',
          amount: 199,
          retailPrice: 349,
          description: 'Includes 1x Lumina AR Glasses, USB-C SDK Tether Cable, 2x Magnetic Battery Packs, and Lifetime Neural API Access.',
          estimatedDelivery: 'January 2027',
          backersClaimed: 180,
          limit: 200
        },
        {
          id: 'PERK-801-2',
          title: 'Collector’s Neural Titan Kit',
          amount: 349,
          retailPrice: 599,
          description: 'Titanium chassis edition with prescription lens inserts, leather carry case, developer badge, and custom serial engraving.',
          estimatedDelivery: 'December 2026',
          backersClaimed: 145,
          limit: 150
        },
        {
          id: 'PERK-801-3',
          title: 'Community Supporter Token',
          amount: 25,
          retailPrice: 25,
          description: 'Direct support token, name on virtual founder wall in Lumina OS, and early beta access to developer documentation.',
          estimatedDelivery: 'Immediate',
          backersClaimed: 87,
          limit: null
        }
      ],
      updates: [
        {
          id: 'UPD-1',
          title: 'Optical Waveguide Pilot Production Complete',
          date: '2026-09-24',
          content: 'We successfully validated the 4K micro-OLED optical stack with 99.8% yields across 500 test units at our partner foundry.',
          likes: 84
        },
        {
          id: 'UPD-2',
          title: 'Stretch Goal Unlocked: Spatial Audio Spatializer',
          date: '2026-09-18',
          content: 'Surpassing $140,000 means all backers will receive dual directional beamforming spatial audio microphones at no extra charge!',
          likes: 129
        }
      ],
      faqs: [
        { q: 'Can prescription lenses be mounted?', a: 'Yes! Lumina AR features magnetic snap-on lens inserts compatible with any prescription index.' },
        { q: 'What is the battery life?', a: 'Each magnetic arm houses a 6-hour cell; hot-swapping allows 24/7 continuous operation.' }
      ]
    },
    {
      id: 'CAMP-802',
      title: 'Echoes of Aethelgard: Tactical Strategy RPG',
      tagline: 'Hand-drawn isometric tactical RPG combining dark Nordic mythology with procedural tabletop dungeon crawls.',
      story: 'Step into the frozen fjords of Aethelgard. Lead a fellowship of outcasts through branching narrative decisions, permadeath combat encounters, and an orchestrally recorded live Scandinavian folk soundtrack.',
      category: 'Games',
      creator: {
        name: 'RuneStone Interactive',
        verified: true,
        location: 'Stockholm, Sweden',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        totalRaisedAcrossProjects: 380000
      },
      goalAmount: 45000,
      raisedAmount: 51200,
      backerCount: 890,
      daysLeft: 9,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      featured: false,
      perks: [
        {
          id: 'PERK-802-1',
          title: 'Digital Explorer Tier',
          amount: 30,
          retailPrice: 40,
          description: 'Digital Steam/GOG game key, digital soundtrack, and Backer Discord role.',
          estimatedDelivery: 'November 2026',
          backersClaimed: 450,
          limit: 1000
        },
        {
          id: 'PERK-802-2',
          title: 'Physical Lore Collector Box',
          amount: 85,
          retailPrice: 120,
          description: 'Hardcover 140-page artbook, fabric map of Aethelgard, metal runic dice set, and physical collector’s USB box.',
          estimatedDelivery: 'December 2026',
          backersClaimed: 290,
          limit: 300
        }
      ],
      updates: [
        {
          id: 'UPD-3',
          title: 'Boss Battle Telemetry & Live Demo Video',
          date: '2026-09-22',
          content: 'Check out our 15-minute raw gameplay reveal exploring the Glacial Tomb of the Frost Weaver.',
          likes: 215
        }
      ],
      faqs: [
        { q: 'Which platforms will be supported?', a: 'PC (Windows/Linux/Mac) via Steam and Epic Games, plus Nintendo Switch at launch.' }
      ]
    },
    {
      id: 'CAMP-803',
      title: 'SolTerra: Biophilic Carbon-Capture Air Purifier',
      tagline: 'Living microalgae bio-reactor wall combining HEPA-14 filtration with real-time carbon sequestration.',
      story: 'SolTerra turns your home or workspace into a clean atmospheric oasis. Powered by Spirulina bio-reactors, it consumes indoor CO2 at 25x the rate of traditional houseplants while purifying PM2.5 particles.',
      category: 'Eco Innovations',
      creator: {
        name: 'SolTerra Biosystems',
        verified: true,
        location: 'Boulder, CO',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        totalRaisedAcrossProjects: 210000
      },
      goalAmount: 35000,
      raisedAmount: 38400,
      backerCount: 260,
      daysLeft: 22,
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      featured: false,
      perks: [
        {
          id: 'PERK-803-1',
          title: 'SolTerra Desktop Bio-Pod',
          amount: 149,
          retailPrice: 220,
          description: 'Compact 5L algae chamber with ambient LED ring light, silent brushless pump, and 6-month nutrient refill starter pack.',
          estimatedDelivery: 'March 2027',
          backersClaimed: 190,
          limit: 250
        }
      ],
      updates: [
        {
          id: 'UPD-4',
          title: 'EPA Biomass Validation Approved',
          date: '2026-09-20',
          content: 'Independent laboratory testing confirmed 88% airborne formaldehyde capture in 4 hours.',
          likes: 67
        }
      ],
      faqs: [
        { q: 'How often does the algae require feeding?', a: 'Just once a month with our dissolvable organic nutrient pods!' }
      ]
    },
    {
      id: 'CAMP-804',
      title: 'Chronicles of the Deep Ocean Anthology',
      tagline: 'Deluxe archival folio documenting 50 years of bathypelagic deep-sea discoveries and unmapped trenches.',
      story: 'Featuring high-resolution deep-submergence photography from the Mariana Trench, hydrothermal vent ecosystems, and newly classified bioluminescent species.',
      category: 'Publishing',
      creator: {
        name: 'Abyssal Heritage Press',
        verified: true,
        location: 'Woods Hole, MA',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        totalRaisedAcrossProjects: 95000
      },
      goalAmount: 18000,
      raisedAmount: 12400,
      backerCount: 140,
      daysLeft: 6,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      featured: false,
      perks: [
        {
          id: 'PERK-804-1',
          title: 'Archival Hardcover Volume',
          amount: 65,
          retailPrice: 90,
          description: 'Foil-stamped clothbound edition with metallic ink endpapers, ribbon bookmark, and archival acid-free paper.',
          estimatedDelivery: 'December 2026',
          backersClaimed: 95,
          limit: 300
        }
      ],
      updates: [],
      faqs: []
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSelectedCampaignId: (id) => set({ selectedCampaignId: id, activeTab: 'campaign-detail' }),

  contributeToCampaign: (campaignId, amount, perkId, tipAmount = 0) => set((state) => {
    const totalPledge = Number(amount) + Number(tipAmount);
    const updatedCampaigns = state.campaigns.map((camp) => {
      if (camp.id === campaignId) {
        const updatedPerks = camp.perks.map((p) => {
          if (p.id === perkId) {
            return { ...p, backersClaimed: p.backersClaimed + 1 };
          }
          return p;
        });

        const newRaised = camp.raisedAmount + totalPledge;
        return {
          ...camp,
          raisedAmount: newRaised,
          backerCount: camp.backerCount + 1,
          perks: updatedPerks
        };
      }
      return camp;
    });

    const targetCamp = state.campaigns.find(c => c.id === campaignId);
    const perk = targetCamp?.perks.find(p => p.id === perkId);

    const newPledge = {
      id: `PLG-${Math.floor(200 + Math.random() * 800)}`,
      campaignId,
      campaignTitle: targetCamp ? targetCamp.title : 'Crowdfunding Pledge',
      perkTitle: perk ? perk.title : 'Custom Backer Pledge',
      amount: totalPledge,
      date: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      estimatedDelivery: perk?.estimatedDelivery || 'Spring 2027',
      shippingStatus: 'Processing'
    };

    return {
      campaigns: updatedCampaigns,
      userPledges: [newPledge, ...state.userPledges],
      currentUser: {
        ...state.currentUser,
        backedCount: state.currentUser.backedCount + 1,
        totalPledged: state.currentUser.totalPledged + totalPledge
      }
    };
  }),

  createCampaign: (data) => set((state) => {
    const newCamp = {
      id: `CAMP-${Math.floor(805 + Math.random() * 900)}`,
      title: data.title,
      tagline: data.tagline,
      story: data.story,
      category: data.category || 'Tech & Hardware',
      creator: {
        name: state.currentUser.name,
        verified: true,
        location: data.location || 'New York, USA',
        avatar: state.currentUser.avatar,
        totalRaisedAcrossProjects: 0
      },
      goalAmount: Number(data.goalAmount) || 25000,
      raisedAmount: 0,
      backerCount: 0,
      daysLeft: Number(data.duration) || 30,
      image: data.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      status: 'Active',
      featured: false,
      perks: [
        {
          id: `PERK-${Math.floor(100 + Math.random() * 900)}`,
          title: data.perkTitle || 'Early Adopter Bundle',
          amount: Number(data.perkAmount) || 50,
          retailPrice: (Number(data.perkAmount) || 50) * 1.4,
          description: data.perkDescription || 'First production run batch with founder acknowledgement.',
          estimatedDelivery: 'Early 2027',
          backersClaimed: 0,
          limit: 100
        }
      ],
      updates: [
        {
          id: 'UPD-INIT',
          title: 'Campaign Officially Launched!',
          date: new Date().toISOString().split('T')[0],
          content: 'Thank you everyone for supporting our vision from Day 1. Let’s make this happen together!',
          likes: 12
        }
      ],
      faqs: [
        { q: 'When does manufacturing start?', a: 'Production begins immediately once our minimum goal target is locked in.' }
      ]
    };

    return {
      campaigns: [newCamp, ...state.campaigns],
      selectedCampaignId: newCamp.id,
      activeTab: 'campaign-detail'
    };
  }),

  postUpdate: (campaignId, title, content) => set((state) => ({
    campaigns: state.campaigns.map((c) => {
      if (c.id === campaignId) {
        const newUpd = {
          id: `UPD-${Math.floor(10 + Math.random() * 90)}`,
          title,
          content,
          date: new Date().toISOString().split('T')[0],
          likes: 0
        };
        return {
          ...c,
          updates: [newUpd, ...c.updates]
        };
      }
      return c;
    })
  }))
}));
