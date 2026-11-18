import type { AppLocale } from "@/i18n/routing";

/**
 * Contenido de la sección "Sectores donde más aplica" de cada solución: para cada pareja
 * solución × sector, la problemática típica del sector, la solución que ofrece DTA (puntos
 * principales, enfocados en control y autonomía del cliente) y un ejemplo práctico.
 *
 * Los ejemplos son ILUSTRATIVOS: describen cómo se resuelve este tipo de problema, no son
 * proyectos reales de clientes y por eso no incluyen cifras ni nombres. La interfaz los rotula
 * como "Ejemplo ilustrativo". Cuando existan casos reales documentados con permiso del cliente,
 * pueden reemplazarse aquí.
 *
 * Clave: `${slugSolución}:${slugSector}`.
 */
export type SectorCase = {
  problem: string;
  /** Puntos principales de la solución (3 a 4). */
  solution: string[];
  example: string;
};

const es: Record<string, SectorCase> = {
  "sistemas-empresariales:turismo": {
    problem:
      "Las reservas, los pagos y la atención llegan por OTAs, WhatsApp y el sitio propio, y cada canal tiene su propio registro. El equipo pasa el día copiando datos de un lugar a otro.",
    solution: [
      "Un sistema central de reservas donde converge cada canal",
      "Registro único de cada cliente, con su historial de reservas y pagos",
      "Roles y permisos: cada persona ve y edita solo lo que le corresponde",
      "Tu equipo ajusta tarifas y cupos sin depender de un proveedor",
    ],
    example:
      "Una operadora de tours reunió las reservas de sus tres canales en un solo panel. Recepción dejó de preguntar «¿esta ya está confirmada?» porque el estado de cada reserva se ve en el mismo lugar, y el dueño ajusta cupos por temporada sin pedir ayuda.",
  },
  "sistemas-empresariales:inmobiliario": {
    problem:
      "Cada asesor lleva su propio Excel de prospectos y los expedientes viven en carpetas y correos. Si alguien se va, se lleva su cartera.",
    solution: [
      "CRM inmobiliario con prospectos, propiedades y seguimiento en un solo lugar",
      "Asignación y recordatorios para que ningún prospecto se quede sin respuesta",
      "Expedientes digitales por propiedad, con los documentos ordenados",
      "Visibilidad para la dirección: quién atiende qué y en qué etapa va",
    ],
    example:
      "Una desarrolladora migró las listas de sus asesores a un CRM compartido. La dirección ve el embudo completo y, cuando un asesor cambia de proyecto, su cartera se reasigna en minutos en lugar de perderse.",
  },
  "sistemas-empresariales:servicios": {
    problem:
      "Las cotizaciones se arman desde cero, la agenda se coordina por chat y la facturación vive aparte. Nadie ve el cuadro completo de cada cliente.",
    solution: [
      "CRM y agenda de servicios en un mismo sistema",
      "Plantillas de cotización con control de versiones",
      "Facturación conectada al seguimiento del cliente",
      "Alertas de renovación para actuar antes de perder cuentas",
    ],
    example:
      "Una empresa de mantenimiento reemplazó hojas de cálculo y chats por un sistema único. La cotización sale de una plantilla, la visita se agenda sin empalmes y la factura se genera desde el mismo servicio, así que administración deja de reconstruir lo que pasó.",
  },

  "integracion-de-sistemas:turismo": {
    problem:
      "La disponibilidad cambia en una OTA y tarda horas en reflejarse en las demás, con riesgo de sobreventa. Alguien concilia a mano entre canales.",
    solution: [
      "Conectores entre OTAs, sitio propio y sistema interno",
      "Disponibilidad y tarifas sincronizadas automáticamente",
      "Alertas cuando un canal falla o se desfasa",
      "Un solo punto de control para toda la distribución",
    ],
    example:
      "Una operadora conectó su sitio y dos OTAs a su inventario central. Cuando se vende un lugar en un canal, se descuenta en los demás en segundos, y el equipo deja de revisar canal por canal cada mañana.",
  },
  "integracion-de-sistemas:hoteleria": {
    problem:
      "El channel manager y el PMS no se hablan bien: tarifas y disponibilidad se corrigen a mano y los errores se descubren cuando ya hay un huésped.",
    solution: [
      "Sincronización entre PMS, channel manager y motor de reservas",
      "Reglas de tarifas y cierres que se aplican solas",
      "Registro de cada cambio, para saber qué pasó y cuándo",
      "Menos tareas manuales para recepción y revenue",
    ],
    example:
      "Un hotel boutique conectó su PMS con su channel manager y su motor de reservas. Un cambio de tarifa se publica una sola vez y llega a todos los canales; recepción deja de duplicar capturas y los desfases se detectan antes de afectar una reserva.",
  },
  "integracion-de-sistemas:servicios": {
    problem:
      "El CRM, la agenda y la facturación son herramientas separadas: el mismo dato se captura dos o tres veces y las versiones no coinciden.",
    solution: [
      "APIs y conectores entre CRM, agenda, facturación y correo",
      "Una sola captura que alimenta todos los sistemas",
      "Reglas que mueven la información entre herramientas sin intervención",
      "Trazabilidad de qué dato viene de dónde",
    ],
    example:
      "Una empresa de servicios profesionales conectó su CRM con facturación. Al cerrar un servicio, los datos del cliente pasan solos a la factura; administración deja de recapturar y los reportes ya no se contradicen.",
  },

  "business-intelligence:servicios": {
    problem:
      "La información existe, pero está repartida. Saber qué clientes están por renovar o en riesgo obliga a armar reportes a mano.",
    solution: [
      "Dashboard ejecutivo con renovaciones, retención y desempeño por cliente",
      "Indicadores que se actualizan solos desde tus sistemas",
      "Alertas cuando un indicador se sale de rango",
      "Reportes listos para la reunión, sin armarlos cada semana",
    ],
    example:
      "Una firma de servicios sustituyó su reporte semanal en Excel por un tablero conectado a su CRM. La dirección lo abre el lunes, ve qué contratos vencen este mes y decide a quién llamar primero.",
  },
  "business-intelligence:inmobiliario": {
    problem:
      "No se sabe qué canal realmente cierra ventas: portales, redes y referidos se miden por intuición, y el presupuesto se reparte a ciegas.",
    solution: [
      "Origen de cada prospecto conectado hasta la venta cerrada",
      "Tablero de conversión por canal y por asesor",
      "Tiempos de respuesta y de cierre por etapa",
      "Decisiones de inversión respaldadas por tus propios datos",
    ],
    example:
      "Una inmobiliaria conectó sus portales y su CRM a un tablero comercial. Identificó qué fuente generaba más visitas agendadas, movió presupuesto hacia ella y dejó de decidir por opiniones.",
  },
  "business-intelligence:hoteleria": {
    problem:
      "Las tarifas se deciden por intuición, sin ver con claridad la ocupación ni el histórico por temporada.",
    solution: [
      "Dashboard de ocupación, tarifa promedio y RevPAR",
      "Comparativos por temporada y por canal",
      "Proyecciones simples basadas en tu propio histórico",
      "Alertas ante ocupación baja o tarifas desfasadas",
    ],
    example:
      "Un hotel reunió los datos de su PMS y de sus canales en un tablero. Antes de fijar las tarifas de temporada alta, el gerente compara cómo se comportó cada semana el año anterior y ajusta con información, no a ojo.",
  },

  "inteligencia-artificial:turismo": {
    problem:
      "Los mismos mensajes llegan todo el día: disponibilidad, precios, cómo llegar. Fuera de horario nadie responde y se pierde la reserva.",
    solution: [
      "Agente de IA que responde preguntas frecuentes con tu tono",
      "Captura automática de los datos de la reserva por chat",
      "Escalamiento a una persona cuando el caso lo requiere",
      "Confirmaciones y recordatorios automáticos",
    ],
    example:
      "Una operadora de tours automatizó las respuestas a preguntas repetidas y los recordatorios previos al tour. El equipo se dedica a los casos que piden criterio, y quien escribe de noche recibe respuesta en lugar de esperar a la mañana.",
  },
  "inteligencia-artificial:inmobiliario": {
    problem:
      "Los prospectos llegan por muchos canales y se enfrían mientras alguien los revisa. Calificarlos a mano consume horas del equipo comercial.",
    solution: [
      "Respuesta inmediata y calificación automática de cada prospecto",
      "Asignación al asesor correcto según perfil y zona",
      "Seguimiento programado hasta agendar la visita",
      "Resumen de cada conversación dentro del CRM",
    ],
    example:
      "Una desarrolladora puso un asistente que contesta de inmediato, pregunta presupuesto y zona de interés, y agenda visitas con el asesor indicado. Los asesores llegan a cada llamada con el contexto ya resumido.",
  },
  "inteligencia-artificial:servicios": {
    problem:
      "Las cotizaciones, los recordatorios y el seguimiento a clientes se hacen a mano y se postergan cuando hay carga de trabajo.",
    solution: [
      "Borradores de cotización generados a partir de la solicitud",
      "Recordatorios de citas, pagos y renovaciones automáticos",
      "Clasificación y respuesta de correos y mensajes habituales",
      "Revisión humana antes de lo importante",
    ],
    example:
      "Una empresa de servicios automatizó las cotizaciones estándar y los recordatorios de renovación. El equipo revisa y aprueba en lugar de redactar desde cero, y los seguimientos dejan de depender de la memoria de alguien.",
  },

  "desarrollo-digital:turismo": {
    problem:
      "El sitio no vende por sí solo: reservar es confuso, no está pensado para móvil y las consultas terminan en WhatsApp.",
    solution: [
      "Sitio rápido y claro, pensado primero para móvil",
      "Reserva y pago en línea integrados a tu sistema",
      "Páginas por experiencia y destino, listas para posicionar",
      "Contenido que tu equipo puede actualizar sin programar",
    ],
    example:
      "Una operadora rediseñó su sitio con reserva en línea conectada a su inventario. El visitante elige fecha y paga en pocos pasos, y el equipo recibe reservas ya registradas en lugar de mensajes sueltos.",
  },
  "desarrollo-digital:inmobiliario": {
    problem:
      "El catálogo de propiedades está desactualizado y no genera contactos: el visitante no encuentra lo que busca y la solicitud no llega a nadie.",
    solution: [
      "Catálogo con filtros claros, fichas completas y fotos optimizadas",
      "Formularios de contacto conectados directo al CRM",
      "Páginas por proyecto o campaña",
      "Administración sencilla del catálogo por tu equipo",
    ],
    example:
      "Una inmobiliaria publicó un catálogo conectado a su CRM. Cada consulta llega ya asociada a la propiedad que el visitante vio y al asesor responsable, sin reenvíos por correo.",
  },
  "desarrollo-digital:hoteleria": {
    problem:
      "La reserva directa pierde frente a las plataformas porque el sitio es lento, poco claro y no refleja la disponibilidad real.",
    solution: [
      "Sitio con motor de reservas directo y disponibilidad real",
      "Experiencia bilingüe y optimizada para móvil",
      "Páginas de habitaciones y servicios que explican y convencen",
      "Medición para entender de dónde vienen las reservas",
    ],
    example:
      "Un hotel lanzó un sitio con motor de reservas directo y tarifas actualizadas. Los huéspedes reservan sin irse al sitio de una plataforma, y el hotel conserva el contacto y la relación con ellos.",
  },

  // ---- DTA Digital Audit: "qué descubre el diagnóstico" en cada sector ----
  "dta-digital-audit:turismo": {
    problem:
      "Las reservas, los pagos y la atención se reparten entre OTAs, WhatsApp y hojas de cálculo, y nadie tiene claro cuánto tiempo del equipo se va en conciliar canales.",
    solution: [
      "Mapa de cómo viaja una reserva de principio a fin",
      "Qué herramientas se hablan entre sí y cuáles obligan a capturar dos veces",
      "Dónde se originan los desfases de disponibilidad y tarifas",
      "Una lista priorizada de qué conectar o automatizar primero",
    ],
    example:
      "Una operadora de tours descubrió con el diagnóstico que su mayor pérdida de tiempo no estaba en las ventas, sino en reconciliar la disponibilidad entre canales cada mañana. Eso definió por dónde empezar: conectar el inventario antes de rediseñar el sitio.",
  },
  "dta-digital-audit:hoteleria": {
    problem:
      "El PMS, el channel manager y las hojas del equipo conviven sin una visión común, y las decisiones de tarifa se toman con datos parciales.",
    solution: [
      "Radiografía de los sistemas del hotel y de cómo intercambian datos",
      "Identificación de capturas duplicadas en recepción y en revenue",
      "Qué indicadores existen, cuáles faltan y dónde viven",
      "Roadmap con mejoras rápidas y proyectos de mayor alcance",
    ],
    example:
      "Un hotel boutique mapeó con el diagnóstico quién captura qué y dónde. Descubrió que dos áreas capturaban la misma tarifa en sistemas distintos, y eso marcó la primera integración a resolver.",
  },
  "dta-digital-audit:inmobiliario": {
    problem:
      "Cada asesor trabaja con sus propios archivos y los prospectos se enfrían entre portales, mensajes y correos. La dirección no ve el embudo completo.",
    solution: [
      "Recorrido real de un prospecto, del primer mensaje a la visita",
      "Dónde se pierde o se retrasa el seguimiento",
      "Qué datos del embudo existen y cuáles hoy no se miden",
      "Prioridades: CRM, automatización de respuesta o tablero comercial",
    ],
    example:
      "Una desarrolladora usó el diagnóstico para seguir el recorrido de un prospecto. Encontró que la mayor fuga era el tiempo de primera respuesta, y por eso su primer proyecto fue automatizar la atención inicial.",
  },
  "dta-digital-audit:servicios": {
    problem:
      "Las cotizaciones, la agenda y la facturación viven en herramientas distintas y el equipo repite capturas. Se siente que se trabaja mucho, pero no se sabe dónde se va el tiempo.",
    solution: [
      "Mapa de procesos: cotizar, agendar, ejecutar y cobrar",
      "Qué tareas se repiten y cuánto tiempo consumen",
      "Qué sistemas ya tienes y cómo aprovecharlos mejor",
      "Plan de mejoras ordenado por impacto y esfuerzo",
    ],
    example:
      "Una empresa de servicios descubrió que su cuello de botella era recapturar datos entre la cotización y la factura. El diagnóstico lo puso como primera prioridad, antes de pensar en software nuevo.",
  },

  // ---- DTA Care: "cómo lo cuida DTA Care" en cada sector ----
  "dta-care:turismo": {
    problem:
      "En temporada alta una falla de la reserva en línea o de la sincronización cuesta ventas, y en temporada baja nadie revisa los sistemas hasta que algo se rompe.",
    solution: [
      "Monitoreo de disponibilidad de la reserva en línea y de los conectores",
      "Revisión previa a temporada alta para llegar con todo actualizado",
      "Atención de incidentes con tiempo de respuesta acordado",
      "Ajustes y mejoras incrementales a lo largo del año",
    ],
    example:
      "Una operadora de tours contrató el cuidado continuo de su sistema de reservas. Antes de la temporada alta se actualizaron dependencias y se probaron los conectores, y durante el año los ajustes pequeños se atendieron sin abrir un proyecto nuevo.",
  },
  "dta-care:hoteleria": {
    problem:
      "Si la sincronización entre el PMS y los canales falla un fin de semana, el hotel se entera cuando ya hay una reserva duplicada.",
    solution: [
      "Alertas cuando una integración se detiene o se desfasa",
      "Actualizaciones de seguridad de los sistemas conectados",
      "Soporte ante incidentes con respuesta acordada",
      "Reporte periódico del estado de tus sistemas",
    ],
    example:
      "Un hotel boutique sumó monitoreo a sus integraciones. Cuando un conector dejó de sincronizar tarifas, el aviso llegó antes de que afectara una reserva y se corrigió el mismo día.",
  },
  "dta-care:inmobiliario": {
    problem:
      "El CRM y el sitio crecen con cada campaña, pero nadie los mantiene: formularios que dejan de llegar, integraciones desactualizadas y catálogos con errores.",
    solution: [
      "Verificación de que cada formulario siga llegando al CRM",
      "Mantenimiento del catálogo y de las integraciones",
      "Respaldos y actualizaciones de seguridad",
      "Mejoras incrementales por campaña o proyecto nuevo",
    ],
    example:
      "Una inmobiliaria mantiene con DTA Care su catálogo y su CRM. Cuando un formulario de contacto dejó de entregar solicitudes tras una actualización, el monitoreo lo detectó y se corrigió antes de perder prospectos.",
  },
  "dta-care:servicios": {
    problem:
      "Los sistemas internos dependen de una sola persona que ya no tiene tiempo, y los pequeños errores se acumulan hasta volverse un problema.",
    solution: [
      "Un equipo externo que conoce el sistema y responde ante fallas",
      "Mantenimiento preventivo para no depender de emergencias",
      "Ajustes menores incluidos conforme cambia el proceso",
      "Documentación al día, para no depender de la memoria de nadie",
    ],
    example:
      "Una empresa de servicios dejó el mantenimiento de su sistema de cotizaciones y agenda en manos de DTA Care. Los ajustes pequeños se atienden dentro del plan y su equipo se enfoca en atender clientes, no en arreglar herramientas.",
  },
};

const en: Record<string, SectorCase> = {
  "sistemas-empresariales:turismo": {
    problem:
      "Bookings, payments and customer service come in through OTAs, WhatsApp and the company's own site, and each channel keeps its own record. The team spends the day copying data from one place to another.",
    solution: [
      "A central booking system where every channel converges",
      "A single record per customer, with booking and payment history",
      "Roles and permissions: each person sees and edits only what is theirs",
      "Your team adjusts rates and capacity without depending on a vendor",
    ],
    example:
      "A tour operator brought the bookings from its three channels into one dashboard. The front desk stopped asking “is this one confirmed?” because every booking's status is in the same place, and the owner adjusts seasonal capacity without asking for help.",
  },
  "sistemas-empresariales:inmobiliario": {
    problem:
      "Each agent keeps their own prospect spreadsheet and property files live in folders and inboxes. When someone leaves, they take their pipeline with them.",
    solution: [
      "Real estate CRM with prospects, properties and follow-up in one place",
      "Assignment and reminders so no prospect goes unanswered",
      "Digital files per property, with documents kept in order",
      "Visibility for management: who handles what and at which stage",
    ],
    example:
      "A developer moved its agents' lists into a shared CRM. Management sees the whole funnel and, when an agent changes projects, their pipeline is reassigned in minutes instead of being lost.",
  },
  "sistemas-empresariales:servicios": {
    problem:
      "Quotes are built from scratch, scheduling is coordinated over chat and invoicing lives elsewhere. Nobody sees the full picture of each client.",
    solution: [
      "CRM and service scheduling in a single system",
      "Quote templates with version control",
      "Invoicing connected to client follow-up",
      "Renewal alerts so you can act before losing accounts",
    ],
    example:
      "A maintenance company replaced spreadsheets and chats with a single system. The quote comes from a template, the visit is scheduled without clashes and the invoice is generated from the same service, so administration stops reconstructing what happened.",
  },

  "integracion-de-sistemas:turismo": {
    problem:
      "Availability changes on one OTA and takes hours to show up on the others, risking overselling. Someone reconciles channels by hand.",
    solution: [
      "Connectors between OTAs, your own site and your internal system",
      "Availability and rates synchronized automatically",
      "Alerts when a channel fails or drifts out of sync",
      "One control point for all distribution",
    ],
    example:
      "A tour operator connected its site and two OTAs to its central inventory. When a spot sells on one channel it is removed from the others within seconds, and the team no longer checks channel by channel every morning.",
  },
  "integracion-de-sistemas:hoteleria": {
    problem:
      "The channel manager and the PMS don't talk well: rates and availability are fixed by hand and errors surface when a guest is already there.",
    solution: [
      "Synchronization between PMS, channel manager and booking engine",
      "Rate and closure rules that apply themselves",
      "A log of every change, so you know what happened and when",
      "Fewer manual tasks for front desk and revenue",
    ],
    example:
      "A boutique hotel connected its PMS to its channel manager and booking engine. A rate change is published once and reaches every channel; the front desk stops duplicating entries and mismatches are caught before they affect a booking.",
  },
  "integracion-de-sistemas:servicios": {
    problem:
      "The CRM, scheduling and invoicing are separate tools: the same data is entered two or three times and the versions don't match.",
    solution: [
      "APIs and connectors between CRM, scheduling, invoicing and email",
      "A single entry that feeds every system",
      "Rules that move information between tools without intervention",
      "Traceability of where each piece of data comes from",
    ],
    example:
      "A professional services firm connected its CRM to invoicing. When a service is closed, the client's data flows to the invoice on its own; administration stops re-entering data and the reports no longer contradict each other.",
  },

  "business-intelligence:servicios": {
    problem:
      "The information exists, but it is scattered. Knowing which clients are up for renewal or at risk means building reports by hand.",
    solution: [
      "Executive dashboard with renewals, retention and performance per client",
      "Indicators that update themselves from your systems",
      "Alerts when an indicator goes out of range",
      "Meeting-ready reports, without rebuilding them every week",
    ],
    example:
      "A services firm replaced its weekly Excel report with a dashboard connected to its CRM. Leadership opens it on Monday, sees which contracts expire this month and decides who to call first.",
  },
  "business-intelligence:inmobiliario": {
    problem:
      "Nobody knows which channel actually closes sales: portals, social media and referrals are judged by gut feeling, and budget is spread blindly.",
    solution: [
      "The source of each prospect connected all the way to the closed sale",
      "Conversion dashboard by channel and by agent",
      "Response and closing times by stage",
      "Investment decisions backed by your own data",
    ],
    example:
      "A real estate agency connected its portals and its CRM to a sales dashboard. It identified which source generated the most scheduled visits, moved budget toward it and stopped deciding by opinion.",
  },
  "business-intelligence:hoteleria": {
    problem:
      "Rates are set by gut feeling, without a clear view of occupancy or seasonal history.",
    solution: [
      "Dashboard of occupancy, average rate and RevPAR",
      "Comparisons by season and by channel",
      "Simple projections based on your own history",
      "Alerts for low occupancy or out-of-date rates",
    ],
    example:
      "A hotel brought its PMS and channel data into one dashboard. Before setting high-season rates, the manager compares how each week performed the previous year and adjusts with information, not by eye.",
  },

  "inteligencia-artificial:turismo": {
    problem:
      "The same messages arrive all day: availability, prices, directions. After hours nobody answers and the booking is lost.",
    solution: [
      "AI agent that answers frequent questions in your tone",
      "Automatic capture of booking details through chat",
      "Escalation to a person when the case calls for it",
      "Automatic confirmations and reminders",
    ],
    example:
      "A tour operator automated its answers to repeated questions and its pre-tour reminders. The team focuses on cases that need judgment, and anyone writing at night gets a reply instead of waiting until morning.",
  },
  "inteligencia-artificial:inmobiliario": {
    problem:
      "Prospects come in through many channels and go cold while someone reviews them. Qualifying them by hand eats hours of the sales team's time.",
    solution: [
      "Instant reply and automatic qualification of every prospect",
      "Assignment to the right agent by profile and area",
      "Scheduled follow-up until a visit is booked",
      "A summary of each conversation inside the CRM",
    ],
    example:
      "A developer put in an assistant that replies instantly, asks about budget and area of interest, and books visits with the right agent. Agents arrive at every call with the context already summarized.",
  },
  "inteligencia-artificial:servicios": {
    problem:
      "Quotes, reminders and client follow-up are done by hand and get postponed when workload is high.",
    solution: [
      "Quote drafts generated from the request",
      "Automatic reminders for appointments, payments and renewals",
      "Classification and replies for routine emails and messages",
      "Human review before anything important",
    ],
    example:
      "A services company automated standard quotes and renewal reminders. The team reviews and approves instead of drafting from scratch, and follow-ups stop depending on someone's memory.",
  },

  "desarrollo-digital:turismo": {
    problem:
      "The site doesn't sell on its own: booking is confusing, it isn't built for mobile and inquiries end up on WhatsApp.",
    solution: [
      "A fast, clear site designed for mobile first",
      "Online booking and payment integrated with your system",
      "Pages per experience and destination, ready to rank",
      "Content your team can update without coding",
    ],
    example:
      "A tour operator redesigned its site with online booking connected to its inventory. Visitors pick a date and pay in a few steps, and the team receives bookings already registered instead of loose messages.",
  },
  "desarrollo-digital:inmobiliario": {
    problem:
      "The property catalog is out of date and doesn't generate leads: visitors can't find what they want and the inquiry never reaches anyone.",
    solution: [
      "Catalog with clear filters, complete listings and optimized photos",
      "Contact forms connected straight to the CRM",
      "Pages per project or campaign",
      "Simple catalog management by your own team",
    ],
    example:
      "A real estate agency published a catalog connected to its CRM. Each inquiry arrives already linked to the property the visitor viewed and the responsible agent, with no forwarding by email.",
  },
  "desarrollo-digital:hoteleria": {
    problem:
      "Direct booking loses to the platforms because the site is slow, unclear and doesn't reflect real availability.",
    solution: [
      "Site with a direct booking engine and real availability",
      "Bilingual, mobile-optimized experience",
      "Room and service pages that explain and persuade",
      "Measurement to understand where bookings come from",
    ],
    example:
      "A hotel launched a site with a direct booking engine and up-to-date rates. Guests book without leaving for a platform's site, and the hotel keeps the contact and the relationship with them.",
  },

  // ---- DTA Digital Audit: what the assessment uncovers in each sector ----
  "dta-digital-audit:turismo": {
    problem:
      "Bookings, payments and customer service are spread across OTAs, WhatsApp and spreadsheets, and nobody is clear on how much of the team's time goes into reconciling channels.",
    solution: [
      "A map of how a booking travels from start to finish",
      "Which tools talk to each other and which force double entry",
      "Where availability and rate mismatches originate",
      "A prioritized list of what to connect or automate first",
    ],
    example:
      "A tour operator found through the assessment that its biggest time loss was not in sales but in reconciling availability across channels every morning. That defined where to start: connect the inventory before redesigning the site.",
  },
  "dta-digital-audit:hoteleria": {
    problem:
      "The PMS, the channel manager and the team's spreadsheets coexist without a shared view, and rate decisions are made with partial data.",
    solution: [
      "An x-ray of the hotel's systems and how they exchange data",
      "Identification of duplicate entries at the front desk and in revenue",
      "Which indicators exist, which are missing and where they live",
      "A roadmap with quick wins and larger projects",
    ],
    example:
      "A boutique hotel used the assessment to map who enters what and where. It found two departments entering the same rate in different systems, and that set the first integration to solve.",
  },
  "dta-digital-audit:inmobiliario": {
    problem:
      "Each agent works with their own files and prospects go cold between portals, messages and emails. Management can't see the whole funnel.",
    solution: [
      "A real walk-through of a prospect, from first message to visit",
      "Where follow-up gets lost or delayed",
      "Which funnel data exists and which is not measured today",
      "Priorities: CRM, reply automation or a sales dashboard",
    ],
    example:
      "A developer used the assessment to follow a prospect's journey. It found the biggest leak was first-response time, so its first project was automating the initial reply.",
  },
  "dta-digital-audit:servicios": {
    problem:
      "Quotes, scheduling and invoicing live in different tools and the team repeats data entry. It feels like everyone works a lot, but nobody knows where the time goes.",
    solution: [
      "A process map: quote, schedule, deliver and collect",
      "Which tasks repeat and how much time they take",
      "Which systems you already have and how to use them better",
      "An improvement plan ordered by impact and effort",
    ],
    example:
      "A services company discovered its bottleneck was re-entering data between the quote and the invoice. The assessment made that the first priority, before thinking about new software.",
  },

  // ---- DTA Care: how DTA Care looks after it in each sector ----
  "dta-care:turismo": {
    problem:
      "In high season a failure in online booking or syncing costs sales, and in low season nobody checks the systems until something breaks.",
    solution: [
      "Availability monitoring of online booking and connectors",
      "A pre-high-season review so everything is up to date",
      "Incident handling with an agreed response time",
      "Incremental adjustments and improvements throughout the year",
    ],
    example:
      "A tour operator signed up for ongoing care of its booking system. Before high season dependencies were updated and connectors tested, and during the year small adjustments were handled without opening a new project.",
  },
  "dta-care:hoteleria": {
    problem:
      "If syncing between the PMS and channels fails on a weekend, the hotel finds out when a duplicate booking already exists.",
    solution: [
      "Alerts when an integration stops or drifts out of sync",
      "Security updates for connected systems",
      "Incident support with an agreed response",
      "A periodic report on the state of your systems",
    ],
    example:
      "A boutique hotel added monitoring to its integrations. When a connector stopped syncing rates, the alert arrived before it affected a booking and it was fixed the same day.",
  },
  "dta-care:inmobiliario": {
    problem:
      "The CRM and the site grow with every campaign, but nobody maintains them: forms that stop arriving, outdated integrations and catalogs with errors.",
    solution: [
      "Verification that every form still reaches the CRM",
      "Maintenance of the catalog and integrations",
      "Backups and security updates",
      "Incremental improvements per campaign or new project",
    ],
    example:
      "A real estate agency keeps its catalog and CRM with DTA Care. When a contact form stopped delivering requests after an update, monitoring caught it and it was fixed before prospects were lost.",
  },
  "dta-care:servicios": {
    problem:
      "Internal systems depend on one person who no longer has time, and small errors pile up until they become a problem.",
    solution: [
      "An outside team that knows the system and responds to failures",
      "Preventive maintenance so you don't depend on emergencies",
      "Minor adjustments included as the process changes",
      "Up-to-date documentation, so nobody has to rely on memory",
    ],
    example:
      "A services company left maintenance of its quoting and scheduling system with DTA Care. Small adjustments are handled within the plan and its team focuses on serving clients, not fixing tools.",
  },
};

export function getSolutionSectorCase(solution: string, sector: string, locale: AppLocale): SectorCase | undefined {
  const key = `${solution}:${sector}`;
  return (locale === "en" ? en[key] : es[key]) ?? es[key];
}
