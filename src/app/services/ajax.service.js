/* global FormData fetch */
class AjaxService {
  constructor () {
    this.config = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      warnings: {
        no_url_or_data: 'No url or data.'
      }
    }
  }

  async post (options) {
    let _url = options.url
    let _data = options.data

    if (!_url || !_data) {
      console.warn('AjaxService.post:', this.config.warnings.no_url_or_data)
      return
    }

    let _parsedData = new FormData()
    let _headers = options.headers || this.config.headers

    Object.keys(_data).forEach((key) => {
      _parsedData.append(key, _data[key])
    })

    let response = await fetch(_url, {
      method: 'POST',
      body: _parsedData,
      headers: _headers
    })
      .catch(error => console.error('Error:', error))

    try {
      let responseText = await response.text()
      let responseData = JSON.parse(responseText)
      return responseData
    } catch (error) {
      console.error('error', error)
      return []
    }
  }

  async get (options) {
    let _url = options.url
    if (!_url) {
      console.warn('AjaxService.get:', this.config.warnings.no_url_or_data)
      return
    }

    if (options.data) {
      if (options.data.action) {
        _url += '?action=' + options.data.action
      }
      if (options.data.params) {
        _url += '&' + options.data.params
      }
    }

    let _headers = options.headers || this.config.headers

    let response = await fetch(_url, {
      method: 'GET',
      headers: _headers
    })
      .catch(error => console.error('Error:', error))

    try {
      let responseText = await response.text()
      let responseData = JSON.parse(responseText)
      return responseData
    } catch (error) {
      console.error('error', error)
      return []
    }
  }
}

export default AjaxService
