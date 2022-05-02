import React, { createContext, useEffect, useState, useRef } from 'react';


export const MainContext = createContext();

export function Provider(children) {

  return (
    <MainContext.Provider value={ '' }>
      {children}
    </MainContext.Provider>
  );
}
