// Centralized image URLs for all trivia questions
// Change MORAT_BASE once here to update all questions in all languages

export const MORAT_BASE = "https://raw.githubusercontent.com/josanager/Images-Triviaquiz/main/Morat";

// Named image constants — used by both questions.ts and questionsEn.ts
// This eliminates duplication and ensures ES/EN always reference the same images
export const MORAT_IMAGES = {
    group_1_studio: `${MORAT_BASE}/21_morat_group_1_studio_1769894262327.png`,
    group_2_urban: `${MORAT_BASE}/22_morat_group_2_urban_fisheye_1769894280704.png`,
    group_3_couch: `${MORAT_BASE}/23_morat_group_3_couch_1769894297139.png`,
    group_4_backstage: `${MORAT_BASE}/24_morat_group_4_cases_backstage_1769894313221.png`,
    group_5_graffiti: `${MORAT_BASE}/25_morat_group_5_leather_graffiti_1769894328631.png`,

    concert_1_stage: `${MORAT_BASE}/16_morat_concert_1_stage_performance_1769894820157.png`,
    concert_2_wide: `${MORAT_BASE}/17_morat_concert_2_live_wide_1769894844050.png`,
    concert_3_steps: `${MORAT_BASE}/18_morat_concert_3_stage_steps_posing_1769894863230.png`,
    concert_4_awards: `${MORAT_BASE}/19_morat_concert_4_awards_red_bg_1769894882373.png`,
    concert_5_hug: `${MORAT_BASE}/20_morat_concert_5_awards_hug_purple_1769894899110.png`,

    isaza_1: `${MORAT_BASE}/1_juan_pablo_isaza_1_1769837971258.png`,
    isaza_2: `${MORAT_BASE}/2_juan_pablo_isaza_2_1769837994200.png`,
    isaza_3: `${MORAT_BASE}/3_juan_pablo_isaza_3_1769838016662.png`,
    isaza_5: `${MORAT_BASE}/4_juan_pablo_isaza_5_1769838091861.png`,

    villamil_banjo_1: `${MORAT_BASE}/6_juan_pablo_villamil_banjo_1_1769838813929.png`,
    villamil_banjo_5_bw: `${MORAT_BASE}/7_juan_pablo_villamil_banjo_5_bw_1769838954841.png`,
    villamil_bw_3: `${MORAT_BASE}/8_juan_pablo_villamil_bw_3_1769838853294.png`,
    villamil_guitar_4: `${MORAT_BASE}/9_juan_pablo_villamil_guitar_4_1769838932576.png`,
    villamil_theater_2: `${MORAT_BASE}/10_juan_pablo_villamil_theater_2_1769838832435.png`,

    martin_1_cap: `${MORAT_BASE}/11_martin_vargas_1_leather_cap_1769888969671.png`,
    martin_2_sideways: `${MORAT_BASE}/12_martin_vargas_2_leather_sideways_1769888990084.png`,
    martin_3_flowers: `${MORAT_BASE}/13_martin_vargas_3_flowers_orange_1769889008963.png`,
    martin_4_adidas: `${MORAT_BASE}/14_martin_vargas_4_adidas_black_1769889026458.png`,
    martin_5_smile: `${MORAT_BASE}/15_martin_vargas_5_smile_isaza_genuine_1769889125581.png`,

    simon_1_striped: `${MORAT_BASE}/26_simon_vargas_1_striped_1769839280150.png`,
    simon_2_bw: `${MORAT_BASE}/27_simon_vargas_2_bw_1769839297049.png`,
    simon_3_green: `${MORAT_BASE}/28_simon_vargas_3_green_1769839315370.png`,
    simon_5_misfits: `${MORAT_BASE}/29_simon_vargas_5_misfits_1769839411064.png`,
} as const;
