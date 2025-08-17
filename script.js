document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const mockIncidents = [
        { id: 1, classification: 'Agressão a Mulher', priority: 'Máxima', victimName: 'Maria da Penha', victimCpf: '123.456.789-00', victimDob: '15/05/1980', victimPhone: '(81) 98877-6655', victimEmail: 'maria.p@email.com', location: 'Rua da Aurora, Santo Amaro', lat: -8.052, lon: -34.878, timestamp: new Date(Date.now() - 5 * 60000), description: 'Vítima relata que foi agredida pelo companheiro em sua residência. Suspeito ainda se encontra no local, aparentemente embriagado. Vítima está trancada no quarto e pede ajuda urgente.' },
        { id: 2, classification: 'Acidente com Vítima', priority: 'Máxima', victimName: 'João Silva', victimCpf: '987.654.321-00', victimDob: '22/11/1995', victimPhone: '(81) 99988-7766', victimEmail: 'joao.silva@email.com', location: 'Av. Agamenon Magalhães, Derby', lat: -8.047, lon: -34.895, timestamp: new Date(Date.now() - 10 * 60000), description: 'Colisão entre carro e moto no cruzamento próximo ao hospital. Motociclista está caído no chão, consciente mas com ferimentos visíveis na perna. Trânsito congestionado.' },
        { id: 3, classification: 'Roubo a Transeunte', priority: 'Média', victimName: 'Carlos Pereira', victimCpf: '111.222.333-44', victimDob: '01/01/2002', victimPhone: '(81) 98765-4321', victimEmail: 'carlos.pereira@email.com', location: 'Praça de Casa Forte', lat: -8.033, lon: -34.913, timestamp: yesterday, description: 'Dois indivíduos em uma bicicleta abordaram a vítima e levaram seu celular e carteira. Não houve agressão física, mas os suspeitos simularam estar armados. Fugiram em direção à Estrada do Encanamento.' },
        { id: 6, classification: 'Assalto com Morte', priority: 'Máxima', victimName: 'Não identificado', victimCpf: 'N/A', victimDob: 'N/A', victimPhone: 'N/A', victimEmail: 'N/A', location: 'Av. Boa Viagem, Pina', lat: -8.101, lon: -34.887, timestamp: new Date(Date.now() - 2 * 60000), description: 'Latrocínio ocorrido durante tentativa de assalto. Vítima foi atingida por disparo de arma de fogo e veio a óbito no local. Suspeito fugiu em um carro de cor escura. SAMU já acionado.' },
        { id: 7, classification: 'Perturbação do Sossego', priority: 'Baixa', victimName: 'Ana Costa', victimCpf: '222.333.444-55', victimDob: '10/08/1975', victimPhone: '(81) 99123-4567', victimEmail: 'ana.costa@email.com', location: 'Rua da Moeda, Recife Antigo', lat: -8.063, lon: -34.871, timestamp: new Date(Date.now() - 60 * 60000), description: 'Bar com som extremamente alto após o horário permitido. Moradores relatam que a situação é recorrente.' },
        { id: 8, classification: 'Acidente sem Vítima', priority: 'Baixa', victimName: 'Pedro Martins', victimCpf: '555.666.777-88', victimDob: '03/03/1990', victimPhone: '(81) 98888-9999', victimEmail: 'pedro.martins@email.com', location: 'Av. Caxangá, Cordeiro', lat: -8.045, lon: -34.921, timestamp: new Date(Date.now() - 45 * 60000), description: 'Pequena colisão traseira envolvendo dois veículos. Apenas danos materiais, sem feridos.' },
        { id: 9, classification: 'Furto de Veículo', priority: 'Média', victimName: 'Juliana Lima', victimCpf: '888.999.000-11', victimDob: '12/09/1988', victimPhone: '(81) 99654-1234', victimEmail: 'juliana.lima@email.com', location: 'Rua do Futuro, Aflitos', lat: -8.038, lon: -34.905, timestamp: new Date(Date.now() - 25 * 60000), description: 'Proprietário deixou o carro, um Onix branco placa PCF-1234, estacionado por 20 minutos e ao retornar o veículo não estava mais no local.' },
        { id: 10, classification: 'Ameaça', priority: 'Média', victimName: 'Ricardo Souza', victimCpf: '121.212.121-21', victimDob: '25/07/1992', victimPhone: '(81) 98111-2222', victimEmail: 'ricardo.souza@email.com', location: 'Rua do Hospício, Boa Vista', lat: -8.058, lon: -34.883, timestamp: new Date(Date.now() - 90 * 60000), description: 'Vítima relata estar recebendo ameaças de um vizinho após uma discussão. Ameaças foram feitas verbalmente.' }
    ];

    const mockCases = {
        aberto: [
            { number: '#2025-1001', type: 'Agressão' }, { number: '#2025-1002', type: 'Roubo' }, { number: '#2025-1003', type: 'Furto de Veículo' }, { number: '#2025-1004', type: 'Desaparecimento' }, { number: '#2025-1005', type: 'Estelionato' }
        ],
        investigacao: [
            { number: '#2025-0987', type: 'Homicídio' }, { number: '#2025-0988', type: 'Fraude Bancária' }, { number: '#2025-0989', type: 'Tráfico de Drogas' }, { number: '#2025-0990', type: 'Sequestro' }, { number: '#2025-0991', type: 'Latrocínio' }
        ],
        arquivado: [
            { number: '#2024-8765', type: 'Perturbação' }, { number: '#2024-8764', type: 'Danos Materiais' }, { number: '#2024-8763', type: 'Ameaça' }, { number: '#2024-8762', type: 'Calúnia' }, { number: '#2024-8761', type: 'Perda de Documento' }
        ]
    };

    let map;
    let pointLayers = {};
    const incidentFeed = document.getElementById('incident-feed');
    const incidentDetails = document.getElementById('incident-details');
    const casesContent = document.getElementById('cases-content');
    const infoBar = document.getElementById('info-bar-content');

    function normalizeString(str) { return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

    function renderFeed(incidents) {
        incidentFeed.innerHTML = '';
        incidents.forEach(incident => {
            const card = document.createElement('div');
            card.className = 'incident-card bg-white p-3 rounded-md border-l-4 text-gray-800 border-transparent transition-all cursor-pointer hover:bg-gray-200';
            card.dataset.id = incident.id;
            const priorityClass = `tag-${normalizeString(incident.priority)}`;
            card.innerHTML = `<div class="flex justify-between items-start"><p class="font-bold">${incident.classification}</p><span class="priority-tag ${priorityClass}">${incident.priority}</span></div><p class="text-sm text-gray-600">${incident.location}</p><p class="text-xs text-blue-600 font-mono mt-1">${incident.timestamp.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>`;
            card.addEventListener('click', () => highlightItem(incident.id));
            incidentFeed.appendChild(card);
        });
    }
    
    function initializeMap() {
        if (document.getElementById('map') && !map) {
            map = L.map('map').setView([-8.05, -34.90], 13);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OpenStreetMap &copy; CARTO' }).addTo(map);
        }
    }

    function addMapLayers(incidents) {
        if (!map) return;
        Object.values(pointLayers).forEach(layer => map.removeLayer(layer));
        pointLayers = {};
        incidents.forEach(incident => {
            const icon = L.divIcon({ className: `map-point-icon priority-${normalizeString(incident.priority)}`, iconSize: [18, 18] });
            const marker = L.marker([incident.lat, incident.lon], { icon: icon }).addTo(map);
            marker.on('click', () => highlightItem(incident.id));
            pointLayers[incident.id] = marker;
        });
    }

    function highlightItem(id) {
        document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
        const incident = mockIncidents.find(inc => inc.id == id);
        if (incident) {
            const card = document.querySelector(`.incident-card[data-id='${id}']`);
            if (card) {
                card.classList.add('highlighted');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            const marker = pointLayers[id];
            if (marker && marker.getElement()) {
                marker.getElement().classList.add('highlighted');
            }
            
            incidentDetails.innerHTML = `<div class="space-y-2 text-sm text-gray-700"><p><strong class="font-semibold">Tipo:</strong> ${incident.classification}</p><p><strong class="font-semibold">Local:</strong> ${incident.location}</p><p><strong class="font-semibold">Hora:</strong> ${incident.timestamp.toLocaleTimeString('pt-BR')}</p><button class="ver-mais-btn mt-4 w-full btn-technical" data-id="${id}">Ver Relatório Completo</button></div>`;
            document.querySelector('.ver-mais-btn').addEventListener('click', (e) => showFullReport(e.target.dataset.id));
        } else {
            incidentDetails.innerHTML = '<p class="text-gray-500 text-center mt-8">Clique em uma ocorrência para ver os detalhes.</p>';
        }
    }

    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(`${pageId}-page`).classList.add('active');
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) link.classList.add('active');
        });

        if (pageId === 'dashboard') createCharts();
        if (pageId === 'mapa-ocorrencias') {
            initializeMap();
            const sortedIncidents = mockIncidents.sort((a, b) => {
                const priorityOrder = { 'Máxima': 3, 'Média': 2, 'Baixa': 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority] || b.timestamp - a.timestamp;
            });
            renderFeed(sortedIncidents);
            addMapLayers(sortedIncidents);
            setTimeout(() => map.invalidateSize(), 10);
        }
        if (pageId === 'casos') {
            renderCases('aberto');
            document.querySelector('.case-tab[data-status="aberto"]').classList.add('active');
        }
    }

    function showFullReport(id) {
        const incident = mockIncidents.find(inc => inc.id == id);
        if (incident) {
            document.getElementById('detail-classification').textContent = incident.classification;
            document.getElementById('detail-date').textContent = incident.timestamp.toLocaleDateString('pt-BR');
            document.getElementById('detail-time').textContent = incident.timestamp.toLocaleTimeString('pt-BR');
            document.getElementById('detail-location').textContent = incident.location;
            document.getElementById('detail-victim-name').textContent = incident.victimName;
            document.getElementById('detail-victim-cpf').textContent = incident.victimCpf;
            document.getElementById('detail-victim-dob').textContent = incident.victimDob;
            document.getElementById('detail-victim-phone').textContent = incident.victimPhone;
            document.getElementById('detail-victim-email').textContent = incident.victimEmail;
            document.getElementById('detail-description').textContent = incident.description;
            showPage('relatorio');
        }
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => { e.preventDefault(); showPage(link.dataset.page); });
    });
    
    document.getElementById('back-to-map').addEventListener('click', () => showPage('mapa-ocorrencias'));

    function createCharts() {
        const dailyCtx = document.getElementById('daily-chart');
        if (dailyCtx && !Chart.getChart(dailyCtx)) {
            new Chart(dailyCtx, { type: 'bar', data: { labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexya', 'Ontem', 'Hoje'], datasets: [{ label: 'Ocorrências', data: [120, 190, 219, 390, 266, 310, 400], backgroundColor: 'rgba(59, 130, 246, 0.5)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 1 }] }, options: { scales: { y: { beginAtZero: true, ticks: { color: '#6b7280' } }, x: { ticks: { color: '#6b7280' } } }, plugins: { legend: { display: false } } } });
        }
        const typeCtx = document.getElementById('type-chart');
        if (typeCtx && !Chart.getChart(typeCtx)) {
            new Chart(typeCtx, { type: 'doughnut', data: { labels: ['Furto/Roubo', 'Agressão', 'Acidentes', 'Outros'], datasets: [{ data: [40, 25, 15, 20], backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b', '#6b7280'], }] }, options: { plugins: { legend: { position: 'bottom', labels: { color: '#4b5563' } } } } });
        }
        const comparisonCtx = document.getElementById('comparison-chart');
        if (comparisonCtx && !Chart.getChart(comparisonCtx)) {
            new Chart(comparisonCtx, { type: 'line', data: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], datasets: [{ label: 'Ano Atual', data: [650, 590, 800, 810, 560, 550], borderColor: '#3b82f6', tension: 0.1 }, { label: 'Ano Anterior', data: [280, 480, 400, 190, 860, 270], borderColor: '#10b981', tension: 0.1 }] }, options: { scales: { y: { beginAtZero: true, ticks: { color: '#6b7280' } }, x: { ticks: { color: '#6b7280' } } }, plugins: { legend: { labels: { color: '#4b5563' } } } } });
        }
    }

    function renderCases(status) {
        casesContent.innerHTML = '';
        const casesToRender = mockCases[status];
        const isArchived = status === 'arquivado';
        const iconClass = isArchived ? 'doc-icon' : 'folder-icon';
        
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6';

        casesToRender.forEach(caseFile => {
            const item = document.createElement('a');
            item.href = '#';
            item.className = 'case-item';
            item.innerHTML = `<div class="case-icon ${iconClass}"></div><span class="case-number">${caseFile.number}</span><span class="case-type">${caseFile.type}</span>`;
            grid.appendChild(item);
        });
        casesContent.appendChild(grid);
    }

    document.querySelectorAll('.case-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.case-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCases(tab.dataset.status);
        });
    });

    function updateInfoBar() {
        const now = new Date();
        const date = now.toLocaleDateString('pt-BR');
        const time = now.toLocaleTimeString('pt-BR');
        const ip = '164.163.21.167';
        infoBar.textContent = `Data: ${date} | Hora: ${time} | Seu IP atual é: ${ip}`;
    }

    showPage('dashboard');
    setInterval(updateInfoBar, 1000);
    updateInfoBar();
});
