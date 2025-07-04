// src/data/festivalTemplatesData.js
export const festivalTemplatesData = [
  {
    id: 'diwali-special-1',
    name: 'Diwali Special',
    category: 'festival',
    type: 'Holiday Promotion',
    description: 'Bright and festive Diwali template with traditional elements and vibrant colors.',
    images: [
      '/src/assets/images/templates/diwali-main.jpg',
      '/src/assets/images/templates/diwali-alt1.jpg',
      '/src/assets/images/templates/diwali-alt2.jpg'
    ],
    thumbnail: '/src/assets/images/templates/diwali-thumb.jpg',
    promotionalText: {
      title: 'Diwali Special Offers',
      subtitle: 'Light up your celebrations',
      description: 'Celebrate the festival of lights with amazing discounts and offers.',
      callToAction: 'Shop Now',
      discount: '50% OFF',
      validUntil: 'Limited Time Offer'
    },
    designElements: {
      primaryColor: '#FFD700',
      secondaryColor: '#FF6B35',
      backgroundColor: '#1A1A2E',
      fontFamily: 'Inter',
      fontSize: {
        title: '2.5rem',
        subtitle: '1.5rem',
        body: '1rem'
      }
    },
    tags: ['diwali', 'festival', 'indian', 'celebration', 'lights'],
    isTrending: true,
    createdAt: '2024-10-15',
    updatedAt: '2024-12-20'
  },
  {
    id: 'christmas-sale-1',
    name: 'Christmas Sale',
    category: 'holiday',
    type: 'Seasonal Sale',
    description: 'Festive Christmas template with yogmilk products and holiday spirit.',
    images: [
      '/src/assets/images/templates/christmas-main.jpg',
      '/src/assets/images/templates/christmas-alt1.jpg',
      '/src/assets/images/templates/christmas-alt2.jpg'
    ],
    thumbnail: '/src/assets/images/templates/christmas-thumb.jpg',
    promotionalText: {
      title: 'Fresh Yogmilk',
      subtitle: 'Christmas Special Edition',
      description: 'Yogmilk Dark Creamy delicious and refreshing. Perfect for the holiday season.',
      callToAction: 'Order Now',
      discount: '15% OFF',
      validUntil: 'Until Christmas'
    },
    designElements: {
      primaryColor: '#E74C3C',
      secondaryColor: '#27AE60',
      backgroundColor: '#F8F9FA',
      fontFamily: 'Poppins',
      fontSize: {
        title: '3rem',
        subtitle: '1.8rem',
        body: '1.1rem'
      }
    },
    tags: ['christmas', 'holiday', 'yogmilk', 'dairy', 'winter'],
    isTrending: true,
    createdAt: '2024-11-01',
    updatedAt: '2024-12-18'
  },
  {
    id: 'new-year-celebration-1',
    name: 'New Year Celebration',
    category: 'festival',
    type: 'New Year Promo',
    description: 'Modern and elegant New Year template with tech products and midnight blue theme.',
    images: [
      '/src/assets/images/templates/newyear-main.jpg',
      '/src/assets/images/templates/newyear-alt1.jpg',
      '/src/assets/images/templates/newyear-alt2.jpg'
    ],
    thumbnail: '/src/assets/images/templates/newyear-thumb.jpg',
    promotionalText: {
      title: 'New Year Celebration',
      subtitle: 'Start 2025 with the best tech',
      description: 'Premium wireless earbuds for your new year resolutions and goals.',
      callToAction: 'Get Started',
      discount: 'Special Price',
      validUntil: 'New Year Offer'
    },
    designElements: {
      primaryColor: '#3498DB',
      secondaryColor: '#9B59B6',
      backgroundColor: '#2C3E50',
      fontFamily: 'Roboto',
      fontSize: {
        title: '2.8rem',
        subtitle: '1.6rem',
        body: '1rem'
      }
    },
    tags: ['new year', 'tech', 'wireless', 'earbuds', 'celebration'],
    isTrending: true,
    createdAt: '2024-12-01',
    updatedAt: '2024-12-25'
  },
  {
    id: 'valentines-day-1',
    name: "Valentine's Day",
    category: 'holiday',
    type: 'Romance Special',
    description: 'Romantic Valentine\'s Day template with beauty products and warm colors.',
    images: [
      '/src/assets/images/templates/valentine-main.jpg',
      '/src/assets/images/templates/valentine-alt1.jpg',
      '/src/assets/images/templates/valentine-alt2.jpg'
    ],
    thumbnail: '/src/assets/images/templates/valentine-thumb.jpg',
    promotionalText: {
      title: "Valentine's Day Special",
      subtitle: 'For the one you love',
      description: 'Premium skincare and beauty products to make your loved one feel special.',
      callToAction: 'Shop Love',
      discount: 'Buy 1 Get 1',
      validUntil: 'February 14th'
    },
    designElements: {
      primaryColor: '#E91E63',
      secondaryColor: '#F06292',
      backgroundColor: '#FFF3E0',
      fontFamily: 'Playfair Display',
      fontSize: {
        title: '2.6rem',
        subtitle: '1.4rem',
        body: '1rem'
      }
    },
    tags: ['valentine', 'romance', 'beauty', 'skincare', 'love'],
    isTrending: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-01'
  },
  {
    id: 'holi-colors-1',
    name: 'Holi Festival',
    category: 'festival',
    type: 'Cultural Celebration',
    description: 'Vibrant Holi template with colorful design and festive elements.',
    images: [
      '/src/assets/images/templates/holi-main.jpg',
      '/src/assets/images/templates/holi-alt1.jpg'
    ],
    thumbnail: '/src/assets/images/templates/holi-thumb.jpg',
    promotionalText: {
      title: 'Holi Festival of Colors',
      subtitle: 'Celebrate with joy',
      description: 'Add colors to your life with our special Holi celebration packages.',
      callToAction: 'Join Celebration',
      discount: '30% OFF',
      validUntil: 'Holi Week'
    },
    designElements: {
      primaryColor: '#FF5722',
      secondaryColor: '#4CAF50',
      backgroundColor: '#FFEB3B',
      fontFamily: 'Nunito',
      fontSize: {
        title: '3.2rem',
        subtitle: '1.7rem',
        body: '1.1rem'
      }
    },
    tags: ['holi', 'colors', 'festival', 'indian', 'celebration'],
    isTrending: false,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-10'
  },
  {
    id: 'eid-mubarak-1',
    name: 'Eid Mubarak',
    category: 'festival',
    type: 'Religious Celebration',
    description: 'Elegant Eid template with Islamic patterns and golden accents.',
    images: [
      '/src/assets/images/templates/eid-main.jpg',
      '/src/assets/images/templates/eid-alt1.jpg',
      '/src/assets/images/templates/eid-alt2.jpg'
    ],
    thumbnail: '/src/assets/images/templates/eid-thumb.jpg',
    promotionalText: {
      title: 'Eid Mubarak',
      subtitle: 'Blessed celebrations',
      description: 'Celebrate Eid with special offers on traditional wear and festive items.',
      callToAction: 'Shop Eid Collection',
      discount: '40% OFF',
      validUntil: 'Eid Special'
    },
    designElements: {
      primaryColor: '#D4AF37',
      secondaryColor: '#228B22',
      backgroundColor: '#F5F5DC',
      fontFamily: 'Amiri',
      fontSize: {
        title: '2.4rem',
        subtitle: '1.5rem',
        body: '1rem'
      }
    },
    tags: ['eid', 'islamic', 'festival', 'traditional', 'celebration'],
    isTrending: false,
    createdAt: '2024-04-20',
    updatedAt: '2024-05-01'
  }
];
