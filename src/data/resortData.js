import heroFrontImage from '../../images /image1.jpg'
import loopClipOne from '../../videos/WhatsApp Video 2026-04-11 at 20.06.34.mp4'
import loopClipTwo from '../../videos/WhatsApp Video 2026-04-11 at 20.06.35.mp4'
import loopClipThree from '../../videos/WhatsApp Video 2026-04-11 at 20.06.43.mp4'
import loopClipFour from '../../videos/WhatsApp Video 2026-04-11 at 20.06.44 (1).mp4'
import loopClipFive from '../../videos/WhatsApp Video 2026-04-11 at 20.06.44.mp4'
import normalImageOne from '../../normalimages/WhatsApp Image 2026-04-11 at 20.47.15.jpeg'
import normalImageTwo from '../../normalimages/WhatsApp Image 2026-04-11 at 20.31.23.jpeg'
import normalImageThree from '../../normalimages/WhatsApp Image 2026-04-11 at 20.48.33.jpeg'
import roomImageOne from '../../normalimages2/WhatsApp Image 2026-04-11 at 20.27.48.jpeg'
import roomImageTwo from '../../normalimages2/WhatsApp Image 2026-04-11 at 20.46.15.jpeg'
import roomImageThree from '../../normalimages2/WhatsApp Image 2026-04-11 at 20.47.15.jpeg'

export const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'menu', label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'booking', label: 'Book' },
]

export const roomCards = [
  {
    title: 'Lounge Suite',
    blurb: 'Warm lounge interiors with layered lighting and premium comfort.',
    image: roomImageOne,
  },
  {
    title: 'Poolside Escape',
    blurb: 'A serene pool-facing stay with relaxed outdoor seating.',
    image: roomImageTwo,
  },
  {
    title: 'Nature View Room',
    blurb: 'Calm views of open greens and natural daylight throughout the day.',
    image: roomImageThree,
  },
]

export const foodMenuSections = [
  {
    title: 'Starters',
    icon: '🥗',
    items: [
      { name: 'Crispy Veg Spring Roll', description: 'Served with sweet chili dip.', price: '₹180' },
      { name: 'Paneer Tikka Bites', description: 'Smoky tandoor-style cottage cheese.', price: '₹240' },
      { name: 'Chicken Popcorn Masala', description: 'Crispy chicken tossed in house spices.', price: '₹260' },
    ],
  },
  {
    title: 'Main Course',
    icon: '🍛',
    items: [
      { name: 'Dal Makhani', description: 'Slow-cooked black lentils with cream.', price: '₹230' },
      { name: 'Butter Chicken', description: 'Classic tomato-butter gravy with tender chicken.', price: '₹340' },
      { name: 'Veg Biryani', description: 'Fragrant basmati rice with seasonal vegetables.', price: '₹290' },
      { name: 'Tandoori Roti Basket', description: 'Assorted fresh breads from the tandoor.', price: '₹120' },
    ],
  },
  {
    title: 'Desserts & Drinks',
    icon: '�',
    items: [
      { name: 'Gulab Jamun', description: 'Warm syrup-soaked milk dumplings.', price: '₹110' },
      { name: 'Sizzling Brownie', description: 'Chocolate brownie with vanilla ice cream.', price: '₹190' },
      { name: 'Fresh Lime Soda', description: 'Sweet, salt, or mixed.', price: '₹90' },
    ],
  },
]

export const galleryImages = [
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
]

export const heroBackgroundImage = heroFrontImage

export const imageShowcaseSlots = [
  {
    title: 'Resort View 1',
    image: normalImageOne,
  },
  {
    title: 'Resort View 2',
    image: normalImageTwo,
  },
  {
    title: 'Resort View 3',
    image: normalImageThree,
  },
]

export const videoLoopSlots = [
  {
    title: 'Pool Atmosphere',
    video: loopClipOne,
  },
  {
    title: 'Nature Breeze',
    video: loopClipTwo,
  },
  {
    title: 'Evening Walk',
    video: loopClipThree,
  },
  {
    title: 'Sunset Reflection',
    video: loopClipFour,
  },
  {
    title: 'Garden Serenity',
    video: loopClipFive,
  },
]

export const resortHighlights = [
  {
    icon: '🛎️',
    title: '24/7 Assistance',
    text: 'Direct team support for booking, check-in help, and local guidance anytime.',
  },
  {
    icon: '🍽️',
    title: 'Curated Dining',
    text: 'Fresh regional and comfort meals served in a calm, family-friendly setting.',
  },
  {
    icon: '🏊',
    title: 'Private Leisure Zones',
    text: 'Poolside lounging, open decks, and quiet corners designed for relaxed stays.',
  },
  {
    icon: '🚗',
    title: 'Easy Access Location',
    text: 'Conveniently placed near Aron Road with simple arrival and smooth parking access.',
  },
]
