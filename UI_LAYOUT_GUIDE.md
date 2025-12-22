# 🖼️ CARELYTICS FRONTEND - UI LAYOUT GUIDE

## Hospital Monitoring Dashboard (http://localhost:5175)

### Header Section
```
┌────────────────────────────────────────────────────────────────┐
│ 🏥 CARELYTICS                  🔄 Refresh  [Profile Dropdown] │
│                                                                │
│ Hospital Management                                            │
│ Real-time monitoring of all hospitals                         │
└────────────────────────────────────────────────────────────────┘
```

### Statistics Bar
```
┌─────────────────┬──────────────┬─────────────────┬─────────────┐
│  🏥 Hospitals   │ 🛏️  Beds    │ 🚑 Ambulances   │ 🩸 Blood   │
│                 │              │                 │             │
│  Count: 5       │ Total: 450   │ Total: 40       │ Units: 500  │
└─────────────────┴──────────────┴─────────────────┴─────────────┘
```

### Filter/Control Bar
```
┌────────────────────────────────────────────────────────────────┐
│ [All Hospitals] [Active] [Filter]     🔄 Refresh               │
└────────────────────────────────────────────────────────────────┘
```

### Hospital Cards Grid (2 Columns)

```
Left Column                          Right Column

┌──────────────────────────┐        ┌──────────────────────────┐
│ City Hospital            │        │ General Hospital         │
│ ID: city-001             │        │ ID: general-001          │
├──────────────────────────┤        ├──────────────────────────┤
│ 📍 Location              │        │ 📍 Location              │
│ 123 Main Street          │        │ 456 Oak Avenue           │
│                          │        │                          │
│ 🛏️  Beds: 45/100         │        │ 🛏️  Beds: 60/120        │
│ 🚑 Ambulances: 8/10      │        │ 🚑 Ambulances: 10/12     │
│                          │        │                          │
│ 💊 Medicine: 25 types    │        │ 💊 Medicine: 30 types    │
│ 🩸 Blood Bank:           │        │ 🩸 Blood Bank:           │
│ A+: 10  A-: 5  B+: 8     │        │ A+: 15  A-: 7  B+: 12    │
│ B-: 3   O+: 15  O-: 7    │        │ B-: 4   O+: 20  O-: 10   │
│                          │        │                          │
│ 👨‍⚕️  Doctors: 15          │        │ 👨‍⚕️  Doctors: 25          │
│ 👥 Patients: 120         │        │ 👥 Patients: 180         │
│                          │        │                          │
│ Updated: 14:30:45        │        │ Updated: 14:30:42        │
├──────────────────────────┤        ├──────────────────────────┤
│ 👁️  View Details          │        │ 👁️  View Details         │
└──────────────────────────┘        └──────────────────────────┘

┌──────────────────────────┐        ┌──────────────────────────┐
│ Medical Center Hospital  │        │ Care Plus Hospital       │
│ ID: medical-001          │        │ ID: careplus-001         │
├──────────────────────────┤        ├──────────────────────────┤
│ [Same layout as above]   │        │ [Same layout as above]   │
└──────────────────────────┘        └──────────────────────────┘
```

### Expanded Hospital Details View

```
┌────────────────────────────────────────────────────────────────┐
│  City Hospital - Full Details                          [✕]    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Basic Information              Resources Overview            │
│  ──────────────────             ──────────────────            │
│  Hospital Name                  Available Beds: 45            │
│  City Hospital                                                │
│                                 Available Ambulances: 8        │
│  Hospital ID                                                  │
│  city-001                       Medicine Types: 25            │
│                                                                │
│  Address                        Doctors: 15                   │
│  123 Main Street                                              │
│                                                                │
│  Created On                                                   │
│  Dec 6, 2024                                                  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  💊 Medicine Stock Details                                    │
│  ─────────────────────────────                               │
│  ┌─────────────────────┬──────────────┐                       │
│  │ Medicine Name       │ Quantity     │                       │
│  ├─────────────────────┼──────────────┤                       │
│  │ Paracetamol         │ 500 units    │                       │
│  │ Ibuprofen           │ 300 units    │                       │
│  │ Amoxicillin         │ 200 units    │                       │
│  │ Aspirin             │ 400 units    │                       │
│  │ Metformin           │ 150 units    │                       │
│  │ Lisinopril          │ 100 units    │                       │
│  └─────────────────────┴──────────────┘                       │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🩸 Blood Bank Inventory                                      │
│  ────────────────────────                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                              │
│  │ A+  │ │ A-  │ │ B+  │ │ B-  │                              │
│  │ 10  │ │  5  │ │  8  │ │  3  │                              │
│  │unit │ │unit │ │unit │ │unit │                              │
│  └─────┘ └─────┘ └─────┘ └─────┘                              │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                              │
│  │ O+  │ │ O-  │ │AB+  │ │AB-  │                              │
│  │ 15  │ │  7  │ │  2  │ │  1  │                              │
│  │unit │ │unit │ │unit │ │unit │                              │
│  └─────┘ └─────┘ └─────┘ └─────┘                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Sidebar Navigation

```
┌──────────────────────┐
│ 🏥 CARELYTICS        │
├──────────────────────┤
│ 📊 Dashboard         │
│ 🏥 Hospitals         │  ← Active/Highlighted
│ 🛏️  Beds             │
│ 💊 Medicine Stock    │
│ 🩸 Blood Units       │
│ 🚑 Ambulances        │
│ 👨‍⚕️  Doctors          │
│ 👥 Patients          │
│ 📈 Analytics         │
├──────────────────────┤
│ 🚪 Logout            │
└──────────────────────┘
```

### Navbar (Top Right)

```
┌─────────────────────────────────────────────┐
│ 🟢 Live    Admin User          [Profile ▼]  │
│           admin@care.com                    │
└─────────────────────────────────────────────┘
                                  │
                                  ▼
                        ┌──────────────────┐
                        │ Admin User       │
                        │ admin@care.com   │
                        ├──────────────────┤
                        │ 🚪 Logout        │
                        └──────────────────┘
```

### Bottom Right Corner

```
┌──────────────────────────┐
│ 🟢 Real-time sync active │
└──────────────────────────┘
```

---

## Login Page (http://localhost:5175)

```
                    ┌────────────────────────────────────┐
                    │   🏥 CARELYTICS                    │
                    │   Hospital Management System       │
                    ├────────────────────────────────────┤
                    │                                    │
                    │   ADMIN LOGIN                      │
                    │                                    │
                    │ Email Address                      │
                    │ [admin@care.com            ]       │
                    │                                    │
                    │ Password                           │
                    │ [••••••••                 ]        │
                    │                                    │
                    │        [   LOGIN   ]               │
                    │                                    │
                    │ Default Credentials:               │
                    │ Email: admin@care.com             │
                    │ Password: admin123                │
                    │                                    │
                    └────────────────────────────────────┘
```

---

## Responsive Design

### Mobile (< 640px)

```
┌──────────────┐
│🏥 CARELYTICS│ (Title only)
├──────────────┤
│ 📊 Hospitals │ (Single column)
├──────────────┤
│[Hospital 1] │
│ City: X      │
│ Beds: 45/100 │
│ [Details]    │
│              │
│[Hospital 2] │
│ City: Y      │
│ Beds: 60/120 │
│ [Details]    │
│              │
└──────────────┘
```

### Tablet (640px - 1024px)

```
┌────────────────────────────────┐
│ 🏥 CARELYTICS   [Profile] 🔄   │
├────────────────────────────────┤
│ [Stats 2x2 grid]               │
│ [Hospital 1]  [Hospital 2]     │
│ [Hospital 3]  [Hospital 4]     │
│              [Details View]    │
└────────────────────────────────┘
```

### Desktop (> 1024px)

```
┌─────────────────────────────────────────────────────┐
│ ┌────────────┐ 🏥 CARELYTICS         [Profile] 🔄   │
│ │ 📊 Dashboard│├─────────────────────────────────────┤
│ │ 🏥 Hospitals│ [Stats 1x4 bar]                      │
│ │ 🛏️  Beds    │ [Hospital 1]  [Hospital 2]          │
│ │ 💊 Medicine │ [Hospital 3]  [Hospital 4]          │
│ │ 🩸 Blood    │                                      │
│ │ 🚑 Ambulance│ [Full Details View]                  │
│ │ 👨‍⚕️  Doctors │                                      │
│ │ 👥 Patients │                                      │
│ │ 📈 Analytics│                                      │
│ │ 🚪 Logout   │                                      │
│ └────────────┘└─────────────────────────────────────┘
└─────────────────────────────────────────────────────┘
```

---

## Color Scheme

```
Primary: Blue
├─ Dark Blue (#1e3a8a) - Sidebar background
├─ Blue (#2563eb) - Active states, buttons
└─ Light Blue (#eff6ff) - Card backgrounds

Status Indicators:
├─ Green (#22c55e) - Available, active, healthy
├─ Yellow (#eab308) - Medicine, low stock warning
├─ Red (#ef4444) - Unavailable, emergency
└─ Purple (#9333ea) - Blood bank info

Text:
├─ Dark Gray (#1f2937) - Headings
├─ Gray (#4b5563) - Body text
└─ Light Gray (#9ca3af) - Secondary text
```

---

## Animation & Interactions

### Card Hover Effect
```
Normal State          Hover State
┌────────────────┐   ┌────────────────┐
│ Hospital Card  │   │ Hospital Card  │  ← Elevated
│                │ → │ (shadow larger)│
└────────────────┘   └────────────────┘
```

### Real-time Indicator
```
🟢 Pulsing green dot
└─ Indicates active sync
```

### Expand/Collapse
```
👁️ View Details    (Click)     ✕ Hide Details
│                                      │
└─────> Details expand below <─────────┘
```

### Loading State
```
┌────────────────────┐
│  ↻ Loading...      │ (Spinning icon)
│                    │
│ Please wait...     │
└────────────────────┘
```

### Button States
```
Normal:     [  Button  ]
Hover:      [  Button  ]  (Color change)
Active:     [  Button  ]  (Darker shade)
Disabled:   [  Button  ]  (Faded)
Loading:    [ ↻ Loading]  (Spinner)
```

---

## Data Display Examples

### Hospital Card (Collapsed)
```
┌─ Blue Header ─────────────────────────┐
│ City Hospital                         │
│ ID: city-001                          │
├───────────────────────────────────────┤
│ 📍 123 Main Street                    │
│                                       │
│ 🛏️  Beds: 45/100    🚑 Ambulances:8/10│
│                                       │
│ 💊 Medicine: 25 types                │
│ 🩸 Blood: A+ A- B+ B- O+ O- AB+ AB-  │
│                                       │
│ 👨‍⚕️  Doctors: 15    👥 Patients: 120   │
│ Updated: 14:30:45                     │
├───────────────────────────────────────┤
│ 👁️  View Details                       │
└───────────────────────────────────────┘
```

### Hospital Card (Expanded - Inline)
```
[All fields become visible with borders]
- Location displayed as full text
- Medicine list shows first 3 items
- Blood count shown for each type
```

### Full Details Modal
```
[White card takes full width]
- Two-column layout
- Left: Basic info, timestamps
- Right: Resource overview with numbers
- Below: Tables with detailed data
- Medicine list in table format
- Blood bank displayed in grid
```

---

## User Interactions

### Viewing All Hospitals
1. Click "🏥 Hospitals" in sidebar
2. See grid of hospital cards
3. View key information at a glance
4. Statistics at top

### Getting Hospital Details
1. Click on hospital card
2. Card expands to show details
3. Click again to collapse
4. Or click "View Details" button

### Real-time Monitoring
1. Data refreshes every 5 seconds
2. Timestamps update automatically
3. Values change in real-time
4. Green "Live" indicator shows

### Filtering (Future)
1. Click filter buttons
2. Show only specific hospitals
3. Or "All Hospitals"

### Manual Refresh
1. Click "🔄 Refresh" button
2. Immediate data fetch
3. All cards update
4. Useful for urgent updates

---

## Accessibility Features

✅ Clear labels for all inputs
✅ High contrast colors
✅ Large clickable areas
✅ Keyboard navigation support
✅ Loading state feedback
✅ Error messages clear
✅ Touch-friendly on mobile
✅ Proper font sizes

---

## Performance Optimizations

✅ Minimal re-renders
✅ Efficient data fetching
✅ Lazy loading images
✅ CSS minification
✅ JavaScript bundling
✅ Asset compression
✅ Local storage for tokens
✅ Debounced searches

---

## Responsive Typography

```
Heading 1: 30px (h1)
Heading 2: 24px (h2)
Heading 3: 20px (h3)
Body:      16px
Label:     14px
Small:     12px
```

---

## Spacing & Layout

```
Card Padding:     24px
Component Margin: 16px
Grid Gap:         24px (desktop), 16px (tablet)
Sidebar Width:    256px
Content Padding:  24px
```

---

**This visual layout is fully responsive and works on:**
- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop monitors

**All UI elements are:**
- ✅ Accessible
- ✅ Responsive
- ✅ Interactive
- ✅ Animated
- ✅ User-friendly
