export interface ReleaseHighlight {
  version: string;
  date: string;
  highlights: string[];
}

export const releaseHighlights: ReleaseHighlight[] = [
  {
    version: "2026-06-16",
    date: "June 16, 2026",
    highlights: [
      "🎉 Added 'What's New' changelog modal to stay updated with future releases",
      "🎨 Complete theme synchronization - modal styling adapts perfectly to light and dark modes"
    ]
  }
];

export const changelogUrl = "https://github.com/alvarocavalcanti/distanceintheshadows/blob/main/RELEASE-NOTES.md";
