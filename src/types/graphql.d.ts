/**
 * TypeScript type definitions for GraphQL schema
 */

declare namespace GraphQL {
  export type Maybe<T> = T | null;

  export type CampaignStatus = 'Active' | 'Closed' | 'Urgent';
  export type ContentBlockType = 'text' | 'image' | 'video' | 'quote';

  export interface Campaign {
    id: string;
    slug: string;
    title: string;
    description: string;
    headerImage?: Maybe<string>;
    status: CampaignStatus;
    goal: number;
    raised: number;
    contentBlocks: ContentBlock[];
    timeline: TimelineItem[];
  }

  export interface ContentBlock {
    id: string;
    type: ContentBlockType;
    title?: Maybe<string>;
    content: string;
    media?: Maybe<string>;
  }

  export interface TimelineItem {
    id: string;
    date: string;
    title: string;
    description: string;
    media?: Maybe<string>;
  }

  export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image?: Maybe<string>;
  }

  export interface AboutContent {
    mission: string;
    vision: string;
    values: string;
    story: string;
    headerImage?: Maybe<string>;
    teamMembers: TeamMember[];
  }
}
