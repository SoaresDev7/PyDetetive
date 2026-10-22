/**
 * API Client - Cliente HTTP para integração com servidores
 * Fornece abstração para requisições HTTP e gerenciamento de respostas
 */

class APIClient {
    constructor(baseURL = 'http://localhost:3000') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
        this.interceptors = {
            request: [],
            response: []
        };
        this.timeout = 5000;
        this.retries = 3;
    }

    /**
     * Configura URL base
     */
    setBaseURL(url) {
        this.baseURL = url;
    }

    /**
     * Adiciona header padrão
     */
    setHeader(name, value) {
        this.defaultHeaders[name] = value;
    }

    /**
     * Adiciona interceptador de requisição
     */
    addRequestInterceptor(fn) {
        this.interceptors.request.push(fn);
    }

    /**
     * Adiciona interceptador de resposta
     */
    addResponseInterceptor(fn) {
        this.interceptors.response.push(fn);
    }

    /**
     * Requisição GET
     */
    get(endpoint, options = {}) {
        return this.request('GET', endpoint, null, options);
    }

    /**
     * Requisição POST
     */
    post(endpoint, data, options = {}) {
        return this.request('POST', endpoint, data, options);
    }

    /**
     * Requisição PUT
     */
    put(endpoint, data, options = {}) {
        return this.request('PUT', endpoint, data, options);
    }

    /**
     * Requisição DELETE
     */
    delete(endpoint, options = {}) {
        return this.request('DELETE', endpoint, null, options);
    }

    /**
     * Requisição genérica
     */
    async request(method, endpoint, data = null, options = {}) {
        let url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
        const headers = { ...this.defaultHeaders, ...options.headers };

        let body = null;
        if (data) {
            body = typeof data === 'string' ? data : JSON.stringify(data);
        }

        const config = {
            method,
            headers,
            body,
            signal: AbortSignal.timeout(this.timeout),
            ...options
        };

        // Aplicar interceptadores de requisição
        for (const interceptor of this.interceptors.request) {
            const result = await interceptor({ url, config, method, data });
            if (result === false) {
                throw new Error('Requisição cancelada por interceptador');
            }
            if (result) {
                Object.assign(config, result);
            }
        }

        let lastError = null;
        for (let attempt = 0; attempt < this.retries; attempt++) {
            try {
                const response = await fetch(url, config);

                if (!response.ok) {
                    throw new HTTPError(`HTTP ${response.status}`, response.status, await response.text());
                }

                const contentType = response.headers.get('content-type');
                let result = null;

                if (contentType && contentType.includes('application/json')) {
                    result = await response.json();
                } else {
                    result = await response.text();
                }

                // Aplicar interceptadores de resposta
                for (const interceptor of this.interceptors.response) {
                    const processed = await interceptor({ response, data: result });
                    if (processed) {
                        result = processed;
                    }
                }

                logger?.info(`API: ${method} ${endpoint} - OK`);
                return result;

            } catch (error) {
                lastError = error;
                logger?.warn(`API: ${method} ${endpoint} - Tentativa ${attempt + 1}/${this.retries} falhou`);

                if (attempt < this.retries - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                }
            }
        }

        logger?.error(`API: ${method} ${endpoint} - Falha após ${this.retries} tentativas`);
        throw lastError;
    }

    /**
     * Requisição em batch
     */
    async batch(requests) {
        return Promise.all(
            requests.map(req => this.request(req.method, req.endpoint, req.data, req.options))
        );
    }

    /**
     * Upload de arquivo
     */
    async upload(endpoint, file, onProgress = null) {
        const formData = new FormData();
        formData.append('file', file);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable && onProgress) {
                    const progress = (e.loaded / e.total) * 100;
                    onProgress(progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new HTTPError(`HTTP ${xhr.status}`, xhr.status));
                }
            });

            xhr.addEventListener('error', () => reject(new Error('Erro na requisição')));
            xhr.addEventListener('abort', () => reject(new Error('Requisição abortada')));

            xhr.open('POST', `${this.baseURL}${endpoint}`);
            xhr.send(formData);
        });
    }

    /**
     * WebSocket
     */
    connect(endpoint) {
        const wsURL = endpoint.startsWith('ws') ? endpoint :
                     `ws${this.baseURL.slice(4)}${endpoint}`;

        return new WebSocket(wsURL);
    }
}

/**
 * Classe de erro HTTP
 */
class HTTPError extends Error {
    constructor(message, status, body) {
        super(message);
        this.name = 'HTTPError';
        this.status = status;
        this.body = body;
    }
}

// Create global instance
const apiClient = new APIClient();
window.APIClient = APIClient;
window.apiClient = apiClient;
