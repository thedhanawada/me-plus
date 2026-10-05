export interface Photo {
  id: string;
  width: number;
  height: number;
  alt: string;
  favorite?: boolean;
}

export const photos: Photo[] = [
  // Favorites
  { id: 'IMG_3993_knzvrb', width: 1816, height: 2976, alt: "Black-and-white photograph of a drummer walking through a crowd", favorite: true },
  { id: 'IMG_3973_wvbdt9', width: 2976, height: 1984, alt: "Black-and-white photograph of a crowd filling a street lined with shops", favorite: true },
  { id: 'IMG_4023_t0ow4l', width: 1984, height: 2976, alt: "Black-and-white photograph of decorated elephants beyond a crowd, viewed from beneath a canopy", favorite: true },

  // Collection
  { id: '22', width: 1440, height: 1818, alt: "Windblown curly hair lit by the sun, seen from behind in a crowd" },
  { id: '472007649_1653285385584310_7880930838952272566_n_18050182676011288_qh9ysx', width: 1440, height: 1800, alt: "Upward view of a tall glass-and-stone building against a blue sky" },
  { id: '471870504_470471162449468_1301845703334164529_n_18057795115760805_qk7ij7', width: 1440, height: 1800, alt: "Upward view of a tall glass-and-stone building beneath a gray sky" },
  { id: '472028752_677524267977881_7782810903216877222_n_18052829000068831_kzj7dl', width: 1440, height: 1800, alt: "An obelisk rising beneath dark, heavy clouds" },
  { id: '471848228_634245685604604_5320794688258876057_n_17913369978050780_wjnueu', width: 1440, height: 1800, alt: "Black-and-white view of storefronts beside a Welcome to Pennsylvania sign" },
  { id: '471507008_962068528601656_6075539269720940501_n_18052370966481944_kbj6gd', width: 1440, height: 1800, alt: "A broad paved plaza leading toward city buildings at sunset" },
  { id: '471703857_2377874515912198_12434465591510404_n_17994608639727968_jahs5j', width: 1440, height: 1800, alt: "Upward view of a tall glass-and-stone building beneath a gray sky" },
  { id: '471553046_1104895781177670_5300287396742135585_n_18066609328796010_d32nyy', width: 1440, height: 1800, alt: "A snow-covered lake beneath dramatic clouds, with buildings along the far shore" },
  { id: '470305537_18053173805494713_1713032142419250645_n_17845625373372790_akqc6s', width: 1440, height: 1440, alt: "Two people sitting together in front of the Beverly Hills sign" },
  { id: '471456203_1007422401427125_3502140041150936202_n_18075397129618164_aygnro', width: 1440, height: 1080, alt: "A brick apartment building on a street corner beneath a clear blue sky" },
  { id: '471472709_27990740777239594_6469774170371940177_n_18033254411524063_dpeexs', width: 1440, height: 1800, alt: "A snow-covered lake beneath dramatic clouds, with buildings along the far shore" },
  { id: '471490245_605404195340020_2035155305643517717_n_17997108980574330_ecufhd', width: 1440, height: 1800, alt: "A broad paved plaza leading toward city buildings at sunset" },
  { id: '471391323_1845202889638439_4853468154254214955_n_18063562843677131_bpva6o', width: 1080, height: 810, alt: "A brick apartment building on a street corner beneath a clear blue sky" },
  { id: '471442577_1739319180247399_8416647570029827622_n_18022214450635613_yph9o6', width: 1440, height: 1080, alt: "City buildings and clouds reflected in a lake beside a wooden boardwalk" },
  { id: '470975125_1280941889820214_1268483907759615960_n_18262480012265170_mdjkkz', width: 1440, height: 1800, alt: "A crowd lining a theme-park street with a castle in the distance" },
  { id: '471383575_1102052484884012_1041918410898582781_n_18025655903556269_lxq1bx', width: 1080, height: 810, alt: "City buildings and clouds reflected in a lake beside a wooden boardwalk" },
  { id: '470974844_859495799459959_3787070871998235827_n_18368639380138075_tnawnv', width: 1440, height: 1800, alt: "People lining a theme-park street with tracks down the center" },
  { id: '470952070_3629107047381821_1772799932852376102_n_17971400249682129_hn0qu4', width: 1440, height: 1800, alt: "A person standing outside Sal and Carmine Pizza beneath a green awning" },
  { id: '470900506_611435547954396_7232398193324505243_n_18041143781195199_u44ste', width: 1440, height: 1800, alt: "Sunlight and shadow across a stone building with parked cars below" },
  { id: '470894562_581139051228650_3319545858617387590_n_17940484679942381_q681o0', width: 1440, height: 1800, alt: "A person standing outside Sal and Carmine Pizza beneath a green awning" },
  { id: '470684195_18053453462494713_8166586720672144739_n_18080153713584429_obf9h1', width: 1440, height: 1800, alt: "Upward view of arched stained-glass windows in a stone wall" },
  { id: '470698450_18053452202494713_6092328162172137266_n_18055041025792703_qqtmyn', width: 1440, height: 1440, alt: "An empty road beside sandstone campus buildings and a tall tower" },
  { id: '470326342_18053063381494713_2965871946225792580_n_18064534522756977_pk0nzf', width: 1440, height: 1440, alt: "Upward view of an ornate gold-toned domed ceiling and circular skylight" },
  { id: '470337103_18053060249494713_4537376801974395151_n_18058624255732232_fkfxuv', width: 1440, height: 1800, alt: "An empty city intersection lined with office buildings and autumn trees" },
  { id: '470467037_18053186303494713_1402822304817556653_n_17990270237753157_x0gxfk', width: 1440, height: 943, alt: "A framed collage combining people in water with rectangular blocks of color" },
  { id: '469748350_18052479383494713_4550296238941186231_n_17976647684794350_s4b2md', width: 1440, height: 1818, alt: "A grassy verge beside a city street, with a tower behind low buildings" },
  { id: '470038998_18052695323494713_2879505046887173584_n_18062036062684565_xe20tb', width: 1440, height: 1080, alt: "A glass-fronted building with an Engineering Research entrance" },
  { id: '469949027_18052479323494713_5573172088644028447_n_17894251119035143_pwm1wa', width: 2160, height: 1440, alt: "Black-and-white photograph of the Beverly Hills sign above a fountain" },
  { id: '469683286_18052573628494713_8628966261642827611_n_17959288202842486_kwqo3j', width: 1440, height: 1440, alt: "Ed O\u2019Neill\u2019s star on the Hollywood Walk of Fame" },
  { id: '470033707_938866904331332_6030014001682290844_n_18031501163437156_ug03gp', width: 1440, height: 1080, alt: "A brick building with a columned entrance and autumn trees" },
  { id: '469714253_18052621304494713_1145338475822859651_n_17861511081295103_emp4i3', width: 1440, height: 1080, alt: "Golden leaves lit against a dark night sky, with the moon above" },
  { id: '469908803_941212227507022_5284793092239071255_n_17988849605744052_ii4x0t', width: 1080, height: 810, alt: "A brick building with a columned entrance and autumn trees" },
  { id: '469641546_18052612133494713_4284139324000123590_n_18053068966815487_swxhw9', width: 1440, height: 1800, alt: "A sidewalk beneath autumn trees beside a quiet road" },
  { id: '469748340_18052586627494713_145286066974460161_n_18063822691766235_hmkzco', width: 2160, height: 1440, alt: "A small brown sphere above a round white pedestal against a dark wooden wall" },
  { id: '469592455_18052571543494713_1260971431337253769_n_17884397715179153_n8wl07', width: 1440, height: 1818, alt: "A palm-lined street with the Hollywood sign visible in the distance" },
  { id: '469586787_18052479011494713_5751425294506957218_n_17951372963860388_rwcpjs', width: 2160, height: 1440, alt: "Traffic and pedestrians at a sunlit intersection lined with palm trees" },
  { id: '469540249_18052479866494713_1876648324135395500_n_18378226756110611_okmbzy', width: 1440, height: 1080, alt: "Low-angle view of a person in a yellow-green shirt against a blue sky" },
  { id: '472123967_507389138437295_7147050760239808910_n_18056923354780192_d1vvn3', width: 1440, height: 1818, alt: "A sepia-toned photograph of the Statue of Liberty and its pedestal" },
];
