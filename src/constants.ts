import type { ProcessPath, StepKey, StepDetails } from './types';

export const IMAGE_CARD_URLS: string[] = [
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/076e902b-957e-4223-a4f9-4873f4321d46/Cartas+Oh_1.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/5caffcd3-ec57-4243-9460-17d98cf19a11/Cartas+Oh_2.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/fec6484d-ebc2-4d5d-9ea8-08f2cb1980d0/Cartas+Oh_3.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/6ce4100b-bff1-4250-b4e7-ddc583762a36/Cartas+Oh_4.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/967f3552-3afe-4c55-a0fc-86d7ef5822f9/Cartas+Oh_5.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/13bdd9dd-34f9-4581-97b8-b0a5f7e955db/Cartas+Oh_6.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/2bdb34eb-b292-424e-9b2a-1fd5e8d9df30/Cartas+Oh_7.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/879175d8-8b0b-4d4e-9630-81d080a2a826/Cartas+Oh_8.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/815a99a3-7c29-4a59-b28d-a4b8735fbdba/Cartas+Oh_9.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/b4b7fc46-f6f6-4512-8ac9-f03fd2335fcf/Cartas+Oh_10.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/b21966e3-357c-4dac-8259-f28b005b3c9c/Cartas+Oh_11.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/ff989db6-7b1e-4cde-b9ec-0e9b976d5fed/Cartas+Oh_12.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/64517155-0426-467c-a7b6-ab849d57c5d7/Cartas+Oh_13.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/63605f56-86ac-4c5c-b0e5-822812f60e31/Cartas+Oh_14.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/0c1312ad-15ad-40f0-af19-2bd3aba4deb8/Cartas+Oh_15.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/07fc8375-30bf-4f8d-9306-fcd5b416b06a/Cartas+Oh_16.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/67c0cc35-bb05-4a87-9043-bb1e84bfaa2c/Cartas+Oh_17.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/03c4c00c-c762-45ee-8885-1b49fae8a8c9/Cartas+Oh_18.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/5cefe001-85ee-4ef0-9e12-5f9960e8b8da/Cartas+Oh_19.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/0831581e-efc0-4a19-a69a-6d17945c8a46/Cartas+Oh_20.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/cdbeb903-441f-41f2-88a0-c9eef1ca343c/Cartas+Oh_21.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/1f52c3d9-b653-4d13-b3ac-a48194cc16b1/Cartas+Oh_22.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/aec92e95-69f8-43e4-9f68-45f945f54c54/Cartas+Oh_23.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/68579681-f502-4afa-847b-cacabea5f0da/Cartas+Oh_24.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/ad9d775e-0c70-4cf4-8ca4-1103b6db7a8f/Cartas+Oh_25.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/c5297495-725a-4710-a94b-e39ec1505ad2/Cartas+Oh_26.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/6f51e61d-c55e-48b5-a91d-298a9a01903c/Cartas+Oh_27.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/21603c05-7f96-4bea-9a9d-9b5fff8ac3a3/Cartas+Oh_28.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/275d7aa7-8c3a-47b1-9890-970f71f07cde/Cartas+Oh_29.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/f8464edb-e60b-4e75-93c5-08be27255b8d/Cartas+Oh_30.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/f9094290-63dc-463f-bf8f-42ff207768ce/Cartas+Oh_31.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/e6796749-79cc-4d01-b6d0-5aa8f919efbb/Cartas+Oh_32.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/a70706c5-e22e-44c0-829f-ea8cf6f4f885/Cartas+Oh_33.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/c9081489-73ba-44c9-9aac-f1c11c95a460/Cartas+Oh_34.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/6b2f8944-4bce-4df4-8240-edcd7f0612a7/Cartas+Oh_35.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/68e2face-7554-43f4-9726-497be42667f4/Cartas+Oh_36.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/2a505002-847b-41dc-9976-7a6883b4853f/Cartas+Oh_37.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/e28b4c89-d142-4fe4-a396-0b9235f0bcbe/Cartas+Oh_38.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/d049dd32-0fbd-4d67-bd1a-530a7a36c0d6/Cartas+Oh_39.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/ffd92552-1f5c-4b41-a529-397f5f5bcba8/Cartas+Oh_40.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/086e2ba0-9117-4a4a-aba5-75ff693f6c8b/Cartas+Oh_41.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/fbcedfe6-7e9a-4de0-9e40-7ea1c30c8b4c/Cartas+Oh_42.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/d4118a9e-511e-4b33-af13-a0477474c597/Cartas+Oh_43.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/07c3af0e-58bf-4537-b063-012cc50cf4df/Cartas+Oh_44.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/c9004f1f-9875-4bca-aeb7-0e9d92ddd1b1/Cartas+Oh_45.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/f8bdde3f-8dbd-40de-a189-62cc72e425b8/Cartas+Oh_46.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/402fe387-008d-4c8e-9d7f-93068384d3ca/Cartas+Oh_47.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/93e06c15-d412-4e33-a622-5c55cdb91d41/Cartas+Oh_48.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/c78f0140-4e39-4ec6-84a0-0c31a86a60d7/Cartas+Oh_49.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/c4da41aa-aa19-43cb-9d8a-8ff8b054b68f/Cartas+Oh_50.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/be321c4e-f40a-4831-90e8-1b046a764473/Cartas+Oh_51.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/a94d4622-7a2c-45a8-968f-a3a264956ace/Cartas+Oh_52.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/b95bab8b-0ca7-412b-9d27-0bfc6f714214/Cartas+Oh_53.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/65bafa0f-f114-46c6-aefc-1d722cfe0f44/Cartas+Oh_54.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/ff601cdc-1661-4c7b-a8fb-37a3d3fd3f9a/Cartas+Oh_55.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/0eebfbcb-f809-46ac-bf8f-bb735d17f4e5/Cartas+Oh_56.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/fbf228e2-3011-4e5f-9ffd-6100607a4d8a/Cartas+Oh_57.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/4f8061af-ecb5-4546-8fef-284edab4e597/Cartas+Oh_58.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/97e7ec59-9a1f-4dd1-ae85-f8f075759e3e/Cartas+Oh_59.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/e0a06890-d401-4711-b672-15371c8b2e10/Cartas+Oh_60.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/5a5a826f-4121-461a-83d7-defeaa8361c8/Cartas+Oh_61.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/368c0cdf-a527-4637-b5c9-3288afef7dd9/Cartas+Oh_62.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/526df790-5cd1-4e6c-ab48-3a9859e5f23b/Cartas+Oh_63.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/6a444709-5881-42a6-ba95-7414d8dd17ac/Cartas+Oh_64.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/a1fc2a2d-1d47-48d1-aabf-358bd9d9c28e/Cartas+Oh_65.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/1736e215-853d-4a5e-a51a-5217ba44d2f7/Cartas+Oh_66.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/39dea937-fe58-4640-b0f6-60c01f681ea3/Cartas+Oh_67.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/058086c9-4623-4dd4-90c0-06816e0397aa/Cartas+Oh_68.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/ad817360-5755-4404-831f-5cd7087dfb0d/Cartas+Oh_69.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/b1e2a3fb-4a53-4ea7-a2c0-2b07ff7bf0b8/Cartas+Oh_70.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/04eca5ef-3747-4a44-9fcb-8b6fc68032aa/Cartas+Oh_71.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/59988099-dc19-47c9-9b2a-97d5da1bae40/Cartas+Oh_72.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/65589ec7-0c7c-4601-9559-7cf06f0f4c42/Cartas+Oh_73.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/7f0d6aa2-a046-4223-b890-bd3146e42de0/Cartas+Oh_74.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/3f20f67b-8549-433b-932d-489a09aff7e0/Cartas+Oh_75.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/59cf5aba-08a1-4a03-b21d-2d6c4bcac1b4/Cartas+Oh_76.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/14877a14-eea2-438a-8fe7-d46479316974/Cartas+Oh_77.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/3c119959-3f90-4bf0-b38f-2242e0b4fe45/Cartas+Oh_78.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/f386876c-a027-447e-97d8-671994aa2e57/Cartas+Oh_79.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/200135e2-e899-4a84-8f93-835cdb1ade23/Cartas+Oh_80.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/d17fc5f8-077c-4fd2-b676-2ddaded16498/Cartas+Oh_81.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/a6e7c577-f2d0-44d4-9502-5ff1609fd823/Cartas+Oh_82.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/0c10ef56-3aa4-426b-a7fa-7381d7b936da/Cartas+Oh_83.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/9c4a584f-d70b-477b-9ae6-2fbbe0195bec/Cartas+Oh_84.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/2836d984-0303-468a-80ca-693c755bab69/Cartas+Oh_85.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/1a617f7e-9206-4972-abac-d813a0811574/Cartas+Oh_86.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/507b6653-6d59-4554-a927-3d759fb6e0f5/Cartas+Oh_87.png",
  "https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/6ebb56eb-9e9c-4408-82fd-a498bcee533f/Cartas+Oh_88.png"
];

export const WORD_CARD_DATA: string[] = [
    "Aburrimiento", "¡Adelante!", "Agarrar", "Agotado", "Alegría", "Amenaza", "Amor",
    "Apariencia", "Ansiedad", "Ataque", "Atracción", "Cambio", "Confusión", "Culpa",
    "Cariño", "Cómico", "Cólera", "Compartir", "Ciclo", "Comienzo", "Conformar",
    "Desnudo", "Desgracia", "Disculpa", "Debería", "Depender", "Dolor", "Dar",
    "Destruir", "Deuda", "Desagradable", "Estúpido", "Esconder", "Extraños", "Experto",
    "Eliminar", "Esperar", "Erótico", "Esclavo", "Embarazoso", "Éxito", "Esperanza",
    "Firme", "Feo", "Fracasar", "Fascinación", "Homosexual", "Hogar", "Hábito",
    "Humillar", "Hombres", "Intimidar", "Juego", "Jactarse", "Juego de Poder", "Jefe",
    "Malo", "Miedo", "Mentira", "Meto la Pata", "Maravilloso", "Madre", "Mujeres",
    "Niño", "Obsesión", "Odio", "Pudrir", "Pesar", "Padre", "Parar", "Postura",
    "Peligro", "Retiro", "Resistir", "Risa", "Rival", "Rígido", "Resentir", "Suprimir",
    "Sueño", "Solo", "Sabio", "Soltar", "Tomar", "Vergüenza", "Víctima", "Vacilación",
    "Violar"
];

export const PROCESS_STEPS: { [key in ProcessPath]: StepKey[] } = {
    image: [ 'describe_image', 'create_story', 'define_word', 'combination', 'self_connection' ],
    word: [ 'define_word', 'describe_image', 'create_story', 'combination', 'self_connection' ]
};

export const STEP_DETAILS: StepDetails = {
    describe_image: { name: 'Describe la Imagen', prompt: 'Cuéntame qué es lo que ves. ¿Qué te llama la atención? ¿Qué hay en el fondo? ¿Qué sientes al verla y dónde lo sientes en tu cuerpo?', placeholder: 'Escribe tu descripción y sentimientos...' },
    create_story: { name: 'Crea una Historia', prompt: 'Ahora dime una historia, la que te venga a la mente, empezando con "Había una vez...".', placeholder: 'Había una vez...' },
    define_word: { name: 'Define la Palabra', prompt: 'Para ti, ¿qué significa esta palabra? Dime tres definiciones o asociaciones que te vengan a la mente.', placeholder: '1. ...\n2. ...\n3. ...' },
    combination: { name: 'La Combinación', prompt: 'Observa la imagen y la palabra juntas. ¿Qué sientes? ¿Qué pensamientos o nuevas ideas surgen de esta combinación?', placeholder: 'Escribe tus sentimientos e ideas...' },
    self_connection: { name: 'Conectando Contigo', prompt: 'Todo esto que ha surgido... ¿qué tiene que ver contigo y con la situación que planteaste al principio?', placeholder: 'Escribe aquí tu reflexión final...' }
};