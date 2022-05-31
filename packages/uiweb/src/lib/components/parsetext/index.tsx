import * as React from 'react';

import ParsedText from './customParser';
import { ParseMarkdownTextProps, CustomParseShape } from './customParser.types';

export const ParseMarkdownText: React.FC<ParseMarkdownTextProps> = (props) => {
    const {text, patterns} = props;
    const actualPatters:CustomParseShape[] = patterns || [];

    return (
      <div>
        <ParsedText
          patterns={actualPatters}
        >
          {text}
        </ParsedText>
      </div>
    );
}