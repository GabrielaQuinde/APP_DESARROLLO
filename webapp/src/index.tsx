import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// API Routes
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'EducaApp API funcionando' })
})

// Serve static files manually for development
app.get('/app.js', (c) => {
  return c.text(`// EducaApp JavaScript will be embedded in HTML for development`)
})

app.get('/styles.css', (c) => {
  return c.text(`/* EducaApp CSS will be embedded in HTML for development */`)
})

// Main application route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>EducaApp - Aprende Jugando</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/styles.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'primary': '#FF6B6B',
                  'secondary': '#4ECDC4', 
                  'accent': '#45B7D1',
                  'warning': '#FFA726',
                  'success': '#66BB6A'
                },
                fontFamily: {
                  'comic': ['Comic Neue', 'Comic Sans MS', 'cursive'],
                  'child': ['Fredoka One', 'cursive']
                }
              }
            }
          }
        </script>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Comic Neue', 'Comic Sans MS', cursive;
            -webkit-user-select: none;
            user-select: none;
          }
          
          .bounce-in {
            animation: bounceIn 0.6s ease-out;
          }
          @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }
          
          .wiggle {
            animation: wiggle 2s ease-in-out infinite;
          }
          @keyframes wiggle {
            0%, 7% { transform: rotateZ(0); }
            15% { transform: rotateZ(-15deg); }
            20% { transform: rotateZ(10deg); }
            25% { transform: rotateZ(-10deg); }
            30% { transform: rotateZ(6deg); }
            35% { transform: rotateZ(-4deg); }
            40%, 100% { transform: rotateZ(0); }
          }
          
          .pulse-soft {
            animation: pulse-soft 3s ease-in-out infinite;
          }
          @keyframes pulse-soft {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .hover-lift:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          }

          /* Hacer botones más táctiles para niños */
          button {
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            outline: none;
          }

          button:hover {
            transform: scale(1.05);
          }

          button:active {
            transform: scale(0.95);
          }

          /* Mejoras visuales */
          .card-shadow {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }

          /* Responsivo para móviles */
          @media (max-width: 480px) {
            .grid-cols-2 > * {
              min-height: 120px;
            }
          }
        </style>
    </head>
    <body class="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 min-h-screen">
        <div id="app"></div>
        
        <script>
          // EducaApp - Version Embebida
          class EducaApp {
            constructor() {
              this.currentScreen = 'onboarding';
              this.currentUser = null;
              this.init();
            }

            init() {
              this.render();
            }

            navigateTo(screen) {
              this.currentScreen = screen;
              this.render();
            }

            render() {
              const app = document.getElementById('app');
              
              switch(this.currentScreen) {
                case 'onboarding':
                  app.innerHTML = this.renderOnboarding();
                  break;
                case 'login':
                  app.innerHTML = this.renderLogin();
                  break;
                case 'home':
                  app.innerHTML = this.renderHome();
                  break;
                default:
                  app.innerHTML = this.renderOnboarding();
              }
            }

            renderOnboarding() {
              return \`
                <div class="min-h-screen flex flex-col items-center justify-center p-6">
                  <div class="text-center max-w-md mx-auto">
                    <div class="bounce-in mb-8">
                      <div class="text-8xl mb-4 wiggle">🎓</div>
                      <h1 class="text-4xl font-child font-bold text-primary mb-2">EducaApp</h1>
                      <p class="text-xl text-gray-600 font-comic">¡Aprende jugando!</p>
                    </div>

                    <div class="bg-white rounded-3xl p-8 shadow-lg mb-8">
                      <div class="text-6xl mb-4">🎮</div>
                      <h2 class="text-2xl font-child font-bold text-accent mb-4">Aprende Jugando</h2>
                      <p class="text-lg text-gray-600 font-comic">Descubre las matemáticas y el lenguaje de forma divertida con juegos interactivos</p>
                    </div>

                    <button onclick="app.navigateTo('login')" class="w-full bg-primary text-white text-xl font-child font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-500 transform hover:scale-105 transition-all duration-200">
                      <i class="fas fa-play mr-2"></i>¡Empezar!
                    </button>
                  </div>
                </div>
              \`;
            }

            renderLogin() {
              return \`
                <div class="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col">
                  <div class="text-center pt-8 pb-6">
                    <div class="text-5xl mb-4">🎓</div>
                    <h1 class="text-3xl font-child font-bold text-primary">EducaApp</h1>
                  </div>

                  <div class="flex-1 p-6">
                    <div class="bg-white rounded-3xl p-8 shadow-lg max-w-md mx-auto">
                      <h2 class="text-2xl font-child font-bold text-center text-gray-800 mb-6">¿Quién eres?</h2>
                      
                      <div class="space-y-4">
                        <button onclick="app.loginStudent()" class="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                          <div class="flex items-center justify-center">
                            <div class="text-4xl mr-4">👦</div>
                            <div class="text-left">
                              <div class="text-xl font-child font-bold">Estudiante</div>
                              <div class="text-sm opacity-90">5-8 años</div>
                            </div>
                          </div>
                        </button>

                        <button onclick="alert('Funcionalidad en desarrollo')" class="w-full bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                          <div class="flex items-center justify-center">
                            <div class="text-4xl mr-4">👨‍👩‍👧‍👦</div>
                            <div class="text-left">
                              <div class="text-xl font-child font-bold">Padre/Tutor</div>
                              <div class="text-sm opacity-90">Control parental</div>
                            </div>
                          </div>
                        </button>

                        <button onclick="alert('Funcionalidad en desarrollo')" class="w-full bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                          <div class="flex items-center justify-center">
                            <div class="text-4xl mr-4">👩‍🏫</div>
                            <div class="text-left">
                              <div class="text-xl font-child font-bold">Docente</div>
                              <div class="text-sm opacity-90">Gestión de aula</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              \`;
            }

            renderHome() {
              return \`
                <div class="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100">
                  <div class="bg-white shadow-lg rounded-b-3xl p-6 mb-6">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="text-3xl mr-3">👦</div>
                        <div>
                          <h2 class="text-xl font-child font-bold text-gray-800">¡Hola Pequeño Explorador!</h2>
                          <div class="flex items-center">
                            <div class="text-yellow-400 mr-1">⭐</div>
                            <span class="text-sm font-comic text-gray-600">0 estrellas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="p-6">
                    <div class="grid grid-cols-2 gap-6 max-w-md mx-auto">
                      <button onclick="alert('¡Próximamente actividades de matemáticas!')" class="bg-blue-500 text-white p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200 pulse-soft">
                        <div class="text-5xl mb-4">📚</div>
                        <div class="text-xl font-child font-bold">Matemáticas</div>
                        <div class="text-sm opacity-90 mt-2">0 actividades</div>
                      </button>

                      <button onclick="alert('¡Próximamente actividades de lenguaje!')" class="bg-green-500 text-white p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200 pulse-soft">
                        <div class="text-5xl mb-4">📝</div>
                        <div class="text-xl font-child font-bold">Lenguaje</div>
                        <div class="text-sm opacity-90 mt-2">0 actividades</div>
                      </button>

                      <button onclick="alert('¡Aquí verás tu progreso!')" class="bg-purple-500 text-white p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200">
                        <div class="text-5xl mb-4">📊</div>
                        <div class="text-xl font-child font-bold">Mi Progreso</div>
                        <div class="text-sm opacity-90 mt-2">Ver logros</div>
                      </button>

                      <button onclick="alert('¡Personaliza tu perfil!')" class="bg-pink-500 text-white p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200">
                        <div class="text-5xl mb-4">👤</div>
                        <div class="text-xl font-child font-bold">Perfil</div>
                        <div class="text-sm opacity-90 mt-2">Mi cuenta</div>
                      </button>
                    </div>

                    <div class="mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 max-w-md mx-auto shadow-lg">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="text-2xl mb-2">🏆</div>
                          <h3 class="text-xl font-child font-bold text-white">Reto del Día</h3>
                          <p class="text-white opacity-90 font-comic">¡Completa 3 actividades!</p>
                        </div>
                        <div class="text-right">
                          <div class="text-2xl font-bold text-white">0/3</div>
                          <div class="text-sm text-white opacity-90">completado</div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6 text-center">
                      <button onclick="app.navigateTo('onboarding')" class="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-comic hover:bg-gray-300 transition-colors">
                        ← Volver al inicio
                      </button>
                    </div>
                  </div>
                </div>
              \`;
            }

            loginStudent() {
              this.currentUser = { name: 'Pequeño Explorador', avatar: '👦' };
              this.navigateTo('home');
            }
          }

          document.addEventListener('DOMContentLoaded', () => {
            window.app = new EducaApp();
          });
        </script>
    </body>
    </html>
  `)
})

export default app
