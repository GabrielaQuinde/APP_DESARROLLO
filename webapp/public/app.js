// EducaApp - Aplicación Móvil Educativa para Niños de 5-8 años
// Sistema de navegación basado en Single Page Application (SPA)

class EducaApp {
    constructor() {
        this.currentScreen = 'onboarding';
        this.currentUser = null;
        this.userProgress = this.loadProgress();
        this.currentActivity = null;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    // Sistema de navegación
    navigateTo(screen, data = {}) {
        this.currentScreen = screen;
        if (data.user) this.currentUser = data.user;
        if (data.activity) this.currentActivity = data.activity;
        this.render();
    }

    // Renderizado principal
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
            case 'activities':
                app.innerHTML = this.renderActivities();
                break;
            case 'game':
                app.innerHTML = this.renderGame();
                break;
            case 'results':
                app.innerHTML = this.renderResults();
                break;
            case 'progress':
                app.innerHTML = this.renderProgress();
                break;
            case 'profile':
                app.innerHTML = this.renderProfile();
                break;
            case 'settings':
                app.innerHTML = this.renderSettings();
                break;
            case 'reports':
                app.innerHTML = this.renderReports();
                break;
            default:
                app.innerHTML = this.renderOnboarding();
        }
        
        this.setupScreenListeners();
    }

    // PANTALLA DE ONBOARDING
    renderOnboarding() {
        return `
            <div class="min-h-screen flex flex-col items-center justify-center p-6">
                <div class="text-center max-w-md mx-auto">
                    <!-- Logo y Título -->
                    <div class="bounce-in mb-8">
                        <div class="text-8xl mb-4 wiggle">🎓</div>
                        <h1 class="text-4xl font-child font-bold text-primary mb-2">EducaApp</h1>
                        <p class="text-xl text-gray-600 font-comic">¡Aprende jugando!</p>
                    </div>

                    <!-- Slides de Onboarding -->
                    <div id="onboarding-slides" class="mb-8">
                        <div class="slide active bg-white rounded-3xl p-8 shadow-lg">
                            <div class="text-6xl mb-4">🎮</div>
                            <h2 class="text-2xl font-child font-bold text-accent mb-4">Aprende Jugando</h2>
                            <p class="text-lg text-gray-600 font-comic">Descubre las matemáticas y el lenguaje de forma divertida con juegos interactivos</p>
                        </div>
                    </div>

                    <!-- Indicadores -->
                    <div class="flex justify-center space-x-2 mb-8">
                        <div class="w-3 h-3 rounded-full bg-primary"></div>
                        <div class="w-3 h-3 rounded-full bg-gray-300"></div>
                        <div class="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>

                    <!-- Botones -->
                    <div class="space-y-4">
                        <button onclick="app.nextSlide()" class="w-full bg-primary text-white text-xl font-child font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-500 transform hover:scale-105 transition-all duration-200">
                            <i class="fas fa-arrow-right mr-2"></i>Siguiente
                        </button>
                        <button onclick="app.navigateTo('login')" class="w-full text-primary text-lg font-comic underline">
                            Saltar introducción
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // PANTALLA DE LOGIN/REGISTRO
    renderLogin() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col">
                <!-- Header -->
                <div class="text-center pt-8 pb-6">
                    <div class="text-5xl mb-4">🎓</div>
                    <h1 class="text-3xl font-child font-bold text-primary">EducaApp</h1>
                </div>

                <!-- Tipo de Usuario -->
                <div class="flex-1 p-6">
                    <div class="bg-white rounded-3xl p-8 shadow-lg max-w-md mx-auto">
                        <h2 class="text-2xl font-child font-bold text-center text-gray-800 mb-6">¿Quién eres?</h2>
                        
                        <div class="space-y-4">
                            <!-- Estudiante -->
                            <button onclick="app.showStudentLogin()" class="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                                <div class="flex items-center justify-center">
                                    <div class="text-4xl mr-4">👦</div>
                                    <div class="text-left">
                                        <div class="text-xl font-child font-bold">Estudiante</div>
                                        <div class="text-sm opacity-90">5-8 años</div>
                                    </div>
                                </div>
                            </button>

                            <!-- Padre/Tutor -->
                            <button onclick="app.showParentLogin()" class="w-full bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
                                <div class="flex items-center justify-center">
                                    <div class="text-4xl mr-4">👨‍👩‍👧‍👦</div>
                                    <div class="text-left">
                                        <div class="text-xl font-child font-bold">Padre/Tutor</div>
                                        <div class="text-sm opacity-90">Control parental</div>
                                    </div>
                                </div>
                            </button>

                            <!-- Docente -->
                            <button onclick="app.showTeacherLogin()" class="w-full bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200">
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
        `;
    }

    // LOGIN ESPECÍFICO PARA ESTUDIANTES
    showStudentLogin() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
                <!-- Header con botón de regreso -->
                <div class="flex items-center p-6">
                    <button onclick="app.navigateTo('login')" class="text-3xl text-gray-600 mr-4">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h1 class="text-2xl font-child font-bold text-primary">Iniciar Sesión</h1>
                </div>

                <div class="flex-1 flex items-center justify-center p-6">
                    <div class="bg-white rounded-3xl p-8 shadow-lg max-w-sm mx-auto w-full">
                        <div class="text-center mb-8">
                            <div class="text-6xl mb-4">👦</div>
                            <h2 class="text-xl font-child font-bold text-gray-800">¡Hola pequeño!</h2>
                        </div>

                        <!-- Selector de Avatar -->
                        <div class="mb-6">
                            <p class="text-lg font-comic font-bold text-center mb-4">Elige tu avatar:</p>
                            <div class="grid grid-cols-3 gap-4">
                                <button onclick="app.selectAvatar('👦')" class="avatar-btn text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">👦</button>
                                <button onclick="app.selectAvatar('👧')" class="avatar-btn text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">👧</button>
                                <button onclick="app.selectAvatar('🐱')" class="avatar-btn text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐱</button>
                                <button onclick="app.selectAvatar('🐶')" class="avatar-btn text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐶</button>
                                <button onclick="app.selectAvatar('🦁')" class="avatar-btn text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🦁</button>
                                <button onclick="app.selectAvatar('🐸')" class="avatar-btn text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐸</button>
                            </div>
                        </div>

                        <!-- PIN de 4 dígitos -->
                        <div class="mb-6">
                            <p class="text-lg font-comic font-bold text-center mb-4">Tu PIN secreto:</p>
                            <div class="flex justify-center space-x-2">
                                <input type="password" maxlength="1" class="pin-input w-12 h-12 text-2xl text-center border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                                <input type="password" maxlength="1" class="pin-input w-12 h-12 text-2xl text-center border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                                <input type="password" maxlength="1" class="pin-input w-12 h-12 text-2xl text-center border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                                <input type="password" maxlength="1" class="pin-input w-12 h-12 text-2xl text-center border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                            </div>
                        </div>

                        <button onclick="app.loginStudent()" class="w-full bg-primary text-white text-xl font-child font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-500 transform hover:scale-105 transition-all duration-200">
                            <i class="fas fa-play mr-2"></i>¡A Jugar!
                        </button>
                    </div>
                </div>
            </div>
        `;
        this.setupPinInput();
    }

    // HOME/MENÚ PRINCIPAL
    renderHome() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100">
                <!-- Header -->
                <div class="bg-white shadow-lg rounded-b-3xl p-6 mb-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="text-3xl mr-3">${this.currentUser?.avatar || '👦'}</div>
                            <div>
                                <h2 class="text-xl font-child font-bold text-gray-800">¡Hola ${this.currentUser?.name || 'Pequeño'}!</h2>
                                <div class="flex items-center">
                                    <div class="text-yellow-400 mr-1">⭐</div>
                                    <span class="text-sm font-comic text-gray-600">${this.userProgress.stars || 0} estrellas</span>
                                </div>
                            </div>
                        </div>
                        <button onclick="app.navigateTo('profile')" class="text-2xl text-gray-600 hover:text-primary">
                            <i class="fas fa-cog"></i>
                        </button>
                    </div>
                </div>

                <!-- Menú Principal -->
                <div class="p-6">
                    <div class="grid grid-cols-2 gap-6 max-w-md mx-auto">
                        <!-- Matemáticas -->
                        <button onclick="app.navigateTo('activities', {subject: 'math'})" class="bg-blue-500 text-white p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200 pulse-soft">
                            <div class="text-5xl mb-4">📚</div>
                            <div class="text-xl font-child font-bold">Matemáticas</div>
                            <div class="text-sm opacity-90 mt-2">${this.getSubjectProgress('math')} actividades</div>
                        </button>

                        <!-- Lenguaje -->
                        <button onclick="app.navigateTo('activities', {subject: 'language'})" class="bg-green-500 text-white p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200 pulse-soft">
                            <div class="text-5xl mb-4">📝</div>
                            <div class="text-xl font-child font-bold">Lenguaje</div>
                            <div class="text-sm opacity-90 mt-2">${this.getSubjectProgress('language')} actividades</div>
                        </button>

                        <!-- Mi Progreso -->
                        <button onclick="app.navigateTo('progress')" class="bg-purple-500 text-white p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200">
                            <div class="text-5xl mb-4">📊</div>
                            <div class="text-xl font-child font-bold">Mi Progreso</div>
                            <div class="text-sm opacity-90 mt-2">Ver logros</div>
                        </button>

                        <!-- Perfil -->
                        <button onclick="app.navigateTo('profile')" class="bg-pink-500 text-white p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-200">
                            <div class="text-5xl mb-4">👤</div>
                            <div class="text-xl font-child font-bold">Perfil</div>
                            <div class="text-sm opacity-90 mt-2">Mi cuenta</div>
                        </button>
                    </div>

                    <!-- Reto del Día -->
                    <div class="mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 max-w-md mx-auto shadow-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-2xl mb-2">🏆</div>
                                <h3 class="text-xl font-child font-bold text-white">Reto del Día</h3>
                                <p class="text-white opacity-90 font-comic">¡Completa 3 actividades!</p>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-white">2/3</div>
                                <div class="text-sm text-white opacity-90">completado</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // SELECCIÓN DE ACTIVIDADES
    renderActivities() {
        const subject = this.currentActivity?.subject || 'math';
        const activities = this.getActivitiesBySubject(subject);
        const subjectInfo = {
            math: { name: 'Matemáticas', icon: '📚', color: 'blue' },
            language: { name: 'Lenguaje', icon: '📝', color: 'green' }
        };
        const info = subjectInfo[subject];

        return `
            <div class="min-h-screen bg-gradient-to-br from-${info.color}-100 to-${info.color}-200">
                <!-- Header -->
                <div class="bg-white shadow-lg rounded-b-3xl p-6 mb-6">
                    <div class="flex items-center">
                        <button onclick="app.navigateTo('home')" class="text-3xl text-gray-600 mr-4">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <div class="text-3xl mr-3">${info.icon}</div>
                        <div>
                            <h2 class="text-2xl font-child font-bold text-gray-800">${info.name}</h2>
                            <p class="text-sm text-gray-600 font-comic">Elige una actividad</p>
                        </div>
                    </div>
                </div>

                <!-- Lista de Actividades -->
                <div class="p-6">
                    <div class="space-y-4 max-w-md mx-auto">
                        ${activities.map(activity => `
                            <button onclick="app.startActivity('${activity.id}')" class="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${activity.completed ? 'border-2 border-green-400' : ''}">
                                <div class="flex items-center">
                                    <div class="text-4xl mr-4">${activity.icon}</div>
                                    <div class="flex-1 text-left">
                                        <h3 class="text-xl font-child font-bold text-gray-800">${activity.name}</h3>
                                        <p class="text-sm text-gray-600 font-comic">${activity.description}</p>
                                        <div class="flex items-center mt-2">
                                            <div class="flex text-yellow-400">
                                                ${Array.from({length: activity.difficulty}, () => '⭐').join('')}
                                            </div>
                                            <span class="ml-2 text-xs text-gray-500">Nivel ${activity.difficulty}</span>
                                            ${activity.completed ? '<span class="ml-2 text-xs text-green-600 font-bold">✓ Completado</span>' : ''}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // PANTALLA DE JUEGO/ACTIVIDAD
    renderGame() {
        const activity = this.getCurrentActivity();
        if (!activity) return this.renderHome();

        return `
            <div class="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
                <!-- Header de juego -->
                <div class="bg-white shadow-lg p-4">
                    <div class="flex items-center justify-between">
                        <button onclick="app.navigateTo('activities')" class="text-2xl text-gray-600">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="flex-1 text-center">
                            <h3 class="text-xl font-child font-bold text-gray-800">${activity.name}</h3>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-comic text-gray-600">Progreso</div>
                            <div class="text-lg font-bold text-primary">${activity.progress || 0}/10</div>
                        </div>
                    </div>
                    <!-- Barra de progreso -->
                    <div class="mt-3 bg-gray-200 rounded-full h-3">
                        <div class="bg-primary rounded-full h-3 transition-all duration-500" style="width: ${(activity.progress || 0) * 10}%"></div>
                    </div>
                </div>

                <!-- Área de juego -->
                <div class="flex-1 p-6">
                    ${this.renderGameContent(activity)}
                </div>

                <!-- Feedback área -->
                <div id="feedback" class="fixed bottom-4 left-4 right-4 z-50"></div>
            </div>
        `;
    }

    // CONTENIDO ESPECÍFICO DEL JUEGO
    renderGameContent(activity) {
        switch(activity.type) {
            case 'math-sum':
                return this.renderMathSumGame();
            case 'math-subtract':
                return this.renderMathSubtractGame();
            case 'language-syllables':
                return this.renderSyllablesGame();
            case 'language-reading':
                return this.renderReadingGame();
            default:
                return '<div class="text-center">Juego no implementado</div>';
        }
    }

    // JUEGO DE SUMAS
    renderMathSumGame() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;
        const options = this.generateMathOptions(correctAnswer);

        return `
            <div class="max-w-lg mx-auto">
                <!-- Problema -->
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center">
                    <div class="text-6xl font-bold text-primary mb-4">
                        ${num1} + ${num2} = ?
                    </div>
                    <p class="text-lg font-comic text-gray-600">¿Cuánto es la suma?</p>
                </div>

                <!-- Opciones de respuesta -->
                <div class="grid grid-cols-2 gap-4">
                    ${options.map(option => `
                        <button onclick="app.checkMathAnswer(${option}, ${correctAnswer})" class="math-option bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-center">
                            <div class="text-4xl font-bold text-gray-800">${option}</div>
                        </button>
                    `).join('')}
                </div>

                <!-- Ayuda visual -->
                <div class="mt-6 bg-white rounded-2xl p-4 shadow-lg">
                    <p class="text-center font-comic text-gray-600 mb-4">¡Cuenta conmigo!</p>
                    <div class="flex justify-center space-x-4">
                        <div class="flex space-x-1">
                            ${Array.from({length: num1}, (_, i) => '<div class="w-6 h-6 bg-blue-400 rounded-full"></div>').join('')}
                        </div>
                        <div class="text-2xl font-bold text-gray-600">+</div>
                        <div class="flex space-x-1">
                            ${Array.from({length: num2}, (_, i) => '<div class="w-6 h-6 bg-red-400 rounded-full"></div>').join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // JUEGO DE SÍLABAS
    renderSyllablesGame() {
        const words = ['gato', 'perro', 'casa', 'mesa', 'árbol'];
        const currentWord = words[Math.floor(Math.random() * words.length)];
        const syllables = this.getSyllables(currentWord);
        const shuffledSyllables = [...syllables].sort(() => Math.random() - 0.5);

        return `
            <div class="max-w-lg mx-auto">
                <!-- Imagen de la palabra -->
                <div class="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center">
                    <div class="text-8xl mb-4">${this.getWordEmoji(currentWord)}</div>
                    <p class="text-xl font-comic text-gray-600">Forma la palabra arrastrando las sílabas</p>
                </div>

                <!-- Área de construcción -->
                <div class="bg-white rounded-2xl p-6 shadow-lg mb-6">
                    <div id="word-construction" class="flex justify-center space-x-2 min-h-16 border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <!-- Las sílabas se arrastrarán aquí -->
                    </div>
                </div>

                <!-- Sílabas disponibles -->
                <div class="grid grid-cols-2 gap-4">
                    ${shuffledSyllables.map((syllable, index) => `
                        <div draggable="true" ondragstart="app.dragStart(event)" data-syllable="${syllable}" class="syllable-item bg-yellow-200 rounded-2xl p-4 shadow-lg text-center cursor-move hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                            <div class="text-2xl font-child font-bold text-gray-800">${syllable}</div>
                        </div>
                    `).join('')}
                </div>

                <button onclick="app.checkSyllableWord('${currentWord}')" class="w-full mt-6 bg-green-500 text-white text-xl font-child font-bold py-4 px-8 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200">
                    ¡Verificar!
                </button>
            </div>
        `;
    }

    // PANTALLA DE RESULTADOS
    renderResults() {
        const results = this.currentActivity?.results || { correct: 8, total: 10, time: 120 };
        const percentage = Math.round((results.correct / results.total) * 100);
        const stars = this.calculateStars(percentage);

        return `
            <div class="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center p-6">
                <div class="bg-white rounded-3xl p-8 shadow-lg max-w-sm mx-auto text-center">
                    <!-- Animación de resultado -->
                    <div class="bounce-in mb-6">
                        ${percentage >= 80 ? 
                            '<div class="text-8xl mb-4">🎉</div><h2 class="text-3xl font-child font-bold text-green-600">¡Excelente!</h2>' :
                            percentage >= 60 ?
                            '<div class="text-8xl mb-4">👍</div><h2 class="text-3xl font-child font-bold text-blue-600">¡Muy bien!</h2>' :
                            '<div class="text-8xl mb-4">💪</div><h2 class="text-3xl font-child font-bold text-orange-600">¡Sigue intentando!</h2>'
                        }
                    </div>

                    <!-- Estadísticas -->
                    <div class="space-y-4 mb-8">
                        <div class="bg-gray-50 rounded-2xl p-4">
                            <div class="text-lg font-comic text-gray-600">Respuestas correctas</div>
                            <div class="text-3xl font-bold text-green-600">${results.correct}/${results.total}</div>
                        </div>

                        <div class="bg-gray-50 rounded-2xl p-4">
                            <div class="text-lg font-comic text-gray-600">Tiempo</div>
                            <div class="text-2xl font-bold text-blue-600">${Math.floor(results.time / 60)}:${(results.time % 60).toString().padStart(2, '0')}</div>
                        </div>

                        <!-- Estrellas ganadas -->
                        <div class="bg-yellow-50 rounded-2xl p-4">
                            <div class="text-lg font-comic text-gray-600">Estrellas ganadas</div>
                            <div class="text-4xl">
                                ${Array.from({length: stars}, () => '⭐').join('')}
                                ${Array.from({length: 3 - stars}, () => '☆').join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="space-y-4">
                        <button onclick="app.restartActivity()" class="w-full bg-blue-500 text-white text-xl font-child font-bold py-4 px-8 rounded-full shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200">
                            <i class="fas fa-redo mr-2"></i>Intentar de nuevo
                        </button>
                        <button onclick="app.navigateTo('activities')" class="w-full bg-green-500 text-white text-xl font-child font-bold py-4 px-8 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200">
                            <i class="fas fa-forward mr-2"></i>Siguiente actividad
                        </button>
                        <button onclick="app.navigateTo('home')" class="w-full text-gray-600 font-comic underline">
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // PANTALLA DE PROGRESO
    renderProgress() {
        const progress = this.userProgress;
        
        return `
            <div class="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
                <!-- Header -->
                <div class="bg-white shadow-lg rounded-b-3xl p-6 mb-6">
                    <div class="flex items-center">
                        <button onclick="app.navigateTo('home')" class="text-3xl text-gray-600 mr-4">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <div class="text-3xl mr-3">📊</div>
                        <h2 class="text-2xl font-child font-bold text-gray-800">Mi Progreso</h2>
                    </div>
                </div>

                <div class="p-6">
                    <!-- Estadísticas generales -->
                    <div class="bg-white rounded-3xl p-6 shadow-lg mb-6">
                        <h3 class="text-xl font-child font-bold text-gray-800 mb-4 text-center">Resumen General</h3>
                        
                        <div class="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div class="text-3xl font-bold text-yellow-500">${progress.stars || 0}</div>
                                <div class="text-sm font-comic text-gray-600">Estrellas</div>
                            </div>
                            <div>
                                <div class="text-3xl font-bold text-blue-500">${progress.activitiesCompleted || 0}</div>
                                <div class="text-sm font-comic text-gray-600">Actividades</div>
                            </div>
                            <div>
                                <div class="text-3xl font-bold text-green-500">${progress.streak || 0}</div>
                                <div class="text-sm font-comic text-gray-600">Días seguidos</div>
                            </div>
                        </div>
                    </div>

                    <!-- Progreso por materia -->
                    <div class="space-y-4 mb-6">
                        <!-- Matemáticas -->
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center">
                                    <div class="text-2xl mr-3">📚</div>
                                    <span class="text-lg font-child font-bold">Matemáticas</span>
                                </div>
                                <span class="text-sm font-comic text-gray-600">${progress.math?.completed || 0}/12 actividades</span>
                            </div>
                            <div class="bg-gray-200 rounded-full h-4">
                                <div class="bg-blue-500 rounded-full h-4 transition-all duration-500" style="width: ${((progress.math?.completed || 0) / 12) * 100}%"></div>
                            </div>
                        </div>

                        <!-- Lenguaje -->
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center">
                                    <div class="text-2xl mr-3">📝</div>
                                    <span class="text-lg font-child font-bold">Lenguaje</span>
                                </div>
                                <span class="text-sm font-comic text-gray-600">${progress.language?.completed || 0}/10 actividades</span>
                            </div>
                            <div class="bg-gray-200 rounded-full h-4">
                                <div class="bg-green-500 rounded-full h-4 transition-all duration-500" style="width: ${((progress.language?.completed || 0) / 10) * 100}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Logros y medallas -->
                    <div class="bg-white rounded-3xl p-6 shadow-lg">
                        <h3 class="text-xl font-child font-bold text-gray-800 mb-4 text-center">Mis Logros</h3>
                        
                        <div class="grid grid-cols-3 gap-4">
                            <div class="text-center ${progress.achievements?.firstActivity ? 'opacity-100' : 'opacity-30'}">
                                <div class="text-3xl mb-2">🏆</div>
                                <div class="text-xs font-comic text-gray-600">Primera actividad</div>
                            </div>
                            <div class="text-center ${progress.achievements?.mathExpert ? 'opacity-100' : 'opacity-30'}">
                                <div class="text-3xl mb-2">🧮</div>
                                <div class="text-xs font-comic text-gray-600">Experto en mates</div>
                            </div>
                            <div class="text-center ${progress.achievements?.readingChamp ? 'opacity-100' : 'opacity-30'}">
                                <div class="text-3xl mb-2">📖</div>
                                <div class="text-xs font-comic text-gray-600">Campeón lector</div>
                            </div>
                            <div class="text-center ${progress.achievements?.weekStreak ? 'opacity-100' : 'opacity-30'}">
                                <div class="text-3xl mb-2">🔥</div>
                                <div class="text-xs font-comic text-gray-600">7 días seguidos</div>
                            </div>
                            <div class="text-center ${progress.achievements?.perfectScore ? 'opacity-100' : 'opacity-30'}">
                                <div class="text-3xl mb-2">⭐</div>
                                <div class="text-xs font-comic text-gray-600">Puntuación perfecta</div>
                            </div>
                            <div class="text-center ${progress.achievements?.speedDemon ? 'opacity-100' : 'opacity-30'}">
                                <div class="text-3xl mb-2">⚡</div>
                                <div class="text-xs font-comic text-gray-600">Súper rápido</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // PANTALLA DE PERFIL
    renderProfile() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
                <!-- Header -->
                <div class="bg-white shadow-lg rounded-b-3xl p-6 mb-6">
                    <div class="flex items-center">
                        <button onclick="app.navigateTo('home')" class="text-3xl text-gray-600 mr-4">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <div class="text-3xl mr-3">👤</div>
                        <h2 class="text-2xl font-child font-bold text-gray-800">Mi Perfil</h2>
                    </div>
                </div>

                <div class="p-6">
                    <!-- Información del usuario -->
                    <div class="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center">
                        <div class="text-6xl mb-4">${this.currentUser?.avatar || '👦'}</div>
                        <h3 class="text-2xl font-child font-bold text-gray-800 mb-2">${this.currentUser?.name || 'Mi Nombre'}</h3>
                        <div class="flex justify-center items-center space-x-4 text-sm font-comic text-gray-600">
                            <div>⭐ ${this.userProgress.stars || 0} estrellas</div>
                            <div>🏆 Nivel ${this.getUserLevel()}</div>
                        </div>
                        
                        <button onclick="app.showAvatarSelection()" class="mt-4 bg-primary text-white px-6 py-2 rounded-full font-comic hover:bg-red-500 transition-colors">
                            Cambiar avatar
                        </button>
                    </div>

                    <!-- Opciones del perfil -->
                    <div class="space-y-4">
                        <!-- Configuración -->
                        <button onclick="app.navigateTo('settings')" class="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center">
                            <div class="text-3xl mr-4">⚙️</div>
                            <div class="text-left flex-1">
                                <div class="text-lg font-child font-bold text-gray-800">Configuración</div>
                                <div class="text-sm text-gray-600 font-comic">Sonidos, idioma y más</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>

                        <!-- Mis Logros -->
                        <button onclick="app.showAchievements()" class="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center">
                            <div class="text-3xl mr-4">🏆</div>
                            <div class="text-left flex-1">
                                <div class="text-lg font-child font-bold text-gray-800">Mis Logros</div>
                                <div class="text-sm text-gray-600 font-comic">Ver todas las medallas</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>

                        <!-- Ayuda -->
                        <button onclick="app.showHelp()" class="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center">
                            <div class="text-3xl mr-4">❓</div>
                            <div class="text-left flex-1">
                                <div class="text-lg font-child font-bold text-gray-800">Ayuda</div>
                                <div class="text-sm text-gray-600 font-comic">¿Necesitas ayuda?</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>

                        <!-- Cerrar Sesión -->
                        <button onclick="app.logout()" class="w-full bg-red-50 border-2 border-red-200 rounded-2xl p-6 hover:bg-red-100 transition-all duration-200 flex items-center justify-center">
                            <div class="text-2xl mr-3">👋</div>
                            <div class="text-lg font-child font-bold text-red-600">Cerrar Sesión</div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // PANTALLA DE CONFIGURACIÓN/AJUSTES
    renderSettings() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
                <!-- Header -->
                <div class="bg-white shadow-lg rounded-b-3xl p-6 mb-6">
                    <div class="flex items-center">
                        <button onclick="app.navigateTo('profile')" class="text-3xl text-gray-600 mr-4">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <div class="text-3xl mr-3">⚙️</div>
                        <h2 class="text-2xl font-child font-bold text-gray-800">Configuración</h2>
                    </div>
                </div>

                <div class="p-6 space-y-4">
                    <!-- Sonido -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="text-2xl mr-4">🔊</div>
                                <div>
                                    <div class="text-lg font-child font-bold text-gray-800">Sonido</div>
                                    <div class="text-sm text-gray-600 font-comic">Efectos de sonido y música</div>
                                </div>
                            </div>
                            <button onclick="app.toggleSound()" class="toggle-btn bg-green-500 w-12 h-6 rounded-full relative">
                                <div class="toggle-circle bg-white w-5 h-5 rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                            </button>
                        </div>
                    </div>

                    <!-- Idioma -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="text-2xl mr-4">🌍</div>
                                <div>
                                    <div class="text-lg font-child font-bold text-gray-800">Idioma</div>
                                    <div class="text-sm text-gray-600 font-comic">Español (Perú)</div>
                                </div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    </div>

                    <!-- Accesibilidad -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 class="text-lg font-child font-bold text-gray-800 mb-4">Accesibilidad</h3>
                        
                        <!-- Texto grande -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <div class="text-xl mr-3">🔤</div>
                                <span class="font-comic text-gray-700">Texto grande</span>
                            </div>
                            <button onclick="app.toggleLargeText()" class="toggle-btn bg-gray-300 w-12 h-6 rounded-full relative">
                                <div class="toggle-circle bg-white w-5 h-5 rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                            </button>
                        </div>

                        <!-- Modo voz -->
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <div class="text-xl mr-3">🎤</div>
                                <span class="font-comic text-gray-700">Modo voz</span>
                            </div>
                            <button onclick="app.toggleVoiceMode()" class="toggle-btn bg-gray-300 w-12 h-6 rounded-full relative">
                                <div class="toggle-circle bg-white w-5 h-5 rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                            </button>
                        </div>

                        <!-- Alto contraste -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="text-xl mr-3">🌓</div>
                                <span class="font-comic text-gray-700">Alto contraste</span>
                            </div>
                            <button onclick="app.toggleHighContrast()" class="toggle-btn bg-gray-300 w-12 h-6 rounded-full relative">
                                <div class="toggle-circle bg-white w-5 h-5 rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                            </button>
                        </div>
                    </div>

                    <!-- Control parental (solo si es padre/docente) -->
                    ${this.currentUser?.type !== 'student' ? `
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 class="text-lg font-child font-bold text-gray-800 mb-4">Control Parental</h3>
                        
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="font-comic text-gray-700">Tiempo máximo diario</span>
                                <select class="bg-gray-100 rounded-lg px-3 py-2 font-comic">
                                    <option>30 min</option>
                                    <option selected>60 min</option>
                                    <option>90 min</option>
                                    <option>120 min</option>
                                </select>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <span class="font-comic text-gray-700">Dificultad automática</span>
                                <button class="toggle-btn bg-green-500 w-12 h-6 rounded-full relative">
                                    <div class="toggle-circle bg-white w-5 h-5 rounded-full absolute top-0.5 right-0.5"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // PANTALLA DE REPORTES (Para Docentes)
    renderReports() {
        return `
            <div class="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
                <!-- Header -->
                <div class="bg-white shadow-lg rounded-b-3xl p-6 mb-6">
                    <div class="flex items-center">
                        <button onclick="app.navigateTo('home')" class="text-3xl text-gray-600 mr-4">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <div class="text-3xl mr-3">📊</div>
                        <h2 class="text-2xl font-child font-bold text-gray-800">Reportes de Clase</h2>
                    </div>
                </div>

                <div class="p-6 space-y-6">
                    <!-- Resumen general -->
                    <div class="bg-white rounded-3xl p-6 shadow-lg">
                        <h3 class="text-xl font-child font-bold text-gray-800 mb-4">Resumen del Aula</h3>
                        
                        <div class="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-blue-600">24</div>
                                <div class="text-sm font-comic text-gray-600">Estudiantes</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-green-600">87%</div>
                                <div class="text-sm font-comic text-gray-600">Promedio</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-purple-600">156</div>
                                <div class="text-sm font-comic text-gray-600">Actividades</div>
                            </div>
                        </div>
                    </div>

                    <!-- Estudiantes destacados -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 class="text-lg font-child font-bold text-gray-800 mb-4">Estudiantes Destacados</h3>
                        
                        <div class="space-y-3">
                            ${this.getTopStudents().map((student, index) => `
                                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div class="flex items-center">
                                        <div class="text-xl mr-3">${['🥇', '🥈', '🥉'][index] || '🏆'}</div>
                                        <div>
                                            <div class="font-child font-bold text-gray-800">${student.name}</div>
                                            <div class="text-sm font-comic text-gray-600">${student.stars} estrellas</div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-sm font-bold text-green-600">${student.score}%</div>
                                        <div class="text-xs text-gray-500">${student.activities} actividades</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Áreas de dificultad -->
                    <div class="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 class="text-lg font-child font-bold text-gray-800 mb-4">Áreas que Necesitan Atención</h3>
                        
                        <div class="space-y-3">
                            <div class="p-3 bg-red-50 rounded-xl border-l-4 border-red-400">
                                <div class="font-child font-bold text-red-700">Restas con llevadas</div>
                                <div class="text-sm font-comic text-red-600">67% de acierto promedio</div>
                            </div>
                            
                            <div class="p-3 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
                                <div class="font-child font-bold text-yellow-700">Sílabas complejas</div>
                                <div class="text-sm font-comic text-yellow-600">72% de acierto promedio</div>
                            </div>
                        </div>
                    </div>

                    <!-- Botones de acción -->
                    <div class="space-y-3">
                        <button onclick="app.exportReport()" class="w-full bg-blue-500 text-white text-lg font-child font-bold py-4 px-6 rounded-2xl shadow-lg hover:bg-blue-600 transition-colors">
                            <i class="fas fa-download mr-2"></i>Exportar Reporte
                        </button>
                        
                        <button onclick="app.sendReportToParents()" class="w-full bg-green-500 text-white text-lg font-child font-bold py-4 px-6 rounded-2xl shadow-lg hover:bg-green-600 transition-colors">
                            <i class="fas fa-envelope mr-2"></i>Enviar a Padres
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // FUNCIONES DE UTILIDAD Y EVENTOS

    setupEventListeners() {
        // Configurar eventos globales
        document.addEventListener('dragover', (e) => e.preventDefault());
        document.addEventListener('drop', (e) => e.preventDefault());
    }

    setupScreenListeners() {
        // Configurar eventos específicos de la pantalla actual
        if (this.currentScreen === 'game') {
            this.setupGameListeners();
        }
    }

    setupGameListeners() {
        // Configurar drag and drop para juegos
        const dropZone = document.getElementById('word-construction');
        if (dropZone) {
            dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
            dropZone.addEventListener('drop', this.handleDrop.bind(this));
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const syllable = e.dataTransfer.getData('text/plain');
        const syllableDiv = document.createElement('div');
        syllableDiv.className = 'syllable-placed bg-green-200 rounded-lg p-2 m-1 font-child font-bold';
        syllableDiv.textContent = syllable;
        e.currentTarget.appendChild(syllableDiv);
    }

    dragStart(e) {
        const syllable = e.target.dataset.syllable;
        e.dataTransfer.setData('text/plain', syllable);
        e.target.classList.add('dragging');
    }

    // Funciones de configuración
    toggleSound() {
        // Implementar toggle de sonido
        console.log('Toggle sound');
    }

    toggleLargeText() {
        document.body.classList.toggle('large-text');
    }

    toggleVoiceMode() {
        // Implementar modo voz
        console.log('Toggle voice mode');
    }

    toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
    }

    // Funciones para docentes
    getTopStudents() {
        return [
            { name: 'María García', stars: 45, score: 94, activities: 28 },
            { name: 'Carlos López', stars: 42, score: 91, activities: 26 },
            { name: 'Ana Rodríguez', stars: 38, score: 88, activities: 25 },
            { name: 'Luis Mendoza', stars: 36, score: 85, activities: 24 }
        ];
    }

    exportReport() {
        // Simular exportación de reporte
        alert('Reporte exportado correctamente');
    }

    sendReportToParents() {
        // Simular envío de reportes a padres
        alert('Reportes enviados a los padres');
    }

    // Funciones adicionales de perfil
    showAvatarSelection() {
        const app = document.getElementById('app');
        const avatarsGrid = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-3xl p-8 m-6 max-w-sm w-full">
                    <h3 class="text-xl font-child font-bold text-center mb-6">Elige tu nuevo avatar</h3>
                    
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <button onclick="app.changeAvatar('👦')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">👦</button>
                        <button onclick="app.changeAvatar('👧')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">👧</button>
                        <button onclick="app.changeAvatar('🐱')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐱</button>
                        <button onclick="app.changeAvatar('🐶')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐶</button>
                        <button onclick="app.changeAvatar('🦁')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🦁</button>
                        <button onclick="app.changeAvatar('🐸')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐸</button>
                        <button onclick="app.changeAvatar('🐰')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐰</button>
                        <button onclick="app.changeAvatar('🐼')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐼</button>
                        <button onclick="app.changeAvatar('🐯')" class="avatar-option text-4xl p-4 rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-pink-50">🐯</button>
                    </div>
                    
                    <button onclick="app.render()" class="w-full bg-gray-300 text-gray-700 text-lg font-child font-bold py-3 px-6 rounded-2xl">
                        Cancelar
                    </button>
                </div>
            </div>
        `;
        
        app.insertAdjacentHTML('beforeend', avatarsGrid);
    }

    changeAvatar(newAvatar) {
        if (this.currentUser) {
            this.currentUser.avatar = newAvatar;
            this.saveUserData();
        }
        this.render();
    }

    showAchievements() {
        // Mostrar pantalla completa de logros
        this.navigateTo('achievements');
    }

    showHelp() {
        const app = document.getElementById('app');
        const helpModal = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-3xl p-8 m-6 max-w-md w-full">
                    <h3 class="text-xl font-child font-bold text-center mb-6">¿Necesitas ayuda?</h3>
                    
                    <div class="space-y-4 mb-6">
                        <div class="text-center">
                            <div class="text-4xl mb-2">🎮</div>
                            <p class="font-comic text-gray-700">Toca los botones grandes para jugar</p>
                        </div>
                        
                        <div class="text-center">
                            <div class="text-4xl mb-2">⭐</div>
                            <p class="font-comic text-gray-700">Gana estrellas completando actividades</p>
                        </div>
                        
                        <div class="text-center">
                            <div class="text-4xl mb-2">🏆</div>
                            <p class="font-comic text-gray-700">Desbloquea logros y medallas</p>
                        </div>
                    </div>
                    
                    <button onclick="app.render()" class="w-full bg-primary text-white text-lg font-child font-bold py-3 px-6 rounded-2xl">
                        ¡Entendido!
                    </button>
                </div>
            </div>
        `;
        
        app.insertAdjacentHTML('beforeend', helpModal);
    }

    saveUserData() {
        // Guardar datos del usuario
        localStorage.setItem('educaapp_user', JSON.stringify(this.currentUser));
    }

    setupPinInput() {
        const inputs = document.querySelectorAll('.pin-input');
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    }

    selectAvatar(avatar) {
        document.querySelectorAll('.avatar-btn').forEach(btn => {
            btn.classList.remove('border-primary', 'bg-pink-50');
            btn.classList.add('border-gray-200');
        });
        
        event.target.classList.add('border-primary', 'bg-pink-50');
        event.target.classList.remove('border-gray-200');
        
        if (!this.currentUser) this.currentUser = {};
        this.currentUser.avatar = avatar;
    }

    loginStudent() {
        // Simular login exitoso
        if (!this.currentUser) this.currentUser = {};
        this.currentUser.name = 'Pequeño Explorador';
        this.currentUser.type = 'student';
        this.navigateTo('home');
    }

    showParentLogin() {
        // Implementar login para padres
        console.log('Login de padres');
    }

    showTeacherLogin() {
        // Implementar login para docentes
        console.log('Login de docentes');
    }

    nextSlide() {
        // Implementar navegación de slides de onboarding
        const slides = [
            {
                emoji: '🎮',
                title: 'Aprende Jugando',
                description: 'Descubre las matemáticas y el lenguaje de forma divertida con juegos interactivos'
            },
            {
                emoji: '📚',
                title: 'Matemáticas y Lenguaje',
                description: 'Practica sumas, restas, sílabas y lectura con actividades diseñadas para tu edad'
            },
            {
                emoji: '⭐',
                title: 'Gana Estrellas',
                description: '¡Completa actividades y gana estrellas para desbloquear nuevos logros!'
            }
        ];

        // Por simplicidad, vamos directo al login después del primer slide
        this.navigateTo('login');
    }

    getSubjectProgress(subject) {
        const progress = this.userProgress[subject];
        if (!progress) return '0';
        return `${progress.completed || 0}/${progress.total || 12}`;
    }

    getActivitiesBySubject(subject) {
        if (subject === 'math') {
            return [
                { id: 'math-sum-1', name: 'Sumas Fáciles', description: 'Números del 1 al 10', icon: '➕', difficulty: 1, type: 'math-sum', completed: false },
                { id: 'math-sum-2', name: 'Sumas Medianas', description: 'Números del 1 al 20', icon: '➕', difficulty: 2, type: 'math-sum', completed: false },
                { id: 'math-subtract-1', name: 'Restas Fáciles', description: 'Números del 1 al 10', icon: '➖', difficulty: 1, type: 'math-subtract', completed: false },
                { id: 'math-subtract-2', name: 'Restas Medianas', description: 'Números del 1 al 20', icon: '➖', difficulty: 2, type: 'math-subtract', completed: false }
            ];
        } else {
            return [
                { id: 'lang-syllables-1', name: 'Sílabas Simples', description: 'Palabras de 2 sílabas', icon: '🔤', difficulty: 1, type: 'language-syllables', completed: false },
                { id: 'lang-syllables-2', name: 'Sílabas Complejas', description: 'Palabras de 3 sílabas', icon: '🔤', difficulty: 2, type: 'language-syllables', completed: false },
                { id: 'lang-reading-1', name: 'Lectura Básica', description: 'Frases cortas', icon: '📖', difficulty: 1, type: 'language-reading', completed: false },
                { id: 'lang-reading-2', name: 'Lectura Intermedia', description: 'Párrafos simples', icon: '📖', difficulty: 2, type: 'language-reading', completed: false }
            ];
        }
    }

    startActivity(activityId) {
        const allActivities = [...this.getActivitiesBySubject('math'), ...this.getActivitiesBySubject('language')];
        const activity = allActivities.find(a => a.id === activityId);
        
        if (activity) {
            this.currentActivity = { ...activity, progress: 0 };
            this.navigateTo('game');
        }
    }

    getCurrentActivity() {
        return this.currentActivity;
    }

    generateMathOptions(correctAnswer) {
        const options = [correctAnswer];
        while (options.length < 4) {
            const option = correctAnswer + Math.floor(Math.random() * 6) - 3;
            if (option > 0 && !options.includes(option)) {
                options.push(option);
            }
        }
        return options.sort(() => Math.random() - 0.5);
    }

    checkMathAnswer(selected, correct) {
        const isCorrect = selected === correct;
        this.showFeedback(isCorrect);
        
        if (isCorrect) {
            setTimeout(() => {
                this.completeActivity({ correct: 9, total: 10, time: 85 });
            }, 2000);
        } else {
            setTimeout(() => {
                this.render(); // Recargar con nueva pregunta
            }, 2000);
        }
    }

    getSyllables(word) {
        // Simplificado - en una implementación real usarías un algoritmo más sofisticado
        const syllableMap = {
            'gato': ['ga', 'to'],
            'perro': ['pe', 'rro'],
            'casa': ['ca', 'sa'],
            'mesa': ['me', 'sa'],
            'árbol': ['ár', 'bol']
        };
        return syllableMap[word] || [word];
    }

    getWordEmoji(word) {
        const emojiMap = {
            'gato': '🐱',
            'perro': '🐶',
            'casa': '🏠',
            'mesa': '🪑',
            'árbol': '🌳'
        };
        return emojiMap[word] || '❓';
    }

    showFeedback(isCorrect) {
        const feedback = document.getElementById('feedback');
        if (feedback) {
            feedback.innerHTML = `
                <div class="bounce-in bg-white rounded-2xl p-6 shadow-lg text-center ${isCorrect ? 'border-4 border-green-400' : 'border-4 border-red-400'}">
                    <div class="text-4xl mb-2">${isCorrect ? '🎉' : '😅'}</div>
                    <div class="text-xl font-child font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}">
                        ${isCorrect ? '¡Excelente!' : '¡Inténtalo de nuevo!'}
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                feedback.innerHTML = '';
            }, 2000);
        }
    }

    completeActivity(results) {
        this.currentActivity.results = results;
        this.updateProgress();
        this.navigateTo('results');
    }

    updateProgress() {
        if (!this.userProgress.stars) this.userProgress.stars = 0;
        if (!this.userProgress.activitiesCompleted) this.userProgress.activitiesCompleted = 0;
        
        const results = this.currentActivity.results;
        const percentage = (results.correct / results.total) * 100;
        const stars = this.calculateStars(percentage);
        
        this.userProgress.stars += stars;
        this.userProgress.activitiesCompleted += 1;
        
        this.saveProgress();
    }

    calculateStars(percentage) {
        if (percentage >= 90) return 3;
        if (percentage >= 70) return 2;
        if (percentage >= 50) return 1;
        return 0;
    }

    restartActivity() {
        if (this.currentActivity) {
            this.currentActivity.progress = 0;
            delete this.currentActivity.results;
            this.navigateTo('game');
        }
    }

    getUserLevel() {
        const stars = this.userProgress.stars || 0;
        return Math.floor(stars / 10) + 1;
    }

    logout() {
        this.currentUser = null;
        this.currentActivity = null;
        this.navigateTo('onboarding');
    }

    loadProgress() {
        // En una implementación real, cargarías desde localStorage o una API
        return {
            stars: 15,
            activitiesCompleted: 8,
            streak: 3,
            math: { completed: 3, total: 12 },
            language: { completed: 5, total: 10 },
            achievements: {
                firstActivity: true,
                mathExpert: false,
                readingChamp: true,
                weekStreak: false,
                perfectScore: false,
                speedDemon: false
            }
        };
    }

    saveProgress() {
        // En una implementación real, guardarías en localStorage o una API
        localStorage.setItem('educaapp_progress', JSON.stringify(this.userProgress));
    }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EducaApp();
});