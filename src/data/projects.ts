import askmeIcon from '../assets/icons/askme.svg'
import birdyBytesIcon from '../assets/icons/birdy-bytes.png'
import hostelworldIcon from '../assets/icons/hostelworld.png'
import busbudIcon from '../assets/icons/busbud.png'

export interface ProjectLink {
  url: string;
  label: string;
}

export interface TechIcon {
  name: string;    // devicon name, e.g. 'kotlin'
  variant: string; // devicon variant, e.g. 'original'
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  wip?: boolean;
  links?: ProjectLink[];
  icon?: string;
  techStack?: TechIcon[];
}

export const projects: Project[] = [
  {
    name: 'AskMe',
    description:
      'Chat app built with Kotlin Multiplatform targeting Android, iOS, and Desktop. Will evolve to let users authenticate and send direct messages, backed by a custom Spring Boot server with push notification support.',
    tags: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Spring Boot', 'Kotlin'],
    wip: true,
    icon: askmeIcon,
    techStack: [
      { name: 'kotlin', variant: 'original' },
      { name: 'android', variant: 'plain' },
    ],
    links: [
      { url: 'https://github.com/ruimendesM/askme-server', label: 'Server' },
      { url: 'https://github.com/ruimendesM/askme-compose-app', label: 'App' },
    ],
  },
  {
    name: 'Busbud',
    description:
      'E-commerce app to allow users to book ground transportation tickets. 1k+ bus tickets sold per day. Includes whitelabel support.',
    tags: ['Kotlin', 'Android', 'Jetpack Compose'],
    icon: busbudIcon,
    techStack: [
      { name: 'kotlin', variant: 'original' },
      { name: 'android', variant: 'plain' },
    ],
    links: [
      {
        url: 'https://play.google.com/store/apps/details?id=com.busbud.android',
        label: 'Play Store',
      },
    ],
  },
  {
    name: 'Hostelworld',
    description:
      'OTA to app to allow users to book hostels worldwide. Led the Android project to a Kotlin-first codebase and implemented architecture improvements for testability.',
    tags: ['Kotlin', 'Android'],
    icon: hostelworldIcon,
    techStack: [
      { name: 'kotlin', variant: 'original' },
      { name: 'android', variant: 'plain' },
    ],
    links: [
      {
        url: 'https://play.google.com/store/apps/details?id=com.hostelworld.app',
        label: 'Play Store',
      },
    ],
  },
  {
    name: 'Birdy Bytes',
    description:
      'B2C app built from scratch featuring a trivia game, MQTT-based real-time chat, and augmented reality using Vuforia SDK.',
    tags: ['Java', 'Android', 'Firebase', 'MQTT', 'AR'],
    icon: birdyBytesIcon,
    techStack: [
      { name: 'java', variant: 'plain' },
      { name: 'android', variant: 'plain' },
      { name: 'firebase', variant: 'plain' },
    ],
    links: [
      {
        url: 'https://play.google.com/store/apps/details?id=com.cashyt.birdybytes',
        label: 'Play Store',
      },
    ],
  },
  {
    name: 'WeMote',
    description:
      'Remote control Android app for WeTek set-top boxes, backed by a Node.js REST API. Integrated Google Assistant and Amazon Alexa voice commands.',
    tags: ['Java', 'Android', 'Node.js', 'REST API'],
    // No icon — ProjectCard renders gradient placeholder
    techStack: [
      { name: 'java', variant: 'plain' },
      { name: 'android', variant: 'plain' },
      { name: 'nodejs', variant: 'original' },
    ],
  },
]
