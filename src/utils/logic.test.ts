import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getAvailableSlotsForDate,
  isValidPhone,
  isValidEmail,
  filterServices,
  getModeLabel,
} from './logic.ts';
import type { Service } from '../types/index.ts';

test('getAvailableSlotsForDate returns empty array for Mondays', () => {
  // 2026-10-19 is a Monday
  const slots = getAvailableSlotsForDate('2026-10-19');
  assert.equal(slots.length, 0, 'Mondays must have zero slots as clinic is closed');
});

test('getAvailableSlotsForDate returns valid slots for working days', () => {
  // 2026-10-20 is a Tuesday
  const slots = getAvailableSlotsForDate('2026-10-20');
  assert.ok(slots.length > 0, 'Should return available slots for working days');
  assert.ok(slots.includes('12:00 PM'), 'Should include 12:00 PM afternoon slot');
  assert.ok(slots.includes('07:00 PM'), 'Should include 07:00 PM evening slot');
  assert.ok(slots.includes('10:45 PM'), 'Should include 10:45 PM last slot');
});

test('isValidPhone correctly validates Indian and international phone numbers', () => {
  assert.equal(isValidPhone('9970849909'), true);
  assert.equal(isValidPhone('+91 9970849909'), true);
  assert.equal(isValidPhone('98765-43210'), true);
  assert.equal(isValidPhone('123'), false);
  assert.equal(isValidPhone(''), false);
  assert.equal(isValidPhone('abcd1234567'), false);
});

test('isValidEmail correctly validates emails', () => {
  assert.equal(isValidEmail('humaonly@gmail.com'), true);
  assert.equal(isValidEmail('patient@example.org'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('missing@domain'), false);
});

test('filterServices filters by query and category', () => {
  const dummyServices: Service[] = [
    {
      id: '1',
      slug: 'acne-treatment',
      name: 'Acne Treatment',
      category: 'Skin & Pigmentation',
      photo: 'acne.webp',
      shortDesc: 'Clear active acne and prevent flare-ups',
      fullDesc: 'Comprehensive care',
      durationMinutes: 45,
      priceEstimate: '₹1,500 - ₹3,500',
      benefits: ['Reduces inflammation', 'Clears pores'],
      procedureSteps: ['Cleansing', 'Extraction'],
      idealFor: 'Acne-prone skin',
      sessionsRecommended: '3-4 sessions',
    },
    {
      id: '2',
      slug: 'hair-fall-treatment',
      name: 'Hair Fall/ Loss Treatment',
      category: 'Hair & Scalp',
      photo: 'hair.webp',
      shortDesc: 'Stop thinning hair and promote density',
      fullDesc: 'Targeted scalp care',
      durationMinutes: 60,
      priceEstimate: '₹2,500 - ₹6,000',
      benefits: ['Strengthens roots', 'Stimulates follicles'],
      procedureSteps: ['Scalp analysis', 'Active serum infusion'],
      idealFor: 'Excessive hair shedding',
      sessionsRecommended: '4-6 sessions',
    },
  ];

  const searchSkin = filterServices(dummyServices, 'Acne', 'All');
  assert.equal(searchSkin.length, 1);
  assert.equal(searchSkin[0].name, 'Acne Treatment');

  const searchCategory = filterServices(dummyServices, '', 'Hair & Scalp');
  assert.equal(searchCategory.length, 1);
  assert.equal(searchCategory[0].name, 'Hair Fall/ Loss Treatment');

  const searchNone = filterServices(dummyServices, 'NonExistent', 'All');
  assert.equal(searchNone.length, 0);
});

test('getModeLabel maps consultation mode to human-readable string', () => {
  assert.equal(getModeLabel('clinic'), 'In-Person Clinic Visit');
  assert.equal(getModeLabel('video'), 'Video Consultation');
  assert.equal(getModeLabel('call'), 'Voice Call Consultation');
});
