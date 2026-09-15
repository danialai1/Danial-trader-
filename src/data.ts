import { Product, Stat, Leader, Testimonial } from './types';

export const stats: Stat[] = [
  {
    value: '50+',
    label: 'Years Combined Legacy',
    iconName: 'Award',
  },
  {
    value: '10,000+',
    label: 'Employees Nationwide',
    iconName: 'Users',
  },
  {
    value: '40+',
    label: 'Export Countries',
    iconName: 'Globe',
  },
  {
    value: '#1',
    label: 'Match Exporter in Pakistan',
    iconName: 'TrendingUp',
  },
];

export const biscuitsProducts: Product[] = [
  {
    id: 'frisky-rolls-chocolate',
    name: 'Frisky Rolls (Velvety Chocolate)',
    category: 'biscuits',
    description: 'Crispy golden wafer rolls packed with a luxurious, smooth chocolate center.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'Frisky Chocolate Rolls represent our premium confectionery wafer line. Crispy, multi-layered baked golden wafer shells filled with sweet, slow-melt chocolate cream. A household favorite across Pakistan.',
    price: '$12.80 USD per Carton',
    ingredients: ['Wheat Flour', 'Sugar', 'Vegetable Palm Oil', 'Cocoa Powder', 'Milk Powder', 'Soy Lecithin', 'Vanillin Flavour'],
    specs: {
      packing: '40 packs x 45g per Carton',
      weight: '1.80 kg Net Weight',
      dimensions: '380mm x 220mm x 190mm',
      moisture: 'Max 3.5%'
    }
  },
  {
    id: 'frisky-rolls-strawberry',
    name: 'Frisky Rolls (Sweet Strawberry)',
    category: 'biscuits',
    description: 'Light wafer rolls with a vibrant, creamy real strawberry cream core.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    badge: 'New Arrival',
    details: 'Baked wafer rolls injected with premium natural strawberry extract and fresh milk solids for a sweet, airy fruit treat.',
    price: '$13.00 USD per Carton',
    ingredients: ['Wheat Flour', 'Sugar', 'Palm Olein', 'Milk Solids', 'Strawberry Juice Concentrate', 'Citric Acid', 'Natural Red Beet Color'],
    specs: {
      packing: '40 packs x 45g per Carton',
      weight: '1.80 kg Net Weight',
      dimensions: '380mm x 220mm x 190mm',
      moisture: 'Max 3.5%'
    }
  },
  {
    id: 'frisky-rolls-vanilla',
    name: 'Frisky Rolls (Milky Vanilla)',
    category: 'biscuits',
    description: 'Crisp wafer sleeves filled with smooth Madagascar vanilla bean cream.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    badge: 'Trending',
    details: 'Elegant, light wafers containing aromatic whipped vanilla bean cream. Excellent with afternoon espresso or black tea.',
    price: '$12.50 USD per Carton',
    ingredients: ['Wheat Flour', 'Sugar', 'Hydrogenated Fats', 'Whey Powder', 'Corn Starch', 'Natural Vanilla Extract', 'Salt'],
    specs: {
      packing: '40 packs x 45g per Carton',
      weight: '1.80 kg Net Weight',
      dimensions: '380mm x 220mm x 190mm',
      moisture: 'Max 3.2%'
    }
  },
  {
    id: 'digestive-original',
    name: 'Digestive Classic Original',
    category: 'biscuits',
    description: 'The healthy crunch of high-fiber whole wheat bran baked to a golden rustic finish.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium Choice',
    details: 'Our flagship health biscuit, packed with fiber, whole grain wheat, and a semi-sweet, butter-infused texture for daily digestion support.',
    price: '$14.20 USD per Carton',
    ingredients: ['Whole Wheat Flour', 'Wheat Bran', 'Sugar', 'Oat Meal', 'Malt Extract', 'Sodium Bicarbonate', 'Butter Fat'],
    specs: {
      packing: '36 packs x 120g per Carton',
      weight: '4.32 kg Net Weight',
      dimensions: '420mm x 250mm x 210mm',
      moisture: 'Max 4.0%'
    }
  },
  {
    id: 'digestive-sugar-free',
    name: 'Digestive Sugar-Free',
    category: 'biscuits',
    description: 'Wholesome digestive formulation utilizing zero-calorie natural Stevia extracts.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'Diabetic-friendly alternative holding the exact same classic crisp texture, sweetened with high-grade rebaudioside Stevia.',
    price: '$15.50 USD per Carton',
    ingredients: ['Whole Grain Flour', 'Sorbitol', 'Maltitol', 'Stevia Extract', 'Wheat Bran', 'Vegetable Shortening', 'Ammonium Bicarbonate'],
    specs: {
      packing: '36 packs x 110g per Carton',
      weight: '3.96 kg Net Weight',
      dimensions: '420mm x 250mm x 210mm',
      moisture: 'Max 3.8%'
    }
  },
  {
    id: 'digestive-oats-honey',
    name: 'Digestive Oats & Honey',
    category: 'biscuits',
    description: 'Crisp wholemeal biscuits loaded with rolled oats and premium mountain honey.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Trending',
    details: 'An energy-rich breakfast biscuit pairing high-grade organic rolled oats with natural wild forest honey for an exquisite, sustained energy release.',
    price: '$14.90 USD per Carton',
    ingredients: ['Rolled Oats', 'Wheat Flour', 'Natural Honey', 'Brown Sugar', 'Vegetable Oil', 'Baking Powder', 'Salt'],
    specs: {
      packing: '36 packs x 115g per Carton',
      weight: '4.14 kg Net Weight',
      dimensions: '420mm x 250mm x 210mm',
      moisture: 'Max 4.2%'
    }
  },
  {
    id: 'haven-chocolate',
    name: 'Haven Intense Chocolate',
    category: 'biscuits',
    description: 'Premium cookies loaded with real roasted cocoa nibs and dark chocolate drops.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium Choice',
    details: 'An exquisite cocoa cookie baked for true dark chocolate lovers, leaving a sustain-melt mouthfeel of premium African cocoa.',
    price: '$16.00 USD per Carton',
    ingredients: ['Cocoa Mass', 'Wheat Flour', 'Dark Chocolate Chips', 'Butter', 'Cocoa Butter', 'Cane Sugar', 'Vanilla Extract'],
    specs: {
      packing: '24 packs x 100g per Carton',
      weight: '2.40 kg Net Weight',
      dimensions: '390mm x 210mm x 180mm',
      moisture: 'Max 3.0%'
    }
  },
  {
    id: 'haven-coffee',
    name: 'Haven Roasted Coffee',
    category: 'biscuits',
    description: 'Sophisticated crispy biscuits infused with real Arabica coffee extract.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
    badge: 'Trending',
    details: 'Rich, aromatic coffee cookies formulated from micro-ground high-mountain Arabica coffee beans and butter.',
    price: '$16.20 USD per Carton',
    ingredients: ['Wheat Flour', 'Roasted Arabica Coffee Powder', 'Brown Sugar', 'Butter', 'Milk Powder', 'Raising Agents', 'Salt'],
    specs: {
      packing: '24 packs x 100g per Carton',
      weight: '2.40 kg Net Weight',
      dimensions: '390mm x 210mm x 180mm',
      moisture: 'Max 3.0%'
    }
  },
  {
    id: 'haven-caramel',
    name: 'Haven Cream Caramel',
    category: 'biscuits',
    description: 'Butter cookies infused with slow-cooked salted toffee and rich caramel swirls.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
    badge: 'New Arrival',
    details: 'A decadent combination of sweet, slightly salty caramel toffee bits baked directly into a rich, melt-in-the-mouth butter base.',
    price: '$15.80 USD per Carton',
    ingredients: ['Wheat Flour', 'Salted Toffee Bits', 'Natural Caramel Flavor', 'Butter', 'Liquid Glucose', 'Lecithin'],
    specs: {
      packing: '24 packs x 100g per Carton',
      weight: '2.40 kg Net Weight',
      dimensions: '390mm x 210mm x 180mm',
      moisture: 'Max 2.8%'
    }
  },
  {
    id: 'fabulous-peanut',
    name: 'Fabulous Peanut Chip Cookies',
    category: 'biscuits',
    description: 'Savory roasted peanut chunks combined with chocolate chips in a crunchy cookie.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'A texture explosion of dry-roasted, salty premium peanuts and sweet dark chocolate drops. Highly popular tea-time accompaniment.',
    price: '$13.50 USD per Carton',
    ingredients: ['Wheat Flour', 'Roasted Peanuts', 'Chocolate Chips', 'Sugar', 'Margarine', 'Whey Powder', 'Sodium Bicarbonate'],
    specs: {
      packing: '30 packs x 90g per Carton',
      weight: '2.70 kg Net Weight',
      dimensions: '400mm x 230mm x 195mm',
      moisture: 'Max 3.5%'
    }
  },
  {
    id: 'fabulous-almond',
    name: 'Fabulous Butter Almond',
    category: 'biscuits',
    description: 'Luxurious butter cookies studded with crushed California almonds.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium Choice',
    details: 'Baked with high-grade sweet cream butter and loaded with crunchy flaked sweet almonds for a truly executive hospitality snack.',
    price: '$15.00 USD per Carton',
    ingredients: ['Wheat Flour', 'Flaked Almonds', 'Cream Butter', 'Sugar', 'Fresh Eggs', 'Almond Extract', 'Salt'],
    specs: {
      packing: '30 packs x 85g per Carton',
      weight: '2.55 kg Net Weight',
      dimensions: '400mm x 230mm x 195mm',
      moisture: 'Max 3.2%'
    }
  },
  {
    id: 'fabulous-walnut',
    name: 'Fabulous Walnut Delight',
    category: 'biscuits',
    description: 'Deep, earthy walnut cookies baked to a crumbly, melt-in-the-mouth texture.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80',
    badge: 'New Arrival',
    details: 'Rich walnut chunks mixed into a sweet spiced cookie dough, perfect for premium hospitality and cold weather pairings.',
    price: '$15.20 USD per Carton',
    ingredients: ['Wheat Flour', 'Walnut Kernels', 'Brown Sugar', 'Butter', 'Spices (Nutmeg)', 'Baking Powder', 'Salt'],
    specs: {
      packing: '30 packs x 85g per Carton',
      weight: '2.55 kg Net Weight',
      dimensions: '400mm x 230mm x 195mm',
      moisture: 'Max 3.4%'
    }
  },
  {
    id: 'choc-n-chip-original',
    name: 'Choc-n-Chip Original',
    category: 'biscuits',
    description: 'The golden baked cookie loaded with rich, sweet chocolate chips.',
    image: 'https://images.unsplash.com/photo-1584001300741-a110191d4ff1?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'Pakistan’s benchmark chocolate chip cookie. Densely packed with premium melt-in-your-mouth chocolate drops and premium dairy butter.',
    price: '$13.20 USD per Carton',
    ingredients: ['Wheat Flour', 'Chocolate Chips (22%)', 'Sugar', 'Butter Fat', 'Liquid Glucose', 'Raising Agents', 'Flavour'],
    specs: {
      packing: '40 packs x 75g per Carton',
      weight: '3.00 kg Net Weight',
      dimensions: '410mm x 240mm x 200mm',
      moisture: 'Max 3.5%'
    }
  },
  {
    id: 'choc-n-chip-double',
    name: 'Choc-n-Chip Double Chocolate',
    category: 'biscuits',
    description: 'Cocoa infused cookie loaded with a double dose of dark chocolate chips.',
    image: 'https://images.unsplash.com/photo-1584001300741-a110191d4ff1?auto=format&fit=crop&w=400&q=80',
    badge: 'Trending',
    details: 'An ultra-rich treat consisting of dark chocolate cookie dough heavily loaded with extra baking chocolate chips. Absolute chocolate indulgence.',
    price: '$13.80 USD per Carton',
    ingredients: ['Wheat Flour', 'Chocolate Chips', 'Cocoa Powder', 'Palm Shortening', 'Sugar', 'Soy Lecithin', 'Vanillin'],
    specs: {
      packing: '40 packs x 75g per Carton',
      weight: '3.00 kg Net Weight',
      dimensions: '410mm x 240mm x 200mm',
      moisture: 'Max 3.2%'
    }
  },
  {
    id: 'choc-n-chip-white',
    name: 'Choc-n-Chip White Macadamia',
    category: 'biscuits',
    description: 'Buttery cookies with rich white chocolate chunks and toasted macadamia nut bits.',
    image: 'https://images.unsplash.com/photo-1584001300741-a110191d4ff1?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium Choice',
    details: 'A premium, gourmet chocolate cookie segment combining creamy imported white chocolate chips with roasted macadamia nut slivers.',
    price: '$16.50 USD per Carton',
    ingredients: ['Wheat Flour', 'White Chocolate Chips', 'Toasted Macadamia Nuts', 'Sweet Cream Butter', 'Vanilla Extract', 'Salt'],
    specs: {
      packing: '40 packs x 70g per Carton',
      weight: '2.80 kg Net Weight',
      dimensions: '410mm x 240mm x 200mm',
      moisture: 'Max 3.0%'
    }
  },
  {
    id: 'crust-rolls-chocolate',
    name: 'Crust Rolls Chocolate Cream',
    category: 'biscuits',
    description: 'Hollow, crispy wafer tubes filled to the brim with chocolate hazelnut paste.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'Dainty wafer rolls baked to a golden crispness, hollow core injected with premium, silky-smooth chocolate paste.',
    price: '$12.00 USD per Carton',
    ingredients: ['Wheat Flour', 'Sugar', 'Cocoa Powder', 'Milk Solids', 'Palm Olein', 'Vanillin', 'Egg Powder'],
    specs: {
      packing: '48 packs x 40g per Carton',
      weight: '1.92 kg Net Weight',
      dimensions: '370mm x 225mm x 185mm',
      moisture: 'Max 3.0%'
    }
  },
  {
    id: 'crust-rolls-hazelnut',
    name: 'Crust Rolls Hazelnut Fusion',
    category: 'biscuits',
    description: 'Wafer tubes containing a luxurious cream infused with real roasted hazelnuts.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    badge: 'Trending',
    details: 'A sophisticated crispy roll with a rich, aromatic hazelnut paste core, offering an exquisite, sweet and nutty balance.',
    price: '$12.60 USD per Carton',
    ingredients: ['Wheat Flour', 'Sugar', 'Roasted Hazelnut Paste', 'Vegetable Fat', 'Soy Lecithin', 'Salt'],
    specs: {
      packing: '48 packs x 40g per Carton',
      weight: '1.92 kg Net Weight',
      dimensions: '370mm x 225mm x 185mm',
      moisture: 'Max 2.8%'
    }
  },
  {
    id: 'crust-rolls-vanilla',
    name: 'Crust Rolls Milky Vanilla',
    category: 'biscuits',
    description: 'Crisp wafer rolls loaded with a dense, creamy sweet milk core.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    badge: 'New Arrival',
    details: 'Light sweet cream filling in a crunchy golden-baked outer wafer, popular snack for school lunches and tea-times.',
    price: '$11.80 USD per Carton',
    ingredients: ['Wheat Flour', 'Sugar', 'Milk Solids', 'Coconut Oil', 'Lecithin', 'Natural Vanilla Powder'],
    specs: {
      packing: '48 packs x 40g per Carton',
      weight: '1.92 kg Net Weight',
      dimensions: '370mm x 225mm x 185mm',
      moisture: 'Max 3.0%'
    }
  },
  {
    id: 'cocomax-original',
    name: 'Cocomax Original Chocolate-Coconut',
    category: 'biscuits',
    description: 'Coconut-enriched biscuits fully coated with rich sweet milk chocolate.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'Combining crunchy, real toasted shredded coconut biscuits with a luscious and thick coverage of creamy milk chocolate.',
    price: '$14.00 USD per Carton',
    ingredients: ['Wheat Flour', 'Dehydrated Coconut', 'Milk Chocolate Coat', 'Sugar', 'Cocoa Butter', 'Vanillin', 'Salt'],
    specs: {
      packing: '36 packs x 80g per Carton',
      weight: '2.88 kg Net Weight',
      dimensions: '410mm x 230mm x 190mm',
      moisture: 'Max 3.6%'
    }
  },
  {
    id: 'cocomax-dark',
    name: 'Cocomax Dark Chocolate Coat',
    category: 'biscuits',
    description: 'Toasted coconut biscuits wrapped in luxurious 60% dark cocoa cover.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Trending',
    details: 'A premium, bold alternative using bittersweet dark chocolate wrapping around dry-toasted sweet coconut fiber biscuit base.',
    price: '$14.50 USD per Carton',
    ingredients: ['Toasted Coconut', 'Wheat Flour', '60% Dark Cocoa Mass', 'Sugar', 'Soya Lecithin', 'Butter Fat'],
    specs: {
      packing: '36 packs x 80g per Carton',
      weight: '2.88 kg Net Weight',
      dimensions: '410mm x 230mm x 190mm',
      moisture: 'Max 3.4%'
    }
  },
  {
    id: 'golden-lotus-speculoos',
    name: 'Golden Lotus Speculoos',
    category: 'biscuits',
    description: 'Caramelized butter biscuits blended with warm cinnamon and European speculoos spices.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium Choice',
    details: 'Our crown jewel. Crisp speculoos cookies blended with real brown sugar, pure cinnamon, cloves, ginger, and cardamom.',
    price: '$15.00 USD per Carton',
    ingredients: ['Wheat Flour', 'Candi Sugar', 'Cinnamon Powder', 'Cloves', 'Cardamom', 'Ginger', 'Sweet Cream Butter', 'Salt'],
    specs: {
      packing: '40 packs x 90g per Carton',
      weight: '3.60 kg Net Weight',
      dimensions: '430mm x 260mm x 215mm',
      moisture: 'Max 2.5%'
    }
  },
  {
    id: 'golden-lotus-butter',
    name: 'Golden Lotus Cookie Butter Crushed',
    category: 'biscuits',
    description: 'Sweet caramelized biscuits loaded with a rich speculoos cookie-butter filling.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80',
    badge: 'New Arrival',
    details: 'Double-decker speculoos biscuits sandwiching a rich, spreadable caramelized cookie-butter filling. Extravagantly delicious.',
    price: '$15.60 USD per Carton',
    ingredients: ['Wheat Flour', 'Golden Lotus Cookie Butter', 'Brown Sugar', 'Vegetable Palm Fats', 'Cinnamon', 'Soy Lecithin'],
    specs: {
      packing: '30 packs x 95g per Carton',
      weight: '2.85 kg Net Weight',
      dimensions: '430mm x 260mm x 215mm',
      moisture: 'Max 2.8%'
    }
  },
  {
    id: 'marie-classic',
    name: 'Innovative Marie Classic',
    category: 'biscuits',
    description: 'The standard light, crispy tea biscuit beloved by generations.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'Traditional, semi-sweet crisp biscuits printed with the classic Marie border, perfect for dipping in warm Pakistani tea (chai).',
    price: '$9.50 USD per Carton',
    ingredients: ['Wheat Flour', 'Refined Sugar', 'Vegetable Shortening', 'Milk Powder', 'Sodium Bicarbonate', 'Malt Extract', 'Salt'],
    specs: {
      packing: '48 packs x 65g per Carton',
      weight: '3.12 kg Net Weight',
      dimensions: '420mm x 240mm x 195mm',
      moisture: 'Max 4.0%'
    }
  },
  {
    id: 'lemon-sandwich',
    name: 'Lemon Sandwich Delight',
    category: 'biscuits',
    description: 'Crisp butter biscuits sandwiching a tangy, real-lemon flavored cream.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Trending',
    details: 'Golden-baked dual biscuits paired with a refreshing, citrusy sweet cream filling, delivering a highly appetizing bite.',
    price: '$11.00 USD per Carton',
    ingredients: ['Wheat Flour', 'Sugar', 'Hydrogenated Palm Fats', 'Natural Lemon Extract', 'Citric Acid', 'Turmeric Color'],
    specs: {
      packing: '40 packs x 80g per Carton',
      weight: '3.20 kg Net Weight',
      dimensions: '400mm x 235mm x 190mm',
      moisture: 'Max 3.5%'
    }
  },
  {
    id: 'chocolate-sandwich',
    name: 'Chocolate Sandwich Delight',
    category: 'biscuits',
    description: 'Crunchy chocolate biscuits with a double portion of chocolate cream filling.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'Rich chocolate cookie layers holding a silky dark cocoa cream, perfect for cocoa enthusiasts and school lunch packs.',
    price: '$11.20 USD per Carton',
    ingredients: ['Wheat Flour', 'Sugar', 'Cocoa Powder', 'Palm Fats', 'Chocolate Cream Filling', 'Ammonium Bicarbonate', 'Salt'],
    specs: {
      packing: '40 packs x 80g per Carton',
      weight: '3.20 kg Net Weight',
      dimensions: '400mm x 235mm x 190mm',
      moisture: 'Max 3.2%'
    }
  },
  {
    id: 'jam-delight',
    name: 'Jam Delight Strawberry',
    category: 'biscuits',
    description: 'Butter shortbread biscuits with a sweet, sticky real strawberry jam center.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Trending',
    details: 'Delicate flower-shaped shortbread cookie containing a bright, sticky reservoir of real sweet strawberry fruit jam.',
    price: '$12.50 USD per Carton',
    ingredients: ['Wheat Flour', 'Strawberry Fruit Pectin Jam', 'Sweet Cream Butter', 'Powdered Sugar', 'Leavening', 'Vanilla'],
    specs: {
      packing: '36 packs x 85g per Carton',
      weight: '3.06 kg Net Weight',
      dimensions: '410mm x 230mm x 185mm',
      moisture: 'Max 4.0%'
    }
  },
  {
    id: 'butter-cookies-tin',
    name: 'Royal Danish Butter Cookies (Tin)',
    category: 'biscuits',
    description: 'Assorted sweet butter cookies packaged in a premium corporate gift steel tin.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium Choice',
    details: 'Rich, crumbly assorted holiday cookies baked with 100% pure dairy butter and packaged inside a protective, embossed vintage blue tin.',
    price: '$45.00 USD per Carton',
    ingredients: ['Pure Dairy Butter (32%)', 'Wheat Flour', 'Refined Sugar', 'Fresh Eggs', 'Currants', 'Desiccated Coconut', 'Salt'],
    specs: {
      packing: '12 luxury Tins x 400g per Carton',
      weight: '4.80 kg Net Weight',
      dimensions: '480mm x 320mm x 240mm',
      moisture: 'Max 2.0%'
    }
  },
  {
    id: 'wheatable-fiber',
    name: 'Wheatable Sugar-Free High Fiber',
    category: 'biscuits',
    description: 'High-density whole wheat flour cracker with extreme dietary fiber and zero sugar.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Premium Choice',
    details: 'Specially formulated clinical snack for calorie counters, using whole grain flour and zero sugars for long-term health management.',
    price: '$14.00 USD per Carton',
    ingredients: ['Coarse Whole Wheat Flour', 'Wheat Bran (15%)', 'Sorbitol', 'Baking Soda', 'Vegetable Palm Fats', 'Salt'],
    specs: {
      packing: '36 packs x 95g per Carton',
      weight: '3.42 kg Net Weight',
      dimensions: '415mm x 240mm x 205mm',
      moisture: 'Max 4.5%'
    }
  },
  {
    id: 'bakeri-nankhatai',
    name: 'Bakeri Nankhatai Classic',
    category: 'biscuits',
    description: 'Traditional Pakistani rich cardamom butter cookies baked to a crumbly finish.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'Best Seller',
    details: 'Authentic South Asian shortbread, incredibly rich in pure ghee (clarified butter) and highly spiced with aromatic green cardamom.',
    price: '$13.50 USD per Carton',
    ingredients: ['Wheat Flour', 'Desi Ghee (Clarified Butter)', 'Refined Sugar', 'Green Cardamom Seeds', 'Pistachio Bits', 'Semolina'],
    specs: {
      packing: '32 packs x 100g per Carton',
      weight: '3.20 kg Net Weight',
      dimensions: '425mm x 250mm x 210mm',
      moisture: 'Max 2.2%'
    }
  },
  {
    id: 'gluco-milk',
    name: 'Gluco Milk Energy Biscuit',
    category: 'biscuits',
    description: 'Energy biscuits loaded with wholesome wheat flour, glucose, and real milk solids.',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&q=80',
    badge: 'New Arrival',
    details: 'An absolute favorite for growing children, providing vital minerals, calcium, iron, and glucose sugars for daily energetic activities.',
    price: '$10.00 USD per Carton',
    ingredients: ['Wheat Flour', 'Glucose Syrup', 'Fresh Milk Powder', 'Calcium Carbonate', 'Iron pyrophosphate', 'Palm Fats', 'Sugar'],
    specs: {
      packing: '48 packs x 75g per Carton',
      weight: '3.60 kg Net Weight',
      dimensions: '410mm x 235mm x 195mm',
      moisture: 'Max 3.8%'
    }
  }
];

export const kiteProducts: Product[] = [
  {
    id: 'kite-household',
    name: 'Kite Safety Matches (Household Standard)',
    category: 'kite',
    description: 'Pakistan’s standard household matchbox, exported worldwide for general domestic cooking.',
    image: 'https://kitepk.com/assets/1920x640allmatches-tt-1RKLY.webp',
    badge: 'Best Seller',
    details: 'Highly reliable strike-on-box matches. Formulated with treated carbonized poplar splints and standard friction surface plates for stable household cooking.',
    price: '$145.00 USD per Master Container Carton (1000 boxes)',
    ingredients: ['Potassium Chlorate Match Head', 'Friction Surface Red Phosphorus', 'Carbonized Poplar Wood Splints'],
    specs: {
      packing: '1000 small boxes x 40 sticks per Carton',
      weight: '15.5 kg per Master Carton',
      dimensions: '510mm x 420mm x 380mm',
      moisture: 'Damp-Proof Splints'
    }
  },
  {
    id: 'kite-pocket',
    name: 'Kite Safety Matches (Pocket Slim)',
    category: 'kite',
    description: 'Compact, slim pocket matches designed for transportability and quick outdoor lightings.',
    image: 'https://kitepk.com/assets/1920x640allmatches-tt-1RKLY.webp',
    badge: 'Trending',
    details: 'Sleek match boxes perfect for carrying inside trouser pockets or cigarette cases. Highly convenient, wind-resistant, and damp-proof.',
    price: '$120.00 USD per Master Container Carton (1000 boxes)',
    ingredients: ['Potassium Chlorate', 'Glue Binders', 'Saponified Poplar Splints'],
    specs: {
      packing: '1000 small boxes x 30 sticks per Carton',
      weight: '11.0 kg per Master Carton',
      dimensions: '450mm x 390mm x 320mm',
      moisture: 'Damp-Proof'
    }
  },
  {
    id: 'kite-waterproof',
    name: 'Kite Safety Matches (Executive Waterproof)',
    category: 'kite',
    description: 'Premium heavy-wax coated matches that strike even when damp or subjected to rain.',
    image: 'https://kitepk.com/assets/1920x640allmatches-tt-1RKLY.webp',
    badge: 'Premium Choice',
    details: 'Engineered for outdoor survival, marine voyages, and heavy-humidity warehouses. The match heads and splints are fully double-waxed.',
    price: '$180.00 USD per Master Container Carton (1000 boxes)',
    ingredients: ['Paraffin Wax Coating', 'Potassium Chlorate Match Paste', 'Waterproof Chemical Binder'],
    specs: {
      packing: '1000 small boxes x 35 sticks per Carton',
      weight: '16.2 kg per Master Carton',
      dimensions: '520mm x 430mm x 395mm',
      moisture: '100% Weatherproof'
    }
  },
  {
    id: 'kite-kitchen',
    name: 'Kite Safety Matches (Heavy Duty Kitchen)',
    category: 'kite',
    description: 'Thick, heavy cardboard boxes containing thick splints that resist breaking.',
    image: 'https://kitepk.com/assets/1920x640allmatches-tt-1RKLY.webp',
    badge: 'New Arrival',
    details: 'Formulated for busy commercial kitchens, restaurants, and bread-baking ovens. Features thicker splints to avoid finger singes or accidental snaps.',
    price: '$165.00 USD per Master Container Carton (500 boxes)',
    ingredients: ['Thick Aspen Wood Splints', 'Active Sulfur Match Head', 'High-Grit Red Phosphorus Plate'],
    specs: {
      packing: '500 large boxes x 80 sticks per Carton',
      weight: '14.8 kg per Master Carton',
      dimensions: '495mm x 410mm x 350mm',
      moisture: 'Damp-Proof'
    }
  },
  {
    id: 'kite-fireplace',
    name: 'Kite Safety Matches (Extra Long Fireplace)',
    category: 'kite',
    description: 'Elongated 10-inch matches designed to light deep stoves, fireplaces, and ovens safely.',
    image: 'https://kitepk.com/assets/1920x640allmatches-tt-1RKLY.webp',
    badge: 'Premium Choice',
    details: 'Crafted with premium pine splints measuring 25cm (10 inches) in length, allowing safe deep reach inside furnace fire-tubes with zero risk.',
    price: '$210.00 USD per Master Container Carton (200 boxes)',
    ingredients: ['Pine Wood Extruded Splints', 'Gentle Burn Match Paste', 'Friction Plate'],
    specs: {
      packing: '200 extra-long boxes x 20 sticks per Carton',
      weight: '9.80 kg per Master Carton',
      dimensions: '580mm x 350mm x 280mm',
      moisture: 'Damp-Proof'
    }
  },
  {
    id: 'kite-glow-powder',
    name: 'Kite Glow Detergent Powder',
    category: 'kite',
    description: 'Proprietary multi-enzyme active oxygen washing powder with intense stain release.',
    image: 'https://kitepk.com/assets/640x640kite-CDjjXNac.jpg',
    badge: 'New Arrival',
    details: 'Launched with immense acclaim, this laundry formula penetrates thick fabric fibers to lift stubborn stains of grease, soil, and curry.',
    price: '$24.50 USD per Master Carton (48 packs)',
    ingredients: ['Sodium Carbonate', 'Active Zeolites', 'Anionic Surfactants', 'Stain-Lifting Multi-Enzymes', 'Optical Brighteners', 'Lemon Scent'],
    specs: {
      packing: '48 bags x 500g per Carton',
      weight: '24.00 kg Net Weight',
      dimensions: '550mm x 340mm x 310mm',
      moisture: 'Max 2.0% in protective BOPP'
    }
  },
  {
    id: 'kite-wash-bar',
    name: 'Kite Dish Wash Bar (Lemon Fresh)',
    category: 'kite',
    description: 'Heavy duty, long-lasting grease-cutting lemon bar for antibacterial kitchen cleaning.',
    image: 'https://kitepk.com/assets/Shippment-1920x640-OvFnXOMB.jpeg',
    badge: 'Trending',
    details: 'Heavy-duty lipid binding bar made with premium real lemon oil extracts. Cuts ghee and burnt food on pots easily without leaving chemical residue.',
    price: '$18.00 USD per Master Carton (60 bars)',
    ingredients: ['Linear Alkylbenzene Sulfonic Acid', 'Sodium Silicate', 'Real Lemon Extract', 'Antibacterial Sanitizing Agents'],
    specs: {
      packing: '60 bars x 250g per Carton',
      weight: '15.00 kg Net Weight',
      dimensions: '440mm x 290mm x 210mm',
      moisture: 'Hard compacted bar structure'
    }
  },
  {
    id: 'kite-dish-liquid',
    name: 'Kite Dish Wash Liquid',
    category: 'kite',
    description: 'Ultra grease-cutting liquid soap for glassware and fine porcelain cleaning.',
    image: 'https://kitepk.com/assets/Shippment-1920x640-OvFnXOMB.jpeg',
    badge: 'New Arrival',
    details: 'High-foaming, highly concentrated liquid formulation with aloe vera skin moisturizers. Leaves glassware sparkling clean and streak-free.',
    price: '$21.00 USD per Master Carton (24 bottles)',
    ingredients: ['Sodium Lauryl Ether Sulfate', 'Cocamidopropyl Betaine', 'Aloe Vera Skin Guard', 'Natural Lemon Oil', 'Antibacterial Blend'],
    specs: {
      packing: '24 bottles x 500ml per Carton',
      weight: '12.00 kg Net Weight',
      dimensions: '410mm x 280mm x 245mm',
      moisture: 'N/A'
    }
  }
];

export const leaders: Leader[] = [
  {
    name: 'Mr. Mohsin Aziz',
    role: 'Chairman',
    image: 'https://kitepk.com/assets/chairman-Cyuz44YU.jpg',
    bio: 'Senator, State Bank Board member (2 terms), Chairman APTMA.',
    details: 'Mr. Mohsin Aziz is a highly respected public figure and business leader in Pakistan. He has served in the Senate of Pakistan and is a double-term board member of the State Bank of Pakistan. Additionally, as the past Chairman of APTMA (All Pakistan Textile Mills Association), he has been instrumental in shaping the industrial and financial landscape of the nation over the last four decades.'
  },
  {
    name: 'Mr. Afan Aziz',
    role: 'CEO',
    image: 'https://kitepk.com/assets/ceo-Bw1zKIzr.jpeg',
    bio: 'LSE Graduate, Honorary Consul of South Korea, UNICEF Advisory Council.',
    details: 'Mr. Afan Aziz brings a global, modern perspective to the Aziz Group. An alumnus of the prestigious London School of Economics (LSE), he serves as the Honorary Consul of the Republic of South Korea in Pakistan and actively advises the UNICEF Advisory Council on child welfare and sustainable corporate operations.'
  },
  {
    name: 'Mr. Waleed Elahi',
    role: 'Managing Director - FMCG',
    image: 'https://kitepk.com/assets/waleed-CTYq8yJe.jpg',
    bio: 'MBA LUMS, 20+ years experience in Marketing & Distribution.',
    details: 'Mr. Waleed Elahi oversees the rapid expansion of the Group’s FMCG portfolio, including Innovative Biscuits and Kite Glow products. With an MBA from Lahore University of Management Sciences (LUMS) and over 20 years of hands-on leadership in nation-wide supply chain and distribution management, he has driven the brands into household names.'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ahmed Al-Mansoori',
    role: 'Managing Director',
    company: 'Gulf Grocery Imports',
    location: 'Riyadh, Saudi Arabia',
    feedback: 'Importing the Innovative Biscuits portfolio (especially Frisky Rolls and Golden Lotus Speculoos) has greatly elevated our gourmet snack segment. Danial Trader ensured pristine container packing, fast customs documentation, and perfect heat-sealed freshness.',
    rating: 5,
    portfolio: 'biscuits',
  },
  {
    id: 'test-2',
    name: 'Jean-Pierre Silva',
    role: 'Procurement Director',
    company: 'Sol Logistics SA',
    location: 'São Paulo, Brazil',
    feedback: 'Aziz Group matches are our staple. The damp-proof match splints hold up exceptionally well in high-humidity regional warehouses. Flawless export consistency, and the cardboard carton strength handles multi-modal shipping perfectly.',
    rating: 5,
    portfolio: 'matches',
  },
  {
    id: 'test-3',
    name: 'Grace Mwangi',
    role: 'Lead FMCG Distributor',
    company: 'East Africa Trade Alliance',
    location: 'Mombasa, Kenya',
    feedback: 'Mohsin Match Factory safety matches are highly sought after in East African markets. Working with Danial Ahmad’s authorized distribution desk streamlined our custom labeling (OEM box design) and sea cargo bookings with outstanding support.',
    rating: 5,
    portfolio: 'both',
  },
  {
    id: 'test-4',
    name: 'Elena Rostova',
    role: 'Senior Category Manager',
    company: 'Baltica Wholesale LLC',
    location: 'Riga, Latvia',
    feedback: 'The premium wafer crispness of Crust Rolls and high-fiber Digestive biscuits have exceeded expectations in Europe. Danial Trader expert handling of mixed-confectionery container logistics reduced our operational overhead immensely.',
    rating: 5,
    portfolio: 'biscuits',
  },
];
