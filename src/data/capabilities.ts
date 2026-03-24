export interface CapabilitySpec {
  label: string;
  value: string;
}

export interface CapabilityDiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "source" | "process" | "target" | "shield";
}

export interface CapabilityDiagramEdge {
  from: string;
  to: string;
  label?: string;
  encrypted?: boolean;
}

export interface Capability {
  slug: string;
  icon: string;
  tag: string;
  tagColor: string;
  title: string;
  short: string;
  summary: string;
  problem: string;
  solution: string;
  specs: CapabilitySpec[];
  diagram: {
    nodes: CapabilityDiagramNode[];
    edges: CapabilityDiagramEdge[];
  };
  useCases: string[];
  techStack: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    slug: "e2e-encryption",
    icon: "Lock",
    tag: "CRYPTO",
    tagColor: "text-cyber-green border-cyber-green",
    title: "Сквозное шифрование трафика",
    short: "E2E Encryption",
    summary:
      "Данные шифруются на отправляющем узле и расшифровываются только на принимающем. Провайдеры, операторы и промежуточные узлы видят только зашифрованный поток.",
    problem:
      "Большинство корпоративных решений шифруют трафик только на участке клиент → шлюз. На шлюзе данные расшифровываются и снова шифруются — это создаёт точку уязвимости, которую атакующий может использовать при компрометации шлюза.",
    solution:
      "Шифрование выполняется непосредственно на устройстве-источнике с использованием ключей, которые никогда не передаются промежуточным узлам. Ключевой обмен происходит по протоколу Noise с поддержкой Perfect Forward Secrecy — каждая сессия использует уникальный эфемерный ключ.",
    specs: [
      { label: "Алгоритм шифрования", value: "AES-256-GCM / ChaCha20-Poly1305" },
      { label: "Обмен ключами", value: "Noise Protocol (IK/XX handshake)" },
      { label: "Forward Secrecy", value: "Да — эфемерные ключи на сессию" },
      { label: "Аутентификация", value: "Ed25519 / ECDSA P-256" },
      { label: "Ротация ключей", value: "Каждые 3 минуты или 1 GB" },
      { label: "Задержка на шифрование", value: "< 0.3ms (с AES-NI)" },
    ],
    diagram: {
      nodes: [
        { id: "client", label: "Устройство", x: 10, y: 45, type: "source" },
        { id: "encrypt", label: "Encrypt\nAES-256", x: 30, y: 45, type: "process" },
        { id: "isp", label: "Провайдер\n(видит шум)", x: 52, y: 45, type: "shield" },
        { id: "decrypt", label: "Decrypt", x: 72, y: 45, type: "process" },
        { id: "server", label: "Сервер", x: 90, y: 45, type: "target" },
      ],
      edges: [
        { from: "client", to: "encrypt" },
        { from: "encrypt", to: "isp", encrypted: true },
        { from: "isp", to: "decrypt", encrypted: true },
        { from: "decrypt", to: "server" },
      ],
    },
    useCases: [
      "Передача коммерческой тайны между офисами",
      "Защита переговоров топ-менеджмента",
      "Безопасная работа с облачными хранилищами",
      "Шифрование резервных копий в транзите",
    ],
    techStack: ["WireGuard", "OpenSSL 3.x", "AES-NI", "Noise Protocol Framework", "Ed25519"],
  },
  {
    slug: "network-segmentation",
    icon: "Layers",
    tag: "ARCH",
    tagColor: "text-sky-400 border-sky-400",
    title: "Сегментация сети",
    short: "Network Segmentation",
    summary:
      "Инфраструктура разбивается на изолированные зоны с независимыми политиками доступа. Компрометация одного сегмента не даёт доступа к остальным.",
    problem:
      "Плоская сеть — главная ошибка корпоративной архитектуры. После взлома одного узла атакующий получает возможность горизонтального перемещения по всей сети. Один скомпрометированный ноутбук даёт доступ к финансовым серверам.",
    solution:
      "Сеть делится на зоны по функциональному признаку: рабочие станции, серверы, IoT, гостевой доступ. Между зонами — явные правила разрешения трафика. Любое соединение, не описанное в политике, запрещено по умолчанию (default deny). Реализуется через namespace isolation и eBPF-based policy engine.",
    specs: [
      { label: "Модель политик", value: "Default Deny + Explicit Allow" },
      { label: "Уровень изоляции", value: "L2/L3/L7" },
      { label: "Движок политик", value: "eBPF (kernel-level)" },
      { label: "Количество зон", value: "Неограниченно" },
      { label: "Латентность политики", value: "< 1μs (in-kernel)" },
      { label: "Аудит трафика", value: "Полный журнал межзонного трафика" },
    ],
    diagram: {
      nodes: [
        { id: "workstations", label: "Рабочие\nстанции", x: 10, y: 25, type: "source" },
        { id: "iot", label: "IoT", x: 10, y: 65, type: "source" },
        { id: "policy", label: "Policy\nEngine", x: 45, y: 45, type: "process" },
        { id: "servers", label: "Серверы", x: 80, y: 25, type: "target" },
        { id: "guest", label: "Гостевой\nWi-Fi", x: 80, y: 65, type: "shield" },
      ],
      edges: [
        { from: "workstations", to: "policy", label: "Allow" },
        { from: "iot", to: "policy", label: "Deny→servers" },
        { from: "policy", to: "servers", encrypted: true },
        { from: "policy", to: "guest" },
      ],
    },
    useCases: [
      "Изоляция производственных систем от офисной сети",
      "Выделение PCI DSS зоны для обработки платежей",
      "Защита IoT-устройств от доступа к корпоративным ресурсам",
      "Гостевой Wi-Fi без доступа к внутренней сети",
    ],
    techStack: ["eBPF / BPF-LSM", "Linux Namespaces", "VLAN 802.1Q", "Open vSwitch", "Cilium"],
  },
  {
    slug: "per-device-ip",
    icon: "Globe",
    tag: "PRIVACY",
    tagColor: "text-violet-400 border-violet-400",
    title: "Разные IP для разных устройств",
    short: "Per-device IP Routing",
    summary:
      "Каждое устройство выходит в сеть с независимым внешним IP-адресом. Перекрёстная корреляция активности между устройствами исключена на уровне маршрутизации.",
    problem:
      "Когда все устройства используют один внешний IP, любой внешний наблюдатель может коррелировать их активность: понять, что они принадлежат одной организации, построить граф связей, отследить паттерны работы. Это — разведывательная информация.",
    solution:
      "Multi-egress маршрутизация: трафик каждого устройства или группы устройств выходит через отдельный внешний IP. Ротация адресов происходит по расписанию или по событию. NAT-изоляция исключает утечку идентификаторов через заголовки протоколов.",
    specs: [
      { label: "Режим назначения IP", value: "Per-device / Per-group / Rotated" },
      { label: "Ротация адресов", value: "По расписанию или триггеру" },
      { label: "Пул адресов", value: "От 1 до 65 536 на контур" },
      { label: "Изоляция NAT", value: "Full-cone NAT per device" },
      { label: "Утечки через заголовки", value: "Очищаются на уровне шлюза" },
      { label: "IPv6 поддержка", value: "Да, с prefix delegation" },
    ],
    diagram: {
      nodes: [
        { id: "d1", label: "Устройство A", x: 8, y: 20, type: "source" },
        { id: "d2", label: "Устройство B", x: 8, y: 50, type: "source" },
        { id: "d3", label: "Устройство C", x: 8, y: 80, type: "source" },
        { id: "router", label: "Multi-egress\nRouter", x: 45, y: 50, type: "process" },
        { id: "ip1", label: "IP-1", x: 82, y: 20, type: "target" },
        { id: "ip2", label: "IP-2", x: 82, y: 50, type: "target" },
        { id: "ip3", label: "IP-3", x: 82, y: 80, type: "target" },
      ],
      edges: [
        { from: "d1", to: "router" },
        { from: "d2", to: "router" },
        { from: "d3", to: "router" },
        { from: "router", to: "ip1", encrypted: true },
        { from: "router", to: "ip2", encrypted: true },
        { from: "router", to: "ip3", encrypted: true },
      ],
    },
    useCases: [
      "Изоляция корпоративной разведки от операционной деятельности",
      "Раздельные IP для разных отделов компании",
      "Защита от целевых атак по IP-адресу",
      "Соответствие требованиям по разделению контуров",
    ],
    techStack: ["Linux Policy Routing", "ip rule / ip route", "SNAT / MASQUERADE", "BGP Anycast", "IPv6 PD"],
  },
  {
    slug: "dpi-protection",
    icon: "EyeOff",
    tag: "STEALTH",
    tagColor: "text-rose-400 border-rose-400",
    title: "Защита от DPI и анализа трафика",
    short: "Traffic Obfuscation",
    summary:
      "Трафик маскируется под легитимные протоколы. Статистические паттерны подавляются — классификаторы глубокой инспекции пакетов не выявляют тип и структуру соединения.",
    problem:
      "Deep Packet Inspection анализирует не только содержимое, но и паттерны трафика: размер пакетов, интервалы между ними, характерные сигнатуры протоколов. Шифрование от этого не защищает — DPI классифицирует трафик даже зашифрованным.",
    solution:
      "Комплекс мер: обфускация протокольных сигнатур (трафик неотличим от HTTPS/QUIC), рандомизация размеров пакетов и интервалов, добавление dummy-трафика для подавления статистических паттернов. Используются методы из арсенала censorship circumvention research.",
    specs: [
      { label: "Метод маскировки", value: "Protocol mimicry (HTTPS/QUIC/WebSocket)" },
      { label: "Рандомизация пакетов", value: "Размер + интервал + порядок" },
      { label: "Dummy-трафик", value: "Configurable cover traffic" },
      { label: "Фингерпринт транспорта", value: "Randomized TLS ClientHello" },
      { label: "Детектируемость", value: "< 2% на ML-классификаторах" },
      { label: "Overhead по трафику", value: "5–15% в зависимости от режима" },
    ],
    diagram: {
      nodes: [
        { id: "real", label: "Реальный\nтрафик", x: 8, y: 45, type: "source" },
        { id: "obfs", label: "Obfuscation\nLayer", x: 35, y: 45, type: "process" },
        { id: "dpi", label: "DPI\nClassifier", x: 60, y: 45, type: "shield" },
        { id: "dest", label: "Назначение", x: 88, y: 45, type: "target" },
      ],
      edges: [
        { from: "real", to: "obfs" },
        { from: "obfs", to: "dpi", label: "выглядит как HTTPS", encrypted: true },
        { from: "dpi", to: "dest", encrypted: true },
      ],
    },
    useCases: [
      "Защита трафика в сетях с агрессивным DPI",
      "Работа в регионах с ограничениями на корпоративные протоколы",
      "Защита от промышленного шпионажа через анализ трафика",
      "Конфиденциальность паттернов бизнес-активности",
    ],
    techStack: ["Shadowsocks AEAD", "obfs4", "QUIC / HTTP3 mimicry", "meek (domain fronting)", "Pluggable Transports"],
  },
  {
    slug: "smart-routing",
    icon: "GitMerge",
    tag: "ROUTING",
    tagColor: "text-amber-400 border-amber-400",
    title: "Интеллектуальная маршрутизация",
    short: "Smart Routing",
    summary:
      "Трафик распределяется по оптимальным путям в реальном времени с учётом задержки, нагрузки и доступности каналов. Переключение между маршрутами — бесшовное, без разрыва сессий.",
    problem:
      "Статическая маршрутизация выбирает путь один раз и держится за него, даже если канал деградировал. Результат — потери пакетов, рост задержки, разрывы соединений. Ручное переключение занимает минуты; за это время инцидент уже произошёл.",
    solution:
      "Постоянный мониторинг всех доступных путей по RTT, jitter, потерям пакетов и нагрузке. Алгоритм выбирает оптимальный маршрут для каждого потока независимо. При деградации канала сессия переводится на резервный путь без разрыва TCP-соединений — через механизм multipath tunneling.",
    specs: [
      { label: "Протоколы маршрутизации", value: "BGP / OSPF / Static" },
      { label: "Мониторинг каналов", value: "Каждые 100ms" },
      { label: "Время переключения", value: "< 50ms" },
      { label: "Метрики выбора", value: "RTT, jitter, loss, bandwidth" },
      { label: "Multipath", value: "ECMP + MPTCP" },
      { label: "Балансировка нагрузки", value: "Weighted, per-flow, per-packet" },
    ],
    diagram: {
      nodes: [
        { id: "src", label: "Источник", x: 8, y: 45, type: "source" },
        { id: "ctrl", label: "Routing\nController", x: 35, y: 45, type: "process" },
        { id: "path1", label: "Путь A\n(основной)", x: 62, y: 22, type: "process" },
        { id: "path2", label: "Путь B\n(резерв)", x: 62, y: 68, type: "shield" },
        { id: "dst", label: "Назначение", x: 88, y: 45, type: "target" },
      ],
      edges: [
        { from: "src", to: "ctrl" },
        { from: "ctrl", to: "path1", label: "RTT 2ms", encrypted: true },
        { from: "ctrl", to: "path2", label: "RTT 8ms" },
        { from: "path1", to: "dst", encrypted: true },
        { from: "path2", to: "dst" },
      ],
    },
    useCases: [
      "Непрерывность видеоконференций при деградации канала",
      "Балансировка нагрузки между несколькими провайдерами",
      "Приоритизация критичного трафика по QoS",
      "Автоматический failover для финансовых систем",
    ],
    techStack: ["BIRD2 (BGP/OSPF)", "MPTCP", "FRRouting", "iproute2", "BFD (Bidirectional Forwarding Detection)"],
  },
  {
    slug: "redundant-channels",
    icon: "Radio",
    tag: "RESILIENCE",
    tagColor: "text-orange-400 border-orange-400",
    title: "Резервные каналы связи",
    short: "Multi-channel Redundancy",
    summary:
      "Автоматическое переключение между физически независимыми каналами: оптоволокно, мобильные сети, спутниковый канал, радио. Потеря одного канала не прерывает соединение.",
    problem:
      "Единственный канал связи — единственная точка отказа. Авария у провайдера, физическое повреждение кабеля, направленные помехи — любое из этих событий полностью отключает объект. В критической инфраструктуре это недопустимо.",
    solution:
      "SD-WAN bonding объединяет несколько физически разнородных каналов в единый логический интерфейс. Трафик распределяется или дублируется по всем активным каналам. При выходе канала из строя трафик моментально перераспределяется — без изменения IP и без разрыва сессий.",
    specs: [
      { label: "Типы каналов", value: "Fiber, LTE/5G, Satellite, Radio, xDSL" },
      { label: "Bonding", value: "Active-active / Active-standby / WRR" },
      { label: "Время failover", value: "< 100ms (BFD-assisted)" },
      { label: "Спутниковая задержка", value: "Компенсируется TCP-ускорением" },
      { label: "Мин. кол-во каналов", value: "2 (рекомендуется 3+)" },
      { label: "Агрегированная полоса", value: "До 10 Gbps при bonding" },
    ],
    diagram: {
      nodes: [
        { id: "obj", label: "Объект", x: 8, y: 45, type: "source" },
        { id: "bond", label: "SD-WAN\nBonder", x: 32, y: 45, type: "process" },
        { id: "fiber", label: "Оптика", x: 58, y: 18, type: "process" },
        { id: "lte", label: "LTE/5G", x: 58, y: 45, type: "process" },
        { id: "sat", label: "Спутник", x: 58, y: 72, type: "shield" },
        { id: "dc", label: "ЦОД / Штаб", x: 88, y: 45, type: "target" },
      ],
      edges: [
        { from: "obj", to: "bond" },
        { from: "bond", to: "fiber", encrypted: true },
        { from: "bond", to: "lte", encrypted: true },
        { from: "bond", to: "sat" },
        { from: "fiber", to: "dc", encrypted: true },
        { from: "lte", to: "dc", encrypted: true },
        { from: "sat", to: "dc" },
      ],
    },
    useCases: [
      "Удалённые объекты без гарантии стабильного интернета",
      "Мобильные командные пункты и штабы",
      "Критическая инфраструктура с требованием 99.99% uptime",
      "Резервирование ЦОД через разнородные каналы",
    ],
    techStack: ["OpenMPTCProuter", "Bonding (802.3ad)", "Starlink / Iridium API", "LTE Aggregation", "BFD"],
  },
  {
    slug: "hardware-crypto",
    icon: "Cpu",
    tag: "HW",
    tagColor: "text-cyan-400 border-cyan-400",
    title: "Аппаратное шифрование",
    short: "Hardware Crypto",
    summary:
      "Криптографические операции выполняются на выделенных аппаратных модулях. Ключи генерируются и хранятся внутри защищённой среды исполнения и никогда не покидают её в открытом виде.",
    problem:
      "Программное шифрование уязвимо к атакам через оперативную память (cold boot, DMA-атаки), эксплойты ядра и компрометацию ОС. Ключи шифрования лежат в RAM — и могут быть извлечены при физическом доступе к устройству.",
    solution:
      "Аппаратный модуль безопасности (HSM / TPM) выполняет все криптографические операции изолированно от основной системы. Ключевой материал генерируется на основе аппаратного генератора случайных чисел (HWRNG) и хранится в tamper-resistant памяти. Попытка физического вскрытия уничтожает ключи.",
    specs: [
      { label: "Стандарты", value: "FIPS 140-2 Level 3 / Common Criteria EAL4+" },
      { label: "Хранилище ключей", value: "Tamper-evident secure enclave" },
      { label: "HWRNG", value: "Аппаратный генератор энтропии" },
      { label: "Производительность", value: "10 Gbps AES-256 без нагрузки на CPU" },
      { label: "Защита от вскрытия", value: "Активное уничтожение ключей" },
      { label: "Форм-факторы", value: "PCIe HSM, USB token, встроенный TPM" },
    ],
    diagram: {
      nodes: [
        { id: "app", label: "Приложение\n/ ОС", x: 10, y: 45, type: "source" },
        { id: "api", label: "PKCS#11\nAPI", x: 35, y: 45, type: "process" },
        { id: "hsm", label: "HSM\n(secure enclave)", x: 62, y: 45, type: "shield" },
        { id: "keys", label: "Ключи\n(не выходят)", x: 88, y: 45, type: "target" },
      ],
      edges: [
        { from: "app", to: "api", label: "запрос операции" },
        { from: "api", to: "hsm", label: "PKCS#11", encrypted: true },
        { from: "hsm", to: "keys" },
        { from: "hsm", to: "api", label: "результат", encrypted: true },
      ],
    },
    useCases: [
      "Защита корневых CA-сертификатов организации",
      "Подпись финансовых транзакций",
      "Хранение мастер-ключей шифрования баз данных",
      "PKI-инфраструктура для корпоративных сетей",
    ],
    techStack: ["TPM 2.0", "HSM (Thales / Yubico)", "PKCS#11", "ARM TrustZone", "Intel SGX / TDX"],
  },
  {
    slug: "central-management",
    icon: "LayoutDashboard",
    tag: "MGMT",
    tagColor: "text-emerald-400 border-emerald-400",
    title: "Централизованное управление",
    short: "Unified Control Plane",
    summary:
      "Единая консоль для управления политиками, мониторинга состояния узлов и реагирования на инциденты по всей распределённой инфраструктуре.",
    problem:
      "В распределённой инфраструктуре каждый узел настраивается отдельно. Изменение политики безопасности требует ручного обхода каждого устройства. Одна забытая правка — и в защите дыра. Аудит таких конфигураций практически невозможен.",
    solution:
      "Control plane отделён от data plane. Все политики описываются в едином репозитории (GitOps), версионируются и применяются атомарно ко всем узлам одновременно. Изменения проходят через pipeline с автоматической валидацией. Полный аудит-лог: кто, что и когда изменил.",
    specs: [
      { label: "Модель управления", value: "GitOps / Policy-as-Code" },
      { label: "API", value: "REST / gRPC / Terraform Provider" },
      { label: "Применение политик", value: "Атомарно, откат при ошибке" },
      { label: "RBAC", value: "Роли с гранулярными правами" },
      { label: "Аудит-лог", value: "Immutable, подписанный" },
      { label: "Мониторинг узлов", value: "Real-time, < 1s latency" },
    ],
    diagram: {
      nodes: [
        { id: "admin", label: "Администратор", x: 8, y: 45, type: "source" },
        { id: "ctrl", label: "Control\nPlane", x: 35, y: 45, type: "process" },
        { id: "n1", label: "Узел A", x: 70, y: 18, type: "target" },
        { id: "n2", label: "Узел B", x: 70, y: 45, type: "target" },
        { id: "n3", label: "Узел C", x: 70, y: 72, type: "target" },
      ],
      edges: [
        { from: "admin", to: "ctrl", label: "Policy push" },
        { from: "ctrl", to: "n1", label: "Apply", encrypted: true },
        { from: "ctrl", to: "n2", label: "Apply", encrypted: true },
        { from: "ctrl", to: "n3", label: "Apply", encrypted: true },
      ],
    },
    useCases: [
      "Управление сотнями узлов из единой точки",
      "Мгновенное применение новых политик безопасности",
      "Соответствие требованиям аудита (ISO 27001, SOC 2)",
      "Интеграция с корпоративным SIEM и ticketing",
    ],
    techStack: ["Terraform", "GitLab CI / GitHub Actions", "gRPC", "Open Policy Agent (OPA)", "Prometheus / Grafana"],
  },
];
