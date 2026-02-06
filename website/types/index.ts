/**
 * Type definitions for the site
 */

export interface DocumentationItem {
  id: string;
  title: string;
  description: string;
  status: 'Stable' | 'Empirical' | 'In Progress' | 'Archived';
  link: string;
}

export interface CoreIdea {
  title: string;
  description: string;
}

export interface RoadmapItem {
  phase: string;
  title: string;
  status: 'Completed' | 'Current' | 'Planned';
  description: string;
}

export interface Figure {
  id: string;
  title: string;
  caption: string;
  image?: string;
  source: 'simulation' | 'conceptual' | 'data';
}
