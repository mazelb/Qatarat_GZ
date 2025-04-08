import React from 'react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

/**
 * TeamMemberCard component
 * Displays information about a team member with their photo, name, role, and bio
 * 
 * @param {TeamMemberCardProps} props - Component props
 * @returns {JSX.Element} Rendered team member card
 */
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative h-64 w-full">
        <Image
          src={member.image || '/images/about/default-profile.jpg'}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
        <p className="text-red-600 font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 line-clamp-4">{member.bio}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
