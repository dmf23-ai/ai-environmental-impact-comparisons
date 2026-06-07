// Central manifest for the second-pass ("Compared to What?" Art Nouveau atlas)
// generated image assets. Optimized .webp versions live under
// public/assets/redesign-2nd-pass/ and are referenced from the site root.
//
// All of these are DECORATIVE / ILLUSTRATIVE support. No essential text,
// numbers, chart labels, citations, or controls are baked into them — those
// are always real HTML/SVG. Mark ornaments aria-hidden with empty alt; give
// topic-identifying spot illustrations short alt only when not redundant.

const BASE = "/assets/redesign-2nd-pass";

export const redesignAssets = {
  frame: {
    corners: `${BASE}/asset_page_corner_flourishes.webp`,
  },
  masthead: {
    poppiesLeft: `${BASE}/asset_masthead_poppies_left.webp`,
    poppiesRight: `${BASE}/asset_masthead_poppies_right.webp`,
    frieze: `${BASE}/asset_botanical_frieze_wheat_poppies.webp`,
  },
  featured: {
    golfWaterPanel: `${BASE}/asset_featured_golf_water_panel.webp`,
    statCartouche: `${BASE}/asset_cartouche_stat_frame.webp`,
    ribbon: `${BASE}/asset_featured_ribbon.webp`,
  },
  spots: {
    golfCourseWater: `${BASE}/spot_golf_course_water.webp`,
    residentialOutdoorWater: `${BASE}/spot_residential_outdoor_water.webp`,
    vintageCarEmissions: `${BASE}/spot_vintage_car_emissions.webp`,
    houseElectricity: `${BASE}/spot_house_electricity.webp`,
    airplaneAviation: `${BASE}/spot_airplane_aviation.webp`,
    cementSteelFactory: `${BASE}/spot_cement_steel_factory.webp`,
    bitcoinMining: `${BASE}/spot_bitcoin_mining.webp`,
    evCharging: `${BASE}/spot_ev_charging.webp`,
    videoStreaming: `${BASE}/spot_video_streaming.webp`,
    videoGaming: `${BASE}/spot_video_gaming.webp`,
    cattleEmissions: `${BASE}/spot_cattle_emissions.webp`,
    homeAirConditioning: `${BASE}/spot_home_air_conditioning.webp`,
    lawnEquipment: `${BASE}/spot_lawn_equipment.webp`,
    holidayLighting: `${BASE}/spot_holiday_lighting.webp`,
    aiInferenceTraining: `${BASE}/spot_ai_inference_training.webp`,
  },
  fieldNotes: {
    hour: `${BASE}/fieldnote_hour.webp`,
    year: `${BASE}/fieldnote_year.webp`,
    water: `${BASE}/fieldnote_water.webp`,
    trajectory: `${BASE}/fieldnote_trajectory.webp`,
    equivalents: `${BASE}/fieldnote_equivalents.webp`,
    trainingInference: `${BASE}/fieldnote_training_inference.webp`,
  },
  footer: {
    earth: `${BASE}/footer_roundel_earth.webp`,
    sustainableLandscape: `${BASE}/footer_roundel_sustainable_landscape.webp`,
  },
} as const;

// Maps each atlas card to its spot illustration by the stable `illustration`
// key from atlasMeta.ts (ComparisonPlate already receives this prop).
export const spotByIllustration: Record<string, string> = {
  golf: redesignAssets.spots.golfCourseWater,
  sprinkler: redesignAssets.spots.residentialOutdoorWater,
  car: redesignAssets.spots.vintageCarEmissions,
  house: redesignAssets.spots.houseElectricity,
  plane: redesignAssets.spots.airplaneAviation,
  factory: redesignAssets.spots.cementSteelFactory,
  bitcoin: redesignAssets.spots.bitcoinMining,
  ev: redesignAssets.spots.evCharging,
  streaming: redesignAssets.spots.videoStreaming,
  controller: redesignAssets.spots.videoGaming,
  cattle: redesignAssets.spots.cattleEmissions,
  ac: redesignAssets.spots.homeAirConditioning,
  mower: redesignAssets.spots.lawnEquipment,
  lights: redesignAssets.spots.holidayLighting,
  // plate 15 "CO2 per hour: driving vs AI" — the AI inference/training spot
  // identifies the AI side (the car spot is already used on plate 3).
  clock: redesignAssets.spots.aiInferenceTraining,
};

// Short alt text for spot illustrations, keyed by illustration key. Used only
// where the spot helps identify the topic and isn't redundant with card text.
export const spotAltByIllustration: Record<string, string> = {
  golf: "Golf course pond and fairway",
  sprinkler: "Residential lawn sprinkler",
  car: "Vintage automobile",
  house: "Lit household at night",
  plane: "Airliner in flight",
  factory: "Cement and steel works",
  bitcoin: "Bitcoin mining rigs",
  ev: "Electric vehicle charging",
  streaming: "Video streaming on a screen",
  controller: "Game controller",
  cattle: "Grazing cattle",
  ac: "Home air-conditioning unit",
  mower: "Gas lawn mower",
  lights: "Strung holiday lights",
  clock: "AI data-center servers",
};

export const fieldNoteMedallions: Record<string, string> = {
  "fn-hour": redesignAssets.fieldNotes.hour,
  "fn-year": redesignAssets.fieldNotes.year,
  "fn-water": redesignAssets.fieldNotes.water,
  "fn-trajectory": redesignAssets.fieldNotes.trajectory,
  "fn-equivalents": redesignAssets.fieldNotes.equivalents,
  "fn-training": redesignAssets.fieldNotes.trainingInference,
};
