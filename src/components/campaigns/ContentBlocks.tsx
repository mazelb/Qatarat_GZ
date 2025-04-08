import React from 'react';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'quote';
  title?: string;
  content: string;
  media?: string;
}

interface ContentBlocksProps {
  blocks: ContentBlock[];
}

/**
 * ContentBlocks component
 * Renders different types of content blocks for campaign pages
 * 
 * @param {ContentBlocksProps} props - Component props
 * @returns {JSX.Element} Rendered content blocks
 */
const ContentBlocks: React.FC<ContentBlocksProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-12 my-12">
      {blocks.map((block) => (
        <div key={block.id} className="max-w-4xl mx-auto">
          {block.type === 'text' && (
            <div className="prose prose-lg max-w-none">
              {block.title && <h2 className="text-2xl font-bold mb-4">{block.title}</h2>}
              {/* Simple fallback for MDX content if there are any issues */}
              {typeof block.content === 'string' && (
                <div className="prose prose-lg">
                  {/* Use React's dangerouslySetInnerHTML as a fallback if MDXRemote fails */}
                  {(() => {
                    try {
                      return <MDXRemote source={block.content} />;
                    } catch (e) {
                      console.error("MDX rendering error:", e);
                      return (
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: block.content.replace(/\n/g, '<br />') 
                          }} 
                        />
                      );
                    }
                  })()}
                </div>
              )}
            </div>
          )}

          {block.type === 'image' && (
            <div className="my-8">
              {block.title && <h3 className="text-xl font-semibold mb-3">{block.title}</h3>}
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={block.media || '/images/placeholder.jpg'}
                  alt={block.title || 'Campaign image'}
                  fill
                  className="object-cover"
                />
              </div>
              {block.content && (
                <p className="mt-2 text-sm text-gray-600 italic">{block.content}</p>
              )}
            </div>
          )}

          {block.type === 'video' && (
            <div className="my-8">
              {block.title && <h3 className="text-xl font-semibold mb-3">{block.title}</h3>}
              <div className="relative pt-[56.25%]">
                <iframe
                  src={block.media}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  title={block.title || 'Campaign video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {block.content && (
                <p className="mt-2 text-sm text-gray-600">{block.content}</p>
              )}
            </div>
          )}

          {block.type === 'quote' && (
            <blockquote className="border-l-4 border-red-500 pl-4 italic my-8">
              <p className="text-xl">{block.content}</p>
              {block.title && <cite className="block mt-2 text-right">— {block.title}</cite>}
            </blockquote>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentBlocks;
