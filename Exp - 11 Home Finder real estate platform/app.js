/**
 * Home Finder - Main Application Engine
 * Comprehensive Real Estate Platform Logic:
 * Property Store, Interactive Leaflet & Google Maps Sync, Search & Filter Engine,
 * Saved Search Criteria Management, Mortgage Calculator, Property Valuation Tool,
 * Agent/Company Directory Search, Viewing Bookings, and Visitor Log Analytics.
 */

// ==========================================================================
// Comprehensive Property Database (Residential, Commercial, Lands/Plots)
// ==========================================================================
const PROPERTIES_DATA = [
  {
    id: 'prop-1',
    title: 'Azure Skyline Luxury Penthouse',
    category: 'residential',
    type: 'apartment',
    status: 'sale',
    price: 1250000,
    priceFormatted: '$1,250,000',
    areaSqft: 2850,
    bedrooms: 3,
    bathrooms: 3.5,
    address: '742 Evergreen Terrace, Downtown',
    city: 'Metropolis',
    neighborhood: 'Downtown Financial District',
    lat: 37.7833,
    lng: -122.4167,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['pool', 'gym', 'security', 'balcony', 'garage'],
    agentId: 'agent-1',
    featured: true,
    description: 'Breathtaking 3-bedroom penthouse featuring panoramic skyline views, Italian marble flooring, automated smart home system, and private rooftop infinity pool.'
  },
  {
    id: 'prop-2',
    title: 'The Grand Meadow Family Estate',
    category: 'residential',
    type: 'villa',
    status: 'sale',
    price: 1890000,
    priceFormatted: '$1,890,000',
    areaSqft: 4600,
    bedrooms: 5,
    bathrooms: 5,
    address: '1240 Whisper Valley Rd',
    city: 'West End',
    neighborhood: 'Whisper Valley Suburbs',
    lat: 37.7650,
    lng: -122.4450,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['pool', 'garden', 'garage', 'security', 'solar'],
    agentId: 'agent-3',
    featured: true,
    description: 'Magnificent architectural villa set on 1.2 landscaped acres. Features a gourmet chef kitchen, private home cinema, heated pool, and 3-car garage.'
  },
  {
    id: 'prop-3',
    title: 'Vanguard Corporate Tower Floor 14',
    category: 'commercial',
    type: 'office',
    status: 'sale',
    price: 3400000,
    priceFormatted: '$3,400,000',
    areaSqft: 6800,
    bedrooms: 0,
    bathrooms: 6,
    address: '88 Innovation Boulevard',
    city: 'Downtown',
    neighborhood: 'Silicon Corridor',
    lat: 37.7915,
    lng: -122.3990,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    amenities: ['security', 'garage', 'gym'],
    agentId: 'agent-2',
    featured: true,
    description: 'Turnkey Grade-A commercial corporate office floor equipped with fiber internet, executive conference boardrooms, ergonomic workstations, and LEED Gold certification.'
  },
  {
    id: 'prop-4',
    title: 'Emerald Crest Residential Land Parcel',
    category: 'land',
    type: 'plot',
    status: 'sale',
    price: 495000,
    priceFormatted: '$495,000',
    areaSqft: 12500,
    bedrooms: 0,
    bathrooms: 0,
    address: 'Lot 44, Crestline Hills Way',
    city: 'West End',
    neighborhood: 'Emerald Hills',
    lat: 37.7420,
    lng: -122.4600,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    amenities: ['security', 'garden'],
    agentId: 'agent-4',
    featured: false,
    description: 'Prime shovel-ready residential development plot with approved architectural zoning for a 4-bedroom villa. Fully connected to municipal water, power, and high-speed fiber.'
  },
  {
    id: 'prop-5',
    title: 'SoHo Style Urban Designer Loft',
    category: 'residential',
    type: 'apartment',
    status: 'rent',
    price: 4200,
    priceFormatted: '$4,200/mo',
    areaSqft: 1450,
    bedrooms: 2,
    bathrooms: 2,
    address: '310 Artist Alley, Arts District',
    city: 'Downtown',
    neighborhood: 'Arts & Cultural District',
    lat: 37.7780,
    lng: -122.4080,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    amenities: ['balcony', 'security', 'gym'],
    agentId: 'agent-1',
    featured: false,
    description: 'Chic industrial loft with 14-foot exposed beam ceilings, polished concrete floors, floor-to-ceiling double-glazed windows, and European kitchen.'
  },
  {
    id: 'prop-6',
    title: 'Pacific Coast Oceanview Modern Villa',
    category: 'residential',
    type: 'villa',
    status: 'sale',
    price: 3850000,
    priceFormatted: '$3,850,000',
    areaSqft: 5200,
    bedrooms: 4,
    bathrooms: 4.5,
    address: '900 Scenic Ocean Drive',
    city: 'Coast',
    neighborhood: 'Pacific Cliffside',
    lat: 37.7320,
    lng: -122.4850,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    amenities: ['pool', 'garden', 'garage', 'security', 'balcony'],
    agentId: 'agent-5',
    featured: true,
    description: 'Ultra-contemporary seaside masterpiece with direct private beach access, floor-to-ceiling glass walls, infinity-edge swimming pool, and wine cellar.'
  },
  {
    id: 'prop-7',
    title: 'Harbor Commercial Distribution Hub',
    category: 'commercial',
    type: 'warehouse',
    status: 'sale',
    price: 2450000,
    priceFormatted: '$2,450,000',
    areaSqft: 18000,
    bedrooms: 0,
    bathrooms: 4,
    address: '500 Logistics Way, Port Access',
    city: 'East Bay',
    neighborhood: 'Harbor Logistics Park',
    lat: 37.8050,
    lng: -122.3850,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    amenities: ['security', 'garage'],
    agentId: 'agent-2',
    featured: false,
    description: 'High-clearance commercial warehouse with 4 loading docks, 32-ft clear height, heavy 3-phase industrial power, and attached 2-story office suite.'
  },
  {
    id: 'prop-8',
    title: 'Sunnyvale Garden Townhouse',
    category: 'residential',
    type: 'townhouse',
    status: 'sale',
    price: 780000,
    priceFormatted: '$780,000',
    areaSqft: 1950,
    bedrooms: 3,
    bathrooms: 2.5,
    address: '412 Blossom Tree Lane',
    city: 'Suburbs',
    neighborhood: 'Sunnyvale Gardens',
    lat: 37.7580,
    lng: -122.4300,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    amenities: ['garden', 'garage', 'security'],
    agentId: 'agent-4',
    featured: false,
    description: 'Charming 3-story townhome featuring a private landscaped garden patio, renovated kitchen with quartz counters, and EV charging station in the garage.'
  },
  {
    id: 'prop-9',
    title: 'Metro Highway Commercial Land Plot',
    category: 'land',
    type: 'plot',
    status: 'sale',
    price: 1150000,
    priceFormatted: '$1,150,000',
    areaSqft: 25000,
    bedrooms: 0,
    bathrooms: 0,
    address: 'Intersection 101 & Highway 9',
    city: 'East Bay',
    neighborhood: 'Commercial Growth Corridor',
    lat: 37.7600,
    lng: -122.3950,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    virtualTour: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    amenities: ['security'],
    agentId: 'agent-3',
    featured: false,
    description: 'Strategic high-visibility commercial plot ideal for retail strip, dealership, or medical center with direct highway fronting and immense daily traffic.'
  }
];

// ==========================================================================
// Verified Agents & Real Estate Companies Dataset
// ==========================================================================
const AGENTS_DATA = [
  {
    id: 'agent-1',
    name: 'Sarah Jenkins',
    company: 'Apex Realty Group',
    specialty: 'Luxury Residential & Penthouses',
    phone: '+1 (555) 234-8901',
    email: 'sarah.jenkins@apexrealty.com',
    rating: '4.95',
    reviewsCount: 142,
    activeListings: 18,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'agent-2',
    name: 'David Chen',
    company: 'Skyline Commercial Properties',
    specialty: 'Corporate Offices & Industrial Warehouses',
    phone: '+1 (555) 876-5432',
    email: 'david.chen@skylinecommercial.com',
    rating: '4.90',
    reviewsCount: 98,
    activeListings: 24,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'agent-3',
    name: 'Priya Sharma',
    company: 'Greenfield Estates & Land Corp',
    specialty: 'Residential Plots & Development Lands',
    phone: '+1 (555) 456-7890',
    email: 'priya.sharma@greenfieldestates.com',
    rating: '4.98',
    reviewsCount: 175,
    activeListings: 31,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'agent-4',
    name: 'Marcus Vance',
    company: 'Vance & Associates Real Estate',
    specialty: 'Suburban Homes & Townhouses',
    phone: '+1 (555) 678-1234',
    email: 'marcus@vancerealty.com',
    rating: '4.87',
    reviewsCount: 84,
    activeListings: 12,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'agent-5',
    name: 'Elena Rostova',
    company: 'Harbor Luxury Living',
    specialty: 'Waterfront Villas & Beachfront Assets',
    phone: '+1 (555) 987-6543',
    email: 'elena@harborluxury.com',
    rating: '4.99',
    reviewsCount: 210,
    activeListings: 22,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  }
];

// Global State
let filteredProperties = [...PROPERTIES_DATA];
let activeCategory = 'all';
let leafletMapInstance = null;
let mapMarkersGroup = null;
let currentSort = 'featured';
let favoritePropertyIds = new Set(JSON.parse(localStorage.getItem('hf_favorite_ids') || '["prop-1", "prop-6"]'));

// ==========================================================================
// Initialization on Page Load
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Record customer visitor session in database
  recordCustomerVisit('Main Property Portal');

  // 2. Initialize UI states
  initAuthUI();
  initMap();
  renderSavedSearchesQuickBar();
  applyFiltersAndRender();
  renderAgents(AGENTS_DATA);
  updateVisitorStatsWidget();

  // 3. Setup Mortgage Calculator & Valuation listeners
  setupMortgageCalculator();
  calculatePropertyValuation();

  // 4. Budget slider real-time label update
  const budgetSlider = document.getElementById('budgetSlider');
  if (budgetSlider) {
    budgetSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      document.getElementById('budgetValLabel').textContent = `$${(val / 1000).toLocaleString()}k`;
    });
  }
});

// ==========================================================================
// User Authentication State Sync
// ==========================================================================
function initAuthUI() {
  const currentBuyer = getCurrentBuyer();
  const authContainer = document.getElementById('navAuthStatus');
  if (!authContainer) return;

  if (currentBuyer) {
    authContainer.innerHTML = `
      <div class="user-pill" title="Buyer Account">
        <div class="user-avatar">${currentBuyer.fullName.charAt(0)}</div>
        <span class="user-name-label">${currentBuyer.fullName.split(' ')[0]}</span>
        <button onclick="handleLogout()" class="btn btn-sm btn-outline" style="padding: 0.2rem 0.5rem; margin-left: 0.25rem;" title="Sign Out">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    `;
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="btn btn-outline btn-sm">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In
      </a>
      <a href="login.html#register" class="btn btn-primary btn-sm">
        <i class="fa-solid fa-user-plus"></i> Register
      </a>
    `;
  }

  // Update favorites counter badge
  updateFavoritesBadge();
}

function handleLogout() {
  if (confirm('Are you sure you want to sign out of your buyer session?')) {
    logoutBuyer();
    showToast('Signed out successfully. Come back soon!');
    initAuthUI();
    renderSavedSearchesQuickBar();
  }
}

function updateFavoritesBadge() {
  const favBadge = document.getElementById('favBadgeCount');
  if (favBadge) {
    favBadge.textContent = favoritePropertyIds.size;
  }
}

// ==========================================================================
// Interactive Map (Leaflet.js + Google Maps Sync)
// ==========================================================================
function initMap() {
  const mapElement = document.getElementById('leafletMap');
  if (!mapElement || typeof L === 'undefined') return;

  // Center around Metropolis / San Francisco coordinates
  leafletMapInstance = L.map('leafletMap', {
    scrollWheelZoom: false
  }).setView([37.768, -122.43], 12);

  // High quality OpenStreetMap / CartoDB tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(leafletMapInstance);

  mapMarkersGroup = L.layerGroup().addTo(leafletMapInstance);
  syncMapMarkers(filteredProperties);
}

function syncMapMarkers(properties) {
  if (!leafletMapInstance || !mapMarkersGroup) return;

  mapMarkersGroup.clearLayers();
  const bounds = [];

  properties.forEach(prop => {
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div class="price-marker-pin" id="marker-${prop.id}">${prop.priceFormatted}</div>`,
      iconSize: [60, 24],
      iconAnchor: [30, 12]
    });

    const marker = L.marker([prop.lat, prop.lng], { icon: customIcon });

    // Google Maps locator link directly opens exact coordinates in Google Maps!
    const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${prop.lat},${prop.lng}`;

    const popupContent = `
      <div class="map-popup-card">
        <img src="${prop.image}" alt="${prop.title}" class="map-popup-img">
        <div class="map-popup-body">
          <div class="map-popup-price">${prop.priceFormatted}</div>
          <div class="map-popup-title">${prop.title}</div>
          <div class="map-popup-address"><i class="fa-solid fa-location-dot"></i> ${prop.address}</div>
          <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 0.6rem;">
            ${prop.bedrooms > 0 ? prop.bedrooms + ' Beds • ' : ''}${prop.areaSqft.toLocaleString()} sq.ft
          </div>
          <div style="display: flex; gap: 0.4rem;">
            <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" class="gmaps-link-btn">
              <i class="fa-solid fa-map-location-dot"></i> Open on Google Maps
            </a>
            <button class="btn btn-primary btn-sm" style="flex: 1; font-size: 0.75rem; padding: 0.35rem;" onclick="openPropertyDetailModal('${prop.id}')">
              Details
            </button>
          </div>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, { maxWidth: 260 });

    marker.on('click', () => {
      highlightPropertyCard(prop.id);
    });

    marker.addTo(mapMarkersGroup);
    bounds.push([prop.lat, prop.lng]);
  });

  if (bounds.length > 0 && leafletMapInstance) {
    try {
      leafletMapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    } catch (e) {
      // safe fallback
    }
  }
}

function panToPropertyOnMap(propId) {
  const prop = PROPERTIES_DATA.find(p => p.id === propId);
  if (!prop || !leafletMapInstance) return;

  leafletMapInstance.flyTo([prop.lat, prop.lng], 15, { duration: 1.2 });
  
  // Highlight marker
  const pin = document.getElementById(`marker-${propId}`);
  if (pin) {
    pin.classList.add('active');
    setTimeout(() => pin.classList.remove('active'), 2500);
  }

  showToast(`Locating ${prop.title} on map...`);
}

function highlightPropertyCard(propId) {
  const cards = document.querySelectorAll('.property-card');
  cards.forEach(c => c.classList.remove('active-marker-highlight'));

  const targetCard = document.getElementById(`card-${propId}`);
  if (targetCard) {
    targetCard.classList.add('active-marker-highlight');
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ==========================================================================
// Advanced Search, Filter & Saved Criteria Engine
// ==========================================================================
function setCategoryTab(category, btnElement) {
  activeCategory = category;
  document.querySelectorAll('.search-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  applyFiltersAndRender();
}

function applyFiltersAndRender() {
  const locationQuery = (document.getElementById('searchLocation')?.value || '').trim().toLowerCase();
  const typeFilter = document.getElementById('searchType')?.value || 'all';
  const maxBudget = parseInt(document.getElementById('budgetSlider')?.value || '5000000', 10);
  const bedroomFilter = document.getElementById('searchBedrooms')?.value || 'any';

  // Gather selected amenities
  const selectedAmenities = [];
  document.querySelectorAll('.amenity-chip input:checked').forEach(input => {
    selectedAmenities.push(input.value);
  });

  // Filter properties
  filteredProperties = PROPERTIES_DATA.filter(prop => {
    // 1. Category Tab
    if (activeCategory === 'rent' && prop.status !== 'rent') return false;
    if (activeCategory !== 'all' && activeCategory !== 'rent' && prop.category !== activeCategory) return false;

    // 2. Location keyword search
    if (locationQuery) {
      const matchString = `${prop.title} ${prop.address} ${prop.city} ${prop.neighborhood}`.toLowerCase();
      if (!matchString.includes(locationQuery)) return false;
    }

    // 3. Property Type
    if (typeFilter !== 'all' && prop.type !== typeFilter) return false;

    // 4. Budget
    if (prop.price > maxBudget) return false;

    // 5. Bedrooms
    if (bedroomFilter !== 'any') {
      const minBeds = parseInt(bedroomFilter, 10);
      if (prop.bedrooms < minBeds) return false;
    }

    // 6. Amenities
    if (selectedAmenities.length > 0) {
      const hasAll = selectedAmenities.every(a => prop.amenities.includes(a));
      if (!hasAll) return false;
    }

    return true;
  });

  // Sort properties
  sortPropertiesList();

  // Render HTML Cards
  renderPropertiesGrid(filteredProperties);

  // Sync Map markers with new search results
  syncMapMarkers(filteredProperties);

  // Update Result Stats
  const countEl = document.getElementById('resultsCountNumber');
  if (countEl) countEl.textContent = filteredProperties.length;

  // Log search activity in visitor records
  if (locationQuery || typeFilter !== 'all' || activeCategory !== 'all') {
    logCustomerActivity('Search Executed', `Filter applied: Cat=${activeCategory}, Loc=${locationQuery || 'All'}, MaxPrice=$${maxBudget}`);
  }
}

function handleSortChange(sortType) {
  currentSort = sortType;
  sortPropertiesList();
  renderPropertiesGrid(filteredProperties);
}

function sortPropertiesList() {
  if (currentSort === 'price-low') {
    filteredProperties.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filteredProperties.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'area-high') {
    filteredProperties.sort((a, b) => b.areaSqft - a.areaSqft);
  } else {
    // Featured first
    filteredProperties.sort((a, b) => (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0));
  }
}

function resetSearchFilters() {
  if (document.getElementById('searchLocation')) document.getElementById('searchLocation').value = '';
  if (document.getElementById('searchType')) document.getElementById('searchType').value = 'all';
  if (document.getElementById('budgetSlider')) {
    document.getElementById('budgetSlider').value = '5000000';
    document.getElementById('budgetValLabel').textContent = '$5,000k';
  }
  if (document.getElementById('searchBedrooms')) document.getElementById('searchBedrooms').value = 'any';

  document.querySelectorAll('.amenity-chip').forEach(chip => {
    chip.classList.remove('active');
    const input = chip.querySelector('input');
    if (input) input.checked = false;
  });

  activeCategory = 'all';
  document.querySelectorAll('.search-tabs .tab-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === 0);
  });

  applyFiltersAndRender();
  showToast('Search filters have been reset.');
}

function toggleAmenityChip(chipElement) {
  const checkbox = chipElement.querySelector('input');
  checkbox.checked = !checkbox.checked;
  chipElement.classList.toggle('active', checkbox.checked);
}

// ==========================================================================
// Saved Search Criteria (Persist & Instant Re-apply for Buyers)
// ==========================================================================
function promptSaveCurrentSearch() {
  const location = document.getElementById('searchLocation')?.value || '';
  const type = document.getElementById('searchType')?.value || 'all';
  const budget = document.getElementById('budgetSlider')?.value || '5000000';

  const defaultName = `${location || 'Anywhere'} ${type !== 'all' ? type : 'Properties'} (<$${(budget / 1000).toFixed(0)}k)`;
  const criteriaName = prompt('Enter a name for this search criteria to save it to your buyer account:', defaultName);

  if (criteriaName === null) return; // user cancelled

  const selectedAmenities = [];
  document.querySelectorAll('.amenity-chip input:checked').forEach(input => {
    selectedAmenities.push(input.value);
  });

  const filterParams = {
    category: activeCategory,
    location: location,
    propertyType: type,
    maxPrice: parseInt(budget, 10),
    bedrooms: document.getElementById('searchBedrooms')?.value || 'any',
    amenities: selectedAmenities
  };

  saveBuyerSearchCriteria(criteriaName, filterParams);
  renderSavedSearchesQuickBar();
  showToast(`Criteria "${criteriaName}" successfully saved to your database!`);
}

function renderSavedSearchesQuickBar() {
  const container = document.getElementById('savedSearchesChipsContainer');
  if (!container) return;

  const savedList = getBuyerSavedSearches();
  if (savedList.length === 0) {
    container.innerHTML = `<span style="font-size: 0.82rem; color: var(--text-subtle);">No saved criteria yet. Save your favorite filter!</span>`;
    return;
  }

  container.innerHTML = savedList.map(item => `
    <div class="saved-chip" onclick="applySavedCriteria('${item.id}')" title="Click to apply saved search criteria">
      <i class="fa-solid fa-clock-rotate-left"></i>
      <span>${item.name}</span>
      <span class="saved-chip-del" onclick="event.stopPropagation(); removeSavedCriteria('${item.id}')" title="Delete criteria">
        <i class="fa-solid fa-xmark"></i>
      </span>
    </div>
  `).join('');
}

function applySavedCriteria(searchId) {
  const savedList = getBuyerSavedSearches();
  const criteria = savedList.find(s => s.id === searchId);
  if (!criteria) return;

  // 1. Populate category
  activeCategory = criteria.category || 'all';
  document.querySelectorAll('.search-tabs .tab-btn').forEach(btn => {
    const isMatch = btn.getAttribute('data-cat') === activeCategory;
    btn.classList.toggle('active', isMatch);
  });

  // 2. Populate Location
  const locInput = document.getElementById('searchLocation');
  if (locInput) locInput.value = criteria.location || '';

  // 3. Populate Type
  const typeSelect = document.getElementById('searchType');
  if (typeSelect) typeSelect.value = criteria.propertyType || 'all';

  // 4. Populate Budget
  const budgetSlider = document.getElementById('budgetSlider');
  if (budgetSlider) {
    budgetSlider.value = criteria.maxPrice || 5000000;
    document.getElementById('budgetValLabel').textContent = `$${(criteria.maxPrice / 1000).toLocaleString()}k`;
  }

  // 5. Populate Bedrooms
  const bedSelect = document.getElementById('searchBedrooms');
  if (bedSelect) bedSelect.value = criteria.bedrooms || 'any';

  // 6. Populate Amenities
  const savedAmenities = criteria.amenities || [];
  document.querySelectorAll('.amenity-chip').forEach(chip => {
    const input = chip.querySelector('input');
    if (input) {
      input.checked = savedAmenities.includes(input.value);
      chip.classList.toggle('active', input.checked);
    }
  });

  // Re-run search
  applyFiltersAndRender();
  showToast(`Loaded saved criteria: "${criteria.name}"`);
}

function removeSavedCriteria(searchId) {
  if (confirm('Do you want to remove this saved search criteria?')) {
    deleteSavedSearch(searchId);
    renderSavedSearchesQuickBar();
    showToast('Saved search criteria deleted.');
  }
}

// ==========================================================================
// Property Card Rendering & Detail Modal
// ==========================================================================
function renderPropertiesGrid(properties) {
  const gridContainer = document.getElementById('propertiesGrid');
  if (!gridContainer) return;

  if (properties.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-results-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-house-circle-exclamation"></i>
        <h3>No Properties Found</h3>
        <p>No listings matched your exact search filters. Try adjusting your budget, location, or amenities.</p>
        <button class="btn btn-outline" onclick="resetSearchFilters()">
          <i class="fa-solid fa-rotate-left"></i> Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = properties.map(prop => {
    const isFav = favoritePropertyIds.has(prop.id);
    const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${prop.lat},${prop.lng}`;

    let categoryBadge = '';
    if (prop.category === 'commercial') {
      categoryBadge = `<span class="badge badge-commercial"><i class="fa-solid fa-building"></i> Commercial</span>`;
    } else if (prop.category === 'land') {
      categoryBadge = `<span class="badge badge-land"><i class="fa-solid fa-tree"></i> Plot / Land</span>`;
    } else {
      categoryBadge = `<span class="badge badge-status-sale"><i class="fa-solid fa-house"></i> ${prop.status === 'rent' ? 'For Rent' : 'For Sale'}</span>`;
    }

    return `
      <div class="property-card" id="card-${prop.id}">
        <div class="card-media">
          <img src="${prop.image}" alt="${prop.title}" class="card-img" loading="lazy">
          <div class="card-badges">
            ${prop.featured ? `<span class="badge badge-featured"><i class="fa-solid fa-star"></i> Featured</span>` : ''}
            ${categoryBadge}
          </div>
          <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" onclick="toggleFavoriteListing('${prop.id}', this)" title="Save to Favorites">
            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
          <div class="virtual-tour-chip" onclick="openVirtualTourModal('${prop.id}')" title="Experience 360 Virtual Tour">
            <i class="fa-solid fa-vr-cardboard"></i> 360° Virtual Tour
          </div>
        </div>

        <div class="card-content">
          <div class="card-price-row">
            <span class="card-price">${prop.priceFormatted}</span>
            <span class="card-type-tag">${prop.type.toUpperCase()}</span>
          </div>

          <h3 class="card-title" title="${prop.title}">${prop.title}</h3>

          <div class="card-location">
            <i class="fa-solid fa-location-dot"></i>
            <span>${prop.address}</span>
          </div>

          <div class="card-specs">
            ${prop.bedrooms > 0 ? `
              <div class="spec-item" title="Bedrooms">
                <i class="fa-solid fa-bed"></i> <span>${prop.bedrooms} Beds</span>
              </div>
            ` : ''}
            ${prop.bathrooms > 0 ? `
              <div class="spec-item" title="Bathrooms">
                <i class="fa-solid fa-bath"></i> <span>${prop.bathrooms} Baths</span>
              </div>
            ` : ''}
            <div class="spec-item" title="Square Footage">
              <i class="fa-solid fa-vector-square"></i> <span>${prop.areaSqft.toLocaleString()} sq.ft</span>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn btn-outline btn-sm" onclick="panToPropertyOnMap('${prop.id}')" title="Locate on Map">
              <i class="fa-solid fa-location-crosshairs"></i> Locate
            </button>
            <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="color: #ea4335; border-color: #fca5a5;" title="Open directly in Google Maps">
              <i class="fa-brands fa-google"></i> Google Maps
            </a>
            <button class="btn btn-primary btn-sm" onclick="openPropertyDetailModal('${prop.id}')">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Details
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Favorite Toggle
function toggleFavoriteListing(propId, btnElement) {
  if (favoritePropertyIds.has(propId)) {
    favoritePropertyIds.delete(propId);
    btnElement.classList.remove('is-fav');
    btnElement.querySelector('i').className = 'fa-regular fa-heart';
    showToast('Listing removed from your favorites.');
  } else {
    favoritePropertyIds.add(propId);
    btnElement.classList.add('is-fav');
    btnElement.querySelector('i').className = 'fa-solid fa-heart';
    showToast('Listing saved to your buyer favorites!');
  }
  localStorage.setItem('hf_favorite_ids', JSON.stringify([...favoritePropertyIds]));
  updateFavoritesBadge();
}

// View Mode Toggle (Split, Grid Only, Map Only)
function setViewMode(mode, btnElement) {
  const layout = document.getElementById('exploreLayout');
  document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
  btnElement.classList.add('active');

  layout.className = `explore-layout ${mode}-only`;
  if (mode === 'split') layout.className = 'explore-layout';

  if (leafletMapInstance) {
    setTimeout(() => leafletMapInstance.invalidateSize(), 200);
  }
}

// ==========================================================================
// Property Detail & Virtual Tour Modals
// ==========================================================================
function openPropertyDetailModal(propId) {
  const prop = PROPERTIES_DATA.find(p => p.id === propId);
  if (!prop) return;

  const agent = AGENTS_DATA.find(a => a.id === prop.agentId) || AGENTS_DATA[0];
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${prop.lat},${prop.lng}`;

  const modalBody = document.getElementById('propertyDetailModalBody');
  modalBody.innerHTML = `
    <div style="margin-bottom: 1.25rem; border-radius: var(--radius-lg); overflow: hidden; max-height: 350px;">
      <img src="${prop.image}" alt="${prop.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <div>
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent); text-transform: uppercase;">
          ${prop.category.toUpperCase()} • ${prop.type.toUpperCase()}
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 800; margin: 0.2rem 0;">${prop.title}</h2>
        <div style="color: var(--text-muted); font-size: 0.95rem;">
          <i class="fa-solid fa-location-dot" style="color: var(--accent);"></i> ${prop.address}, ${prop.city}
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent);">${prop.priceFormatted}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">$${Math.round(prop.price / prop.areaSqft)} / sq.ft</div>
      </div>
    </div>

    <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main); margin-bottom: 1.5rem;">
      ${prop.description}
    </p>

    <!-- Amenities Grid -->
    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.6rem;">Property Amenities</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
        ${prop.amenities.map(a => `
          <span style="background: var(--bg-alt); padding: 0.35rem 0.85rem; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 600; text-transform: capitalize; border: 1px solid var(--border);">
            <i class="fa-solid fa-circle-check" style="color: var(--accent);"></i> ${a}
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Agent Profile Card -->
    <div style="background: var(--bg-alt); padding: 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border); margin-bottom: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="${agent.avatar}" alt="${agent.name}" style="width: 54px; height: 54px; border-radius: 50%; object-fit: cover;">
        <div>
          <strong style="font-size: 1.05rem;">${agent.name}</strong>
          <div style="font-size: 0.82rem; color: var(--accent); font-weight: 600;">${agent.company}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-star" style="color: var(--gold);"></i> ${agent.rating} • ${agent.phone}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="openAgentInquiryModal('${agent.id}', '${prop.title}')">
        <i class="fa-regular fa-paper-plane"></i> Contact
      </button>
    </div>

    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="flex: 1; color: #ea4335; border-color: #fca5a5;">
        <i class="fa-brands fa-google"></i> Locate on Google Maps
      </a>
      <button class="btn btn-gold" style="flex: 1;" onclick="openScheduleViewingModal('${prop.id}')">
        <i class="fa-regular fa-calendar-check"></i> Schedule Viewing
      </button>
    </div>
  `;

  document.getElementById('propertyDetailModal').classList.add('active');
}

function openVirtualTourModal(propId) {
  const prop = PROPERTIES_DATA.find(p => p.id === propId);
  if (!prop) return;

  const modalBody = document.getElementById('virtualTourModalBody');
  modalBody.innerHTML = `
    <div style="position: relative; height: 420px; border-radius: var(--radius-md); overflow: hidden; background: #000;">
      <img src="${prop.virtualTour}" alt="${prop.title} 360 Tour" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%); color: #fff; text-align: center; padding: 2rem;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1rem; box-shadow: 0 0 25px rgba(13,148,136,0.8); cursor: pointer;" onclick="alert('Starting interactive 360 gyro room navigation...')">
          <i class="fa-solid fa-play"></i>
        </div>
        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.4rem; color: #fff;">360° Ultra-HD Virtual Experience</h3>
        <p style="color: #cbd5e1; font-size: 0.9rem; max-width: 450px;">
          Explore every room of <strong>${prop.title}</strong> with interactive VR walkthroughs, dimensional floorplans, and natural lighting simulation.
        </p>
      </div>
    </div>
  `;

  document.getElementById('virtualTourModal').classList.add('active');
}

// ==========================================================================
// Viewing Schedule Booking Modal
// ==========================================================================
function openScheduleViewingModal(propId) {
  const prop = PROPERTIES_DATA.find(p => p.id === propId);
  if (!prop) return;

  // Close other modals if open
  closeAllModals();

  const currentBuyer = getCurrentBuyer();
  const modalBody = document.getElementById('viewingModalBody');
  modalBody.innerHTML = `
    <form onsubmit="handleScheduleViewingSubmit(event, '${prop.id}')">
      <div style="margin-bottom: 1.25rem;">
        <strong style="font-size: 1.1rem; color: var(--accent);">${prop.title}</strong>
        <div style="font-size: 0.85rem; color: var(--text-muted);">${prop.address}</div>
      </div>

      <div class="form-row-2" style="margin-bottom: 1rem;">
        <div class="filter-group">
          <label class="filter-label"><i class="fa-regular fa-calendar"></i> Preferred Date</label>
          <input type="date" id="bookingDate" class="input-control" required min="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="filter-group">
          <label class="filter-label"><i class="fa-regular fa-clock"></i> Time Slot</label>
          <select id="bookingTime" class="input-control" required>
            <option value="10:00 AM">10:00 AM - Morning</option>
            <option value="01:30 PM">01:30 PM - Afternoon</option>
            <option value="04:00 PM">04:00 PM - Evening</option>
          </select>
        </div>
      </div>

      <div class="filter-group" style="margin-bottom: 1rem;">
        <label class="filter-label">Tour Type</label>
        <select id="bookingType" class="input-control">
          <option value="In-Person Walkthrough">In-Person Agent Guided Walkthrough</option>
          <option value="Live Video Call">Live Guided Video Tour (Zoom / FaceTime)</option>
        </select>
      </div>

      <div class="form-row-2" style="margin-bottom: 1.25rem;">
        <div class="filter-group">
          <label class="filter-label">Your Name</label>
          <input type="text" id="bookingBuyerName" class="input-control" value="${currentBuyer ? currentBuyer.fullName : ''}" placeholder="Full Name" required>
        </div>
        <div class="filter-group">
          <label class="filter-label">Phone / WhatsApp</label>
          <input type="tel" id="bookingPhone" class="input-control" value="${currentBuyer ? currentBuyer.phone || '' : ''}" placeholder="+1 (555) 000-0000" required>
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
        <i class="fa-regular fa-circle-check"></i> Confirm Viewing Reservation
      </button>
    </form>
  `;

  document.getElementById('viewingModal').classList.add('active');
}

function handleScheduleViewingSubmit(e, propId) {
  e.preventDefault();
  const date = document.getElementById('bookingDate').value;
  const time = document.getElementById('bookingTime').value;
  const type = document.getElementById('bookingType').value;
  const name = document.getElementById('bookingBuyerName').value;

  const prop = PROPERTIES_DATA.find(p => p.id === propId);

  // Store booking in database
  const bookings = JSON.parse(localStorage.getItem('hf_viewing_bookings') || '[]');
  const newBooking = {
    id: 'book_' + Date.now(),
    propertyId: propId,
    propertyTitle: prop ? prop.title : 'Listing',
    date,
    time,
    type,
    buyerName: name,
    bookedAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  localStorage.setItem('hf_viewing_bookings', JSON.stringify(bookings));

  logCustomerActivity('Scheduled Viewing', `Viewing booked for ${prop ? prop.title : ''} on ${date} at ${time}`);
  closeAllModals();

  alert(`Viewing Reserved Successfully!\n\nProperty: ${prop ? prop.title : ''}\nDate: ${date}\nTime: ${time}\nType: ${type}\n\nOur certified agent will meet you at the premises. Confirmation SMS sent.`);
  showToast('Property viewing booked and recorded in your buyer account!');
}

// ==========================================================================
// Agent & Company Search Directory
// ==========================================================================
function renderAgents(agentsList) {
  const container = document.getElementById('agentGridContainer');
  if (!container) return;

  if (agentsList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
        No real estate agents or companies matched your search.
      </div>
    `;
    return;
  }

  container.innerHTML = agentsList.map(agent => `
    <div class="agent-card">
      <img src="${agent.avatar}" alt="${agent.name}" class="agent-avatar">
      <h3 class="agent-name">${agent.name}</h3>
      <div class="agent-company"><i class="fa-solid fa-building-circle-check"></i> ${agent.company}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">${agent.specialty}</div>

      <div class="agent-meta">
        <span class="agent-rating"><i class="fa-solid fa-star"></i> ${agent.rating} (${agent.reviewsCount})</span>
        <span>•</span>
        <span>${agent.activeListings} Active Listings</span>
      </div>

      <div style="display: flex; gap: 0.5rem;">
        <a href="tel:${agent.phone}" class="btn btn-outline btn-sm" style="flex: 1;" title="Call Agent">
          <i class="fa-solid fa-phone"></i> Call
        </a>
        <button class="btn btn-primary btn-sm" style="flex: 1.2;" onclick="openAgentInquiryModal('${agent.id}')">
          <i class="fa-regular fa-comment-dots"></i> Message
        </button>
      </div>
    </div>
  `).join('');
}

function handleAgentSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const filtered = AGENTS_DATA.filter(a => 
    a.name.toLowerCase().includes(query) || 
    a.company.toLowerCase().includes(query) || 
    a.specialty.toLowerCase().includes(query)
  );
  renderAgents(filtered);
}

function openAgentInquiryModal(agentId, propertyTitle = '') {
  const agent = AGENTS_DATA.find(a => a.id === agentId) || AGENTS_DATA[0];
  const currentBuyer = getCurrentBuyer();

  const modalBody = document.getElementById('agentInquiryModalBody');
  modalBody.innerHTML = `
    <form onsubmit="handleAgentInquirySubmit(event, '${agent.id}')">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; background: var(--bg-alt); padding: 1rem; border-radius: var(--radius-md);">
        <img src="${agent.avatar}" alt="${agent.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
        <div>
          <strong>${agent.name}</strong>
          <div style="font-size: 0.85rem; color: var(--accent);">${agent.company}</div>
        </div>
      </div>

      <div class="filter-group" style="margin-bottom: 1rem;">
        <label class="filter-label">Subject / Property of Interest</label>
        <input type="text" id="inquirySubject" class="input-control" value="${propertyTitle ? 'Inquiry regarding: ' + propertyTitle : 'General Property Inquiry'}" required>
      </div>

      <div class="filter-group" style="margin-bottom: 1rem;">
        <label class="filter-label">Your Message</label>
        <textarea id="inquiryMessage" class="input-control" rows="4" placeholder="Hello, I am interested in this listing and would like more details on pricing, HOA, and inspection..." required></textarea>
      </div>

      <div class="form-row-2" style="margin-bottom: 1.25rem;">
        <div class="filter-group">
          <label class="filter-label">Your Email</label>
          <input type="email" id="inquiryEmail" class="input-control" value="${currentBuyer ? currentBuyer.email : ''}" placeholder="buyer@example.com" required>
        </div>
        <div class="filter-group">
          <label class="filter-label">Your Phone</label>
          <input type="tel" id="inquiryPhone" class="input-control" value="${currentBuyer ? currentBuyer.phone || '' : ''}" placeholder="+1 (555) 000-0000" required>
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
        <i class="fa-regular fa-paper-plane"></i> Send Direct Inquiry to Agent
      </button>
    </form>
  `;

  document.getElementById('agentInquiryModal').classList.add('active');
}

function handleAgentInquirySubmit(e, agentId) {
  e.preventDefault();
  const subject = document.getElementById('inquirySubject').value;
  const agent = AGENTS_DATA.find(a => a.id === agentId);

  logCustomerActivity('Agent Contacted', `Sent inquiry to ${agent ? agent.name : ''}: "${subject}"`);
  closeAllModals();

  alert(`Your inquiry has been directly forwarded to ${agent ? agent.name : 'the agent'} at ${agent ? agent.company : 'the agency'}.\n\nYou will receive a prompt callback / email.`);
  showToast('Inquiry delivered to real estate agent!');
}

// ==========================================================================
// Interactive Mortgage Calculator Suite
// ==========================================================================
function setupMortgageCalculator() {
  const homePriceSlider = document.getElementById('calcHomePriceSlider');
  const downPaymentSlider = document.getElementById('calcDownPaymentSlider');
  const interestRateSlider = document.getElementById('calcInterestRateSlider');
  const loanTermSelect = document.getElementById('calcLoanTermSelect');

  if (!homePriceSlider) return;

  const updateCalc = () => {
    const homePrice = parseFloat(homePriceSlider.value);
    const downPercent = parseFloat(downPaymentSlider.value);
    const interestRate = parseFloat(interestRateSlider.value);
    const years = parseInt(loanTermSelect.value, 10);

    const downPayment = homePrice * (downPercent / 100);
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;

    // Monthly Principal & Interest: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPI = principal / numberOfPayments;
    }

    // Taxes & Insurance estimates
    const monthlyTax = (homePrice * 0.012) / 12; // 1.2% annual
    const monthlyInsurance = (homePrice * 0.005) / 12; // 0.5% annual
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;

    // Update UI elements
    document.getElementById('calcHomePriceLabel').textContent = `$${homePrice.toLocaleString()}`;
    document.getElementById('calcDownPaymentLabel').textContent = `${downPercent}% ($${Math.round(downPayment).toLocaleString()})`;
    document.getElementById('calcInterestRateLabel').textContent = `${interestRate.toFixed(2)}%`;
    document.getElementById('calcMonthlyTotal').textContent = `$${Math.round(totalMonthly).toLocaleString()}/mo`;

    // Update breakdown bar
    const piPercent = (monthlyPI / totalMonthly) * 100;
    const taxPercent = (monthlyTax / totalMonthly) * 100;
    const insPercent = (monthlyInsurance / totalMonthly) * 100;

    document.getElementById('barPni').style.width = `${piPercent}%`;
    document.getElementById('barTax').style.width = `${taxPercent}%`;
    document.getElementById('barIns').style.width = `${insPercent}%`;

    document.getElementById('calcPniVal').textContent = `$${Math.round(monthlyPI).toLocaleString()}`;
    document.getElementById('calcTaxVal').textContent = `$${Math.round(monthlyTax).toLocaleString()}`;
    document.getElementById('calcInsVal').textContent = `$${Math.round(monthlyInsurance).toLocaleString()}`;
  };

  homePriceSlider.addEventListener('input', updateCalc);
  downPaymentSlider.addEventListener('input', updateCalc);
  interestRateSlider.addEventListener('input', updateCalc);
  loanTermSelect.addEventListener('change', updateCalc);

  updateCalc();
}

// ==========================================================================
// Property Valuation Estimator Tool
// ==========================================================================
function calculatePropertyValuation() {
  const sqftInput = document.getElementById('valAreaSqft');
  const typeSelect = document.getElementById('valType');
  const locationTierSelect = document.getElementById('valLocationTier');
  const conditionSelect = document.getElementById('valCondition');

  if (!sqftInput) return;

  const sqft = parseFloat(sqftInput.value) || 2000;
  const baseRatePerSqft = {
    apartment: 420,
    villa: 480,
    land: 95,
    office: 510
  }[typeSelect.value] || 400;

  const locationMultiplier = {
    prime: 1.45,
    urban: 1.2,
    suburb: 1.0,
    emerging: 0.8
  }[locationTierSelect.value] || 1.0;

  const conditionMultiplier = {
    new: 1.25,
    excellent: 1.1,
    good: 1.0,
    renovation: 0.75
  }[conditionSelect.value] || 1.0;

  const estimatedValue = sqft * baseRatePerSqft * locationMultiplier * conditionMultiplier;
  const minRange = Math.round(estimatedValue * 0.95);
  const maxRange = Math.round(estimatedValue * 1.08);

  const displayEl = document.getElementById('valEstimatedPrice');
  if (displayEl) {
    displayEl.textContent = `$${minRange.toLocaleString()} - $${maxRange.toLocaleString()}`;
  }
}

// ==========================================================================
// Customer Visit Records & Analytics Modal
// ==========================================================================
function updateVisitorStatsWidget() {
  const { totalCount } = getVisitorRecords();
  const counterEl = document.getElementById('visitorCounterDisplay');
  if (counterEl) {
    counterEl.textContent = totalCount.toLocaleString();
  }
}

function openVisitorAnalyticsModal() {
  const { logs, totalCount } = getVisitorRecords();

  document.getElementById('analyticsTotalVisits').textContent = totalCount.toLocaleString();
  document.getElementById('analyticsTodayVisits').textContent = logs.length;
  
  // Calculate unique buyers
  const users = JSON.parse(localStorage.getItem('hf_database_users') || '[]');
  document.getElementById('analyticsRegisteredBuyers').textContent = users.length;

  const tableBody = document.getElementById('visitorLogsTableBody');
  if (tableBody) {
    tableBody.innerHTML = logs.slice(0, 30).map(log => `
      <tr>
        <td><strong>${log.timestamp.split(',')[1] || log.timestamp}</strong><br><small style="color: var(--text-subtle);">${log.timestamp.split(',')[0]}</small></td>
        <td><span style="font-family: monospace; color: var(--accent); font-weight: 700;">${log.visitorId}</span></td>
        <td><strong>${log.buyerName}</strong></td>
        <td>${log.ipAddress}</td>
        <td><span class="badge" style="background: var(--bg-alt); color: var(--text-main); font-size: 0.7rem;">${log.action}</span></td>
      </tr>
    `).join('');
  }

  document.getElementById('visitorAnalyticsModal').classList.add('active');
}

function exportVisitorLogs() {
  const { logs } = getVisitorRecords();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `homefinder_visitor_records_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Visitor records exported as JSON successfully.');
}

function clearVisitorLogs() {
  if (confirm('Are you sure you want to clear current visitor history?')) {
    localStorage.removeItem('hf_visitor_logs');
    openVisitorAnalyticsModal();
    showToast('Visitor logs cleared.');
  }
}

// ==========================================================================
// Generic Modal Helpers & Toast Notification System
// ==========================================================================
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent);"></i> <span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
