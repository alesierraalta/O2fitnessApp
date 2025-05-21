export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  restTime: number; // en segundos
  description: string;
  muscleGroup: string;
  imageUrl?: string;
  videoUrl?: string;
};

export type Routine = {
  id: string;
  name: string;
  description: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  category: string;
  duration: number; // en minutos
  exercises: Exercise[];
  isOwnerCreated: boolean;
};

// Rutinas predefinidas por el dueño de la app
export const ownerRoutines: Routine[] = [
  {
    id: 'routine-1',
    name: 'Entrenamiento Completo de Cuerpo',
    description: 'Una rutina completa que trabaja todos los grupos musculares principales con ejercicios compuestos para maximizar el tiempo y los resultados.',
    difficulty: 'Intermedio',
    category: 'Fuerza',
    duration: 60,
    isOwnerCreated: true,
    exercises: [
      {
        id: 'ex-1',
        name: 'Sentadillas',
        sets: 4,
        reps: 12,
        restTime: 90,
        description: 'Párate con los pies a la anchura de los hombros, baja como si te sentaras en una silla, manteniendo el pecho elevado y la espalda recta.',
        muscleGroup: 'Piernas',
        imageUrl: 'https://example.com/img/squat.jpg'
      },
      {
        id: 'ex-2',
        name: 'Flexiones de Pecho',
        sets: 3,
        reps: 15,
        restTime: 60,
        description: 'Colócate en posición de plancha con las manos un poco más anchas que los hombros. Baja el cuerpo manteniendo un plano recto y luego empuja hacia arriba.',
        muscleGroup: 'Pecho',
        imageUrl: 'https://example.com/img/pushup.jpg'
      },
      {
        id: 'ex-3',
        name: 'Dominadas',
        sets: 3,
        reps: 8,
        restTime: 90,
        description: 'Cuelga de una barra con los brazos extendidos. Tira de tu cuerpo hacia arriba hasta que tu barbilla esté por encima de la barra.',
        muscleGroup: 'Espalda',
        imageUrl: 'https://example.com/img/pullup.jpg'
      },
      {
        id: 'ex-4',
        name: 'Plancha',
        sets: 3,
        reps: 60, // en segundos
        restTime: 45,
        description: 'Mantén la posición de plancha con los antebrazos en el suelo, el cuerpo recto y el core activado.',
        muscleGroup: 'Core',
        imageUrl: 'https://example.com/img/plank.jpg'
      },
      {
        id: 'ex-5',
        name: 'Peso Muerto',
        sets: 4,
        reps: 10,
        restTime: 120,
        description: 'Mantén la espalda recta, dobla las rodillas ligeramente y flexiona las caderas para bajar. Levanta volviendo a la posición inicial.',
        muscleGroup: 'Espalda Baja/Piernas',
        imageUrl: 'https://example.com/img/deadlift.jpg'
      }
    ]
  },
  {
    id: 'routine-2',
    name: 'Cardio HIIT',
    description: 'Entrenamiento de intervalos de alta intensidad para quemar grasa y mejorar la capacidad cardiovascular en poco tiempo.',
    difficulty: 'Intermedio',
    category: 'Cardio',
    duration: 30,
    isOwnerCreated: true,
    exercises: [
      {
        id: 'ex-6',
        name: 'Burpees',
        sets: 4,
        reps: 15,
        restTime: 30,
        description: 'Comienza de pie, baja a posición de sentadilla, salta a posición de plancha, haz una flexión, vuelve a sentadilla y salta explosivamente.',
        muscleGroup: 'Cuerpo completo',
        imageUrl: 'https://example.com/img/burpee.jpg'
      },
      {
        id: 'ex-7',
        name: 'Mountain Climbers',
        sets: 3,
        reps: 40, // 20 por pierna
        restTime: 30,
        description: 'En posición de plancha, alterna llevando las rodillas hacia el pecho rápidamente como si estuvieras escalando.',
        muscleGroup: 'Core/Cardio',
        imageUrl: 'https://example.com/img/mt-climbers.jpg'
      },
      {
        id: 'ex-8',
        name: 'Jumping Jacks',
        sets: 3,
        reps: 50,
        restTime: 20,
        description: 'De pie con los pies juntos y los brazos a los lados, salta abriendo las piernas y elevando los brazos por encima de la cabeza.',
        muscleGroup: 'Cardio',
        imageUrl: 'https://example.com/img/jumping-jacks.jpg'
      },
      {
        id: 'ex-9',
        name: 'Saltos de Caja',
        sets: 3,
        reps: 12,
        restTime: 45,
        description: 'Párate frente a una caja o plataforma elevada. Flexiona y salta sobre la caja, aterriza suavemente y baja controladamente.',
        muscleGroup: 'Piernas/Cardio',
        imageUrl: 'https://example.com/img/box-jump.jpg'
      }
    ]
  },
  {
    id: 'routine-3',
    name: 'Core Avanzado',
    description: 'Rutina especializada para fortalecer y tonificar el núcleo abdominal y los músculos estabilizadores.',
    difficulty: 'Avanzado',
    category: 'Core',
    duration: 45,
    isOwnerCreated: true,
    exercises: [
      {
        id: 'ex-10',
        name: 'Hollow Hold',
        sets: 3,
        reps: 45, // en segundos
        restTime: 60,
        description: 'Acuéstate boca arriba, eleva los hombros y las piernas del suelo, manteniendo la parte baja de la espalda presionada contra el suelo.',
        muscleGroup: 'Core',
        imageUrl: 'https://example.com/img/hollow-hold.jpg'
      },
      {
        id: 'ex-11',
        name: 'Russian Twists',
        sets: 3,
        reps: 30, // 15 por lado
        restTime: 45,
        description: 'Siéntate con las rodillas dobladas y los pies levantados. Gira el torso de lado a lado manteniendo el core activado.',
        muscleGroup: 'Oblicuos',
        imageUrl: 'https://example.com/img/russian-twist.jpg'
      },
      {
        id: 'ex-12',
        name: 'Plancha Lateral',
        sets: 3,
        reps: 40, // 20 segundos por lado
        restTime: 30,
        description: 'Apóyate sobre un antebrazo con el cuerpo recto de lado. Mantén las caderas elevadas y el core activado.',
        muscleGroup: 'Oblicuos/Core',
        imageUrl: 'https://example.com/img/side-plank.jpg'
      },
      {
        id: 'ex-13',
        name: 'Elevaciones de Piernas',
        sets: 3,
        reps: 15,
        restTime: 60,
        description: 'Acuéstate boca arriba con las manos bajo los glúteos. Mantén las piernas rectas y eleva hasta formar un ángulo de 90 grados.',
        muscleGroup: 'Core inferior',
        imageUrl: 'https://example.com/img/leg-raises.jpg'
      },
      {
        id: 'ex-14',
        name: 'Rueda Abdominal',
        sets: 3,
        reps: 12,
        restTime: 90,
        description: 'Arrodillado, sujeta la rueda con ambas manos y rueda hacia adelante extendiendo el cuerpo, luego regresa a la posición inicial.',
        muscleGroup: 'Core completo',
        imageUrl: 'https://example.com/img/ab-wheel.jpg'
      }
    ]
  }
];

// Función para obtener todas las rutinas predefinidas
export const getOwnerRoutines = () => {
  return ownerRoutines;
};

// Función para obtener una rutina específica por ID
export const getOwnerRoutineById = (id: string) => {
  return ownerRoutines.find(routine => routine.id === id);
}; 