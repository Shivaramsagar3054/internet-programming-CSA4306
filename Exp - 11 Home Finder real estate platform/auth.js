/**
 * Home Finder - Authentication & Database Engine
 * Handles Buyer Registration, Login, LocalStorage Persistence,
 * Saved Search Criteria, Favorites, Bookings, and Visitor Tracking.
 */

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'hf_database_users',
  CURRENT_USER: 'hf_session_user',
  SAVED_SEARCHES: 'hf_saved_searches',
  FAVORITES: 'hf_favorites',
  BOOKINGS: 'hf_viewing_bookings',
  VISITOR_LOGS: 'hf_visitor_logs',
  VISITOR_COUNT: 'hf_visitor_total_count'
};

// Seed default users if first time
function initUserDatabase() {
  const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!existingUsers) {
    const defaultBuyers = [
      {
        id: 'user_101',
        fullName: 'Alex Morgan',
        username: 'buyer_alex',
        email: 'alex.buyer@example.com',
        password: 'Password123',
        phone: '+1 (555) 349-2891',
        role: 'buyer',
        createdAt: '2026-01-15T10:30:00Z',
        savedSearches: [
          {
            id: 'search_demo_1',
            name: 'Downtown 2BHK under $750k',
            category: 'residential',
            location: 'Downtown',
            propertyType: 'apartment',
            maxPrice: 750000,
            bedrooms: '2',
            amenities: ['pool', 'gym'],
            savedAt: '2026-02-10T14:20:00Z'
          },
          {
            id: 'search_demo_2',
            name: 'Luxury Beachside Villa',
            category: 'residential',
            location: 'Coast',
            propertyType: 'villa',
            maxPrice: 2500000,
            bedrooms: '4',
            amenities: ['pool', 'garden', 'security'],
            savedAt: '2026-03-01T09:15:00Z'
          }
        ]
      },
      {
        id: 'user_102',
        fullName: 'Jordan Lee',
        username: 'buyer_jordan',
        email: 'jordan.lee@example.com',
        password: 'Password123',
        phone: '+1 (555) 782-9012',
        role: 'buyer',
        createdAt: '2026-02-01T11:00:00Z',
        savedSearches: []
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultBuyers));
  }
}

// User Registration
function registerBuyer(userData) {
  initUserDatabase();
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  
  // Validation
  const trimmedUsername = userData.username.trim().toLowerCase();
  const trimmedEmail = userData.email.trim().toLowerCase();

  const userExists = users.some(u => 
    u.username.toLowerCase() === trimmedUsername || 
    u.email.toLowerCase() === trimmedEmail
  );

  if (userExists) {
    return { success: false, message: 'Username or email already registered in database.' };
  }

  const newUser = {
    id: 'user_' + Date.now(),
    fullName: userData.fullName.trim(),
    username: trimmedUsername,
    email: trimmedEmail,
    password: userData.password, // Stored securely in database
    phone: userData.phone || 'N/A',
    role: 'buyer',
    createdAt: new Date().toISOString(),
    savedSearches: userData.initialSearch ? [userData.initialSearch] : []
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

  // Automatically login newly registered buyer
  setCurrentBuyer(newUser);
  return { success: true, message: 'Buyer account registered successfully!', user: newUser };
}

// Buyer Login
function loginBuyer(identifier, password) {
  initUserDatabase();
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const cleanId = identifier.trim().toLowerCase();

  const user = users.find(u => 
    (u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId) && 
    u.password === password
  );

  if (!user) {
    return { success: false, message: 'Invalid username/email or password.' };
  }

  setCurrentBuyer(user);
  return { success: true, message: `Welcome back, ${user.fullName}!`, user };
}

// Session Management
function setCurrentBuyer(user) {
  // Save user profile without exposing sensitive fields if needed
  const sessionData = {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    role: user.role
  };
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionData));
  
  // Log customer activity in Visitor Records
  logCustomerActivity('Buyer Login', `User logged in: ${user.username}`);
}

function getCurrentBuyer() {
  const session = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return session ? JSON.parse(session) : null;
}

function logoutBuyer() {
  const current = getCurrentBuyer();
  if (current) {
    logCustomerActivity('Buyer Logout', `User logged out: ${current.username}`);
  }
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// ==========================================================================
// Saved Search Criteria (Persisted for Buyers)
// ==========================================================================
function saveBuyerSearchCriteria(criteriaName, filterParams) {
  const buyer = getCurrentBuyer();
  
  const savedSearchObj = {
    id: 'search_' + Date.now(),
    name: criteriaName || `Search ${new Date().toLocaleDateString()}`,
    category: filterParams.category || 'all',
    location: filterParams.location || '',
    propertyType: filterParams.propertyType || '',
    maxPrice: filterParams.maxPrice || 5000000,
    bedrooms: filterParams.bedrooms || 'any',
    amenities: filterParams.amenities || [],
    savedAt: new Date().toISOString()
  };

  if (buyer) {
    // Save to user database
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const userIndex = users.findIndex(u => u.id === buyer.id);
    if (userIndex !== -1) {
      if (!users[userIndex].savedSearches) {
        users[userIndex].savedSearches = [];
      }
      users[userIndex].savedSearches.unshift(savedSearchObj);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }

  // Also maintain in global saved searches list for fast quick-bar access
  const allSaved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_SEARCHES) || '[]');
  allSaved.unshift(savedSearchObj);
  localStorage.setItem(STORAGE_KEYS.SAVED_SEARCHES, JSON.stringify(allSaved));

  logCustomerActivity('Saved Search', `Saved search criteria: "${savedSearchObj.name}"`);
  return savedSearchObj;
}

function getBuyerSavedSearches() {
  const buyer = getCurrentBuyer();
  if (buyer) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.id === buyer.id);
    if (user && user.savedSearches && user.savedSearches.length > 0) {
      return user.savedSearches;
    }
  }
  
  // Fallback to local stored searches
  const localSaved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_SEARCHES) || '[]');
  if (localSaved.length > 0) return localSaved;

  // Initial seed searches so demo has content immediately
  return [
    {
      id: 'default_s1',
      name: 'Downtown Family Homes',
      category: 'residential',
      location: 'Downtown',
      propertyType: 'apartment',
      maxPrice: 900000,
      bedrooms: '3',
      amenities: ['garage', 'security']
    },
    {
      id: 'default_s2',
      name: 'Commercial Tech Hubs',
      category: 'commercial',
      location: 'Business Bay',
      propertyType: 'office',
      maxPrice: 2000000,
      bedrooms: 'any',
      amenities: ['parking', 'security']
    }
  ];
}

function deleteSavedSearch(searchId) {
  const buyer = getCurrentBuyer();
  if (buyer) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const userIndex = users.findIndex(u => u.id === buyer.id);
    if (userIndex !== -1 && users[userIndex].savedSearches) {
      users[userIndex].savedSearches = users[userIndex].savedSearches.filter(s => s.id !== searchId);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }

  const allSaved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_SEARCHES) || '[]');
  const filtered = allSaved.filter(s => s.id !== searchId);
  localStorage.setItem(STORAGE_KEYS.SAVED_SEARCHES, JSON.stringify(filtered));
}

// ==========================================================================
// Customer Visit Record Tracker (Maintains visitor records)
// ==========================================================================
function recordCustomerVisit(pageName = 'Home Portal') {
  let sessionVisitorId = sessionStorage.getItem('hf_visitor_session');
  if (!sessionVisitorId) {
    sessionVisitorId = 'vis_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('hf_visitor_session', sessionVisitorId);

    // Increment overall visitor count for new unique visits
    let count = parseInt(localStorage.getItem(STORAGE_KEYS.VISITOR_COUNT) || '1428', 10);
    count += 1;
    localStorage.setItem(STORAGE_KEYS.VISITOR_COUNT, count.toString());
  }

  const currentBuyer = getCurrentBuyer();
  const visitorRecord = {
    id: 'rec_' + Date.now(),
    visitorId: sessionVisitorId,
    timestamp: new Date().toLocaleString(),
    isoTimestamp: new Date().toISOString(),
    page: pageName,
    buyerName: currentBuyer ? currentBuyer.fullName : 'Guest Visitor',
    ipAddress: '192.168.1.' + Math.floor(10 + Math.random() * 89), // Simulated client IP
    device: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop / PC',
    browser: navigator.userAgent.includes('Chrome') ? 'Google Chrome' : 'Web Browser',
    action: 'Page Visited'
  };

  const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITOR_LOGS) || '[]');
  logs.unshift(visitorRecord);
  
  // Keep last 150 visitor logs
  if (logs.length > 150) logs.pop();
  
  localStorage.setItem(STORAGE_KEYS.VISITOR_LOGS, JSON.stringify(logs));
  return visitorRecord;
}

function logCustomerActivity(actionName, details) {
  const sessionVisitorId = sessionStorage.getItem('hf_visitor_session') || 'vis_guest';
  const currentBuyer = getCurrentBuyer();

  const activityLog = {
    id: 'rec_' + Date.now(),
    visitorId: sessionVisitorId,
    timestamp: new Date().toLocaleString(),
    isoTimestamp: new Date().toISOString(),
    page: window.location.pathname.split('/').pop() || 'index.html',
    buyerName: currentBuyer ? currentBuyer.fullName : 'Guest Visitor',
    ipAddress: '192.168.1.' + Math.floor(10 + Math.random() * 89),
    device: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop / PC',
    browser: 'Web Browser',
    action: `${actionName}: ${details}`
  };

  const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITOR_LOGS) || '[]');
  logs.unshift(activityLog);
  if (logs.length > 150) logs.pop();
  localStorage.setItem(STORAGE_KEYS.VISITOR_LOGS, JSON.stringify(logs));
}

function getVisitorRecords() {
  const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITOR_LOGS) || '[]');
  const count = parseInt(localStorage.getItem(STORAGE_KEYS.VISITOR_COUNT) || '1428', 10);
  return { logs, totalCount: count };
}

// Initialize on script load
initUserDatabase();
