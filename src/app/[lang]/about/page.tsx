// Moving from /app/about/page.tsx to /app/[lang]/about/page.tsx

import Image from 'next/image';
import { Metadata } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import TeamMemberCard from '@/components/about/TeamMemberCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorDisplay from '@/components/ui/ErrorDisplay';

export const metadata: Metadata = {
  title: 'About Us | Qatarat Gaza',
  description: 'Learn about our mission, vision, and the team behind Qatarat Gaza charity organization.',
};

// GraphQL query to fetch about page content
const GET_ABOUT_CONTENT = gql`
  query GetAboutContent {
    aboutContent {
      mission
      vision
      values
      story
      headerImage
      teamMembers {
        id
        name
        role
        bio
        image
      }
    }
  }
`;

/**
 * About Us page component
 * Displays organization information and team members
 */
export default async function AboutPage({ params }: { params: { lang: string } }) {
  try {
    const { data } = await getClient().query({
      query: GET_ABOUT_CONTENT,
    });

    if (!data || !data.aboutContent) {
      throw new Error("Failed to fetch about page content");
    }

    const { aboutContent } = data;

    return (
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative h-96 w-full mb-12 rounded-lg overflow-hidden">
          <Image
            src={aboutContent.headerImage || '/images/about/about-hero.jpg'}
            alt="About Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-3">About Qatarat Gaza</h1>
            <p className="text-xl max-w-2xl">Bringing hope and support to Gaza through sustainable initiatives and emergency relief.</p>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">{aboutContent.mission}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-black">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">{aboutContent.vision}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-700">{aboutContent.values}</p>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <p>{aboutContent.story}</p>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          {aboutContent.teamMembers && aboutContent.teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {aboutContent.teamMembers.map((member: any) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Team information coming soon.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching about content:", error);
    return <ErrorDisplay error="Failed to load about page content" />;
  }
}
