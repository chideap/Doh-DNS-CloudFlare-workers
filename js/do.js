addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  //查询路径'abc'，可以修改成自建想要的
  if (url.pathname === '/abc') {
    const dohUrl = 'https://1.1.1.1/dns-query'
    const headers = new Headers(request.headers)
    headers.set('Host', 'm.baidu.com')//可以不要 can be deleted without
    headers.set('Referer', 'no-referrer')//可以不要 can be deleted without
    headers.set('Content-Type', 'application/dns-message')
    const dohRequest = new Request(dohUrl, {
      method: request.method,
      headers: headers,
      body: request.body,
      passThroughOnException: true
    })
    return fetch(dohRequest)
  } else {
    const response = await fetch(request)
    return response
  }
}
