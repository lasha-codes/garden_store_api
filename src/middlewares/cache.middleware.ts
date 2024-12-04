import { NextFunction, Request, Response } from 'express'
import cache from 'memory-cache'

interface CustomResponse extends Response {
  sendResponse?: Response['send']
}

const cacheMiddleware = (duration: number) => {
  return (req: Request, res: CustomResponse, next: NextFunction) => {
    const key = `__express__${req.originalUrl}` || req.url
    const cachedBody = cache.get(key)

    if (cachedBody) {
      res.send(cachedBody)
      return
    }

    res.sendResponse = res.send.bind(res)

    res.send = ((body: any) => {
      cache.put(key, body, duration * 1000)
      res.sendResponse!(body)
      return res
    }) as Response['send']

    next()
  }
}

export default cacheMiddleware
