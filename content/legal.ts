import { LEGAL } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

/**
 * Contenido legal bilingüe.
 *
 * ⚠️ BORRADOR REDACTADO PARA REVISIÓN LEGAL. Describe compromisos de
 * confidencialidad y seguridad que DTA Sistemas asume públicamente: deben
 * ser ciertos y cumplibles en la práctica antes de publicarse. Revisar con un
 * abogado (idealmente especializado en protección de datos), completar los
 * datos de `LEGAL` en lib/site.ts y ajustar plazos y jurisdicción.
 *
 * Estructura: cada sección es una lista de bloques; un `string` es un
 * párrafo y un `string[]` es una lista con viñetas.
 */
export type LegalBlock = string | string[];
export type LegalSection = { id: string; title: string; body: LegalBlock[] };
export type LegalDoc = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  highlights: { title: string; text: string }[];
  sections: LegalSection[];
};
export type LegalKind = "privacy" | "terms";

const L = LEGAL;

/* ============================== ES — AVISO DE PRIVACIDAD ============================== */
const privacyEs: LegalDoc = {
  metaTitle: "Aviso de privacidad",
  metaDescription:
    "Cómo DTA Sistemas protege la información personal y empresarial de sus clientes: confidencialidad, seguridad, finalidades y derechos ARCO.",
  eyebrow: "Legal",
  title: "Aviso de privacidad",
  intro:
    "En DTA Sistemas la información de nuestros clientes es confidencial. Este aviso explica qué datos recabamos, para qué los usamos, cómo los protegemos y cómo puede ejercer sus derechos.",
  highlights: [
    { title: "Confidencial por defecto", text: "Su información solo se usa para el propósito con el que nos la confió." },
    { title: "Acceso mínimo", text: "Solo accede quien la necesita para atender su caso, bajo deber de secreto." },
    { title: "Sin venta de datos", text: "No vendemos ni cedemos información de clientes con fines comerciales." },
    { title: "Control suyo", text: "Puede acceder, corregir o pedir la eliminación de sus datos cuando lo desee." },
  ],
  sections: [
    {
      id: "responsable",
      title: "Responsable del tratamiento",
      body: [
        `${L.entityName} (en adelante, “${L.tradeName}” o “DTA”), con domicilio en ${L.address}, es responsable del tratamiento de los datos personales que usted nos proporcione, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares vigente desde el 21 de marzo de 2025 (la “Ley”) y demás normatividad aplicable.`,
      ],
    },
    {
      id: "confidencialidad",
      title: "Nuestro compromiso de confidencialidad",
      body: [
        "Nuestro trabajo consiste en conocer a fondo cómo opera una empresa: sus procesos, sus sistemas, sus datos. Por eso tratamos toda la información que nos comparten nuestros clientes como confidencial. En concreto, DTA se compromete a lo siguiente:",
        [
          "Acceso por necesidad. Solo el personal que requiere la información para atender su caso puede acceder a ella.",
          "Deber de secreto. Quienes colaboran con DTA y tienen acceso a información de clientes están obligados a guardar confidencialidad, obligación que subsiste aun después de terminada su relación con DTA.",
          "Sin venta ni cesión comercial. No vendemos, alquilamos ni cedemos información de clientes a terceros con fines comerciales o publicitarios.",
          "Un solo propósito. La información se usa únicamente para el fin para el que nos fue entregada; no se reutiliza en proyectos de otros clientes ni se publica.",
          "Acuerdo de confidencialidad a solicitud. Si lo requiere, firmamos un acuerdo de confidencialidad (NDA) sin costo antes de que comparta cualquier información.",
          "Cierre limpio. Al concluir la relación, devolvemos o eliminamos de forma segura la información del cliente, salvo lo que la ley o el contrato nos obliguen a conservar.",
        ],
      ],
    },
    {
      id: "datos",
      title: "Datos personales que recabamos",
      body: [
        "A través de este sitio (formulario de contacto, correo electrónico o WhatsApp) podemos recabar:",
        [
          "Identificación y contacto: nombre completo, empresa, correo electrónico, teléfono o WhatsApp y ciudad.",
          "Contenido de su mensaje y el tipo de ayuda que solicita.",
          "Datos técnicos de navegación: dirección IP, tipo de dispositivo y navegador, y páginas visitadas, mediante cookies y herramientas de analítica.",
        ],
        "No recabamos datos personales sensibles a través del sitio. Le pedimos no incluir en el formulario contraseñas, datos de tarjetas, información financiera o médica ni documentos confidenciales; si necesita compartirlos, le indicaremos un canal seguro.",
      ],
    },
    {
      id: "proyectos",
      title: "Información que nos confían durante un proyecto",
      body: [
        "Al prestar nuestros servicios podemos tener acceso a información de la operación de su empresa: bases de datos de clientes, reservas, información financiera, sistemas y accesos, entre otros.",
        "Cuando esa información incluye datos personales que su empresa recopila de sus propios clientes, empleados o proveedores, su empresa es la responsable de esos datos y DTA actúa como persona encargada. En ese caso:",
        [
          "Trataremos esos datos únicamente conforme a sus instrucciones y al contrato de servicios, y nunca para fines propios.",
          "No los transferiremos a terceros, salvo subcontratistas que usted autorice y que estén obligados a guardar la misma confidencialidad.",
          "Pediremos solo los accesos mínimos necesarios, los usaremos de forma temporal y los daremos de baja al concluir el trabajo. No guardamos contraseñas en texto plano ni las compartimos por canales inseguros.",
          "Aplicaremos medidas de seguridad equivalentes o superiores a las que usamos para nuestra propia información.",
        ],
      ],
    },
    {
      id: "finalidades",
      title: "Finalidades del tratamiento",
      body: [
        "Finalidades necesarias, que dan origen a la relación con usted:",
        [
          "Responder sus solicitudes de contacto, información o cotización.",
          "Agendar y realizar diagnósticos (como DTA Digital Audit) y presentar propuestas.",
          "Formalizar, ejecutar y dar seguimiento a la prestación de servicios, incluida la facturación.",
        ],
        "Finalidades adicionales, que no son indispensables:",
        [
          "Enviarle contenido del blog, novedades o información sobre nuestros servicios.",
          "Medir y mejorar el funcionamiento del sitio y la experiencia de navegación.",
        ],
        "Si no desea que sus datos se traten para las finalidades adicionales, puede indicarlo en cualquier momento escribiendo a " +
          L.privacyEmail +
          ". Su negativa no afectará la atención de las finalidades necesarias.",
      ],
    },
    {
      id: "terceros",
      title: "Con quién compartimos sus datos",
      body: [
        "Para operar nuestros servicios nos apoyamos en proveedores tecnológicos que tratan datos por cuenta de DTA, por ejemplo: alojamiento del sitio, correo electrónico, gestión de contactos (CRM), analítica y verificación anti-spam (como Cloudflare Turnstile). Estos proveedores están obligados contractualmente a proteger la información y a no usarla para fines distintos. Algunos pueden operar fuera de México.",
        "Fuera de lo anterior, no transferimos sus datos a terceros sin su consentimiento, salvo en los casos que la Ley permite o exige, como el requerimiento fundado y motivado de una autoridad competente.",
      ],
    },
    {
      id: "seguridad",
      title: "Medidas de seguridad",
      body: [
        "Protegemos la información con medidas administrativas, técnicas y físicas razonables, entre ellas:",
        [
          "Cifrado de las comunicaciones del sitio mediante HTTPS/TLS.",
          "Control de accesos con privilegios mínimos y autenticación para las herramientas que contienen información de clientes.",
          "Separación de la información de cada cliente.",
          "Respaldos y registro de accesos a los sistemas que lo permiten.",
          "Capacitación y compromisos de confidencialidad para el personal.",
          "Protocolo de respuesta a incidentes de seguridad.",
        ],
        "Ningún sistema es infalible. Si ocurriera una vulneración que afecte de forma significativa sus derechos patrimoniales o morales, se lo informaremos sin dilación para que pueda tomar las medidas que correspondan.",
      ],
    },
    {
      id: "arco",
      title: "Sus derechos (ARCO) y revocación del consentimiento",
      body: [
        "Usted tiene derecho a Acceder a sus datos y conocer cómo los tratamos, Rectificarlos si son inexactos, solicitar su Cancelación y Oponerse a su tratamiento para fines específicos. También puede limitar el uso o la divulgación de sus datos y revocar el consentimiento que nos haya otorgado.",
        `Para ejercer estos derechos, envíe una solicitud a ${L.privacyEmail} que incluya: (1) su nombre y un medio para comunicarle la respuesta; (2) un documento que acredite su identidad o la de su representante; (3) la descripción clara de los datos y del derecho que desea ejercer; y (4) cualquier elemento que facilite localizar sus datos. Le daremos respuesta dentro de los plazos que establece la Ley.`,
      ],
    },
    {
      id: "conservacion",
      title: "Conservación de los datos",
      body: [
        "Conservamos sus datos únicamente durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales, fiscales y contractuales aplicables. Concluido ese plazo, los datos se bloquean y se eliminan o anonimizan de forma segura.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies y analítica",
      body: [
        "El sitio utiliza cookies y tecnologías similares para su funcionamiento y para medir el uso del sitio de forma agregada. Puede desactivarlas o eliminarlas desde la configuración de su navegador; hacerlo puede afectar algunas funciones.",
      ],
    },
    {
      id: "menores",
      title: "Menores de edad",
      body: [
        "Este sitio está dirigido a empresas y personas mayores de edad. No recabamos intencionalmente datos de menores; si detectamos que lo hicimos, los eliminaremos.",
      ],
    },
    {
      id: "cambios",
      title: "Cambios a este aviso",
      body: [
        "Podemos actualizar este aviso por cambios legales, en nuestros servicios o en nuestras prácticas. Publicaremos la versión vigente en esta página con su fecha de actualización y, cuando el cambio sea relevante, se lo haremos saber por los medios de contacto que nos haya proporcionado.",
      ],
    },
    {
      id: "autoridad",
      title: "Autoridad en materia de protección de datos",
      body: [
        "Si considera que su derecho a la protección de datos personales ha sido vulnerado, puede acudir a la Secretaría Anticorrupción y Buen Gobierno, autoridad en materia de protección de datos personales en posesión de particulares.",
      ],
    },
    {
      id: "contacto",
      title: "Contacto",
      body: [`Para cualquier duda sobre este aviso o el manejo de su información, escríbanos a ${L.privacyEmail}.`],
    },
  ],
};

/* ============================== EN — PRIVACY NOTICE ============================== */
const privacyEn: LegalDoc = {
  metaTitle: "Privacy notice",
  metaDescription:
    "How DTA Sistemas protects the personal and business information of its clients: confidentiality, security, purposes and data-subject rights.",
  eyebrow: "Legal",
  title: "Privacy notice",
  intro:
    "At DTA Sistemas, our clients’ information is confidential. This notice explains what data we collect, what we use it for, how we protect it and how you can exercise your rights.",
  highlights: [
    { title: "Confidential by default", text: "Your information is used only for the purpose you entrusted it to us for." },
    { title: "Minimum access", text: "Only those who need it to handle your case can access it, under a duty of secrecy." },
    { title: "No data sales", text: "We never sell or assign client information for commercial purposes." },
    { title: "You stay in control", text: "You can access, correct or request deletion of your data at any time." },
  ],
  sections: [
    {
      id: "responsable",
      title: "Data controller",
      body: [
        `${L.entityName} (“${L.tradeName}” or “DTA”), located at ${L.address}, is the controller of the personal data you provide, in accordance with Mexico’s Federal Law on the Protection of Personal Data Held by Private Parties in force since March 21, 2025 (the “Law”) and other applicable regulations.`,
      ],
    },
    {
      id: "confidencialidad",
      title: "Our confidentiality commitment",
      body: [
        "Our work requires understanding in depth how a company operates: its processes, systems and data. That is why we treat everything our clients share with us as confidential. Specifically, DTA commits to the following:",
        [
          "Need-to-know access. Only staff who need the information to handle your case may access it.",
          "Duty of secrecy. Everyone who works with DTA and has access to client information is bound by confidentiality, an obligation that continues after their relationship with DTA ends.",
          "No sale or commercial assignment. We do not sell, rent or assign client information to third parties for commercial or advertising purposes.",
          "A single purpose. Information is used only for the purpose for which it was provided; it is not reused in other clients’ projects or published.",
          "Confidentiality agreement on request. If you wish, we will sign a non-disclosure agreement (NDA) at no cost before you share any information.",
          "Clean close-out. When our relationship ends, we securely return or delete client information, except what the law or the contract requires us to keep.",
        ],
      ],
    },
    {
      id: "datos",
      title: "Personal data we collect",
      body: [
        "Through this site (contact form, email or WhatsApp) we may collect:",
        [
          "Identification and contact details: full name, company, email address, phone or WhatsApp number and city.",
          "The content of your message and the type of help you request.",
          "Technical browsing data: IP address, device and browser type, and pages visited, through cookies and analytics tools.",
        ],
        "We do not collect sensitive personal data through the site. Please do not include passwords, card numbers, financial or medical information or confidential documents in the form; if you need to share them, we will give you a secure channel.",
      ],
    },
    {
      id: "proyectos",
      title: "Information entrusted to us during a project",
      body: [
        "When providing our services we may have access to information about your company’s operations: customer databases, bookings, financial information, systems and credentials, among others.",
        "When that information includes personal data your company collects from its own customers, employees or suppliers, your company is the controller of that data and DTA acts as processor. In that case:",
        [
          "We will process that data only under your instructions and the services contract, and never for our own purposes.",
          "We will not transfer it to third parties, except subcontractors you authorize who are bound by the same confidentiality.",
          "We will request only the minimum access needed, use it temporarily and revoke it when the work ends. We do not store passwords in plain text or share them over insecure channels.",
          "We will apply security measures equal to or stronger than those we use for our own information.",
        ],
      ],
    },
    {
      id: "finalidades",
      title: "Purposes of processing",
      body: [
        "Necessary purposes, which give rise to our relationship with you:",
        [
          "Responding to your contact, information or quote requests.",
          "Scheduling and carrying out assessments (such as DTA Digital Audit) and presenting proposals.",
          "Formalizing, performing and following up on services, including invoicing.",
        ],
        "Additional purposes, which are not essential:",
        [
          "Sending you blog content, news or information about our services.",
          "Measuring and improving how the site works and the browsing experience.",
        ],
        "If you do not want your data processed for the additional purposes, you may say so at any time by writing to " +
          L.privacyEmail +
          ". Your refusal will not affect the necessary purposes.",
      ],
    },
    {
      id: "terceros",
      title: "Who we share your data with",
      body: [
        "To operate our services we rely on technology providers that process data on DTA’s behalf, for example: site hosting, email, contact management (CRM), analytics and anti-spam verification (such as Cloudflare Turnstile). These providers are contractually bound to protect the information and not use it for other purposes. Some may operate outside Mexico.",
        "Beyond this, we do not transfer your data to third parties without your consent, except where the Law allows or requires it, such as a duly grounded request from a competent authority.",
      ],
    },
    {
      id: "seguridad",
      title: "Security measures",
      body: [
        "We protect information with reasonable administrative, technical and physical measures, including:",
        [
          "Encryption of site communications through HTTPS/TLS.",
          "Access control with least privilege and authentication for tools that hold client information.",
          "Separation of each client’s information.",
          "Backups and access logging in the systems that support it.",
          "Training and confidentiality commitments for staff.",
          "A security-incident response protocol.",
        ],
        "No system is infallible. If a breach occurs that significantly affects your property or moral rights, we will notify you without delay so you can take appropriate measures.",
      ],
    },
    {
      id: "arco",
      title: "Your rights (ARCO) and withdrawal of consent",
      body: [
        "You have the right to Access your data and learn how we process it, to Rectify it if it is inaccurate, to request its Cancellation and to Object to its processing for specific purposes. You may also limit the use or disclosure of your data and withdraw the consent you gave us.",
        `To exercise these rights, send a request to ${L.privacyEmail} including: (1) your name and a way to send you our answer; (2) a document proving your identity or your representative’s; (3) a clear description of the data and the right you wish to exercise; and (4) any element that helps us locate your data. We will respond within the time limits set by the Law.`,
      ],
    },
    {
      id: "conservacion",
      title: "Data retention",
      body: [
        "We keep your data only as long as necessary to fulfil the purposes described and applicable legal, tax and contractual obligations. After that, data is blocked and securely deleted or anonymized.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      body: [
        "The site uses cookies and similar technologies for it to work and to measure site usage in aggregate. You can disable or delete them in your browser settings; doing so may affect some features.",
      ],
    },
    {
      id: "menores",
      title: "Minors",
      body: [
        "This site is aimed at businesses and adults. We do not knowingly collect data from minors; if we find we have, we will delete it.",
      ],
    },
    {
      id: "cambios",
      title: "Changes to this notice",
      body: [
        "We may update this notice due to legal changes or changes in our services or practices. We will publish the current version on this page with its update date and, where the change is significant, let you know through the contact details you provided.",
      ],
    },
    {
      id: "autoridad",
      title: "Data protection authority",
      body: [
        "If you believe your right to the protection of personal data has been infringed, you may go to the Secretaría Anticorrupción y Buen Gobierno (Ministry of Anti-Corruption and Good Governance), the authority for personal data held by private parties in Mexico.",
      ],
    },
    {
      id: "contacto",
      title: "Contact",
      body: [`For any question about this notice or how your information is handled, write to us at ${L.privacyEmail}.`],
    },
  ],
};

/* ============================== ES — TÉRMINOS Y CONDICIONES ============================== */
const termsEs: LegalDoc = {
  metaTitle: "Términos y condiciones",
  metaDescription:
    "Condiciones de uso del sitio y de contratación de servicios de DTA Sistemas, con énfasis en confidencialidad y propiedad de la información del cliente.",
  eyebrow: "Legal",
  title: "Términos y condiciones",
  intro:
    "Estas condiciones regulan el uso de este sitio y el marco general de nuestros servicios. La confidencialidad de la información de nuestros clientes es una parte central de ellas.",
  highlights: [
    { title: "Confidencialidad", text: "Todo lo que compartan con DTA se trata como información confidencial." },
    { title: "NDA a solicitud", text: "Firmamos un acuerdo de confidencialidad antes de recibir información, si lo piden." },
    { title: "Su información es suya", text: "Los datos del cliente siguen siendo del cliente en todo momento." },
    { title: "Casos con permiso", text: "No publicamos el nombre de un cliente ni detalles de su proyecto sin autorización." },
  ],
  sections: [
    {
      id: "aceptacion",
      title: "Aceptación",
      body: [
        `Al acceder o usar este sitio, usted acepta estos términos y el Aviso de privacidad. Si no está de acuerdo, le pedimos no utilizarlo. El sitio es operado por ${L.entityName} (“${L.tradeName}” o “DTA”), con domicilio en ${L.address}.`,
      ],
    },
    {
      id: "objeto",
      title: "Objeto del sitio",
      body: [
        "Este sitio presenta información sobre los servicios de DTA y permite contactarnos. El contenido es informativo y no constituye por sí mismo una oferta vinculante ni asesoría profesional personalizada.",
      ],
    },
    {
      id: "servicios",
      title: "Servicios y contratación",
      body: [
        "Los servicios se prestan conforme a una propuesta, cotización, orden de servicio o contrato que defina el alcance, los entregables, los plazos y el precio. Ese documento prevalece sobre estos términos en caso de diferencia.",
        "Los precios publicados con la leyenda “desde” son referenciales, se expresan en pesos mexicanos (MXN), pueden estar sujetos a impuestos aplicables y se confirman en la cotización según el alcance de cada caso.",
      ],
    },
    {
      id: "confidencialidad",
      title: "Confidencialidad de la información del cliente",
      body: [
        "Se considera información confidencial toda la que el cliente entregue o a la que DTA tenga acceso con motivo de la relación, en cualquier formato, incluyendo de forma enunciativa: datos de clientes, reservas, información financiera y comercial, procesos, bases de datos, código, credenciales y accesos, documentos internos y estrategias.",
        "DTA se obliga a:",
        [
          "Usar la información confidencial únicamente para prestar los servicios contratados.",
          "No divulgarla a terceros sin autorización previa y por escrito del cliente, salvo subcontratistas autorizados sujetos a la misma obligación.",
          "Limitar el acceso al personal que lo necesite y que esté obligado a guardar secreto.",
          "Protegerla con medidas de seguridad razonables y no menos rigurosas que las que usa para su propia información.",
          "Notificar sin dilación al cliente cualquier acceso o divulgación no autorizados de los que tenga conocimiento.",
          "Devolverla o eliminarla de forma segura al concluir la relación o a solicitud del cliente, salvo lo que deba conservar por ley.",
        ],
        "Esta obligación no aplica a información que sea o se vuelva pública sin culpa de DTA, que DTA ya conociera legítimamente, que reciba legítimamente de un tercero sin deber de confidencialidad, o cuya divulgación sea exigida por una autoridad competente (en cuyo caso, salvo prohibición legal, DTA avisará al cliente de inmediato y revelará solo lo estrictamente requerido).",
        "La obligación de confidencialidad estará vigente durante la relación y por el plazo que se pacte en el contrato o acuerdo de confidencialidad aplicable; a falta de pacto, por cinco años contados a partir de su terminación. Respecto de datos personales y secretos industriales, subsistirá mientras conserven ese carácter.",
      ],
    },
    {
      id: "nda",
      title: "Acuerdos de confidencialidad (NDA)",
      body: [
        "Si el cliente lo solicita, DTA firmará un acuerdo de confidencialidad específico antes de recibir información, sin costo. Si el cliente prefiere usar su propio formato, lo revisaremos con gusto. En caso de diferencia, prevalecerá el acuerdo firmado.",
      ],
    },
    {
      id: "referencias",
      title: "Casos de éxito y referencias",
      body: [
        "DTA no publicará el nombre, logotipo, datos ni detalles identificables de un cliente o de su proyecto sin su autorización expresa y por escrito. Los casos mostrados en el sitio se presentan de forma que no revele información confidencial de ningún cliente.",
      ],
    },
    {
      id: "propiedad",
      title: "Propiedad de la información y propiedad intelectual",
      body: [
        "La información, los datos y los contenidos que el cliente entregue siguen siendo de su propiedad; DTA solo recibe el derecho de usarlos para prestar el servicio.",
        "Los entregables se regirán por lo pactado en el contrato. Las herramientas, metodologías, plantillas, componentes y conocimientos preexistentes o de uso general de DTA, así como el contenido, diseño y marcas de este sitio, son propiedad de DTA o de sus licenciantes, y no se transfieren por el uso del sitio ni por la prestación de los servicios, salvo pacto expreso.",
      ],
    },
    {
      id: "cliente",
      title: "Responsabilidades del cliente",
      body: [
        "Para proteger la información de ambas partes, el cliente se compromete a:",
        [
          "Otorgar únicamente los accesos necesarios y por el tiempo requerido, y revocarlos al concluir el trabajo.",
          "Contar con las autorizaciones y bases legales para compartir con DTA los datos personales que entregue.",
          "Mantener respaldos propios de su información y sistemas, salvo que el contrato disponga otra cosa.",
          "Avisar a DTA de cualquier incidente de seguridad que pueda afectar el proyecto.",
        ],
      ],
    },
    {
      id: "uso",
      title: "Uso aceptable del sitio",
      body: [
        "Usted se compromete a no usar el sitio para fines ilícitos, a no intentar acceder sin autorización a sus sistemas o a los de otros usuarios, a no interferir con su funcionamiento, y a no extraer su contenido de forma masiva o automatizada sin permiso.",
      ],
    },
    {
      id: "comunicaciones",
      title: "Comunicaciones a través del sitio",
      body: [
        "Los mensajes enviados por el formulario, correo o WhatsApp se tratan conforme al Aviso de privacidad. No incluya en ellos contraseñas, datos de tarjetas ni documentos confidenciales; si necesita compartirlos, le indicaremos un canal seguro. Enviar un mensaje no genera por sí mismo una relación contractual.",
      ],
    },
    {
      id: "responsabilidad",
      title: "Limitación de responsabilidad",
      body: [
        "DTA procura que la información del sitio sea correcta y esté actualizada, pero no garantiza que esté libre de errores ni que el sitio funcione sin interrupciones. En la medida permitida por la ley, DTA no será responsable por daños indirectos derivados del uso del sitio. La responsabilidad derivada de los servicios contratados se regirá por el contrato respectivo.",
      ],
    },
    {
      id: "terceros",
      title: "Enlaces y servicios de terceros",
      body: [
        "El sitio puede contener enlaces o integraciones con servicios de terceros. DTA no controla ni es responsable de su contenido o de sus prácticas de privacidad.",
      ],
    },
    {
      id: "cambios",
      title: "Modificaciones",
      body: [
        "DTA puede modificar estos términos en cualquier momento. La versión vigente será la publicada en esta página, con su fecha de actualización. El uso del sitio después de un cambio implica su aceptación.",
      ],
    },
    {
      id: "ley",
      title: "Legislación aplicable y jurisdicción",
      body: [
        `Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para su interpretación y cumplimiento, las partes se someten a los tribunales competentes de ${L.jurisdiction}, renunciando a cualquier otro fuero que pudiera corresponderles por su domicilio presente o futuro.`,
      ],
    },
    {
      id: "contacto",
      title: "Contacto",
      body: [`Para dudas sobre estos términos, escríbanos a ${L.privacyEmail}.`],
    },
  ],
};

/* ============================== EN — TERMS AND CONDITIONS ============================== */
const termsEn: LegalDoc = {
  metaTitle: "Terms and conditions",
  metaDescription:
    "Terms for using the DTA Sistemas website and engaging its services, with emphasis on confidentiality and ownership of client information.",
  eyebrow: "Legal",
  title: "Terms and conditions",
  intro:
    "These terms govern use of this site and the general framework of our services. Confidentiality of our clients’ information is a central part of them.",
  highlights: [
    { title: "Confidentiality", text: "Everything shared with DTA is treated as confidential information." },
    { title: "NDA on request", text: "We sign a non-disclosure agreement before receiving information, if asked." },
    { title: "Your information is yours", text: "Client data remains the client’s at all times." },
    { title: "Cases with permission", text: "We never publish a client’s name or project details without authorization." },
  ],
  sections: [
    {
      id: "aceptacion",
      title: "Acceptance",
      body: [
        `By accessing or using this site you accept these terms and the Privacy notice. If you disagree, please do not use it. The site is operated by ${L.entityName} (“${L.tradeName}” or “DTA”), located at ${L.address}.`,
      ],
    },
    {
      id: "objeto",
      title: "Purpose of the site",
      body: [
        "This site presents information about DTA’s services and lets you contact us. Its content is informational and does not in itself constitute a binding offer or personalized professional advice.",
      ],
    },
    {
      id: "servicios",
      title: "Services and engagement",
      body: [
        "Services are provided under a proposal, quote, service order or contract that defines scope, deliverables, timelines and price. That document prevails over these terms in case of conflict.",
        "Prices published as “from” are indicative, expressed in Mexican pesos (MXN), may be subject to applicable taxes and are confirmed in the quote according to each case’s scope.",
      ],
    },
    {
      id: "confidencialidad",
      title: "Confidentiality of client information",
      body: [
        "Confidential information means everything the client provides or DTA accesses in connection with the relationship, in any format, including without limitation: customer data, bookings, financial and commercial information, processes, databases, code, credentials and access, internal documents and strategies.",
        "DTA agrees to:",
        [
          "Use confidential information solely to provide the contracted services.",
          "Not disclose it to third parties without the client’s prior written authorization, except authorized subcontractors bound by the same obligation.",
          "Limit access to staff who need it and are bound by secrecy.",
          "Protect it with reasonable security measures no less rigorous than those used for its own information.",
          "Promptly notify the client of any unauthorized access or disclosure it becomes aware of.",
          "Return or securely delete it when the relationship ends or at the client’s request, except what must be kept by law.",
        ],
        "This obligation does not apply to information that is or becomes public through no fault of DTA, that DTA already lawfully knew, that DTA lawfully receives from a third party with no duty of confidentiality, or whose disclosure is required by a competent authority (in which case, unless legally prohibited, DTA will notify the client immediately and disclose only what is strictly required).",
        "The confidentiality obligation lasts during the relationship and for the period agreed in the applicable contract or confidentiality agreement; absent agreement, for five years after its termination. For personal data and trade secrets, it continues for as long as they retain that character.",
      ],
    },
    {
      id: "nda",
      title: "Confidentiality agreements (NDA)",
      body: [
        "If the client requests it, DTA will sign a specific confidentiality agreement before receiving information, at no cost. If the client prefers its own form, we will gladly review it. In case of conflict, the signed agreement prevails.",
      ],
    },
    {
      id: "referencias",
      title: "Case studies and references",
      body: [
        "DTA will not publish a client’s name, logo, data or identifiable details, or those of its project, without express written authorization. Cases shown on the site are presented so as not to reveal any client’s confidential information.",
      ],
    },
    {
      id: "propiedad",
      title: "Ownership of information and intellectual property",
      body: [
        "The information, data and content the client provides remain its property; DTA receives only the right to use them to provide the service.",
        "Deliverables are governed by the contract. DTA’s pre-existing or general-purpose tools, methodologies, templates, components and know-how, as well as this site’s content, design and trademarks, belong to DTA or its licensors and are not transferred by use of the site or by providing the services, unless expressly agreed.",
      ],
    },
    {
      id: "cliente",
      title: "Client responsibilities",
      body: [
        "To protect both parties’ information, the client agrees to:",
        [
          "Grant only the access needed and for the time required, and revoke it when the work ends.",
          "Have the authorizations and legal bases to share with DTA the personal data it provides.",
          "Keep its own backups of its information and systems, unless the contract provides otherwise.",
          "Inform DTA of any security incident that may affect the project.",
        ],
      ],
    },
    {
      id: "uso",
      title: "Acceptable use of the site",
      body: [
        "You agree not to use the site for unlawful purposes, not to attempt unauthorized access to its systems or other users’ systems, not to interfere with its operation, and not to scrape its content in bulk or by automated means without permission.",
      ],
    },
    {
      id: "comunicaciones",
      title: "Communications through the site",
      body: [
        "Messages sent through the form, email or WhatsApp are handled under the Privacy notice. Do not include passwords, card numbers or confidential documents in them; if you need to share them, we will give you a secure channel. Sending a message does not in itself create a contractual relationship.",
      ],
    },
    {
      id: "responsabilidad",
      title: "Limitation of liability",
      body: [
        "DTA strives for the site’s information to be accurate and up to date but does not guarantee it is error-free or that the site will operate without interruption. To the extent permitted by law, DTA is not liable for indirect damages arising from use of the site. Liability arising from contracted services is governed by the respective contract.",
      ],
    },
    {
      id: "terceros",
      title: "Third-party links and services",
      body: [
        "The site may contain links or integrations with third-party services. DTA does not control and is not responsible for their content or privacy practices.",
      ],
    },
    {
      id: "cambios",
      title: "Changes",
      body: [
        "DTA may modify these terms at any time. The current version is the one published on this page with its update date. Continued use of the site after a change means acceptance.",
      ],
    },
    {
      id: "ley",
      title: "Governing law and jurisdiction",
      body: [
        `These terms are governed by the laws of the United Mexican States. For their interpretation and enforcement, the parties submit to the competent courts of ${L.jurisdiction}, waiving any other jurisdiction they may be entitled to by reason of their present or future domicile.`,
      ],
    },
    {
      id: "contacto",
      title: "Contact",
      body: [`For questions about these terms, write to us at ${L.privacyEmail}.`],
    },
  ],
};

const DOCS: Record<LegalKind, Record<AppLocale, LegalDoc>> = {
  privacy: { es: privacyEs, en: privacyEn },
  terms: { es: termsEs, en: termsEn },
};

export function getLegalDoc(kind: LegalKind, locale: AppLocale): LegalDoc {
  return DOCS[kind][locale] ?? DOCS[kind].es;
}
