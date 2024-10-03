import React from 'react';

type ToShow = {
  when: unknown;
  then: React.ReactNode;
  else?: React.ReactNode | ToShow;
};

interface AppShowProps {
  show: ToShow | ToShow[];
}

const recursive_render = (
  content: React.ReactNode | ToShow
): React.ReactNode => {
  if (
    React.isValidElement(content) ||
    typeof content !== 'object' ||
    content === null
  ) {
    return content;
  }

  if ('when' in content) {
    return (Boolean(content.when) as boolean)
      ? recursive_render(content.then)
      : recursive_render(content.else);
  }

  return null;
};

export const AppShow: React.FC<AppShowProps> = ({ show }) => {
  const must_show_array = Array.isArray(show) ? show : [show];

  const combined_shows = must_show_array.reduce<React.ReactNode[]>(
    (acc, must_show) => {
      const result = recursive_render(must_show);
      if (result !== null) {
        acc.push(result);
      }
      return acc;
    },
    []
  );

  return (
    <>
      {combined_shows.map((show_item, index) => (
        <React.Fragment key={index}>{show_item}</React.Fragment>
      ))}
    </>
  );
};

export default AppShow;
