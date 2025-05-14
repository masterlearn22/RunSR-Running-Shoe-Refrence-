const formatPrice = (price) => {
  return "Rp" + price.toLocaleString("id-ID");
};

// Debounce utility to limit rapid function calls
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // Product data - 150 produk sepatu lari
  const products = [
    // Brand Indonesia: 910
    {
      id: 1,
      name: "910 Nineten Noru",
      brand: "910",
      type: "road",
      price: 599000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan teknologi cushioning yang nyaman",
      rating: 4.5,
      image: "../assets/images/products/910-noru.jpg"
    },
    {
      id: 2,
      name: "910 Nineten Hakone",
      brand: "910",
      type: "road",
      price: 699000,
      features: ["lightweight", "stability"],
      description: "Sepatu lari jalan dengan stabilitas tinggi",
      rating: 4.3,
      image: "../assets/images/products/910-hakone.jpg"
    },
    {
      id: 3,
      name: "910 Nineten Kaze",
      brand: "910",
      type: "trail",
      price: 799000,
      features: ["stability", "waterproof"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.6,
      image: "../assets/images/products/910-kaze.jpg"
    },
    {
      id: 4,
      name: "910 Nineten Yuza",
      brand: "910",
      type: "casual",
      price: 549000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai untuk penggunaan sehari-hari",
      rating: 4.2,
      image: "../assets/images/products/910-yuza.jpg"
    },
    {
      id: 5,
      name: "910 Nineten Ryoma",
      brand: "910",
      type: "marathon",
      price: 899000,
      features: ["lightweight", "stability"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.7,
      image: "../assets/images/products/910-ryoma.jpg"
    },
    {
      id: 6,
      name: "910 Nineten Koga",
      brand: "910",
      type: "road",
      price: 649000,
      features: ["cushioning"],
      description: "Sepatu lari jalan dengan bantalan ekstra",
      rating: 4.4,
      image: "../assets/images/products/910-koga.jpg"
    },
    {
      id: 7,
      name: "910 Nineten Fujin",
      brand: "910",
      type: "trail",
      price: 849000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running tahan air",
      rating: 4.8,
      image: "../assets/images/products/910-fujin.jpg"
    },
    {
      id: 8,
      name: "910 Nineten Raijin",
      brand: "910",
      type: "marathon",
      price: 949000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi terbaru",
      rating: 4.9,
      image: "../assets/images/products/910-raijin.jpg"
    },
    {
      id: 9,
      name: "910 Nineten Suijin",
      brand: "910",
      type: "casual",
      price: 499000,
      features: ["lightweight"],
      description: "Sepatu lari santai dengan desain stylish",
      rating: 4.1,
      image: "../assets/images/products/910-suijin.jpg"
    },
    {
      id: 10,
      name: "910 Nineten Fūjin",
      brand: "910",
      type: "road",
      price: 749000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan stabilitas dan kenyamanan",
      rating: 4.5,
      image: "../assets/images/products/910-fujin-road.jpg"
    },
    
    // Brand Indonesia: Ortuseight
    {
      id: 11,
      name: "Ortuseight Hyperglide",
      brand: "ortuseight",
      type: "road",
      price: 649000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan teknologi bantalan udara",
      rating: 4.4,
      image: "../assets/images/products/ortuseight-hyperglide.jpg"
    },
    {
      id: 12,
      name: "Ortuseight Catalyst",
      brand: "ortuseight",
      type: "marathon",
      price: 899000,
      features: ["lightweight", "stability"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.7,
      image: "../assets/images/products/ortuseight-catalyst.jpg"
    },
    {
      id: 13,
      name: "Ortuseight Quantum",
      brand: "ortuseight",
      type: "trail",
      price: 799000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan grip superior",
      rating: 4.6,
      image: "../assets/images/products/ortuseight-quantum.jpg"
    },
    {
      id: 14,
      name: "Ortuseight Pulse",
      brand: "ortuseight",
      type: "casual",
      price: 549000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai dengan desain modern",
      rating: 4.3,
      image: "../assets/images/products/ortuseight-pulse.jpg"
    },
    {
      id: 15,
      name: "Ortuseight Velocity",
      brand: "ortuseight",
      type: "road",
      price: 699000,
      features: ["lightweight", "stability"],
      description: "Sepatu lari jalan dengan fokus pada kecepatan",
      rating: 4.5,
      image: "../assets/images/products/ortuseight-velocity.jpg"
    },
    {
      id: 16,
      name: "Ortuseight Zenith",
      brand: "ortuseight",
      type: "marathon",
      price: 949000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton premium dengan teknologi terbaru",
      rating: 4.8,
      image: "../assets/images/products/ortuseight-zenith.jpg"
    },
    {
      id: 17,
      name: "Ortuseight Terrain",
      brand: "ortuseight",
      type: "trail",
      price: 849000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk medan ekstrem",
      rating: 4.7,
      image: "../assets/images/products/ortuseight-terrain.jpg"
    },
    {
      id: 18,
      name: "Ortuseight Strider",
      brand: "ortuseight",
      type: "casual",
      price: 499000,
      features: ["lightweight"],
      description: "Sepatu lari santai untuk penggunaan sehari-hari",
      rating: 4.2,
      image: "../assets/images/products/ortuseight-strider.jpg"
    },
    {
      id: 19,
      name: "Ortuseight Horizon",
      brand: "ortuseight",
      type: "road",
      price: 749000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan bantalan responsif",
      rating: 4.6,
      image: "../assets/images/products/ortuseight-horizon.jpg"
    },
    {
      id: 20,
      name: "Ortuseight Summit",
      brand: "ortuseight",
      type: "trail",
      price: 899000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk pendakian",
      rating: 4.9,
      image: "../assets/images/products/ortuseight-summit.jpg"
    },
    
    // Brand Indonesia: Ardiles
    {
      id: 21,
      name: "Ardiles Runforce",
      brand: "ardiles",
      type: "road",
      price: 399000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan harga terjangkau",
      rating: 4.0,
      image: "../assets/images/products/ardiles-runforce.jpg"
    },
    {
      id: 22,
      name: "Ardiles Speedster",
      brand: "ardiles",
      type: "road",
      price: 449000,
      features: ["lightweight"],
      description: "Sepatu lari jalan ringan untuk kecepatan",
      rating: 4.1,
      image: "../assets/images/products/ardiles-speedster.jpg"
    },
    {
      id: 23,
      name: "Ardiles Trailblazer",
      brand: "ardiles",
      type: "trail",
      price: 499000,
      features: ["stability"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.2,
      image: "../assets/images/products/ardiles-trailblazer.jpg"
    },
    {
      id: 24,
      name: "Ardiles Jogger",
      brand: "ardiles",
      type: "casual",
      price: 349000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai untuk jogging ringan",
      rating: 3.9,
      image: "../assets/images/products/ardiles-jogger.jpg"
    },
    {
      id: 25,
      name: "Ardiles Marathon Pro",
      brand: "ardiles",
      type: "marathon",
      price: 599000,
      features: ["lightweight", "stability"],
      description: "Sepatu maraton dengan performa baik",
      rating: 4.3,
      image: "../assets/images/products/ardiles-marathon-pro.jpg"
    },
    {
      id: 26,
      name: "Ardiles Roadrunner",
      brand: "ardiles",
      type: "road",
      price: 429000,
      features: ["cushioning"],
      description: "Sepatu lari jalan dengan bantalan nyaman",
      rating: 4.0,
      image: "../assets/images/products/ardiles-roadrunner.jpg"
    },
    {
      id: 27,
      name: "Ardiles Trekker",
      brand: "ardiles",
      type: "trail",
      price: 549000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running tahan air",
      rating: 4.4,
      image: "../assets/images/products/ardiles-trekker.jpg"
    },
    {
      id: 28,
      name: "Ardiles Endurance",
      brand: "ardiles",
      type: "marathon",
      price: 649000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton untuk jarak jauh",
      rating: 4.5,
      image: "../assets/images/products/ardiles-endurance.jpg"
    },
    {
      id: 29,
      name: "Ardiles Daily Runner",
      brand: "ardiles",
      type: "casual",
      price: 379000,
      features: ["lightweight"],
      description: "Sepatu lari santai untuk penggunaan harian",
      rating: 3.8,
      image: "../assets/images/products/ardiles-daily-runner.jpg"
    },
    {
      id: 30,
      name: "Ardiles Sprint",
      brand: "ardiles",
      type: "road",
      price: 469000,
      features: ["lightweight", "stability"],
      description: "Sepatu lari jalan untuk sprint pendek",
      rating: 4.2,
      image: "../assets/images/products/ardiles-sprint.jpg"
    },
    
    // Brand Indonesia: Mills
    {
      id: 31,
      name: "Mills Velocity Runner",
      brand: "mills",
      type: "road",
      price: 599000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan teknologi bantalan udara",
      rating: 4.4,
      image: "../assets/images/products/mills-velocity.jpg"
    },
    {
      id: 32,
      name: "Mills Enduro",
      brand: "mills",
      type: "marathon",
      price: 799000,
      features: ["lightweight", "stability"],
      description: "Sepatu maraton dengan daya tahan tinggi",
      rating: 4.6,
      image: "../assets/images/products/mills-enduro.jpg"
    },
    {
      id: 33,
      name: "Mills Terrain Master",
      brand: "mills",
      type: "trail",
      price: 749000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan grip superior",
      rating: 4.5,
      image: "../assets/images/products/mills-terrain.jpg"
    },
    {
      id: 34,
      name: "Mills Everyday Runner",
      brand: "mills",
      type: "casual",
      price: 499000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai dengan desain modern",
      rating: 4.2,
      image: "../assets/images/products/mills-everyday.jpg"
    },
    {
      id: 35,
      name: "Mills Speedster",
      brand: "mills",
      type: "road",
      price: 649000,
      features: ["lightweight", "stability"],
      description: "Sepatu lari jalan dengan fokus pada kecepatan",
      rating: 4.3,
      image: "../assets/images/products/mills-speedster.jpg"
    },
    {
      id: 36,
      name: "Mills Marathon Elite",
      brand: "mills",
      type: "marathon",
      price: 899000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton premium untuk kompetisi",
      rating: 4.7,
      image: "../assets/images/products/mills-marathon-elite.jpg"
    },
    {
      id: 37,
      name: "Mills Trail Explorer",
      brand: "mills",
      type: "trail",
      price: 799000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk medan ekstrem",
      rating: 4.6,
      image: "../assets/images/products/mills-trail-explorer.jpg"
    },
    {
      id: 38,
      name: "Mills Jogger",
      brand: "mills",
      type: "casual",
      price: 449000,
      features: ["lightweight"],
      description: "Sepatu lari santai untuk jogging ringan",
      rating: 4.0,
      image: "../assets/images/products/mills-jogger.jpg"
    },
    {
      id: 39,
      name: "Mills Road Warrior",
      brand: "mills",
      type: "road",
      price: 699000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan bantalan responsif",
      rating: 4.5,
      image: "../assets/images/products/mills-road-warrior.jpg"
    },
    {
      id: 40,
      name: "Mills Mountain Runner",
      brand: "mills",
      type: "trail",
      price: 849000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk pendakian",
      rating: 4.8,
      image: "../assets/images/products/mills-mountain-runner.jpg"
    },
    
    // Brand Internasional: Nike
    {
      id: 41,
      name: "Nike Air Zoom Pegasus 38",
      brand: "nike",
      type: "road",
      price: 1799000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan teknologi Air Zoom",
      rating: 4.7,
      image: "../assets/images/products/nike-pegasus-38.jpg"
    },
    {
      id: 42,
      name: "Nike ZoomX Vaporfly Next% 2",
      brand: "nike",
      type: "marathon",
      price: 3499000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi carbon plate",
      rating: 4.9,
      image: "../assets/images/products/nike-vaporfly.jpg"
    },
    {
      id: 43,
      name: "Nike Wildhorse 7",
      brand: "nike",
      type: "trail",
      price: 1999000,
      features: ["stability", "waterproof"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.6,
      image: "../assets/images/products/nike-wildhorse.jpg"
    },
    {
      id: 44,
      name: "Nike Revolution 6",
      brand: "nike",
      type: "casual",
      price: 999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai untuk penggunaan sehari-hari",
      rating: 4.3,
      image: "../assets/images/products/nike-revolution.jpg"
    },
    {
      id: 45,
      name: "Nike Air Zoom Tempo NEXT%",
      brand: "nike",
      type: "road",
      price: 2799000,
      features: ["lightweight", "stability"],
      description: "Sepatu lari jalan dengan performa tinggi",
      rating: 4.8,
      image: "../assets/images/products/nike-tempo.jpg"
    },
    {
      id: 46,
      name: "Nike ZoomX Invincible Run",
      brand: "nike",
      type: "road",
      price: 2499000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan maksimal",
      rating: 4.7,
      image: "../assets/images/products/nike-invincible.jpg"
    },
    {
      id: 47,
      name: "Nike Pegasus Trail 3",
      brand: "nike",
      type: "trail",
      price: 1899000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan traksi superior",
      rating: 4.5,
      image: "../assets/images/products/nike-pegasus-trail.jpg"
    },
    {
      id: 48,
      name: "Nike Alphafly Next%",
      brand: "nike",
      type: "marathon",
      price: 3999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton premium dengan teknologi terbaru",
      rating: 5.0,
      image: "../assets/images/products/nike-alphafly.jpg"
    },
    {
      id: 49,
      name: "Nike Winflo 8",
      brand: "nike",
      type: "casual",
      price: 1299000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai dengan bantalan responsif",
      rating: 4.4,
      image: "../assets/images/products/nike-winflo.jpg"
    },
    {
      id: 50,
      name: "Nike Structure 24",
      brand: "nike",
      type: "road",
      price: 1899000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.6,
      image: "../assets/images/products/nike-structure.jpg"
    },
    
    // Brand Internasional: New Balance
    {
      id: 51,
      name: "New Balance Fresh Foam 1080v11",
      brand: "new-balance",
      type: "road",
      price: 2299000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan Fresh Foam",
      rating: 4.7,
      image: "../assets/images/products/nb-1080.jpg"
    },
    {
      id: 52,
      name: "New Balance FuelCell RC Elite v2",
      brand: "new-balance",
      type: "marathon",
      price: 3299000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi carbon plate",
      rating: 4.8,
      image: "../assets/images/products/nb-fuelcell-elite.jpg"
    },
    {
      id: 53,
      name: "New Balance Fresh Foam Hierro v6",
      brand: "new-balance",
      type: "trail",
      price: 1999000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.6,
      image: "../assets/images/products/nb-hierro.jpg"
    },
    {
      id: 54,
      name: "New Balance Fresh Foam Arishi v3",
      brand: "new-balance",
      type: "casual",
      price: 999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai untuk penggunaan sehari-hari",
      rating: 4.3,
      image: "../assets/images/products/nb-arishi.jpg"
    },
    {
      id: 55,
      name: "New Balance 880v11",
      brand: "new-balance",
      type: "road",
      price: 1899000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan responsif",
      rating: 4.5,
      image: "../assets/images/products/nb-880.jpg"
    },
    {
      id: 56,
      name: "New Balance FuelCell Rebel v2",
      brand: "new-balance",
      type: "road",
      price: 1999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan fokus pada kecepatan",
      rating: 4.7,
      image: "../assets/images/products/nb-rebel.jpg"
    },
    {
      id: 57,
      name: "New Balance Summit Unknown v3",
      brand: "new-balance",
      type: "trail",
      price: 1799000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running untuk medan teknis",
      rating: 4.4,
      image: "../assets/images/products/nb-summit.jpg"
    },
    {
      id: 58,
      name: "New Balance FuelCell TC",
      brand: "new-balance",
      type: "marathon",
      price: 2499000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.6,
      image: "../assets/images/products/nb-fuelcell-tc.jpg"
    },
    {
      id: 59,
      name: "New Balance Fresh Foam Tempo",
      brand: "new-balance",
      type: "casual",
      price: 1299000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai dengan desain modern",
      rating: 4.2,
      image: "../assets/images/products/nb-tempo.jpg"
    },
    {
      id: 60,
      name: "New Balance 860v12",
      brand: "new-balance",
      type: "road",
      price: 1799000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.5,
      image: "../assets/images/products/nb-860.jpg"
    },
    
    // Brand Internasional: Asics
    {
      id: 61,
      name: "Asics Gel-Nimbus 23",
      brand: "asics",
      type: "road",
      price: 2299000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan teknologi GEL",
      rating: 4.7,
      image: "../assets/images/products/asics-nimbus.jpg"
    },
    {
      id: 62,
      name: "Asics MetaSpeed Sky",
      brand: "asics",
      type: "marathon",
      price: 3299000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi carbon plate",
      rating: 4.9,
      image: "../assets/images/products/asics-metaspeed.jpg"
    },
    {
      id: 63,
      name: "Asics Gel-Trabuco 9",
      brand: "asics",
      type: "trail",
      price: 1999000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.6,
      image: "../assets/images/products/asics-trabuco.jpg"
    },
    {
      id: 64,
      name: "Asics Gel-Contend 7",
      brand: "asics",
      type: "casual",
      price: 999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai untuk penggunaan sehari-hari",
      rating: 4.2,
      image: "../assets/images/products/asics-contend.jpg"
    },
    {
      id: 65,
      name: "Asics Gel-Kayano 28",
      brand: "asics",
      type: "road",
      price: 2199000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.8,
      image: "../assets/images/products/asics-kayano.jpg"
    },
    {
      id: 66,
      name: "Asics Novablast 2",
      brand: "asics",
      type: "road",
      price: 1899000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan bantalan responsif",
      rating: 4.7,
      image: "../assets/images/products/asics-novablast.jpg"
    },
    {
      id: 67,
      name: "Asics Fujitrabuco Pro",
      brand: "asics",
      type: "trail",
      price: 2099000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk medan ekstrem",
      rating: 4.5,
      image: "../assets/images/products/asics-fujitrabuco.jpg"
    },
    {
      id: 68,
      name: "Asics Magic Speed",
      brand: "asics",
      type: "marathon",
      price: 2499000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.6,
      image: "../assets/images/products/asics-magic.jpg"
    },
    {
      id: 69,
      name: "Asics Gel-Excite 8",
      brand: "asics",
      type: "casual",
      price: 1099000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai dengan bantalan GEL",
      rating: 4.3,
      image: "../assets/images/products/asics-excite.jpg"
    },
    {
      id: 70,
      name: "Asics GT-2000 9",
      brand: "asics",
      type: "road",
      price: 1799000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.5,
      image: "../assets/images/products/asics-gt2000.jpg"
    },
    
    // Brand Internasional: Hoka
    {
      id: 71,
      name: "Hoka Clifton 8",
      brand: "hoka",
      type: "road",
      price: 2199000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan bantalan maksimal",
      rating: 4.7,
      image: "../assets/images/products/hoka-clifton.jpg"
    },
    {
      id: 72,
      name: "Hoka Carbon X 2",
      brand: "hoka",
      type: "marathon",
      price: 3299000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi carbon plate",
      rating: 4.8,
      image: "../assets/images/products/hoka-carbon.jpg"
    },
    {
      id: 73,
      name: "Hoka Speedgoat 4",
      brand: "hoka",
      type: "trail",
      price: 2099000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan grip superior",
      rating: 4.6,
      image: "../assets/images/products/hoka-speedgoat.jpg"
    },
    {
      id: 74,
      name: "Hoka Rincon 3",
      brand: "hoka",
      type: "casual",
      price: 1699000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai dengan bobot ringan",
      rating: 4.5,
      image: "../assets/images/products/hoka-rincon.jpg"
    },
    {
      id: 75,
      name: "Hoka Bondi 7",
      brand: "hoka",
      type: "road",
      price: 2399000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan maksimal",
      rating: 4.7,
      image: "../assets/images/products/hoka-bondi.jpg"
    },
    {
      id: 76,
      name: "Hoka Mach 4",
      brand: "hoka",
      type: "road",
      price: 1999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan responsivitas tinggi",
      rating: 4.6,
      image: "../assets/images/products/hoka-mach.jpg"
    },
    {
      id: 77,
      name: "Hoka Challenger ATR 6",
      brand: "hoka",
      type: "trail",
      price: 1899000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk berbagai medan",
      rating: 4.4,
      image: "../assets/images/products/hoka-challenger.jpg"
    },
    {
      id: 78,
      name: "Hoka Rocket X",
      brand: "hoka",
      type: "marathon",
      price: 2799000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.7,
      image: "../assets/images/products/hoka-rocket.jpg"
    },
    {
      id: 79,
      name: "Hoka Arahi 5",
      brand: "hoka",
      type: "road",
      price: 1999000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.5,
      image: "../assets/images/products/hoka-arahi.jpg"
    },
    {
      id: 80,
      name: "Hoka Torrent 2",
      brand: "hoka",
      type: "trail",
      price: 1799000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running ringan dan responsif",
      rating: 4.3,
      image: "../assets/images/products/hoka-torrent.jpg"
    },
    
    // Brand Internasional: Mizuno
    {
      id: 81,
      name: "Mizuno Wave Rider 25",
      brand: "mizuno",
      type: "road",
      price: 1999000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan teknologi Wave",
      rating: 4.6,
      image: "../assets/images/products/mizuno-rider.jpg"
    },
    {
      id: 82,
      name: "Mizuno Wave Rebellion",
      brand: "mizuno",
      type: "marathon",
      price: 2799000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi carbon plate",
      rating: 4.7,
      image: "../assets/images/products/mizuno-rebellion.jpg"
    },
    {
      id: 83,
      name: "Mizuno Wave Daichi 6",
      brand: "mizuno",
      type: "trail",
      price: 1899000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.5,
      image: "../assets/images/products/mizuno-daichi.jpg"
    },
    {
      id: 84,
      name: "Mizuno Wave Inspire 17",
      brand: "mizuno",
      type: "road",
      price: 1799000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.4,
      image: "../assets/images/products/mizuno-inspire.jpg"
    },
    {
      id: 85,
      name: "Mizuno Wave Horizon 5",
      brand: "mizuno",
      type: "road",
      price: 2199000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan maksimal",
      rating: 4.6,
      image: "../assets/images/products/mizuno-horizon.jpg"
    },
    {
      id: 86,
      name: "Mizuno Wave Sky 5",
      brand: "mizuno",
      type: "road",
      price: 2299000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan premium",
      rating: 4.7,
      image: "../assets/images/products/mizuno-sky.jpg"
    },
    {
      id: 87,
      name: "Mizuno Wave Mujin 7",
      brand: "mizuno",
      type: "trail",
      price: 1999000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk medan ekstrem",
      rating: 4.5,
      image: "../assets/images/products/mizuno-mujin.jpg"
    },
    {
      id: 88,
      name: "Mizuno Wave Neo Wind",
      brand: "mizuno",
      type: "marathon",
      price: 2499000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.6,
      image: "../assets/images/products/mizuno-neo.jpg"
    },
    {
      id: 89,
      name: "Mizuno Wave Creation 22",
      brand: "mizuno",
      type: "road",
      price: 2399000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan maksimal",
      rating: 4.5,
      image: "../assets/images/products/mizuno-creation.jpg"
    },
    {
      id: 90,
      name: "Mizuno Wave Prophecy 10",
      brand: "mizuno",
      type: "road",
      price: 2999000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan teknologi Wave premium",
      rating: 4.8,
      image: "../assets/images/products/mizuno-prophecy.jpg"
    },
    
    // Brand Internasional: Puma
    {
      id: 91,
      name: "Puma Velocity Nitro",
      brand: "puma",
      type: "road",
      price: 1799000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan teknologi Nitro",
      rating: 4.5,
      image: "../assets/images/products/puma-velocity.jpg"
    },
    {
      id: 92,
      name: "Puma Deviate Nitro Elite",
      brand: "puma",
      type: "marathon",
      price: 2999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi carbon plate",
      rating: 4.8,
      image: "../assets/images/products/puma-deviate.jpg"
    },
    {
      id: 93,
      name: "Puma Voyage Nitro",
      brand: "puma",
      type: "trail",
      price: 1899000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.4,
      image: "../assets/images/products/puma-voyage.jpg"
    },
    {
      id: 94,
      name: "Puma Liberate Nitro",
      brand: "puma",
      type: "road",
      price: 1599000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan ringan dan responsif",
      rating: 4.3,
      image: "../assets/images/products/puma-liberate.jpg"
    },
    {
      id: 95,
      name: "Puma Eternity Nitro",
      brand: "puma",
      type: "road",
      price: 1899000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.5,
      image: "../assets/images/products/puma-eternity.jpg"
    },
    {
      id: 96,
      name: "Puma Magnify Nitro",
      brand: "puma",
      type: "road",
      price: 1999000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan maksimal",
      rating: 4.6,
      image: "../assets/images/products/puma-magnify.jpg"
    },
    {
      id: 97,
      name: "Puma Fast-R Nitro Elite",
      brand: "puma",
      type: "marathon",
      price: 3299000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.9,
      image: "../assets/images/products/puma-fast-r.jpg"
    },
    {
      id: 98,
      name: "Puma ForeverRun Nitro",
      brand: "puma",
      type: "road",
      price: 1899000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan untuk jarak jauh",
      rating: 4.5,
      image: "../assets/images/products/puma-foreverrun.jpg"
    },
    {
      id: 99,
      name: "Puma Softride Enzo",
      brand: "puma",
      type: "casual",
      price: 999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai dengan bantalan Softride",
      rating: 4.2,
      image: "../assets/images/products/puma-enzo.jpg"
    },
    {
      id: 100,
      name: "Puma Retaliate 2.0",
      brand: "puma",
      type: "casual",
      price: 899000,
      features: ["lightweight"],
      description: "Sepatu lari santai untuk penggunaan sehari-hari",
      rating: 4.0,
      image: "../assets/images/products/puma-retaliate.jpg"
    },
    
    // Brand Internasional: Brodo
    {
      id: 101,
      name: "Brodo Sprinter",
      brand: "brodo",
      type: "road",
      price: 899000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan desain minimalis",
      rating: 4.3,
      image: "../assets/images/products/brodo-sprinter.jpg"
    },
    {
      id: 102,
      name: "Brodo Endurance",
      brand: "brodo",
      type: "marathon",
      price: 1299000,
      features: ["lightweight", "stability"],
      description: "Sepatu maraton dengan daya tahan tinggi",
      rating: 4.4,
      image: "../assets/images/products/brodo-endurance.jpg"
    },
    {
      id: 103,
      name: "Brodo Trail Master",
      brand: "brodo",
      type: "trail",
      price: 1199000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan grip superior",
      rating: 4.5,
      image: "../assets/images/products/brodo-trail.jpg"
    },
    {
      id: 104,
      name: "Brodo Daily Runner",
      brand: "brodo",
      type: "casual",
      price: 799000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai untuk penggunaan sehari-hari",
      rating: 4.2,
      image: "../assets/images/products/brodo-daily.jpg"
    },
    {
      id: 105,
      name: "Brodo Velocity",
      brand: "brodo",
      type: "road",
      price: 999000,
      features: ["lightweight", "stability"],
      description: "Sepatu lari jalan dengan fokus pada kecepatan",
      rating: 4.3,
      image: "../assets/images/products/brodo-velocity.jpg"
    },
    {
      id: 106,
      name: "Brodo Marathon Pro",
      brand: "brodo",
      type: "marathon",
      price: 1399000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.5,
      image: "../assets/images/products/brodo-marathon.jpg"
    },
    {
      id: 107,
      name: "Brodo Terrain",
      brand: "brodo",
      type: "trail",
      price: 1299000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk medan ekstrem",
      rating: 4.4,
      image: "../assets/images/products/brodo-terrain.jpg"
    },
    {
      id: 108,
      name: "Brodo Jogger",
      brand: "brodo",
      type: "casual",
      price: 699000,
      features: ["lightweight"],
      description: "Sepatu lari santai untuk jogging ringan",
      rating: 4.0,
      image: "../assets/images/products/brodo-jogger.jpg"
    },
    {
      id: 109,
      name: "Brodo Road Runner",
      brand: "brodo",
      type: "road",
      price: 1099000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan bantalan responsif",
      rating: 4.3,
      image: "../assets/images/products/brodo-road.jpg"
    },
    {
      id: 110,
      name: "Brodo Mountain Runner",
      brand: "brodo",
      type: "trail",
      price: 1399000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk pendakian",
      rating: 4.6,
      image: "../assets/images/products/brodo-mountain.jpg"
    },
    
    // Brand Internasional: Saucony
    {
      id: 111,
      name: "Saucony Ride 14",
      brand: "saucony",
      type: "road",
      price: 1899000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan bantalan PWRRUN",
      rating: 4.6,
      image: "../assets/images/products/saucony-ride.jpg"
    },
    {
      id: 112,
      name: "Saucony Endorphin Pro 2",
      brand: "saucony",
      type: "marathon",
      price: 2999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi carbon plate",
      rating: 4.8,
      image: "../assets/images/products/saucony-endorphin-pro.jpg"
    },
    {
      id: 113,
      name: "Saucony Peregrine 11",
      brand: "saucony",
      type: "trail",
      price: 1999000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.7,
      image: "../assets/images/products/saucony-peregrine.jpg"
    },
    {
      id: 114,
      name: "Saucony Kinvara 12",
      brand: "saucony",
      type: "road",
      price: 1699000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan ringan dan responsif",
      rating: 4.5,
      image: "../assets/images/products/saucony-kinvara.jpg"
    },
    {
      id: 115,
      name: "Saucony Guide 14",
      brand: "saucony",
      type: "road",
      price: 1799000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.4,
      image: "../assets/images/products/saucony-guide.jpg"
    },
    {
      id: 116,
      name: "Saucony Triumph 19",
      brand: "saucony",
      type: "road",
      price: 2099000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan maksimal",
      rating: 4.7,
      image: "../assets/images/products/saucony-triumph.jpg"
    },
    {
      id: 117,
      name: "Saucony Xodus 11",
      brand: "saucony",
      type: "trail",
      price: 2199000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk medan ekstrem",
      rating: 4.6,
      image: "../assets/images/products/saucony-xodus.jpg"
    },
    {
      id: 118,
      name: "Saucony Endorphin Speed 2",
      brand: "saucony",
      type: "marathon",
      price: 2499000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.7,
      image: "../assets/images/products/saucony-endorphin-speed.jpg"
    },
    {
      id: 119,
      name: "Saucony Jazz 21",
      brand: "saucony",
      type: "casual",
      price: 1299000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari santai dengan desain klasik",
      rating: 4.3,
      image: "../assets/images/products/saucony-jazz.jpg"
    },
    {
      id: 120,
      name: "Saucony Hurricane 23",
      brand: "saucony",
      type: "road",
      price: 2199000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan maksimal",
      rating: 4.5,
      image: "../assets/images/products/saucony-hurricane.jpg"
    },
    
    // Brand Internasional: Adidas
    {
      id: 121,
      name: "Adidas Ultraboost 21",
      brand: "adidas",
      type: "road",
      price: 2499000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan teknologi Boost",
      rating: 4.7,
      image: "../assets/images/products/adidas-ultraboost.jpg"
    },
    {
      id: 122,
      name: "Adidas Adizero Adios Pro 2",
      brand: "adidas",
      type: "marathon",
      price: 3299000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan teknologi carbon rods",
      rating: 4.9,
      image: "../assets/images/products/adidas-adizero.jpg"
    },
    {
      id: 123,
      name: "Adidas Terrex Speed Ultra",
      brand: "adidas",
      type: "trail",
      price: 2199000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running dengan teknologi Continental",
      rating: 4.6,
      image: "../assets/images/products/adidas-terrex-speed.jpg"
    },
    {
      id: 124,
      name: "Adidas SolarGlide 4",
      brand: "adidas",
      type: "road",
      price: 1899000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.5,
      image: "../assets/images/products/adidas-solarglide.jpg"
    },
    {
      id: 125,
      name: "Adidas Supernova",
      brand: "adidas",
      type: "road",
      price: 1699000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan responsif",
      rating: 4.4,
      image: "../assets/images/products/adidas-supernova.jpg"
    },
    {
      id: 126,
      name: "Adidas Terrex Agravic Flow",
      brand: "adidas",
      type: "trail",
      price: 1999000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk medan teknis",
      rating: 4.7,
      image: "../assets/images/products/adidas-agravic.jpg"
    },
    {
      id: 127,
      name: "Adidas SL20.2",
      brand: "adidas",
      type: "road",
      price: 1599000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan ringan dan responsif",
      rating: 4.3,
      image: "../assets/images/products/adidas-sl20.jpg"
    },
    {
      id: 128,
      name: "Adidas Adizero Boston 10",
      brand: "adidas",
      type: "marathon",
      price: 2199000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu maraton dengan performa tinggi",
      rating: 4.6,
      image: "../assets/images/products/adidas-boston.jpg"
    },
    {
      id: 129,
      name: "Adidas Runfalcon 2.0",
      brand: "adidas",
      type: "casual",
      price: 899000,
      features: ["lightweight"],
      description: "Sepatu lari santai untuk penggunaan sehari-hari",
      rating: 4.1,
      image: "../assets/images/products/adidas-runfalcon.jpg"
    },
    {
      id: 130,
      name: "Adidas Solar Boost 3",
      brand: "adidas",
      type: "road",
      price: 1999000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.5,
      image: "../assets/images/products/adidas-solarboost.jpg"
    },
    
    // Brand Internasional: Lainnya
    {
      id: 131,
      name: "Brooks Ghost 14",
      brand: "brooks",
      type: "road",
      price: 1999000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan DNA Loft",
      rating: 4.7,
      image: "../assets/images/products/brooks-ghost.jpg"
    },
    {
      id: 132,
      name: "On Cloudflow",
      brand: "on",
      type: "road",
      price: 2199000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan teknologi CloudTec",
      rating: 4.6,
      image: "../assets/images/products/on-cloudflow.jpg"
    },
    {
      id: 133,
      name: "Under Armour HOVR Machina 2",
      brand: "under-armour",
      type: "road",
      price: 1999000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan teknologi HOVR",
      rating: 4.5,
      image: "../assets/images/products/ua-machina.jpg"
    },
    {
      id: 134,
      name: "Salomon Speedcross 5",
      brand: "salomon",
      type: "trail",
      price: 1999000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running dengan grip superior",
      rating: 4.8,
      image: "../assets/images/products/salomon-speedcross.jpg"
    },
    {
      id: 135,
      name: "Reebok Floatride Energy 3",
      brand: "reebok",
      type: "road",
      price: 1599000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan bantalan Floatride",
      rating: 4.4,
      image: "../assets/images/products/reebok-floatride.jpg"
    },
    {
      id: 136,
      name: "Altra Lone Peak 5",
      brand: "altra",
      type: "trail",
      price: 1899000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running dengan toe box lebar",
      rating: 4.6,
      image: "../assets/images/products/altra-lone-peak.jpg"
    },
    {
      id: 137,
      name: "Topo Athletic Ultrafly 3",
      brand: "topo",
      type: "road",
      price: 1799000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.3,
      image: "../assets/images/products/topo-ultrafly.jpg"
    },
    {
      id: 138,
      name: "Inov-8 Terraultra G 270",
      brand: "inov-8",
      type: "trail",
      price: 2299000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running dengan daya tahan tinggi",
      rating: 4.7,
      image: "../assets/images/products/inov8-terraultra.jpg"
    },
    {
      id: 139,
      name: "Merrell MTL Skyfire",
      brand: "merrell",
      type: "trail",
      price: 1799000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running ringan dan responsif",
      rating: 4.4,
      image: "../assets/images/products/merrell-skyfire.jpg"
    },
    {
      id: 140,
      name: "La Sportiva Jackal",
      brand: "la-sportiva",
      type: "trail",
      price: 2199000,
      features: ["waterproof", "stability"],
      description: "Sepatu trail running untuk ultra marathon",
      rating: 4.6,
      image: "../assets/images/products/la-sportiva-jackal.jpg"
    },
    {
      id: 141,
      name: "Diadora Mythos Blushield Volo",
      brand: "diadora",
      type: "road",
      price: 1699000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan teknologi Blushield",
      rating: 4.3,
      image: "../assets/images/products/diadora-mythos.jpg"
    },
    {
      id: 142,
      name: "Karhu Ikoni 2020",
      brand: "karhu",
      type: "road",
      price: 1899000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan teknologi Fulcrum",
      rating: 4.4,
      image: "../assets/images/products/karhu-ikoni.jpg"
    },
    {
      id: 143,
      name: "361 Degrees Spire 4",
      brand: "361",
      type: "road",
      price: 1799000,
      features: ["cushioning", "stability"],
      description: "Sepatu lari jalan dengan bantalan QU!KFOAM",
      rating: 4.2,
      image: "../assets/images/products/361-spire.jpg"
    },
    {
      id: 144,
      name: "Newton Gravity 10",
      brand: "newton",
      type: "road",
      price: 1999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan dengan teknologi Action/Reaction",
      rating: 4.5,
      image: "../assets/images/products/newton-gravity.jpg"
    },
    {
      id: 145,
      name: "Kalenji Run Support",
      brand: "kalenji",
      type: "road",
      price: 899000,
      features: ["stability", "cushioning"],
      description: "Sepatu lari jalan dengan dukungan stabilitas",
      rating: 4.0,
      image: "../assets/images/products/kalenji-support.jpg"
    },
    {
      id: 146,
      name: "Columbia Montrail F.K.T.",
      brand: "columbia",
      type: "trail",
      price: 1899000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running dengan teknologi FluidFoam",
      rating: 4.3,
      image: "../assets/images/products/columbia-fkt.jpg"
    },
    {
      id: 147,
      name: "Scarpa Spin Ultra",
      brand: "scarpa",
      type: "trail",
      price: 2099000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running untuk jarak jauh",
      description: "Sepatu trail running untuk jarak jauh",
      rating: 4.5,
      image: "../assets/images/products/scarpa-spin.jpg"
    },
    {
      id: 148,
      name: "The North Face Flight VECTIV",
      brand: "north-face",
      type: "trail",
      price: 2299000,
      features: ["lightweight", "stability"],
      description: "Sepatu trail running dengan teknologi carbon plate",
      rating: 4.7,
      image: "../assets/images/products/tnf-vectiv.jpg"
    },
    {
      id: 149,
      name: "Skechers GOrun Razor 3+",
      brand: "skechers",
      type: "road",
      price: 1499000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan ringan dan responsif",
      rating: 4.4,
      image: "../assets/images/products/skechers-razor.jpg"
    },
    {
      id: 150,
      name: "Veja Condor 2",
      brand: "veja",
      type: "road",
      price: 1999000,
      features: ["lightweight", "cushioning"],
      description: "Sepatu lari jalan ramah lingkungan",
      rating: 4.2,
      image: "../assets/images/products/veja-condor.jpg"
    }
  ];
  // DOM elements
  const filterButton = document.getElementById("open-filter-btn");
  const filterModal = document.getElementById("filter-modal");
  const closeFilterModal = document.getElementById("close-filter-modal");
  const applyFilterBtn = document.querySelector(".products-sidebar .btn-primary");
  const applyModalFilterBtn = document.getElementById("apply-filters");
  const priceMinSlider = document.getElementById("price-min");
  const priceMaxSlider = document.getElementById("price-max");
  const modalPriceMinSlider = document.getElementById("modal-price-min");
  const modalPriceMaxSlider = document.getElementById("modal-price-max");
  const priceRange = document.querySelector(".price-range");
  const modalPriceRange = document.querySelector(".filter-modal .price-range");
  const productsGrid = document.querySelector(".products-grid");

  // Debugging: Check if critical DOM elements exist
  if (!filterButton) console.error("Open filter button (#open-filter-btn) not found.");
  if (!filterModal) console.error("Filter modal (#filter-modal) not found.");
  if (!closeFilterModal) console.error("Close filter modal button (#close-filter-modal) not found.");
  if (!applyFilterBtn) console.error("Sidebar apply filter button (.products-sidebar .btn-primary) not found.");
  if (!applyModalFilterBtn) console.error("Modal apply filter button (#apply-filters) not found.");
  if (!productsGrid) console.error("Products grid (.products-grid) not found.");
  if (!priceMinSlider || !priceMaxSlider || !priceRange) {
    console.warn("Sidebar price sliders or range not found.");
  }
  if (!modalPriceMinSlider || !modalPriceMaxSlider || !modalPriceRange) {
    console.warn("Modal price sliders or range not found.");
  }

  // Function to initialize price sliders
  function initializePriceSlider(minSlider, maxSlider, rangeElement) {
    if (minSlider && maxSlider && rangeElement) {
      const minSpan = rangeElement.querySelector("span:first-child");
      const maxSpan = rangeElement.querySelector("span:last-child");

      minSlider.addEventListener("input", () => {
        const minValue = Number.parseInt(minSlider.value);
        const maxValue = Number.parseInt(maxSlider.value);
        if (minValue >= maxValue) {
          minSlider.value = maxValue - 100000;
          minSpan.textContent = formatPrice(maxValue - 100000);
        } else {
          minSpan.textContent = formatPrice(minValue);
        }
      });

      maxSlider.addEventListener("input", () => {
        const minValue = Number.parseInt(minSlider.value);
        const maxValue = Number.parseInt(maxSlider.value);
        if (maxValue <= minValue) {
          maxSlider.value = minValue + 100000;
          maxSpan.textContent = formatPrice(minValue + 100000);
        } else {
          maxSpan.textContent = formatPrice(maxValue);
        }
      });

      // Initialize displayed values
      minSpan.textContent = formatPrice(Number.parseInt(minSlider.value));
      maxSpan.textContent = formatPrice(Number.parseInt(maxSlider.value));
    }
  }

  // Initialize price sliders
  initializePriceSlider(priceMinSlider, priceMaxSlider, priceRange);
  initializePriceSlider(modalPriceMinSlider, modalPriceMaxSlider, modalPriceRange);

  // Open filter modal
  if (filterButton && filterModal) {
    filterButton.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent any default behavior
      console.debug("Open filter button clicked");
      filterModal.style.display = "flex";
    });
  }

  // Close filter modal
  if (closeFilterModal && filterModal) {
    closeFilterModal.addEventListener("click", () => {
      console.debug("Close filter modal clicked");
      filterModal.style.display = "none";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === filterModal) {
        console.debug("Clicked outside modal");
        filterModal.style.display = "none";
      }
    });
  }

  // Function to apply filters
  function applyFilters() {
    console.debug("Applying filters");
    const selectedTypes = [];
    const selectedFeatures = [];
    const selectedBrands = [];
    let minPrice = filterModal && filterModal.style.display === "flex" && modalPriceMinSlider
      ? Number.parseInt(modalPriceMinSlider.value)
      : priceMinSlider
      ? Number.parseInt(priceMinSlider.value)
      : 300000;
    let maxPrice = filterModal && filterModal.style.display === "flex" && modalPriceMaxSlider
      ? Number.parseInt(modalPriceMaxSlider.value)
      : priceMaxSlider
      ? Number.parseInt(priceMaxSlider.value)
      : 5000000;

    // Get selected filter values
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        if (checkbox.name === "type") {
          selectedTypes.push(checkbox.value);
        } else if (checkbox.name === "feature") {
          selectedFeatures.push(checkbox.value);
        } else if (checkbox.name === "brand") {
          selectedBrands.push(checkbox.value);
        }
      }
    });

    // Filter products
    const filteredProducts = products.filter(product => {
      const matchesType = selectedTypes.length ? selectedTypes.includes(product.type) : true;
      const matchesFeature = selectedFeatures.length ? selectedFeatures.every(feature => product.features.includes(feature)) : true;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesBrand = selectedBrands.length ? selectedBrands.includes(product.brand) : true;

      return matchesType && matchesFeature && matchesPrice && matchesBrand;
    });

    // Render filtered products
    renderProducts(filteredProducts);

    // Close modal
    if (filterModal) {
      filterModal.style.display = "none";
    }
  }

  // Apply filters only when "Terapkan Filter" buttons are clicked
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.debug("Sidebar apply filter button clicked");
      applyFilters();
    });
  }
  if (applyModalFilterBtn) {
    applyModalFilterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.debug("Modal apply filter button clicked");
      applyFilters();
    });
  }

  // Function to render products
  function renderProducts(filteredProducts, page = 1) {
    if (!productsGrid) return;

    productsGrid.innerHTML = "";
    const productsPerPage = 9;
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-products">
          <p>Tidak ada produk yang sesuai dengan filter yang dipilih.</p>
        </div>
      `;
      return;
    }

    paginatedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-rating">
            <i class="fas fa-star"></i>
            <span>${product.rating}</span>
          </div>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="product-price">${formatPrice(product.price)}</p>
        </div>
      `;
      productsGrid.appendChild(productCard);
    });
  }

  // Initial render of all products
  renderProducts(products);
});