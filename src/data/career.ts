export interface CareerEntry {
  title: string;
  company: string;
  dateRange: string;
  summary: string;
  logoUrl?: string; // imported asset URL — add when logo assets are available
}

export const career: CareerEntry[] = [
  {
    title: 'Senior Software Engineer · Android Tech Lead',
    company: 'Busbud',
    dateRange: 'Feb 2021 – Present',
    summary: 'Built the Android app from scratch. Reached 1k+ bus tickets sold per day. Responsible for CI/CD, QA, roadmap planning, and whitelabel architecture.',
  },
  {
    title: 'Android Tech Lead → Software Engineer Manager, Mobile',
    company: 'Hostelworld',
    dateRange: 'Jun 2018 – Feb 2021',
    summary: 'Started as Android Tech Lead, progressed to managing both Android and iOS mobile teams. Led architecture improvements for testability, set up CI/CD pipelines, and drove the Android project to a Kotlin-first project.',
  },
  {
    title: 'Senior Android Developer',
    company: 'WeTek',
    dateRange: 'Sept 2017 – May 2018',
    summary: 'Integrated Google Assistant and Amazon Alexa into WeTek products. Led the WeMote project — a remote control Android app backed by a Node.js REST API.',
  },
  {
    title: 'Android Software Engineer',
    company: 'CashYT',
    dateRange: 'Feb 2016 – Aug 2017',
    summary: 'Built a B2C app from scratch featuring a trivia game, MQTT-based real-time chat, and augmented reality using Vuforia SDK. Led the Porto office Android team.',
  },
  {
    title: 'Android Software Developer',
    company: 'ebankIT / ITSector',
    dateRange: 'Oct 2013 – Jan 2016',
    summary: 'Implemented mobile banking solutions for African and European banks. Worked on-site in Warsaw for Bank Millennium. Architected an Android app skeleton for future banking products.',
  },
  {
    title: 'R&D Engineer',
    company: 'INESC Porto — Project MACAW',
    dateRange: 'May 2011 – Jun 2013',
    summary: 'Extended the CALLAS programming language for Wireless Sensor Networks configuration. Built a desktop application for translating visual configurations into CALLAS.',
  },
  {
    title: 'R&D Engineer',
    company: 'INESC Porto — Project CALLAS',
    dateRange: 'Jun 2010 – Apr 2011',
    summary: 'Implemented new features and improved virtual machine performance for the CALLAS programming language, designed for Wireless Sensor Networks.',
  },
]
