import { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

const MOTIVATIONAL_PHRASES = [
  "Tu bienestar es nuestro único propósito",
  "Estamos aquí para cuidar de tu paz mental",
  "Descansa. Nosotros nos encargamos del resto",
  "Tu tranquilidad es lo que más importa",
  "Deja que te apoyemos en este momento",
  "Aquí para servir a tu serenidad",
  "Tu mente merece este descanso que le damos",
  "Acompañándote hacia una mayor paz",
  "Nosotros llevamos la carga, tú disfrutas",
  "Tu bienestar nos importa profundamente",
  "Estamos a tu servicio, siempre",
  "Relájate. Te cuidamos con cuidado",
  "Tu tranquilidad es nuestra responsabilidad",
  "Somos tu aliado en el viaje hacia la calma",
  "Servidor de tu paz mental",
  "Aquí para hacer tu vida más fácil",
  "Tu descanso mental es nuestra misión",
  "Cuidándote desde el primer momento",
  "Nosotros pensamos para que tú respires",
  "Tu bienestar empieza ahora, con nosotros",
  "Apoyo constante para tu serenidad",
  "Simplemente descansa. Eso es lo importante",
  "Tu paz es nuestro compromiso",
  "Estamos contigo en cada paso del camino",
  "Tu bienestar es todo lo que necesitamos"
]

const PREDEFINED_QUESTIONS = {
  // 🍽️ Comida y Bebida
  "¿Qué comida pido?": ["Pizza", "Hamburguesa", "Tacos", "Sushi", "Pasta", "Pollo asado", "Comida Tailandesa", "Ceviche", "Ramen", "Curry", "Empanadas", "Shawarma", "Poke", "Kebab", "Dim sum"],
  "¿Qué desayuno?": ["Huevos y tostadas", "Avena con frutas", "Pancakes", "Yogur con granola", "Bagel con queso", "Smoothie bowl", "Omelet", "Cereal", "Tostadas francesas", "Granola casera", "Tostadas aguacate", "Claras revueltas", "Churros con café"],
  "¿Qué bebida tomo?": ["Café con leche", "Té verde", "Jugo natural", "Agua con limón", "Cerveza", "Vino", "Refresco", "Smoothie", "Agua de Jamaica", "Horchata", "Té chai", "Kombucha", "Matcha"],
  "¿Qué postre?": ["Helado", "Chocolate", "Tarta", "Fruta", "Brownies", "Flan", "Mousse", "Galletas", "Cheesecake", "Buñuelos", "Tiramisú", "Fresas con crema", "Sorbet"],
  "¿Qué snack como?": ["Papas fritas", "Almendras", "Frutas secas", "Popcorn", "Hummus con verduras", "Barras proteicas", "Chocolate", "Galletitas", "Nueces", "Palomitas", "Manzana", "Queso", "Cacahuetes"],
  "¿Qué comida rápida?": ["McDonald's", "Burguer King", "Subway", "Taco Bell", "Chipotle", "Popeyes", "KFC", "Wendy's", "In-N-Out", "Chick-fil-A", "Five Guys", "Panera", "Qdoba"],
  
  // 🎬 Entretenimiento y Ocio
  "¿Qué serie veo?": ["The Office", "Breaking Bad", "Stranger Things", "Game of Thrones", "Narcos", "The Crown", "Peaky Blinders", "Dark", "Ozark", "Mindhunter"],
  "¿Qué película veo?": ["Acción", "Comedia", "Drama", "Horror", "Ciencia Ficción", "Aventura", "Animé", "Documental", "Thriller", "Romántica"],
  "¿Qué videojuego juego?": ["FIFA", "Valorant", "Minecraft", "Fortnite", "Elden Ring", "Stardew Valley", "Among Us", "2K", "Call of Duty", "League of Legends"],
  "¿Qué música escucho?": ["Rock", "Pop", "Hip-hop", "Reggaeton", "Electrónica", "Jazz", "Clásica", "Indie", "Trap", "Bachata"],
  "¿Qué podcast escucho?": ["Crimen verdadero", "Desarrollo personal", "Humor", "Negocios", "Deportes", "Ciencia", "Historia", "Ficción", "Emprendimiento", "Filosofía"],
  "¿Qué libro leo?": ["Ficción", "No ficción", "Misterio", "Ciencia ficción", "Romance", "Autoayuda", "Negocios", "Biografía", "Fantasía", "Poesía"],
  "¿Qué actividad indoor?": ["Cine", "Museo", "Teatro", "Concierto", "Escape room", "Boliche", "Billar", "Videojuegos", "Leer", "Dibujar"],
  
  // 💼 Trabajo
  "¿Qué hago en mi descanso de trabajo?": ["Caminar", "Leer noticias", "Charlar con colegas", "Redes sociales", "Estudiar", "Meditar", "Comer algo", "Ver videos", "Estiramientos", "Meditación"],
  "¿Qué almuerzo en el trabajo?": ["Almuerzo casero", "Restaurante cercano", "Comida rápida", "Sandwiches", "Ensalada", "Comida del día", "Delivery", "Snack ligero", "Menú ejecutivo", "Buffet"],
  "¿Qué propuesta presento?": ["Proyecto A", "Proyecto B", "Idea innovadora", "Mejora de procesos", "Nueva estrategia", "Análisis de datos", "Plan de marketing", "Solución tech", "Reporte mensual", "Presentación final"],
  "¿Qué cursos hago?": ["Marketing digital", "Programación", "Idiomas", "Liderazgo", "Finanzas", "Diseño gráfico", "Gestión de proyectos", "Comunicación", "Excel avanzado", "Analytics"],
  "¿Cómo me visto para el trabajo?": ["Business formal", "Business casual", "Smart casual", "Casual", "Deportivo", "Semiformal", "Ejecutivo", "Creativo"],
  "¿Qué hago después del trabajo?": ["Ir al gimnasio", "Ir a casa", "Reunion social", "Cursos", "Compras", "Cine", "Paseo", "Trabajo freelance"],
  
  // 🏠 Casa
  "¿Qué hago hoy en casa?": ["Limpiar", "Cocinar", "Reparaciones menores", "Organizar", "Lavar ropa", "Descansar", "Proyectos DIY", "Decorar", "Jardinería", "Mantenimiento"],
  "¿Qué reparo?": ["Grifo que gotea", "Puerta ruidosa", "Pared dañada", "Electrodoméstico", "Mueble", "Ventana", "Pintura", "Tubería", "Cerradura", "Vidrio"],
  "¿Qué decoro?": ["Sala", "Dormitorio", "Cocina", "Baño", "Terraza", "Entrada", "Estudio", "Galería", "Pasillo", "Balcón"],
  "¿Qué compro para la casa?": ["Muebles", "Electrodomésticos", "Decoración", "Textiles", "Plantas", "Iluminación", "Organización", "Arte", "Adornos", "Cortinas"],
  "¿Qué limpiadoras uso?": ["Vinagre blanco", "Bicarbonato", "Productos comerciales", "Naturales caseros", "Desengrasante", "Desinfectante", "Limpiadores especializados", "Vapor", "Jabón natural", "Lejía"],
  "¿Qué planta cultivo?": ["Suculentas", "Hierbas aromáticas", "Flores", "Vegetales", "Frutas", "Árboles pequeños", "Helechos", "Orquídeas", "Cactus", "Enredaderas"],
  
  // 💪 Gimnasio y Deportes
  "¿Qué ejercicio hago?": ["Cardio", "Pesas", "Yoga", "Pilates", "HIIT", "Natación", "Boxeo", "Calistenia", "CrossFit", "Aeróbicos", "Danza", "Kick-boxing", "Treadmill", "Bicicleta estática"],
  "¿Qué deporte practico?": ["Fútbol", "Tenis", "Baloncesto", "Natación", "Ciclismo", "Running", "Senderismo", "Skateboarding", "Surfing", "Montañismo", "Volleyball", "Badminton", "Golf", "Squash"],
  "¿Qué grupo muscular entreno?": ["Pecho y tríceps", "Espalda y bíceps", "Piernas", "Hombros", "Core", "Full body", "Brazos", "Glúteos", "Trapecios", "Antebrazos", "Cuádriceps", "Pantorrillas", "Abdominales"],
  "¿Qué snack pre-entreno?": ["Plátano", "Avena", "Barritas proteicas", "Batido", "Almendras", "Dátiles", "Toast con miel", "Jugo natural", "Granola", "Huevo cocido", "Manzana", "Avena con miel", "Pan integral"],
  "¿Qué aplicación de fitness uso?": ["Mi Fit", "Strava", "Adidas Training", "Nike Training Club", "Fitbit", "MyFitnessPal", "Peloton", "Strong", "Zepp", "AllTrails"],
  "¿Qué tipo de entrenamiento?": ["Fuerza", "Resistencia", "Flexibilidad", "Equilibrio", "Velocidad", "Potencia", "Circuito", "Intervalos", "Funcional", "Isométrico"],
  "¿Dónde entreno?": ["Gimnasio", "Casa", "Parque", "Piscina", "Cancha", "Montaña", "Playa", "Studio especializado", "Aire libre", "En línea"],
  
  // 🚗 Conducción y Viajes
  "¿A dónde voy en auto?": ["Trabajo", "Supermercado", "Cine", "Casa de amigos", "Playa", "Montaña", "Centro comercial", "Gasolinera", "Hospital", "Escuela"],
  "¿Qué ruta tomo?": ["Ruta rápida", "Ruta segura", "Ruta panorámica", "Ruta con menos tráfico", "Ruta directa", "Ruta alternativa", "Ruta con menos peajes", "Ruta aventura", "Ruta económica", "Ruta larga"],
  "¿Qué escucho manejando?": ["Podcast", "Música", "Audiolibro", "Radio", "Llamadas", "Noticias", "Meditación guiada", "Comedia", "Stand-up", "Conversación"],
  "¿Dónde viajo este año?": ["Playa nacional", "Montaña", "Extranjero", "Ciudad histórica", "Spa resort", "Aventura extrema", "Viaje cultural", "Todo incluido", "Crucero", "Campamento"],
  "¿Qué aéreo tomo?": ["Vuelo matutino", "Vuelo vespertino", "Vuelo nocturno", "Primera clase", "Clase económica", "Vuelo directo", "Conexión", "Diferentes aerolíneas", "Budget", "Full service"],
  "¿Qué tipo de hospedaje?": ["Hotel de lujo", "Hotel económico", "Airbnb", "Hostel", "Resort", "Cabaña", "Camping", "Albergue", "Posada", "Mansión vacacional"],
  "¿Cómo viajo?": ["Auto", "Avión", "Tren", "Bus", "Barco", "Bicicleta", "Motocicleta", "Caminata", "Taxi", "Uber"],
  
  // ❓ Decisiones Personales
  "¿Qué hago este fin de semana?": ["Salir de fiesta", "Descansar en casa", "Hacer senderismo", "Ir de compras", "Visitar museos", "Viaje corto", "Cine y cena", "Actividades al aire libre", "Reunión familiar", "Proyecto personal"],
  "¿A quién llamo?": ["Mi mejor amigo", "Mi familia", "Mi pareja", "Un colega", "Mi terapeuta", "Mi mentor", "Grupo de amigos", "A casa", "Antiguo amigo", "Mi jefe"],
  "¿Qué regalo compro?": ["Técnica", "Experiencia", "Libro", "Ropa", "Accesorios", "Viaje", "Servicio", "Artesanía", "Skincare", "Deportivo"],
  "¿Qué habilidad aprendo?": ["Un idioma", "Programación", "Música", "Fotografía", "Cocina", "Artes marciales", "Dibujo", "Actuación", "Danza", "Escritura"],
  "¿Cuál es mi propósito hoy?": ["Ser productivo", "Relajarme", "Aprender algo nuevo", "Ayudar a otros", "Ejercitarme", "Crear algo", "Pasar tiempo con familia", "Meditación", "Reflexionar", "Disfrutar"],
  "¿Qué hago si llueve?": ["Ver películas", "Leer libros", "Jugar videojuegos", "Cocinar", "Actividades indoor", "Trabajar en proyectos", "Meditación", "Ejercicio en casa", "Dormir", "Artesanías"],
  "¿En qué invierto mi dinero?": ["Educación", "Experiencias", "Tecnología", "Casa", "Salud", "Negocios", "Fondos", "Hobbies", "Viajes", "Ahorros"],
  
  // 👕 Moda y Estilo
  "¿Qué me pongo?": ["Casual informal", "Business casual", "Deportivo", "Elegante", "Playa", "Montaña", "Fiesta", "Básico", "Trendy", "Cómodo"],
  "¿Qué color elijo?": ["Negro", "Blanco", "Azul", "Rojo", "Verde", "Gris", "Colores pasteles", "Estampados", "Multicolor", "Neutro"],
  "¿Qué accesorios uso?": ["Reloj", "Collar", "Anillo", "Pulsera", "Sombrero", "Cinturón", "Bolsa", "Zapatos especiales", "Gafas", "Bufanda"],
  "¿Qué peinado me hago?": ["Liso", "Ondulado", "Rizado", "Trenzas", "Moño", "Fleco", "Volumen", "Natural", "Degradado", "Color"],
  "¿Qué marca elijo?": ["Nike", "Adidas", "Puma", "Under Armour", "Zara", "H&M", "Gucci", "Versace", "Local", "Street wear"],
  
  // 🍳 Cocina y Recetas
  "¿Qué receta cocino?": ["Pasta", "Arroz", "Sopa", "Ensalada", "Carnes", "Pescado", "Vegetariano", "Fusion", "Mexicana", "Italiana"],
  "¿Qué debo acompañar?": ["Arroz blanco", "Papas", "Puré", "Pan", "Verduras", "Ensalada", "Legumbres", "Yuca", "Camote", "Quinoa"],
  "¿Qué postre preparo?": ["Brownies", "Cheesecake", "Tiramisú", "Fruta", "Batido", "Galletas", "Mousse", "Tarta", "Flan", "Crepes"],
  "¿Qué técnica de cocina uso?": ["Al horno", "Freír", "Hervir", "A la parrilla", "Al vapor", "Saltear", "Lento", "Microondas", "Placa", "Wok"],
  "¿Qué ingrediente destacado?": ["Pollo", "Carne roja", "Pescado", "Mariscos", "Vegetales", "Legumbres", "Granos", "Especias", "Queso", "Huevos"],
  "¿Qué tipo de cocina?": ["Mexicana", "Italiana", "Asiática", "Americana", "Española", "Francesa", "Peruana", "Fusión", "Vegana", "Mediterránea"],
  
  // 🏥 Salud y Bienestar
  "¿Qué ejercicio de relajación hago?": ["Meditación", "Yoga", "Respiración profunda", "Caminata", "Baño caliente", "Masaje", "Estiramiento", "Aromaterapia", "Tai Chi", "Mindfulness"],
  "¿Qué tomo para la salud?": ["Vitaminas", "Té de hierbas", "Agua con limón", "Bebida deportiva", "Batido proteico", "Suplementos", "Bebida energética", "Agua natural", "Jugo verde", "Bebida de colágeno"],
  "¿Dónde paso mis vacaciones de salud?": ["Spa", "Centro de yoga", "Sanatorio", "Retiro wellness", "Balneario", "Clínica holística", "Resort de salud", "Destino relajante", "Termas", "Centro zen"],
  "¿Qué rutina matinal sigo?": ["Meditación", "Ejercicio", "Desayuno saludable", "Hidratación", "Estiramientos", "Journaling", "Lectura", "Ducha fría", "Caminata", "Respiración"],
  "¿Qué hago para desestresarme?": ["Meditación", "Ejercicio", "Música", "Lectura", "Caminata", "Pet therapy", "Aromaterapia", "Masaje", "Baño", "Yoga"],
  
  // 🎓 Educación y Aprendizaje
  "¿Qué tema estudio?": ["Matemáticas", "Historia", "Inglés", "Programación", "Ciencias", "Negocios", "Arte", "Desarrollo personal", "Psicología", "Emprendimiento"],
  "¿Dónde estudio?": ["Casa", "Biblioteca", "Café", "Parque", "Escuela online", "Aula física", "Grupo de estudio", "Lugar nuevo", "Coworking", "Naturaleza"],
  "¿Qué recursos uso?": ["Libros", "Videos online", "Cursos", "Tutoriales", "Podcasts", "Aplicaciones", "Clases particulares", "Laboratorios", "Mentores", "Comunidades"],
  "¿Qué certificación busco?": ["Programación", "Idiomas", "Negocios", "Diseño", "Marketing", "Finanzas", "Producción", "Calidad", "Seguridad", "Especialización"],
  "¿Cómo aprendo mejor?": ["Visual", "Auditivo", "Kinestésico", "Lectura/escritura", "Práctico", "Teórico", "Grupal", "Individual", "Online", "Presencial"],
  
  // 🌙 Noche
  "¿Qué hago antes de dormir?": ["Leer", "Meditación", "Ver series", "Escribir diario", "Estiramientos", "Bebida relajante", "Música suave", "Respiro profundo", "Aromaterpia", "Baño caliente"],
  "¿A qué hora me duermo?": ["9:00 PM", "10:00 PM", "11:00 PM", "Medianoche", "1:00 AM", "Muy tarde", "Cuando tenga sueño", "Horario regular", "Temprano", "Flexible"],
  "¿Qué tipo de cama?": ["Firme", "Suave", "Ortopédica", "Memory foam", "Ajustable", "Tamaño doble", "Tamaño individual", "Tamaño king", "Con cabecera", "Plataforma"],
  
  // 🎉 Celebraciones
  "¿Cómo celebro mi cumpleaños?": ["Fiesta grande", "Cena íntima", "Viaje", "Actividad especial", "Con amigos", "Con familia", "Spa day", "Resto en casa", "Cena de gourmet", "Aventura"],
  "¿Qué regalos doy?": ["Experiencias", "Ropa", "Tecnología", "Libros", "Viajes", "Membresías", "Dinero", "Handmade", "Artesanías", "Servicios"],
  "¿Cómo celebro con amigos?": ["Fiesta", "Cena", "Viaje corto", "Juegos", "Karaoke", "Cine", "Picnic", "Deportes", "Reunión virtual", "Bar"],
  
  // 🌱 Vida Sostenible
  "¿Qué hago por el ambiente?": ["Reciclar", "Reducir plástico", "Energía limpia", "Transporte sostenible", "Compra local", "Compost", "Agua responsable", "Voluntariado", "Educación ambiental", "Bosques"],
  "¿Qué alternativa eco uso?": ["Bolsas reutilizables", "Botellas de vidrio", "Bambú", "Biodegradable", "Reciclado", "Orgánico", "Natural", "Vegano", "Zero waste", "Ecológico"],
  
  // 🎨 Creatividad
  "¿Qué proyecto creativo hago?": ["Pintura", "Escultura", "Fotografía", "Escritura", "Música", "Diseño", "Artesanía", "Poesía", "Cómic", "Vídeo"],
  "¿Qué medio artístico elijo?": ["Lápiz", "Pintura", "Digital", "Acuarela", "Óleo", "Grafito", "Pastel", "Tinta", "Collage", "Mixta"],
  "¿Dónde creo mi arte?": ["Casa", "Estudio", "Naturaleza", "Café", "Parque", "Online", "Galería", "Taller comunitario", "Biblioteca", "aire libre"],
  
  // 💻 Tecnología y Digital
  "¿Qué dispositivo uso?": ["Smartphone", "Laptop", "Tablet", "Smartwatch", "Desktop", "Consola gaming", "E-reader", "Auriculares", "Cámara", "Dron"],
  "¿Qué aplicación descargo?": ["Redes sociales", "Productividad", "Fitness", "Música", "Streaming", "Gaming", "Aprendizaje", "Viajes", "Compras", "Salud"],
  "¿Qué plataforma streaming?": ["Netflix", "Prime Video", "Disney+", "HBO Max", "Spotify", "YouTube Music", "Crunchyroll", "Twitch", "Apple TV", "Hulu"],
  
  // 🌍 Aventura
  "¿Qué actividad aventurera?": ["Paracaidismo", "Bungee jumping", "Tirolesa", "Senderismo extremo", "Espeleología", "Submarinismo", "Alpinismo", "Surf", "Skydiving", "Rafting"],
  "¿Qué experiencia vivo?": ["Voluntariado", "Intercambio cultural", "Retiro espiritual", "Acampada", "Road trip", "Hospedaje local", "Gastronomía local", "Festivales", "Trabajo temporal", "Nomadismo"],
}

function App() {
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [showPresets, setShowPresets] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [currentPhrase, setCurrentPhrase] = useState(MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)])
  const canvasRef = useRef(null)

  useEffect(() => {
    // Cambiar frase cada 8 segundos
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)])
    }, 8000)

    return () => clearInterval(phraseInterval)
  }, [])

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()))
    }
    
    // Detectar si ya está instalada como PWA
    const checkInstalled = () => {
      if (window.navigator.standalone === true) {
        setIsInstalled(true)
      }
      // Para navegadores que soportan manifest
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
      }
    }

    checkMobile()
    checkInstalled()

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      if (!isInstalled && !isMobile) {
        setShowInstallPrompt(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [isInstalled, isMobile])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
      setIsInstalled(true)
    }
  }

  const categories = {
    '🍽️ Comida y Bebida': ['¿Qué comida pido?', '¿Qué desayuno?', '¿Qué bebida tomo?', '¿Qué postre?', '¿Qué snack como?'],
    '🎬 Entretenimiento': ['¿Qué serie veo?', '¿Qué película veo?', '¿Qué videojuego juego?', '¿Qué música escucho?', '¿Qué podcast escucho?'],
    '💼 Trabajo': ['¿Qué hago en mi descanso de trabajo?', '¿Qué almuerzo en el trabajo?', '¿Qué propuesta presento?', '¿Qué cursos hago?'],
    '🏠 Casa': ['¿Qué hago hoy en casa?', '¿Qué reparo?', '¿Qué decoro?', '¿Qué compro para la casa?', '¿Qué limpiadores uso?'],
    '💪 Gimnasio': ['¿Qué ejercicio hago?', '¿Qué deporte practico?', '¿Qué grupo muscular entreno?', '¿Qué snack pre-entreno?', '¿Qué aplicación de fitness uso?'],
    '🚗 Conducción': ['¿A dónde voy en auto?', '¿Qué ruta tomo?', '¿Qué escucho manejando?', '¿Dónde viajo este año?', '¿Qué aéreo tomo?'],
    '✨ Vida Personal': ['¿Qué hago este fin de semana?', '¿A quién llamo?', '¿Qué regalo compro?', '¿Qué habilidad aprendo?', '¿Cuál es mi propósito hoy?'],
    '👕 Moda': ['¿Qué me pongo?', '¿Qué color elijo?', '¿Qué accesorios uso?', '¿Qué peinado me hago?'],
    '🍳 Cocina': ['¿Qué receta cocino?', '¿Qué debo acompañar?', '¿Qué postre preparo?', '¿Qué técnica de cocina uso?'],
    '🏥 Salud': ['¿Qué ejercicio de relajación hago?', '¿Qué tomo para la salud?', '¿Dónde paso mis vacaciones de salud?'],
    '🎓 Educación': ['¿Qué tema estudio?', '¿Dónde estudio?', '¿Qué recursos uso?'],
    '🌙 Noche': ['¿Qué hago antes de dormir?', '¿A qué hora me duermo?'],
  }

  const allQuestions = Object.keys(PREDEFINED_QUESTIONS)

  const filteredQuestions = allQuestions.filter(q => 
    q.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addOption = () => {
    if (inputValue.trim() !== '') {
      setOptions([...options, inputValue.trim()])
      setInputValue('')
    }
  }

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index))
    if (selectedOption === index) {
      setSelectedOption(null)
    }
  }

  const loadPredefinedQuestion = (question) => {
    const answers = PREDEFINED_QUESTIONS[question]
    setOptions(answers)
    setCurrentQuestion(question)
    setSelectedOption(null)
    setShowPresets(false)
    setSearchQuery('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addOption()
    }
  }

  const triggerConfetti = () => {
    if (typeof window !== 'undefined') {
      const canvas = document.createElement('canvas')
      canvas.style.position = 'fixed'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.pointerEvents = 'none'
      canvas.style.zIndex = '9999'
      document.body.appendChild(canvas)

      const ctx = confetti.create(canvas, { resize: true, useWorker: true })
      
      ctx({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#059669', '#047857', '#D1FAE5', '#A7F3D0', '#6EE7B7']
      })

      setTimeout(() => {
        document.body.removeChild(canvas)
      }, 3000)
    }
  }

  const makeDecision = () => {
    if (options.length === 0) return

    setIsAnimating(true)
    setSelectedOption(null)

    // Animación de selección rápida
    let current = 0
    const interval = setInterval(() => {
      current = Math.floor(Math.random() * options.length)
      setSelectedOption(current)
    }, 100)

    // Parar después de 1 segundo
    setTimeout(() => {
      clearInterval(interval)
      const finalSelection = Math.floor(Math.random() * options.length)
      setSelectedOption(finalSelection)
      triggerConfetti()
      setIsAnimating(false)
    }, 1000)
  }

  const clearAll = () => {
    setOptions([])
    setSelectedOption(null)
    setCurrentQuestion('')
    setInputValue('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${showSidebar && !isMobile ? 'lg:pr-0' : ''}`}>
          <div className="p-4 lg:p-12 h-full flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-6xl lg:text-8xl font-bold text-emerald-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Decide
                </h1>
                <p className="text-slate-600 text-lg mb-4">Tu aliado para tomar decisiones</p>
                
                {/* Motivational Phrase */}
                <div className="min-h-[3rem] flex items-center justify-center">
                  <p className="text-slate-700 text-sm italic px-4 py-2 rounded-lg bg-gradient-to-r from-green-200/40 to-emerald-200/40 border border-green-300/50 backdrop-blur-sm transition-opacity duration-700 animate-fade">
                    {currentPhrase}
                  </p>
                </div>
              </div>

              {/* Install Prompt */}
              {showInstallPrompt && !isInstalled && !isMobile && deferredPrompt && (
                <div className="fixed bottom-20 left-4 right-4 lg:left-auto lg:right-8 bg-green-100/60 rounded-xl p-4 border border-green-300/60 backdrop-blur-sm shadow-lg z-50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📱</span>
                      <p className="text-slate-700 text-sm font-medium">Instala en tu teléfono</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleInstallClick}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Instalar
                      </button>
                      <button
                        onClick={() => setShowInstallPrompt(false)}
                        className="px-3 py-2 bg-slate-200 text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Question */}
              {currentQuestion && (
                <div className="bg-gradient-to-r from-green-100/50 to-emerald-100/50 rounded-xl p-4 mb-6 border border-green-300/50 backdrop-blur-sm">
                  <p className="text-slate-600 text-xs uppercase tracking-widest mb-2">Pregunta seleccionada</p>
                  <p className="text-xl font-semibold text-emerald-900">{currentQuestion}</p>
                </div>
              )}

              {/* Input Section */}
              <div className="bg-white/60 rounded-2xl backdrop-blur-md p-6 mb-6 border border-green-200/60">
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Añade una opción..."
                    className="flex-1 px-4 py-3 rounded-xl bg-emerald-50/80 border border-green-300/50 text-emerald-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors text-sm"
                  />
                  <button
                    onClick={addOption}
                    className="px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-all font-semibold shadow-lg hover:shadow-emerald-700/50"
                  >
                    +
                  </button>
                </div>

                {/* Options List */}
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {options.length === 0 ? (
                    <p className="text-slate-500 text-center py-8 text-sm">Selecciona una pregunta o añade opciones</p>
                  ) : (
                    options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg flex items-center justify-between transition-all duration-200 ${
                          selectedOption === index
                            ? 'bg-gradient-to-r from-emerald-700 to-green-600 text-white shadow-lg shadow-emerald-700/30 scale-105'
                            : 'bg-emerald-100/60 text-emerald-900 border border-green-200/50 hover:border-green-400/70 hover:bg-emerald-100'
                        }`}
                      >
                        <span className="font-medium text-sm">{option}</span>
                        <button
                          onClick={() => removeOption(index)}
                          className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Decision Button */}
              {options.length > 0 && (
                <div className="flex flex-col gap-3 mb-6">
                  <button
                    onClick={makeDecision}
                    disabled={isAnimating}
                    className={`w-full text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 ${
                      isAnimating
                        ? 'bg-gradient-to-r from-emerald-700 to-green-600 scale-95'
                        : 'bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 hover:from-emerald-800 hover:via-green-700 hover:to-teal-700 hover:shadow-emerald-700/50 hover:scale-105'
                    }`}
                  >
                    {isAnimating ? '🎲 Decidiendo...' : '🎯 Decidir por mí'}
                  </button>
                  {options.length > 1 && (
                    <button
                      onClick={clearAll}
                      className="w-full px-6 py-2 bg-slate-200/60 text-slate-600 hover:text-slate-900 hover:bg-slate-300 border border-green-200/50 rounded-lg text-sm font-medium transition-all"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              )}

              {/* Result */}
              {selectedOption !== null && !isAnimating && (
                <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 rounded-2xl p-8 border border-green-300/60 backdrop-blur-md animate-bounce">
                  <div className="text-center">
                    <p className="text-slate-600 text-xs uppercase tracking-widest mb-3">Tu opción</p>
                    <p className="text-4xl font-bold text-emerald-800 mb-2">
                      {options[selectedOption]}
                    </p>
                    <p className="text-slate-600 text-sm">✨ Decisión tomada</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button - Desktop */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="hidden lg:flex fixed right-4 top-4 z-30 p-3 bg-white/70 border border-green-200/60 rounded-xl hover:bg-white/90 transition-colors text-slate-700 hover:text-emerald-800"
        >
          {showSidebar ? '✕' : '⚡'}
        </button>

        {/* Sidebar - Collapsible on Desktop, Toggle on Mobile */}
        <div
          className={`fixed lg:relative right-0 top-0 bottom-0 w-72 bg-white/90 border-l border-green-200/60 backdrop-blur-md overflow-hidden z-20 transition-transform duration-300 ${
            showSidebar ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="mb-6">
              <h2 className="text-emerald-900 font-bold text-lg mb-4 flex items-center gap-2">
                <span>⚡</span> Preguntas
              </h2>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-emerald-100/80 border border-green-300/50 text-emerald-900 text-sm placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="overflow-y-auto flex-1 space-y-4">
              {searchQuery ? (
                <>
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          loadPredefinedQuestion(question)
                          if (isMobile) setShowSidebar(false)
                        }}
                        className="w-full text-left p-3 rounded-lg bg-green-100/60 hover:bg-green-100/80 border border-green-300/50 text-emerald-800 text-xs font-medium transition-all hover:scale-105"
                      >
                        {question}
                      </button>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center text-xs py-6">No encontrado</p>
                  )}
                </>
              ) : (
                Object.entries(categories).map(([category, questions]) => (
                  <div key={category}>
                    <p className="text-xs font-bold text-emerald-800 mb-2 pl-1 uppercase tracking-wider">{category}</p>
                    <div className="space-y-1">
                      {questions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            loadPredefinedQuestion(question)
                            if (isMobile) setShowSidebar(false)
                          }}
                          className="w-full text-left p-2 rounded text-xs text-emerald-700 bg-emerald-100/50 hover:bg-emerald-100/80 border border-green-200/40 hover:border-green-400/60 transition-all font-medium line-clamp-2 hover:text-emerald-900"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-2xl transition-all hover:scale-110 font-bold text-lg"
        >
          ⚡
        </button>
      </div>
    </div>
  )
}

export default App
