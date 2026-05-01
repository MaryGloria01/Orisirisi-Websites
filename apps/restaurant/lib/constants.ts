export const SITE = {
  name:     'Orisirisi African Restaurant',
  tagline:  'Every Meal is a Journey Through Africa',
  location: 'Kigali, Rwanda',
  phone:    '+250 XXX XXX XXX',
  email:    'hello@orisirisiafricanrestaurant.com',
  address:  'Kigali, Rwanda',
  parentUrl:'https://orisirisiafrica.com',
  hubUrl:   'https://afrixpressions.com',
} as const

export const NAV_LINKS = [
  { label: 'Home',    href: '/home' },
  { label: 'Menu',    href: '/menu' },
  { label: 'Book',    href: '/book' },
  { label: 'Events',  href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const SIGNATURE_DISHES = [
  {
    id: 'jollof',
    name: 'Jollof Rice',
    country: 'Nigeria',
    countryCode: 'NG',
    region: 'West Africa',
    description: 'The crown jewel of West African cuisine — smoky, spiced, slow-cooked in a rich tomato base with aromatic herbs.',
    gradient: 'from-[#8B2500] via-[#C0392B] to-[#E74C3C]',
  },
  {
    id: 'nyama-choma',
    name: 'Nyama Choma',
    country: 'Rwanda / Tanzania',
    countryCode: 'RW',
    region: 'East Africa',
    description: 'Slow-roasted goat, marinated in East African spices, chargrilled over open flame — a celebration in every bite.',
    gradient: 'from-[#3D1C02] via-[#7B3F00] to-[#A0522D]',
  },
  {
    id: 'egusi',
    name: 'Egusi Soup',
    country: 'Nigeria',
    countryCode: 'NG',
    region: 'West Africa',
    description: 'Ground melon seeds slow-cooked with palm oil, leafy greens, assorted meats and bold native spices.',
    gradient: 'from-[#1A3A00] via-[#2D5A00] to-[#3A7A00]',
  },
  {
    id: 'tagine',
    name: 'Lamb Tagine',
    country: 'Morocco',
    countryCode: 'MA',
    region: 'North Africa',
    description: 'Tender lamb slow-braised with aromatic ras el hanout, preserved lemon, green olives and honey.',
    gradient: 'from-[#2A1A00] via-[#5C3A00] to-[#8B5E00]',
  },
  {
    id: 'kenkey',
    name: 'Kenkey & Fried Fish',
    country: 'Ghana',
    countryCode: 'GH',
    region: 'West Africa',
    description: 'Fermented cornmeal dumpling paired with whole fried fish and fiery pepper-groundnut soup that warms the soul.',
    gradient: 'from-[#001A3A] via-[#003D7A] to-[#0066CC]',
  },
  {
    id: 'pepper-soup',
    name: 'Pepper Soup',
    country: 'Nigeria / Cameroon',
    countryCode: 'NG',
    region: 'West Africa',
    description: 'A bold, intensely aromatic broth of goat meat or fish, simmered with native spices and fresh herbs.',
    gradient: 'from-[#4A0000] via-[#8B0000] to-[#B22222]',
  },
] as const

export const DINING_OPTIONS = [
  {
    id: 'regular',
    title: 'Regular Dining',
    description: 'Book your table for a curated a la carte experience through the continent.',
    icon: 'UtensilsCrossed',
    gradient: 'from-[#FFF8F0] to-[#FFF0DC]',
  },
  {
    id: 'buffet',
    title: 'Daily Buffets',
    description: 'An ever-changing selection of African dishes served fresh throughout the day.',
    icon: 'ChefHat',
    gradient: 'from-[#F0FFF4] to-[#E0F5E8]',
  },
  {
    id: 'drinks',
    title: 'Drinks & Grill',
    description: 'Fresh-pressed juices, herbal teas, smoothies and open-flame grilled specialities.',
    icon: 'Wine',
    gradient: 'from-[#FFF9F0] to-[#FFF3DC]',
  },
  {
    id: 'themed',
    title: 'Themed Buffets',
    description: 'Monthly immersive dining journeys spotlighting a different African subregion.',
    icon: 'Globe',
    gradient: 'from-[#FFFBF0] to-[#FFF5D6]',
  },
  {
    id: 'cultural',
    title: 'Cultural Shows',
    description: 'Live music, dance and storytelling performances that bring the meal to life.',
    icon: 'Music2',
    gradient: 'from-[#F8F0FF] to-[#EDE0FF]',
  },
  {
    id: 'festival',
    title: 'Afri-Food Festival',
    description: 'Our signature annual celebration — 54 cuisines, one unforgettable weekend.',
    icon: 'Star',
    gradient: 'from-[#FFFBF0] to-[#FFF0D6]',
  },
] as const

export const THEMED_BUFFETS = [
  { id: 'west',    label: 'West Africa',    color: '#E67E22', countries: 'Nigeria · Ghana · Senegal · Côte d\'Ivoire',    dishes: ['Jollof Rice', 'Egusi Soup', 'Kelewele', 'Thiéboudienne'] },
  { id: 'east',    label: 'East Africa',    color: '#27AE60', countries: 'Rwanda · Kenya · Tanzania · Ethiopia',           dishes: ['Nyama-Choma', 'Injera', 'Pilau', 'Matoke'] },
  { id: 'north',   label: 'North Africa',   color: '#C0392B', countries: 'Morocco · Egypt · Tunisia · Algeria',            dishes: ['Tagine', 'Couscous', 'Shakshuka', 'Bastilla'] },
  { id: 'south',   label: 'Southern Africa',color: '#8E44AD', countries: 'South Africa · Zimbabwe · Zambia · Botswana',   dishes: ['Braai', 'Pap & Chakalaka', 'Biltong', 'Umngqusho'] },
  { id: 'central', label: 'Central Africa', color: '#2980B9', countries: 'DR Congo · Cameroon · Gabon · Chad',             dishes: ['Ndolé', 'Saka-Saka', 'Koki', 'Poulet DG'] },
  { id: 'diaspora',label: 'The Diaspora',   color: '#F7941D', countries: 'Caribbean · Americas · Europe · Global African', dishes: ['Jerk Chicken', 'Egusi Remix', 'Afro Fusion', 'Soul Food'] },
] as const

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Amara Osei',
    country: 'Ghana',
    flag: 'GH',
    role: 'Food writer & cultural traveller',
    quote: 'Walking into Orisirisi felt like stepping onto the continent itself. The Kenkey brought me straight back to Accra. This is not just a restaurant — it is a cultural institution.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophie Laurent',
    country: 'France',
    flag: 'FR',
    role: 'International journalist',
    quote: 'I have dined at Michelin-starred restaurants worldwide. Orisirisi gave me something none of them could — a story with every single dish. Extraordinary.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Tendai Moyo',
    country: 'Zimbabwe',
    flag: 'ZW',
    role: 'Business executive, Kigali',
    quote: 'The themed buffets are a masterpiece. East Africa month took me on a journey I did not expect to go on over dinner. My guests still talk about it months later.',
    rating: 5,
  },
] as const

export const AFRICA_REGIONS = [
  {
    id: 'west',
    label: 'West Africa',
    color: '#E67E22',
    description: 'Bold, layered flavours. The spiritual home of Jollof.',
    dishCount: 14,
    countries: 16,
  },
  {
    id: 'east',
    label: 'East Africa',
    color: '#27AE60',
    description: 'Smoky grills, aromatic stews and ancient grain traditions.',
    dishCount: 11,
    countries: 13,
  },
  {
    id: 'north',
    label: 'North Africa',
    color: '#C0392B',
    description: 'Slow-cooked tagines, warm spices and saffron elegance.',
    dishCount: 9,
    countries: 7,
  },
  {
    id: 'south',
    label: 'Southern Africa',
    color: '#8E44AD',
    description: 'The braai culture, hearty stews and fermented brilliance.',
    dishCount: 8,
    countries: 10,
  },
  {
    id: 'central',
    label: 'Central Africa',
    color: '#2980B9',
    description: 'Rich forest flavours, smoked fish and vibrant stews.',
    dishCount: 7,
    countries: 9,
  },
] as const
