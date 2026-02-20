export interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    type: 'Residential' | 'Commercial' | 'Land';
    status: 'For Sale' | 'For Rent';
    images: string[];
    premiumImages?: string[];
    videos?: string[];
    verified: boolean;
    premium: boolean;
    intelligenceLevel: 'Basic' | 'Inspected';
    detailedDescription?: string;
    faults?: string[];
    landlordRequirements?: string[];
    coordinates?: {
        lat: number;
        lng: number;
    };
    agent: {
        name: string;
        image: string;
        phone: string;
    };
}

export const properties: Property[] = [
    {
        id: '1',
        title: 'Luxury 4 Bedroom Terrace',
        price: 150000000,
        location: 'Lekki Phase 1, Lagos',
        beds: 4,
        baths: 4,
        sqft: 2800,
        type: 'Residential',
        status: 'For Sale',
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1600607687940-47a04b629b67?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'],
        premiumImages: [
            'https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600607687940-47a04b629b67?auto=format&fit=crop&w=800&q=80'
        ],
        videos: ['https://www.w3schools.com/html/mov_bbb.mp4'],
        verified: true,
        premium: true,
        intelligenceLevel: 'Inspected',
        coordinates: { lat: 6.4474, lng: 3.4731 }, // Lekki Phase 1
        detailedDescription: 'A masterfully designed terrace in the heart of Lekki. Features include Italian marble floors, smart home automation, and a private elevator. Minimal wear on the kitchen cabinet hinges is noted.',
        faults: ['Kitchen cabinet hinges slightly loose', 'Guest toilet flush button needs adjustment'],
        landlordRequirements: ['Minimum 2 years rent upfront', 'Working professional with corporate ID', 'No pets allowed'],
        agent: {
            name: 'Oluwaseun Adeyemi',
            image: 'https://i.pravatar.cc/150?u=seun',
            phone: '+234 801 234 5678',
        },
    },
    {
        id: '2',
        title: 'Executive 2 Bedroom Flat',
        price: 3500000,
        location: 'Ikeja G.R.A, Lagos',
        beds: 2,
        baths: 2,
        sqft: 1200,
        type: 'Residential',
        status: 'For Rent',
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1556912173-3db9963f6392?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1595521624992-48a59aef95e3?auto=format&fit=crop&w=800&q=80'],
        verified: true,
        premium: false,
        intelligenceLevel: 'Inspected',
        coordinates: { lat: 6.5833, lng: 3.3500 }, // Ikeja
        agent: {
            name: 'Chidi Okafor',
            image: 'https://i.pravatar.cc/150?u=chidi',
            phone: '+234 802 345 6789',
        },
    },
    {
        id: '3',
        title: 'Prime Commercial Land',
        price: 450000000,
        location: 'Victoria Island, Lagos',
        beds: 0,
        baths: 0,
        sqft: 1500,
        type: 'Land',
        status: 'For Sale',
        images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'],
        verified: true,
        premium: true,
        intelligenceLevel: 'Inspected',
        coordinates: { lat: 6.4281, lng: 3.4219 }, // VI
        agent: {
            name: 'Amina Yusuf',
            image: 'https://i.pravatar.cc/150?u=amina',
            phone: '+234 803 456 7890',
        },
    },
    {
        id: '4',
        title: 'Modern Office Space',
        price: 12000000,
        location: 'Surulere, Lagos',
        beds: 0,
        baths: 2,
        sqft: 3500,
        type: 'Commercial',
        status: 'For Rent',
        images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80'],
        verified: false,
        premium: false,
        intelligenceLevel: 'Basic',
        coordinates: { lat: 6.5000, lng: 3.3500 }, // Surulere
        agent: {
            name: 'Oluwaseun Adeyemi',
            image: 'https://i.pravatar.cc/150?u=seun',
            phone: '+234 801 234 5678',
        },
    },
    // New Properties
    {
        id: '5',
        title: 'Seaside Duplex',
        price: 250000000,
        location: 'Banana Island, Ikoyi',
        beds: 5,
        baths: 6,
        sqft: 4500,
        type: 'Residential',
        status: 'For Sale',
        images: ['https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1510627489930-0c1b0dc58e85?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
        verified: true,
        premium: true,
        intelligenceLevel: 'Inspected',
        coordinates: { lat: 6.4549, lng: 3.4546 }, // Banana Island
        detailedDescription: 'Exclusive waterfront property with private dock access. Fully serviced estate with 24/7 power and security.',
        faults: ['None detected'],
        landlordRequirements: ['Serious buyers only', 'Proof of funds required for inspection'],
        agent: { name: 'Tunde Bakare', image: 'https://i.pravatar.cc/150?u=tunde', phone: '+234 805 678 9012' }
    },
    {
        id: '6',
        title: 'Cozy Studio Apartment',
        price: 800000,
        location: 'Yaba, Lagos',
        beds: 1,
        baths: 1,
        sqft: 600,
        type: 'Residential',
        status: 'For Rent',
        images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80'],
        verified: true,
        premium: false,
        intelligenceLevel: 'Basic', // Purple Tick
        coordinates: { lat: 6.5095, lng: 3.3711 }, // Yaba
        detailedDescription: 'Perfect for students or young professionals. Close to Unilag and tech hubs.',
        agent: { name: 'Kemi Adebayo', image: 'https://i.pravatar.cc/150?u=kemi', phone: '+234 806 789 0123' }
    },
    {
        id: '7',
        title: 'Warehouse with Loading Bay',
        price: 15000000,
        location: 'Apapa, Lagos',
        beds: 0,
        baths: 2,
        sqft: 10000,
        type: 'Commercial',
        status: 'For Rent',
        images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'],
        verified: false,
        premium: false,
        intelligenceLevel: 'Basic',
        coordinates: { lat: 6.4553, lng: 3.3641 }, // Apapa
        agent: { name: 'Emeka Uche', image: 'https://i.pravatar.cc/150?u=emeka', phone: '+234 807 890 1234' }
    },
    {
        id: '8',
        title: 'Serviced 3 Bedroom Apartment',
        price: 5000000,
        location: 'Ikoyi, Lagos',
        beds: 3,
        baths: 3,
        sqft: 2000,
        type: 'Residential',
        status: 'For Rent',
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?auto=format&fit=crop&w=800&q=80'],
        verified: true,
        premium: true,
        intelligenceLevel: 'Inspected', // Gold Crown
        coordinates: { lat: 6.4500, lng: 3.4333 }, // Ikoyi
        detailedDescription: 'Luxury serviced apartment with swimming pool, gym, and 24/7 power.',
        faults: ['Cracked tile in guest bathroom', 'A/C in master bedroom needs servicing'],
        landlordRequirements: ['Expatriates preferred', 'No large parties'],
        agent: { name: 'Zainab Ali', image: 'https://i.pravatar.cc/150?u=zainab', phone: '+234 808 901 2345' }
    }
];
