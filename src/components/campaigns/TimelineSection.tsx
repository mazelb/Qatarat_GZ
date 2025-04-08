import React from 'react';
import Image from 'next/image';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  media?: string;
}

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

/**
 * TimelineSection component
 * Displays a vertical timeline of campaign updates or milestones
 * 
 * @param {TimelineSectionProps} props - Component props
 * @returns {JSX.Element} Rendered timeline section
 */
const TimelineSection: React.FC<TimelineSectionProps> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-8 text-center">Campaign Timeline</h2>
      
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200"></div>
        
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div key={item.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 z-10"></div>
              
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                <time className="text-sm font-semibold text-red-700">{new Date(item.date).toLocaleDateString()}</time>
                <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              
              {/* Image (if available) */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                {item.media && (
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={item.media}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
