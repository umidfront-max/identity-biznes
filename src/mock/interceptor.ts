/**
 * Mock Interceptor - Barcha API so'rovlarini ushlab, mock data qaytaradi
 * Backend kerak emas - barcha ma'lumotlar lokal mock data dan olinadi
 */

import {
  mockProfile,
  mockCustomers,
  mockBranches,
  mockTariffs,
  mockInstallments,
  mockTransactions,
  mockTransactionTypes,
  mockUsers,
  mockRoles,
  mockRegions,
  mockDistricts,
  mockMahallas,
  mockCreditHistory,
  mockHumo,
  mockUzcard,
  mockInpsHistory,
  mockPensionInfo,
  mockMib,
  mockTax,
  mockLogs,
  mockPassportInfo,
  generateCalculatorResponse,
} from './data'

interface MockRoute {
  method: string
  pattern: RegExp
  handler: (params: Record<string, string>, data?: any, query?: any) => any
}

// ID counter for new records
let nextId = 1000

function wrapList<T>(data: T[], sortables: string[] = []) {
  return { data, sortables, meta: { total: data.length, per_page: data.length || 10 } }
}

function wrapSingle<T>(data: T, message = 'Success') {
  return { data, message, success: true }
}

const routes: MockRoute[] = [
  // ==================== AUTH ====================
  {
    method: 'POST',
    pattern: /^\/login$/,
    handler: () => wrapSingle({ token: `mock-token-${Date.now()}` }),
  },
  {
    method: 'GET',
    pattern: /^\/profile\/me$/,
    handler: () => wrapSingle(mockProfile),
  },
  {
    method: 'POST',
    pattern: /^\/logout$/,
    handler: () => wrapSingle('Logged out'),
  },
  {
    method: 'POST',
    pattern: /^\/profile\/change-password$/,
    handler: () => wrapSingle(true, 'Password changed'),
  },

  // ==================== CUSTOMERS ====================
  {
    method: 'GET',
    pattern: /^\/customer$/,
    handler: () => wrapList(mockCustomers),
  },
  {
    method: 'GET',
    pattern: /^\/customer\/(\d+)$/,
    handler: (params) => {
      const customer = mockCustomers.find((c) => c.id === Number(params['1']))
      return wrapSingle(customer || mockCustomers[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/customer$/,
    handler: (_params, data) => {
      const newCustomer = {
        id: ++nextId,
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        addresses: data?.addresses || [],
        phones: data?.phones || [],
      }
      mockCustomers.push(newCustomer)
      return wrapList([newCustomer])
    },
  },
  {
    method: 'PUT',
    pattern: /^\/customer\/(\d+)$/,
    handler: (params, data) => {
      const idx = mockCustomers.findIndex((c) => c.id === Number(params['1']))
      if (idx !== -1) Object.assign(mockCustomers[idx], data)
      return wrapSingle(mockCustomers[idx] || data)
    },
  },
  {
    method: 'POST',
    pattern: /^\/customer\/(\d+)\/address$/,
    handler: (params, data) => {
      const customer = mockCustomers.find((c) => c.id === Number(params['1']))
      if (customer) {
        const addr = { id: ++nextId, ...data }
        customer.addresses.push(addr)
      }
      return wrapList(customer?.addresses || [])
    },
  },
  {
    method: 'POST',
    pattern: /^\/customer\/(\d+)\/phone$/,
    handler: (params, data) => {
      const customer = mockCustomers.find((c) => c.id === Number(params['1']))
      if (customer) {
        const phone = { id: ++nextId, ...data }
        customer.phones.push(phone)
      }
      return wrapList(customer?.phones || [])
    },
  },
  {
    method: 'POST',
    pattern: /^\/customer\/(\d+)\/card$/,
    handler: (_params, data) => {
      return wrapSingle({
        card: {
          id: `card-${++nextId}`,
          customer_id: data?.customer_id,
          number: data?.number,
          expiry: data?.expiry,
          phone: data?.phone,
          status: 2,
          balance: '0',
        },
        attachData: { session: Date.now(), otpSentPhone: data?.phone || '+998900000000' },
      })
    },
  },
  {
    method: 'POST',
    pattern: /^\/customer\/(\d+)\/confirm-card$/,
    handler: (_params, data) => {
      return {
        card: { id: data?.card_id || 'card-confirmed', status: 2, balance: '0' },
        attachData: { session: data?.session, otpSentPhone: '' },
      }
    },
  },
  {
    method: 'POST',
    pattern: /^\/customer\/by-passport$/,
    handler: () => {
      return wrapSingle({
        ...mockCustomers[0],
        cards: mockInstallments[0].cards,
      })
    },
  },
  {
    method: 'POST',
    pattern: /^\/customer\/info-by-passport$/,
    handler: () => wrapSingle(mockPassportInfo),
  },

  // ==================== INSTALLMENTS ====================
  {
    method: 'GET',
    pattern: /^\/?(installment\/installment)$/,
    handler: () => wrapList(mockInstallments),
  },
  {
    method: 'GET',
    pattern: /^\/?(installment\/installment)\/(\d+)$/,
    handler: (params) => {
      const inst = mockInstallments.find((i) => i.id === Number(params['2']))
      return wrapSingle(inst || mockInstallments[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(installment\/installment)$/,
    handler: (_params, data) => {
      const newInst = {
        id: ++nextId,
        ...data,
        customer: mockCustomers.find((c) => c.id === data?.customer_id) || mockCustomers[0],
        branch: mockBranches.find((b) => b.id === Number(data?.branch_id)) || mockBranches[0],
        tariff: mockTariffs.find((t) => t.id === Number(data?.tariff_id)) || mockTariffs[0],
        graphs: [],
        cards: [],
        guarantors: [],
        documents: [],
        images: [],
        comments: [],
        type: 1,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
        next_pay_date: null,
      }
      mockInstallments.push(newInst as any)
      return wrapSingle(newInst)
    },
  },
  {
    method: 'PUT',
    pattern: /^\/?(installment\/installment)\/(\d+)$/,
    handler: (params, data) => {
      const idx = mockInstallments.findIndex((i) => i.id === Number(params['2']))
      if (idx !== -1) Object.assign(mockInstallments[idx], data)
      return wrapSingle(true)
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(installment\/installment)\/(\d+)\/comment$/,
    handler: (params, data) => {
      const inst = mockInstallments.find((i) => i.id === Number(params['2']))
      if (inst) {
        inst.comments.push({
          id: ++nextId,
          installment_id: inst.id,
          creator_id: 1,
          creator_name: 'Admin Identity Biznes',
          comment: data?.comment || '',
        })
      }
      return wrapSingle(true)
    },
  },
  {
    method: 'PUT',
    pattern: /^\/?(installment\/installment)\/comment\/(\d+)$/,
    handler: (_params, data) => {
      for (const inst of mockInstallments) {
        const comment = inst.comments.find((c) => c.id === Number(_params['2']))
        if (comment) {
          comment.comment = data?.comment || comment.comment
          break
        }
      }
      return wrapSingle(true)
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(installment\/installment)\/(\d+)\/attach-guarantor$/,
    handler: (params, data) => {
      const inst = mockInstallments.find((i) => i.id === Number(params['2']))
      const guarantor = mockCustomers.find((c) => c.id === data?.customer_id)
      if (inst && guarantor) inst.guarantors.push(guarantor as any)
      return wrapSingle(true)
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(installment\/installment)\/(\d+)\/document$/,
    handler: () => {
      return wrapSingle({
        id: `doc-${++nextId}`,
        type: 'document',
        preview_url: '',
        url: '',
        name: 'document.pdf',
        original_name: 'document.pdf',
        mime: 'application/pdf',
      })
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(installment\/installment)\/(\d+)\/image$/,
    handler: () => {
      return wrapSingle({
        id: `img-${++nextId}`,
        type: 'image',
        preview_url: '',
        url: '',
        name: 'image.jpg',
        original_name: 'image.jpg',
        mime: 'image/jpeg',
      })
    },
  },

  // ==================== TRANSACTIONS ====================
  {
    method: 'GET',
    pattern: /^\/?(installment\/transaction)$/,
    handler: () => wrapList(mockTransactions),
  },
  {
    method: 'GET',
    pattern: /^\/?(installment\/transaction)\/(\d+)$/,
    handler: (params) => {
      const tx = mockTransactions.find((t) => t.id === Number(params['2']))
      return wrapSingle(tx || mockTransactions[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(installment\/transaction)$/,
    handler: (_params, data) => {
      const newTx = { id: ++nextId, ...data, created_at: Math.floor(Date.now() / 1000), updated_at: Math.floor(Date.now() / 1000) }
      return wrapSingle(newTx)
    },
  },
  {
    method: 'PUT',
    pattern: /^\/?(installment\/transaction)\/(\d+)$/,
    handler: (_params, data) => wrapSingle(data),
  },

  // ==================== TARIFFS ====================
  {
    method: 'GET',
    pattern: /^\/?(installment\/tariffs)$/,
    handler: () => wrapList(mockTariffs),
  },
  {
    method: 'GET',
    pattern: /^\/?(installment\/tariffs)\/(\d+)$/,
    handler: (params) => {
      const tariff = mockTariffs.find((t) => t.id === Number(params['2']))
      return wrapSingle(tariff || mockTariffs[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(installment\/tariffs)$/,
    handler: (_params, data) => {
      const newTariff = { id: ++nextId, ...data }
      mockTariffs.push(newTariff as any)
      return wrapSingle(newTariff)
    },
  },
  {
    method: 'PUT',
    pattern: /^\/?(installment\/tariffs)\/(\d+)$/,
    handler: (params, data) => {
      const idx = mockTariffs.findIndex((t) => t.id === Number(params['2']))
      if (idx !== -1) Object.assign(mockTariffs[idx], data)
      return wrapSingle(true)
    },
  },

  // ==================== TRANSACTION TYPES ====================
  {
    method: 'GET',
    pattern: /^\/?(installment\/transaction-type)$/,
    handler: () => wrapList(mockTransactionTypes),
  },
  {
    method: 'GET',
    pattern: /^\/?(installment\/transaction-type)\/(\d+)$/,
    handler: (params) => {
      const tt = mockTransactionTypes.find((t) => t.id === Number(params['2']))
      return wrapSingle(tt || mockTransactionTypes[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(installment\/transaction-type)$/,
    handler: (_params, data) => {
      const newTT = { id: ++nextId, ...data, created_at: Math.floor(Date.now() / 1000), updated_at: Math.floor(Date.now() / 1000) }
      mockTransactionTypes.push(newTT as any)
      return wrapSingle(newTT)
    },
  },
  {
    method: 'PUT',
    pattern: /^\/?(installment\/transaction-type)\/(\d+)$/,
    handler: (params, data) => {
      const idx = mockTransactionTypes.findIndex((t) => t.id === Number(params['2']))
      if (idx !== -1) Object.assign(mockTransactionTypes[idx], data)
      return wrapSingle(true)
    },
  },

  // ==================== CALCULATOR ====================
  {
    method: 'POST',
    pattern: /^\/?(installment\/calculator\/calculate)$/,
    handler: (_params, data) => {
      return generateCalculatorResponse(Number(data?.amount || 10000000), Number(data?.period || 6), data?.tariff_id || 1)
    },
  },

  // ==================== BRANCHES ====================
  {
    method: 'GET',
    pattern: /^\/management\/branches$/,
    handler: () => wrapList(mockBranches),
  },
  {
    method: 'GET',
    pattern: /^\/management\/branches\/(\d+)$/,
    handler: (params) => {
      const branch = mockBranches.find((b) => b.id === Number(params['1']))
      return wrapSingle(branch || mockBranches[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/management\/branches$/,
    handler: (_params, data) => {
      const newBranch = { id: ++nextId, ...data, created_at: Math.floor(Date.now() / 1000), updated_at: Math.floor(Date.now() / 1000) }
      mockBranches.push(newBranch as any)
      return wrapSingle(newBranch)
    },
  },
  {
    method: 'PUT',
    pattern: /^\/management\/branches\/(\d+)$/,
    handler: (params, data) => {
      const idx = mockBranches.findIndex((b) => b.id === Number(params['1']))
      if (idx !== -1) Object.assign(mockBranches[idx], data)
      return wrapSingle(true)
    },
  },

  // ==================== USERS ====================
  {
    method: 'GET',
    pattern: /^\/?(users)$/,
    handler: () => wrapList(mockUsers),
  },
  {
    method: 'GET',
    pattern: /^\/?(users)\/(\d+)$/,
    handler: (params) => {
      const user = mockUsers.find((u) => u.id === Number(params['2']))
      return wrapSingle(user || mockUsers[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/?(users)$/,
    handler: (_params, data) => {
      const newUser = {
        id: ++nextId,
        ...data,
        role: { id: '1', name: 'Operator', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        status: 1,
      }
      mockUsers.push(newUser as any)
      return wrapSingle(newUser)
    },
  },
  {
    method: 'PUT',
    pattern: /^\/?(users)\/(\d+)$/,
    handler: (params, data) => {
      const idx = mockUsers.findIndex((u) => u.id === Number(params['2']))
      if (idx !== -1) Object.assign(mockUsers[idx], data)
      return wrapSingle(true)
    },
  },

  // ==================== ROLES ====================
  {
    method: 'GET',
    pattern: /^\/roles$/,
    handler: () => wrapList(mockRoles),
  },
  {
    method: 'GET',
    pattern: /^\/roles\/(\d+)$/,
    handler: (params) => {
      const role = mockRoles.find((r) => r.id === Number(params['1']))
      return wrapSingle(role || mockRoles[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/roles$/,
    handler: (_params, data) => {
      const newRole = {
        id: ++nextId,
        ...data,
        permission_groups: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockRoles.push(newRole as any)
      return wrapSingle(newRole)
    },
  },
  {
    method: 'PUT',
    pattern: /^\/roles\/(\d+)$/,
    handler: (params, data) => {
      const idx = mockRoles.findIndex((r) => r.id === Number(params['1']))
      if (idx !== -1) Object.assign(mockRoles[idx], data)
      return wrapSingle(true)
    },
  },
  {
    method: 'DELETE',
    pattern: /^\/roles$/,
    handler: () => wrapSingle(true),
  },
  {
    method: 'POST',
    pattern: /^\/users\/(\d+)\/attach-role$/,
    handler: () => wrapSingle(true),
  },
  {
    method: 'POST',
    pattern: /^\/roles\/(\d+)\/attach-permissions$/,
    handler: () => wrapSingle(true),
  },

  // ==================== INFO ====================
  {
    method: 'GET',
    pattern: /^\/info\/regions$/,
    handler: () => wrapSingle(mockRegions),
  },
  {
    method: 'GET',
    pattern: /^\/info\/districts$/,
    handler: (_params, _data, query) => {
      const regionId = Number(query?.region_id || 1)
      return wrapSingle(mockDistricts[regionId] || mockDistricts[1] || [])
    },
  },
  {
    method: 'GET',
    pattern: /^\/info\/mahallas$/,
    handler: (_params, _data, query) => {
      const districtId = Number(query?.district_id || 1)
      return wrapSingle(mockMahallas[districtId] || mockMahallas[1] || [])
    },
  },

  // ==================== SCORING - Credit History ====================
  {
    method: 'GET',
    pattern: /^\/scoring\/credit-history$/,
    handler: () => wrapList(mockCreditHistory),
  },
  {
    method: 'GET',
    pattern: /^\/scoring\/credit-history\/(\d+)$/,
    handler: (params) => {
      const item = mockCreditHistory.find((c) => c.id === Number(params['1']))
      return wrapSingle(item || mockCreditHistory[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/scoring\/credit-history\/create$/,
    handler: (_params, data) => {
      const newItem = {
        id: ++nextId,
        status: 2,
        request: data,
        response: mockCreditHistory[0].response,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }
      mockCreditHistory.push(newItem as any)
      return wrapSingle(newItem)
    },
  },

  // ==================== SCORING - Humo ====================
  {
    method: 'GET',
    pattern: /^\/scoring\/humo$/,
    handler: () => wrapList(mockHumo),
  },
  {
    method: 'GET',
    pattern: /^\/scoring\/humo\/(\d+)$/,
    handler: (params) => {
      const item = mockHumo.find((h) => h.id === Number(params['1']))
      return wrapSingle(item || mockHumo[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/scoring\/humo\/create$/,
    handler: (_params, data) => {
      const newItem = {
        id: ++nextId,
        status: 2,
        request: data,
        response: mockHumo[0].response,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }
      mockHumo.push(newItem as any)
      return wrapSingle(newItem)
    },
  },

  // ==================== SCORING - Uzcard ====================
  {
    method: 'GET',
    pattern: /^\/scoring\/uzcard$/,
    handler: () => wrapList(mockUzcard),
  },
  {
    method: 'GET',
    pattern: /^\/scoring\/uzcard\/(\d+)$/,
    handler: (params) => {
      const item = mockUzcard.find((u) => u.id === Number(params['1']))
      return wrapSingle(item || mockUzcard[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/scoring\/uzcard\/create$/,
    handler: (_params, data) => {
      const newItem = {
        id: ++nextId,
        status: 2,
        request: data,
        response: mockUzcard[0].response,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }
      mockUzcard.push(newItem as any)
      return wrapSingle(newItem)
    },
  },

  // ==================== SCORING - INPS History ====================
  {
    method: 'GET',
    pattern: /^\/scoring\/inps-history$/,
    handler: () => wrapList(mockInpsHistory),
  },
  {
    method: 'GET',
    pattern: /^\/scoring\/inps-history\/(\d+)$/,
    handler: (params) => {
      const item = mockInpsHistory.find((i) => i.id === Number(params['1']))
      return wrapSingle(item || mockInpsHistory[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/scoring\/inps-history\/create$/,
    handler: (_params, data) => {
      const newItem = {
        id: ++nextId,
        status: 2,
        request: data,
        response: mockInpsHistory[0].response,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }
      mockInpsHistory.push(newItem as any)
      return wrapSingle(newItem)
    },
  },

  // ==================== SCORING - Pension Info ====================
  {
    method: 'GET',
    pattern: /^\/scoring\/pension-info$/,
    handler: () => wrapList(mockPensionInfo),
  },
  {
    method: 'GET',
    pattern: /^\/scoring\/pension-info\/(\d+)$/,
    handler: (params) => {
      const item = mockPensionInfo.find((p) => p.id === Number(params['1']))
      return wrapSingle(item || mockPensionInfo[0])
    },
  },
  {
    method: 'POST',
    pattern: /^\/scoring\/pension-info\/create$/,
    handler: (_params, data) => {
      const newItem = {
        id: ++nextId,
        status: 2,
        request: data,
        response: mockPensionInfo[0].response,
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }
      mockPensionInfo.push(newItem as any)
      return wrapSingle(newItem)
    },
  },

  // ==================== SCORING - MIB ====================
  {
    method: 'GET',
    pattern: /^\/scoring\/mib$/,
    handler: () => wrapList(mockMib),
  },
  {
    method: 'POST',
    pattern: /^\/scoring\/mib\/create$/,
    handler: (_params, data) => {
      const newItem = {
        id: ++nextId,
        status: 2,
        request: data,
        response: { debtBal: 0 },
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }
      mockMib.push(newItem as any)
      return wrapSingle(newItem)
    },
  },

  // ==================== SCORING - Tax ====================
  {
    method: 'GET',
    pattern: /^\/scoring\/tax$/,
    handler: () => wrapList(mockTax),
  },
  {
    method: 'POST',
    pattern: /^\/scoring\/tax\/create$/,
    handler: (_params, data) => {
      const newItem = {
        id: ++nextId,
        status: 2,
        request: data,
        response: { debtBal: 0 },
        created_at: Math.floor(Date.now() / 1000),
        updated_at: Math.floor(Date.now() / 1000),
      }
      mockTax.push(newItem as any)
      return wrapSingle(newItem)
    },
  },

  // ==================== LOGS ====================
  {
    method: 'GET',
    pattern: /^\/log$/,
    handler: () => wrapList(mockLogs),
  },
  {
    method: 'GET',
    pattern: /^\/log\/own$/,
    handler: () => wrapList(mockLogs.filter((l) => l.user.id === 1)),
  },

  // ==================== DELETE (generic) ====================
  {
    method: 'DELETE',
    pattern: /./,
    handler: () => wrapSingle(true, 'Deleted'),
  },
]

function parseQueryParams(url: string): Record<string, string> {
  const query: Record<string, string> = {}
  const qIndex = url.indexOf('?')
  if (qIndex === -1) return query
  const params = new URLSearchParams(url.slice(qIndex + 1))
  params.forEach((value, key) => {
    query[key] = value
  })
  return query
}

function matchRoute(
  method: string,
  url: string
): { route: MockRoute; params: Record<string, string>; query: Record<string, string> } | null {
  // Clean URL - remove base URL, query string for matching
  let cleanUrl = url.replace(/^https?:\/\/[^/]+/, '').replace(/\/api\/v1\/?/, '/')
  const query = parseQueryParams(cleanUrl)
  cleanUrl = cleanUrl.split('?')[0]

  // Remove trailing slash
  if (cleanUrl.length > 1 && cleanUrl.endsWith('/')) {
    cleanUrl = cleanUrl.slice(0, -1)
  }

  // Ensure starts with /
  if (!cleanUrl.startsWith('/')) {
    cleanUrl = `/${cleanUrl}`
  }

  for (const route of routes) {
    if (route.method !== method.toUpperCase()) continue

    const match = cleanUrl.match(route.pattern)
    if (match) {
      const params: Record<string, string> = {}
      match.forEach((val, idx) => {
        if (idx > 0) params[String(idx)] = val
      })
      return { route, params, query }
    }
  }

  return null
}

/**
 * Mock interceptor ni axios instance ga ulash
 */
export function setupMockInterceptor(axiosInstance: any) {
  // Request interceptor - so'rovni ushlab, mock javob qaytarish
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const method = config.method?.toUpperCase() || 'GET'
      const url = config.url || ''

      const matched = matchRoute(method, url)

      if (matched) {
        // Axios adapter ni override qilib, haqiqiy HTTP so'rov yubormaslik
        config.adapter = () => {
          return new Promise((resolve) => {
            // 100-300ms orasida sun'iy kechikish - real API kabi
            const delay = Math.floor(Math.random() * 200) + 100
            setTimeout(() => {
              const responseData = matched.route.handler(
                matched.params,
                config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : undefined,
                matched.query
              )

              resolve({
                data: responseData,
                status: 200,
                statusText: 'OK',
                headers: { 'content-type': 'application/json' },
                config,
              })
            }, delay)
          })
        }
      } else {
        // Agar route topilmasa ham, xato bermasin
        console.warn(`[Mock] No route matched: ${method} ${url}`)
        config.adapter = () => {
          return new Promise((resolve) => {
            resolve({
              data: { data: null, message: 'Mock: route not found', success: false },
              status: 200,
              statusText: 'OK',
              headers: { 'content-type': 'application/json' },
              config,
            })
          })
        }
      }

      return config
    },
    (error: any) => Promise.reject(error)
  )

  console.log(
    "%c[Mock API] Mock interceptor faollashtirildi - barcha API so'rovlar mock data bilan javob beradi",
    'color: #42b883; font-weight: bold; font-size: 14px;'
  )
}
