import { Vehicle } from './vehicle';

export const VEHICLES: Vehicle[] = [
  {
    id: 1,
    model: 'BMW M4 2019',
    price: 950000,
    type: 'Coupe',
    engine: 'V6 3.0L',
    seats: 4,
    image: 'img/bmw-m4.png',
    details: `
    Seminuevo con solo 28,500 km recorridos, en impecable estado.  
    • Motor V6 3.0L biturbo con detección de presión variable para una respuesta instantánea.  
    • Transmisión automática de 7 velocidades con Launch Control para arranques deportivos.  
    • Paquete M Sport: suspensión adaptativa, frenos de alto rendimiento y llantas de aleación ligera de 19".  
    • Interior en piel Merino con asientos deportivos calefactables y sistema de sonido Harman Kardon.  
    • Conectividad Apple CarPlay/Android Auto, control de crucero activo y asistente de estacionamiento.  
    Ideal para quien busca un coupé de altas prestaciones con bajo kilometraje y equipamiento de primer nivel.
  `,
  },
  {
    id: 2,
    model: 'Charger SRT Hellcat Last Call 2023',
    price: 1280000,
    type: 'Performance',
    engine: 'V8 6.2L Supercharged',
    seats: 4,
    image: 'img/dodge-charger.png',
    details: `
      Edición especial "Last Call" con producción limitada.
      • Motor V8 6.2L Supercharged con 717 hp y 656 lb-pie de torque.
      • Transmisión automática TorqueFlite de 8 velocidades con modo Track.
      • Frenos Brembo de alto rendimiento y suspensión adaptativa SRT.
      • Interior en cuero Laguna premium con asientos ventilados y calefactables.
      • Sistema Uconnect con pantalla táctil de 8.4", navegación, Apple CarPlay y Android Auto.
      • Modos de conducción personalizables: Street, Sport y Track para una experiencia a medida.
      Una verdadera bestia americana, ideal para quienes buscan potencia extrema y exclusividad en un sedán deportivo.
    `,
  },
  {
    id: 3,
    model: 'Audi R8 Das Finale 2023',
    price: 7500000,
    type: 'Performance',
    engine: 'V10 5.2L',
    seats: 2,
    image: 'img/audi-r8.png',
    details: `
      Última edición del icónico superdeportivo R8.
      • Motor V10 5.2L atmosférico con 602 hp y tracción quattro.
      • Transmisión S tronic de 7 velocidades con Launch Control.
      • Paquete exterior en fibra de carbono y rines de 20".
      • Interior en Alcántara y cuero Nappa con acabados en carbono.
      • Sistema de sonido Bang & Olufsen y Audi Virtual Cockpit.
      Una despedida legendaria, ideal para coleccionistas y amantes de los motores puristas.
    `,
  },
  {
    id: 4,
    model: 'Porsche GT4 RS 2023',
    price: 4600000,
    type: 'Performance',
    engine: 'V6 4.0L',
    seats: 2,
    image: 'img/gt4-rs.png',
    details: `
      La versión más radical del Cayman jamás creada.
      • Motor atmosférico 4.0L derivado del 911 GT3 con 500 hp.
      • Transmisión PDK de 7 velocidades con cambios ultrarrápidos.
      • Aerodinámica optimizada: difusor trasero y alerón RS.
      • Interior aligerado con acabados en fibra de carbono.
      • Sistema Porsche Communication Management (PCM) con Apple CarPlay.
      Para quienes buscan una conexión pura entre máquina y conductor en circuito y calle.
    `,
  },
  {
    id: 5,
    model: 'BMW X5 M 2023',
    price: 1750000,
    type: 'SUV',
    engine: 'V8 4.4L',
    seats: 5,
    image: 'img/bmw-x5.png',
    details: `
      El SUV de alto desempeño que domina cualquier terreno.
      • Motor V8 4.4L TwinPower Turbo con 600 hp.
      • Tracción integral xDrive y suspensión adaptativa M.
      • Interior en cuero Merino con asientos deportivos.
      • Sistema de sonido Bowers & Wilkins Diamond Surround.
      • Pantalla curva BMW con iDrive 8 y navegación avanzada.
      Ideal para quienes buscan lujo, potencia y practicidad en un solo vehículo.
    `,
  },
  {
    id: 6,
    model: 'Ford F-150 Raptor R 2024',
    price: 2950000,
    type: 'Performance',
    engine: 'V8 5.2L',
    seats: 5,
    image: 'img/ford-raptor.png',
    details: `
      La pickup más salvaje jamás creada por Ford.
      • Motor V8 5.2L Supercharged de 700 hp.
      • Suspensión FOX Live Valve para desempeño off-road extremo.
      • Interior en cuero Recaro y fibra de carbono.
      • Sistema SYNC 4 con pantalla táctil de 12" y navegación integrada.
      • Modos de manejo Baja, Rock Crawl y más.
      Para los aventureros que exigen potencia sin límites dentro y fuera del camino.
    `,
  },
  {
    id: 7,
    model: 'Toyota Tacoma 3.5 TRD Sport 2022',
    price: 725000,
    type: 'Pickup',
    engine: 'V6 3.5L',
    seats: 5,
    image: 'img/toyota-tacoma.png',
    details: `
      La pickup confiable y lista para cualquier aventura.
      • Motor V6 3.5L con transmisión automática de 6 velocidades.
      • Suspensión deportiva TRD para mayor control y comodidad.
      • Interior resistente con sistema de infoentretenimiento con Apple CarPlay/Android Auto.
      • Sistema Crawl Control para manejo en terrenos difíciles.
      Robusta, capaz y preparada para cualquier desafío, en ciudad o naturaleza.
    `,
  },
  {
    id: 8,
    model: 'Ford Mustang Dark Horse 2024',
    price: 1345000,
    type: 'Coupe',
    engine: 'V8 5.0L',
    seats: 4,
    image: 'img/ford-mustang.png',
    details: `
      La nueva era del Mustang con el alma de un muscle car.
      • Motor V8 5.0L Coyote mejorado de 500 hp.
      • Transmisión Tremec manual de 6 velocidades o automática de 10.
      • Suspensión MagneRide adaptativa para máxima precisión.
      • Interior en cuero con detalles exclusivos Dark Horse.
      • Pantalla táctil de 13.2" con SYNC 4 y modos de pista configurables.
      Potencia bruta y tecnología de vanguardia en el coupé más emblemático de Ford.
    `,
  },
  {
    id: 9,
    model: 'Dodge Ram Longhorn 2022',
    price: 1045000,
    type: 'Pickup',
    engine: 'V8 5.7L',
    seats: 5,
    image: 'img/dodge-ram.png',
    details: `
      Lujo americano y capacidad sin igual en una pickup.
      • Motor V8 HEMI 5.7L con eTorque Mild Hybrid.
      • Asientos de cuero premium ventilados y calefactables.
      • Pantalla táctil de 12" con navegación y compatibilidad Apple CarPlay/Android Auto.
      • Suspensión neumática adaptable en las cuatro ruedas.
      La combinación perfecta de trabajo rudo y confort superior.
    `,
  },
  {
    id: 10,
    model: 'Jeep Grand Cherokee SRT-8 2019',
    price: 1025000,
    type: 'SUV',
    engine: 'V8 6.4L',
    seats: 5,
    image: 'img/jeep-GRSRT.png',
    details: `
      El SUV que combina lujo, potencia y carácter off-road.
      • Motor V8 6.4L HEMI con 475 hp.
      • Sistema de tracción 4WD Quadra-Trac con control Selec-Track.
      • Interior de lujo con acabados en fibra de carbono y asientos de cuero Nappa.
      • Sistema Uconnect con pantalla de 8.4" y audio premium.
      Ideal para quienes buscan un SUV agresivo con ADN de pista.
    `,
  },
  {
    id: 11,
    model: 'Cadillac Escalade V Series 2025',
    price: 3625000,
    type: 'SUV',
    engine: 'V8 6.2L',
    seats: 6,
    image: 'img/cadillac-escalade.png',
    details: `
      El SUV de lujo más potente y tecnológico del mercado.
      • Motor V8 Supercharged 6.2L de 682 hp.
      • Sistema de sonido AKG Studio Reference con 36 bocinas.
      • Pantalla OLED curva de 38 pulgadas y Super Cruise (conducción autónoma).
      • Suspensión adaptativa Magnetic Ride Control y Air Ride.
      Para quienes buscan lo último en lujo americano y desempeño brutal.
    `,
  },
  {
    id: 12,
    model: 'Chevrolet Cheyenne High Country 2023',
    price: 1099000,
    type: 'Pickup',
    engine: 'V8 6.2L',
    seats: 5,
    image: 'img/chevrolet-cheyenne.png',
    details: `
      La pickup más lujosa de Chevrolet, pensada para el trabajo y el confort.
      • Motor V8 6.2L Ecotec3 con 420 hp y 460 lb-pie de torque.
      • Tracción 4x4 con caja automática de 10 velocidades.
      • Interior en cuero perforado con detalles en madera auténtica.
      • Sistema de infoentretenimiento Chevrolet con pantalla de 13.4" y OnStar.
      Potencia, lujo y tecnología al máximo nivel para conquistar cualquier terreno.
    `,
  },
  {
    id: 13,
    model: 'Chevrolet Camaro SS 2022',
    price: 815000,
    type: 'Coupe',
    engine: 'V8 6.2L',
    seats: 4,
    image: 'img/chevrolet-camaro.png',
    details: `
      El muscle car icónico, mezcla de rendimiento y diseño agresivo.
      • Motor V8 6.2L con 455 hp, aceleración de 0 a 100 km/h en 4 segundos.
      • Transmisión manual de 6 velocidades o automática de 10.
      • Suspensión deportiva y frenos Brembo para máxima precisión en pista.
      • Interior con asientos en cuero y tecnología avanzada de infoentretenimiento.
      El Camaro SS es pura emoción para los amantes de la potencia y la velocidad.
    `,
  },
  {
    id: 14,
    model: 'Chevrolet Tahoe Z71 2023',
    price: 1530000,
    type: 'SUV',
    engine: 'V8 6.2L',
    seats: 6,
    image: 'img/chevrolet-tahoe.png',
    details: `
      SUV de lujo con capacidad todoterreno y tecnología avanzada.
      • Motor V8 6.2L Ecotec3 con 420 hp y 460 lb-pie de torque.
      • Sistema 4x4 y suspensión adaptativa Z71 para un manejo cómodo en todo terreno.
      • Interior espacioso con asientos de cuero y sistema de sonido premium.
      • Pantalla táctil de 10.2" con navegación, Apple CarPlay y Android Auto.
      El Tahoe Z71 ofrece lujo, potencia y versatilidad para aventuras y viajes largos.
    `,
  },

  {
    id: 15,
    model: 'Jeep Gladiator Mojave 2021',
    price: 1134000,
    type: 'Pickup',
    engine: 'V6 3.6L',
    seats: 5,
    image: 'img/jeep-gladiator.png',
    details: `
        Pickup diseñada para el trabajo rudo y las aventuras en terrenos difíciles.
        • Motor V6 3.6L con 285 hp y 260 lb-pie de torque.
        • Tracción 4x4 y suspensión mejorada para un manejo todo terreno.
        • Diseño exterior robusto con llantas todoterreno y parrilla exclusiva Mojave.
        • Interior con asientos de tela, sistema de infoentretenimiento Uconnect y pantalla táctil.
        La Gladiator Mojave combina potencia y durabilidad para enfrentar cualquier reto fuera de la carretera.
      `,
  },
  {
    id: 16,
    model: 'Porsche 911 GT3 RS (991) 2019',
    price: 5200000,
    type: 'Performance',
    engine: 'V6 4.0L',
    seats: 2,
    image: 'img/gt3-rs.png',
    details: `
        El Porsche 911 GT3 RS es el rendimiento llevado al extremo.
        • Motor V6 4.0L de aspiración natural con 520 hp y 470 lb-pie de torque.
        • Tracción trasera y caja de cambios PDK para una conducción rápida y precisa.
        • Suspensión adaptativa y frenos cerámicos para un manejo superior en circuito.
        • Interior con asientos de carreras y acabados en fibra de carbono.
        Un superdeportivo que combina tecnología, diseño y una aceleración brutal.
      `,
  },
  {
    id: 17,
    model: 'Dodge RAM TRX 2022',
    price: 2450000,
    type: 'Performance',
    engine: 'V8 6.2L',
    seats: 5,
    image: 'img/ram-trx.png',
    details: `
        La RAM TRX es una pickup todoterreno diseñada para los más exigentes.
        • Motor V8 6.2L con 702 hp y 650 lb-pie de torque.
        • Sistema 4x4 con suspensión ajustable para máxima capacidad off-road.
        • Diseño agresivo con parrilla única y llantas todoterreno.
        • Interior con asientos en cuero, pantalla táctil de 12 pulgadas y sistema de sonido premium.
        La TRX es una máquina de rendimiento para aquellos que buscan adrenalina y aventura.
      `,
  },
  {
    id: 18,
    model: 'Ford Bronco Raptor 2024',
    price: 2050000,
    type: 'Performance',
    engine: 'V6 3.0L',
    seats: 5,
    image: 'img/ford-broncoR.png',
    details: `
        El Ford Bronco Raptor es el rey de la aventura todoterreno.
        • Motor V6 3.0L EcoBoost con 418 hp y 440 lb-pie de torque.
        • Suspensión mejorada y modo todoterreno para enfrentar los terrenos más difíciles.
        • Llanta de gran tamaño y carrocería robusta para una mayor estabilidad.
        • Interior con asientos Recaro y tecnología avanzada de infoentretenimiento.
        El Bronco Raptor ofrece potencia, resistencia y capacidad para todo tipo de aventura.
      `,
  },
  {
    id: 19,
    model: 'Chevrolet Cheyenne ZR2 Bison 2024',
    price: 1550000,
    type: 'Performance',
    engine: 'V8 6.2L',
    seats: 5,
    image: 'img/chevrolet-bison.png',
    details: `
        La Chevrolet Cheyenne ZR2 Bison es la pickup más robusta para el trabajo y la aventura.
        • Motor V8 6.2L con 420 hp y 460 lb-pie de torque.
        • Sistema 4x4 y suspensión mejorada para terrenos difíciles.
        • Diseño exclusivo con detalles en acero inoxidable y parrilla de estilo Bison.
        • Interior con asientos de cuero y tecnología avanzada de infoentretenimiento.
        Potente y resistente, la Cheyenne ZR2 Bison es perfecta para quien busca un vehículo con capacidad extrema.
      `,
  },
  {
    id: 20,
    model: 'Ford Shelby F-150 Off-Road 2021',
    price: 3580000,
    type: 'Performance',
    engine: 'V8 5.0L',
    seats: 5,
    image: 'img/shelby-f150.png',
    details: `
        La Ford Shelby F-150 Off-Road es una pickup de alto rendimiento con estilo y potencia.
        • Motor V8 5.0L con 450 hp y 510 lb-pie de torque.
        • Suspensión deportiva y tracción integral para un manejo excepcional fuera de la carretera.
        • Edicion Shelby con detalles en fibra de carbono y llantas todoterreno.
        • Interior de lujo con asientos de cuero y tecnología avanzada de infoentretenimiento.
        La Shelby F-150 Off-Road combina capacidad, lujo y rendimiento en un solo paquete.
      `,
  },
  {
    id: 21,
    model: 'Ford Shelby Mustang GT500 Super Snake 2024',
    price: 5290000,
    type: 'Performance',
    engine: 'V8 5.0L',
    seats: 2,
    image: 'img/shelby-mustang.png',
    details: `
      El Ford Shelby Mustang GT500 Super Snake 2024 es una máquina de alto rendimiento diseñada para los amantes de la velocidad.
      • Motor V8 5.0L con 800 hp y 630 lb-pie de torque.
      • Transmisión manual de 7 velocidades y tracción trasera para una experiencia de conducción única.
      • Suspensión deportiva ajustable y frenos de alto rendimiento.
      • Diseño aerodinámico con detalles exclusivos de Shelby, incluyendo un capó de fibra de carbono.
      Con un diseño agresivo y un motor potente, este Mustang es para quienes buscan adrenalina al volante.
    `,
  },
  {
    id: 22,
    model: 'Ford Shelby F-150 Super Snake 2022',
    price: 3990000,
    type: 'Performance',
    engine: 'V8 5.0L',
    seats: 3,
    image: 'img/shelby-supersnake.png',
    details: `
     La Ford Shelby F-150 Super Snake 2022 es una pickup de alto rendimiento para quienes buscan potencia y estilo.
      • Motor V8 5.0L con 770 hp y 625 lb-pie de torque.
      • Suspensión ajustada para una conducción deportiva y controlada.
      • Diseño Shelby con detalles en fibra de carbono, llantas todoterreno y parrilla exclusiva.
      • Interior con asientos de cuero, tecnología avanzada y pantalla táctil de 12 pulgadas.
      Una pickup que combina el lujo, el rendimiento y la versatilidad.
    `,
  },
  {
    id: 23,
    model: 'Aston Martin Vantage 2019',
    price: 4190000,
    type: 'Performance',
    engine: 'V8 4.0L',
    seats: 2,
    image: 'img/astonmartin-vantage.png',
    details: `
      El Aston Martin Vantage 2019 es un deportivo de lujo que destaca por su elegancia y rendimiento.
      • Motor V8 4.0L con 503 hp y 505 lb-pie de torque.
      • Caja de cambios automática de 8 velocidades y tracción trasera para una conducción precisa.
      • Suspensión deportiva y frenos cerámicos para un manejo excepcional.
      • Interior de lujo con asientos de cuero y detalles en aluminio y carbono.
      Un superdeportivo que combina lujo, tecnología y un rendimiento impresionante en cada curva.
    `,
  },
  {
    id: 24,
    model: 'GMC Canyon AT4 2023',
    price: 1090000,
    type: 'Pickup',
    engine: 'L4 2.7L',
    seats: 5,
    image: 'img/gmc-canyon.png',
    details: `
     La GMC Canyon AT4 2023 es una pickup robusta diseñada para el trabajo pesado y la aventura al aire libre.
      • Motor 4C en linea 2.7L con 310 hp y 420 lb-pie de torque.
      • Tracción 4x4 y suspensión mejorada para enfrentar terrenos difíciles.
      • Diseño exterior robusto con detalles exclusivos de la versión AT4.
      • Interior con asientos de cuero, sistema de infoentretenimiento de 8 pulgadas y conectividad avanzada.
      Potente, resistente y lista para llevarte a cualquier destino.
    `,
  },
  {
    id: 25,
    model: 'Range Rover Velar Dynamic 2019',
    price: 819000,
    type: 'SUV',
    engine: 'L4 2.0L',
    seats: 5,
    image: 'img/rangerover-velar.png',
    details: `
      El Range Rover Velar Dynamic 2019 es un SUV de lujo con un diseño elegante y alto rendimiento.
      • Motor 4C linea 2.0L con 247 hp y 269 lb-pie de torque.
      • Tracción integral y suspensión neumática para un manejo cómodo y eficiente.
      • Interior con asientos de cuero, sistema de infoentretenimiento con pantalla táctil de 10 pulgadas.
      • Diseño exterior sofisticado con detalles en aluminio y cristales tintados.
      Un SUV que combina lujo, tecnología y un rendimiento excepcional en cualquier terreno.
    `,
  },
  {
    id: 26,
    model: 'BMW M4 2021',
    price: 1420000,
    type: 'Coupe',
    engine: 'L6 3.0L',
    seats: 4,
    image: 'img/bmw-m42021.png',
    details: `
      Deportivo de alto rendimiento con diseño agresivo y tecnología de punta.
      • Motor L6 3.0L TwinPower Turbo con 510 hp y 650 Nm de torque.
      • Aceleración de 0 a 100 km/h en solo 3.5 segundos.
      • Transmisión automática M Steptronic de 8 velocidades y tracción M xDrive.
      • Interior enfocado al conductor con acabados premium y pantalla curva BMW Live Cockpit.
      Potencia alemana con precisión milimétrica en cada curva.
    `,
  },
  {
    id: 27,
    model: 'Audi RS5 Coupe 2018',
    price: 1690000,
    type: 'Coupe',
    engine: 'V6 2.9L',
    seats: 4,
    image: 'img/audi-rs5.png',
    details: `
      Elegancia deportiva con corazón biturbo y tracción quattro.
    • Motor V6 2.9L TFSI biturbo con 450 hp y 600 Nm de torque.
    • Aceleración de 0 a 100 km/h en 3.9 segundos.
    • Tracción integral quattro y transmisión Tiptronic de 8 velocidades.
    • Cabina refinada con asientos deportivos RS y pantalla MMI con navegación.
    Deportividad y lujo unidos en un solo coupé.
    `,
  },
  {
    id: 28,
    model: 'Porsche 911 Carrera 4S 2021',
    price: 2890000,
    type: 'Coupe',
    engine: 'B6 3.0L',
    seats: 4,
    image: 'img/porsche-911.png',
    details: `
      Ícono automotriz con ingeniería precisa y estilo inconfundible.
    • Motor bóxer 6 cilindros 3.0L twin-turbo con 450 hp y 530 Nm de torque.
    • Tracción total y transmisión PDK de doble embrague con 8 velocidades.
    • Aceleración de 0 a 100 km/h en 3.6 segundos.
    • Interior de lujo con instrumentación digital y pantalla táctil de 10.9”.
    Tradición y tecnología unidas en cada detalle.
    `,
  },
  {
    id: 29,
    model: 'Dodge Challenger GT 2022',
    price: 755000,
    type: 'Coupe',
    engine: 'V6 3.6L',
    seats: 4,
    image: 'img/dodge-challenger.png',
    details: `
      Muscle car americano con carácter y presencia única.
    • Motor V6 3.6L Pentastar con 305 hp y 268 lb-pie de torque.
    • Transmisión automática TorqueFlite de 8 velocidades.
    • Tracción trasera con suspensión deportiva de alto desempeño.
    • Cabina retro-moderna con pantalla Uconnect de 8.4” y compatibilidad con Android Auto y Apple CarPlay.
    Estilo clásico con tecnología actual para el día a día.
    `,
  },
  {
    id: 30,
    model: 'Toyota Sequoia Platinum 2025',
    price: 1752000,
    type: 'SUV',
    engine: 'V6 3.5L',
    seats: 6,
    image: 'img/toyota-sequoia.png',
    details: `
      SUV robusta y lujosa diseñada para la aventura y el confort familiar.
    • Motor V6 3.5L híbrido con 437 hp y 583 lb-pie de torque.
    • Tracción 4x4 y suspensión adaptativa con modos de manejo.
    • Interior premium con tres filas de asientos y pantalla multimedia de 14”.
    • Seguridad Toyota Safety Sense 2.5+ y asistencias avanzadas.
    Potencia híbrida, espacio amplio y equipamiento de alto nivel.
    `,
  },
  {
    id: 31,
    model: 'Toyota Tundra TRD Pro 2025',
    price: 1850000,
    type: 'Pickup',
    engine: 'V6 3.4L',
    seats: 5,
    image: 'img/toyota-tundra.png',
    details: `
       Pickup todoterreno preparada para cualquier desafío con tecnología híbrida.
    • Motor V6 3.4L híbrido con 437 hp y 583 lb-pie de torque.
    • Tracción 4x4, suspensión FOX y paquete TRD Pro para off-road extremo.
    • Cabina espaciosa con pantalla de 14” y sistema JBL Premium.
    • Diseño imponente con parrilla negra y detalles en rojo TRD.
    Potencia, eficiencia y resistencia en una sola pickup.
    `,
  },
  {
    id: 32,
    model: 'Chevrolet Corvette Stingray Z51 2015',
    price: 830000,
    type: 'Coupe',
    engine: 'V8 6.2L',
    seats: 2,
    image: 'img/chevrolet-corvette.png',
    details: `
      El legendario deportivo americano con alma de pista y espíritu salvaje.
    • Motor V8 6.2L con 460 hp y escape de alto desempeño.
    • Transmisión automática de 8 velocidades con modo manual.
    • Interior con acabados en fibra de carbono y piel premium.
    • Sistema de infoentretenimiento con pantalla táctil de 8” y Bose Performance.
    Un ícono de potencia, diseño agresivo y tecnología para disfrutar cada curva.
    `,
  },
  {
    id: 33,
    model: 'Ford Lobo Platinum Plus 2024',
    price: 1630000,
    type: 'Pickup',
    engine: 'V6 3.5L',
    seats: 5,
    image: 'img/ford-f150.png',
    details: `
      La pickup de lujo de Ford que combina poder y confort sin compromisos.
    • Motor V6 3.5L EcoBoost con 400 hp y gran eficiencia.
    • Tracción 4x4 con modos de manejo para todo terreno.
    • Asientos de piel calefactables y ventilados, con masaje.
    • Pantalla táctil de 12” con SYNC 4 y audio B&O de 18 bocinas.
    Capaz, elegante y con lo mejor en tecnología para dominar cualquier camino.
    `,
  },
  {
    id: 34,
    model: 'Ford F-250 Super Duty Limited Diesel 2023',
    price: 1950000,
    type: 'Pickup',
    engine: 'V8 6.7L',
    seats: 5,
    image: 'img/ford-f250.png',
    details: `
     La bestia del trabajo pesado con lujo y capacidad sin igual.
    • Motor Power Stroke V8 6.7L Turbo Diesel con 475 hp y 1050 lb-pie de torque.
    • Capacidad de remolque superior con asistencias electrónicas.
    • Cabina espaciosa con interiores de piel y techo panorámico.
    • Pantalla de 12” con SYNC 4, navegación y audio premium.
    Hecha para arrastrar, cargar y conquistar lo más extremo con total comodidad.
    `,
  },
  {
    id: 35,
    model: 'Ford Ranger Raptor 2024',
    price: 1150000,
    type: 'Pickup',
    engine: 'V6 3.0L',
    seats: 5,
    image: 'img/ford-ranger.png',
    details: `
      La pickup mediana más salvaje de Ford, diseñado para adrenalina pura.
    • Motor V6 3.0L Twin-Turbo con 392 hp y suspensión FOX.
    • Tracción 4x4 con bloqueo de diferencial y modos off-road.
    • Interior deportivo con asientos Raptor en piel y costuras rojas.
    • Pantalla de 12” con SYNC 4A y clúster digital de 12.4”.
    Una máquina lista para saltar, correr y conquistar cualquier terreno sin límites.
    `,
  },
  {
    id: 36,
    model: 'Chevrolet Colorado ZR2 2025',
    price: 1220000,
    type: 'Pickup',
    engine: 'L4 2.7L',
    seats: 5,
    image: 'img/chevrolet-colorado.png',
    details: `
      La pickup mediana de Chevrolet pensada para aventura extrema.
    • Motor Turbo 4 cilindros 2.7L con 310 hp y gran respuesta.
    • Suspensión Multimatic DSSV con capacidad off-road real.
    • Cabina ruda con toques deportivos y acabados resistentes.
    • Pantalla de 11.3” con sistema Google integrado y cámara 360°.
    Lista para cruzar montañas, ríos y desiertos con agilidad y poder.
    `,
  },
  {
    id: 37,
    model: 'Bentley Bentayga Edicion 100 2020',
    price: 4220000,
    type: 'SUV',
    engine: 'V8 4.0L',
    seats: 5,
    image: 'img/bentley-bentayga.png',
    details: `
      Una SUV de ultra lujo que combina elegancia británica con rendimiento deportivo.
    • Motor V8 4.0L Twin-Turbo con 542 hp y aceleración brutal.
    • Interior artesanal con cuero cosido a mano, madera noble y acabados metálicos.
    • Suspensión adaptativa y tracción total inteligente para máxima comodidad.
    • Pantallas táctiles duales, audio Naim de 20 bocinas y conectividad total.
    Pura distinción sobre ruedas. Para quienes exigen lo mejor en cada detalle.
    `,
  },
  {
    id: 38,
    model: 'Bentley Continental GT 2023',
    price: 9420000,
    type: 'Coupe',
    engine: 'W12 6.0L',
    seats: 5,
    image: 'img/bentley-continental.png',
    details: `
      El gran turismo definitivo que combina potencia, clase y confort extremo.
    • Motor W12 6.0L con 626 hp para un manejo suave pero feroz.
    • Interior con acabados artesanales: cuero de grano fino, madera pulida y detalles en aluminio.
    • Tracción total activa y suspensión neumática para un control perfecto.
    • Sistema de infoentretenimiento de lujo con sonido Bang & Olufsen.
    Diseñado para quienes disfrutan el lujo sin comprometer la emoción al volante.
    `,
  },
  {
    id: 39,
    model: 'BMW X6 M Competition 2023',
    price: 2500000,
    type: 'SUV',
    engine: 'V8 4.4L',
    seats: 5,
    image: 'img/bmw-x6.png',
    details: `
      Una SUV de alto desempeño que combina deportividad extrema con elegancia alemana.
    • Motor V8 4.4L Twin-Turbo con 617 hp y tracción integral M xDrive.
    • Aceleración de 0 a 100 km/h en solo 3.8 segundos.
    • Interior con acabados premium, asientos deportivos M y panel digital envolvente.
    • Sistema de sonido Harman Kardon y pantalla curva BMW Live Cockpit.
    Ideal para quienes buscan adrenalina, tecnología y presencia imponente en un solo vehículo.
    `,
  },
  {
    id: 40,
    model: 'Land Rover Defender 130 X 400PS 2024',
    price: 2500000,
    type: 'SUV',
    engine: 'V6 3.0L',
    seats: 8,
    image: 'img/landrover-defender.webp',
    details: `
      Un SUV robusto y elegante, diseñado para dominar cualquier terreno con estilo.
    • Motor V6 3.0L con 400 hp y tecnología mild-hybrid para un rendimiento excepcional.
    • Capacidad para 8 pasajeros y un interior espacioso con materiales de alta calidad.
    • Suspensión neumática ajustable y tracción integral permanente para una conducción imbatible.
    • Sistema de infoentretenimiento Touch Pro y audio Meridian para una experiencia premium.
    Ideal para quienes buscan aventuras extremas sin sacrificar el confort y la tecnología.
    `,
  },
  {
    id: 41,
    model: 'Mercedes Benz AMG GT S 2015',
    price: 1990000,
    type: 'Coupe',
    engine: 'V8 4.0L',
    seats: 2,
    image: 'img/mercedes-amggt.webp',
    details: `
      Un deportivo alemán que combina ingeniería de precisión con un diseño agresivo.
    • Motor V8 4.0L Biturbo con 503 hp y una aceleración de 0 a 100 km/h en 3.8 segundos.
    • Tracción trasera con transmisión de doble embrague para una conducción intensa y precisa.
    • Interior minimalista de alto rendimiento con acabados en fibra de carbono y piel Nappa.
    • Sistema de infoentretenimiento COMAND con audio premium Burmester.
    Una obra maestra de la velocidad y la elegancia, hecha para disfrutar cada curva.
    `,
  },
];
