class Ajax {

    constructor() {

        this.config = {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            },
            warnings: {
                no_url_or_data: 'No url or data.'
            }
        };
    }

    post(options) {
        let _url = options.url;
        let _data = options.data;

        if (!_url || !_data) {
            console.warn('Ajax.post:', this.config.warnings.no_url_or_data);
            return;
        }

        let _parsedData = new FormData();
        let _headers = options.headers || this.config.headers;

        Object.keys(_data).forEach((key) => {
            _parsedData.append(key, _data[key]);
        });

        return new Promise(resolve => {
            fetch(_url, {
                method: 'POST',
                body: _parsedData,
                headers: _headers
            })
            .then(res => {
                resolve(res.json());
            })
            .catch(error => console.error('Error:', error));
        });
    }
}

export default Ajax;
