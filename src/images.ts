import { staticFile } from 'remotion';

// Centralized local image URLs served from /public through Remotion.
const imageUrl = (folder: string, filename: string) =>
    staticFile(`${folder}/${filename}`);

export const KATSEYE_IMAGES = {
    q1: imageUrl('nuevo testamento', '01_mateo_recaudador.png'),
    q2: imageUrl('nuevo testamento', '02_belen_nacimiento.png'),
    q3: imageUrl('nuevo testamento', '03_judas_treinta_monedas.png'),
    q4: imageUrl('nuevo testamento', '04_cana_agua_en_vino.png'),
    q5: imageUrl('nuevo testamento', '05_pablo_epistolas.png'),
    q6: imageUrl('nuevo testamento', '06_herodes_agripa.png'),
    q7: imageUrl('nuevo testamento', '07_juan_en_patmos.png'),
    q8: imageUrl('nuevo testamento', '08_hijos_del_trueno.png'),
    q9: imageUrl('nuevo testamento', '09_lazaro_resucitado.png'),
    q10: imageUrl('nuevo testamento', '10_balaam_y_burra.png'),
    q11: imageUrl('nuevo testamento', '11_esteban_martir.png'),
    q12: imageUrl('nuevo testamento', '12_gedeon_vellon.png'),
    q13: imageUrl('nuevo testamento', '13_pedro_y_andres.png'),
    q14: imageUrl('nuevo testamento', '14_nicodemo_de_noche.png'),
    q15: imageUrl('nuevo testamento', '15_moises_sinai.png'),
    q16: imageUrl('nuevo testamento', '16_debora_y_barac.png'),
    q17: imageUrl('nuevo testamento', '17_arca_de_noe.png'),
    q18: imageUrl('nuevo testamento', '18_eliseo_sucesor.png'),
    q19: imageUrl('nuevo testamento', '19_pilato_lava_manos.png'),
    q20: imageUrl('nuevo testamento', '20_murallas_de_jerico.png'),
    q21: imageUrl('nuevo testamento', '21_manuscrito_griego.png'),
    q22: imageUrl('nuevo testamento', '22_simeon_y_el_bebe.png'),
    q23: imageUrl('nuevo testamento', '23_tomas_y_las_heridas.png'),
    q24: imageUrl('nuevo testamento', '24_saulo_damasco.png'),
    q25: imageUrl('nuevo testamento', '25_reina_de_saba.png'),
    q26: imageUrl('nuevo testamento', '26_horno_de_fuego.png'),
    q27: imageUrl('nuevo testamento', '27_jonas_y_gran_pez.png'),
    q28: imageUrl('nuevo testamento', '28_negaciones_de_pedro.png'),
    q29: imageUrl('nuevo testamento', '29_job_paciencia.png'),
    q30: imageUrl('nuevo testamento', '30_joas_joven_rey.png'),
    q31: imageUrl('nuevo testamento', '31_eutico_cae.png'),
} as const;
