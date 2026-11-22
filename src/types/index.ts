export type Role = 'admin' | 'employee';

export type Category = 
  | 'Desain & Template'
  | 'Video & Motion'
  | 'Tech & Automation'
  | 'SOP & Workflow'
  | 'Pitch & Strategi';

export type BountyStatus = 'Open' | 'In Review' | 'Closed';

export type SubmissionStatus = 'Pending' | 'Perlu Revisi' | 'Approved' | 'Winner';

export interface AssessmentCriteria {
  name: string;
  weight: number; // percentage (e.g. 40)
  desc: string;
}

export interface ResourceReference {
  title: string;
  url: string;
  type: 'figma' | 'drive' | 'github' | 'notion' | 'doc' | 'other';
}

export interface Bounty {
  id: string;
  title: string;
  slug: string;
  category: Category;
  rewardCash: string;
  rewardPoints: number;
  deadline: string; // ISO string e.g. "2026-12-15T23:59:59Z"
  status: BountyStatus;
  department: string;
  brief: string;
  objectives: string[];
  deliverables: string[];
  criteria: AssessmentCriteria[];
  references: ResourceReference[];
  featured?: boolean;
  submissionsCount?: number;
  createdAt: string;
}

export interface AssetLink {
  label: string;
  url: string;
  type: 'figma' | 'drive' | 'github' | 'loom' | 'notion' | 'other';
}

export interface Submission {
  id: string;
  bountyId: string;
  bountyTitle: string;
  bountyCategory: Category;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  authorDepartment: string;
  title: string;
  impactDescription: string;
  assetLinks: AssetLink[];
  previewUrl: string;
  status: SubmissionStatus;
  feedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  submittedAt: string;
  downloadsCount: number;
  tags: string[];
}

export interface EmployeeProfile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  winsCount: number;
  approvedCount: number;
  totalPoints: number;
  totalCashWon: string;
  badge: string;
  topInnovation: string;
}
