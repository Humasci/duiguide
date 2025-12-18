import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env.local' });

interface CountyTarget {
  name: string;
  slug: string;
  state: string;
  stateSlug: string;
  city: string;
  population: number;
  tier: number;
}

// 70 Target Counties (10 per state × 7 states)
const TARGET_COUNTIES: CountyTarget[] = [
  // TEXAS (10)
  { name: 'Harris County', slug: 'harris', state: 'TX', stateSlug: 'texas', city: 'Houston', population: 4731145, tier: 1 },
  { name: 'Dallas County', slug: 'dallas', state: 'TX', stateSlug: 'texas', city: 'Dallas', population: 2613539, tier: 1 },
  { name: 'Tarrant County', slug: 'tarrant', state: 'TX', stateSlug: 'texas', city: 'Fort Worth', population: 2110640, tier: 1 },
  { name: 'Bexar County', slug: 'bexar', state: 'TX', stateSlug: 'texas', city: 'San Antonio', population: 2009324, tier: 1 },
  { name: 'Travis County', slug: 'travis', state: 'TX', stateSlug: 'texas', city: 'Austin', population: 1290188, tier: 1 },
  { name: 'Collin County', slug: 'collin', state: 'TX', stateSlug: 'texas', city: 'Plano', population: 1064465, tier: 1 },
  { name: 'Denton County', slug: 'denton', state: 'TX', stateSlug: 'texas', city: 'Denton', population: 944350, tier: 1 },
  { name: 'Hidalgo County', slug: 'hidalgo', state: 'TX', stateSlug: 'texas', city: 'McAllen', population: 870781, tier: 1 },
  { name: 'Fort Bend County', slug: 'fort-bend', state: 'TX', stateSlug: 'texas', city: 'Sugar Land', population: 822779, tier: 1 },
  { name: 'El Paso County', slug: 'el-paso', state: 'TX', stateSlug: 'texas', city: 'El Paso', population: 865657, tier: 1 },

  // ARIZONA (10)
  { name: 'Maricopa County', slug: 'maricopa', state: 'AZ', stateSlug: 'arizona', city: 'Phoenix', population: 4485414, tier: 1 },
  { name: 'Pima County', slug: 'pima', state: 'AZ', stateSlug: 'arizona', city: 'Tucson', population: 1043433, tier: 1 },
  { name: 'Pinal County', slug: 'pinal', state: 'AZ', stateSlug: 'arizona', city: 'Florence', population: 425264, tier: 2 },
  { name: 'Yavapai County', slug: 'yavapai', state: 'AZ', stateSlug: 'arizona', city: 'Prescott', population: 236968, tier: 2 },
  { name: 'Yuma County', slug: 'yuma', state: 'AZ', stateSlug: 'arizona', city: 'Yuma', population: 203881, tier: 2 },
  { name: 'Mohave County', slug: 'mohave', state: 'AZ', stateSlug: 'arizona', city: 'Kingman', population: 213267, tier: 2 },
  { name: 'Coconino County', slug: 'coconino', state: 'AZ', stateSlug: 'arizona', city: 'Flagstaff', population: 145101, tier: 2 },
  { name: 'Cochise County', slug: 'cochise', state: 'AZ', stateSlug: 'arizona', city: 'Sierra Vista', population: 125922, tier: 2 },
  { name: 'Navajo County', slug: 'navajo', state: 'AZ', stateSlug: 'arizona', city: 'Holbrook', population: 106717, tier: 2 },
  { name: 'Apache County', slug: 'apache', state: 'AZ', stateSlug: 'arizona', city: 'St. Johns', population: 66021, tier: 2 },

  // GEORGIA (10)
  { name: 'Fulton County', slug: 'fulton', state: 'GA', stateSlug: 'georgia', city: 'Atlanta', population: 1066710, tier: 1 },
  { name: 'Gwinnett County', slug: 'gwinnett', state: 'GA', stateSlug: 'georgia', city: 'Lawrenceville', population: 957062, tier: 1 },
  { name: 'Cobb County', slug: 'cobb', state: 'GA', stateSlug: 'georgia', city: 'Marietta', population: 766149, tier: 1 },
  { name: 'DeKalb County', slug: 'dekalb', state: 'GA', stateSlug: 'georgia', city: 'Decatur', population: 764382, tier: 1 },
  { name: 'Clayton County', slug: 'clayton', state: 'GA', stateSlug: 'georgia', city: 'Jonesboro', population: 297595, tier: 2 },
  { name: 'Cherokee County', slug: 'cherokee', state: 'GA', stateSlug: 'georgia', city: 'Canton', population: 266620, tier: 2 },
  { name: 'Forsyth County', slug: 'forsyth', state: 'GA', stateSlug: 'georgia', city: 'Cumming', population: 251283, tier: 2 },
  { name: 'Henry County', slug: 'henry', state: 'GA', stateSlug: 'georgia', city: 'McDonough', population: 240350, tier: 2 },
  { name: 'Chatham County', slug: 'chatham', state: 'GA', stateSlug: 'georgia', city: 'Savannah', population: 295291, tier: 2 },
  { name: 'Richmond County', slug: 'richmond', state: 'GA', stateSlug: 'georgia', city: 'Augusta', population: 206607, tier: 2 },

  // COLORADO (10)
  { name: 'Denver County', slug: 'denver', state: 'CO', stateSlug: 'colorado', city: 'Denver', population: 715522, tier: 1 },
  { name: 'El Paso County', slug: 'el-paso', state: 'CO', stateSlug: 'colorado', city: 'Colorado Springs', population: 730395, tier: 1 },
  { name: 'Arapahoe County', slug: 'arapahoe', state: 'CO', stateSlug: 'colorado', city: 'Littleton', population: 655070, tier: 1 },
  { name: 'Jefferson County', slug: 'jefferson', state: 'CO', stateSlug: 'colorado', city: 'Golden', population: 582881, tier: 1 },
  { name: 'Adams County', slug: 'adams', state: 'CO', stateSlug: 'colorado', city: 'Brighton', population: 519572, tier: 2 },
  { name: 'Douglas County', slug: 'douglas', state: 'CO', stateSlug: 'colorado', city: 'Castle Rock', population: 357978, tier: 2 },
  { name: 'Larimer County', slug: 'larimer', state: 'CO', stateSlug: 'colorado', city: 'Fort Collins', population: 359066, tier: 2 },
  { name: 'Boulder County', slug: 'boulder', state: 'CO', stateSlug: 'colorado', city: 'Boulder', population: 330758, tier: 2 },
  { name: 'Weld County', slug: 'weld', state: 'CO', stateSlug: 'colorado', city: 'Greeley', population: 328981, tier: 2 },
  { name: 'Pueblo County', slug: 'pueblo', state: 'CO', stateSlug: 'colorado', city: 'Pueblo', population: 168424, tier: 2 },

  // NORTH CAROLINA (10)
  { name: 'Mecklenburg County', slug: 'mecklenburg', state: 'NC', stateSlug: 'north-carolina', city: 'Charlotte', population: 1115482, tier: 1 },
  { name: 'Wake County', slug: 'wake', state: 'NC', stateSlug: 'north-carolina', city: 'Raleigh', population: 1129410, tier: 1 },
  { name: 'Guilford County', slug: 'guilford', state: 'NC', stateSlug: 'north-carolina', city: 'Greensboro', population: 541299, tier: 1 },
  { name: 'Forsyth County', slug: 'forsyth', state: 'NC', stateSlug: 'north-carolina', city: 'Winston-Salem', population: 382590, tier: 1 },
  { name: 'Cumberland County', slug: 'cumberland', state: 'NC', stateSlug: 'north-carolina', city: 'Fayetteville', population: 334728, tier: 2 },
  { name: 'Durham County', slug: 'durham', state: 'NC', stateSlug: 'north-carolina', city: 'Durham', population: 324833, tier: 2 },
  { name: 'Buncombe County', slug: 'buncombe', state: 'NC', stateSlug: 'north-carolina', city: 'Asheville', population: 269452, tier: 2 },
  { name: 'Gaston County', slug: 'gaston', state: 'NC', stateSlug: 'north-carolina', city: 'Gastonia', population: 227943, tier: 2 },
  { name: 'New Hanover County', slug: 'new-hanover', state: 'NC', stateSlug: 'north-carolina', city: 'Wilmington', population: 234473, tier: 2 },
  { name: 'Union County', slug: 'union', state: 'NC', stateSlug: 'north-carolina', city: 'Monroe', population: 238267, tier: 2 },

  // OHIO (10)
  { name: 'Franklin County', slug: 'franklin', state: 'OH', stateSlug: 'ohio', city: 'Columbus', population: 1323807, tier: 1 },
  { name: 'Cuyahoga County', slug: 'cuyahoga', state: 'OH', stateSlug: 'ohio', city: 'Cleveland', population: 1264817, tier: 1 },
  { name: 'Hamilton County', slug: 'hamilton', state: 'OH', stateSlug: 'ohio', city: 'Cincinnati', population: 830639, tier: 1 },
  { name: 'Summit County', slug: 'summit', state: 'OH', stateSlug: 'ohio', city: 'Akron', population: 540428, tier: 1 },
  { name: 'Montgomery County', slug: 'montgomery', state: 'OH', stateSlug: 'ohio', city: 'Dayton', population: 537309, tier: 2 },
  { name: 'Lucas County', slug: 'lucas', state: 'OH', stateSlug: 'ohio', city: 'Toledo', population: 430242, tier: 2 },
  { name: 'Butler County', slug: 'butler', state: 'OH', stateSlug: 'ohio', city: 'Hamilton', population: 390186, tier: 2 },
  { name: 'Stark County', slug: 'stark', state: 'OH', stateSlug: 'ohio', city: 'Canton', population: 374812, tier: 2 },
  { name: 'Lorain County', slug: 'lorain', state: 'OH', stateSlug: 'ohio', city: 'Elyria', population: 312964, tier: 2 },
  { name: 'Mahoning County', slug: 'mahoning', state: 'OH', stateSlug: 'ohio', city: 'Youngstown', population: 228614, tier: 2 },

  // TENNESSEE (10)
  { name: 'Shelby County', slug: 'shelby', state: 'TN', stateSlug: 'tennessee', city: 'Memphis', population: 929744, tier: 1 },
  { name: 'Davidson County', slug: 'davidson', state: 'TN', stateSlug: 'tennessee', city: 'Nashville', population: 695622, tier: 1 },
  { name: 'Knox County', slug: 'knox', state: 'TN', stateSlug: 'tennessee', city: 'Knoxville', population: 478971, tier: 1 },
  { name: 'Hamilton County', slug: 'hamilton', state: 'TN', stateSlug: 'tennessee', city: 'Chattanooga', population: 367343, tier: 1 },
  { name: 'Rutherford County', slug: 'rutherford', state: 'TN', stateSlug: 'tennessee', city: 'Murfreesboro', population: 341486, tier: 2 },
  { name: 'Williamson County', slug: 'williamson', state: 'TN', stateSlug: 'tennessee', city: 'Franklin', population: 247726, tier: 2 },
  { name: 'Sumner County', slug: 'sumner', state: 'TN', stateSlug: 'tennessee', city: 'Gallatin', population: 196281, tier: 2 },
  { name: 'Montgomery County', slug: 'montgomery', state: 'TN', stateSlug: 'tennessee', city: 'Clarksville', population: 220069, tier: 2 },
  { name: 'Wilson County', slug: 'wilson', state: 'TN', stateSlug: 'tennessee', city: 'Lebanon', population: 147737, tier: 2 },
  { name: 'Blount County', slug: 'blount', state: 'TN', stateSlug: 'tennessee', city: 'Maryville', population: 135280, tier: 2 },
];

// Topic Clusters (URL structure: /[state]/[county]/[topic]/)
const TOPIC_CLUSTERS = [
  'impound',
  'bail',
  'court',
  'dmv',
  'interlock',
  'scram'
] as const;

type TopicCluster = typeof TOPIC_CLUSTERS[number];

// Hunter-Killer v2.0 Search Queries
export function generateHunterKillerQueries(county: CountyTarget) {
  const countyName = county.name.replace(' County', '');
  const state = county.state;
  const city = county.city;

  return {
    // PHASE 1: PANIC PHASE (Impound, Bail, Release)
    impound: {
      holdRules: `site:.gov "sheriff" "towing" OR "impound" "release procedure" filetype:pdf ${countyName} ${state}`,
      gateFees: `site:.gov "towing" "fee schedule" "after hours" OR "holiday" ${city} ${countyName}`,
      notaryRequirements: `site:.gov "${countyName}" ${state} "vehicle storage facility" "notarized" OR "power of attorney"`,
      feeSchedule: `site:.gov "towing ordinance" "maximum fee" ${city} ${state}`,
    },

    bail: {
      jailBlackout: `site:.gov "inmate handbook" "release processing" "shift change" ${countyName} ${state}`,
      coolDown: `site:.gov "magistrate" "standing order" "DUI" OR "DWI" "release" ${countyName} ${state}`,
      bondSchedule: `site:.gov "bail schedule" "misdemeanor" "DUI" OR "DWI" 2024 OR 2025 filetype:pdf ${countyName} ${state}`,
      bondScheduleFelony: `site:.gov "bail schedule" "felony" "DUI" OR "DWI" 2024 OR 2025 filetype:pdf ${countyName} ${state}`,
      prBondRules: `site:.gov "personal recognizance" OR "PR bond" "DUI" eligibility ${countyName} ${state}`,
      bondingOfficeHours: `site:.gov "${countyName}" sheriff "bonding" hours location`,
    },

    // PHASE 2: CRITICAL WINDOW (DMV & License)
    dmv: {
      hearingRequestForm: `site:.gov "ALR" OR "admin per se" "hearing request" form filetype:pdf ${state}`,
      discoveryFees: `site:.gov "open records" "fee schedule" "body cam" OR "video" ${city} police`,
      hearingLocation: `site:.gov "ALR" "hearing location" "zoom" OR "telephonic" ${state} ${countyName}`,
      hardshipLogbook: `site:.gov "hardship license" "log" OR "hours" "form" filetype:pdf ${state}`,
      deadlineDays: `site:.gov "${state}" "ALR" "deadline" "days" "request hearing"`,
    },

    // PHASE 3: COMPLIANCE (SCRAM, Interlock, SR-22)
    interlock: {
      approvedProviders: `site:.gov "probation" "approved providers" "interlock" ${countyName} ${state}`,
      indigentFunding: `site:.gov "interlock" "indigent" OR "financial assistance" form filetype:pdf ${state}`,
      removalOrder: `site:.gov "interlock" "removal order" OR "verification of removal" form ${countyName} ${state}`,
      costSchedule: `site:.gov "ignition interlock" "fee" OR "cost" "installation" ${state}`,
    },

    scram: {
      approvedProviders: `site:.gov "SCRAM" OR "continuous alcohol monitor" "approved" provider ${countyName} ${state}`,
      costSchedule: `"SCRAM" "cost" OR "fee" "daily" ${countyName} ${state}`,
      violationPolicy: `site:.gov "SCRAM violation" "probation revocation" ${countyName} ${state}`,
    },

    // PHASE 4: COURT & SENTENCING
    court: {
      diversionContract: `site:.gov "pre-trial intervention" OR "diversion" "contract" OR "agreement" filetype:pdf ${countyName} ${state}`,
      localRules: `site:.gov "local rules of practice" "criminal" "cell phone" ${countyName} clerk`,
      weekendJail: `site:.gov "weekend jail" OR "periodic imprisonment" "application" ${countyName} sheriff`,
      dressCode: `site:.gov "${countyName}" court "courtroom decorum" OR "dress code"`,
      parkingMap: `site:.gov "${countyName}" "jury service" parking map`,
      jurorLot: `"${countyName}" ${state} courthouse parking juror lot free shuttle`,
    },
  };
}

// Detailed Data Schema (NO emojis, extreme granularity)
interface DetailedResearchData {
  county: string;
  state: string;
  lastUpdated: string;
  effectiveDate: string; // From PDF validation
  sources: DetailedSource[];

  // TOPIC CLUSTER: IMPOUND
  impound: {
    holdRules: {
      vsfSOP: string; // VSF Standard Operating Procedure
      notarizedLetterRequired: boolean;
      powerOfAttorneyAccepted: boolean;
      requiredDocuments: string[];
      ownerAbsentProcedure: string;
    };
    fees: {
      baseTowFee: string; // e.g., "$150-$250"
      baseTowFeeMax: string; // Legal maximum
      gateFee: string; // After-hours/holiday fee
      gateFeeMax: string; // Legal maximum
      storageDailyFee: string;
      storageDailyMax: string;
      adminFee: string;
      creditCardAccepted: boolean;
      creditCardFee: string; // Percentage or flat fee
      cashOnlyHours: string; // e.g., "After 5 PM weekdays, all weekend"
    };
    tricks: {
      cardMachineDownRule: string;
      outOfStateNotaryAccepted: boolean;
      tdlrFormAlternative: boolean;
      noStorageFirstDay: boolean;
    };
  };

  // TOPIC CLUSTER: BAIL
  bail: {
    bondSchedule: {
      dwiFirstOffense: {
        bacUnder015: string; // e.g., "$500"
        bac015to019: string;
        bac020to029: string; // e.g., "$750-$1,500"
        bac030Plus: string;
        withMinor: string; // Enhanced penalty
        withAccident: string;
        prBondEligible: boolean;
        prBondConditions: string[];
      };
      dwiSecondOffense: {
        bacUnder015: string;
        bac015Plus: string;
        minimumBond: string;
        prBondEligible: boolean;
      };
      dwiThirdOffense: {
        felony: boolean;
        minimumBond: string;
        maximumBond: string;
        prBondEligible: boolean;
      };
      enhancedCharges: {
        commercialDriver: string;
        under21: string;
        refusal: string;
      };
    };
    jailRelease: {
      bondingOfficeAddress: string;
      bondingOfficeHours: string; // e.g., "24/7" or "Mon-Fri 8AM-5PM"
      processingTimeHours: string; // e.g., "6-12 hours"
      blackoutPeriods: Array<{
        time: string; // e.g., "1:30 PM - 3:00 PM"
        reason: string; // e.g., "Staff shift change"
        applies: string; // e.g., "All days" or "Weekdays only"
      }>;
      coolDownPeriod: {
        exists: boolean;
        hours: number;
        statute: string; // Legal citation
        exceptions: string[];
      };
      paymentMethods: {
        cash: boolean;
        cashierCheck: boolean;
        moneyOrder: boolean;
        debitCredit: boolean;
        debitCreditProcessor: string; // e.g., "AllPaid.com"
        debitCreditFee: string; // e.g., "3.5%"
        personalCheck: boolean;
      };
    };
  };

  // TOPIC CLUSTER: COURT
  court: {
    parking: {
      jurorLotAddress: string;
      jurorLotFree: boolean;
      jurorLotValidationRequired: boolean;
      jurorLotHours: string;
      publicLots: Array<{
        name: string;
        address: string;
        rate: string;
        distance: string;
      }>;
      shuttles: Array<{
        name: string;
        route: string;
        free: boolean;
      }>;
      metroTransit: {
        freeWithJuryNotice: boolean;
        routes: string[];
      };
    };
    rules: {
      dressCode: {
        banned: string[]; // e.g., ["Muscle shirts", "Shorts", "Flip-flops"]
        required: string[]; // e.g., ["Closed-toe shoes"]
      };
      prohibitedItems: string[];
      cellPhonePolicy: string;
      securityCheckpoint: {
        metalDetector: boolean;
        bagSearch: boolean;
        confiscatedItems: string[];
      };
    };
    diversion: {
      programAvailable: boolean;
      programName: string;
      eligibilityCriteria: string[];
      programFee: string;
      durationMonths: number;
      admissionOfGuilt: boolean; // Critical: Does signing = guilty plea?
      completionBenefits: string[];
    };
    weekendJail: {
      available: boolean;
      applicationRequired: boolean;
      costPerDay: string;
      minimumStayDays: number;
      restrictions: string[];
    };
  };

  // TOPIC CLUSTER: DMV
  dmv: {
    hearingRequest: {
      formName: string;
      formUrl: string;
      deadlineDays: number;
      deadlineCalendarDays: boolean; // vs business days
      submissionMethods: {
        mail: boolean;
        certifiedMail: boolean;
        email: boolean;
        fax: boolean;
        inPerson: boolean;
      };
      filingFee: string;
      hearingLocation: string;
      zoomAvailable: boolean;
      telephonicAvailable: boolean;
    };
    discovery: {
      bodyCamFee: string;
      dashCamFee: string;
      policeReportFee: string;
      breathalyzerCalibrationFee: string;
      openRecordsRequestForm: string;
      processingTimeDays: number;
    };
    hardshipLicense: {
      available: boolean;
      formName: string;
      formUrl: string;
      drivingLogRequired: boolean;
      drivingLogUrl: string;
      restrictions: string[];
      fee: string;
    };
  };

  // TOPIC CLUSTER: INTERLOCK
  interlock: {
    approvedProviders: Array<{
      name: string;
      address: string;
      phone: string;
      installationFee: string;
      monthlyFee: string;
      removalFee: string;
      calibrationFee: string;
      mobileService: boolean;
      countyApproved: boolean; // vs state-only
    }>;
    indigentProgram: {
      available: boolean;
      applicationForm: string;
      discount: string; // e.g., "50% off" or "$200 reduction"
      incomeThreshold: string;
    };
    removalProcess: {
      whoSigns: string; // e.g., "Probation officer" or "Judge"
      formRequired: string;
      verificationRequired: boolean;
      fee: string;
    };
  };

  // TOPIC CLUSTER: SCRAM
  scram: {
    approvedProviders: Array<{
      name: string;
      address: string;
      phone: string;
      setupFee: string;
      dailyFee: string;
      removalFee: string;
      mobileService: boolean;
    }>;
    violationPolicy: {
      zeroTolerance: boolean;
      confirmationTest: boolean;
      automaticRevocation: boolean;
      warningSystem: string;
    };
  };
}

interface DetailedSource {
  type: string;
  url: string;
  title: string;
  effectiveDate: string; // From PDF validation
  downloaded: boolean;
  pdfPath?: string;
  lastVerified: string;
  keyFindings: string[]; // Ctrl+F results: fees, "must", constraints
}

// Create directory structure for topic clusters
export function createTopicClusterDirectories(county: CountyTarget) {
  const baseDir = path.join(process.cwd(), 'data-mining-v2', county.stateSlug, county.slug);
  const pdfDir = path.join(baseDir, 'pdfs');

  const topicDirs: Record<TopicCluster, string> = {
    impound: path.join(baseDir, 'impound'),
    bail: path.join(baseDir, 'bail'),
    court: path.join(baseDir, 'court'),
    dmv: path.join(baseDir, 'dmv'),
    interlock: path.join(baseDir, 'interlock'),
    scram: path.join(baseDir, 'scram'),
  };

  // Create base and PDF directories
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  // Create topic cluster directories
  for (const topic of TOPIC_CLUSTERS) {
    if (!fs.existsSync(topicDirs[topic])) {
      fs.mkdirSync(topicDirs[topic], { recursive: true });
    }
  }

  return { baseDir, pdfDir, topicDirs };
}

// Initialize detailed research data template
export function initializeDetailedResearchData(county: CountyTarget): DetailedResearchData {
  return {
    county: county.name,
    state: county.state,
    lastUpdated: new Date().toISOString(),
    effectiveDate: '',
    sources: [],

    impound: {
      holdRules: {
        vsfSOP: '',
        notarizedLetterRequired: false,
        powerOfAttorneyAccepted: false,
        requiredDocuments: [],
        ownerAbsentProcedure: '',
      },
      fees: {
        baseTowFee: '',
        baseTowFeeMax: '',
        gateFee: '',
        gateFeeMax: '',
        storageDailyFee: '',
        storageDailyMax: '',
        adminFee: '',
        creditCardAccepted: false,
        creditCardFee: '',
        cashOnlyHours: '',
      },
      tricks: {
        cardMachineDownRule: '',
        outOfStateNotaryAccepted: false,
        tdlrFormAlternative: false,
        noStorageFirstDay: false,
      },
    },

    bail: {
      bondSchedule: {
        dwiFirstOffense: {
          bacUnder015: '',
          bac015to019: '',
          bac020to029: '',
          bac030Plus: '',
          withMinor: '',
          withAccident: '',
          prBondEligible: false,
          prBondConditions: [],
        },
        dwiSecondOffense: {
          bacUnder015: '',
          bac015Plus: '',
          minimumBond: '',
          prBondEligible: false,
        },
        dwiThirdOffense: {
          felony: true,
          minimumBond: '',
          maximumBond: '',
          prBondEligible: false,
        },
        enhancedCharges: {
          commercialDriver: '',
          under21: '',
          refusal: '',
        },
      },
      jailRelease: {
        bondingOfficeAddress: '',
        bondingOfficeHours: '',
        processingTimeHours: '',
        blackoutPeriods: [],
        coolDownPeriod: {
          exists: false,
          hours: 0,
          statute: '',
          exceptions: [],
        },
        paymentMethods: {
          cash: false,
          cashierCheck: false,
          moneyOrder: false,
          debitCredit: false,
          debitCreditProcessor: '',
          debitCreditFee: '',
          personalCheck: false,
        },
      },
    },

    court: {
      parking: {
        jurorLotAddress: '',
        jurorLotFree: false,
        jurorLotValidationRequired: false,
        jurorLotHours: '',
        publicLots: [],
        shuttles: [],
        metroTransit: {
          freeWithJuryNotice: false,
          routes: [],
        },
      },
      rules: {
        dressCode: {
          banned: [],
          required: [],
        },
        prohibitedItems: [],
        cellPhonePolicy: '',
        securityCheckpoint: {
          metalDetector: false,
          bagSearch: false,
          confiscatedItems: [],
        },
      },
      diversion: {
        programAvailable: false,
        programName: '',
        eligibilityCriteria: [],
        programFee: '',
        durationMonths: 0,
        admissionOfGuilt: false,
        completionBenefits: [],
      },
      weekendJail: {
        available: false,
        applicationRequired: false,
        costPerDay: '',
        minimumStayDays: 0,
        restrictions: [],
      },
    },

    dmv: {
      hearingRequest: {
        formName: '',
        formUrl: '',
        deadlineDays: 0,
        deadlineCalendarDays: true,
        submissionMethods: {
          mail: false,
          certifiedMail: false,
          email: false,
          fax: false,
          inPerson: false,
        },
        filingFee: '',
        hearingLocation: '',
        zoomAvailable: false,
        telephonicAvailable: false,
      },
      discovery: {
        bodyCamFee: '',
        dashCamFee: '',
        policeReportFee: '',
        breathalyzerCalibrationFee: '',
        openRecordsRequestForm: '',
        processingTimeDays: 0,
      },
      hardshipLicense: {
        available: false,
        formName: '',
        formUrl: '',
        drivingLogRequired: false,
        drivingLogUrl: '',
        restrictions: [],
        fee: '',
      },
    },

    interlock: {
      approvedProviders: [],
      indigentProgram: {
        available: false,
        applicationForm: '',
        discount: '',
        incomeThreshold: '',
      },
      removalProcess: {
        whoSigns: '',
        formRequired: '',
        verificationRequired: false,
        fee: '',
      },
    },

    scram: {
      approvedProviders: [],
      violationPolicy: {
        zeroTolerance: false,
        confirmationTest: false,
        automaticRevocation: false,
        warningSystem: '',
      },
    },
  };
}

// Save detailed research data
export function saveDetailedResearchData(county: CountyTarget, data: DetailedResearchData) {
  const { baseDir } = createTopicClusterDirectories(county);
  const jsonPath = path.join(baseDir, 'detailed-research.json');

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Saved: ${jsonPath}`);
}

// Generate Hunter-Killer research checklists
export function generateHunterKillerChecklist(county: CountyTarget) {
  const { baseDir } = createTopicClusterDirectories(county);
  const queries = generateHunterKillerQueries(county);

  const checklist = `# ${county.name}, ${county.state} - Hunter-Killer v2.0 Research Checklist

Population: ${county.population.toLocaleString()}
City: ${county.city}
Tier: ${county.tier}
Last Updated: ${new Date().toISOString().split('T')[0]}

---

## PHASE 1: PANIC PHASE (Impound, Bail, Release)

### IMPOUND - VSF Hold Rules
\`\`\`
${queries.impound.holdRules}
\`\`\`
EXTRACT: VSF Standard Operating Procedure PDF
- Notarized letter requirement (Yes/No)
- Power of attorney acceptance (Yes/No)
- Required documents list
- Owner absent procedure

### IMPOUND - Gate Fees & Cash Rules
\`\`\`
${queries.impound.gateFees}
\`\`\`
EXTRACT: Municipal Towing Ordinance
- Base tow fee (dollar amount)
- Legal maximum tow fee
- Gate fee (after-hours/holiday)
- Legal maximum gate fee
- Storage daily fee
- Storage daily maximum
- Credit card acceptance (Yes/No)
- Credit card fee (percentage)
- Cash-only hours

VALIDATION:
- Ctrl+F "Effective Date" (must be 2022 or newer)
- Ctrl+F "$" (capture all fees)
- Ctrl+F "Must" (capture hard constraints)

### IMPOUND - Notary Requirements
\`\`\`
${queries.impound.notaryRequirements}
\`\`\`

### IMPOUND - Fee Schedule
\`\`\`
${queries.impound.feeSchedule}
\`\`\`

---

### BAIL - Jail Blackout Times
\`\`\`
${queries.bail.jailBlackout}
\`\`\`
EXTRACT: Inmate Handbook PDF
- Shift change times (e.g., "6-8 AM, 2-4 PM, 10 PM-12 AM")
- Headcount times
- Release processing hours

### BAIL - Mandatory Cool Down
\`\`\`
${queries.bail.coolDown}
\`\`\`
EXTRACT: Magistrate Standing Order
- Cool down period exists (Yes/No)
- Hours required (e.g., "12 hours")
- Statute citation
- Exceptions

### BAIL - Bond Schedule (Misdemeanor)
\`\`\`
${queries.bail.bondSchedule}
\`\`\`
EXTRACT: Official Misdemeanor Bond Schedule PDF
- DWI 1st offense, BAC <0.15: $XXX
- DWI 1st offense, BAC 0.15-0.19: $XXX
- DWI 1st offense, BAC 0.20-0.29: $XXX
- DWI 1st offense, BAC 0.30+: $XXX
- DWI 1st offense, with minor in vehicle: $XXX
- DWI 1st offense, with accident: $XXX
- PR bond eligible (Yes/No)
- PR bond conditions

### BAIL - Bond Schedule (Felony)
\`\`\`
${queries.bail.bondScheduleFelony}
\`\`\`
EXTRACT:
- DWI 2nd offense, BAC <0.15: $XXX
- DWI 2nd offense, BAC 0.15+: $XXX
- DWI 3rd offense (felony): $XXX-$XXX
- Enhanced charges (CDL, under 21, refusal)

### BAIL - PR Bond Rules
\`\`\`
${queries.bail.prBondRules}
\`\`\`

### BAIL - Bonding Office Hours
\`\`\`
${queries.bail.bondingOfficeHours}
\`\`\`
EXTRACT:
- Address
- Hours (24/7 or specific)
- Payment methods accepted
- Processing time

---

## PHASE 2: CRITICAL WINDOW (DMV & License)

### DMV - Hearing Request Form
\`\`\`
${queries.dmv.hearingRequestForm}
\`\`\`
EXTRACT: ALR Hearing Request Form PDF
- Form name
- Form URL
- Deadline (number of days)
- Calendar days vs business days
- Submission methods (mail, certified mail, email, fax, in-person)
- Filing fee

### DMV - Discovery Fees
\`\`\`
${queries.dmv.discoveryFees}
\`\`\`
EXTRACT: Police Records Fee Schedule
- Body cam footage: $XXX
- Dash cam footage: $XXX
- Police report: $XXX
- Breathalyzer calibration records: $XXX
- Open records request form URL
- Processing time (days)

### DMV - Hearing Location
\`\`\`
${queries.dmv.hearingLocation}
\`\`\`
EXTRACT:
- Hearing location address
- Zoom available (Yes/No)
- Telephonic available (Yes/No)

### DMV - Hardship License Logbook
\`\`\`
${queries.dmv.hardshipLogbook}
\`\`\`
EXTRACT: Driving Log Sheet PDF
- Form name
- Form URL
- Required for hardship license (Yes/No)
- Restrictions
- Fee

---

## PHASE 3: COMPLIANCE (SCRAM, Interlock, SR-22)

### INTERLOCK - Approved Providers (County-Specific)
\`\`\`
${queries.interlock.approvedProviders}
\`\`\`
EXTRACT: Court-Approved Provider List
For each provider:
- Name
- Address
- Phone
- Installation fee
- Monthly fee
- Removal fee
- Calibration fee
- Mobile service (Yes/No)
- County approved (Yes/No)

CROSS-REFERENCE with state list (flag discrepancies)

### INTERLOCK - Indigent Funding
\`\`\`
${queries.interlock.indigentFunding}
\`\`\`
EXTRACT: Financial Affidavit Form PDF
- Program available (Yes/No)
- Application form URL
- Discount amount or percentage
- Income threshold

### INTERLOCK - Removal Order
\`\`\`
${queries.interlock.removalOrder}
\`\`\`
EXTRACT:
- Who signs (Probation officer vs Judge)
- Form required (name/URL)
- Verification required (Yes/No)
- Fee

---

### SCRAM - Approved Providers
\`\`\`
${queries.scram.approvedProviders}
\`\`\`
EXTRACT:
For each provider:
- Name
- Address
- Phone
- Setup fee
- Daily fee
- Removal fee
- Mobile service (Yes/No)

### SCRAM - Violation Policy
\`\`\`
${queries.scram.violationPolicy}
\`\`\`
EXTRACT:
- Zero tolerance (Yes/No)
- Confirmation test required (Yes/No)
- Automatic revocation (Yes/No)
- Warning system description

---

## PHASE 4: COURT & SENTENCING

### COURT - Diversion Contract
\`\`\`
${queries.court.diversionContract}
\`\`\`
EXTRACT: Pre-Trial Intervention Agreement PDF
- Program name
- Eligibility criteria
- Program fee
- Duration (months)
- CRITICAL: Admission of guilt clause (Yes/No)
- Completion benefits

### COURT - Local Rules
\`\`\`
${queries.court.localRules}
\`\`\`
EXTRACT: Local Rules of Practice PDF
- Dress code (banned items, required items)
- Cell phone policy
- Prohibited items
- Security checkpoint details

### COURT - Weekend Jail
\`\`\`
${queries.court.weekendJail}
\`\`\`
EXTRACT: Weekend Program Application
- Program available (Yes/No)
- Application required (Yes/No)
- Cost per day
- Minimum stay (days)
- Restrictions

### COURT - Parking Hack
\`\`\`
${queries.court.parkingMap}
${queries.court.jurorLot}
\`\`\`
EXTRACT: Jury Service Parking Map
- Juror lot address
- Free for jurors (Yes/No)
- Validation required (Yes/No)
- Hours
- Public lots (name, address, rate, distance)
- Shuttles (name, route, free Y/N)
- Metro transit (free with jury notice Y/N)

---

## PHASE 5: VALIDATION

For EVERY PDF downloaded:

1. Ctrl+F "Effective Date" - If older than 2022, add "2024" or "2025" to search query and retry
2. Ctrl+F "$" - Scan for all dollar amounts, populate fee fields
3. Ctrl+F "Must" - Capture all hard constraints
4. Mark effectiveDate in sources[] array
5. Add keyFindings[] to source entry

---

## PDFS TO DOWNLOAD

Save to: pdfs/

IMPOUND:
- [ ] VSF Standard Operating Procedure → pdfs/impound-vsf-sop.pdf
- [ ] Municipal Towing Ordinance → pdfs/impound-towing-ordinance.pdf

BAIL:
- [ ] Inmate Handbook → pdfs/bail-inmate-handbook.pdf
- [ ] Magistrate Standing Order (DUI) → pdfs/bail-standing-order-dui.pdf
- [ ] Misdemeanor Bond Schedule → pdfs/bail-misdemeanor-schedule.pdf
- [ ] Felony Bond Schedule → pdfs/bail-felony-schedule.pdf

DMV:
- [ ] ALR Hearing Request Form → pdfs/dmv-alr-hearing-form.pdf
- [ ] Police Records Fee Schedule → pdfs/dmv-police-records-fees.pdf
- [ ] Hardship License Driving Log → pdfs/dmv-hardship-log.pdf

INTERLOCK:
- [ ] County Approved Provider List → pdfs/interlock-county-providers.pdf
- [ ] State Approved Provider List → pdfs/interlock-state-providers.pdf
- [ ] Indigent Funding Application → pdfs/interlock-indigent-app.pdf
- [ ] Removal Order Form → pdfs/interlock-removal-form.pdf

SCRAM:
- [ ] County Approved Provider List → pdfs/scram-county-providers.pdf

COURT:
- [ ] Pre-Trial Diversion Contract → pdfs/court-diversion-contract.pdf
- [ ] Local Rules of Practice → pdfs/court-local-rules.pdf
- [ ] Weekend Jail Application → pdfs/court-weekend-jail.pdf
- [ ] Jury Service Parking Map → pdfs/court-parking-map.pdf

---

## DATA ENTRY

Once research complete, update: detailed-research.json

QUALITY STANDARDS:
- Minimum 3 official .gov sources
- All dollar amounts must be exact (not ranges unless source provides ranges)
- All dates must include effectiveDate from PDF
- All "must" constraints captured
- Cross-reference county lists vs state lists (flag conflicts)
- Mark data freshness (prefer 2024-2025 sources)

---

## RESEARCH COMPLETE CHECKLIST

- [ ] All search queries executed
- [ ] PDFs downloaded and saved to pdfs/
- [ ] PDF validation complete (effective date, fees, constraints)
- [ ] detailed-research.json populated
- [ ] Sources documented with URLs and effectiveDates
- [ ] Quality check: 3+ .gov sources, exact dollar amounts, no emojis
`;

  const checklistPath = path.join(baseDir, 'HUNTER-KILLER-CHECKLIST.md');
  fs.writeFileSync(checklistPath, checklist, 'utf-8');
  console.log(`Created: ${checklistPath}`);
}

// Main execution - Start with Texas 10
async function main() {
  console.log('Hunter-Killer v2.0 Protocol - Data Mining Infrastructure\n');
  console.log(`Total Counties: ${TARGET_COUNTIES.length}\n`);
  console.log('Starting with: TEXAS BATCH (10 counties)\n');

  const texas10 = TARGET_COUNTIES.filter(c => c.state === 'TX');

  for (const county of texas10) {
    console.log(`\n${county.name}, ${county.state} (${county.city})`);

    createTopicClusterDirectories(county);
    generateHunterKillerChecklist(county);
    const researchData = initializeDetailedResearchData(county);
    saveDetailedResearchData(county, researchData);

    console.log(`  Folder: data-mining-v2/${county.stateSlug}/${county.slug}/`);
  }

  console.log('\n\nTexas Batch Setup Complete!\n');
  console.log('Directory Structure:');
  console.log('  data-mining-v2/');
  console.log('  └── texas/');
  console.log('      ├── harris/');
  console.log('      │   ├── impound/');
  console.log('      │   ├── bail/');
  console.log('      │   ├── court/');
  console.log('      │   ├── dmv/');
  console.log('      │   ├── interlock/');
  console.log('      │   ├── scram/');
  console.log('      │   ├── pdfs/');
  console.log('      │   ├── detailed-research.json');
  console.log('      │   └── HUNTER-KILLER-CHECKLIST.md');
  console.log('      └── ... (9 more Texas counties)');
  console.log('\nNext Steps:');
  console.log('  1. Start with Harris County (highest priority)');
  console.log('  2. Follow HUNTER-KILLER-CHECKLIST.md');
  console.log('  3. Run all search queries');
  console.log('  4. Download PDFs to pdfs/ folder');
  console.log('  5. Validate PDFs (effective date, fees, constraints)');
  console.log('  6. Populate detailed-research.json');
  console.log('  7. Move to next Texas county');
}

main();
