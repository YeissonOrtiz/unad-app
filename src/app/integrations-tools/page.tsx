import React from 'react';

const apps = [
  {
    name: 'Bitwarden',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Bitwarden_logo.svg',
    category: 'Gestor de Contraseñas',
    description: 'Un gestor de contraseñas seguro y gratuito para todos tus dispositivos.',
    url: 'https://bitwarden.com',
  },
  {
    name: 'pfSense',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/PfSense_logo.png',
    category: 'Cortafuegos',
    description: 'Un software de firewall y enrutador de código abierto.',
    url: 'https://www.pfsense.org',
  },
  {
    name: 'Wireshark',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Wireshark_Logo.svg',
    category: 'Monitor de Red',
    description: 'Un analizador de protocolos de red que permite capturar y explorar el tráfico en una red informática.',
    url: 'https://www.wireshark.org',
  },
  {
    name: 'Snort',
    icon: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/snort_logo_icon_167981.png',
    category: 'Detección de Intrusiones',
    description: 'Un sistema de detección de intrusiones en la red (NIDS) de código abierto para análisis de tráfico en tiempo real.',
    url: 'https://www.snort.org',
  },
  {
    name: 'Fail2ban',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Fail2ban_logo.png',
    category: 'Prevención de Intrusiones',
    description: 'Un software que protege servidores contra ataques de fuerza bruta bloqueando direcciones IP maliciosas.',
    url: 'https://www.fail2ban.org',
  },
  {
    name: 'OpenVPN',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/OpenVPN_logo.svg',
    category: 'VPN',
    description: 'Una solución de red privada virtual de código abierto para asegurar conexiones en redes públicas.',
    url: 'https://openvpn.net',
  },
  {
    name: 'ClamAV',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/ClamAV_Logo.png',
    category: 'Antivirus',
    description: 'Un antivirus de código abierto para detectar virus, malware y otras amenazas.',
    url: 'https://www.clamav.net',
  },
  {
    name: 'Nagios',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Nagios_logo.png',
    category: 'Monitoreo',
    description: 'Una herramienta de monitoreo de sistemas para identificar problemas de red y servidores.',
    url: 'https://www.nagios.org',
  },
  {
    name: 'Metasploit',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Metasploit_logo_and_wordmark.png',
    category: 'Pruebas de Penetración',
    description: 'Un marco de trabajo para pruebas de seguridad que permite identificar vulnerabilidades en sistemas.',
    url: 'https://www.metasploit.com',
  },
];

const IntegrationToolsPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {apps.map((app, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between items-center space-y-4 hover:shadow-2xl transition-shadow duration-200"
        >
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            className="max-w-20 h-auto"
          />
          <h3 className="text-lg font-semibold text-slate-900">{app.name}</h3>
          <p className="text-gray-600 text-sm">
            <strong>Categoría:</strong> {app.category}
          </p>
          <p className="text-gray-600 text-sm text-center">{app.description}</p>
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Visitar Página
          </a>
        </div>
      ))}
    </div>
  );
};

export default IntegrationToolsPage;
