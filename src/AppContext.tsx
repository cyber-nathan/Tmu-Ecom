/* eslint-disable @typescript-eslint/no-unused-vars */ //for err to searchString never used
import React from 'react';

export const AppContext = React.createContext({
    searchString: '',
    setSearchString: (searchString: string) => {}
  });

  