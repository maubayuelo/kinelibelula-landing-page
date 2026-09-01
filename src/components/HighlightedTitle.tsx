import React from 'react';

interface HighlightedTitleProps {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  highlightClassName?: string;
  title: string;
  highlight?: string | null;
}

/**
 * Renders a title, styling `highlight` where it actually occurs inside
 * `title` — never a hardcoded position. Degrades safely: no highlight, or a
 * highlight that doesn't appear in the title (locale mismatch, accent,
 * casing), just renders the plain title with no error.
 */
export const HighlightedTitle: React.FC<HighlightedTitleProps> = ({
  as: Tag = 'h2',
  className,
  highlightClassName = 'text-[#C85A28] italic font-serif',
  title,
  highlight,
}) => {
  if (!highlight) {
    return <Tag className={className}>{title}</Tag>;
  }

  const index = title.indexOf(highlight);
  if (index === -1) {
    return <Tag className={className}>{title}</Tag>;
  }

  const before = title.slice(0, index);
  const match = title.slice(index, index + highlight.length);
  const after = title.slice(index + highlight.length);

  return (
    <Tag className={className}>
      {before}
      <span className={highlightClassName}>{match}</span>
      {after}
    </Tag>
  );
};
