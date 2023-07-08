module.exports = {
  tutorialSidebar: [
    'getting-started',
    {
      
      type: 'category',
      label: 'SQL ineksiya',
      items: [
        'sql-ineksiya/sql_ineksiya',
        'sql-ineksiya/sql-ineksiya-union-hujumlari',
        'sql-ineksiya/malumotlar-bazasini-tekshirish',
        'sql-ineksiya/blind-sql-ineksiya',
        'sql-ineksiya/sql-ineksiya-cheat-sheet'
      ],
    },,
    
    {
      type: 'category',
      label: 'XSS',
      link: {type: 'doc', id: 'xss/xss'},
      items: [
        'xss/cross-site-scripting',
        'xss/reflected-xss',
        'xss/stored-xss',
        'xss/domga-asoslanga-xss',
        'xss/xss-kontekstlari',
        'xss/angularjs-sandbox',
        'xss/xss-zaifliklarini-exploit-qilish',
        'xss/content-security-policy',
        'xss/dangling-markup',
        'xss/qanday-qilib-xssni-oldini-olish-mumkin',
        {
          type: 'link',
          label: 'XSS cheat sheet',
          href: 'https://portswigger.net/web-security/cross-site-scripting/cheat-sheet',
        }
      ],
    },
    {
      type: 'category',
      label: 'CSRF',
      link: {type: 'doc', id: 'csrf/csrf'},
      items: [
        'csrf/cross-site-request-forgery',
        'csrf/csrf-tokenlar',
        'csrf/xss-vs-csrf',
        'csrf/samesite-cookielar',
      ],
    },
    'clickjacking/clickjacking',
    {
      type: 'category',
      label: 'DOM-based',
      items: [
        {
          type: 'category',
          label: 'DOM ga asoslangan zaifliklar',
          link: {type: 'doc', id: 'dom-based/dom-ga-asoslangan-zaifliklar/dom_ga_asoslangan_zaifliklar'},
          items: [
            'dom-based/dom-ga-asoslangan-zaifliklar/open-redirection',
            'dom-based/dom-ga-asoslangan-zaifliklar/cookie-manipulation',
            'dom-based/dom-ga-asoslangan-zaifliklar/javascript-ineksiyasi',
            'dom-based/dom-ga-asoslangan-zaifliklar/document-domain-manipulation',
            'dom-based/dom-ga-asoslangan-zaifliklar/websocket-url-poisoning',
            'dom-based/dom-ga-asoslangan-zaifliklar/link-manipulation',
            {
              type: 'category',
              label: 'Web Message Manipulation',
              link: {type: 'doc', id: 'dom-based/dom-ga-asoslangan-zaifliklar/web-message-manipulation/web_message_manipulation'},
              items: [
                'dom-based/dom-ga-asoslangan-zaifliklar/web-message-manipulation/web-message-sourceni-boshqarish',
              ],
            },
            'dom-based/dom-ga-asoslangan-zaifliklar/ajax-request-header-manipulation',
            'dom-based/dom-ga-asoslangan-zaifliklar/local-file-path-manipulation',
            'dom-based/dom-ga-asoslangan-zaifliklar/client-side-sql-injection',
            'dom-based/dom-ga-asoslangan-zaifliklar/html5-storage-manipulation',
            'dom-based/dom-ga-asoslangan-zaifliklar/client-side-xpath-injection',
            'dom-based/dom-ga-asoslangan-zaifliklar/client-side-json-injection',
            'dom-based/dom-ga-asoslangan-zaifliklar/dom-data-manipulation',
            'dom-based/dom-ga-asoslangan-zaifliklar/denial-of-service',
            
          ],
        },
        'dom-based/dom-clobbering',
      ],
    },
    {
      type: 'category',
      label: 'CORS',
      items: [
        'cors/cross-origin-resource-sharing-cors',
        'cors/same-orign-policy',
        'cors/access-control-allow-origin',
      ],
    },
    {
      type: 'category',
      label: 'XXE',
      items: [
        'xxe/xxe-ineksiya',
        'xxe/xml-entitylar',
        'xxe/blind-xxe-ineksiyasi',
      ],
    },
    {
      type: 'category',
      label: 'SSRF',
      items: [
        'ssrf/server-side-request-forgery',
        'ssrf/blind-ssrf',
      ],
    },
    {
      type: 'category',
      label: 'Request Smuggling',
      items: [
        {
          type: 'category',
          label: 'HTTP Request Smuggling',
          link: {type: 'doc', id: 'request-smuggling/http-request-smuggling/http_request_smuggling'},
          items: [
            'request-smuggling/http-request-smuggling/topish',
            'request-smuggling/http-request-smuggling/foydalanish',
          ],
        },
        {
          type: 'category',
          label: 'Advanced Request Smuggling',
          link: {type: 'doc', id: 'request-smuggling/advanced-request-smuggling/advanced_request_smuggling'},
          items: [
            'request-smuggling/advanced-request-smuggling/http-2-downgrade',
            'request-smuggling/advanced-request-smuggling/maxsus-http-2-vektorlar',
            'request-smuggling/advanced-request-smuggling/response-queue-poisoning',
            'request-smuggling/advanced-request-smuggling/request-tunelling',
          ],
        },
        {
          type: 'category',
          label: 'Browser-Powered Request Smuggling',
          link: {type: 'doc', id: 'request-smuggling/browser-powered-request-smuggling/browser_powered_request_smuggling'},
          items: [
            'request-smuggling/browser-powered-request-smuggling/cl.0',
            'request-smuggling/browser-powered-request-smuggling/client-side-desync',
            'request-smuggling/browser-powered-request-smuggling/pause-based-desync',
          ],
        },
        
      ],
    },
    'command-injection/os-command-injection',
    
    {
      type: 'category',
      label: 'SSTI',
      items: [
        'ssti/server-side-template-injection-ssti',
        'ssti/ssti-ni-exploit-qilish',
      ],
    },
    {
      type: 'category',
      label: 'Insecure Deserialization',
      items: [
        'insecure-deserialization/insecure_deserialization',
        'insecure-deserialization/insecure-deserialization-zaifliklarini-exploit-qilish',
      ],
    },
    'directory-traversal/directory_traversal',
    {
      type: 'category',
      label: 'Access Control',
      items: [
        'access-control/access-control-zaifliklari',
        'access-control/idor',
        'access-control/access-controlning-xavfsizlik-modellari',
      ],
    },
  ],
};