import React from 'react';

interface FormattedMessageProps {
  text: string;
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({ text }) => {
  // Function to format the text with proper spacing and structure
  const formatText = (text: string) => {
    // Split into lines and process each one
    const lines = text.split('\n');
    const formattedLines: React.ReactElement[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip completely empty lines but preserve single empty lines for spacing
      if (trimmedLine === '') {
        formattedLines.push(<br key={`br-${index}`} />);
        return;
      }
      
      // Handle bold text (**text**)
      if (trimmedLine.includes('**')) {
        const parts = trimmedLine.split('**');
        const formatted = parts.map((part, partIndex) => {
          if (partIndex % 2 === 1) {
            return <strong key={`bold-${index}-${partIndex}`}>{part}</strong>;
          }
          return part;
        });
        formattedLines.push(
          <div key={`line-${index}`} style={{ marginBottom: '8px' }}>
            {formatted}
          </div>
        );
        return;
      }
      
      // Handle bullet points (lines starting with • or -)
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        formattedLines.push(
          <div key={`bullet-${index}`} style={{ 
            marginLeft: '16px', 
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <span style={{ marginRight: '8px', color: '#666' }}>•</span>
            <span>{trimmedLine.substring(1).trim()}</span>
          </div>
        );
        return;
      }
      
      // Handle numbered lists (1. 2. etc.)
      const numberMatch = trimmedLine.match(/^(\d+\.)\s(.+)/);
      if (numberMatch) {
        formattedLines.push(
          <div key={`numbered-${index}`} style={{ 
            marginLeft: '16px', 
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <span style={{ marginRight: '8px', color: '#666', fontWeight: 'bold' }}>
              {numberMatch[1]}
            </span>
            <span>{numberMatch[2]}</span>
          </div>
        );
        return;
      }
      
      // Handle headers (## or ### etc.)
      if (trimmedLine.startsWith('#')) {
        const headerLevel = (trimmedLine.match(/^#+/) || [''])[0].length;
        const headerText = trimmedLine.replace(/^#+\s*/, '');
        const fontSize = headerLevel === 1 ? '20px' : headerLevel === 2 ? '18px' : '16px';
        const fontWeight = headerLevel <= 2 ? 'bold' : '600';
        
        formattedLines.push(
          <div key={`header-${index}`} style={{ 
            fontSize,
            fontWeight,
            marginTop: '16px',
            marginBottom: '8px',
            color: '#333'
          }}>
            {headerText}
          </div>
        );
        return;
      }
      
      // Regular paragraph
      formattedLines.push(
        <div key={`para-${index}`} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
          {trimmedLine}
        </div>
      );
    });
    
    return formattedLines;
  };

  return (
    <div style={{ 
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      maxWidth: '100%'
    }}>
      {formatText(text)}
    </div>
  );
};

export default FormattedMessage;