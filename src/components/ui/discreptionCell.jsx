'use client';
import React, { useState } from 'react';

const DescriptionCell = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const displayText = isExpanded ? description : truncateText(description, 7);

  return (
    <p>
      {displayText}
      {description.split(' ').length > 10 && (
        <button
          onClick={toggleExpansion}
          className="text-secondary-foreground ml-2 underline"
        >
          {isExpanded ? 'Show less' : 'See more'}
        </button>
      )}
    </p>
  );
};

export default DescriptionCell;
