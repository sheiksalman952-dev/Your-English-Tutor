import { RoleplayScenario, VocabularyItem, GrammarWhisper, SpeakingTable } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1XLTdmuz9ucjGYQk-BN6mGQRi7dwpCtf7iaudNqPy4zSTUaLnGgxzJP2wFHjdzvsw-2KOj5JEak37LInR1uBXWhHrd9XzugrtpQOpz4wqfsPX6nku8tzG6pQmMlJljnrqGweL3KJURStvkBV6H9Anq1jGLzfuluJOhQXHAyZiDbL1d9pYSiGg7O1RwqX49kIB3IZtIADLBet3lB_ibzBviyS3rmo5Wvlw_qURNK8IYitbGaKcuST5-y8Cc";

export const ANIME_SENSEI_AVATAR = "https://lh3.googleusercontent.com/aida/AEtjO1WYyIFj2EKsrR6k5yYFztE2mPY6ciLAPszy0Ou7P-WH62iVBAHFVGJxYOlJkZnNaLB-IcOnmHcf48YWnHp7H3I74jiYtxzM5rfoyTOGwlCpRmzC092ZChySvZDhTvFPfvF5GqYtrlPCZHfzfKO30iSFgS8ijOsOC5Oa5nnfcqxJh9Tu8nRyJ4y0hwVIELVHAJD0-7DzYOAjMKRKT-JmfWQ70Sv8cg8m3YN7V13aUFFEd-oLA-F4LdsciGA";

export const ELENA_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuDewDu6iI39MMDv_NO9gvKLRRFejS3p1mnd8KLY6MGdeS4nr596AvCUCT7l58GWaFyN_a4qKwiDdsmVaJYHDtxknkQkga7yAYHgSa27UaINpZv_HoZRhcMTR_69kzWYhBP7RizWEkgYdwcRseNjQfx7SB5-LUtMwNCkaFX_GT0v9H1WL3VFgu3AGJ2LUqelMJyIsj4rynX6L3-rrw2W44dgINlQlJrIQqqDoyfuwO47-Y2F83RFNtTMFw";

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBbWNbDwf-pItR5rMJaLALh93EVKtXYTuC1L818NJUV2sOijAnp9JSso7ljOYNUMsEiUh5L8tw36CMtM7qvVemQbOsE0VLm_dcOiOPFCQxrENH1eEMhGQGOm6PIoJTR4InCqIrE94fdoqf_QXkWz6OerIjDY3VBzYR5HjrhKhn2CF3jiUtHwGZb5vtKElSjiEpJ3WhOcoqok6qe70EAB9Noa4whMXxo0D1T-5KbqWMFbdHFIqV7OvdNkA";

export const USER_PROFILE_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuDFu2vGoCgT9w5GXsTV6g1SSTm_2xpicQD8Lxhls1nUMmoSGo_TmDFjlYp51asU2P28rgn4-Au--XGEqi6V4ueF2tOlVF_sO6Ff7lWah8tUO7pG8-iKh1MOL_-xUBwvrg1XHBN4tcIG7jYhflBNiHb2QqBzmZ0I5fUDXuBPGHaaL3lz9CANSmQUkwvPsTztWNNGmlW6p7kBj0qOVjz0MLgwkmFQl1XUS05icOc91T967MzmwCPes7pBnA";

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'pm-interview',
    title: 'Job Interview: Senior Product Manager',
    shortTitle: 'Job Interview: Tech PM',
    subtitle: 'High-stakes behavioral queries & roadmap pushback',
    levelRange: 'B2-C1',
    aiRole: 'Head of Hiring',
    accent: 'British RP',
    initialMessage: "That makes sense from a roadmap perspective. But tell me, how did you manage pushback when your engineering lead claimed your proposed timeline was completely unrealistic?"
  },
  {
    id: 'small-talk',
    title: 'Everyday Casual Small Talk',
    shortTitle: 'Everyday Small Talk',
    subtitle: 'Weather, weekend plans, coffee & hobbies',
    levelRange: 'A2-B1',
    aiRole: 'Friendly Local Barista',
    accent: 'American (San Francisco)',
    initialMessage: "Good morning! Great to see you today. What's on your agenda for this sunny weekend?"
  },
  {
    id: 'ielts-speaking',
    title: 'IELTS Speaking Part 2 Mastery',
    shortTitle: 'IELTS Speaking Part 2',
    subtitle: '2-minute timed cue card response & examiner follow-up',
    levelRange: 'B2-C2',
    aiRole: 'Certified IELTS Examiner',
    accent: 'British RP',
    initialMessage: "For Part 2, describe an important decision you made that changed your career path. You have one minute to prepare, and two minutes to speak."
  },
  {
    id: 'london-cafe',
    title: 'Ordering at a London Specialty Cafe',
    shortTitle: 'London Specialty Cafe',
    subtitle: 'Ordering oat flat whites, dietary questions & pastries',
    levelRange: 'A1-A2',
    aiRole: 'London Specialty Barista',
    accent: 'British RP',
    initialMessage: "Hi there! Welcome to Monocle Coffee. What can I get started for you today?"
  },
  {
    id: 'climate-debate',
    title: 'Debating Climate Policy & Carbon Offsets',
    shortTitle: 'Debating Climate Policy',
    subtitle: 'Nuanced arguments, economic trade-offs & rebuttals',
    levelRange: 'C1-C2',
    aiRole: 'Policy Think-Tank Analyst',
    accent: 'American (San Francisco)',
    initialMessage: "While voluntary carbon credits have expanded, critics claim they delay genuine industrial decarbonization. What is your stance on making carbon offsets legally binding?"
  }
];

export const TARGET_VOCABULARY: VocabularyItem[] = [
  {
    id: 'v1',
    term: 'De-scope',
    partOfSpeech: 'Verb',
    definition: 'To reduce or remove project requirements to maintain product quality or hit deadlines.',
    level: 'C1',
    practiced: true,
    phonetic: '/diːˈskoʊp/'
  },
  {
    id: 'v2',
    term: 'Pushback',
    partOfSpeech: 'Noun',
    definition: 'Opposition, negative feedback, or resistance to a proposed change or initiative.',
    level: 'B2',
    practiced: false,
    phonetic: '/ˈpʊʃ.bæk/'
  },
  {
    id: 'v3',
    term: 'Concession',
    partOfSpeech: 'Noun',
    definition: 'A point yielded in an argument to reach an amicable agreement with stakeholders.',
    level: 'C1',
    practiced: false,
    phonetic: '/kənˈseʃ.ən/'
  },
  {
    id: 'v4',
    term: 'Asynchronous',
    partOfSpeech: 'Adjective',
    definition: 'Communication or workflow not happening concurrently in real time.',
    level: 'C1',
    practiced: true,
    phonetic: '/eɪˈsɪŋ.krə.nəs/'
  },
  {
    id: 'v5',
    term: 'Impromptu',
    partOfSpeech: 'Adjective',
    definition: 'Done without being planned, organized, or rehearsed.',
    level: 'B2',
    practiced: false,
    phonetic: '/ɪmˈprɒmp.tjuː/'
  },
  {
    id: 'v6',
    term: 'Synergy',
    partOfSpeech: 'Noun',
    definition: 'Interaction producing a combined effect greater than the sum of separate parts.',
    level: 'C1',
    practiced: false,
    phonetic: '/ˈsɪn.ə.dʒi/'
  }
];

export const GRAMMAR_WHISPERS: GrammarWhisper[] = [
  {
    id: 'w1',
    timeAgo: 'Detected 2m ago',
    category: 'Preposition usage',
    original: 'I am working here since 3 years.',
    improved: 'I have been working here for 3 years.',
    explanation: 'Use "for" with durations of time, and Present Perfect Continuous for ongoing actions.'
  },
  {
    id: 'w2',
    timeAgo: 'Detected 6m ago',
    category: 'Natural Collocation',
    original: 'We made a big discussion yesterday.',
    improved: 'We had an extensive discussion yesterday.',
    explanation: 'Native English speakers collocate "have a discussion", not "make".'
  },
  {
    id: 'w3',
    timeAgo: 'Detected 11m ago',
    category: 'Conditionals & Modals',
    original: 'If I would know earlier, I will change the plan.',
    improved: 'If I had known earlier, I would have changed the plan.',
    explanation: 'Use Third Conditional (If + Past Perfect, would have + past participle) for past counterfactual scenarios.'
  }
];

export const SPEAKING_TABLES: SpeakingTable[] = [
  {
    id: 'table-1',
    title: 'IELTS Speaking Part 3: Technology & Society',
    description: '"Will AI replace creative jobs or expand human capacity?" 2-minute timed responses with structured polite interruptions and rebuttal drills.',
    category: 'IELTS & Cambridge Prep',
    tags: ['IELTS Band 7+', 'Moderate Pace', 'Active Topic'],
    host: {
      name: 'David K.',
      countryFlag: '🇬🇧',
      level: 'Level C2 Host',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4Wo7cPvMgKSBX6d7wcO6gcEwD1A9iLLSz3e7aArdm5rLSNBM3rN8-mnTYR1K-4ZAuTyMor8AjOUGuyrkIO9eUEoxjGuHY6stckOl3Y-pMB8Ndhqmo8JRizsmrjvxJlhfF8F9ZV3LoREwbT92mnq6eUjdnlnk3iADtApPIc8vFIFAtjubrK21F2BRJJg7R-jDauCYa1vmXXrskmmuVnmfjMs8nwH8TzRpFzWtKCew1j8COjJUIqCUfw'
    },
    participants: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcBx9056Lm5rWzlugcJDaGwykB1hs_aCgPnaZujeRIczAVX1owfEqahjRmAvqTVRduSM6Zo1X1MedL-4oXD2AgwEZ7GjL5Dizs2caHi6e_up34v9SY9b3d5CQrqtFlZl2vVLTI7dbVKAslQobbKnOIptOPd4kwTCaVF0AS4-uK8zCHR2m-tmZyml6TOKv5p0F1ScsNA6StVjcwUxRlZMTwCdqDGY4JvJXZ_H1CNv6wToTnfbZn2R-FHQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnozVIY_4RhrquaHQQS5r7tOCXgDfwcGWvG7mBMIbKcY8gueV_GT1QTqp4F6rXKloJc34gI2i08ZOinyOtxLgZFryI4aDez7xBHLeQCpLfKiFzsbZ5HCdzRCGW7oD58R-qX9k8aYYsCwG-2jODPtKXofFHJzaBuA3AptR--g3YWrFSw5_LNRPRQf3mGRQdSHL6uerpl9YTFqpxn-URY5hAAWNwbvpnzFjvV0VfPcozkLe7TbyB32TSZw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ7PojJbpQNA_iEaLasfNkCSUFB0gDKH-1jyRrbF43Bc2Kv1pbL6PPFkyDT08wzxHLH0wnVSpbavuEJOlFJ6F9pxfnvbh2V0DrOOk6DkfcNJKcU2zljWVQzzzzBA5UrkhSIhLtSyrrjr0Pwc57qzlrFn0Y5fQOKWRI9u6Y4yrxu5yLb8DsC-erCOVUnzPK4DxmiV-QPkm9F9vsv-ZUts-2oWDjQ-EurTmxt4M-ZIeVQwe7zSOJxp3sLA'
    ],
    currentSpeaker: 'David (Host)',
    seatsOccupied: 4,
    maxSeats: 5,
    activeTopic: true
  },
  {
    id: 'table-2',
    title: 'Everyday Casual English & Cinema Talk',
    description: '"What\'s one movie you could rewatch forever?" Safe zero-judgement zone. The host provides starter sentence stems if you get stuck.',
    category: 'Casual Chit-Chat',
    tags: ['Beginner Friendly', 'Relaxed Pace', 'No Pressure'],
    host: {
      name: 'Elena R.',
      countryFlag: '🇪🇸',
      level: 'Level B2 Guide',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_LByjUyOVjA747jHKl_2mgCPSrBY0J7ZFDmhTn3yBQRLCqA6-Clx_yTLfAj4WrTo03OGHu9qDmfSEU2A9fBKNwW9r5hNpfljIPWv8KCX9gcKl5Di1hDCCAYSjoHAmnwjgb5immL6D0d2aS9eLRMTG7Tj9SNFQ0du3eF0oV5ZtxgYNQIVEJutpAN4EtmYTOjB4yCHwmZmdYHaENv0IEXoi_ljEjFqD3oK9Rzv3LKLocF8Bcq1x9G8Muw'
    },
    participants: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCKHfZXbBJw9Ua23ASVZKHBO6P460gFkxGPw4xvA1TXU5vxLx3p7RCWFKXv8J-7rJJG6JWUJF8fYs6yRejY2tLes3WiXMgYcLWhvshVZ_NYryDPNQDe7wM7GjcIXU-J2pKckkf-u3EPt-OddUOtJo2ANpud8KkmDwPkeLzULCvzBawTh9XpL0GwrhPwLv97uFcqRqp9oPO8Ubud_8avQ0IfZ0dUN7l53S3CdWRe6xm8F5CTT-BshvF4w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_xqd0cdrijMYxVeb5jWZfjJrDp15Fbm6YhieNJ6YDR6cKygO8khgCjsJjh6aUi5vJ88Sk6YZ5UNqTfv0MWE3Iz3th_NIJwLVSNorOtejcyGK0_dtZ_zWBBp1Wpq71AoQe53Q-ReY3ObY_FGWjisDoAvpWPNHtuimW9NPS7VVNSKURJQD4RR4HAhpqzvqL1BYZZx0LAKj-sX7LQp6dR2Bi96K685SX4l52-D7TKKwkfksvXrDqKwBmpQ'
    ],
    currentSpeaker: 'Elena (Intermediate)',
    seatsOccupied: 3,
    maxSeats: 6
  },
  {
    id: 'table-3',
    title: 'Job Interview Simulation & 60s Elevator Pitches',
    description: 'Practice answering "Tell me about a difficult problem you solved." Strict 3-minute turns followed by gentle vocabulary polish from peers.',
    category: 'Business & Tech',
    tags: ['Career Focus', 'Timed Pitching', 'B2–C1 Target'],
    host: {
      name: 'Rajiv M.',
      countryFlag: '🇮🇳',
      level: 'Level C1 Host',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6wc4kzvnq16VhtUN_VuzPxoNgtlJG4bjnmGwZ48DDpB1bRABrlRewcUbzUJ1349jGmN83W6R5m2s3D5e8omjlWKg7M-dKJgO7EFg6GwK19QopyX_8F7OfiGQlrAFyNucZNjYfwyFzGnBJeKBBAvd2zowQHoOo0VMn6i6WvXoD3ven-bmZ2t6z26Tawt5mg6CJ6sOGqnYBjQnAU_co4mcuvd82o2pMIwHQtVNN3lKiWWr3hUWNOOau9w'
    },
    participants: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPSV26dFrWTx1lNe2qdKUukdAy8jU97BDOrs_vNNqIN2aOmI_XWQvqJl7El30JTiIIBwriQNWnUL6gybEm9beyu6ztEF3ayZBqomwe5UsuG3nMvi4MS6DCzL5-n6U81bo4Fh79ycUpkTKXKWHE-dNCZ1HedVFntveTuR-rvc4ycRxmXyo2KYMtBpQewpo4ekShisegt6_mlrEHZS0Z1mF9-42cPNum5QvLcWIag2FKMDpbdOwEfHFb1g'
    ],
    currentSpeaker: 'Rajiv (Tech Product Lead)',
    seatsOccupied: 2,
    maxSeats: 4
  },
  {
    id: 'table-4',
    title: 'Accent Reduction & Tongue Twister Marathon',
    description: 'Mastering the tricky English \'TH\' and \'R/L\' sounds via rhythm drills. High laughs, rapid phonetic corrections, and playful tongue twisters.',
    category: 'Beginner A1–A2',
    tags: ['Pronunciation Focus', 'Rapid Rounds', 'All Levels'],
    host: {
      name: 'Chloe W.',
      countryFlag: '🇨🇦',
      level: 'Level C2 Host',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_7hEvMJRKu0NycIWeIBhBvgC2Sn9u2ebMhjrgUtZYm6GyjPIz5Z64iqQaiwLoBUWoGTCtuxhyMnj2i806iKeW6Sa1h59PUf_gE2pbJSzVYA7f7K8dNEh0_Z6ms2mRWvNr1N4rRnpiRfpgR-ROONj56OuaSmX1q0yyXUGcsBgwjTWg7cb2lhNtsidRXMTzg_ftRDyNCIb7-eDiG6sLv-qv4CBQo6ypnfKa_smtGPgXnCD4RJXxhp6z0w'
    },
    participants: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkjSRjHa7HxdiPduwd8tX4gF8-OWK16D1HL52VePSebBBkfN1BFPPyJxGOmFhOxq_WN017CDdtnUsU4Lbpl61OLORKocEPQHPmzN1j7e5mEZ2a0dDs21YxcCL53wdT3vDnmUXcJGGYSqIE3o7gktnYkYLrmucyEE72M6c84u2zDovqT_Rk-B8IuGAK-nbnxSKOWCNDRZ-5BSkU0NVkzCA2JH7fK4ef8sJYJ9E9NqRsvDV2An6LDp8z6g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwmc5i0Vqz2dAwzsYEqNLaHVcrbI-97gE0VzlyyxjNnExTciZh89yrEsYGDeqKkZj8ecWYhY6XoRsZn0-ji8qJS7LVAjLshwq7w6VEbFRQca4X_odRK6ox8VkfEvxvL_5rO2KSSup-6zIbtY6GIT1f13pafo62Ezyd-Y8c2ga85UcMkJhr-uOZq6VTVntS4mzGG65gXzUIoa36alKpGENrTzVy_QxA1uTJ-vJ3-WFXKeKK3cCNa_XGVA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIxYLHKKHUVN8Hf1A-cyYkOn6w-YGenOnytse_DO0ZpvYBlIs3qLZ1tUBIpTfzGphcuvy8aGCT5Jc40LNHg2PEJdjrJUtOVFXZ7xo8nXWwAMdwS20zjLstKVhIkEE14thW_Ba0ID9t7dteMeC4gy4gX5JSsuJIP94kRrX4wHJK1Of9qIaiSfGEd9PDJDeprc70t_dFmpFJlsXj4W_bJc0I6qLTKmdekEc-xQDjBRI5fEfVGYm3uaipA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxj27tFUE7gyG8uPlzS36jjto5OVLw36Jg_Sa1OR2Z0M0dWsIz66qzOQDHv9A3LJTjyi0ACudjb66MH9xBAluKx-y6TaJJ04_JCG6pHyNBmeJlUIUI3qcM6-OjR7Cp_bbYNVbCmEsqEb2I0tcf3lHG7WnZ-fA1T3-4QUCJWz623EKIEpUE9bWgiF-NNQDNAfSlYfdjQOwKPRCo4GFmt0UvU85Tewc4bIgBZhMLX6s_D0JTMy4UVQoJWg'
    ],
    currentSpeaker: 'Chloe (Phonetics Tutor)',
    seatsOccupied: 5,
    maxSeats: 6
  }
];
