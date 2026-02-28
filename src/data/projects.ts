import villaInterior from "@/assets/villa-interior.jpg";
import villaExterior from "@/assets/villa-exterior.jpg";
import brandingFlatlay from "@/assets/branding-flatlay.jpg";
import resortPool from "@/assets/resort-pool.jpg";

export interface ProjectImage {
    src: string;
    alt: string;
    span?: string;
}

export interface ProjectApproach {
    heading: string;
    description: string;
    items: string[];
}

export interface ProjectResult {
    text?: string;
    value?: number;
    suffix?: string;
    label?: string;
}

export interface Project {
    slug: string;
    label: string;
    title: string;
    subtitle: string;
    images: ProjectImage[];
    approach: ProjectApproach;
    results: ProjectResult[];
}

export const projects: Project[] = [
    {
        slug: "celanka-resort-kandy",
        label: "Social Media | Booking Platforms | Business Strategy",
        title: "Celanka Resort – Kandy",
        subtitle: "Art Direction & Strategy: Celanka Resort is a calm retreat in the heart of Kandy. We partnered with the team to build a smooth guest journey, from online discovery to on-property experience.",
        images: [
            { src: resortPool, alt: "Celanka Resort infinity pool", span: "md:col-span-2" },
            { src: villaInterior, alt: "Luxury suite interior" },
            { src: villaExterior, alt: "Resort exterior" },
        ],
        approach: {
            heading: "Art Direction & Strategy",
            description: "Celanka Resort is a calm retreat in the heart of Kandy. We partnered with the team to build a smooth guest journey, from online discovery to on-property experience.",
            items: [
                "Structured guest experience guidelines",
                "Managed social media presence with consistent, calming visuals",
                "Optimized and managed listings on Airbnb, Agoda & Booking.com",
                "Set up and managed Google Business Profile for visibility and reviews",
                "Guided reservation flow and guest communication standards",
            ],
        },
        results: [
            { value: 20, suffix: "%", label: "increase in bookings within first month" },
            { value: 10, suffix: "K+", label: "social interactions in first campaign" },
            { text: "Clear operational structure for daily management" },
        ],
    },
    {
        slug: "peaceful-paradise-villa-hanthana",
        label: "Drone Video | Photography",
        title: "Peaceful Paradise Villa – Hanthana",
        subtitle: "Art Direction & Visual Storytelling: Nestled in the hills of Hanthana, Peaceful Paradise Villa offers breathtaking views and quiet luxury. We focused on capturing the feeling of space, nature, and calm.",
        images: [
            { src: villaExterior, alt: "Peaceful Paradise Villa exterior", span: "md:col-span-2" },
            { src: villaInterior, alt: "Villa interior view" },
            { src: brandingFlatlay, alt: "Visual storytelling content" },
        ],
        approach: {
            heading: "Art Direction & Visual Storytelling",
            description: "Nestled in the hills of Hanthana, Peaceful Paradise Villa offers breathtaking views and quiet luxury. We focused on capturing the feeling of space, nature, and calm.",
            items: [
                "Cinematic drone coverage showcasing landscape and surroundings",
                "Lifestyle and property photography for digital platforms",
                "Visual content crafted for social media and booking platforms",
            ],
        },
        results: [
            { value: 35, suffix: "%", label: "higher engagement through visual storytelling" },
            { value: 5, suffix: "K+", label: "total views on cinematic drone coverage" },
            { text: "High-impact visual assets for online listings" },
        ],
    },
];
