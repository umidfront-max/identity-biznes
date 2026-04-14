/**
 * @description Export network configuration
 * @description The vite version cannot configure the global api in net.config.js. For the development environment, go to .env.development, for the production environment, go to .env.production, and for the test environment, go to .env.test.
 **/
export const netConfig: {
  [key: string]: string | number | Array<number | string>
} = {
  // Configure the backend data receiving method application/json;charset=UTF-8 or application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // Maximum request time
  timeout: 10000,
  // The code operates normally and supports String, Array, and int types.
  successCode: [200, 0, '200', '0'],
  // Field name of data status
  statusName: 'code',
  // Field name of status information
  messageName: 'msg',
}
