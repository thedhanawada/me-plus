import { describe, it, expect } from 'vitest';
import {
  whatIDo,
  philosophy,
  education,
  featuredProject,
  contributions,
  archivedProjects,
  experiences,
  publications,
  WATCHLIST_MEDIA,
  WATCHLIST_SECTIONS,
} from './index';

describe('Data exports', () => {
  describe('home data', () => {
    it('should have whatIDo items with title and description', () => {
      expect(whatIDo.length).toBeGreaterThan(0);
      whatIDo.forEach(item => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
      });
    });

    it('should have philosophy items with title and description', () => {
      expect(philosophy.length).toBeGreaterThan(0);
      philosophy.forEach(item => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
      });
    });
  });

  describe('education data', () => {
    it('should have education entries with required fields', () => {
      expect(education.length).toBeGreaterThan(0);
      education.forEach(edu => {
        expect(edu).toHaveProperty('university');
        expect(edu).toHaveProperty('location');
        expect(edu).toHaveProperty('period');
        expect(edu).toHaveProperty('degree');
        expect(edu).toHaveProperty('program');
        expect(edu).toHaveProperty('courses');
        expect(Array.isArray(edu.courses)).toBe(true);
      });
    });
  });

  describe('projects data', () => {
    it('should have a featured project with required fields', () => {
      expect(featuredProject).toHaveProperty('name');
      expect(featuredProject).toHaveProperty('description');
      expect(featuredProject).toHaveProperty('packages');
      expect(featuredProject).toHaveProperty('links');
      expect(featuredProject).toHaveProperty('tech');
      expect(featuredProject.packages.length).toBeGreaterThan(0);
    });

    it('should have contributions with required fields', () => {
      expect(contributions.length).toBeGreaterThan(0);
      contributions.forEach(c => {
        expect(c).toHaveProperty('org');
        expect(c).toHaveProperty('repo');
        expect(c).toHaveProperty('title');
        expect(c).toHaveProperty('url');
        expect(c).toHaveProperty('status');
        expect(['merged', 'open']).toContain(c.status);
      });
    });

    it('should have archived projects with required fields', () => {
      expect(archivedProjects.length).toBeGreaterThan(0);
      archivedProjects.forEach(project => {
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('links');
        expect(project).toHaveProperty('type');
      });
    });
  });

  describe('experiences data', () => {
    it('should have experiences with required fields', () => {
      expect(experiences.length).toBeGreaterThan(0);
      experiences.forEach(exp => {
        expect(exp).toHaveProperty('title');
        expect(exp).toHaveProperty('company');
        expect(exp).toHaveProperty('location');
        expect(exp).toHaveProperty('period');
        expect(exp).toHaveProperty('highlights');
        expect(Array.isArray(exp.highlights)).toBe(true);
      });
    });
  });

  describe('publications data', () => {
    it('should have publications with required fields', () => {
      expect(publications.length).toBeGreaterThan(0);
      publications.forEach(pub => {
        expect(pub).toHaveProperty('title');
        expect(pub).toHaveProperty('authors');
        expect(pub).toHaveProperty('conference');
        expect(pub).toHaveProperty('date');
        expect(pub).toHaveProperty('link');
      });
    });
  });

  describe('watchlist data', () => {
    it('should have media entries with valid types', () => {
      expect(WATCHLIST_MEDIA.length).toBeGreaterThan(0);
      WATCHLIST_MEDIA.forEach(media => {
        expect(media).toHaveProperty('id');
        expect(media).toHaveProperty('type');
        expect(media).toHaveProperty('category');
        expect(['movie', 'tv']).toContain(media.type);
        expect(['current', 'waiting', 'rewatch', 'favorite']).toContain(media.category);
      });
    });

    it('should have watchlist sections', () => {
      expect(WATCHLIST_SECTIONS.length).toBe(4);
      WATCHLIST_SECTIONS.forEach(section => {
        expect(section).toHaveProperty('key');
        expect(section).toHaveProperty('title');
      });
    });
  });
});
