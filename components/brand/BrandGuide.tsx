'use client';

import { useState } from 'react';
import { m } from 'motion/react';
import { colors } from '@/brand/colors/palette';

interface ColorSwatch {
  name: string;
  value: string;
  usage: string;
}

const colorSwatches: ColorSwatch[] = [
  {
    name: 'Primary Teal',
    value: '#1E93AB',
    usage: 'Headlines, primary buttons, brand elements',
  },
  {
    name: 'Accent Red',
    value: '#E62727',
    usage: 'CTAs, highlights, urgency elements',
  },
  {
    name: 'Warm Cream',
    value: '#F3F2EC',
    usage: 'Page background, subtle surfaces',
  },
  {
    name: 'Neutral Gray',
    value: '#DCDCDC',
    usage: 'Borders, dividers, subtle elements',
  },
];

export function ColorPalette() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-heading-lg font-[var(--font-display)] text-primary mb-6">
          Color Palette
        </h2>
        <p className="text-body-md text-text-secondary mb-8">
          Inspired by Spatia Sauna: Scandinavian minimalism meets contemporary luxury.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorSwatches.map((color) => (
            <div key={color.value} className="space-y-3">
              <div
                className="w-full h-32 rounded-lg border border-gray-200 shadow-md"
                style={{ backgroundColor: color.value }}
              />
              <div>
                <h3 className="font-semibold text-text-primary">{color.name}</h3>
                <p className="font-mono text-sm text-text-secondary">{color.value}</p>
                <p className="text-sm text-text-light mt-2">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ColorScale({ name, shades }: { name: string; shades: Record<string, string> }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-text-primary capitalize">{name}</h3>
      <div className="flex gap-1 flex-wrap">
        {Object.entries(shades).map(([shade, value]) => (
          <div key={shade} className="flex flex-col items-center">
            <div
              className="w-12 h-12 rounded border border-gray-200"
              style={{ backgroundColor: value }}
            />
            <span className="text-xs text-text-light mt-1">{shade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TypographyGuide() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-heading-lg font-[var(--font-display)] text-primary mb-6">
          Typography System
        </h2>

        <div className="space-y-6 mb-12">
          <h3 className="text-heading-md font-[var(--font-display)]">Display Headlines</h3>
          <div className="space-y-4">
            <div>
              <p className="text-display-xl font-[var(--font-display)]">Display XL</p>
              <p className="text-sm text-text-secondary">3–5rem, hero headlines</p>
            </div>
            <div>
              <p className="text-display-lg font-[var(--font-display)]">Display LG</p>
              <p className="text-sm text-text-secondary">2–3.5rem, section titles</p>
            </div>
            <div>
              <p className="text-display-md font-[var(--font-display)]">Display MD</p>
              <p className="text-sm text-text-secondary">1.5–2.25rem, featured content</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-12">
          <h3 className="text-heading-md font-[var(--font-display)]">Headings</h3>
          <div className="space-y-4">
            <div>
              <p className="text-heading-xl font-[var(--font-display)]">Heading XL</p>
              <p className="text-sm text-text-secondary">2rem</p>
            </div>
            <div>
              <p className="text-heading-lg font-[var(--font-display)]">Heading LG</p>
              <p className="text-sm text-text-secondary">1.5rem</p>
            </div>
            <div>
              <p className="text-heading-md font-[var(--font-display)]">Heading MD</p>
              <p className="text-sm text-text-secondary">1.25rem</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-heading-md font-[var(--font-display)]">Body Text</h3>
          <div className="space-y-4">
            <div>
              <p className="text-body-xl">Body XL - 1.25rem</p>
              <p className="text-sm text-text-secondary">Introductions</p>
            </div>
            <div>
              <p className="text-body-lg">Body Large - 1.125rem</p>
              <p className="text-sm text-text-secondary">Featured paragraphs</p>
            </div>
            <div>
              <p className="text-body-md">Body Medium - 1rem</p>
              <p className="text-sm text-text-secondary">Default body text</p>
            </div>
            <div>
              <p className="text-body-sm">Body Small - 0.875rem</p>
              <p className="text-sm text-text-secondary">Secondary text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpacingGuide() {
  const spacingValues = [0, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-heading-lg font-[var(--font-display)] text-primary mb-6">
          Spacing Scale
        </h2>
        <p className="text-body-sm text-text-secondary mb-6">8px base grid</p>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {spacingValues.map((value) => (
            <div key={value} className="space-y-2">
              <div
                className="bg-primary h-6 rounded-sm"
                style={{ width: `${Math.min(value * 4, 100)}px`, maxWidth: '100%' }}
              />
              <div className="text-sm">
                <span className="font-mono">{value}</span>
                <span className="text-text-light ml-2">
                  ({value * 0.25}rem / {value * 4}px)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RadiusGuide() {
  const radiusValues = [
    { name: 'none', value: '0' },
    { name: 'sm', value: '4px' },
    { name: 'md', value: '8px' },
    { name: 'lg', value: '12px' },
    { name: 'xl', value: '16px' },
    { name: '2xl', value: '24px' },
    { name: '3xl', value: '32px' },
    { name: 'full', value: '9999px' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-heading-lg font-[var(--font-display)] text-primary mb-6">
          Border Radius
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {radiusValues.map((radius) => (
            <div key={radius.name} className="space-y-2">
              <div
                className="w-16 h-16 bg-primary"
                style={{ borderRadius: radius.value }}
              />
              <div className="text-sm">
                <span className="font-mono">{radius.name}</span>
                <span className="text-text-light ml-2">{radius.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrandGuideShowcase() {
  const [activeTab, setActiveTab] = useState('colors');

  const tabs = ['colors', 'typography', 'spacing', 'radius'] as const;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-surface rounded-2xl shadow-lg">
      <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'colors' && (
        <div className="space-y-12">
          <ColorPalette />
          <div className="space-y-6">
            <h3 className="text-heading-md font-[var(--font-display)]">Color Scales</h3>
            <ColorScale name="Primary (Teal)" shades={colors.primary} />
            <ColorScale name="Accent (Red)" shades={colors.accent} />
            <ColorScale name="Background (Cream)" shades={colors.bg} />
            <ColorScale name="Gray" shades={colors.gray} />
          </div>
        </div>
      )}
      {activeTab === 'typography' && <TypographyGuide />}
      {activeTab === 'spacing' && <SpacingGuide />}
      {activeTab === 'radius' && <RadiusGuide />}
    </div>
  );
}